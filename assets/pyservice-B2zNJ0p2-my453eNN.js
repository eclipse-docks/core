import{Ht as e,Tn as t,Vt as n,Yt as r}from"./canvas-bridge-core.js-By6utgn9.js";var i=`// \\0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod, mod.exports), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, { get: (a, b) => (typeof require !== "undefined" ? require : a)[b] }) : x)(function(x) {
	if (typeof require !== "undefined") return require.apply(this, arguments);
	throw Error("Calling \`require\` for \\"" + x + "\\" in an environment that doesn't expose the \`require\` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
});
var package_default = {
	name: "pyodide",
	version: "314.0.7",
	description: "The Pyodide JavaScript package",
	keywords: ["python", "webassembly"],
	homepage: "https://github.com/pyodide/pyodide",
	repository: {
		"type": "git",
		"url": "git+https://github.com/pyodide/pyodide.git"
	},
	bugs: { "url": "https://github.com/pyodide/pyodide/issues" },
	license: "MPL-2.0",
	dependencies: {
		"@types/emscripten": "^1.41.4",
		"ws": "^8.5.0"
	},
	devDependencies: {
		"@biomejs/biome": "2.1.1",
		"@playwright/test": "^1.55.1",
		"@types/assert": "^1.5.6",
		"@types/expect": "^24.3.0",
		"@types/node": "^20.8.4",
		"@types/ws": "^8.5.3",
		"cross-env": "^7.0.3",
		"dts-bundle-generator": "^8.1.1",
		"esbuild": "^0.25.0",
		"express": "^4.17.3",
		"npm-run-all": "^4.1.5",
		"nyc": "^15.1.0",
		"playwright": "^1.55.1",
		"prettier": "^2.2.1",
		"tsd": "^0.24.1",
		"tsx": "^4.20.5",
		"typedoc": "^0.27.9",
		"typescript": "5.8",
		"wabt": "^1.0.32"
	},
	main: "pyodide.js",
	exports: {
		".": {
			"types": "./pyodide.d.ts",
			"require": "./pyodide.js",
			"import": "./pyodide.mjs"
		},
		"./ffi": { "types": "./ffi.d.ts" },
		"./pyodide.asm.wasm": "./pyodide.asm.wasm",
		"./pyodide.asm.mjs": "./pyodide.asm.mjs",
		"./python_stdlib.zip": "./python_stdlib.zip",
		"./pyodide.mjs": "./pyodide.mjs",
		"./pyodide.js": "./pyodide.js",
		"./package.json": "./package.json",
		"./pyodide-lock.json": "./pyodide-lock.json"
	},
	files: [
		"pyodide.asm.mjs",
		"pyodide.asm.wasm",
		"python_stdlib.zip",
		"pyodide.mjs",
		"pyodide.js.map",
		"pyodide.mjs.map",
		"pyodide.d.ts",
		"ffi.d.ts",
		"pyodide-lock.json",
		"console.html",
		"console-v2.html"
	],
	browser: {
		"child_process": false,
		"crypto": false,
		"fs": false,
		"fs/promises": false,
		"path": false,
		"url": false,
		"vm": false,
		"ws": false
	},
	scripts: {
		"build-inner": "node esbuild.config.inner.mjs",
		"build": "tsc --noEmit && node esbuild.config.outer.mjs",
		"test": "npm-run-all test:*",
		"test:unit": "cross-env TEST_NODE=1 node --import tsx --experimental-wasm-stack-switching --test 'test/unit/**/*.test.*'",
		"test:node": "cross-env TEST_NODE=1 npx playwright test",
		"test:browser": "npx playwright test",
		"tsc": "tsc --noEmit",
		"coverage": "cross-env TEST_NODE=1 npm-run-all coverage:*",
		"coverage:build": "nyc npm run test:node"
	},
	nyc: {
		"reporter": ["html", "text-summary"],
		"include": ["*.ts"],
		"all": true,
		"clean": true,
		"cache": false,
		"instrument": false,
		"checkCoverage": true,
		"statements": 95,
		"functions": 95,
		"branches": 80,
		"lines": 95
	},
	tsd: { "compilerOptions": { "lib": ["ES2017", "DOM"] } },
	types: "./pyodide.d.ts",
	engines: { "node": ">=18.0.0" }
};
// __vite-browser-external
var require___vite_browser_external = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {};
}));
// ../../node_modules/pyodide/pyodide.mjs
var Q = Object.defineProperty;
var o = (e, t) => Q(e, "name", {
	value: t,
	configurable: !0
});
var R = ((e) => typeof __require < "u" ? __require : typeof Proxy < "u" ? new Proxy(e, { get: (t, n) => (typeof __require < "u" ? __require : t)[n] }) : e)(function(e) {
	if (typeof __require < "u") return __require.apply(this, arguments);
	throw Error("Dynamic require of \\"" + e + "\\" is not supported");
});
var W = (() => {
	for (var e = /* @__PURE__ */ new Uint8Array(128), t = 0; t < 64; t++) e[t < 26 ? t + 65 : t < 52 ? t + 71 : t < 62 ? t - 4 : t * 4 - 205] = t;
	return (n) => {
		for (var i = n.length, s = new Uint8Array((i - (n[i - 1] == "=") - (n[i - 2] == "=")) * 3 / 4 | 0), r = 0, a = 0; r < i;) {
			var c = e[n.charCodeAt(r++)], l = e[n.charCodeAt(r++)], d = e[n.charCodeAt(r++)], u = e[n.charCodeAt(r++)];
			s[a++] = c << 2 | l >> 4, s[a++] = l << 4 | d >> 2, s[a++] = d << 6 | u;
		}
		return s;
	};
})();
function Z(e) {
	return !isNaN(parseFloat(e)) && isFinite(e);
}
o(Z, "_isNumber");
function P(e) {
	return e.charAt(0).toUpperCase() + e.substring(1);
}
o(P, "_capitalize");
function D(e) {
	return function() {
		return this[e];
	};
}
o(D, "_getter");
var N = [
	"isConstructor",
	"isEval",
	"isNative",
	"isToplevel"
];
var I = ["columnNumber", "lineNumber"];
var S = [
	"fileName",
	"functionName",
	"source"
];
var F = N.concat(I, S, ["args"], ["evalOrigin"]);
function p(e) {
	if (e) for (var t = 0; t < F.length; t++) e[F[t]] !== void 0 && this["set" + P(F[t])](e[F[t]]);
}
o(p, "StackFrame");
p.prototype = {
	getArgs: o(function() {
		return this.args;
	}, "getArgs"),
	setArgs: o(function(e) {
		if (Object.prototype.toString.call(e) !== "[object Array]") throw new TypeError("Args must be an Array");
		this.args = e;
	}, "setArgs"),
	getEvalOrigin: o(function() {
		return this.evalOrigin;
	}, "getEvalOrigin"),
	setEvalOrigin: o(function(e) {
		if (e instanceof p) this.evalOrigin = e;
		else if (e instanceof Object) this.evalOrigin = new p(e);
		else throw new TypeError("Eval Origin must be an Object or StackFrame");
	}, "setEvalOrigin"),
	toString: o(function() {
		var e = this.getFileName() || "", t = this.getLineNumber() || "", n = this.getColumnNumber() || "", i = this.getFunctionName() || "";
		return this.getIsEval() ? e ? "[eval] (" + e + ":" + t + ":" + n + ")" : "[eval]:" + t + ":" + n : i ? i + " (" + e + ":" + t + ":" + n + ")" : e + ":" + t + ":" + n;
	}, "toString")
};
p.fromString = o(function(t) {
	var n = t.indexOf("("), i = t.lastIndexOf(")"), s = t.substring(0, n), r = t.substring(n + 1, i).split(","), a = t.substring(i + 1);
	if (a.indexOf("@") === 0) var c = /@(.+?)(?::(\\d+))?(?::(\\d+))?$/.exec(a, ""), l = c[1], d = c[2], u = c[3];
	return new p({
		functionName: s,
		args: r || void 0,
		fileName: l,
		lineNumber: d || void 0,
		columnNumber: u || void 0
	});
}, "StackFrame$$fromString");
for (v = 0; v < N.length; v++) p.prototype["get" + P(N[v])] = D(N[v]), p.prototype["set" + P(N[v])] = function(e) {
	return function(t) {
		this[e] = !!t;
	};
}(N[v]);
var v;
for (b = 0; b < I.length; b++) p.prototype["get" + P(I[b])] = D(I[b]), p.prototype["set" + P(I[b])] = function(e) {
	return function(t) {
		if (!Z(t)) throw new TypeError(e + " must be a Number");
		this[e] = Number(t);
	};
}(I[b]);
var b;
for (E = 0; E < S.length; E++) p.prototype["get" + P(S[E])] = D(S[E]), p.prototype["set" + P(S[E])] = function(e) {
	return function(t) {
		this[e] = String(t);
	};
}(S[E]);
var E;
var A = p;
function ne() {
	var e = /^\\s*at .*(\\S+:\\d+|\\(native\\))/m, t = /^(eval@)?(\\[native code])?$/;
	return {
		parse: o(function(i) {
			if (i.stack && i.stack.match(e)) return this.parseV8OrIE(i);
			if (i.stack) return this.parseFFOrSafari(i);
			throw new Error("Cannot parse given Error object");
		}, "ErrorStackParser$$parse"),
		extractLocation: o(function(i) {
			if (i.indexOf(":") === -1) return [i];
			var r = /(.+?)(?::(\\d+))?(?::(\\d+))?$/.exec(i.replace(/[()]/g, ""));
			return [
				r[1],
				r[2] || void 0,
				r[3] || void 0
			];
		}, "ErrorStackParser$$extractLocation"),
		parseV8OrIE: o(function(i) {
			return i.stack.split(\`
\`).filter(function(r) {
				return !!r.match(e);
			}, this).map(function(r) {
				r.indexOf("(eval ") > -1 && (r = r.replace(/eval code/g, "eval").replace(/(\\(eval at [^()]*)|(,.*$)/g, ""));
				var a = r.replace(/^\\s+/, "").replace(/\\(eval code/g, "(").replace(/^.*?\\s+/, ""), c = a.match(/ (\\(.+\\)$)/);
				a = c ? a.replace(c[0], "") : a;
				var l = this.extractLocation(c ? c[1] : a);
				return new A({
					functionName: c && a || void 0,
					fileName: ["eval", "<anonymous>"].indexOf(l[0]) > -1 ? void 0 : l[0],
					lineNumber: l[1],
					columnNumber: l[2],
					source: r
				});
			}, this);
		}, "ErrorStackParser$$parseV8OrIE"),
		parseFFOrSafari: o(function(i) {
			return i.stack.split(\`
\`).filter(function(r) {
				return !r.match(t);
			}, this).map(function(r) {
				if (r.indexOf(" > eval") > -1 && (r = r.replace(/ line (\\d+)(?: > eval line \\d+)* > eval:\\d+:\\d+/g, ":$1")), r.indexOf("@") === -1 && r.indexOf(":") === -1) return new A({ functionName: r });
				var a = /((.*".+"[^@]*)?[^@]*)(?:@)/, c = r.match(a), l = c && c[1] ? c[1] : void 0, d = this.extractLocation(r.replace(a, ""));
				return new A({
					functionName: l,
					fileName: d[0],
					lineNumber: d[1],
					columnNumber: d[2],
					source: r
				});
			}, this);
		}, "ErrorStackParser$$parseFFOrSafari")
	};
}
o(ne, "ErrorStackParser");
var M = new ne();
function ie() {
	if (typeof API < "u" && API !== globalThis.API) return API.runtimeEnv;
	return oe({
		IN_BUN: typeof Bun < "u",
		IN_DENO: typeof Deno < "u",
		IN_NODE: typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string" && !process.browser,
		IN_SAFARI: typeof navigator == "object" && typeof navigator.userAgent == "string" && navigator.userAgent.indexOf("Chrome") === -1 && navigator.userAgent.indexOf("Safari") > -1,
		IN_SHELL: typeof read == "function" && typeof load == "function",
		IN_WORKERD: typeof navigator == "object" && navigator.userAgent?.includes("Cloudflare-Workers")
	});
}
o(ie, "getGlobalRuntimeEnv");
var f = ie();
function oe(e) {
	let t = e.IN_NODE && typeof module < "u" && module.exports && typeof R == "function" && typeof __dirname == "string", n = e.IN_NODE && !t, i = !e.IN_NODE && !e.IN_DENO && !e.IN_BUN, s = i && typeof window < "u" && typeof window.document < "u" && typeof document.createElement == "function" && "sessionStorage" in window && typeof globalThis.importScripts != "function", r = i && typeof globalThis.WorkerGlobalScope < "u" && typeof globalThis.self < "u" && globalThis.self instanceof globalThis.WorkerGlobalScope;
	if (r && ae()) throw new Error("Classic web workers are not supported");
	let a = {
		...e,
		IN_BROWSER: i,
		IN_BROWSER_MAIN_THREAD: s,
		IN_BROWSER_WEB_WORKER: r,
		IN_NODE_COMMONJS: t,
		IN_NODE_ESM: n
	};
	if (!(a.IN_BROWSER_MAIN_THREAD || a.IN_BROWSER_WEB_WORKER || a.IN_NODE || a.IN_SHELL || a.IN_WORKERD)) throw new Error(\`Cannot determine runtime environment: \${JSON.stringify(a)}\`);
	return a;
}
o(oe, "calculateDerivedFlags");
function ae() {
	try {
		return globalThis.importScripts("data:text/javascript,"), !0;
	} catch {
		return !1;
	}
}
o(ae, "isClassicWorker");
var $;
var x;
var B;
var L;
async function C() {
	if (!f.IN_NODE || ($ = (await Promise.resolve().then(() => /* @__PURE__ */ __toESM(require___vite_browser_external(), 1))).default, B = await Promise.resolve().then(() => /* @__PURE__ */ __toESM(require___vite_browser_external(), 1)), L = await Promise.resolve().then(() => /* @__PURE__ */ __toESM(require___vite_browser_external(), 1)), (await Promise.resolve().then(() => /* @__PURE__ */ __toESM(require___vite_browser_external(), 1))).default, x = await Promise.resolve().then(() => /* @__PURE__ */ __toESM(require___vite_browser_external(), 1)), T = x.sep, typeof R < "u")) return;
	let s = {
		fs: B,
		crypto: await Promise.resolve().then(() => /* @__PURE__ */ __toESM(require___vite_browser_external(), 1)),
		ws: await Promise.resolve().then(() => /* @__PURE__ */ __toESM(require___vite_browser_external(), 1)),
		child_process: await Promise.resolve().then(() => /* @__PURE__ */ __toESM(require___vite_browser_external(), 1))
	};
	globalThis.require = function(r) {
		return s[r];
	};
}
o(C, "initNodeModules");
function le(e, t) {
	return x.resolve(t || ".", e);
}
o(le, "node_resolvePath");
function ce(e, t) {
	return t === void 0 && (t = location), new URL(e, t).toString();
}
o(ce, "browser_resolvePath");
var w;
f.IN_NODE ? w = le : f.IN_SHELL ? w = o((e) => e, "resolvePath") : w = ce;
var T;
f.IN_NODE || (T = "/");
function de(e, t) {
	return e.startsWith("file://") && (e = e.slice(7)), e.includes("://") ? { response: fetch(e) } : { binary: L.readFile(e).then((n) => new Uint8Array(n.buffer, n.byteOffset, n.byteLength)) };
}
o(de, "node_getBinaryResponse");
function ue(e, t) {
	if (e.startsWith("file://") && (e = e.slice(7)), e.includes("://")) throw new Error("Shell cannot fetch urls");
	return { binary: Promise.resolve(new Uint8Array(readbuffer(e))) };
}
o(ue, "shell_getBinaryResponse");
function fe(e, t) {
	let n = new URL(e, location);
	return { response: fetch(n, t ? { integrity: t } : {}) };
}
o(fe, "browser_getBinaryResponse");
var _;
f.IN_NODE ? _ = de : f.IN_SHELL ? _ = ue : _ = fe;
async function j(e, t) {
	let { response: n, binary: i } = _(e, t);
	if (i) return i;
	let s = await n;
	if (!s.ok) throw new Error(\`Failed to load '\${e}': request failed.\`);
	return new Uint8Array(await s.arrayBuffer());
}
o(j, "loadBinaryFile");
var O;
f.IN_NODE ? O = me : O = o(async (e) => await import(e), "loadScript");
async function me(e) {
	return e.startsWith("file://") && (e = e.slice(7)), e.includes("://") ? await import(e) : await import($.pathToFileURL(e).href);
}
o(me, "nodeLoadScript");
async function H(e) {
	if (f.IN_NODE) {
		await C();
		let t = await L.readFile(e, { encoding: "utf8" });
		return JSON.parse(t);
	} else if (f.IN_SHELL) {
		let t = read(e);
		return JSON.parse(t);
	} else return await (await fetch(e)).json();
}
o(H, "loadLockFile");
async function J() {
	if (f.IN_NODE_COMMONJS) return __dirname;
	let e;
	try {
		throw new Error();
	} catch (i) {
		e = i;
	}
	let t = M.parse(e)[0].fileName;
	if (f.IN_NODE && !t.startsWith("file://") && (t = \`file://\${t}\`), f.IN_NODE_ESM) {
		let i = await Promise.resolve().then(() => /* @__PURE__ */ __toESM(require___vite_browser_external(), 1));
		return (await Promise.resolve().then(() => /* @__PURE__ */ __toESM(require___vite_browser_external(), 1))).fileURLToPath(i.dirname(t));
	}
	let n = t.lastIndexOf(T);
	if (n === -1) throw new Error("Could not extract indexURL path from pyodide module location. Please pass the indexURL explicitly to loadPyodide.");
	return t.slice(0, n);
}
o(J, "calculateDirname");
function V(e) {
	return e.substring(0, e.lastIndexOf("/") + 1) || globalThis.location?.toString() || ".";
}
o(V, "calculateInstallBaseUrl");
function z(e) {
	let t = e.FS, n = e.FS.filesystems.MEMFS, i = e.PATH, s = {
		DIR_MODE: 16895,
		FILE_MODE: 33279,
		mount: o(function(r) {
			if (!r.opts.fileSystemHandle) throw new Error("opts.fileSystemHandle is required");
			return n.mount.apply(null, arguments);
		}, "mount"),
		syncfs: o(async (r, a, c) => {
			try {
				let l = s.getLocalSet(r), d = await s.getRemoteSet(r), u = a ? d : l, y = a ? l : d;
				await s.reconcile(r, u, y), c(null);
			} catch (l) {
				c(l);
			}
		}, "syncfs"),
		getLocalSet: o((r) => {
			let a = Object.create(null);
			function c(u) {
				return u !== "." && u !== "..";
			}
			o(c, "isRealDir");
			function l(u) {
				return (y) => i.join2(u, y);
			}
			o(l, "toAbsolute");
			let d = t.readdir(r.mountpoint).filter(c).map(l(r.mountpoint));
			for (; d.length;) {
				let u = d.pop(), y = t.stat(u);
				t.isDir(y.mode) && d.push.apply(d, t.readdir(u).filter(c).map(l(u))), a[u] = {
					timestamp: y.mtime,
					mode: y.mode
				};
			}
			return {
				type: "local",
				entries: a
			};
		}, "getLocalSet"),
		getRemoteSet: o(async (r) => {
			let a = Object.create(null), c = await pe(r.opts.fileSystemHandle);
			for (let [l, d] of c) l !== "." && (a[i.join2(r.mountpoint, l)] = {
				timestamp: d.kind === "file" ? new Date((await d.getFile()).lastModified) : /* @__PURE__ */ new Date(),
				mode: d.kind === "file" ? s.FILE_MODE : s.DIR_MODE
			});
			return {
				type: "remote",
				entries: a,
				handles: c
			};
		}, "getRemoteSet"),
		loadLocalEntry: o((r) => {
			let c = t.lookupPath(r, {}).node, l = t.stat(r);
			if (t.isDir(l.mode)) return {
				timestamp: l.mtime,
				mode: l.mode
			};
			if (t.isFile(l.mode)) return c.contents = n.getFileDataAsTypedArray(c), {
				timestamp: l.mtime,
				mode: l.mode,
				contents: c.contents
			};
			throw new Error("node type not supported");
		}, "loadLocalEntry"),
		storeLocalEntry: o((r, a) => {
			if (t.isDir(a.mode)) t.mkdirTree(r, a.mode);
			else if (t.isFile(a.mode)) t.writeFile(r, a.contents, { canOwn: !0 });
			else throw new Error("node type not supported");
			t.chmod(r, a.mode), t.utime(r, a.timestamp, a.timestamp);
		}, "storeLocalEntry"),
		removeLocalEntry: o((r) => {
			var a = t.stat(r);
			t.isDir(a.mode) ? t.rmdir(r) : t.isFile(a.mode) && t.unlink(r);
		}, "removeLocalEntry"),
		loadRemoteEntry: o(async (r) => {
			if (r.kind === "file") {
				let a = await r.getFile();
				return {
					contents: new Uint8Array(await a.arrayBuffer()),
					mode: s.FILE_MODE,
					timestamp: new Date(a.lastModified)
				};
			} else {
				if (r.kind === "directory") return {
					mode: s.DIR_MODE,
					timestamp: /* @__PURE__ */ new Date()
				};
				throw new Error("unknown kind: " + r.kind);
			}
		}, "loadRemoteEntry"),
		storeRemoteEntry: o(async (r, a, c) => {
			let l = r.get(i.dirname(a)), d = t.isFile(c.mode) ? await l.getFileHandle(i.basename(a), { create: !0 }) : await l.getDirectoryHandle(i.basename(a), { create: !0 });
			if (d.kind === "file") {
				let u = await d.createWritable();
				await u.write(c.contents), await u.close();
			}
			r.set(a, d);
		}, "storeRemoteEntry"),
		removeRemoteEntry: o(async (r, a) => {
			await r.get(i.dirname(a)).removeEntry(i.basename(a)), r.delete(a);
		}, "removeRemoteEntry"),
		reconcile: o(async (r, a, c) => {
			let l = 0, d = [];
			Object.keys(a.entries).forEach(function(m) {
				let g = a.entries[m], h = c.entries[m];
				(!h || t.isFile(g.mode) && g.timestamp.getTime() > h.timestamp.getTime()) && (d.push(m), l++);
			}), d.sort();
			let u = [];
			if (Object.keys(c.entries).forEach(function(m) {
				a.entries[m] || (u.push(m), l++);
			}), u.sort().reverse(), !l) return;
			let y = a.type === "remote" ? a.handles : c.handles;
			for (let m of d) {
				let g = i.normalize(m.replace(r.mountpoint, "/")).substring(1);
				if (c.type === "local") {
					let h = y.get(g), X = await s.loadRemoteEntry(h);
					s.storeLocalEntry(m, X);
				} else {
					let h = s.loadLocalEntry(m);
					await s.storeRemoteEntry(y, g, h);
				}
			}
			for (let m of u) if (c.type === "local") s.removeLocalEntry(m);
			else {
				let g = i.normalize(m.replace(r.mountpoint, "/")).substring(1);
				await s.removeRemoteEntry(y, g);
			}
		}, "reconcile")
	};
	e.FS.filesystems.NATIVEFS_ASYNC = s;
}
o(z, "initializeNativeFS");
var pe = o(async (e) => {
	let t = [];
	async function n(s) {
		for await (let r of s.values()) t.push(r), r.kind === "directory" && await n(r);
	}
	o(n, "collect"), await n(e);
	let i = /* @__PURE__ */ new Map();
	i.set(".", e);
	for (let s of t) {
		let r = (await e.resolve(s)).join("/");
		i.set(r, s);
	}
	return i;
}, "getFsHandles");
var G = W("AGFzbQEAAAABDANfAGAAAW9gAW8BfwMDAgECBygCE0pzdl9HZXRFcnJvcl9pbXBvcnQAAA5Kc3ZFcnJvcl9DaGVjawABChMCBwD7AQD7GwsJACAA+xr7FAAL");
var ge = async function() {
	if (!(globalThis.navigator && (/iPad|iPhone|iPod/.test(navigator.userAgent) || navigator.platform === "MacIntel" && typeof navigator.maxTouchPoints < "u" && navigator.maxTouchPoints > 1))) try {
		let t = await WebAssembly.compile(G);
		return await WebAssembly.instantiate(t);
	} catch (t) {
		if (t instanceof WebAssembly.CompileError) return;
		throw t;
	}
}();
async function K() {
	let e = await ge;
	if (e) return e.exports;
	let t = Symbol("error marker");
	return {
		Jsv_GetError_import: o(() => t, "Jsv_GetError_import"),
		JsvError_Check: o((n) => n === t, "JsvError_Check")
	};
}
o(K, "getJsvErrorImport");
function q(e) {
	let t = {
		config: e,
		runtimeEnv: f
	}, n = {
		noImageDecoding: !0,
		noAudioDecoding: !0,
		noWasmDecoding: !1,
		preRun: Ne(e),
		print: e.stdout,
		printErr: e.stderr,
		onExit(i) {
			n.exitCode = i;
		},
		thisProgram: e._sysExecutable,
		arguments: e.args,
		API: t,
		locateFile: o((i) => e.indexURL + i, "locateFile"),
		instantiateWasm: Ie(e.indexURL)
	};
	return n;
}
o(q, "createSettings");
function ve(e) {
	return function(t) {
		let n = "/";
		try {
			t.FS.mkdirTree(e);
		} catch (i) {
			console.error(\`Error occurred while making a home directory '\${e}':\`), console.error(i), console.error(\`Using '\${n}' for a home directory instead\`), e = n;
		}
		t.FS.chdir(e);
	};
}
o(ve, "createHomeDirectory");
function be(e) {
	return function(t) {
		Object.assign(t.ENV, e);
	};
}
o(be, "setEnvironment");
function Ee(e) {
	return e ? [async (t) => {
		t.addRunDependency("fsInitHook");
		try {
			await e(t.FS, { sitePackages: t.API.sitePackages });
		} finally {
			t.removeRunDependency("fsInitHook");
		}
	}] : [];
}
o(Ee, "callFsInitHook");
function Pe(e) {
	let t = e.HEAPU32[e._Py_Version >>> 2];
	return [
		t >>> 24 & 255,
		t >>> 16 & 255,
		t >>> 8 & 255
	];
}
o(Pe, "computeVersionTuple");
function he(e) {
	let t = j(e);
	return async (n) => {
		n.API.pyVersionTuple = Pe(n);
		let [i, s] = n.API.pyVersionTuple;
		n.FS.mkdirTree("/lib"), n.API.sitePackages = \`/lib/python\${i}.\${s}/site-packages\`, n.FS.mkdirTree(n.API.sitePackages), n.FS.mkdirTree(\`/lib/python\${i}.\${s}/lib-dynload\`), n.addRunDependency("install-stdlib");
		try {
			let r = await t;
			n.FS.writeFile(\`/lib/python\${i}\${s}.zip\`, r);
		} catch (r) {
			console.error("Error occurred while installing the standard library:"), console.error(r);
		} finally {
			n.removeRunDependency("install-stdlib");
		}
	};
}
o(he, "installStdlib");
function Ne(e) {
	let t;
	return e.stdLibURL != null ? t = e.stdLibURL : t = e.indexURL + "python_stdlib.zip", [
		he(t),
		ve(e.env.HOME),
		be(e.env),
		z,
		...Ee(e.fsInit)
	];
}
o(Ne, "getFileSystemInitializationFuncs");
function Ie(e) {
	if (typeof WasmOffsetConverter < "u") return;
	let { binary: t, response: n } = _(e + "pyodide.asm.wasm"), i = K();
	return function(s, r) {
		return async function() {
			let { Jsv_GetError_import: a, JsvError_Check: c } = await i;
			s.env.Jsv_GetError_import = a, s.env.JsvError_Check = c;
			try {
				let l;
				n ? l = await WebAssembly.instantiateStreaming(n, s) : l = await WebAssembly.instantiate(await t, s);
				let { instance: d, module: u } = l;
				r(d, u);
			} catch (l) {
				console.warn("wasm instantiation failed!"), console.warn(l);
			}
		}(), {};
	};
}
o(Ie, "getInstantiateWasmFunc");
var Y = "314.0.7";
function k(e) {
	return e === void 0 || e.endsWith("/") ? e : e + "/";
}
o(k, "withTrailingSlash");
var U = Y;
async function Se(e = {}) {
	if (await C(), e.lockFileContents && e.lockFileURL) throw new Error("Can't pass both lockFileContents and lockFileURL");
	let t = e.indexURL || await J();
	if (t = k(w(t)), e.packageBaseUrl = k(e.packageBaseUrl), e.cdnUrl = k(e.packageBaseUrl ?? \`https://cdn.jsdelivr.net/pyodide/v314.0.7/full/\`), !e.lockFileContents) {
		let s = e.lockFileURL ?? t + "pyodide-lock.json";
		e.lockFileContents = H(s), e.packageBaseUrl ??= V(s);
	}
	e.indexURL = t, e.packageCacheDir && (e.packageCacheDir = k(w(e.packageCacheDir)));
	let n = {
		jsglobals: globalThis,
		stdin: globalThis.prompt ? () => globalThis.prompt() : void 0,
		args: [],
		env: {},
		packages: [],
		packageCacheDir: e.packageBaseUrl,
		enableRunUntilComplete: !0,
		checkAPIVersion: !0,
		BUILD_ID: "990c3b51a9722d62434de2bbc9643732658d488c1b6d467f22c1b6beba80d497"
	}, i = Object.assign(n, e);
	return i.env.HOME ??= "/home/pyodide", i.env.PYTHONINSPECT ??= "1", i;
}
o(Se, "initializeConfiguration");
function we(e) {
	let t = q(e), n = t.API;
	return n.lockFilePromise = Promise.resolve(e.lockFileContents), t;
}
o(we, "createEmscriptenSettings");
async function _e(e) {
	if (e.createPyodideModule) return e.createPyodideModule;
	let t = \`\${e.indexURL}pyodide.asm.mjs\`;
	return (await O(t)).default;
}
o(_e, "loadWasmScript");
async function ke(e, t) {
	if (!e._loadSnapshot) return;
	let n = await e._loadSnapshot, i = ArrayBuffer.isView(n) ? n : new Uint8Array(n);
	return t.noInitialRun = !0, t.INITIAL_MEMORY = i.length, i;
}
o(ke, "prepareSnapshot");
async function Re(e, t) {
	let n = await e(t);
	if (t.exitCode !== void 0) throw new n.ExitStatus(t.exitCode);
	return n;
}
o(Re, "instantiatePyodideModule");
function Fe(e, t) {
	let n = e.API;
	if (t.pyproxyToStringRepr && n.setPyProxyToStringMethod(!0), t.convertNullToNone && n.setCompatNullToNone(!0), t.toJsLiteralMap && n.setCompatToJsLiteralMap(!0), n.version !== "314.0.7" && t.checkAPIVersion) throw new Error(\`Pyodide version does not match: '\${U}' <==> '\${n.version}'. If you updated the Pyodide version, make sure you also updated the 'indexURL' parameter passed to loadPyodide.\`);
	e.locateFile = (i) => {
		throw i.endsWith(".so") ? /* @__PURE__ */ new Error(\`Failed to find dynamic library "\${i}"\`) : /* @__PURE__ */ new Error(\`Unexpected call to locateFile("\${i}")\`);
	};
}
o(Fe, "configureAPI");
function Ae(e, t, n) {
	let i = e.API, s;
	return t && (s = i.restoreSnapshot(t)), i.finalizeBootstrap(s, n._snapshotDeserializer);
}
o(Ae, "bootstrapPyodide");
async function Oe(e, t) {
	let n = e._api;
	return n.sys.path.insert(0, ""), n._pyodide.set_excepthook(), await n.packageIndexReady, n.initializeStreams(t.stdin, t.stdout, t.stderr), e;
}
o(Oe, "finalizeSetup");
async function dt(e = {}) {
	let t = await Se(e), n = we(t), i = await _e(t), s = await ke(t, n), r = await Re(i, n);
	Fe(r, t);
	return await Oe(Ae(r, s, t), t);
}
o(dt, "loadPyodide");
// src/pyworker.ts
let pyodide = null;
let interruptBuffer = null;
let inputCounter = 0;
let workspaceRequestCounter = 0;
const pendingInputRequests = /* @__PURE__ */ new Map();
const pendingWorkspaceRequests = /* @__PURE__ */ new Map();
const originalConsole = {
	log: console.log.bind(console),
	info: console.info.bind(console),
	warn: console.warn.bind(console),
	error: console.error.bind(console),
	debug: console.debug.bind(console)
};
function formatArg(arg) {
	if (arg === null) return "null";
	if (arg === void 0) return "undefined";
	if (typeof arg === "string") return arg;
	if (typeof arg === "number" || typeof arg === "boolean") return String(arg);
	if (arg instanceof Error) return \`\${arg.name}: \${arg.message}\`;
	try {
		return JSON.stringify(arg);
	} catch {
		return String(arg);
	}
}
console.log = function(...args) {
	originalConsole.log.apply(console, args);
	self.postMessage({
		id: "console-log",
		type: "console",
		payload: {
			level: "info",
			message: args.map((a) => formatArg(a)).join(" ")
		}
	});
};
console.info = function(...args) {
	originalConsole.info.apply(console, args);
	self.postMessage({
		id: "console-log",
		type: "console",
		payload: {
			level: "info",
			message: args.map((a) => formatArg(a)).join(" ")
		}
	});
};
console.warn = function(...args) {
	originalConsole.warn.apply(console, args);
	self.postMessage({
		id: "console-log",
		type: "console",
		payload: {
			level: "warning",
			message: args.map((a) => formatArg(a)).join(" ")
		}
	});
};
console.error = function(...args) {
	originalConsole.error.apply(console, args);
	self.postMessage({
		id: "console-log",
		type: "console",
		payload: {
			level: "error",
			message: args.map((a) => formatArg(a)).join(" ")
		}
	});
};
console.debug = function(...args) {
	originalConsole.debug.apply(console, args);
	self.postMessage({
		id: "console-log",
		type: "console",
		payload: {
			level: "debug",
			message: args.map((a) => formatArg(a)).join(" ")
		}
	});
};
const consoleBuffer = [];
function sendMessage(response) {
	self.postMessage(response);
}
function createWorkspaceRequest(op, path, extra) {
	const id = \`ws-\${workspaceRequestCounter++}\`;
	return new Promise((resolve, reject) => {
		pendingWorkspaceRequests.set(id, {
			resolve,
			reject
		});
		sendMessage({
			id,
			type: "workspaceRequest",
			payload: {
				op,
				path: path ?? "",
				...extra
			}
		});
	});
}
function createDocksBridge() {
	return {
		read_file: (path, binary) => createWorkspaceRequest("read", path, { binary: !!binary }),
		read_file_range: (path, offset, length, binary) => createWorkspaceRequest("read_range", path, {
			offset,
			length,
			binary: binary !== false
		}),
		write_file: (path, content) => createWorkspaceRequest("write", path, { content }),
		list_dir: (path) => createWorkspaceRequest("list", path || "."),
		exists: (path) => createWorkspaceRequest("exists", path),
		is_file: (path) => createWorkspaceRequest("is_file", path),
		is_dir: (path) => createWorkspaceRequest("is_dir", path),
		get_uri: (path) => createWorkspaceRequest("get_uri", path),
		revoke_uri: (uri) => createWorkspaceRequest("revoke_uri", void 0, { uri }),
		fetch: async (pathOrUri) => {
			const isBlobUrl = typeof pathOrUri === "string" && pathOrUri.startsWith("blob:");
			let url;
			if (isBlobUrl) url = pathOrUri;
			else url = await createWorkspaceRequest("get_uri", pathOrUri);
			const r = await fetch(url);
			if (!isBlobUrl) await createWorkspaceRequest("revoke_uri", void 0, { uri: url });
			return r;
		},
		uri: (path) => {
			const state = {};
			return {
				async __aenter__() {
					state._url = await createWorkspaceRequest("get_uri", path);
					return state._url;
				},
				async __aexit__(_excType, _excVal, _excTb) {
					if (state._url) {
						await createWorkspaceRequest("revoke_uri", void 0, { uri: state._url });
						state._url = void 0;
					}
				}
			};
		}
	};
}
async function initPyodide(payload = {}) {
	const poVersion = package_default.version;
	pyodide = await dt({ indexURL: payload.indexURL ?? \`https://cdn.jsdelivr.net/pyodide/v\${poVersion}/full/\` });
	if (typeof SharedArrayBuffer !== "undefined") try {
		const interruptBufferShared = new SharedArrayBuffer(1);
		interruptBuffer = new Uint8Array(interruptBufferShared);
		pyodide.setInterruptBuffer(interruptBuffer);
		sendMessage({
			id: "interrupt-buffer",
			type: "success",
			payload: interruptBufferShared
		});
	} catch (error) {
		console.warn("Failed to set up interrupt buffer:", error);
		sendMessage({
			id: "interrupt-buffer",
			type: "success",
			payload: void 0
		});
	}
	else {
		console.warn("SharedArrayBuffer not available - interrupt functionality will be limited");
		sendMessage({
			id: "interrupt-buffer",
			type: "success",
			payload: void 0
		});
	}
	pyodide.globals.set("input", (promptText) => {
		const inputId = \`input-\${inputCounter++}\`;
		sendMessage({
			id: inputId,
			type: "inputRequest",
			payload: { prompt: promptText || "" }
		});
		return new Promise((resolve, reject) => {
			pendingInputRequests.set(inputId, {
				resolve,
				reject
			});
		});
	});
	pyodide.setStderr({ batched: (s) => {
		consoleBuffer.push(s);
		sendMessage({
			id: "stream",
			type: "stderr",
			payload: s
		});
	} });
	pyodide.setStdout({ batched: (s) => {
		consoleBuffer.push(s);
		sendMessage({
			id: "stream",
			type: "stdout",
			payload: s
		});
	} });
	const docksBridge = createDocksBridge();
	pyodide.globals.set("__docks_bridge__", docksBridge);
	pyodide.runPython(\`
import sys
import types
__bridge__ = __docks_bridge__
__m__ = types.ModuleType('docks')
for __a__ in ('read_file', 'read_file_range', 'write_file', 'list_dir', 'exists', 'is_file', 'is_dir', 'get_uri', 'revoke_uri', 'fetch', 'uri'):
    setattr(__m__, __a__, getattr(__bridge__, __a__))
sys.modules['docks'] = __m__
del __docks_bridge__, __bridge__, __m__, __a__
\`);
	if (payload.vars) for (const [key, value] of Object.entries(payload.vars)) pyodide.globals.set(key, value);
}
async function loadPackages(payload) {
	if (!pyodide) throw new Error("Pyodide not initialized");
	if (payload.packages.length > 0) await pyodide.loadPackage(payload.packages, { checkIntegrity: false });
}
function convertResult(result) {
	if (result === void 0 || result === null) return result;
	const resultType = typeof result;
	if (resultType === "string" || resultType === "number" || resultType === "boolean") return result;
	if (result && typeof result === "object") {
		if (typeof result.toJs === "function") try {
			const jsValue = result.toJs({
				dict_converter: Object.fromEntries,
				create_pyproxies: false
			});
			if (typeof result.destroy === "function") result.destroy();
			return jsValue;
		} catch (error) {
			try {
				const strValue = String(result);
				if (typeof result.destroy === "function") result.destroy();
				return strValue;
			} catch {
				return "[Python object]";
			}
		}
		try {
			structuredClone(result);
			return result;
		} catch {
			try {
				return JSON.parse(JSON.stringify(result));
			} catch {
				return String(result);
			}
		}
	}
	return result;
}
async function execCode(payload) {
	if (!pyodide) throw new Error("Pyodide not initialized");
	consoleBuffer.length = 0;
	if (interruptBuffer) interruptBuffer[0] = 0;
	let result;
	try {
		result = await pyodide.runPythonAsync(payload.code);
	} catch (error) {
		if (interruptBuffer) interruptBuffer[0] = 0;
		throw error;
	}
	if (interruptBuffer) interruptBuffer[0] = 0;
	return {
		result: convertResult(result),
		console: consoleBuffer.slice()
	};
}
async function execModule(payload) {
	if (!pyodide) throw new Error("Pyodide not initialized");
	consoleBuffer.length = 0;
	const mod = pyodide.pyimport(payload.moduleName);
	const entryName = payload.entryName ?? "main";
	let result;
	if (entryName in mod) {
		const func = mod[entryName];
		if (!(func instanceof Function)) throw new Error(\`Module entry point is not a function: \${entryName}\`);
		result = func.callKwargs(payload.vars || {});
	}
	return {
		result: convertResult(result),
		console: consoleBuffer.slice()
	};
}
async function runFunction(payload) {
	if (!pyodide) throw new Error("Pyodide not initialized");
	consoleBuffer.length = 0;
	const func = pyodide.globals.get(payload.name);
	const result = func.callKwargs(payload.args);
	func.destroy();
	return {
		result: convertResult(result),
		console: consoleBuffer.slice()
	};
}
async function setGlobal(payload) {
	if (!pyodide) throw new Error("Pyodide not initialized");
	pyodide.globals.set(payload.key, payload.value);
}
async function getVersion() {
	if (!pyodide) throw new Error("Pyodide not initialized");
	const result = await pyodide.runPythonAsync("import sys; sys.version.split()[0]");
	return result != null ? String(result) : String(pyodide.version);
}
self.onmessage = async (event) => {
	const { id, type, payload } = event.data;
	if (type === "inputResponse") {
		const pending = pendingInputRequests.get(id);
		if (pending) {
			pendingInputRequests.delete(id);
			if (payload.cancelled) pending.resolve("");
			else pending.resolve(payload.value || "");
		}
		return;
	}
	if (type === "workspaceResponse") {
		const pending = pendingWorkspaceRequests.get(id);
		if (pending) {
			pendingWorkspaceRequests.delete(id);
			if (payload?.success === false) pending.reject(new Error(payload.error ?? "Workspace request failed"));
			else pending.resolve(payload?.data);
		}
		return;
	}
	try {
		let result;
		switch (type) {
			case "init":
				await initPyodide(payload);
				result = { initialized: true };
				break;
			case "loadPackages":
				await loadPackages(payload);
				result = { loaded: true };
				break;
			case "execCode":
				result = await execCode(payload);
				break;
			case "execModule":
				result = await execModule(payload);
				break;
			case "runFunction":
				result = await runFunction(payload);
				break;
			case "setGlobal":
				await setGlobal(payload);
				result = { set: true };
				break;
			case "getVersion":
				result = await getVersion();
				break;
			default: throw new Error(\`Unknown message type: \${type}\`);
		}
		sendMessage({
			id,
			type: "success",
			payload: result
		});
	} catch (error) {
		sendMessage({
			id,
			type: "error",
			payload: {
				message: error instanceof Error ? error.message : String(error),
				stack: error instanceof Error ? error.stack : void 0
			}
		});
	}
};

//# sourceMappingURL=pyworker-D6PiwgAg.js.map`,a=typeof self<`u`&&self.Blob&&new Blob([`URL.revokeObjectURL(import.meta.url);`,i],{type:`text/javascript;charset=utf-8`});function o(e){let t;try{if(t=a&&(self.URL||self.webkitURL).createObjectURL(a),!t)throw``;let n=new Worker(t,{type:`module`,name:e?.name});return n.addEventListener(`error`,()=>{(self.URL||self.webkitURL).revokeObjectURL(t)}),n}catch{return new Worker(`data:text/javascript;charset=utf-8,`+encodeURIComponent(i),{type:`module`,name:e?.name})}}var s=t(`PyService`),c=0,l=class{constructor(){this.pendingMessages=new Map}async init(e){this.vars=e??{};let t=new o;this.worker=t,t.onmessage=e=>{this.handleWorkerMessage(e.data)},t.onerror=e=>{let t=[e.message,e.filename,e.lineno,e.colno].filter(Boolean).join(` `),n=`Python worker failed (script load or uncaught exception)${t?`: ${t}`:``}`;e.error instanceof Error?s.error(n,e.error):s.error(n)},await this.sendMessage(`init`,{vars:this.vars})}async handleWorkspaceRequest(t){let{id:i,payload:a}=t,{op:o,path:s,...c}=a??{},l=(e,t,n)=>{this.worker.postMessage({id:i,type:`workspaceResponse`,payload:{success:e,data:t,error:n}})};try{let t=await r.getWorkspace();if(!t){l(!1,void 0,`No workspace selected`);return}let i=e=>e===``||e===`.`?``:e;switch(o){case`read`:{let n=await t.getResource(i(s));if(!n||!(n instanceof e)){l(!1,void 0,`File not found: ${s}`);return}if(c.binary){let e=await n.getContents({blob:!0});l(!0,e instanceof Blob?await e.arrayBuffer():new ArrayBuffer(0))}else{let e=await n.getContents();l(!0,typeof e==`string`?e:String(e??``))}return}case`read_range`:{let n=await t.getResource(i(s));if(!n||!(n instanceof e)){l(!1,void 0,`File not found: ${s}`);return}let r=Math.max(0,Number(c.offset)||0),a=Math.max(0,Number(c.length)||0),o=c.binary!==!1;if(a===0){l(!0,o?new ArrayBuffer(0):``);return}let u=n,d=await u.getContents({uri:!0});if(typeof d==`string`&&(d.startsWith(`http://`)||d.startsWith(`https://`))){let e=r+a-1,t=await fetch(d,{headers:{Range:`bytes=${r}-${e}`}});if(!t.ok&&t.status!==206){l(!1,void 0,`Range read failed: ${t.status} ${t.statusText}`);return}l(!0,await t.arrayBuffer());return}if(o){let e=await u.getContents({blob:!0});l(!0,(e instanceof Blob?await e.arrayBuffer():new ArrayBuffer(0)).slice(r,r+a));return}let f=await u.getContents();l(!0,(typeof f==`string`?f:String(f??``)).slice(r,r+a));return}case`write`:{let n=c.content;(n instanceof ArrayBuffer||ArrayBuffer.isView(n))&&(n=new Blob([n]));let r=await t.getResource(i(s),{create:!0});if(!r||!(r instanceof e)){l(!1,void 0,`Failed to create file: ${s}`);return}await r.saveContents(n),l(!0);return}case`list`:{let e=await t.getResource(i(s));if(!e||!(e instanceof n)){l(!1,void 0,`Directory not found: ${s}`);return}l(!0,(await e.listChildren(!1)).map(e=>e.getName()));return}case`exists`:l(!0,await t.getResource(i(s))!=null);return;case`is_file`:l(!0,await t.getResource(i(s))instanceof e);return;case`is_dir`:l(!0,await t.getResource(i(s))instanceof n);return;case`get_uri`:{let n=await t.getResource(i(s));if(!n||!(n instanceof e)){l(!1,void 0,`File not found: ${s}`);return}let r=await n.getContents({uri:!0});l(!0,typeof r==`string`?r:void 0);return}case`revoke_uri`:{let e=c.uri;typeof e==`string`&&URL.revokeObjectURL(e),l(!0);return}default:l(!1,void 0,`Unknown workspace op: ${o}`)}}catch(e){l(!1,void 0,e instanceof Error?e.message:String(e))}}handleWorkerMessage(e){if(e.id===`interrupt-buffer`){let t=e.type===`success`?e.payload:void 0;this.interruptBuffer=t instanceof SharedArrayBuffer?new Uint8Array(t):void 0;return}if(e.type===`workspaceRequest`){this.handleWorkspaceRequest(e);return}if(e.type===`inputRequest`){let t=e.payload.prompt||`Input:`,n=window.prompt(t);this.worker.postMessage({id:e.id,type:`inputResponse`,payload:{value:n,cancelled:n===null}});return}if(e.type===`stdout`){this.stdoutCallback?this.stdoutCallback(e.payload):s.debug(e.payload);return}if(e.type===`stderr`){this.stderrCallback?this.stderrCallback(e.payload):s.error(e.payload);return}if(e.type===`console`){let{level:t,message:n}=e.payload;typeof window<`u`&&window.logToTerminal&&window.logToTerminal(`Python Worker`,n,t);return}let t=this.pendingMessages.get(e.id);t&&(this.pendingMessages.delete(e.id),e.type===`success`?t.resolve(e.payload):e.type===`error`&&t.reject(Error(e.payload.message)))}async sendMessage(e,t){if(!this.worker)throw Error(`PyEnv not initialized yet: see init()`);let n=`msg-${c++}`,r={id:n,type:e,payload:t};return new Promise((e,t)=>{this.pendingMessages.set(n,{resolve:e,reject:t}),this.worker.postMessage(r)})}setStdoutCallback(e){this.stdoutCallback=e}setStderrCallback(e){this.stderrCallback=e}async runFunction(e,t){return await this.sendMessage(`runFunction`,{name:e,args:t})}async setGlobal(e,t){await this.sendMessage(`setGlobal`,{key:e,value:t})}async loadPackages(e){e.length>0&&await this.sendMessage(`loadPackages`,{packages:e})}async execCode(e){return await this.sendMessage(`execCode`,{code:e})}async execScript(e,t=!1){let n=e.split(`.`)[0],r=e.includes(`:`)?e.split(`:`).reverse()[0]:void 0;return await this.execModule(n,r)}async execModule(e,t){return await this.sendMessage(`execModule`,{moduleName:e,entryName:t,vars:this.vars})}async getVersion(){return await this.sendMessage(`getVersion`)}canInterrupt(){return this.interruptBuffer!==void 0}interrupt(){this.interruptBuffer&&(this.interruptBuffer[0]=2)}close(){this.worker&&=(this.worker.terminate(),void 0),this.pendingMessages.clear()}};export{l as t};