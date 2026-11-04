import { CanvasView, html, css, nothing, repeat } from "docks/canvas";
import { Directory, File, filebrowserDialog, workspaceService } from "docks/core";

const AUDIO = new Set(["mp3", "wav", "ogg", "oga", "flac", "m4a", "aac", "opus", "weba"]);
const VIDEO = new Set(["mp4", "webm", "ogv", "mov", "mkv", "m4v"]);
const SOURCES = ["youtube", "workspace", "link"];
const PLACEHOLDER = {
  youtube: "Search YouTube or paste a link",
  workspace: "Search file names",
  link: "https://…",
};
const MATCH_LIMIT = 24;
const DIRECTORY_LIMIT = 200;

function extensionOf(name) {
  const base = String(name).split("?")[0].split("#")[0];
  const dot = base.lastIndexOf(".");
  return dot >= 0 ? base.slice(dot + 1).toLowerCase() : "";
}

function mediaOf(name) {
  const ext = extensionOf(name);
  if (AUDIO.has(ext)) return "audio";
  if (VIDEO.has(ext)) return "video";
  return null;
}

function fileTitle(path) {
  return decodeURIComponent(String(path).split("/").filter(Boolean).pop() || path);
}

function youtubeId(url) {
  const host = url.hostname.replace(/^www\./, "");
  if (host === "youtu.be") return url.pathname.split("/").filter(Boolean)[0] || null;
  const youtubeHost = host === "youtube.com"
    || host === "m.youtube.com"
    || host === "music.youtube.com"
    || host === "youtube-nocookie.com";
  if (!youtubeHost) return null;
  if (url.pathname.startsWith("/embed/") || url.pathname.startsWith("/shorts/") || url.pathname.startsWith("/live/")) {
    return url.pathname.split("/")[2] || null;
  }
  return url.searchParams.get("v");
}

function describeAddress(raw) {
  const url = new URL(raw);
  const youtube = youtubeId(url);
  if (youtube) {
    return {
      title: "YouTube",
      href: raw,
      source: "youtube",
      media: "embed",
      embed: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(youtube)}`,
    };
  }
  return {
    title: fileTitle(url.pathname) || url.hostname,
    href: url.href,
    source: "stream",
    media: mediaOf(url.pathname) ?? "video",
  };
}

function sourceLabel(item) {
  if (item.source === "youtube") return "YouTube";
  if (item.source === "file") return item.media === "audio" ? "Audio file" : "Video file";
  return item.media === "audio" ? "Audio" : "Video";
}

function namedVideo(query, source) {
  const trimmed = query.trim();
  try {
    const described = describeAddress(trimmed);
    if (source !== "link" && described.source !== source) return null;
    return {
      title: described.title,
      href: described.href,
      source: described.source,
      media: described.media,
      direct: true,
    };
  } catch {
    return null;
  }
}

let youtubeApis;

async function youtubeApiBases() {
  if (youtubeApis?.length) return youtubeApis;
  try {
    const response = await fetch("https://api.invidious.io/instances.json?sort_by=health");
    if (!response.ok) throw new Error("status");
    const rows = await response.json();
    const bases = rows
      .map(row => Array.isArray(row) ? row[1] : null)
      .filter(meta => meta?.type === "https" && meta.api && meta.cors !== false && meta.uri)
      .map(meta => String(meta.uri).replace(/\/$/, ""))
      .slice(0, 4);
    if (bases.length) {
      youtubeApis = bases;
      return bases;
    }
  } catch {
    // The instance list is optional. A known API remains as a fallback.
  }
  youtubeApis = ["https://yt.chocolatemoo53.com"];
  return youtubeApis;
}

async function searchYoutube(query) {
  const direct = namedVideo(query, "youtube");
  if (direct) return [direct];
  const bases = await youtubeApiBases();
  for (const base of bases) {
    try {
      const response = await fetch(`${base}/api/v1/search?q=${encodeURIComponent(query)}&type=video`);
      if (!response.ok) continue;
      const data = await response.json();
      if (!Array.isArray(data)) continue;
      return data.filter(item => item?.videoId).slice(0, 12).map(item => ({
        title: item.title || "YouTube",
        href: `https://www.youtube.com/watch?v=${item.videoId}`,
        source: "youtube",
        media: "embed",
        detail: item.author || "",
      }));
    } catch {
      continue;
    }
  }
  youtubeApis = null;
  throw new Error("YouTube search could not be reached.");
}

async function collectMedia(dir, query, matches, budget) {
  if (matches.length >= MATCH_LIMIT || budget.dirs > DIRECTORY_LIMIT) return;
  budget.dirs += 1;
  let children = [];
  try {
    children = await dir.listChildren(false);
  } catch {
    return;
  }
  for (const child of children) {
    if (matches.length >= MATCH_LIMIT) return;
    if (child instanceof File) {
      const name = child.getName();
      const media = mediaOf(name);
      const path = child.getWorkspacePath();
      if (!media || !path) continue;
      const haystack = `${name}\n${path}`.toLowerCase();
      if (query && !haystack.includes(query)) continue;
      matches.push({ title: name, href: path, source: "file", media, detail: path });
      continue;
    }
    if (child instanceof Directory) await collectMedia(child, query, matches, budget);
  }
}

async function searchWorkspace(query) {
  const workspace = workspaceService.getWorkspaceSync() ?? await workspaceService.getWorkspace();
  if (!workspace) throw new Error("No workspace is open.");
  const matches = [];
  await collectMedia(workspace, query.toLowerCase(), matches, { dirs: 0 });
  return matches;
}

function searchLink(query) {
  const direct = namedVideo(query, "link");
  if (!direct) throw new Error("Enter a full link, starting with https://");
  return [direct];
}

const SEARCH = {
  youtube: searchYoutube,
  workspace: searchWorkspace,
  link: searchLink,
};

async function objectUrlFor(path) {
  const workspace = workspaceService.getWorkspaceSync() ?? await workspaceService.getWorkspace();
  if (!workspace) throw new Error("No workspace is open.");
  const resource = await workspace.getResource(path);
  if (!(resource instanceof File)) throw new Error("Cannot find that file.");
  const contents = await resource.getContents({ blob: true });
  if (contents instanceof Blob) return URL.createObjectURL(contents);
  if (typeof contents === "string" && contents) return contents;
  throw new Error("This file cannot be played.");
}

function messageOf(err) {
  return err instanceof Error ? err.message : String(err);
}

export default class extends CanvasView {
  static properties = {
    queue: { state: true },
    currentId: { state: true },
    selection: { state: true },
    stage: { state: true },
    loading: { state: true },
    searching: { state: true },
    source: { state: true },
    results: { state: true },
    error: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      min-height: 100%;
      box-sizing: border-box;
      padding: clamp(18px, 4vw, 48px);
      color: var(--wa-color-text-normal);
      background: var(--wa-color-surface-default);
      font-family: var(--wa-font-family-body, system-ui, sans-serif);
    }

    * {
      box-sizing: border-box;
    }

    .app {
      max-width: 1200px;
      margin: 0 auto;
    }

    .layout {
      display: grid;
      grid-template-columns: minmax(16rem, 1fr) minmax(0, 2fr);
      gap: 22px;
      margin-top: 22px;
      align-items: stretch;
    }

    .browser,
    .player {
      min-width: 0;
    }

    .player {
      display: flex;
      flex-direction: column;
      align-self: stretch;
    }

    .playlist {
      flex: 1;
      min-height: 8rem;
      display: flex;
      flex-direction: column;
    }

    .playlist .empty {
      flex: 1;
      display: grid;
      place-items: center;
    }

    .eyebrow {
      color: var(--wa-color-brand-600);
      text-transform: uppercase;
      letter-spacing: 0.12em;
      font-size: 11px;
      font-weight: 750;
      margin: 0 0 8px;
    }

    h1 {
      font-size: clamp(30px, 5vw, 44px);
      line-height: 1.05;
      letter-spacing: -0.04em;
      margin: 0;
    }

    .sub {
      color: var(--wa-color-text-quiet);
      margin: 9px 0 0;
    }

    .composer {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }

    wa-select.source,
    wa-input {
      width: 100%;
    }

    .list-title {
      margin: 18px 0 8px;
      font-size: 12px;
      font-weight: 750;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--wa-color-text-quiet);
    }

    .stage {
      border: 1px solid var(--wa-color-neutral-200);
      border-radius: 16px;
      background: var(--wa-color-surface-raised);
      overflow: hidden;
      min-height: 180px;
    }

    .frame {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #000;
    }

    iframe,
    video {
      width: 100%;
      height: 100%;
      border: 0;
      display: block;
      background: #000;
    }

    .audio {
      display: grid;
      gap: 12px;
      padding: 22px;
    }

    audio {
      width: 100%;
    }

    .now {
      font-weight: 700;
    }

    .empty,
    .loading {
      padding: 36px 18px;
      text-align: center;
      color: var(--wa-color-text-quiet);
    }

    .browser .empty {
      padding: 14px 12px;
      font-size: 13px;
    }

    .transport {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-top: 12px;
    }

    .queue {
      display: grid;
      gap: 8px;
      overflow: auto;
      align-content: start;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .browser .queue {
      max-height: calc(100vh - 320px);
    }

    .playlist .queue {
      flex: 1;
    }

    .row {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 12px 14px;
      border: 1px solid var(--wa-color-neutral-200);
      background: var(--wa-color-surface-raised);
      border-radius: 13px;
    }

    .row.current {
      border-color: var(--wa-color-brand-600);
    }

    wa-button.play-item {
      flex: 1;
      min-width: 0;
    }

    wa-button.play-item::part(button) {
      height: auto;
      white-space: normal;
      justify-content: flex-start;
      text-align: left;
    }

    wa-button.play-item::part(label) {
      min-width: 0;
    }

    .title {
      display: block;
      font-weight: 650;
      white-space: normal;
      overflow-wrap: anywhere;
      text-align: left;
    }

    .meta {
      display: block;
      color: var(--wa-color-text-quiet);
      font-size: 12px;
      margin-top: 3px;
      text-align: left;
    }

    wa-callout {
      margin-bottom: 12px;
    }

    @media (max-width: 800px) {
      .layout {
        grid-template-columns: 1fr;
      }

      .player {
        order: -1;
      }
    }
  `;

  constructor() {
    super();
    this.queue = [];
    this.currentId = "";
    this.selection = null;
    this.stage = null;
    this.loading = false;
    this.searching = false;
    this.source = "youtube";
    this.results = [];
    this.error = "";
    this.blobUrl = "";
    this.ignoringMediaError = false;
    this.playGeneration = 0;
    this.searchGeneration = 0;
  }

  onConnect() {
    const saved = this.getState("queue", null);
    if (Array.isArray(saved)) this.queue = saved.filter(item => item?.href && item?.id);
    const currentId = this.getState("currentId", "");
    if (typeof currentId === "string" && this.queue.some(item => item.id === currentId)) {
      this.currentId = currentId;
    }
    const source = this.getState("source", "youtube");
    if (SOURCES.includes(source)) this.source = source;
  }

  onDisconnect() {
    this.stopMedia();
  }

  persist() {
    this.setState("queue", this.queue);
    this.setState("currentId", this.currentId);
    this.setState("source", this.source);
  }

  stopMedia() {
    this.ignoringMediaError = true;
    const media = this.renderRoot?.querySelector("audio, video");
    if (media) {
      media.pause();
      media.removeAttribute("src");
      media.load();
    }
    if (this.blobUrl) URL.revokeObjectURL(this.blobUrl);
    this.blobUrl = "";
    queueMicrotask(() => {
      this.ignoringMediaError = false;
    });
  }

  favorite() {
    if (!this.selection?.href) return;
    if (this.queue.some(item => item.href === this.selection.href)) return;
    const entry = {
      id: crypto.randomUUID(),
      title: this.selection.title,
      href: this.selection.href,
      source: this.selection.source,
      media: this.selection.media,
    };
    this.queue = [...this.queue, entry];
    this.currentId = entry.id;
    this.selection = entry;
    this.persist();
  }

  setSource(value) {
    if (!SOURCES.includes(value) || value === this.source) return;
    this.source = value;
    this.results = [];
    this.error = "";
    this.persist();
  }

  async search() {
    const input = this.renderRoot.querySelector("#query");
    const query = String(input?.value ?? "").trim();
    if (!query) return;
    const search = SEARCH[this.source];
    if (!search) return;
    const generation = ++this.searchGeneration;
    this.searching = true;
    this.error = "";
    this.results = [];
    try {
      const results = await search(query);
      if (generation !== this.searchGeneration) return;
      if (results.length === 1 && results[0].direct) {
        void this.play(results[0]);
        return;
      }
      this.results = results;
      if (!results.length) this.error = "No matches.";
    } catch (err) {
      if (generation !== this.searchGeneration) return;
      this.error = messageOf(err);
    } finally {
      if (generation === this.searchGeneration) this.searching = false;
    }
  }

  async browseWorkspace() {
    const path = await filebrowserDialog("file");
    if (!path) return;
    const media = mediaOf(path);
    if (!media) {
      this.error = "Choose an audio or video file.";
      return;
    }
    this.error = "";
    void this.play({ title: fileTitle(path), href: path, source: "file", media });
  }

  async play(item) {
    const generation = ++this.playGeneration;
    this.stopMedia();
    this.selection = {
      id: item.id || "",
      title: item.title,
      href: item.href,
      source: item.source,
      media: item.media,
    };
    this.currentId = this.queue.some(entry => entry.id && entry.id === item.id) ? item.id : "";
    this.error = "";
    this.stage = null;
    this.persist();
    if (item.media === "embed") {
      const described = describeAddress(item.href);
      if (!described.embed) {
        this.error = "This address cannot be embedded.";
        return;
      }
      this.stage = { kind: "embed", src: described.embed, title: item.title };
      return;
    }
    if (item.source === "file") {
      await this.playFile(item, generation);
      return;
    }
    this.stage = { kind: item.media, src: item.href, title: item.title, remote: true };
    await this.startMedia(item.media);
  }

  async playFile(item, generation) {
    this.loading = true;
    try {
      const url = await objectUrlFor(item.href);
      if (generation !== this.playGeneration) {
        if (url.startsWith("blob:")) URL.revokeObjectURL(url);
        return;
      }
      if (url.startsWith("blob:")) this.blobUrl = url;
      this.stage = { kind: item.media, src: url, title: item.title, remote: false };
      await this.startMedia(item.media);
    } catch (err) {
      if (generation !== this.playGeneration) return;
      this.stage = null;
      this.error = messageOf(err);
    } finally {
      if (generation === this.playGeneration) this.loading = false;
    }
  }

  async startMedia(kind) {
    await this.updateComplete;
    const el = this.renderRoot.querySelector(kind === "audio" ? "audio" : "video");
    if (!el) return;
    try {
      await el.play();
    } catch (err) {
      if (err?.name === "AbortError") return;
      this.error = "Press play on the player to start.";
    }
  }

  onMediaError(event) {
    if (this.ignoringMediaError || !event.target?.currentSrc) return;
    this.error = "The player could not load this address. A remote file plays only when that server allows this page to read it.";
  }

  playCurrent() {
    if (this.selection) {
      void this.play(this.selection);
      return;
    }
    const item = this.queue.find(entry => entry.id === this.currentId) ?? this.queue[0];
    if (item) void this.play(item);
  }

  step(offset) {
    const index = this.queue.findIndex(entry => entry.id === this.currentId);
    const next = this.queue[index + offset];
    if (!next) return;
    void this.play(next);
  }

  remove(id) {
    const removingCurrent = id === this.currentId;
    this.queue = this.queue.filter(item => item.id !== id);
    if (removingCurrent) {
      this.stopMedia();
      this.currentId = "";
      this.stage = null;
      if (this.selection?.id === id) this.selection = null;
    }
    this.persist();
  }

  renderStage() {
    if (this.loading) return html`<div class="loading" role="status"><wa-spinner></wa-spinner></div>`;
    if (!this.stage) {
      return html`<div class="empty">Choose a source, then search. Fav adds the playing item to the playlist.</div>`;
    }
    if (this.stage.kind === "embed") {
      return html`
        <div class="frame">
          <iframe
            credentialless
            title=${this.stage.title}
            src=${this.stage.src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      `;
    }
    if (this.stage.kind === "audio") {
      return html`
        <div class="audio">
          <div class="now">${this.stage.title}</div>
          <audio
            controls
            src=${this.stage.src}
            crossorigin=${this.stage.remote ? "anonymous" : nothing}
            @error=${(event) => this.onMediaError(event)}
            @ended=${() => this.step(1)}
          ></audio>
        </div>
      `;
    }
    return html`
      <div class="frame">
        <video
          controls
          playsinline
          src=${this.stage.src}
          crossorigin=${this.stage.remote ? "anonymous" : nothing}
          @error=${(event) => this.onMediaError(event)}
          @ended=${() => this.step(1)}
        ></video>
      </div>
    `;
  }

  renderItems(items, keyOf, isCurrent, trailing) {
    return html`
      <ul class="queue">
        ${repeat(items, keyOf, (item) => html`
          <li class="row ${isCurrent(item) ? "current" : ""}" aria-current=${isCurrent(item) ? "true" : nothing}>
            <wa-button class="play-item" appearance="plain" @click=${() => this.play(item)}>
              <span class="title">${item.title}</span>
              <span class="meta">${item.detail || sourceLabel(item)}</span>
            </wa-button>
            ${trailing ? trailing(item) : nothing}
          </li>
        `)}
      </ul>
    `;
  }

  renderBrowser() {
    return html`
      <aside class="browser">
        <div class="composer">
          <wa-select
            class="source"
            label="Source"
            .value=${this.source}
            @change=${(event) => this.setSource(event.currentTarget.value)}
          >
            <wa-option value="youtube">YouTube</wa-option>
            <wa-option value="workspace">Workspace</wa-option>
            <wa-option value="link">Link</wa-option>
          </wa-select>
          <wa-input
            id="query"
            label="Search"
            placeholder=${PLACEHOLDER[this.source]}
            @keydown=${(event) => { if (event.key === "Enter") void this.search(); }}
          ></wa-input>
          <wa-button variant="brand" ?loading=${this.searching} @click=${() => this.search()}>Search</wa-button>
          ${this.source === "workspace"
            ? html`<wa-button appearance="outlined" @click=${() => this.browseWorkspace()}>Browse</wa-button>`
            : nothing}
        </div>
        ${this.error ? html`<wa-callout variant="warning" role="alert">${this.error}</wa-callout>` : nothing}
        <h2 class="list-title">Results</h2>
        ${this.results.length
          ? this.renderItems(
            this.results,
            (item) => item.href,
            (item) => this.selection?.href === item.href,
          )
          : html`<div class="empty">Search results appear here.</div>`}
      </aside>
    `;
  }

  renderTransport(index) {
    const queued = this.selection && this.queue.some(item => item.href === this.selection.href);
    return html`
      <div class="transport">
        <wa-button size="small" appearance="plain" aria-label="Previous" ?disabled=${index <= 0} @click=${() => this.step(-1)}>
          <wa-icon name="backward-step" label="Previous"></wa-icon>
        </wa-button>
        <wa-button size="small" appearance="plain" aria-label="Play" ?disabled=${!this.selection && !this.queue.length} @click=${() => this.playCurrent()}>
          <wa-icon name="play" label="Play"></wa-icon>
        </wa-button>
        <wa-button size="small" appearance="plain" aria-label="Next" ?disabled=${index < 0 || index >= this.queue.length - 1} @click=${() => this.step(1)}>
          <wa-icon name="forward-step" label="Next"></wa-icon>
        </wa-button>
        <wa-button size="small" appearance="plain" aria-label="Add to playlist" ?disabled=${!this.selection || queued} @click=${() => this.favorite()}>
          <wa-icon name="heart" label="Add to playlist"></wa-icon>
        </wa-button>
      </div>
    `;
  }

  renderPlaylist() {
    if (!this.queue.length) return html`<div class="empty">The playlist is empty.</div>`;
    return this.renderItems(
      this.queue,
      (item) => item.id,
      (item) => item.id === this.currentId,
      (item) => html`
        <wa-button
          appearance="plain"
          variant="danger"
          size="small"
          aria-label=${`Remove ${item.title}`}
          @click=${() => this.remove(item.id)}
        >Remove</wa-button>
      `,
    );
  }

  render() {
    const index = this.queue.findIndex(item => item.id === this.currentId);
    return html`
      <main class="app">
        <header>
          <p class="eyebrow">Player</p>
          <h1>Watch and listen.</h1>
          <p class="sub">Search YouTube, paste a link, or find an audio or video file in the workspace.</p>
        </header>
        <div class="layout">
          ${this.renderBrowser()}
          <section class="player" aria-label="Player">
            <section class="stage">${this.renderStage()}</section>
            ${this.renderTransport(index)}
            <h2 class="list-title">Playlist</h2>
            <div class="playlist">${this.renderPlaylist()}</div>
          </section>
        </div>
      </main>
    `;
  }
}
