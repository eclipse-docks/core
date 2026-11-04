import { CanvasView, html, css } from "docks/canvas";

export default class LoungingCat extends CanvasView {
  static properties = {
    gazeX: { state: true },
    gazeY: { state: true },
    blinking: { state: true },
  };

  static styles = css`
    :host { display: block; min-height: 100%; color: #493b38; font-family: ui-rounded, "Trebuchet MS", system-ui, sans-serif; }
    * { box-sizing: border-box; }
    .scene { position: relative; display: grid; place-items: center; min-height: min(760px, 100vh); overflow: hidden; padding: clamp(1rem, 4vw, 3rem); background: radial-gradient(ellipse at 50% 42%, #fff8e9 0%, #f7e8d2 58%, #ead4bd 100%); user-select: none; }
    .sun { position: absolute; width: clamp(110px, 18vw, 190px); aspect-ratio: 1; top: 8%; right: 12%; border-radius: 50%; background: #f4d99b; opacity: .55; filter: blur(1px); }
    .plant { position: absolute; left: 7%; bottom: 18%; color: #8b9b70; font-size: clamp(3rem, 8vw, 6rem); opacity: .8; transform: rotate(-12deg); }
    .art { position: relative; z-index: 1; width: min(900px, 100%); filter: drop-shadow(0 22px 22px #765b4930); }
    svg { display: block; width: 100%; height: auto; overflow: visible; }
    .pupil { transition: transform 120ms ease-out; }
    .tail { transform-box: view-box; transform-origin: 270px 365px; animation: tail-sway 3.8s ease-in-out infinite; }
    @keyframes tail-sway { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-7deg); } }
    .eyelid { transform: scaleY(0); transform-origin: center 50%; transition: transform 90ms ease-in; }
    .blinking .eyelid { transform: scaleY(1); }
    .blinking .eye-white { transform: scaleY(.08); transform-origin: center; }
    .eye-white { transition: transform 90ms ease-in; }
    @media (max-width: 560px) { .scene { min-height: 100svh; padding: .5rem; } .plant { left: 1%; bottom: 20%; } }
    @media (prefers-reduced-motion: reduce) { .pupil, .eyelid, .eye-white { transition-duration: 0ms; } .tail { animation: none; } }
  `;

  constructor() {
    super();
    this.gazeX = 0;
    this.gazeY = 0;
    this.blinking = false;
    this._idleTimer = null;
    this._blinkTimer = null;
    this._blinkEndTimer = null;
    this._onDocumentPointerMove = (event) => this.handleDocumentPointerMove(event);
  }

  onConnect() {
    document.addEventListener("pointermove", this._onDocumentPointerMove);
    this.scheduleBlink();
  }

  onDisconnect() {
    document.removeEventListener("pointermove", this._onDocumentPointerMove);
    clearTimeout(this._idleTimer);
    clearTimeout(this._blinkTimer);
    clearTimeout(this._blinkEndTimer);
  }

  handleDocumentPointerMove(event) {
    this.gazeX = Math.max(-1, Math.min(1, (event.clientX / Math.max(window.innerWidth, 1) - 0.5) * 2));
    this.gazeY = Math.max(-1, Math.min(1, (event.clientY / Math.max(window.innerHeight, 1) - 0.5) * 2));
    clearTimeout(this._idleTimer);
    clearTimeout(this._blinkTimer);
    this._idleTimer = setTimeout(() => this.scheduleBlink(), 900);
  }

  scheduleBlink() {
    clearTimeout(this._blinkTimer);
    this._blinkTimer = setTimeout(() => this.blink(), 1800 + Math.random() * 3600);
  }

  blink() {
    this.blinking = true;
    clearTimeout(this._blinkEndTimer);
    this._blinkEndTimer = setTimeout(() => {
      this.blinking = false;
      this.scheduleBlink();
    }, 180);
  }

  pupilStyle(side) {
    const inward = side === "left" ? 1 : -1;
    return `transform: translate(${this.gazeX * 5 + inward * 3}px, ${this.gazeY * 4}px)`;
  }

  render() {
    return html`
      <main class="scene ${this.blinking ? "blinking" : ""}" aria-label="A cat lounging on a couch. Its eyes follow your pointer across the page.">
        <div class="sun" aria-hidden="true"></div><div class="plant" aria-hidden="true">❧</div>
        <div class="art">
          <svg viewBox="0 0 900 590" role="img" aria-label="A sleepy ginger-and-cream cat sprawled on a soft green couch">
            <defs>
              <linearGradient id="sofa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#91a58a"/><stop offset="1" stop-color="#718873"/></linearGradient>
              <linearGradient id="fur" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4bd78"/><stop offset="1" stop-color="#df9255"/></linearGradient>
            </defs>
            <path d="M112 330 Q112 292 151 292 H749 Q788 292 788 330 V470 H112Z" fill="url(#sofa)"/>
            <path d="M82 365 Q82 337 111 337 H789 Q818 337 818 365 V455 Q818 478 795 478 H105 Q82 478 82 455Z" fill="#829982"/>
            <path d="M105 455 H795 L770 520 H130Z" fill="#657b6b"/>
            <path d="M170 510 L160 550 M730 510 L740 550" stroke="#806b58" stroke-width="17" stroke-linecap="round"/>
            <path d="M130 365 Q130 350 150 350 M770 365 Q770 350 750 350" fill="none" stroke="#a8b49a" stroke-width="5" opacity=".65"/>
            <path d="M190 365 Q450 340 710 365 L690 445 Q450 465 210 445Z" fill="#9bad91" opacity=".8"/>
            <g class="tail"><path d="M270 365 C190 330 170 390 220 410 C260 426 300 395 330 390" fill="none" stroke="#df985c" stroke-width="34" stroke-linecap="round"/><path d="M205 374 Q218 382 230 389 M235 393 Q248 400 260 402" fill="none" stroke="#bd7547" stroke-width="8" stroke-linecap="round"/></g>
            <ellipse cx="475" cy="365" rx="220" ry="91" fill="url(#fur)" transform="rotate(-4 475 365)"/>
            <path d="M330 310 Q350 340 330 370 M390 286 Q410 320 390 345 M570 286 Q550 320 570 345" fill="none" stroke="#c77d4b" stroke-width="13" stroke-linecap="round" opacity=".8"/>
            <ellipse cx="500" cy="405" rx="145" ry="43" fill="#f5dfbd" transform="rotate(-4 500 405)"/>
            <ellipse cx="350" cy="420" rx="54" ry="25" fill="#f5dfbd" transform="rotate(-8 350 420)"/><path d="M330 420v12 M350 418v14 M370 416v12" stroke="#d6b99a" stroke-width="3" stroke-linecap="round"/>
            <ellipse cx="620" cy="414" rx="52" ry="24" fill="#f5dfbd" transform="rotate(8 620 414)"/><path d="M600 412v13 M620 414v13 M640 414v11" stroke="#d6b99a" stroke-width="3" stroke-linecap="round"/>
            <path d="M590 300 L600 220 Q604 205 620 218 L660 250 Q690 240 720 252 L758 218 Q773 207 778 226 L790 305 Q790 365 690 370 Q590 365 590 300Z" fill="url(#fur)"/>
            <path d="M610 245 L615 222 L642 250Z M735 250 L770 222 L773 250Z" fill="#d98768"/>
            <path d="M675 250 Q685 270 680 282 M700 248 Q710 268 705 281" fill="none" stroke="#c77d4b" stroke-width="8" stroke-linecap="round"/>
            <g class="eye-white"><ellipse cx="650" cy="300" rx="17" ry="20" fill="#fff8e9"/><ellipse cx="730" cy="300" rx="17" ry="20" fill="#fff8e9"/></g>
            <g class="pupil" style=${this.pupilStyle("left")}><ellipse cx="650" cy="301" rx="8" ry="12" fill="#4b4038"/><circle cx="653" cy="296" r="3" fill="white"/></g>
            <g class="pupil" style=${this.pupilStyle("right")}><ellipse cx="730" cy="301" rx="8" ry="12" fill="#4b4038"/><circle cx="733" cy="296" r="3" fill="white"/></g>
            <path class="eyelid" d="M630 300 Q650 278 670 300 M710 300 Q730 278 750 300" fill="none" stroke="#b96f48" stroke-width="7" stroke-linecap="round"/>
            <ellipse cx="690" cy="326" rx="28" ry="19" fill="#f5dfbd"/><path d="M684 320 Q690 315 696 320 Q695 327 690 329 Q685 327 684 320Z" fill="#bd7770"/>
            <path d="M690 329 Q690 340 680 341 M690 329 Q690 340 700 341" fill="none" stroke="#76534a" stroke-width="3" stroke-linecap="round"/>
            <path d="M665 328 L630 322 M665 335 L630 340 M715 328 L750 322 M715 335 L750 340" stroke="#8d6b58" stroke-width="2" stroke-linecap="round"/>
            <path d="M570 365 Q600 390 650 380 Q670 376 670 395 Q665 414 625 414 Q580 414 550 390Z" fill="#e9aa6d"/><path d="M620 400v10 M640 397v10" stroke="#c77d4b" stroke-width="3" stroke-linecap="round"/>
          </svg>
        </div>
      </main>
    `;
  }
}
