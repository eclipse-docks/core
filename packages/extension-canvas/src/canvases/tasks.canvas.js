import { LitElement, html, css } from "docks/lit";
import "docks/webawesome";

export default class extends LitElement {
  static properties = {
    tasks: { state: true },
    query: { state: true },
    grouping: { state: true },
    editingId: { state: true },
  };

  static styles = css`
    :host { display:block; min-height:100%; box-sizing:border-box; padding:clamp(18px,4vw,48px); color:var(--wa-color-text-normal); background:var(--wa-color-surface-default); font-family:var(--wa-font-family-body,system-ui,sans-serif); }
    * { box-sizing:border-box; }
    .app { max-width:920px; margin:0 auto; }
    header { display:flex; justify-content:space-between; align-items:flex-start; gap:20px; margin-bottom:30px; }
    .eyebrow { color:var(--wa-color-brand-600); text-transform:uppercase; letter-spacing:.12em; font-size:11px; font-weight:750; margin:0 0 8px; }
    h1 { font-size:clamp(30px,5vw,44px); line-height:1.05; letter-spacing:-.04em; margin:0; }
    .sub { color:var(--wa-color-text-quiet); margin:9px 0 0; }
    .date { color:var(--wa-color-text-quiet); font-size:13px; white-space:nowrap; padding-top:8px; }
    .summary { display:grid; grid-template-columns:1.3fr 1fr; gap:16px; margin-bottom:22px; }
    .panel { border:1px solid var(--wa-color-neutral-200); border-radius:16px; background:var(--wa-color-surface-raised); padding:20px; }
    .progress-top { display:flex; justify-content:space-between; gap:12px; align-items:center; }
    .label { font-size:13px; font-weight:700; }
    .muted { color:var(--wa-color-text-quiet); font-size:13px; }
    .percent { font-weight:750; font-size:22px; letter-spacing:-.03em; }
    .track { height:8px; border-radius:99px; background:var(--wa-color-neutral-100); overflow:hidden; margin-top:15px; }
    .fill { height:100%; border-radius:inherit; background:var(--wa-color-success-600); transition:width .25s ease; }
    .stats { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .stat { border-left:2px solid var(--wa-color-neutral-200); padding-left:13px; }
    .stat strong { display:block; font-size:22px; letter-spacing:-.03em; }
    .stat span { color:var(--wa-color-text-quiet); font-size:12px; }
    .composer { display:flex; gap:10px; margin-bottom:14px; }
    wa-input { flex:1; }
    wa-input::part(base) { border-radius:11px; }
    wa-button::part(button) { border-radius:10px; font-weight:650; }
    .toolbar { display:flex; gap:12px; align-items:center; margin:18px 0 12px; }
    .search { flex:1; }
    .filters { display:flex; gap:6px; padding:4px; background:var(--wa-color-neutral-100); border-radius:11px; }
    .filters wa-button::part(button) { border:0; }
    .filters wa-button.active::part(button) { background:var(--wa-color-surface-raised); box-shadow:0 1px 4px #0001; }
    .group-title { display:flex; align-items:center; gap:9px; margin:22px 0 9px; font-size:13px; text-transform:uppercase; letter-spacing:.08em; font-weight:750; color:var(--wa-color-text-quiet); }
    .count { font-size:11px; background:var(--wa-color-neutral-100); padding:3px 7px; border-radius:20px; }
    .list { display:grid; gap:8px; }
    .task { display:flex; align-items:center; gap:12px; padding:13px 14px; border:1px solid var(--wa-color-neutral-200); background:var(--wa-color-surface-raised); border-radius:13px; min-width:0; }
    .check { width:21px; height:21px; flex:none; border-radius:7px; border:1.5px solid var(--wa-color-neutral-400); display:grid; place-items:center; cursor:pointer; color:white; background:transparent; font-size:14px; }
    .check.done { background:var(--wa-color-success-600); border-color:var(--wa-color-success-600); }
    .task-copy { flex:1; min-width:0; }
    .task-name { font-size:14px; font-weight:650; overflow-wrap:anywhere; }
    .task.done .task-name { color:var(--wa-color-text-quiet); text-decoration:line-through; }
    .task-date { color:var(--wa-color-text-quiet); font-size:11px; margin-top:4px; }
    .actions { display:flex; gap:3px; }
    .actions wa-button::part(button) { padding-inline:9px; }
    .empty { padding:30px 15px; text-align:center; color:var(--wa-color-text-quiet); border:1px dashed var(--wa-color-neutral-300); border-radius:13px; }
    .empty b { color:var(--wa-color-text-normal); display:block; margin-bottom:5px; }
    @media(max-width:620px) { .summary { grid-template-columns:1fr; } header { display:block; } .date { padding-top:12px; } .toolbar { flex-wrap:wrap; } .search { flex-basis:100%; } .filters { width:100%; justify-content:space-around; } .composer { align-items:stretch; } .task { padding:11px; } }
  `;

  constructor() {
    super();
    this.tasks = [];
    this.query = "";
    this.grouping = "all";
    this.editingId = null;
  }

  connectedCallback() {
    super.connectedCallback();
    const saved = this.canvasHost?.getState("tasks", null);
    if (Array.isArray(saved)) this.tasks = saved;
  }

  persist() { this.canvasHost?.setState("tasks", this.tasks); }

  addTask() {
    const input = this.renderRoot.querySelector("#new-task");
    const title = String(input?.value ?? "").trim();
    if (!title) return;
    this.tasks = [{ id: crypto.randomUUID(), title, done: false, created: Date.now() }, ...this.tasks];
    this.persist();
    input.value = "";
    input.focus();
  }

  toggle(id) {
    this.tasks = this.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    this.persist();
  }

  remove(id) { this.tasks = this.tasks.filter(t => t.id !== id); this.persist(); }

  edit(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    const title = window.prompt("Edit task", task.title);
    if (title === null) return;
    if (!title.trim()) return;
    this.tasks = this.tasks.map(t => t.id === id ? { ...t, title: title.trim() } : t);
    this.persist();
  }

  filtered() {
    const q = this.query.trim().toLowerCase();
    return this.tasks.filter(t => (!q || t.title.toLowerCase().includes(q)) &&
      (this.grouping === "all" || (this.grouping === "done" ? t.done : !t.done)));
  }

  renderTask(task) {
    return html`<article class="task ${task.done ? "done" : ""}">
      <button class="check ${task.done ? "done" : ""}" aria-label=${task.done ? "Mark incomplete" : "Mark complete"} @click=${() => this.toggle(task.id)}>${task.done ? "✓" : ""}</button>
      <div class="task-copy"><div class="task-name">${task.title}</div><div class="task-date">Added ${new Date(task.created).toLocaleDateString(undefined,{month:"short",day:"numeric"})}</div></div>
      <div class="actions"><wa-button appearance="plain" size="small" aria-label="Edit task" @click=${() => this.edit(task.id)}>Edit</wa-button><wa-button appearance="plain" variant="danger" size="small" aria-label="Delete task" @click=${() => this.remove(task.id)}>Delete</wa-button></div>
    </article>`;
  }

  render() {
    const done = this.tasks.filter(t => t.done).length;
    const total = this.tasks.length;
    const percent = total ? Math.round(done / total * 100) : 0;
    const visible = this.filtered();
    const activeTasks = visible.filter(t => !t.done);
    const doneTasks = visible.filter(t => t.done);
    const date = new Intl.DateTimeFormat(undefined, { weekday:"long", month:"long", day:"numeric" }).format(new Date());
    return html`<main class="app">
      <header><div><p class="eyebrow">Daily planner</p><h1>Today, with intention.</h1><p class="sub">A little progress adds up. Keep your focus on what matters.</p></div><div class="date">${date}</div></header>
      <section class="summary"><div class="panel"><div class="progress-top"><div><div class="label">Today's progress</div><div class="muted">${done} of ${total} tasks completed</div></div><div class="percent">${percent}%</div></div><div class="track"><div class="fill" style="width:${percent}%"></div></div></div><div class="panel stats"><div class="stat"><strong>${total - done}</strong><span>Still to do</span></div><div class="stat"><strong>${done}</strong><span>Completed</span></div></div></section>
      <section class="composer"><wa-input id="new-task" placeholder="What needs your attention today?" aria-label="New task" @keydown=${e => { if (e.key === "Enter") this.addTask(); }}></wa-input><wa-button variant="brand" @click=${() => this.addTask()}>Add task</wa-button></section>
      <div class="toolbar"><wa-input class="search" placeholder="Search your tasks…" aria-label="Search tasks" @keyup=${e => { this.query = e.target.value; }}></wa-input><div class="filters" aria-label="Filter tasks"><wa-button class=${this.grouping === "all" ? "active" : ""} size="small" appearance="plain" @click=${() => this.grouping = "all"}>All</wa-button><wa-button class=${this.grouping === "active" ? "active" : ""} size="small" appearance="plain" @click=${() => this.grouping = "active"}>To do</wa-button><wa-button class=${this.grouping === "done" ? "active" : ""} size="small" appearance="plain" @click=${() => this.grouping = "done"}>Done</wa-button></div></div>
      ${visible.length ? html`${this.grouping === "all" || this.grouping === "active" ? html`<section><h2 class="group-title">To do <span class="count">${activeTasks.length}</span></h2><div class="list">${activeTasks.length ? activeTasks.map(t => this.renderTask(t)) : html`<div class="empty"><b>Nothing left on your list.</b>Enjoy the breathing room.</div>`}</div></section>` : ""}${this.grouping === "all" || this.grouping === "done" ? html`<section><h2 class="group-title">Completed <span class="count">${doneTasks.length}</span></h2><div class="list">${doneTasks.length ? doneTasks.map(t => this.renderTask(t)) : html`<div class="empty">Completed tasks will show up here.</div>`}</div></section>` : ""}` : html`<div class="empty"><b>${this.query ? "No tasks match your search." : "Your list is clear."}</b>${this.query ? "Try another search or change the filter." : "Add a task above to get started."}</div>`}
    </main>`;
  }
}
