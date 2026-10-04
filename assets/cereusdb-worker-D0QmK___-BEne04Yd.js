var e=`//#region \\0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __esmMin = (fn, res, err) => () => {
	if (err) throw err[0];
	try {
		return fn && (res = fn(fn = 0)), res;
	} catch (e) {
		throw err = [e], e;
	}
};
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region ../../node_modules/@cereusdb/minimal/dist/wasm/env_shim.js?v=emsdk6-20261001-2
function setMemory$3(mem) {
	_memory$3 = mem;
}
function getDataView$3() {
	return _memory$3 ? new DataView(_memory$3.buffer) : null;
}
function writeU32$3(ptr, value) {
	const view = getDataView$3();
	if (view && ptr) view.setUint32(ptr, value >>> 0, true);
}
function writeU64$3(ptr, value) {
	const view = getDataView$3();
	if (view && ptr) view.setBigUint64(ptr, BigInt(value), true);
}
function readIovs$3(iovs, iovcnt) {
	const view = getDataView$3();
	if (!view) return {
		bytes: /* @__PURE__ */ new Uint8Array(0),
		length: 0
	};
	let length = 0;
	for (let i = 0; i < iovcnt; i++) length += view.getUint32(iovs + i * 8 + 4, true);
	const bytes = new Uint8Array(length);
	let offset = 0;
	for (let i = 0; i < iovcnt; i++) {
		const ptr = view.getUint32(iovs + i * 8, true);
		const len = view.getUint32(iovs + i * 8 + 4, true);
		bytes.set(new Uint8Array(_memory$3.buffer, ptr, len), offset);
		offset += len;
	}
	return {
		bytes,
		length
	};
}
function forwardOutput$3(fd, bytes) {
	if (fd !== 1 && fd !== 2) return;
	const lines = ((_pendingOutput$3.get(fd) ?? "") + _textDecoder$3.decode(bytes)).split("\\n");
	_pendingOutput$3.set(fd, lines.pop());
	const log = fd === 2 ? console.warn : console.log;
	for (const line of lines) if (line.trim()) log(\`[cereusdb] \${line}\`);
}
function createCppException$3(ptr, type, destructor, message = "C++ exception") {
	const error = new WebAssembly.RuntimeError(message);
	error.__cxa_exception_ptr = ptr >>> 0;
	error.__cxa_type = type >>> 0;
	error.__cxa_destructor = destructor >>> 0;
	return error;
}
function createEnvImports$3() {
	return {
		emscripten_resize_heap: (requestedSize) => {
			if (!_memory$3) {
				console.error("[env_shim] emscripten_resize_heap called but no memory set");
				return 0;
			}
			try {
				const oldBytes = _memory$3.buffer.byteLength;
				if (requestedSize <= oldBytes) return 1;
				const pagesToGrow = Math.ceil((requestedSize - oldBytes) / 65536);
				_memory$3.grow(pagesToGrow);
				return 1;
			} catch (e) {
				console.error("[env_shim] memory.grow failed:", e);
				return 0;
			}
		},
		emscripten_get_heap_max: () => 2147483648,
		_Unwind_CallPersonality: () => 0,
		__gxx_wasm_personality_v0: () => 0,
		__cxa_begin_catch: (ptr) => {
			const value = ptr >>> 0;
			_caughtCxaExceptions$3.push(value);
			return value;
		},
		__cxa_end_catch: () => {
			_caughtCxaExceptions$3.pop();
		},
		__cxa_throw: (ptr, type, destructor) => {
			throw createCppException$3(ptr, type, destructor);
		},
		__cxa_rethrow: () => {
			throw createCppException$3(_caughtCxaExceptions$3.length ? _caughtCxaExceptions$3[_caughtCxaExceptions$3.length - 1] : 0, 0, 0, "C++ exception rethrown");
		},
		__c_longjmp: typeof WebAssembly.Tag === "function" ? new WebAssembly.Tag({ parameters: ["i32"] }) : null,
		emscripten_date_now: () => Date.now(),
		emscripten_get_now: () => performance.now(),
		_localtime_js: () => {},
		_tzset_js: () => {},
		__syscall_openat: () => UNSUPPORTED_ERRNO$3,
		__syscall_fcntl64: () => UNSUPPORTED_ERRNO$3,
		__syscall_ioctl: () => UNSUPPORTED_ERRNO$3,
		__syscall_fstat64: () => UNSUPPORTED_ERRNO$3,
		__syscall_stat64: () => UNSUPPORTED_ERRNO$3,
		__syscall_lstat64: () => UNSUPPORTED_ERRNO$3,
		__syscall_newfstatat: () => UNSUPPORTED_ERRNO$3,
		__syscall_getcwd: () => UNSUPPORTED_ERRNO$3,
		__syscall_mkdirat: () => UNSUPPORTED_ERRNO$3,
		__syscall_rmdir: () => UNSUPPORTED_ERRNO$3,
		__syscall_unlinkat: () => UNSUPPORTED_ERRNO$3,
		__syscall_renameat: () => UNSUPPORTED_ERRNO$3,
		__syscall_readlinkat: () => UNSUPPORTED_ERRNO$3,
		__syscall_getdents64: () => UNSUPPORTED_ERRNO$3,
		__syscall_statfs64: () => UNSUPPORTED_ERRNO$3,
		__syscall_faccessat: () => UNSUPPORTED_ERRNO$3,
		__syscall_chmod: () => UNSUPPORTED_ERRNO$3,
		__syscall_fchmod: () => UNSUPPORTED_ERRNO$3,
		__syscall_fchown32: () => UNSUPPORTED_ERRNO$3,
		__syscall_fdatasync: () => 0,
		__syscall_ftruncate64: () => UNSUPPORTED_ERRNO$3,
		__syscall_prlimit64: () => UNSUPPORTED_ERRNO$3,
		__syscall_dup3: () => UNSUPPORTED_ERRNO$3,
		__syscall_pipe: () => UNSUPPORTED_ERRNO$3,
		__syscall_pipe2: () => UNSUPPORTED_ERRNO$3,
		__syscall_wait4: () => UNSUPPORTED_ERRNO$3,
		__syscall_getuid32: () => 0,
		__syscall_geteuid32: () => 0,
		__syscall_getgid32: () => 0,
		__syscall_getegid32: () => 0,
		__syscall_utimensat: () => UNSUPPORTED_ERRNO$3,
		emscripten_errn: () => 0,
		emscripten_stack_snapshot: () => 0,
		emscripten_stack_unwind_buffer: () => 0,
		emscripten_asm_const_int: () => 0,
		HaveOffsetConverter: () => 0,
		emscripten_pc_get_function: () => 0,
		malloc_usable_size: () => 0,
		_mmap_js: () => -1,
		_munmap_js: () => -1,
		__wasm_longjmp: () => {
			throw new WebAssembly.RuntimeError("longjmp is not supported in the browser runtime");
		},
		dlopen: () => 0,
		__dlsym: () => 0,
		vfork: () => -1,
		fork: () => -1,
		execve: () => -1,
		_abort_js: () => {
			console.warn("[env_shim] abort called (ignored)");
		},
		exit: (code) => {
			console.warn(\`exit(\${code})\`);
		}
	};
}
function createWasiImports$3() {
	return {
		fd_close: () => 0,
		fd_write: (fd, iovs, iovcnt, pnum) => {
			const { bytes, length } = readIovs$3(iovs, iovcnt);
			forwardOutput$3(fd, bytes);
			writeU32$3(pnum, length);
			return 0;
		},
		fd_read: (_fd, _iovs, _iovcnt, pnum) => {
			writeU32$3(pnum, 0);
			return 0;
		},
		fd_pwrite: (_fd, iovs, iovcnt, _offset, pnum) => {
			writeU32$3(pnum, readIovs$3(iovs, iovcnt).length);
			return 0;
		},
		fd_pread: (_fd, _iovs, _iovcnt, _offset, pnum) => {
			writeU32$3(pnum, 0);
			return 0;
		},
		fd_seek: (_fd, _offset, _whence, newOffset) => {
			writeU64$3(newOffset, 0);
			return 0;
		},
		fd_sync: () => 0,
		fd_fdstat_get: () => 0,
		clock_res_get: (_clockId, resolutionPtr) => {
			writeU64$3(resolutionPtr, 1e6);
			return 0;
		},
		clock_time_get: (clockId, _precision, timePtr) => {
			writeU64$3(timePtr, clockId === 1 ? Math.floor(performance.now() * 1e6) : Date.now() * 1e6);
			return 0;
		},
		environ_get: () => 0,
		environ_sizes_get: (countPtr, sizePtr) => {
			writeU32$3(countPtr, 0);
			writeU32$3(sizePtr, 0);
			return 0;
		},
		proc_exit: (code) => {
			throw new WebAssembly.RuntimeError(\`proc_exit(\${code})\`);
		},
		random_get: (buf, len) => {
			if (!_memory$3) return -1;
			const bytes = new Uint8Array(_memory$3.buffer, buf, len);
			crypto.getRandomValues(bytes);
			return 0;
		}
	};
}
var _memory$3, _caughtCxaExceptions$3, UNSUPPORTED_ERRNO$3, _textDecoder$3, _pendingOutput$3;
var init_env_shim$3 = __esmMin((() => {
	_memory$3 = null;
	_caughtCxaExceptions$3 = [];
	UNSUPPORTED_ERRNO$3 = -38;
	_textDecoder$3 = new TextDecoder();
	_pendingOutput$3 = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../node_modules/@cereusdb/minimal/dist/wasm/cereusdb-external.js
function __wbg_get_imports$3() {
	return {
		__proto__: null,
		"./cereusdb_bg.js": {
			__proto__: null,
			__wbg_String_8564e559799eccda: function(arg0, arg1) {
				const ptr1 = passStringToWasm0$3(String(arg1), wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN$3;
				getDataViewMemory0$3().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$3().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_debug_string_5398f5bb970e0daa: function(arg0, arg1) {
				const ptr1 = passStringToWasm0$3(debugString$3(arg1), wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN$3;
				getDataViewMemory0$3().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$3().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_is_function_3c846841762788c1: function(arg0) {
				return typeof arg0 === "function";
			},
			__wbg___wbindgen_is_undefined_52709e72fb9f179c: function(arg0) {
				return arg0 === void 0;
			},
			__wbg___wbindgen_throw_6ddd609b62940d55: function(arg0, arg1) {
				throw new WebAssembly.Exception(__wbindgen_wrapped_jstag$3, [new Error(getStringFromWasm0$3(arg0, arg1))]);
			},
			__wbg__wbg_cb_unref_6b5b6b8576d35cb1: function(arg0) {
				arg0._wbg_cb_unref();
			},
			__wbg_arrayBuffer_eb8e9ca620af2a19: function(arg0) {
				return arg0.arrayBuffer();
			},
			__wbg_call_2d781c1f4d5c0ef8: function(arg0, arg1, arg2) {
				return arg0.call(arg1, arg2);
			},
			__wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
				let deferred0_0;
				let deferred0_1;
				try {
					deferred0_0 = arg0;
					deferred0_1 = arg1;
					console.error(getStringFromWasm0$3(arg0, arg1));
				} finally {
					__wbg_termination_guard$3();
					try {
						wasm$3.__wbindgen_free(deferred0_0, deferred0_1, 1);
					} catch (e) {
						__wbg_handle_catch$3(e);
					}
				}
			},
			__wbg_fetch_5550a88cf343aaa9: function(arg0, arg1) {
				return arg0.fetch(arg1);
			},
			__wbg_fetch_f8a611684c3b5fe5: function(arg0, arg1) {
				return arg0.fetch(arg1);
			},
			__wbg_getRandomValues_3f44b700395062e5: function(arg0, arg1) {
				globalThis.crypto.getRandomValues(getArrayU8FromWasm0$3(arg0, arg1));
			},
			__wbg_getRandomValues_a1cf2e70b003a59d: function(arg0, arg1) {
				globalThis.crypto.getRandomValues(getArrayU8FromWasm0$3(arg0, arg1));
			},
			__wbg_getTime_1dad7b5386ddd2d9: function(arg0) {
				return arg0.getTime();
			},
			__wbg_instanceof_Response_9b4d9fd451e051b1: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Response;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Window_23e677d2c6843922: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Window;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_length_ea16607d7b61445b: function(arg0) {
				return arg0.length;
			},
			__wbg_log_524eedafa26daa59: function(arg0) {
				console.log(arg0);
			},
			__wbg_new_0_1dcafdf5e786e876: function() {
				return /* @__PURE__ */ new Date();
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ new Error();
			},
			__wbg_new_5f486cdf45a04d78: function(arg0) {
				return new Uint8Array(arg0);
			},
			__wbg_new_a70fbab9066b301f: function() {
				return new Array();
			},
			__wbg_new_ab79df5bd7c26067: function() {
				return /* @__PURE__ */ new Object();
			},
			__wbg_new_typed_aaaeaf29cf802876: function(arg0, arg1) {
				try {
					var state0 = {
						a: arg0,
						b: arg1
					};
					var cb0 = (arg0, arg1) => {
						const a = state0.a;
						state0.a = 0;
						try {
							return wasm_bindgen__convert__closures_____invoke__h3bcc27440de746c0$3(a, state0.b, arg0, arg1);
						} finally {
							state0.a = a;
						}
					};
					return new Promise(cb0);
				} finally {
					state0.a = state0.b = 0;
				}
			},
			__wbg_new_with_length_825018a1616e9e55: function(arg0) {
				return new Uint8Array(arg0 >>> 0);
			},
			__wbg_new_with_str_and_init_b4b54d1a819bc724: function(arg0, arg1, arg2) {
				return new Request(getStringFromWasm0$3(arg0, arg1), arg2);
			},
			__wbg_now_e7c6795a7f81e10f: function(arg0) {
				return arg0.now();
			},
			__wbg_ok_7ec8b94facac7704: function(arg0) {
				return arg0.ok;
			},
			__wbg_performance_3fcf6e32a7e1ed0a: function(arg0) {
				return arg0.performance;
			},
			__wbg_prototypesetcall_d62e5099504357e6: function(arg0, arg1, arg2) {
				Uint8Array.prototype.set.call(getArrayU8FromWasm0$3(arg0, arg1), arg2);
			},
			__wbg_queueMicrotask_0c399741342fb10f: function(arg0) {
				return arg0.queueMicrotask;
			},
			__wbg_queueMicrotask_a082d78ce798393e: function(arg0) {
				queueMicrotask(arg0);
			},
			__wbg_resolve_ae8d83246e5bcc12: function(arg0) {
				return Promise.resolve(arg0);
			},
			__wbg_set_282384002438957f: function(arg0, arg1, arg2) {
				arg0[arg1 >>> 0] = arg2;
			},
			__wbg_set_8c0b3ffcf05d61c2: function(arg0, arg1, arg2) {
				arg0.set(getArrayU8FromWasm0$3(arg1, arg2));
			},
			__wbg_set_method_8c015e8bcafd7be1: function(arg0, arg1, arg2) {
				arg0.method = getStringFromWasm0$3(arg1, arg2);
			},
			__wbg_set_mode_5a87f2c809cf37c2: function(arg0, arg1) {
				arg0.mode = __wbindgen_enum_RequestMode$3[arg1];
			},
			__wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
				const ret = arg1.stack;
				const ptr1 = passStringToWasm0$3(ret, wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN$3;
				getDataViewMemory0$3().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$3().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg_static_accessor_GLOBAL_8adb955bd33fac2f: function() {
				const ret = typeof global === "undefined" ? null : global;
				return isLikeNone$3(ret) ? 0 : addToExternrefTable0$3(ret);
			},
			__wbg_static_accessor_GLOBAL_THIS_ad356e0db91c7913: function() {
				const ret = typeof globalThis === "undefined" ? null : globalThis;
				return isLikeNone$3(ret) ? 0 : addToExternrefTable0$3(ret);
			},
			__wbg_static_accessor_SELF_f207c857566db248: function() {
				const ret = typeof self === "undefined" ? null : self;
				return isLikeNone$3(ret) ? 0 : addToExternrefTable0$3(ret);
			},
			__wbg_static_accessor_WINDOW_bb9f1ba69d61b386: function() {
				const ret = typeof window === "undefined" ? null : window;
				return isLikeNone$3(ret) ? 0 : addToExternrefTable0$3(ret);
			},
			__wbg_status_318629ab93a22955: function(arg0) {
				return arg0.status;
			},
			__wbg_then_098abe61755d12f6: function(arg0, arg1) {
				return arg0.then(arg1);
			},
			__wbg_then_9e335f6dd892bc11: function(arg0, arg1, arg2) {
				return arg0.then(arg1, arg2);
			},
			__wbindgen_cast_0000000000000001: function(arg0, arg1) {
				return makeMutClosure$3(arg0, arg1, wasm$3.wasm_bindgen__closure__destroy__h8db467765ce434ac, wasm_bindgen__convert__closures_____invoke__h7573a8a64f443504$3);
			},
			__wbindgen_cast_0000000000000002: function(arg0, arg1) {
				return getStringFromWasm0$3(arg0, arg1);
			},
			__wbindgen_init_externref_table: function() {
				const table = wasm$3.__wbindgen_externrefs;
				const offset = table.grow(4);
				table.set(0, void 0);
				table.set(offset + 0, void 0);
				table.set(offset + 1, null);
				table.set(offset + 2, true);
				table.set(offset + 3, false);
			},
			__wbindgen_jstag: WebAssembly.JSTag,
			__wbindgen_wrapped_jstag: __wbindgen_wrapped_jstag$3
		},
		"env": import1$3,
		"env": import2$3,
		"env": import3$3,
		"env": import4$3,
		"env": import5$3,
		"wasi_snapshot_preview1": import6$3,
		"wasi_snapshot_preview1": import7$3,
		"env": import8$3,
		"wasi_snapshot_preview1": import9$3
	};
}
function __wbg_termination_guard$3() {
	__wbg_terminated_addr$3 ??= wasm$3.__instance_terminated.value / 4;
	if (getInt32ArrayMemory0$3()[__wbg_terminated_addr$3]) throw new Error("Module terminated");
}
function __wbg_handle_catch$3(e) {
	if (e instanceof WebAssembly.Exception && e.is(__wbindgen_wrapped_jstag$3)) throw e.getArg(__wbindgen_wrapped_jstag$3, 0);
	getInt32ArrayMemory0$3()[__wbg_terminated_addr$3] = 1;
	throw e;
}
function wasm_bindgen__convert__closures_____invoke__h7573a8a64f443504$3(arg0, arg1, arg2) {
	let ret;
	__wbg_termination_guard$3();
	try {
		ret = wasm$3.wasm_bindgen__convert__closures_____invoke__h7573a8a64f443504(arg0, arg1, arg2);
	} catch (e) {
		__wbg_handle_catch$3(e);
	}
	if (ret[1]) throw takeFromExternrefTable0$3(ret[0]);
}
function wasm_bindgen__convert__closures_____invoke__h3bcc27440de746c0$3(arg0, arg1, arg2, arg3) {
	__wbg_termination_guard$3();
	try {
		wasm$3.wasm_bindgen__convert__closures_____invoke__h3bcc27440de746c0(arg0, arg1, arg2, arg3);
	} catch (e) {
		__wbg_handle_catch$3(e);
	}
}
function addToExternrefTable0$3(obj) {
	const idx = wasm$3.__externref_table_alloc();
	wasm$3.__wbindgen_externrefs.set(idx, obj);
	return idx;
}
function debugString$3(val) {
	const type = typeof val;
	if (type == "number" || type == "boolean" || val == null) return \`\${val}\`;
	if (type == "string") return \`"\${val}"\`;
	if (type == "symbol") {
		const description = val.description;
		if (description == null) return "Symbol";
		else return \`Symbol(\${description})\`;
	}
	if (type == "function") {
		const name = val.name;
		if (typeof name == "string" && name.length > 0) return \`Function(\${name})\`;
		else return "Function";
	}
	if (Array.isArray(val)) {
		const length = val.length;
		let debug = "[";
		if (length > 0) debug += debugString$3(val[0]);
		for (let i = 1; i < length; i++) debug += ", " + debugString$3(val[i]);
		debug += "]";
		return debug;
	}
	const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));
	let className;
	if (builtInMatches && builtInMatches.length > 1) className = builtInMatches[1];
	else return toString.call(val);
	if (className == "Object") try {
		return "Object(" + JSON.stringify(val) + ")";
	} catch (_) {
		return "Object";
	}
	if (val instanceof Error) return \`\${val.name}: \${val.message}\\n\${val.stack}\`;
	return className;
}
function getArrayU8FromWasm0$3(ptr, len) {
	ptr = ptr >>> 0;
	return getUint8ArrayMemory0$3().subarray(ptr / 1, ptr / 1 + len);
}
function getDataViewMemory0$3() {
	if (cachedDataViewMemory0$3 === null || cachedDataViewMemory0$3.buffer.detached === true || cachedDataViewMemory0$3.buffer.detached === void 0 && cachedDataViewMemory0$3.buffer !== wasm$3.memory.buffer) cachedDataViewMemory0$3 = new DataView(wasm$3.memory.buffer);
	return cachedDataViewMemory0$3;
}
function getInt32ArrayMemory0$3() {
	if (cachedInt32ArrayMemory0$3 === null || cachedInt32ArrayMemory0$3.byteLength === 0) cachedInt32ArrayMemory0$3 = new Int32Array(wasm$3.memory.buffer);
	return cachedInt32ArrayMemory0$3;
}
function getStringFromWasm0$3(ptr, len) {
	ptr = ptr >>> 0;
	return decodeText$3(ptr, len);
}
function getUint8ArrayMemory0$3() {
	if (cachedUint8ArrayMemory0$3 === null || cachedUint8ArrayMemory0$3.byteLength === 0) cachedUint8ArrayMemory0$3 = new Uint8Array(wasm$3.memory.buffer);
	return cachedUint8ArrayMemory0$3;
}
function isLikeNone$3(x) {
	return x === void 0 || x === null;
}
function makeMutClosure$3(arg0, arg1, dtor, f) {
	const state = {
		a: arg0,
		b: arg1,
		cnt: 1,
		dtor
	};
	const real = (...args) => {
		state.cnt++;
		const a = state.a;
		state.a = 0;
		try {
			return f(a, state.b, ...args);
		} finally {
			state.a = a;
			real._wbg_cb_unref();
		}
	};
	real._wbg_cb_unref = () => {
		if (--state.cnt === 0) {
			state.dtor(state.a, state.b);
			state.a = 0;
			CLOSURE_DTORS$3.unregister(state);
		}
	};
	CLOSURE_DTORS$3.register(real, state, state);
	return real;
}
function passArray8ToWasm0$3(arg, malloc) {
	const ptr = malloc(arg.length * 1, 1) >>> 0;
	getUint8ArrayMemory0$3().set(arg, ptr / 1);
	WASM_VECTOR_LEN$3 = arg.length;
	return ptr;
}
function passStringToWasm0$3(arg, malloc, realloc) {
	if (realloc === void 0) {
		const buf = cachedTextEncoder$3.encode(arg);
		const ptr = malloc(buf.length, 1) >>> 0;
		getUint8ArrayMemory0$3().subarray(ptr, ptr + buf.length).set(buf);
		WASM_VECTOR_LEN$3 = buf.length;
		return ptr;
	}
	let len = arg.length;
	let ptr = malloc(len, 1) >>> 0;
	const mem = getUint8ArrayMemory0$3();
	let offset = 0;
	for (; offset < len; offset++) {
		const code = arg.charCodeAt(offset);
		if (code > 127) break;
		mem[ptr + offset] = code;
	}
	if (offset !== len) {
		if (offset !== 0) arg = arg.slice(offset);
		ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
		const view = getUint8ArrayMemory0$3().subarray(ptr + offset, ptr + len);
		const ret = cachedTextEncoder$3.encodeInto(arg, view);
		offset += ret.written;
		ptr = realloc(ptr, len, offset, 1) >>> 0;
	}
	WASM_VECTOR_LEN$3 = offset;
	return ptr;
}
function takeFromExternrefTable0$3(idx) {
	const value = wasm$3.__wbindgen_externrefs.get(idx);
	wasm$3.__externref_table_dealloc(idx);
	return value;
}
function decodeText$3(ptr, len) {
	numBytesDecoded$3 += len;
	if (numBytesDecoded$3 >= MAX_SAFARI_DECODE_BYTES$3) {
		cachedTextDecoder$3 = new TextDecoder("utf-8", {
			ignoreBOM: true,
			fatal: true
		});
		cachedTextDecoder$3.decode();
		numBytesDecoded$3 = len;
	}
	return cachedTextDecoder$3.decode(getUint8ArrayMemory0$3().subarray(ptr, ptr + len));
}
function __wbg_finalize_init$3(instance, module) {
	wasm$3 = instance.exports;
	cachedDataViewMemory0$3 = null;
	cachedInt32ArrayMemory0$3 = null;
	cachedUint8ArrayMemory0$3 = null;
	if (typeof wasm$3.__wasm_call_ctors === "function") wasm$3.__wasm_call_ctors();
	wasm$3.__wbindgen_start();
	return wasm$3;
}
async function __wbg_load$3(module, imports) {
	if (typeof Response === "function" && module instanceof Response) {
		if (typeof WebAssembly.instantiateStreaming === "function") try {
			return await WebAssembly.instantiateStreaming(module, imports);
		} catch (e) {
			if (module.ok && expectedResponseType(module.type) && module.headers.get("Content-Type") !== "application/wasm") console.warn("\`WebAssembly.instantiateStreaming\` failed because your server does not serve Wasm with \`application/wasm\` MIME type. Falling back to \`WebAssembly.instantiate\` which is slower. Original error:\\n", e);
			else throw e;
		}
		const bytes = await module.arrayBuffer();
		return await WebAssembly.instantiate(bytes, imports);
	} else {
		const instance = await WebAssembly.instantiate(module, imports);
		if (instance instanceof WebAssembly.Instance) return {
			instance,
			module
		};
		else return instance;
	}
	function expectedResponseType(type) {
		switch (type) {
			case "basic":
			case "cors":
			case "default": return true;
		}
		return false;
	}
}
async function __wbg_init$3(module_or_path) {
	if (wasm$3 !== void 0) return wasm$3;
	if (module_or_path !== void 0) {
		if (Object.getPrototypeOf(module_or_path) === Object.prototype) ({module_or_path} = module_or_path);
		else console.warn("using deprecated parameters for the initialization function; pass a single object instead");
	}
	if (module_or_path === void 0) throw new Error("@cereusdb external entry requires CereusDB.create({ wasmUrl }) or CereusDB.create({ wasmSource })");
	const imports = __wbg_get_imports$3();
	if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) module_or_path = fetch(module_or_path);
	const { instance, module } = await __wbg_load$3(await module_or_path, imports);
	if (instance.exports && instance.exports.memory) setMemory$3(instance.exports.memory);
	return __wbg_finalize_init$3(instance, module);
}
var __env$3, __wasi$3, CereusDB$7, import1$3, import2$3, import3$3, import4$3, import5$3, import6$3, import7$3, import8$3, import9$3, __wbindgen_wrapped_jstag$3, __wbg_terminated_addr$3, __wbindgen_enum_RequestMode$3, CereusDBFinalization$3, CLOSURE_DTORS$3, cachedDataViewMemory0$3, cachedInt32ArrayMemory0$3, cachedUint8ArrayMemory0$3, cachedTextDecoder$3, MAX_SAFARI_DECODE_BYTES$3, numBytesDecoded$3, cachedTextEncoder$3, WASM_VECTOR_LEN$3, wasm$3;
var init_cereusdb_external$3 = __esmMin((() => {
	init_env_shim$3();
	__env$3 = createEnvImports$3();
	__wasi$3 = createWasiImports$3();
	CereusDB$7 = class CereusDB$7 {
		static __wrap(ptr) {
			ptr = ptr >>> 0;
			const obj = Object.create(CereusDB$7.prototype);
			obj.__wbg_ptr = ptr;
			CereusDBFinalization$3.register(obj, obj.__wbg_ptr, obj);
			return obj;
		}
		__destroy_into_raw() {
			const ptr = this.__wbg_ptr;
			this.__wbg_ptr = 0;
			CereusDBFinalization$3.unregister(this);
			return ptr;
		}
		free() {
			const ptr = this.__destroy_into_raw();
			__wbg_termination_guard$3();
			try {
				wasm$3.__wbg_cereusdb_free(ptr, 0);
			} catch (e) {
				__wbg_handle_catch$3(e);
			}
		}
		/**
		* Create a new CereusDB instance.
		* Initializes DataFusion context and registers all spatial functions.
		* @returns {CereusDB}
		*/
		static create() {
			let ret;
			__wbg_termination_guard$3();
			try {
				ret = wasm$3.cereusdb_create();
			} catch (e) {
				__wbg_handle_catch$3(e);
			}
			if (ret[2]) throw takeFromExternrefTable0$3(ret[1]);
			return CereusDB$7.__wrap(ret[0]);
		}
		/**
		* Drop a registered table.
		* @param {string} table_name
		*/
		drop_table(table_name) {
			const ptr0 = passStringToWasm0$3(table_name, wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$3;
			let ret;
			__wbg_termination_guard$3();
			try {
				ret = wasm$3.cereusdb_drop_table(this.__wbg_ptr, ptr0, len0);
			} catch (e) {
				__wbg_handle_catch$3(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$3(ret[0]);
		}
		/**
		* Register a GeoJSON string as a named table.
		* @param {string} table_name
		* @param {string} geojson
		*/
		register_geojson(table_name, geojson) {
			const ptr0 = passStringToWasm0$3(table_name, wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$3;
			const ptr1 = passStringToWasm0$3(geojson, wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN$3;
			let ret;
			__wbg_termination_guard$3();
			try {
				ret = wasm$3.cereusdb_register_geojson(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch$3(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$3(ret[0]);
		}
		/**
		* Register a GeoTIFF buffer as a single-column raster table.
		* Requires the full GDAL-enabled build.
		* @param {string} table_name
		* @param {Uint8Array} data
		*/
		register_geotiff_buffer(table_name, data) {
			const ptr0 = passStringToWasm0$3(table_name, wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$3;
			const ptr1 = passArray8ToWasm0$3(data, wasm$3.__wbindgen_malloc);
			const len1 = WASM_VECTOR_LEN$3;
			let ret;
			__wbg_termination_guard$3();
			try {
				ret = wasm$3.cereusdb_register_geotiff_buffer(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch$3(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$3(ret[0]);
		}
		/**
		* Register browser-backed object stores for ranged/listing reads.
		* @param {any} config
		*/
		register_object_stores(config) {
			let ret;
			__wbg_termination_guard$3();
			try {
				ret = wasm$3.cereusdb_register_object_stores(this.__wbg_ptr, config);
			} catch (e) {
				__wbg_handle_catch$3(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$3(ret[0]);
		}
		/**
		* Register a Uint8Array containing Parquet data as a named table.
		* Use for files obtained via the browser File API.
		* @param {string} table_name
		* @param {Uint8Array} data
		* @returns {Promise<void>}
		*/
		register_parquet_buffer(table_name, data) {
			const ptr0 = passStringToWasm0$3(table_name, wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$3;
			const ptr1 = passArray8ToWasm0$3(data, wasm$3.__wbindgen_malloc);
			const len1 = WASM_VECTOR_LEN$3;
			let ret;
			__wbg_termination_guard$3();
			try {
				ret = wasm$3.cereusdb_register_parquet_buffer(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch$3(e);
			}
			return ret;
		}
		/**
		* Register a remote Parquet object or prefix as a DataFusion listing table.
		* @param {string} table_name
		* @param {string} table_url
		* @param {any} options
		* @returns {Promise<void>}
		*/
		register_parquet_table(table_name, table_url, options) {
			const ptr0 = passStringToWasm0$3(table_name, wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$3;
			const ptr1 = passStringToWasm0$3(table_url, wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN$3;
			let ret;
			__wbg_termination_guard$3();
			try {
				ret = wasm$3.cereusdb_register_parquet_table(this.__wbg_ptr, ptr0, len0, ptr1, len1, options);
			} catch (e) {
				__wbg_handle_catch$3(e);
			}
			return ret;
		}
		/**
		* Register a raster buffer as a single-column raster table.
		* Requires the full GDAL-enabled build.
		* @param {string} table_name
		* @param {string} format
		* @param {Uint8Array} data
		*/
		register_raster_buffer(table_name, format, data) {
			const ptr0 = passStringToWasm0$3(table_name, wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$3;
			const ptr1 = passStringToWasm0$3(format, wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN$3;
			const ptr2 = passArray8ToWasm0$3(data, wasm$3.__wbindgen_malloc);
			const len2 = WASM_VECTOR_LEN$3;
			let ret;
			__wbg_termination_guard$3();
			try {
				ret = wasm$3.cereusdb_register_raster_buffer(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
			} catch (e) {
				__wbg_handle_catch$3(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$3(ret[0]);
		}
		/**
		* Register a remote Parquet file URL as a named table.
		* Pre-fetches the entire file via HTTP, then loads into memory.
		* The server must support CORS.
		* @param {string} table_name
		* @param {string} url
		* @returns {Promise<void>}
		*/
		register_remote_parquet(table_name, url) {
			const ptr0 = passStringToWasm0$3(table_name, wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$3;
			const ptr1 = passStringToWasm0$3(url, wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN$3;
			let ret;
			__wbg_termination_guard$3();
			try {
				ret = wasm$3.cereusdb_register_remote_parquet(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch$3(e);
			}
			return ret;
		}
		/**
		* Execute a SQL query.
		* Returns results as Arrow IPC bytes (Uint8Array).
		* The caller can decode this with the apache-arrow JS library.
		* @param {string} query
		* @returns {Promise<Uint8Array>}
		*/
		sql(query) {
			const ptr0 = passStringToWasm0$3(query, wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$3;
			let ret;
			__wbg_termination_guard$3();
			try {
				ret = wasm$3.cereusdb_sql(this.__wbg_ptr, ptr0, len0);
			} catch (e) {
				__wbg_handle_catch$3(e);
			}
			return ret;
		}
		/**
		* Execute a SQL query and return results as a JSON string.
		* Convenience method for simple use cases.
		* @param {string} query
		* @returns {Promise<string>}
		*/
		sql_json(query) {
			const ptr0 = passStringToWasm0$3(query, wasm$3.__wbindgen_malloc, wasm$3.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$3;
			let ret;
			__wbg_termination_guard$3();
			try {
				ret = wasm$3.cereusdb_sql_json(this.__wbg_ptr, ptr0, len0);
			} catch (e) {
				__wbg_handle_catch$3(e);
			}
			return ret;
		}
		/**
		* List all registered table names.
		* @returns {any}
		*/
		tables() {
			let ret;
			__wbg_termination_guard$3();
			try {
				ret = wasm$3.cereusdb_tables(this.__wbg_ptr);
			} catch (e) {
				__wbg_handle_catch$3(e);
			}
			if (ret[2]) throw takeFromExternrefTable0$3(ret[1]);
			return takeFromExternrefTable0$3(ret[0]);
		}
		/**
		* Get version information.
		*
		* Release builds set \`CEREUSDB_VERSION\` to the full npm version, including
		* prerelease suffixes; other builds fall back to the crate version.
		* @returns {string}
		*/
		version() {
			let deferred1_0;
			let deferred1_1;
			try {
				let ret;
				__wbg_termination_guard$3();
				try {
					ret = wasm$3.cereusdb_version(this.__wbg_ptr);
				} catch (e) {
					__wbg_handle_catch$3(e);
				}
				deferred1_0 = ret[0];
				deferred1_1 = ret[1];
				return getStringFromWasm0$3(ret[0], ret[1]);
			} finally {
				__wbg_termination_guard$3();
				try {
					wasm$3.__wbindgen_free(deferred1_0, deferred1_1, 1);
				} catch (e) {
					__wbg_handle_catch$3(e);
				}
			}
		}
	};
	if (Symbol.dispose) CereusDB$7.prototype[Symbol.dispose] = CereusDB$7.prototype.free;
	import1$3 = __env$3;
	import2$3 = __env$3;
	import3$3 = __env$3;
	import4$3 = __env$3;
	import5$3 = __env$3;
	import6$3 = __wasi$3;
	import7$3 = __wasi$3;
	import8$3 = __env$3;
	import9$3 = __wasi$3;
	__wbindgen_wrapped_jstag$3 = new WebAssembly.Tag({ parameters: ["externref"] });
	__wbindgen_enum_RequestMode$3 = [
		"same-origin",
		"no-cors",
		"cors",
		"navigate"
	];
	CereusDBFinalization$3 = typeof FinalizationRegistry === "undefined" ? {
		register: () => {},
		unregister: () => {}
	} : new FinalizationRegistry((ptr) => wasm$3.__wbg_cereusdb_free(ptr >>> 0, 1));
	CLOSURE_DTORS$3 = typeof FinalizationRegistry === "undefined" ? {
		register: () => {},
		unregister: () => {}
	} : new FinalizationRegistry((state) => state.dtor(state.a, state.b));
	cachedDataViewMemory0$3 = null;
	cachedInt32ArrayMemory0$3 = null;
	cachedUint8ArrayMemory0$3 = null;
	cachedTextDecoder$3 = new TextDecoder("utf-8", {
		ignoreBOM: true,
		fatal: true
	});
	cachedTextDecoder$3.decode();
	MAX_SAFARI_DECODE_BYTES$3 = 2146435072;
	numBytesDecoded$3 = 0;
	cachedTextEncoder$3 = new TextEncoder();
	if (!("encodeInto" in cachedTextEncoder$3)) cachedTextEncoder$3.encodeInto = function(arg, view) {
		const buf = cachedTextEncoder$3.encode(arg);
		view.set(buf);
		return {
			read: arg.length,
			written: buf.length
		};
	};
	WASM_VECTOR_LEN$3 = 0;
}));
//#endregion
//#region ../../node_modules/@cereusdb/minimal/dist/external.js
var external_exports$3 = /* @__PURE__ */ __exportAll({ CereusDB: () => CereusDB$6 });
function toUint8Array$3(data) {
	if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
	return new Uint8Array(data);
}
function normalizeRasterFormat$3(format) {
	const normalized = format.trim().toLowerCase();
	if (normalized === "geotiff" || normalized === "tiff") return normalized;
	throw new Error(\`Unsupported raster format: \${format}\`);
}
var CereusDB$6;
var init_external$3 = __esmMin((() => {
	init_cereusdb_external$3();
	CereusDB$6 = class CereusDB$6 {
		constructor(inner) {
			this.inner = inner;
		}
		/**
		* Create and initialize a new CereusDB instance.
		* This loads the WASM module and initializes the query engine.
		*/
		static async create(options) {
			const source = options?.wasmSource ?? options?.wasmUrl;
			if (source === void 0) await __wbg_init$3();
			else await __wbg_init$3({ module_or_path: source });
			const inner = CereusDB$7.create();
			const db = new CereusDB$6(inner);
			if (options?.objectStores !== void 0) db.registerObjectStores(options.objectStores);
			return db;
		}
		/**
		* Execute a SQL query and return results as Arrow IPC bytes.
		*/
		async sql(query) {
			return await this.inner.sql(query);
		}
		/**
		* Execute a SQL query and return results as JSON.
		*/
		async sqlJSON(query) {
			const json = await this.inner.sql_json(query);
			return JSON.parse(json);
		}
		/**
		* Register a remote Parquet file as a table.
		* The server must support CORS.
		*/
		async registerRemoteParquet(name, url) {
			await this.inner.register_remote_parquet(name, url);
		}
		/**
		* Register browser-backed object stores for ranged and listing reads.
		*/
		registerObjectStores(config) {
			this.objectStoreApi().register_object_stores(config);
		}
		/**
		* Register a remote Parquet object or prefix through DataFusion's listing table path.
		*/
		async registerParquetTable(name, url, options = {}) {
			await this.objectStoreApi().register_parquet_table(name, url, options);
		}
		/**
		* Register a local file (from File API / drag-and-drop) as a table.
		* Currently supports Parquet, GeoJSON, and GeoTIFF rasters.
		*/
		async registerFile(name, file) {
			const buffer = new Uint8Array(await file.arrayBuffer());
			const ext = file.name.split(".").pop()?.toLowerCase();
			if (ext === "parquet" || ext === "geoparquet") await this.inner.register_parquet_buffer(name, buffer);
			else if (ext === "geojson" || ext === "json") {
				const text = new TextDecoder().decode(buffer);
				this.inner.register_geojson(name, text);
			} else if (ext === "tif" || ext === "tiff") this.registerRaster(name, buffer, "geotiff");
			else throw new Error(\`Unsupported file format: .\${ext}\`);
		}
		/**
		* Register a GeoJSON object or string as a table.
		*/
		registerGeoJSON(name, geojson) {
			const str = typeof geojson === "string" ? geojson : JSON.stringify(geojson);
			this.inner.register_geojson(name, str);
		}
		/**
		* Register a raster buffer as a single-column raster table.
		* Requires the full GDAL-enabled package build.
		*/
		registerRaster(name, data, format) {
			this.inner.register_raster_buffer(name, normalizeRasterFormat$3(format), toUint8Array$3(data));
		}
		/**
		* Register a GeoTIFF buffer as a single-column raster table.
		* Requires the full GDAL-enabled package build.
		*/
		registerGeoTIFF(name, data) {
			this.registerRaster(name, data, "geotiff");
		}
		/** Drop a table. */
		dropTable(name) {
			this.inner.drop_table(name);
		}
		/** List registered tables. */
		tables() {
			return this.inner.tables();
		}
		/** Version string. */
		version() {
			return this.inner.version();
		}
		objectStoreApi() {
			const api = this.inner;
			if (typeof api.register_object_stores !== "function" || typeof api.register_parquet_table !== "function") throw new Error("Browser object stores are not available in this CereusDB build");
			return api;
		}
	};
}));
//#endregion
//#region ../../node_modules/@cereusdb/standard/dist/wasm/env_shim.js?v=emsdk6-20261001-2
function setMemory$2(mem) {
	_memory$2 = mem;
}
function getDataView$2() {
	return _memory$2 ? new DataView(_memory$2.buffer) : null;
}
function writeU32$2(ptr, value) {
	const view = getDataView$2();
	if (view && ptr) view.setUint32(ptr, value >>> 0, true);
}
function writeU64$2(ptr, value) {
	const view = getDataView$2();
	if (view && ptr) view.setBigUint64(ptr, BigInt(value), true);
}
function readIovs$2(iovs, iovcnt) {
	const view = getDataView$2();
	if (!view) return {
		bytes: /* @__PURE__ */ new Uint8Array(0),
		length: 0
	};
	let length = 0;
	for (let i = 0; i < iovcnt; i++) length += view.getUint32(iovs + i * 8 + 4, true);
	const bytes = new Uint8Array(length);
	let offset = 0;
	for (let i = 0; i < iovcnt; i++) {
		const ptr = view.getUint32(iovs + i * 8, true);
		const len = view.getUint32(iovs + i * 8 + 4, true);
		bytes.set(new Uint8Array(_memory$2.buffer, ptr, len), offset);
		offset += len;
	}
	return {
		bytes,
		length
	};
}
function forwardOutput$2(fd, bytes) {
	if (fd !== 1 && fd !== 2) return;
	const lines = ((_pendingOutput$2.get(fd) ?? "") + _textDecoder$2.decode(bytes)).split("\\n");
	_pendingOutput$2.set(fd, lines.pop());
	const log = fd === 2 ? console.warn : console.log;
	for (const line of lines) if (line.trim()) log(\`[cereusdb] \${line}\`);
}
function createCppException$2(ptr, type, destructor, message = "C++ exception") {
	const error = new WebAssembly.RuntimeError(message);
	error.__cxa_exception_ptr = ptr >>> 0;
	error.__cxa_type = type >>> 0;
	error.__cxa_destructor = destructor >>> 0;
	return error;
}
function createEnvImports$2() {
	return {
		emscripten_resize_heap: (requestedSize) => {
			if (!_memory$2) {
				console.error("[env_shim] emscripten_resize_heap called but no memory set");
				return 0;
			}
			try {
				const oldBytes = _memory$2.buffer.byteLength;
				if (requestedSize <= oldBytes) return 1;
				const pagesToGrow = Math.ceil((requestedSize - oldBytes) / 65536);
				_memory$2.grow(pagesToGrow);
				return 1;
			} catch (e) {
				console.error("[env_shim] memory.grow failed:", e);
				return 0;
			}
		},
		emscripten_get_heap_max: () => 2147483648,
		_Unwind_CallPersonality: () => 0,
		__gxx_wasm_personality_v0: () => 0,
		__cxa_begin_catch: (ptr) => {
			const value = ptr >>> 0;
			_caughtCxaExceptions$2.push(value);
			return value;
		},
		__cxa_end_catch: () => {
			_caughtCxaExceptions$2.pop();
		},
		__cxa_throw: (ptr, type, destructor) => {
			throw createCppException$2(ptr, type, destructor);
		},
		__cxa_rethrow: () => {
			throw createCppException$2(_caughtCxaExceptions$2.length ? _caughtCxaExceptions$2[_caughtCxaExceptions$2.length - 1] : 0, 0, 0, "C++ exception rethrown");
		},
		__c_longjmp: typeof WebAssembly.Tag === "function" ? new WebAssembly.Tag({ parameters: ["i32"] }) : null,
		emscripten_date_now: () => Date.now(),
		emscripten_get_now: () => performance.now(),
		_localtime_js: () => {},
		_tzset_js: () => {},
		__syscall_openat: () => UNSUPPORTED_ERRNO$2,
		__syscall_fcntl64: () => UNSUPPORTED_ERRNO$2,
		__syscall_ioctl: () => UNSUPPORTED_ERRNO$2,
		__syscall_fstat64: () => UNSUPPORTED_ERRNO$2,
		__syscall_stat64: () => UNSUPPORTED_ERRNO$2,
		__syscall_lstat64: () => UNSUPPORTED_ERRNO$2,
		__syscall_newfstatat: () => UNSUPPORTED_ERRNO$2,
		__syscall_getcwd: () => UNSUPPORTED_ERRNO$2,
		__syscall_mkdirat: () => UNSUPPORTED_ERRNO$2,
		__syscall_rmdir: () => UNSUPPORTED_ERRNO$2,
		__syscall_unlinkat: () => UNSUPPORTED_ERRNO$2,
		__syscall_renameat: () => UNSUPPORTED_ERRNO$2,
		__syscall_readlinkat: () => UNSUPPORTED_ERRNO$2,
		__syscall_getdents64: () => UNSUPPORTED_ERRNO$2,
		__syscall_statfs64: () => UNSUPPORTED_ERRNO$2,
		__syscall_faccessat: () => UNSUPPORTED_ERRNO$2,
		__syscall_chmod: () => UNSUPPORTED_ERRNO$2,
		__syscall_fchmod: () => UNSUPPORTED_ERRNO$2,
		__syscall_fchown32: () => UNSUPPORTED_ERRNO$2,
		__syscall_fdatasync: () => 0,
		__syscall_ftruncate64: () => UNSUPPORTED_ERRNO$2,
		__syscall_prlimit64: () => UNSUPPORTED_ERRNO$2,
		__syscall_dup3: () => UNSUPPORTED_ERRNO$2,
		__syscall_pipe: () => UNSUPPORTED_ERRNO$2,
		__syscall_pipe2: () => UNSUPPORTED_ERRNO$2,
		__syscall_wait4: () => UNSUPPORTED_ERRNO$2,
		__syscall_getuid32: () => 0,
		__syscall_geteuid32: () => 0,
		__syscall_getgid32: () => 0,
		__syscall_getegid32: () => 0,
		__syscall_utimensat: () => UNSUPPORTED_ERRNO$2,
		emscripten_errn: () => 0,
		emscripten_stack_snapshot: () => 0,
		emscripten_stack_unwind_buffer: () => 0,
		emscripten_asm_const_int: () => 0,
		HaveOffsetConverter: () => 0,
		emscripten_pc_get_function: () => 0,
		malloc_usable_size: () => 0,
		_mmap_js: () => -1,
		_munmap_js: () => -1,
		__wasm_longjmp: () => {
			throw new WebAssembly.RuntimeError("longjmp is not supported in the browser runtime");
		},
		dlopen: () => 0,
		__dlsym: () => 0,
		vfork: () => -1,
		fork: () => -1,
		execve: () => -1,
		_abort_js: () => {
			console.warn("[env_shim] abort called (ignored)");
		},
		exit: (code) => {
			console.warn(\`exit(\${code})\`);
		}
	};
}
function createWasiImports$2() {
	return {
		fd_close: () => 0,
		fd_write: (fd, iovs, iovcnt, pnum) => {
			const { bytes, length } = readIovs$2(iovs, iovcnt);
			forwardOutput$2(fd, bytes);
			writeU32$2(pnum, length);
			return 0;
		},
		fd_read: (_fd, _iovs, _iovcnt, pnum) => {
			writeU32$2(pnum, 0);
			return 0;
		},
		fd_pwrite: (_fd, iovs, iovcnt, _offset, pnum) => {
			writeU32$2(pnum, readIovs$2(iovs, iovcnt).length);
			return 0;
		},
		fd_pread: (_fd, _iovs, _iovcnt, _offset, pnum) => {
			writeU32$2(pnum, 0);
			return 0;
		},
		fd_seek: (_fd, _offset, _whence, newOffset) => {
			writeU64$2(newOffset, 0);
			return 0;
		},
		fd_sync: () => 0,
		fd_fdstat_get: () => 0,
		clock_res_get: (_clockId, resolutionPtr) => {
			writeU64$2(resolutionPtr, 1e6);
			return 0;
		},
		clock_time_get: (clockId, _precision, timePtr) => {
			writeU64$2(timePtr, clockId === 1 ? Math.floor(performance.now() * 1e6) : Date.now() * 1e6);
			return 0;
		},
		environ_get: () => 0,
		environ_sizes_get: (countPtr, sizePtr) => {
			writeU32$2(countPtr, 0);
			writeU32$2(sizePtr, 0);
			return 0;
		},
		proc_exit: (code) => {
			throw new WebAssembly.RuntimeError(\`proc_exit(\${code})\`);
		},
		random_get: (buf, len) => {
			if (!_memory$2) return -1;
			const bytes = new Uint8Array(_memory$2.buffer, buf, len);
			crypto.getRandomValues(bytes);
			return 0;
		}
	};
}
var _memory$2, _caughtCxaExceptions$2, UNSUPPORTED_ERRNO$2, _textDecoder$2, _pendingOutput$2;
var init_env_shim$2 = __esmMin((() => {
	_memory$2 = null;
	_caughtCxaExceptions$2 = [];
	UNSUPPORTED_ERRNO$2 = -38;
	_textDecoder$2 = new TextDecoder();
	_pendingOutput$2 = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../node_modules/@cereusdb/standard/dist/wasm/snippets/cereusdb-object-store-0da8c74e50551289/inline0.js
function cereusdbPumpFetchQueue$2() {
	while (cereusdbFetchActive$2 < cereusdbFetchMaxConcurrency$2 && cereusdbFetchQueue$2.length > 0) {
		const task = cereusdbFetchQueue$2.shift();
		cereusdbFetchActive$2 += 1;
		cereusdbExecuteFetch$2(task.request).then(task.resolve, task.reject).finally(() => {
			cereusdbFetchActive$2 -= 1;
			cereusdbPumpFetchQueue$2();
		});
	}
}
async function cereusdbExecuteFetch$2(request) {
	const headers = new Headers();
	for (const [name, value] of request.headers) headers.append(name, value);
	const init = {
		method: request.method,
		headers
	};
	if (request.body !== void 0 && request.body !== null) init.body = request.body;
	const response = await fetch(request.url, init);
	const responseHeaders = [];
	response.headers.forEach((value, name) => {
		responseHeaders.push([name, value]);
	});
	return {
		status: response.status,
		statusText: response.statusText,
		headers: responseHeaders,
		body: new Uint8Array(await response.arrayBuffer())
	};
}
function cereusdbSetFetchConcurrency$2(maxConcurrency) {
	const parsed = Number(maxConcurrency);
	if (Number.isFinite(parsed) && parsed >= 1) {
		cereusdbFetchMaxConcurrency$2 = Math.min(Math.trunc(parsed), 256);
		cereusdbPumpFetchQueue$2();
	}
}
function cereusdbFetch$2(request) {
	return new Promise((resolve, reject) => {
		cereusdbFetchQueue$2.push({
			request,
			resolve,
			reject
		});
		cereusdbPumpFetchQueue$2();
	});
}
var cereusdbFetchMaxConcurrency$2, cereusdbFetchActive$2, cereusdbFetchQueue$2;
var init_inline0$2 = __esmMin((() => {
	cereusdbFetchMaxConcurrency$2 = 16;
	cereusdbFetchActive$2 = 0;
	cereusdbFetchQueue$2 = [];
}));
//#endregion
//#region ../../node_modules/@cereusdb/standard/dist/wasm/cereusdb-external.js
function __wbg_get_imports$2() {
	return {
		__proto__: null,
		"./cereusdb_bg.js": {
			__proto__: null,
			__wbg_Error_83742b46f01ce22d: function(arg0, arg1) {
				return Error(getStringFromWasm0$2(arg0, arg1));
			},
			__wbg_Number_a5a435bd7bbec835: function(arg0) {
				return Number(arg0);
			},
			__wbg_String_8564e559799eccda: function(arg0, arg1) {
				const ptr1 = passStringToWasm0$2(String(arg1), wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN$2;
				getDataViewMemory0$2().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$2().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_bigint_get_as_i64_447a76b5c6ef7bda: function(arg0, arg1) {
				const v = arg1;
				const ret = typeof v === "bigint" ? v : void 0;
				getDataViewMemory0$2().setBigInt64(arg0 + 8, isLikeNone$2(ret) ? BigInt(0) : ret, true);
				getDataViewMemory0$2().setInt32(arg0 + 0, !isLikeNone$2(ret), true);
			},
			__wbg___wbindgen_boolean_get_c0f3f60bac5a78d1: function(arg0) {
				const v = arg0;
				const ret = typeof v === "boolean" ? v : void 0;
				return isLikeNone$2(ret) ? 16777215 : ret ? 1 : 0;
			},
			__wbg___wbindgen_debug_string_5398f5bb970e0daa: function(arg0, arg1) {
				const ptr1 = passStringToWasm0$2(debugString$2(arg1), wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN$2;
				getDataViewMemory0$2().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$2().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_in_41dbb8413020e076: function(arg0, arg1) {
				return arg0 in arg1;
			},
			__wbg___wbindgen_is_bigint_e2141d4f045b7eda: function(arg0) {
				return typeof arg0 === "bigint";
			},
			__wbg___wbindgen_is_function_3c846841762788c1: function(arg0) {
				return typeof arg0 === "function";
			},
			__wbg___wbindgen_is_null_0b605fc6b167c56f: function(arg0) {
				return arg0 === null;
			},
			__wbg___wbindgen_is_object_781bc9f159099513: function(arg0) {
				const val = arg0;
				return typeof val === "object" && val !== null;
			},
			__wbg___wbindgen_is_string_7ef6b97b02428fae: function(arg0) {
				return typeof arg0 === "string";
			},
			__wbg___wbindgen_is_undefined_52709e72fb9f179c: function(arg0) {
				return arg0 === void 0;
			},
			__wbg___wbindgen_jsval_eq_ee31bfad3e536463: function(arg0, arg1) {
				return arg0 === arg1;
			},
			__wbg___wbindgen_jsval_loose_eq_5bcc3bed3c69e72b: function(arg0, arg1) {
				return arg0 == arg1;
			},
			__wbg___wbindgen_number_get_34bb9d9dcfa21373: function(arg0, arg1) {
				const obj = arg1;
				const ret = typeof obj === "number" ? obj : void 0;
				getDataViewMemory0$2().setFloat64(arg0 + 8, isLikeNone$2(ret) ? 0 : ret, true);
				getDataViewMemory0$2().setInt32(arg0 + 0, !isLikeNone$2(ret), true);
			},
			__wbg___wbindgen_string_get_395e606bd0ee4427: function(arg0, arg1) {
				const obj = arg1;
				const ret = typeof obj === "string" ? obj : void 0;
				var ptr1 = isLikeNone$2(ret) ? 0 : passStringToWasm0$2(ret, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
				var len1 = WASM_VECTOR_LEN$2;
				getDataViewMemory0$2().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$2().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_throw_6ddd609b62940d55: function(arg0, arg1) {
				throw new WebAssembly.Exception(__wbindgen_wrapped_jstag$2, [new Error(getStringFromWasm0$2(arg0, arg1))]);
			},
			__wbg__wbg_cb_unref_6b5b6b8576d35cb1: function(arg0) {
				arg0._wbg_cb_unref();
			},
			__wbg_arrayBuffer_eb8e9ca620af2a19: function(arg0) {
				return arg0.arrayBuffer();
			},
			__wbg_call_2d781c1f4d5c0ef8: function(arg0, arg1, arg2) {
				return arg0.call(arg1, arg2);
			},
			__wbg_call_e133b57c9155d22c: function(arg0, arg1) {
				return arg0.call(arg1);
			},
			__wbg_cereusdbFetch_ef03c6e2e53e5d27: function(arg0) {
				return cereusdbFetch$2(arg0);
			},
			__wbg_cereusdbSetFetchConcurrency_5dba4b72020a565e: function(arg0) {
				cereusdbSetFetchConcurrency$2(arg0 >>> 0);
			},
			__wbg_done_08ce71ee07e3bd17: function(arg0) {
				return arg0.done;
			},
			__wbg_entries_e8a20ff8c9757101: function(arg0) {
				return Object.entries(arg0);
			},
			__wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
				let deferred0_0;
				let deferred0_1;
				try {
					deferred0_0 = arg0;
					deferred0_1 = arg1;
					console.error(getStringFromWasm0$2(arg0, arg1));
				} finally {
					__wbg_termination_guard$2();
					try {
						wasm$2.__wbindgen_free(deferred0_0, deferred0_1, 1);
					} catch (e) {
						__wbg_handle_catch$2(e);
					}
				}
			},
			__wbg_fetch_5550a88cf343aaa9: function(arg0, arg1) {
				return arg0.fetch(arg1);
			},
			__wbg_fetch_f8a611684c3b5fe5: function(arg0, arg1) {
				return arg0.fetch(arg1);
			},
			__wbg_getRandomValues_3f44b700395062e5: function(arg0, arg1) {
				globalThis.crypto.getRandomValues(getArrayU8FromWasm0$2(arg0, arg1));
			},
			__wbg_getRandomValues_a1cf2e70b003a59d: function(arg0, arg1) {
				globalThis.crypto.getRandomValues(getArrayU8FromWasm0$2(arg0, arg1));
			},
			__wbg_getTime_1dad7b5386ddd2d9: function(arg0) {
				return arg0.getTime();
			},
			__wbg_get_326e41e095fb2575: function(arg0, arg1) {
				return Reflect.get(arg0, arg1);
			},
			__wbg_get_a8ee5c45dabc1b3b: function(arg0, arg1) {
				return arg0[arg1 >>> 0];
			},
			__wbg_get_unchecked_329cfe50afab7352: function(arg0, arg1) {
				return arg0[arg1 >>> 0];
			},
			__wbg_get_with_ref_key_6412cf3094599694: function(arg0, arg1) {
				return arg0[arg1];
			},
			__wbg_instanceof_ArrayBuffer_101e2bf31071a9f6: function(arg0) {
				let result;
				try {
					result = arg0 instanceof ArrayBuffer;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Map_f194b366846aca0c: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Map;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Response_9b4d9fd451e051b1: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Response;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Uint8Array_740438561a5b956d: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Uint8Array;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Window_23e677d2c6843922: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Window;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_isArray_33b91feb269ff46e: function(arg0) {
				return Array.isArray(arg0);
			},
			__wbg_isSafeInteger_ecd6a7f9c3e053cd: function(arg0) {
				return Number.isSafeInteger(arg0);
			},
			__wbg_iterator_d8f549ec8fb061b1: function() {
				return Symbol.iterator;
			},
			__wbg_length_b3416cf66a5452c8: function(arg0) {
				return arg0.length;
			},
			__wbg_length_ea16607d7b61445b: function(arg0) {
				return arg0.length;
			},
			__wbg_log_524eedafa26daa59: function(arg0) {
				console.log(arg0);
			},
			__wbg_new_0_1dcafdf5e786e876: function() {
				return /* @__PURE__ */ new Date();
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ new Error();
			},
			__wbg_new_5f486cdf45a04d78: function(arg0) {
				return new Uint8Array(arg0);
			},
			__wbg_new_a70fbab9066b301f: function() {
				return new Array();
			},
			__wbg_new_ab79df5bd7c26067: function() {
				return /* @__PURE__ */ new Object();
			},
			__wbg_new_typed_aaaeaf29cf802876: function(arg0, arg1) {
				try {
					var state0 = {
						a: arg0,
						b: arg1
					};
					var cb0 = (arg0, arg1) => {
						const a = state0.a;
						state0.a = 0;
						try {
							return wasm_bindgen__convert__closures_____invoke__h3bcc27440de746c0$2(a, state0.b, arg0, arg1);
						} finally {
							state0.a = a;
						}
					};
					return new Promise(cb0);
				} finally {
					state0.a = state0.b = 0;
				}
			},
			__wbg_new_with_length_825018a1616e9e55: function(arg0) {
				return new Uint8Array(arg0 >>> 0);
			},
			__wbg_new_with_str_and_init_b4b54d1a819bc724: function(arg0, arg1, arg2) {
				return new Request(getStringFromWasm0$2(arg0, arg1), arg2);
			},
			__wbg_next_11b99ee6237339e3: function(arg0) {
				return arg0.next();
			},
			__wbg_next_e01a967809d1aa68: function(arg0) {
				return arg0.next;
			},
			__wbg_now_e7c6795a7f81e10f: function(arg0) {
				return arg0.now();
			},
			__wbg_ok_7ec8b94facac7704: function(arg0) {
				return arg0.ok;
			},
			__wbg_performance_3fcf6e32a7e1ed0a: function(arg0) {
				return arg0.performance;
			},
			__wbg_prototypesetcall_d62e5099504357e6: function(arg0, arg1, arg2) {
				Uint8Array.prototype.set.call(getArrayU8FromWasm0$2(arg0, arg1), arg2);
			},
			__wbg_queueMicrotask_0c399741342fb10f: function(arg0) {
				return arg0.queueMicrotask;
			},
			__wbg_queueMicrotask_a082d78ce798393e: function(arg0) {
				queueMicrotask(arg0);
			},
			__wbg_resolve_ae8d83246e5bcc12: function(arg0) {
				return Promise.resolve(arg0);
			},
			__wbg_set_282384002438957f: function(arg0, arg1, arg2) {
				arg0[arg1 >>> 0] = arg2;
			},
			__wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {
				arg0[arg1] = arg2;
			},
			__wbg_set_8c0b3ffcf05d61c2: function(arg0, arg1, arg2) {
				arg0.set(getArrayU8FromWasm0$2(arg1, arg2));
			},
			__wbg_set_method_8c015e8bcafd7be1: function(arg0, arg1, arg2) {
				arg0.method = getStringFromWasm0$2(arg1, arg2);
			},
			__wbg_set_mode_5a87f2c809cf37c2: function(arg0, arg1) {
				arg0.mode = __wbindgen_enum_RequestMode$2[arg1];
			},
			__wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
				const ret = arg1.stack;
				const ptr1 = passStringToWasm0$2(ret, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN$2;
				getDataViewMemory0$2().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$2().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg_static_accessor_GLOBAL_8adb955bd33fac2f: function() {
				const ret = typeof global === "undefined" ? null : global;
				return isLikeNone$2(ret) ? 0 : addToExternrefTable0$2(ret);
			},
			__wbg_static_accessor_GLOBAL_THIS_ad356e0db91c7913: function() {
				const ret = typeof globalThis === "undefined" ? null : globalThis;
				return isLikeNone$2(ret) ? 0 : addToExternrefTable0$2(ret);
			},
			__wbg_static_accessor_SELF_f207c857566db248: function() {
				const ret = typeof self === "undefined" ? null : self;
				return isLikeNone$2(ret) ? 0 : addToExternrefTable0$2(ret);
			},
			__wbg_static_accessor_WINDOW_bb9f1ba69d61b386: function() {
				const ret = typeof window === "undefined" ? null : window;
				return isLikeNone$2(ret) ? 0 : addToExternrefTable0$2(ret);
			},
			__wbg_status_318629ab93a22955: function(arg0) {
				return arg0.status;
			},
			__wbg_stringify_5ae93966a84901ac: function(arg0) {
				return JSON.stringify(arg0);
			},
			__wbg_then_098abe61755d12f6: function(arg0, arg1) {
				return arg0.then(arg1);
			},
			__wbg_then_9e335f6dd892bc11: function(arg0, arg1, arg2) {
				return arg0.then(arg1, arg2);
			},
			__wbg_value_21fc78aab0322612: function(arg0) {
				return arg0.value;
			},
			__wbindgen_cast_0000000000000001: function(arg0, arg1) {
				return makeMutClosure$2(arg0, arg1, wasm$2.wasm_bindgen__closure__destroy__h8db467765ce434ac, wasm_bindgen__convert__closures_____invoke__h7573a8a64f443504$2);
			},
			__wbindgen_cast_0000000000000002: function(arg0) {
				return arg0;
			},
			__wbindgen_cast_0000000000000003: function(arg0) {
				return arg0;
			},
			__wbindgen_cast_0000000000000004: function(arg0, arg1) {
				return getStringFromWasm0$2(arg0, arg1);
			},
			__wbindgen_cast_0000000000000005: function(arg0) {
				return BigInt.asUintN(64, arg0);
			},
			__wbindgen_init_externref_table: function() {
				const table = wasm$2.__wbindgen_externrefs;
				const offset = table.grow(4);
				table.set(0, void 0);
				table.set(offset + 0, void 0);
				table.set(offset + 1, null);
				table.set(offset + 2, true);
				table.set(offset + 3, false);
			},
			__wbindgen_jstag: WebAssembly.JSTag,
			__wbindgen_wrapped_jstag: __wbindgen_wrapped_jstag$2
		},
		"env": import1$2,
		"env": import2$2,
		"env": import3$2,
		"env": import4$2,
		"env": import5$2,
		"env": import6$2,
		"wasi_snapshot_preview1": import7$2,
		"wasi_snapshot_preview1": import8$2,
		"wasi_snapshot_preview1": import9$2,
		"wasi_snapshot_preview1": import10$2,
		"wasi_snapshot_preview1": import11$2,
		"wasi_snapshot_preview1": import12$2,
		"env": import13$2,
		"env": import14$2,
		"env": import15$2,
		"env": import16$2,
		"env": import17$2,
		"env": import18$2,
		"env": import19$2,
		"env": import20$2,
		"wasi_snapshot_preview1": import21$2,
		"env": import22$2,
		"env": import23$2,
		"env": import24$2,
		"env": import25$2,
		"wasi_snapshot_preview1": import26$2,
		"env": import27$2,
		"env": import28$2,
		"env": import29$2,
		"env": import30$2,
		"env": import31$2,
		"env": import32$2,
		"wasi_snapshot_preview1": import33$2,
		"wasi_snapshot_preview1": import34$2,
		"env": import35$2,
		"env": import36$2,
		"env": import37$2,
		"env": import38$2,
		"env": import39$2,
		"env": import40$2,
		"env": import41$2,
		"env": import42$2,
		"wasi_snapshot_preview1": import43$2
	};
}
function __wbg_termination_guard$2() {
	__wbg_terminated_addr$2 ??= wasm$2.__instance_terminated.value / 4;
	if (getInt32ArrayMemory0$2()[__wbg_terminated_addr$2]) throw new Error("Module terminated");
}
function __wbg_handle_catch$2(e) {
	if (e instanceof WebAssembly.Exception && e.is(__wbindgen_wrapped_jstag$2)) throw e.getArg(__wbindgen_wrapped_jstag$2, 0);
	getInt32ArrayMemory0$2()[__wbg_terminated_addr$2] = 1;
	throw e;
}
function wasm_bindgen__convert__closures_____invoke__h7573a8a64f443504$2(arg0, arg1, arg2) {
	let ret;
	__wbg_termination_guard$2();
	try {
		ret = wasm$2.wasm_bindgen__convert__closures_____invoke__h7573a8a64f443504(arg0, arg1, arg2);
	} catch (e) {
		__wbg_handle_catch$2(e);
	}
	if (ret[1]) throw takeFromExternrefTable0$2(ret[0]);
}
function wasm_bindgen__convert__closures_____invoke__h3bcc27440de746c0$2(arg0, arg1, arg2, arg3) {
	__wbg_termination_guard$2();
	try {
		wasm$2.wasm_bindgen__convert__closures_____invoke__h3bcc27440de746c0(arg0, arg1, arg2, arg3);
	} catch (e) {
		__wbg_handle_catch$2(e);
	}
}
function addToExternrefTable0$2(obj) {
	const idx = wasm$2.__externref_table_alloc();
	wasm$2.__wbindgen_externrefs.set(idx, obj);
	return idx;
}
function debugString$2(val) {
	const type = typeof val;
	if (type == "number" || type == "boolean" || val == null) return \`\${val}\`;
	if (type == "string") return \`"\${val}"\`;
	if (type == "symbol") {
		const description = val.description;
		if (description == null) return "Symbol";
		else return \`Symbol(\${description})\`;
	}
	if (type == "function") {
		const name = val.name;
		if (typeof name == "string" && name.length > 0) return \`Function(\${name})\`;
		else return "Function";
	}
	if (Array.isArray(val)) {
		const length = val.length;
		let debug = "[";
		if (length > 0) debug += debugString$2(val[0]);
		for (let i = 1; i < length; i++) debug += ", " + debugString$2(val[i]);
		debug += "]";
		return debug;
	}
	const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));
	let className;
	if (builtInMatches && builtInMatches.length > 1) className = builtInMatches[1];
	else return toString.call(val);
	if (className == "Object") try {
		return "Object(" + JSON.stringify(val) + ")";
	} catch (_) {
		return "Object";
	}
	if (val instanceof Error) return \`\${val.name}: \${val.message}\\n\${val.stack}\`;
	return className;
}
function getArrayU8FromWasm0$2(ptr, len) {
	ptr = ptr >>> 0;
	return getUint8ArrayMemory0$2().subarray(ptr / 1, ptr / 1 + len);
}
function getDataViewMemory0$2() {
	if (cachedDataViewMemory0$2 === null || cachedDataViewMemory0$2.buffer.detached === true || cachedDataViewMemory0$2.buffer.detached === void 0 && cachedDataViewMemory0$2.buffer !== wasm$2.memory.buffer) cachedDataViewMemory0$2 = new DataView(wasm$2.memory.buffer);
	return cachedDataViewMemory0$2;
}
function getInt32ArrayMemory0$2() {
	if (cachedInt32ArrayMemory0$2 === null || cachedInt32ArrayMemory0$2.byteLength === 0) cachedInt32ArrayMemory0$2 = new Int32Array(wasm$2.memory.buffer);
	return cachedInt32ArrayMemory0$2;
}
function getStringFromWasm0$2(ptr, len) {
	ptr = ptr >>> 0;
	return decodeText$2(ptr, len);
}
function getUint8ArrayMemory0$2() {
	if (cachedUint8ArrayMemory0$2 === null || cachedUint8ArrayMemory0$2.byteLength === 0) cachedUint8ArrayMemory0$2 = new Uint8Array(wasm$2.memory.buffer);
	return cachedUint8ArrayMemory0$2;
}
function isLikeNone$2(x) {
	return x === void 0 || x === null;
}
function makeMutClosure$2(arg0, arg1, dtor, f) {
	const state = {
		a: arg0,
		b: arg1,
		cnt: 1,
		dtor
	};
	const real = (...args) => {
		state.cnt++;
		const a = state.a;
		state.a = 0;
		try {
			return f(a, state.b, ...args);
		} finally {
			state.a = a;
			real._wbg_cb_unref();
		}
	};
	real._wbg_cb_unref = () => {
		if (--state.cnt === 0) {
			state.dtor(state.a, state.b);
			state.a = 0;
			CLOSURE_DTORS$2.unregister(state);
		}
	};
	CLOSURE_DTORS$2.register(real, state, state);
	return real;
}
function passArray8ToWasm0$2(arg, malloc) {
	const ptr = malloc(arg.length * 1, 1) >>> 0;
	getUint8ArrayMemory0$2().set(arg, ptr / 1);
	WASM_VECTOR_LEN$2 = arg.length;
	return ptr;
}
function passStringToWasm0$2(arg, malloc, realloc) {
	if (realloc === void 0) {
		const buf = cachedTextEncoder$2.encode(arg);
		const ptr = malloc(buf.length, 1) >>> 0;
		getUint8ArrayMemory0$2().subarray(ptr, ptr + buf.length).set(buf);
		WASM_VECTOR_LEN$2 = buf.length;
		return ptr;
	}
	let len = arg.length;
	let ptr = malloc(len, 1) >>> 0;
	const mem = getUint8ArrayMemory0$2();
	let offset = 0;
	for (; offset < len; offset++) {
		const code = arg.charCodeAt(offset);
		if (code > 127) break;
		mem[ptr + offset] = code;
	}
	if (offset !== len) {
		if (offset !== 0) arg = arg.slice(offset);
		ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
		const view = getUint8ArrayMemory0$2().subarray(ptr + offset, ptr + len);
		const ret = cachedTextEncoder$2.encodeInto(arg, view);
		offset += ret.written;
		ptr = realloc(ptr, len, offset, 1) >>> 0;
	}
	WASM_VECTOR_LEN$2 = offset;
	return ptr;
}
function takeFromExternrefTable0$2(idx) {
	const value = wasm$2.__wbindgen_externrefs.get(idx);
	wasm$2.__externref_table_dealloc(idx);
	return value;
}
function decodeText$2(ptr, len) {
	numBytesDecoded$2 += len;
	if (numBytesDecoded$2 >= MAX_SAFARI_DECODE_BYTES$2) {
		cachedTextDecoder$2 = new TextDecoder("utf-8", {
			ignoreBOM: true,
			fatal: true
		});
		cachedTextDecoder$2.decode();
		numBytesDecoded$2 = len;
	}
	return cachedTextDecoder$2.decode(getUint8ArrayMemory0$2().subarray(ptr, ptr + len));
}
function __wbg_finalize_init$2(instance, module) {
	wasm$2 = instance.exports;
	cachedDataViewMemory0$2 = null;
	cachedInt32ArrayMemory0$2 = null;
	cachedUint8ArrayMemory0$2 = null;
	if (typeof wasm$2.__wasm_call_ctors === "function") wasm$2.__wasm_call_ctors();
	wasm$2.__wbindgen_start();
	return wasm$2;
}
async function __wbg_load$2(module, imports) {
	if (typeof Response === "function" && module instanceof Response) {
		if (typeof WebAssembly.instantiateStreaming === "function") try {
			return await WebAssembly.instantiateStreaming(module, imports);
		} catch (e) {
			if (module.ok && expectedResponseType(module.type) && module.headers.get("Content-Type") !== "application/wasm") console.warn("\`WebAssembly.instantiateStreaming\` failed because your server does not serve Wasm with \`application/wasm\` MIME type. Falling back to \`WebAssembly.instantiate\` which is slower. Original error:\\n", e);
			else throw e;
		}
		const bytes = await module.arrayBuffer();
		return await WebAssembly.instantiate(bytes, imports);
	} else {
		const instance = await WebAssembly.instantiate(module, imports);
		if (instance instanceof WebAssembly.Instance) return {
			instance,
			module
		};
		else return instance;
	}
	function expectedResponseType(type) {
		switch (type) {
			case "basic":
			case "cors":
			case "default": return true;
		}
		return false;
	}
}
async function __wbg_init$2(module_or_path) {
	if (wasm$2 !== void 0) return wasm$2;
	if (module_or_path !== void 0) {
		if (Object.getPrototypeOf(module_or_path) === Object.prototype) ({module_or_path} = module_or_path);
		else console.warn("using deprecated parameters for the initialization function; pass a single object instead");
	}
	if (module_or_path === void 0) throw new Error("@cereusdb external entry requires CereusDB.create({ wasmUrl }) or CereusDB.create({ wasmSource })");
	const imports = __wbg_get_imports$2();
	if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) module_or_path = fetch(module_or_path);
	const { instance, module } = await __wbg_load$2(await module_or_path, imports);
	if (instance.exports && instance.exports.memory) setMemory$2(instance.exports.memory);
	return __wbg_finalize_init$2(instance, module);
}
var __env$2, __wasi$2, CereusDB$5, import1$2, import2$2, import3$2, import4$2, import5$2, import6$2, import7$2, import8$2, import9$2, import10$2, import11$2, import12$2, import13$2, import14$2, import15$2, import16$2, import17$2, import18$2, import19$2, import20$2, import21$2, import22$2, import23$2, import24$2, import25$2, import26$2, import27$2, import28$2, import29$2, import30$2, import31$2, import32$2, import33$2, import34$2, import35$2, import36$2, import37$2, import38$2, import39$2, import40$2, import41$2, import42$2, import43$2, __wbindgen_wrapped_jstag$2, __wbg_terminated_addr$2, __wbindgen_enum_RequestMode$2, CereusDBFinalization$2, CLOSURE_DTORS$2, cachedDataViewMemory0$2, cachedInt32ArrayMemory0$2, cachedUint8ArrayMemory0$2, cachedTextDecoder$2, MAX_SAFARI_DECODE_BYTES$2, numBytesDecoded$2, cachedTextEncoder$2, WASM_VECTOR_LEN$2, wasm$2;
var init_cereusdb_external$2 = __esmMin((() => {
	init_env_shim$2();
	init_inline0$2();
	__env$2 = createEnvImports$2();
	__wasi$2 = createWasiImports$2();
	CereusDB$5 = class CereusDB$5 {
		static __wrap(ptr) {
			ptr = ptr >>> 0;
			const obj = Object.create(CereusDB$5.prototype);
			obj.__wbg_ptr = ptr;
			CereusDBFinalization$2.register(obj, obj.__wbg_ptr, obj);
			return obj;
		}
		__destroy_into_raw() {
			const ptr = this.__wbg_ptr;
			this.__wbg_ptr = 0;
			CereusDBFinalization$2.unregister(this);
			return ptr;
		}
		free() {
			const ptr = this.__destroy_into_raw();
			__wbg_termination_guard$2();
			try {
				wasm$2.__wbg_cereusdb_free(ptr, 0);
			} catch (e) {
				__wbg_handle_catch$2(e);
			}
		}
		/**
		* Create a new CereusDB instance.
		* Initializes DataFusion context and registers all spatial functions.
		* @returns {CereusDB}
		*/
		static create() {
			let ret;
			__wbg_termination_guard$2();
			try {
				ret = wasm$2.cereusdb_create();
			} catch (e) {
				__wbg_handle_catch$2(e);
			}
			if (ret[2]) throw takeFromExternrefTable0$2(ret[1]);
			return CereusDB$5.__wrap(ret[0]);
		}
		/**
		* Drop a registered table.
		* @param {string} table_name
		*/
		drop_table(table_name) {
			const ptr0 = passStringToWasm0$2(table_name, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$2;
			let ret;
			__wbg_termination_guard$2();
			try {
				ret = wasm$2.cereusdb_drop_table(this.__wbg_ptr, ptr0, len0);
			} catch (e) {
				__wbg_handle_catch$2(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$2(ret[0]);
		}
		/**
		* Register a GeoJSON string as a named table.
		* @param {string} table_name
		* @param {string} geojson
		*/
		register_geojson(table_name, geojson) {
			const ptr0 = passStringToWasm0$2(table_name, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$2;
			const ptr1 = passStringToWasm0$2(geojson, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN$2;
			let ret;
			__wbg_termination_guard$2();
			try {
				ret = wasm$2.cereusdb_register_geojson(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch$2(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$2(ret[0]);
		}
		/**
		* Register a GeoTIFF buffer as a single-column raster table.
		* Requires the full GDAL-enabled build.
		* @param {string} table_name
		* @param {Uint8Array} data
		*/
		register_geotiff_buffer(table_name, data) {
			const ptr0 = passStringToWasm0$2(table_name, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$2;
			const ptr1 = passArray8ToWasm0$2(data, wasm$2.__wbindgen_malloc);
			const len1 = WASM_VECTOR_LEN$2;
			let ret;
			__wbg_termination_guard$2();
			try {
				ret = wasm$2.cereusdb_register_geotiff_buffer(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch$2(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$2(ret[0]);
		}
		/**
		* Register browser-backed object stores for ranged/listing reads.
		* @param {any} config
		*/
		register_object_stores(config) {
			let ret;
			__wbg_termination_guard$2();
			try {
				ret = wasm$2.cereusdb_register_object_stores(this.__wbg_ptr, config);
			} catch (e) {
				__wbg_handle_catch$2(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$2(ret[0]);
		}
		/**
		* Register a Uint8Array containing Parquet data as a named table.
		* Use for files obtained via the browser File API.
		* @param {string} table_name
		* @param {Uint8Array} data
		* @returns {Promise<void>}
		*/
		register_parquet_buffer(table_name, data) {
			const ptr0 = passStringToWasm0$2(table_name, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$2;
			const ptr1 = passArray8ToWasm0$2(data, wasm$2.__wbindgen_malloc);
			const len1 = WASM_VECTOR_LEN$2;
			let ret;
			__wbg_termination_guard$2();
			try {
				ret = wasm$2.cereusdb_register_parquet_buffer(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch$2(e);
			}
			return ret;
		}
		/**
		* Register a remote Parquet object or prefix as a DataFusion listing table.
		* @param {string} table_name
		* @param {string} table_url
		* @param {any} options
		* @returns {Promise<void>}
		*/
		register_parquet_table(table_name, table_url, options) {
			const ptr0 = passStringToWasm0$2(table_name, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$2;
			const ptr1 = passStringToWasm0$2(table_url, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN$2;
			let ret;
			__wbg_termination_guard$2();
			try {
				ret = wasm$2.cereusdb_register_parquet_table(this.__wbg_ptr, ptr0, len0, ptr1, len1, options);
			} catch (e) {
				__wbg_handle_catch$2(e);
			}
			return ret;
		}
		/**
		* Register a raster buffer as a single-column raster table.
		* Requires the full GDAL-enabled build.
		* @param {string} table_name
		* @param {string} format
		* @param {Uint8Array} data
		*/
		register_raster_buffer(table_name, format, data) {
			const ptr0 = passStringToWasm0$2(table_name, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$2;
			const ptr1 = passStringToWasm0$2(format, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN$2;
			const ptr2 = passArray8ToWasm0$2(data, wasm$2.__wbindgen_malloc);
			const len2 = WASM_VECTOR_LEN$2;
			let ret;
			__wbg_termination_guard$2();
			try {
				ret = wasm$2.cereusdb_register_raster_buffer(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
			} catch (e) {
				__wbg_handle_catch$2(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$2(ret[0]);
		}
		/**
		* Register a remote Parquet file URL as a named table.
		* Pre-fetches the entire file via HTTP, then loads into memory.
		* The server must support CORS.
		* @param {string} table_name
		* @param {string} url
		* @returns {Promise<void>}
		*/
		register_remote_parquet(table_name, url) {
			const ptr0 = passStringToWasm0$2(table_name, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$2;
			const ptr1 = passStringToWasm0$2(url, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN$2;
			let ret;
			__wbg_termination_guard$2();
			try {
				ret = wasm$2.cereusdb_register_remote_parquet(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch$2(e);
			}
			return ret;
		}
		/**
		* Execute a SQL query.
		* Returns results as Arrow IPC bytes (Uint8Array).
		* The caller can decode this with the apache-arrow JS library.
		* @param {string} query
		* @returns {Promise<Uint8Array>}
		*/
		sql(query) {
			const ptr0 = passStringToWasm0$2(query, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$2;
			let ret;
			__wbg_termination_guard$2();
			try {
				ret = wasm$2.cereusdb_sql(this.__wbg_ptr, ptr0, len0);
			} catch (e) {
				__wbg_handle_catch$2(e);
			}
			return ret;
		}
		/**
		* Execute a SQL query and return results as a JSON string.
		* Convenience method for simple use cases.
		* @param {string} query
		* @returns {Promise<string>}
		*/
		sql_json(query) {
			const ptr0 = passStringToWasm0$2(query, wasm$2.__wbindgen_malloc, wasm$2.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$2;
			let ret;
			__wbg_termination_guard$2();
			try {
				ret = wasm$2.cereusdb_sql_json(this.__wbg_ptr, ptr0, len0);
			} catch (e) {
				__wbg_handle_catch$2(e);
			}
			return ret;
		}
		/**
		* List all registered table names.
		* @returns {any}
		*/
		tables() {
			let ret;
			__wbg_termination_guard$2();
			try {
				ret = wasm$2.cereusdb_tables(this.__wbg_ptr);
			} catch (e) {
				__wbg_handle_catch$2(e);
			}
			if (ret[2]) throw takeFromExternrefTable0$2(ret[1]);
			return takeFromExternrefTable0$2(ret[0]);
		}
		/**
		* Get version information.
		*
		* Release builds set \`CEREUSDB_VERSION\` to the full npm version, including
		* prerelease suffixes; other builds fall back to the crate version.
		* @returns {string}
		*/
		version() {
			let deferred1_0;
			let deferred1_1;
			try {
				let ret;
				__wbg_termination_guard$2();
				try {
					ret = wasm$2.cereusdb_version(this.__wbg_ptr);
				} catch (e) {
					__wbg_handle_catch$2(e);
				}
				deferred1_0 = ret[0];
				deferred1_1 = ret[1];
				return getStringFromWasm0$2(ret[0], ret[1]);
			} finally {
				__wbg_termination_guard$2();
				try {
					wasm$2.__wbindgen_free(deferred1_0, deferred1_1, 1);
				} catch (e) {
					__wbg_handle_catch$2(e);
				}
			}
		}
	};
	if (Symbol.dispose) CereusDB$5.prototype[Symbol.dispose] = CereusDB$5.prototype.free;
	import1$2 = __env$2;
	import2$2 = __env$2;
	import3$2 = __env$2;
	import4$2 = __env$2;
	import5$2 = __env$2;
	import6$2 = __env$2;
	import7$2 = __wasi$2;
	import8$2 = __wasi$2;
	import9$2 = __wasi$2;
	import10$2 = __wasi$2;
	import11$2 = __wasi$2;
	import12$2 = __wasi$2;
	import13$2 = __env$2;
	import14$2 = __env$2;
	import15$2 = __env$2;
	import16$2 = __env$2;
	import17$2 = __env$2;
	import18$2 = __env$2;
	import19$2 = __env$2;
	import20$2 = __env$2;
	import21$2 = __wasi$2;
	import22$2 = __env$2;
	import23$2 = __env$2;
	import24$2 = __env$2;
	import25$2 = __env$2;
	import26$2 = __wasi$2;
	import27$2 = __env$2;
	import28$2 = __env$2;
	import29$2 = __env$2;
	import30$2 = __env$2;
	import31$2 = __env$2;
	import32$2 = __env$2;
	import33$2 = __wasi$2;
	import34$2 = __wasi$2;
	import35$2 = __env$2;
	import36$2 = __env$2;
	import37$2 = __env$2;
	import38$2 = __env$2;
	import39$2 = __env$2;
	import40$2 = __env$2;
	import41$2 = __env$2;
	import42$2 = __env$2;
	import43$2 = __wasi$2;
	__wbindgen_wrapped_jstag$2 = new WebAssembly.Tag({ parameters: ["externref"] });
	__wbindgen_enum_RequestMode$2 = [
		"same-origin",
		"no-cors",
		"cors",
		"navigate"
	];
	CereusDBFinalization$2 = typeof FinalizationRegistry === "undefined" ? {
		register: () => {},
		unregister: () => {}
	} : new FinalizationRegistry((ptr) => wasm$2.__wbg_cereusdb_free(ptr >>> 0, 1));
	CLOSURE_DTORS$2 = typeof FinalizationRegistry === "undefined" ? {
		register: () => {},
		unregister: () => {}
	} : new FinalizationRegistry((state) => state.dtor(state.a, state.b));
	cachedDataViewMemory0$2 = null;
	cachedInt32ArrayMemory0$2 = null;
	cachedUint8ArrayMemory0$2 = null;
	cachedTextDecoder$2 = new TextDecoder("utf-8", {
		ignoreBOM: true,
		fatal: true
	});
	cachedTextDecoder$2.decode();
	MAX_SAFARI_DECODE_BYTES$2 = 2146435072;
	numBytesDecoded$2 = 0;
	cachedTextEncoder$2 = new TextEncoder();
	if (!("encodeInto" in cachedTextEncoder$2)) cachedTextEncoder$2.encodeInto = function(arg, view) {
		const buf = cachedTextEncoder$2.encode(arg);
		view.set(buf);
		return {
			read: arg.length,
			written: buf.length
		};
	};
	WASM_VECTOR_LEN$2 = 0;
}));
//#endregion
//#region ../../node_modules/@cereusdb/standard/dist/external.js
var external_exports$2 = /* @__PURE__ */ __exportAll({ CereusDB: () => CereusDB$4 });
function toUint8Array$2(data) {
	if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
	return new Uint8Array(data);
}
function normalizeRasterFormat$2(format) {
	const normalized = format.trim().toLowerCase();
	if (normalized === "geotiff" || normalized === "tiff") return normalized;
	throw new Error(\`Unsupported raster format: \${format}\`);
}
var CereusDB$4;
var init_external$2 = __esmMin((() => {
	init_cereusdb_external$2();
	CereusDB$4 = class CereusDB$4 {
		constructor(inner) {
			this.inner = inner;
		}
		/**
		* Create and initialize a new CereusDB instance.
		* This loads the WASM module and initializes the query engine.
		*/
		static async create(options) {
			const source = options?.wasmSource ?? options?.wasmUrl;
			if (source === void 0) await __wbg_init$2();
			else await __wbg_init$2({ module_or_path: source });
			const inner = CereusDB$5.create();
			const db = new CereusDB$4(inner);
			if (options?.objectStores !== void 0) db.registerObjectStores(options.objectStores);
			return db;
		}
		/**
		* Execute a SQL query and return results as Arrow IPC bytes.
		*/
		async sql(query) {
			return await this.inner.sql(query);
		}
		/**
		* Execute a SQL query and return results as JSON.
		*/
		async sqlJSON(query) {
			const json = await this.inner.sql_json(query);
			return JSON.parse(json);
		}
		/**
		* Register a remote Parquet file as a table.
		* The server must support CORS.
		*/
		async registerRemoteParquet(name, url) {
			await this.inner.register_remote_parquet(name, url);
		}
		/**
		* Register browser-backed object stores for ranged and listing reads.
		*/
		registerObjectStores(config) {
			this.objectStoreApi().register_object_stores(config);
		}
		/**
		* Register a remote Parquet object or prefix through DataFusion's listing table path.
		*/
		async registerParquetTable(name, url, options = {}) {
			await this.objectStoreApi().register_parquet_table(name, url, options);
		}
		/**
		* Register a local file (from File API / drag-and-drop) as a table.
		* Currently supports Parquet, GeoJSON, and GeoTIFF rasters.
		*/
		async registerFile(name, file) {
			const buffer = new Uint8Array(await file.arrayBuffer());
			const ext = file.name.split(".").pop()?.toLowerCase();
			if (ext === "parquet" || ext === "geoparquet") await this.inner.register_parquet_buffer(name, buffer);
			else if (ext === "geojson" || ext === "json") {
				const text = new TextDecoder().decode(buffer);
				this.inner.register_geojson(name, text);
			} else if (ext === "tif" || ext === "tiff") this.registerRaster(name, buffer, "geotiff");
			else throw new Error(\`Unsupported file format: .\${ext}\`);
		}
		/**
		* Register a GeoJSON object or string as a table.
		*/
		registerGeoJSON(name, geojson) {
			const str = typeof geojson === "string" ? geojson : JSON.stringify(geojson);
			this.inner.register_geojson(name, str);
		}
		/**
		* Register a raster buffer as a single-column raster table.
		* Requires the full GDAL-enabled package build.
		*/
		registerRaster(name, data, format) {
			this.inner.register_raster_buffer(name, normalizeRasterFormat$2(format), toUint8Array$2(data));
		}
		/**
		* Register a GeoTIFF buffer as a single-column raster table.
		* Requires the full GDAL-enabled package build.
		*/
		registerGeoTIFF(name, data) {
			this.registerRaster(name, data, "geotiff");
		}
		/** Drop a table. */
		dropTable(name) {
			this.inner.drop_table(name);
		}
		/** List registered tables. */
		tables() {
			return this.inner.tables();
		}
		/** Version string. */
		version() {
			return this.inner.version();
		}
		objectStoreApi() {
			const api = this.inner;
			if (typeof api.register_object_stores !== "function" || typeof api.register_parquet_table !== "function") throw new Error("Browser object stores are not available in this CereusDB build");
			return api;
		}
	};
}));
//#endregion
//#region ../../node_modules/@cereusdb/full/dist/wasm/env_shim.js?v=emsdk6-20261001-2
function setMemory$1(mem) {
	_memory$1 = mem;
}
function getDataView$1() {
	return _memory$1 ? new DataView(_memory$1.buffer) : null;
}
function writeU32$1(ptr, value) {
	const view = getDataView$1();
	if (view && ptr) view.setUint32(ptr, value >>> 0, true);
}
function writeU64$1(ptr, value) {
	const view = getDataView$1();
	if (view && ptr) view.setBigUint64(ptr, BigInt(value), true);
}
function readIovs$1(iovs, iovcnt) {
	const view = getDataView$1();
	if (!view) return {
		bytes: /* @__PURE__ */ new Uint8Array(0),
		length: 0
	};
	let length = 0;
	for (let i = 0; i < iovcnt; i++) length += view.getUint32(iovs + i * 8 + 4, true);
	const bytes = new Uint8Array(length);
	let offset = 0;
	for (let i = 0; i < iovcnt; i++) {
		const ptr = view.getUint32(iovs + i * 8, true);
		const len = view.getUint32(iovs + i * 8 + 4, true);
		bytes.set(new Uint8Array(_memory$1.buffer, ptr, len), offset);
		offset += len;
	}
	return {
		bytes,
		length
	};
}
function forwardOutput$1(fd, bytes) {
	if (fd !== 1 && fd !== 2) return;
	const lines = ((_pendingOutput$1.get(fd) ?? "") + _textDecoder$1.decode(bytes)).split("\\n");
	_pendingOutput$1.set(fd, lines.pop());
	const log = fd === 2 ? console.warn : console.log;
	for (const line of lines) if (line.trim()) log(\`[cereusdb] \${line}\`);
}
function createCppException$1(ptr, type, destructor, message = "C++ exception") {
	const error = new WebAssembly.RuntimeError(message);
	error.__cxa_exception_ptr = ptr >>> 0;
	error.__cxa_type = type >>> 0;
	error.__cxa_destructor = destructor >>> 0;
	return error;
}
function createEnvImports$1() {
	return {
		emscripten_resize_heap: (requestedSize) => {
			if (!_memory$1) {
				console.error("[env_shim] emscripten_resize_heap called but no memory set");
				return 0;
			}
			try {
				const oldBytes = _memory$1.buffer.byteLength;
				if (requestedSize <= oldBytes) return 1;
				const pagesToGrow = Math.ceil((requestedSize - oldBytes) / 65536);
				_memory$1.grow(pagesToGrow);
				return 1;
			} catch (e) {
				console.error("[env_shim] memory.grow failed:", e);
				return 0;
			}
		},
		emscripten_get_heap_max: () => 2147483648,
		_Unwind_CallPersonality: () => 0,
		__gxx_wasm_personality_v0: () => 0,
		__cxa_begin_catch: (ptr) => {
			const value = ptr >>> 0;
			_caughtCxaExceptions$1.push(value);
			return value;
		},
		__cxa_end_catch: () => {
			_caughtCxaExceptions$1.pop();
		},
		__cxa_throw: (ptr, type, destructor) => {
			throw createCppException$1(ptr, type, destructor);
		},
		__cxa_rethrow: () => {
			throw createCppException$1(_caughtCxaExceptions$1.length ? _caughtCxaExceptions$1[_caughtCxaExceptions$1.length - 1] : 0, 0, 0, "C++ exception rethrown");
		},
		__c_longjmp: typeof WebAssembly.Tag === "function" ? new WebAssembly.Tag({ parameters: ["i32"] }) : null,
		emscripten_date_now: () => Date.now(),
		emscripten_get_now: () => performance.now(),
		_localtime_js: () => {},
		_tzset_js: () => {},
		__syscall_openat: () => UNSUPPORTED_ERRNO$1,
		__syscall_fcntl64: () => UNSUPPORTED_ERRNO$1,
		__syscall_ioctl: () => UNSUPPORTED_ERRNO$1,
		__syscall_fstat64: () => UNSUPPORTED_ERRNO$1,
		__syscall_stat64: () => UNSUPPORTED_ERRNO$1,
		__syscall_lstat64: () => UNSUPPORTED_ERRNO$1,
		__syscall_newfstatat: () => UNSUPPORTED_ERRNO$1,
		__syscall_getcwd: () => UNSUPPORTED_ERRNO$1,
		__syscall_mkdirat: () => UNSUPPORTED_ERRNO$1,
		__syscall_rmdir: () => UNSUPPORTED_ERRNO$1,
		__syscall_unlinkat: () => UNSUPPORTED_ERRNO$1,
		__syscall_renameat: () => UNSUPPORTED_ERRNO$1,
		__syscall_readlinkat: () => UNSUPPORTED_ERRNO$1,
		__syscall_getdents64: () => UNSUPPORTED_ERRNO$1,
		__syscall_statfs64: () => UNSUPPORTED_ERRNO$1,
		__syscall_faccessat: () => UNSUPPORTED_ERRNO$1,
		__syscall_chmod: () => UNSUPPORTED_ERRNO$1,
		__syscall_fchmod: () => UNSUPPORTED_ERRNO$1,
		__syscall_fchown32: () => UNSUPPORTED_ERRNO$1,
		__syscall_fdatasync: () => 0,
		__syscall_ftruncate64: () => UNSUPPORTED_ERRNO$1,
		__syscall_prlimit64: () => UNSUPPORTED_ERRNO$1,
		__syscall_dup3: () => UNSUPPORTED_ERRNO$1,
		__syscall_pipe: () => UNSUPPORTED_ERRNO$1,
		__syscall_pipe2: () => UNSUPPORTED_ERRNO$1,
		__syscall_wait4: () => UNSUPPORTED_ERRNO$1,
		__syscall_getuid32: () => 0,
		__syscall_geteuid32: () => 0,
		__syscall_getgid32: () => 0,
		__syscall_getegid32: () => 0,
		__syscall_utimensat: () => UNSUPPORTED_ERRNO$1,
		emscripten_errn: () => 0,
		emscripten_stack_snapshot: () => 0,
		emscripten_stack_unwind_buffer: () => 0,
		emscripten_asm_const_int: () => 0,
		HaveOffsetConverter: () => 0,
		emscripten_pc_get_function: () => 0,
		malloc_usable_size: () => 0,
		_mmap_js: () => -1,
		_munmap_js: () => -1,
		__wasm_longjmp: () => {
			throw new WebAssembly.RuntimeError("longjmp is not supported in the browser runtime");
		},
		dlopen: () => 0,
		__dlsym: () => 0,
		vfork: () => -1,
		fork: () => -1,
		execve: () => -1,
		_abort_js: () => {
			console.warn("[env_shim] abort called (ignored)");
		},
		exit: (code) => {
			console.warn(\`exit(\${code})\`);
		}
	};
}
function createWasiImports$1() {
	return {
		fd_close: () => 0,
		fd_write: (fd, iovs, iovcnt, pnum) => {
			const { bytes, length } = readIovs$1(iovs, iovcnt);
			forwardOutput$1(fd, bytes);
			writeU32$1(pnum, length);
			return 0;
		},
		fd_read: (_fd, _iovs, _iovcnt, pnum) => {
			writeU32$1(pnum, 0);
			return 0;
		},
		fd_pwrite: (_fd, iovs, iovcnt, _offset, pnum) => {
			writeU32$1(pnum, readIovs$1(iovs, iovcnt).length);
			return 0;
		},
		fd_pread: (_fd, _iovs, _iovcnt, _offset, pnum) => {
			writeU32$1(pnum, 0);
			return 0;
		},
		fd_seek: (_fd, _offset, _whence, newOffset) => {
			writeU64$1(newOffset, 0);
			return 0;
		},
		fd_sync: () => 0,
		fd_fdstat_get: () => 0,
		clock_res_get: (_clockId, resolutionPtr) => {
			writeU64$1(resolutionPtr, 1e6);
			return 0;
		},
		clock_time_get: (clockId, _precision, timePtr) => {
			writeU64$1(timePtr, clockId === 1 ? Math.floor(performance.now() * 1e6) : Date.now() * 1e6);
			return 0;
		},
		environ_get: () => 0,
		environ_sizes_get: (countPtr, sizePtr) => {
			writeU32$1(countPtr, 0);
			writeU32$1(sizePtr, 0);
			return 0;
		},
		proc_exit: (code) => {
			throw new WebAssembly.RuntimeError(\`proc_exit(\${code})\`);
		},
		random_get: (buf, len) => {
			if (!_memory$1) return -1;
			const bytes = new Uint8Array(_memory$1.buffer, buf, len);
			crypto.getRandomValues(bytes);
			return 0;
		}
	};
}
var _memory$1, _caughtCxaExceptions$1, UNSUPPORTED_ERRNO$1, _textDecoder$1, _pendingOutput$1;
var init_env_shim$1 = __esmMin((() => {
	_memory$1 = null;
	_caughtCxaExceptions$1 = [];
	UNSUPPORTED_ERRNO$1 = -38;
	_textDecoder$1 = new TextDecoder();
	_pendingOutput$1 = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../node_modules/@cereusdb/full/dist/wasm/snippets/cereusdb-object-store-0da8c74e50551289/inline0.js
function cereusdbPumpFetchQueue$1() {
	while (cereusdbFetchActive$1 < cereusdbFetchMaxConcurrency$1 && cereusdbFetchQueue$1.length > 0) {
		const task = cereusdbFetchQueue$1.shift();
		cereusdbFetchActive$1 += 1;
		cereusdbExecuteFetch$1(task.request).then(task.resolve, task.reject).finally(() => {
			cereusdbFetchActive$1 -= 1;
			cereusdbPumpFetchQueue$1();
		});
	}
}
async function cereusdbExecuteFetch$1(request) {
	const headers = new Headers();
	for (const [name, value] of request.headers) headers.append(name, value);
	const init = {
		method: request.method,
		headers
	};
	if (request.body !== void 0 && request.body !== null) init.body = request.body;
	const response = await fetch(request.url, init);
	const responseHeaders = [];
	response.headers.forEach((value, name) => {
		responseHeaders.push([name, value]);
	});
	return {
		status: response.status,
		statusText: response.statusText,
		headers: responseHeaders,
		body: new Uint8Array(await response.arrayBuffer())
	};
}
function cereusdbSetFetchConcurrency$1(maxConcurrency) {
	const parsed = Number(maxConcurrency);
	if (Number.isFinite(parsed) && parsed >= 1) {
		cereusdbFetchMaxConcurrency$1 = Math.min(Math.trunc(parsed), 256);
		cereusdbPumpFetchQueue$1();
	}
}
function cereusdbFetch$1(request) {
	return new Promise((resolve, reject) => {
		cereusdbFetchQueue$1.push({
			request,
			resolve,
			reject
		});
		cereusdbPumpFetchQueue$1();
	});
}
var cereusdbFetchMaxConcurrency$1, cereusdbFetchActive$1, cereusdbFetchQueue$1;
var init_inline0$1 = __esmMin((() => {
	cereusdbFetchMaxConcurrency$1 = 16;
	cereusdbFetchActive$1 = 0;
	cereusdbFetchQueue$1 = [];
}));
//#endregion
//#region ../../node_modules/@cereusdb/full/dist/wasm/cereusdb-external.js
function __wbg_get_imports$1() {
	return {
		__proto__: null,
		"./cereusdb_bg.js": {
			__proto__: null,
			__wbg_Error_83742b46f01ce22d: function(arg0, arg1) {
				return Error(getStringFromWasm0$1(arg0, arg1));
			},
			__wbg_Number_a5a435bd7bbec835: function(arg0) {
				return Number(arg0);
			},
			__wbg_String_8564e559799eccda: function(arg0, arg1) {
				const ptr1 = passStringToWasm0$1(String(arg1), wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN$1;
				getDataViewMemory0$1().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$1().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_bigint_get_as_i64_447a76b5c6ef7bda: function(arg0, arg1) {
				const v = arg1;
				const ret = typeof v === "bigint" ? v : void 0;
				getDataViewMemory0$1().setBigInt64(arg0 + 8, isLikeNone$1(ret) ? BigInt(0) : ret, true);
				getDataViewMemory0$1().setInt32(arg0 + 0, !isLikeNone$1(ret), true);
			},
			__wbg___wbindgen_boolean_get_c0f3f60bac5a78d1: function(arg0) {
				const v = arg0;
				const ret = typeof v === "boolean" ? v : void 0;
				return isLikeNone$1(ret) ? 16777215 : ret ? 1 : 0;
			},
			__wbg___wbindgen_debug_string_5398f5bb970e0daa: function(arg0, arg1) {
				const ptr1 = passStringToWasm0$1(debugString$1(arg1), wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN$1;
				getDataViewMemory0$1().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$1().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_in_41dbb8413020e076: function(arg0, arg1) {
				return arg0 in arg1;
			},
			__wbg___wbindgen_is_bigint_e2141d4f045b7eda: function(arg0) {
				return typeof arg0 === "bigint";
			},
			__wbg___wbindgen_is_function_3c846841762788c1: function(arg0) {
				return typeof arg0 === "function";
			},
			__wbg___wbindgen_is_null_0b605fc6b167c56f: function(arg0) {
				return arg0 === null;
			},
			__wbg___wbindgen_is_object_781bc9f159099513: function(arg0) {
				const val = arg0;
				return typeof val === "object" && val !== null;
			},
			__wbg___wbindgen_is_string_7ef6b97b02428fae: function(arg0) {
				return typeof arg0 === "string";
			},
			__wbg___wbindgen_is_undefined_52709e72fb9f179c: function(arg0) {
				return arg0 === void 0;
			},
			__wbg___wbindgen_jsval_eq_ee31bfad3e536463: function(arg0, arg1) {
				return arg0 === arg1;
			},
			__wbg___wbindgen_jsval_loose_eq_5bcc3bed3c69e72b: function(arg0, arg1) {
				return arg0 == arg1;
			},
			__wbg___wbindgen_number_get_34bb9d9dcfa21373: function(arg0, arg1) {
				const obj = arg1;
				const ret = typeof obj === "number" ? obj : void 0;
				getDataViewMemory0$1().setFloat64(arg0 + 8, isLikeNone$1(ret) ? 0 : ret, true);
				getDataViewMemory0$1().setInt32(arg0 + 0, !isLikeNone$1(ret), true);
			},
			__wbg___wbindgen_string_get_395e606bd0ee4427: function(arg0, arg1) {
				const obj = arg1;
				const ret = typeof obj === "string" ? obj : void 0;
				var ptr1 = isLikeNone$1(ret) ? 0 : passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
				var len1 = WASM_VECTOR_LEN$1;
				getDataViewMemory0$1().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$1().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_throw_6ddd609b62940d55: function(arg0, arg1) {
				throw new WebAssembly.Exception(__wbindgen_wrapped_jstag$1, [new Error(getStringFromWasm0$1(arg0, arg1))]);
			},
			__wbg__wbg_cb_unref_6b5b6b8576d35cb1: function(arg0) {
				arg0._wbg_cb_unref();
			},
			__wbg_arrayBuffer_eb8e9ca620af2a19: function(arg0) {
				return arg0.arrayBuffer();
			},
			__wbg_call_2d781c1f4d5c0ef8: function(arg0, arg1, arg2) {
				return arg0.call(arg1, arg2);
			},
			__wbg_call_e133b57c9155d22c: function(arg0, arg1) {
				return arg0.call(arg1);
			},
			__wbg_cereusdbFetch_ef03c6e2e53e5d27: function(arg0) {
				return cereusdbFetch$1(arg0);
			},
			__wbg_cereusdbSetFetchConcurrency_5dba4b72020a565e: function(arg0) {
				cereusdbSetFetchConcurrency$1(arg0 >>> 0);
			},
			__wbg_done_08ce71ee07e3bd17: function(arg0) {
				return arg0.done;
			},
			__wbg_entries_e8a20ff8c9757101: function(arg0) {
				return Object.entries(arg0);
			},
			__wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
				let deferred0_0;
				let deferred0_1;
				try {
					deferred0_0 = arg0;
					deferred0_1 = arg1;
					console.error(getStringFromWasm0$1(arg0, arg1));
				} finally {
					__wbg_termination_guard$1();
					try {
						wasm$1.__wbindgen_free(deferred0_0, deferred0_1, 1);
					} catch (e) {
						__wbg_handle_catch$1(e);
					}
				}
			},
			__wbg_fetch_5550a88cf343aaa9: function(arg0, arg1) {
				return arg0.fetch(arg1);
			},
			__wbg_fetch_f8a611684c3b5fe5: function(arg0, arg1) {
				return arg0.fetch(arg1);
			},
			__wbg_getRandomValues_3f44b700395062e5: function(arg0, arg1) {
				globalThis.crypto.getRandomValues(getArrayU8FromWasm0$1(arg0, arg1));
			},
			__wbg_getRandomValues_a1cf2e70b003a59d: function(arg0, arg1) {
				globalThis.crypto.getRandomValues(getArrayU8FromWasm0$1(arg0, arg1));
			},
			__wbg_getTime_1dad7b5386ddd2d9: function(arg0) {
				return arg0.getTime();
			},
			__wbg_get_326e41e095fb2575: function(arg0, arg1) {
				return Reflect.get(arg0, arg1);
			},
			__wbg_get_a8ee5c45dabc1b3b: function(arg0, arg1) {
				return arg0[arg1 >>> 0];
			},
			__wbg_get_unchecked_329cfe50afab7352: function(arg0, arg1) {
				return arg0[arg1 >>> 0];
			},
			__wbg_get_with_ref_key_6412cf3094599694: function(arg0, arg1) {
				return arg0[arg1];
			},
			__wbg_instanceof_ArrayBuffer_101e2bf31071a9f6: function(arg0) {
				let result;
				try {
					result = arg0 instanceof ArrayBuffer;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Map_f194b366846aca0c: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Map;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Response_9b4d9fd451e051b1: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Response;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Uint8Array_740438561a5b956d: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Uint8Array;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Window_23e677d2c6843922: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Window;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_isArray_33b91feb269ff46e: function(arg0) {
				return Array.isArray(arg0);
			},
			__wbg_isSafeInteger_ecd6a7f9c3e053cd: function(arg0) {
				return Number.isSafeInteger(arg0);
			},
			__wbg_iterator_d8f549ec8fb061b1: function() {
				return Symbol.iterator;
			},
			__wbg_length_b3416cf66a5452c8: function(arg0) {
				return arg0.length;
			},
			__wbg_length_ea16607d7b61445b: function(arg0) {
				return arg0.length;
			},
			__wbg_log_524eedafa26daa59: function(arg0) {
				console.log(arg0);
			},
			__wbg_new_0_1dcafdf5e786e876: function() {
				return /* @__PURE__ */ new Date();
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ new Error();
			},
			__wbg_new_5f486cdf45a04d78: function(arg0) {
				return new Uint8Array(arg0);
			},
			__wbg_new_a70fbab9066b301f: function() {
				return new Array();
			},
			__wbg_new_ab79df5bd7c26067: function() {
				return /* @__PURE__ */ new Object();
			},
			__wbg_new_typed_aaaeaf29cf802876: function(arg0, arg1) {
				try {
					var state0 = {
						a: arg0,
						b: arg1
					};
					var cb0 = (arg0, arg1) => {
						const a = state0.a;
						state0.a = 0;
						try {
							return wasm_bindgen__convert__closures_____invoke__h3bcc27440de746c0$1(a, state0.b, arg0, arg1);
						} finally {
							state0.a = a;
						}
					};
					return new Promise(cb0);
				} finally {
					state0.a = state0.b = 0;
				}
			},
			__wbg_new_with_length_825018a1616e9e55: function(arg0) {
				return new Uint8Array(arg0 >>> 0);
			},
			__wbg_new_with_str_and_init_b4b54d1a819bc724: function(arg0, arg1, arg2) {
				return new Request(getStringFromWasm0$1(arg0, arg1), arg2);
			},
			__wbg_next_11b99ee6237339e3: function(arg0) {
				return arg0.next();
			},
			__wbg_next_e01a967809d1aa68: function(arg0) {
				return arg0.next;
			},
			__wbg_now_e7c6795a7f81e10f: function(arg0) {
				return arg0.now();
			},
			__wbg_ok_7ec8b94facac7704: function(arg0) {
				return arg0.ok;
			},
			__wbg_performance_3fcf6e32a7e1ed0a: function(arg0) {
				return arg0.performance;
			},
			__wbg_prototypesetcall_d62e5099504357e6: function(arg0, arg1, arg2) {
				Uint8Array.prototype.set.call(getArrayU8FromWasm0$1(arg0, arg1), arg2);
			},
			__wbg_queueMicrotask_0c399741342fb10f: function(arg0) {
				return arg0.queueMicrotask;
			},
			__wbg_queueMicrotask_a082d78ce798393e: function(arg0) {
				queueMicrotask(arg0);
			},
			__wbg_resolve_ae8d83246e5bcc12: function(arg0) {
				return Promise.resolve(arg0);
			},
			__wbg_set_282384002438957f: function(arg0, arg1, arg2) {
				arg0[arg1 >>> 0] = arg2;
			},
			__wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {
				arg0[arg1] = arg2;
			},
			__wbg_set_8c0b3ffcf05d61c2: function(arg0, arg1, arg2) {
				arg0.set(getArrayU8FromWasm0$1(arg1, arg2));
			},
			__wbg_set_method_8c015e8bcafd7be1: function(arg0, arg1, arg2) {
				arg0.method = getStringFromWasm0$1(arg1, arg2);
			},
			__wbg_set_mode_5a87f2c809cf37c2: function(arg0, arg1) {
				arg0.mode = __wbindgen_enum_RequestMode$1[arg1];
			},
			__wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
				const ret = arg1.stack;
				const ptr1 = passStringToWasm0$1(ret, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN$1;
				getDataViewMemory0$1().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0$1().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg_static_accessor_GLOBAL_8adb955bd33fac2f: function() {
				const ret = typeof global === "undefined" ? null : global;
				return isLikeNone$1(ret) ? 0 : addToExternrefTable0$1(ret);
			},
			__wbg_static_accessor_GLOBAL_THIS_ad356e0db91c7913: function() {
				const ret = typeof globalThis === "undefined" ? null : globalThis;
				return isLikeNone$1(ret) ? 0 : addToExternrefTable0$1(ret);
			},
			__wbg_static_accessor_SELF_f207c857566db248: function() {
				const ret = typeof self === "undefined" ? null : self;
				return isLikeNone$1(ret) ? 0 : addToExternrefTable0$1(ret);
			},
			__wbg_static_accessor_WINDOW_bb9f1ba69d61b386: function() {
				const ret = typeof window === "undefined" ? null : window;
				return isLikeNone$1(ret) ? 0 : addToExternrefTable0$1(ret);
			},
			__wbg_status_318629ab93a22955: function(arg0) {
				return arg0.status;
			},
			__wbg_stringify_5ae93966a84901ac: function(arg0) {
				return JSON.stringify(arg0);
			},
			__wbg_then_098abe61755d12f6: function(arg0, arg1) {
				return arg0.then(arg1);
			},
			__wbg_then_9e335f6dd892bc11: function(arg0, arg1, arg2) {
				return arg0.then(arg1, arg2);
			},
			__wbg_value_21fc78aab0322612: function(arg0) {
				return arg0.value;
			},
			__wbindgen_cast_0000000000000001: function(arg0, arg1) {
				return makeMutClosure$1(arg0, arg1, wasm$1.wasm_bindgen__closure__destroy__hb290b944ae0b8b93, wasm_bindgen__convert__closures_____invoke__h7573a8a64f443504$1);
			},
			__wbindgen_cast_0000000000000002: function(arg0) {
				return arg0;
			},
			__wbindgen_cast_0000000000000003: function(arg0) {
				return arg0;
			},
			__wbindgen_cast_0000000000000004: function(arg0, arg1) {
				return getStringFromWasm0$1(arg0, arg1);
			},
			__wbindgen_cast_0000000000000005: function(arg0) {
				return BigInt.asUintN(64, arg0);
			},
			__wbindgen_init_externref_table: function() {
				const table = wasm$1.__wbindgen_externrefs;
				const offset = table.grow(4);
				table.set(0, void 0);
				table.set(offset + 0, void 0);
				table.set(offset + 1, null);
				table.set(offset + 2, true);
				table.set(offset + 3, false);
			},
			__wbindgen_jstag: WebAssembly.JSTag,
			__wbindgen_wrapped_jstag: __wbindgen_wrapped_jstag$1
		},
		"env": import1$1,
		"wasi_snapshot_preview1": import2$1,
		"env": import3$1,
		"env": import4$1,
		"wasi_snapshot_preview1": import5$1,
		"wasi_snapshot_preview1": import6$1,
		"env": import7$1,
		"wasi_snapshot_preview1": import8$1,
		"wasi_snapshot_preview1": import9$1,
		"wasi_snapshot_preview1": import10$1,
		"wasi_snapshot_preview1": import11$1,
		"env": import12$1,
		"env": import13$1,
		"env": import14$1,
		"wasi_snapshot_preview1": import15$1,
		"env": import16$1,
		"env": import17$1,
		"env": import18$1,
		"wasi_snapshot_preview1": import19$1,
		"env": import20$1,
		"env": import21$1,
		"env": import22$1,
		"env": import23$1,
		"env": import24$1,
		"env": import25$1,
		"env": import26$1,
		"env": import27$1,
		"env": import28$1,
		"env": import29$1,
		"wasi_snapshot_preview1": import30$1,
		"env": import31$1,
		"env": import32$1,
		"env": import33$1,
		"env": import34$1,
		"env": import35$1,
		"env": import36$1,
		"env": import37$1,
		"env": import38$1,
		"env": import39$1,
		"env": import40$1,
		"env": import41$1,
		"env": import42$1,
		"env": import43$1,
		"env": import44$1,
		"env": import45$1,
		"env": import46$1,
		"env": import47$1,
		"env": import48$1,
		"env": import49$1,
		"env": import50$1,
		"env": import51$1,
		"env": import52$1,
		"env": import53$1,
		"env": import54$1,
		"env": import55$1,
		"env": import56$1,
		"env": import57$1,
		"env": import58,
		"env": import59,
		"env": import60,
		"env": import61,
		"env": import62,
		"env": import63,
		"wasi_snapshot_preview1": import64,
		"env": import65,
		"env": import66,
		"env": import67,
		"wasi_snapshot_preview1": import68
	};
}
function __wbg_termination_guard$1() {
	__wbg_terminated_addr$1 ??= wasm$1.__instance_terminated.value / 4;
	if (getInt32ArrayMemory0$1()[__wbg_terminated_addr$1]) throw new Error("Module terminated");
}
function __wbg_handle_catch$1(e) {
	if (e instanceof WebAssembly.Exception && e.is(__wbindgen_wrapped_jstag$1)) throw e.getArg(__wbindgen_wrapped_jstag$1, 0);
	getInt32ArrayMemory0$1()[__wbg_terminated_addr$1] = 1;
	throw e;
}
function wasm_bindgen__convert__closures_____invoke__h7573a8a64f443504$1(arg0, arg1, arg2) {
	let ret;
	__wbg_termination_guard$1();
	try {
		ret = wasm$1.wasm_bindgen__convert__closures_____invoke__h7573a8a64f443504(arg0, arg1, arg2);
	} catch (e) {
		__wbg_handle_catch$1(e);
	}
	if (ret[1]) throw takeFromExternrefTable0$1(ret[0]);
}
function wasm_bindgen__convert__closures_____invoke__h3bcc27440de746c0$1(arg0, arg1, arg2, arg3) {
	__wbg_termination_guard$1();
	try {
		wasm$1.wasm_bindgen__convert__closures_____invoke__h3bcc27440de746c0(arg0, arg1, arg2, arg3);
	} catch (e) {
		__wbg_handle_catch$1(e);
	}
}
function addToExternrefTable0$1(obj) {
	const idx = wasm$1.__externref_table_alloc();
	wasm$1.__wbindgen_externrefs.set(idx, obj);
	return idx;
}
function debugString$1(val) {
	const type = typeof val;
	if (type == "number" || type == "boolean" || val == null) return \`\${val}\`;
	if (type == "string") return \`"\${val}"\`;
	if (type == "symbol") {
		const description = val.description;
		if (description == null) return "Symbol";
		else return \`Symbol(\${description})\`;
	}
	if (type == "function") {
		const name = val.name;
		if (typeof name == "string" && name.length > 0) return \`Function(\${name})\`;
		else return "Function";
	}
	if (Array.isArray(val)) {
		const length = val.length;
		let debug = "[";
		if (length > 0) debug += debugString$1(val[0]);
		for (let i = 1; i < length; i++) debug += ", " + debugString$1(val[i]);
		debug += "]";
		return debug;
	}
	const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));
	let className;
	if (builtInMatches && builtInMatches.length > 1) className = builtInMatches[1];
	else return toString.call(val);
	if (className == "Object") try {
		return "Object(" + JSON.stringify(val) + ")";
	} catch (_) {
		return "Object";
	}
	if (val instanceof Error) return \`\${val.name}: \${val.message}\\n\${val.stack}\`;
	return className;
}
function getArrayU8FromWasm0$1(ptr, len) {
	ptr = ptr >>> 0;
	return getUint8ArrayMemory0$1().subarray(ptr / 1, ptr / 1 + len);
}
function getDataViewMemory0$1() {
	if (cachedDataViewMemory0$1 === null || cachedDataViewMemory0$1.buffer.detached === true || cachedDataViewMemory0$1.buffer.detached === void 0 && cachedDataViewMemory0$1.buffer !== wasm$1.memory.buffer) cachedDataViewMemory0$1 = new DataView(wasm$1.memory.buffer);
	return cachedDataViewMemory0$1;
}
function getInt32ArrayMemory0$1() {
	if (cachedInt32ArrayMemory0$1 === null || cachedInt32ArrayMemory0$1.byteLength === 0) cachedInt32ArrayMemory0$1 = new Int32Array(wasm$1.memory.buffer);
	return cachedInt32ArrayMemory0$1;
}
function getStringFromWasm0$1(ptr, len) {
	ptr = ptr >>> 0;
	return decodeText$1(ptr, len);
}
function getUint8ArrayMemory0$1() {
	if (cachedUint8ArrayMemory0$1 === null || cachedUint8ArrayMemory0$1.byteLength === 0) cachedUint8ArrayMemory0$1 = new Uint8Array(wasm$1.memory.buffer);
	return cachedUint8ArrayMemory0$1;
}
function isLikeNone$1(x) {
	return x === void 0 || x === null;
}
function makeMutClosure$1(arg0, arg1, dtor, f) {
	const state = {
		a: arg0,
		b: arg1,
		cnt: 1,
		dtor
	};
	const real = (...args) => {
		state.cnt++;
		const a = state.a;
		state.a = 0;
		try {
			return f(a, state.b, ...args);
		} finally {
			state.a = a;
			real._wbg_cb_unref();
		}
	};
	real._wbg_cb_unref = () => {
		if (--state.cnt === 0) {
			state.dtor(state.a, state.b);
			state.a = 0;
			CLOSURE_DTORS$1.unregister(state);
		}
	};
	CLOSURE_DTORS$1.register(real, state, state);
	return real;
}
function passArray8ToWasm0$1(arg, malloc) {
	const ptr = malloc(arg.length * 1, 1) >>> 0;
	getUint8ArrayMemory0$1().set(arg, ptr / 1);
	WASM_VECTOR_LEN$1 = arg.length;
	return ptr;
}
function passStringToWasm0$1(arg, malloc, realloc) {
	if (realloc === void 0) {
		const buf = cachedTextEncoder$1.encode(arg);
		const ptr = malloc(buf.length, 1) >>> 0;
		getUint8ArrayMemory0$1().subarray(ptr, ptr + buf.length).set(buf);
		WASM_VECTOR_LEN$1 = buf.length;
		return ptr;
	}
	let len = arg.length;
	let ptr = malloc(len, 1) >>> 0;
	const mem = getUint8ArrayMemory0$1();
	let offset = 0;
	for (; offset < len; offset++) {
		const code = arg.charCodeAt(offset);
		if (code > 127) break;
		mem[ptr + offset] = code;
	}
	if (offset !== len) {
		if (offset !== 0) arg = arg.slice(offset);
		ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
		const view = getUint8ArrayMemory0$1().subarray(ptr + offset, ptr + len);
		const ret = cachedTextEncoder$1.encodeInto(arg, view);
		offset += ret.written;
		ptr = realloc(ptr, len, offset, 1) >>> 0;
	}
	WASM_VECTOR_LEN$1 = offset;
	return ptr;
}
function takeFromExternrefTable0$1(idx) {
	const value = wasm$1.__wbindgen_externrefs.get(idx);
	wasm$1.__externref_table_dealloc(idx);
	return value;
}
function decodeText$1(ptr, len) {
	numBytesDecoded$1 += len;
	if (numBytesDecoded$1 >= MAX_SAFARI_DECODE_BYTES$1) {
		cachedTextDecoder$1 = new TextDecoder("utf-8", {
			ignoreBOM: true,
			fatal: true
		});
		cachedTextDecoder$1.decode();
		numBytesDecoded$1 = len;
	}
	return cachedTextDecoder$1.decode(getUint8ArrayMemory0$1().subarray(ptr, ptr + len));
}
function __wbg_finalize_init$1(instance, module) {
	wasm$1 = instance.exports;
	cachedDataViewMemory0$1 = null;
	cachedInt32ArrayMemory0$1 = null;
	cachedUint8ArrayMemory0$1 = null;
	if (typeof wasm$1.__wasm_call_ctors === "function") wasm$1.__wasm_call_ctors();
	wasm$1.__wbindgen_start();
	return wasm$1;
}
async function __wbg_load$1(module, imports) {
	if (typeof Response === "function" && module instanceof Response) {
		if (typeof WebAssembly.instantiateStreaming === "function") try {
			return await WebAssembly.instantiateStreaming(module, imports);
		} catch (e) {
			if (module.ok && expectedResponseType(module.type) && module.headers.get("Content-Type") !== "application/wasm") console.warn("\`WebAssembly.instantiateStreaming\` failed because your server does not serve Wasm with \`application/wasm\` MIME type. Falling back to \`WebAssembly.instantiate\` which is slower. Original error:\\n", e);
			else throw e;
		}
		const bytes = await module.arrayBuffer();
		return await WebAssembly.instantiate(bytes, imports);
	} else {
		const instance = await WebAssembly.instantiate(module, imports);
		if (instance instanceof WebAssembly.Instance) return {
			instance,
			module
		};
		else return instance;
	}
	function expectedResponseType(type) {
		switch (type) {
			case "basic":
			case "cors":
			case "default": return true;
		}
		return false;
	}
}
async function __wbg_init$1(module_or_path) {
	if (wasm$1 !== void 0) return wasm$1;
	if (module_or_path !== void 0) {
		if (Object.getPrototypeOf(module_or_path) === Object.prototype) ({module_or_path} = module_or_path);
		else console.warn("using deprecated parameters for the initialization function; pass a single object instead");
	}
	if (module_or_path === void 0) throw new Error("@cereusdb external entry requires CereusDB.create({ wasmUrl }) or CereusDB.create({ wasmSource })");
	const imports = __wbg_get_imports$1();
	if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) module_or_path = fetch(module_or_path);
	const { instance, module } = await __wbg_load$1(await module_or_path, imports);
	if (instance.exports && instance.exports.memory) setMemory$1(instance.exports.memory);
	return __wbg_finalize_init$1(instance, module);
}
var __env$1, __wasi$1, CereusDB$3, import1$1, import2$1, import3$1, import4$1, import5$1, import6$1, import7$1, import8$1, import9$1, import10$1, import11$1, import12$1, import13$1, import14$1, import15$1, import16$1, import17$1, import18$1, import19$1, import20$1, import21$1, import22$1, import23$1, import24$1, import25$1, import26$1, import27$1, import28$1, import29$1, import30$1, import31$1, import32$1, import33$1, import34$1, import35$1, import36$1, import37$1, import38$1, import39$1, import40$1, import41$1, import42$1, import43$1, import44$1, import45$1, import46$1, import47$1, import48$1, import49$1, import50$1, import51$1, import52$1, import53$1, import54$1, import55$1, import56$1, import57$1, import58, import59, import60, import61, import62, import63, import64, import65, import66, import67, import68, __wbindgen_wrapped_jstag$1, __wbg_terminated_addr$1, __wbindgen_enum_RequestMode$1, CereusDBFinalization$1, CLOSURE_DTORS$1, cachedDataViewMemory0$1, cachedInt32ArrayMemory0$1, cachedUint8ArrayMemory0$1, cachedTextDecoder$1, MAX_SAFARI_DECODE_BYTES$1, numBytesDecoded$1, cachedTextEncoder$1, WASM_VECTOR_LEN$1, wasm$1;
var init_cereusdb_external$1 = __esmMin((() => {
	init_env_shim$1();
	init_inline0$1();
	__env$1 = createEnvImports$1();
	__wasi$1 = createWasiImports$1();
	CereusDB$3 = class CereusDB$3 {
		static __wrap(ptr) {
			ptr = ptr >>> 0;
			const obj = Object.create(CereusDB$3.prototype);
			obj.__wbg_ptr = ptr;
			CereusDBFinalization$1.register(obj, obj.__wbg_ptr, obj);
			return obj;
		}
		__destroy_into_raw() {
			const ptr = this.__wbg_ptr;
			this.__wbg_ptr = 0;
			CereusDBFinalization$1.unregister(this);
			return ptr;
		}
		free() {
			const ptr = this.__destroy_into_raw();
			__wbg_termination_guard$1();
			try {
				wasm$1.__wbg_cereusdb_free(ptr, 0);
			} catch (e) {
				__wbg_handle_catch$1(e);
			}
		}
		/**
		* Create a new CereusDB instance.
		* Initializes DataFusion context and registers all spatial functions.
		* @returns {CereusDB}
		*/
		static create() {
			let ret;
			__wbg_termination_guard$1();
			try {
				ret = wasm$1.cereusdb_create();
			} catch (e) {
				__wbg_handle_catch$1(e);
			}
			if (ret[2]) throw takeFromExternrefTable0$1(ret[1]);
			return CereusDB$3.__wrap(ret[0]);
		}
		/**
		* Drop a registered table.
		* @param {string} table_name
		*/
		drop_table(table_name) {
			const ptr0 = passStringToWasm0$1(table_name, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$1;
			let ret;
			__wbg_termination_guard$1();
			try {
				ret = wasm$1.cereusdb_drop_table(this.__wbg_ptr, ptr0, len0);
			} catch (e) {
				__wbg_handle_catch$1(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$1(ret[0]);
		}
		/**
		* Register a GeoJSON string as a named table.
		* @param {string} table_name
		* @param {string} geojson
		*/
		register_geojson(table_name, geojson) {
			const ptr0 = passStringToWasm0$1(table_name, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$1;
			const ptr1 = passStringToWasm0$1(geojson, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN$1;
			let ret;
			__wbg_termination_guard$1();
			try {
				ret = wasm$1.cereusdb_register_geojson(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch$1(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$1(ret[0]);
		}
		/**
		* Register a GeoTIFF buffer as a single-column raster table.
		* Requires the full GDAL-enabled build.
		* @param {string} table_name
		* @param {Uint8Array} data
		*/
		register_geotiff_buffer(table_name, data) {
			const ptr0 = passStringToWasm0$1(table_name, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$1;
			const ptr1 = passArray8ToWasm0$1(data, wasm$1.__wbindgen_malloc);
			const len1 = WASM_VECTOR_LEN$1;
			let ret;
			__wbg_termination_guard$1();
			try {
				ret = wasm$1.cereusdb_register_geotiff_buffer(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch$1(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$1(ret[0]);
		}
		/**
		* Register browser-backed object stores for ranged/listing reads.
		* @param {any} config
		*/
		register_object_stores(config) {
			let ret;
			__wbg_termination_guard$1();
			try {
				ret = wasm$1.cereusdb_register_object_stores(this.__wbg_ptr, config);
			} catch (e) {
				__wbg_handle_catch$1(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$1(ret[0]);
		}
		/**
		* Register a Uint8Array containing Parquet data as a named table.
		* Use for files obtained via the browser File API.
		* @param {string} table_name
		* @param {Uint8Array} data
		* @returns {Promise<void>}
		*/
		register_parquet_buffer(table_name, data) {
			const ptr0 = passStringToWasm0$1(table_name, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$1;
			const ptr1 = passArray8ToWasm0$1(data, wasm$1.__wbindgen_malloc);
			const len1 = WASM_VECTOR_LEN$1;
			let ret;
			__wbg_termination_guard$1();
			try {
				ret = wasm$1.cereusdb_register_parquet_buffer(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch$1(e);
			}
			return ret;
		}
		/**
		* Register a remote Parquet object or prefix as a DataFusion listing table.
		* @param {string} table_name
		* @param {string} table_url
		* @param {any} options
		* @returns {Promise<void>}
		*/
		register_parquet_table(table_name, table_url, options) {
			const ptr0 = passStringToWasm0$1(table_name, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$1;
			const ptr1 = passStringToWasm0$1(table_url, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN$1;
			let ret;
			__wbg_termination_guard$1();
			try {
				ret = wasm$1.cereusdb_register_parquet_table(this.__wbg_ptr, ptr0, len0, ptr1, len1, options);
			} catch (e) {
				__wbg_handle_catch$1(e);
			}
			return ret;
		}
		/**
		* Register a raster buffer as a single-column raster table.
		* Requires the full GDAL-enabled build.
		* @param {string} table_name
		* @param {string} format
		* @param {Uint8Array} data
		*/
		register_raster_buffer(table_name, format, data) {
			const ptr0 = passStringToWasm0$1(table_name, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$1;
			const ptr1 = passStringToWasm0$1(format, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN$1;
			const ptr2 = passArray8ToWasm0$1(data, wasm$1.__wbindgen_malloc);
			const len2 = WASM_VECTOR_LEN$1;
			let ret;
			__wbg_termination_guard$1();
			try {
				ret = wasm$1.cereusdb_register_raster_buffer(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
			} catch (e) {
				__wbg_handle_catch$1(e);
			}
			if (ret[1]) throw takeFromExternrefTable0$1(ret[0]);
		}
		/**
		* Register a remote Parquet file URL as a named table.
		* Pre-fetches the entire file via HTTP, then loads into memory.
		* The server must support CORS.
		* @param {string} table_name
		* @param {string} url
		* @returns {Promise<void>}
		*/
		register_remote_parquet(table_name, url) {
			const ptr0 = passStringToWasm0$1(table_name, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$1;
			const ptr1 = passStringToWasm0$1(url, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN$1;
			let ret;
			__wbg_termination_guard$1();
			try {
				ret = wasm$1.cereusdb_register_remote_parquet(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch$1(e);
			}
			return ret;
		}
		/**
		* Execute a SQL query.
		* Returns results as Arrow IPC bytes (Uint8Array).
		* The caller can decode this with the apache-arrow JS library.
		* @param {string} query
		* @returns {Promise<Uint8Array>}
		*/
		sql(query) {
			const ptr0 = passStringToWasm0$1(query, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$1;
			let ret;
			__wbg_termination_guard$1();
			try {
				ret = wasm$1.cereusdb_sql(this.__wbg_ptr, ptr0, len0);
			} catch (e) {
				__wbg_handle_catch$1(e);
			}
			return ret;
		}
		/**
		* Execute a SQL query and return results as a JSON string.
		* Convenience method for simple use cases.
		* @param {string} query
		* @returns {Promise<string>}
		*/
		sql_json(query) {
			const ptr0 = passStringToWasm0$1(query, wasm$1.__wbindgen_malloc, wasm$1.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN$1;
			let ret;
			__wbg_termination_guard$1();
			try {
				ret = wasm$1.cereusdb_sql_json(this.__wbg_ptr, ptr0, len0);
			} catch (e) {
				__wbg_handle_catch$1(e);
			}
			return ret;
		}
		/**
		* List all registered table names.
		* @returns {any}
		*/
		tables() {
			let ret;
			__wbg_termination_guard$1();
			try {
				ret = wasm$1.cereusdb_tables(this.__wbg_ptr);
			} catch (e) {
				__wbg_handle_catch$1(e);
			}
			if (ret[2]) throw takeFromExternrefTable0$1(ret[1]);
			return takeFromExternrefTable0$1(ret[0]);
		}
		/**
		* Get version information.
		*
		* Release builds set \`CEREUSDB_VERSION\` to the full npm version, including
		* prerelease suffixes; other builds fall back to the crate version.
		* @returns {string}
		*/
		version() {
			let deferred1_0;
			let deferred1_1;
			try {
				let ret;
				__wbg_termination_guard$1();
				try {
					ret = wasm$1.cereusdb_version(this.__wbg_ptr);
				} catch (e) {
					__wbg_handle_catch$1(e);
				}
				deferred1_0 = ret[0];
				deferred1_1 = ret[1];
				return getStringFromWasm0$1(ret[0], ret[1]);
			} finally {
				__wbg_termination_guard$1();
				try {
					wasm$1.__wbindgen_free(deferred1_0, deferred1_1, 1);
				} catch (e) {
					__wbg_handle_catch$1(e);
				}
			}
		}
	};
	if (Symbol.dispose) CereusDB$3.prototype[Symbol.dispose] = CereusDB$3.prototype.free;
	import1$1 = __env$1;
	import2$1 = __wasi$1;
	import3$1 = __env$1;
	import4$1 = __env$1;
	import5$1 = __wasi$1;
	import6$1 = __wasi$1;
	import7$1 = __env$1;
	import8$1 = __wasi$1;
	import9$1 = __wasi$1;
	import10$1 = __wasi$1;
	import11$1 = __wasi$1;
	import12$1 = __env$1;
	import13$1 = __env$1;
	import14$1 = __env$1;
	import15$1 = __wasi$1;
	import16$1 = __env$1;
	import17$1 = __env$1;
	import18$1 = __env$1;
	import19$1 = __wasi$1;
	import20$1 = __env$1;
	import21$1 = __env$1;
	import22$1 = __env$1;
	import23$1 = __env$1;
	import24$1 = __env$1;
	import25$1 = __env$1;
	import26$1 = __env$1;
	import27$1 = __env$1;
	import28$1 = __env$1;
	import29$1 = __env$1;
	import30$1 = __wasi$1;
	import31$1 = __env$1;
	import32$1 = __env$1;
	import33$1 = __env$1;
	import34$1 = __env$1;
	import35$1 = __env$1;
	import36$1 = __env$1;
	import37$1 = __env$1;
	import38$1 = __env$1;
	import39$1 = __env$1;
	import40$1 = __env$1;
	import41$1 = __env$1;
	import42$1 = __env$1;
	import43$1 = __env$1;
	import44$1 = __env$1;
	import45$1 = __env$1;
	import46$1 = __env$1;
	import47$1 = __env$1;
	import48$1 = __env$1;
	import49$1 = __env$1;
	import50$1 = __env$1;
	import51$1 = __env$1;
	import52$1 = __env$1;
	import53$1 = __env$1;
	import54$1 = __env$1;
	import55$1 = __env$1;
	import56$1 = __env$1;
	import57$1 = __env$1;
	import58 = __env$1;
	import59 = __env$1;
	import60 = __env$1;
	import61 = __env$1;
	import62 = __env$1;
	import63 = __env$1;
	import64 = __wasi$1;
	import65 = __env$1;
	import66 = __env$1;
	import67 = __env$1;
	import68 = __wasi$1;
	__wbindgen_wrapped_jstag$1 = new WebAssembly.Tag({ parameters: ["externref"] });
	__wbindgen_enum_RequestMode$1 = [
		"same-origin",
		"no-cors",
		"cors",
		"navigate"
	];
	CereusDBFinalization$1 = typeof FinalizationRegistry === "undefined" ? {
		register: () => {},
		unregister: () => {}
	} : new FinalizationRegistry((ptr) => wasm$1.__wbg_cereusdb_free(ptr >>> 0, 1));
	CLOSURE_DTORS$1 = typeof FinalizationRegistry === "undefined" ? {
		register: () => {},
		unregister: () => {}
	} : new FinalizationRegistry((state) => state.dtor(state.a, state.b));
	cachedDataViewMemory0$1 = null;
	cachedInt32ArrayMemory0$1 = null;
	cachedUint8ArrayMemory0$1 = null;
	cachedTextDecoder$1 = new TextDecoder("utf-8", {
		ignoreBOM: true,
		fatal: true
	});
	cachedTextDecoder$1.decode();
	MAX_SAFARI_DECODE_BYTES$1 = 2146435072;
	numBytesDecoded$1 = 0;
	cachedTextEncoder$1 = new TextEncoder();
	if (!("encodeInto" in cachedTextEncoder$1)) cachedTextEncoder$1.encodeInto = function(arg, view) {
		const buf = cachedTextEncoder$1.encode(arg);
		view.set(buf);
		return {
			read: arg.length,
			written: buf.length
		};
	};
	WASM_VECTOR_LEN$1 = 0;
}));
//#endregion
//#region ../../node_modules/@cereusdb/full/dist/external.js
var external_exports$1 = /* @__PURE__ */ __exportAll({ CereusDB: () => CereusDB$2 });
function toUint8Array$1(data) {
	if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
	return new Uint8Array(data);
}
function normalizeRasterFormat$1(format) {
	const normalized = format.trim().toLowerCase();
	if (normalized === "geotiff" || normalized === "tiff") return normalized;
	throw new Error(\`Unsupported raster format: \${format}\`);
}
var CereusDB$2;
var init_external$1 = __esmMin((() => {
	init_cereusdb_external$1();
	CereusDB$2 = class CereusDB$2 {
		constructor(inner) {
			this.inner = inner;
		}
		/**
		* Create and initialize a new CereusDB instance.
		* This loads the WASM module and initializes the query engine.
		*/
		static async create(options) {
			const source = options?.wasmSource ?? options?.wasmUrl;
			if (source === void 0) await __wbg_init$1();
			else await __wbg_init$1({ module_or_path: source });
			const inner = CereusDB$3.create();
			const db = new CereusDB$2(inner);
			if (options?.objectStores !== void 0) db.registerObjectStores(options.objectStores);
			return db;
		}
		/**
		* Execute a SQL query and return results as Arrow IPC bytes.
		*/
		async sql(query) {
			return await this.inner.sql(query);
		}
		/**
		* Execute a SQL query and return results as JSON.
		*/
		async sqlJSON(query) {
			const json = await this.inner.sql_json(query);
			return JSON.parse(json);
		}
		/**
		* Register a remote Parquet file as a table.
		* The server must support CORS.
		*/
		async registerRemoteParquet(name, url) {
			await this.inner.register_remote_parquet(name, url);
		}
		/**
		* Register browser-backed object stores for ranged and listing reads.
		*/
		registerObjectStores(config) {
			this.objectStoreApi().register_object_stores(config);
		}
		/**
		* Register a remote Parquet object or prefix through DataFusion's listing table path.
		*/
		async registerParquetTable(name, url, options = {}) {
			await this.objectStoreApi().register_parquet_table(name, url, options);
		}
		/**
		* Register a local file (from File API / drag-and-drop) as a table.
		* Currently supports Parquet, GeoJSON, and GeoTIFF rasters.
		*/
		async registerFile(name, file) {
			const buffer = new Uint8Array(await file.arrayBuffer());
			const ext = file.name.split(".").pop()?.toLowerCase();
			if (ext === "parquet" || ext === "geoparquet") await this.inner.register_parquet_buffer(name, buffer);
			else if (ext === "geojson" || ext === "json") {
				const text = new TextDecoder().decode(buffer);
				this.inner.register_geojson(name, text);
			} else if (ext === "tif" || ext === "tiff") this.registerRaster(name, buffer, "geotiff");
			else throw new Error(\`Unsupported file format: .\${ext}\`);
		}
		/**
		* Register a GeoJSON object or string as a table.
		*/
		registerGeoJSON(name, geojson) {
			const str = typeof geojson === "string" ? geojson : JSON.stringify(geojson);
			this.inner.register_geojson(name, str);
		}
		/**
		* Register a raster buffer as a single-column raster table.
		* Requires the full GDAL-enabled package build.
		*/
		registerRaster(name, data, format) {
			this.inner.register_raster_buffer(name, normalizeRasterFormat$1(format), toUint8Array$1(data));
		}
		/**
		* Register a GeoTIFF buffer as a single-column raster table.
		* Requires the full GDAL-enabled package build.
		*/
		registerGeoTIFF(name, data) {
			this.registerRaster(name, data, "geotiff");
		}
		/** Drop a table. */
		dropTable(name) {
			this.inner.drop_table(name);
		}
		/** List registered tables. */
		tables() {
			return this.inner.tables();
		}
		/** Version string. */
		version() {
			return this.inner.version();
		}
		objectStoreApi() {
			const api = this.inner;
			if (typeof api.register_object_stores !== "function" || typeof api.register_parquet_table !== "function") throw new Error("Browser object stores are not available in this CereusDB build");
			return api;
		}
	};
}));
//#endregion
//#region ../../node_modules/@cereusdb/global/dist/wasm/env_shim.js?v=emsdk6-20261001-2
function setMemory(mem) {
	_memory = mem;
}
function getDataView() {
	return _memory ? new DataView(_memory.buffer) : null;
}
function writeU32(ptr, value) {
	const view = getDataView();
	if (view && ptr) view.setUint32(ptr, value >>> 0, true);
}
function writeU64(ptr, value) {
	const view = getDataView();
	if (view && ptr) view.setBigUint64(ptr, BigInt(value), true);
}
function readIovs(iovs, iovcnt) {
	const view = getDataView();
	if (!view) return {
		bytes: /* @__PURE__ */ new Uint8Array(0),
		length: 0
	};
	let length = 0;
	for (let i = 0; i < iovcnt; i++) length += view.getUint32(iovs + i * 8 + 4, true);
	const bytes = new Uint8Array(length);
	let offset = 0;
	for (let i = 0; i < iovcnt; i++) {
		const ptr = view.getUint32(iovs + i * 8, true);
		const len = view.getUint32(iovs + i * 8 + 4, true);
		bytes.set(new Uint8Array(_memory.buffer, ptr, len), offset);
		offset += len;
	}
	return {
		bytes,
		length
	};
}
function forwardOutput(fd, bytes) {
	if (fd !== 1 && fd !== 2) return;
	const lines = ((_pendingOutput.get(fd) ?? "") + _textDecoder.decode(bytes)).split("\\n");
	_pendingOutput.set(fd, lines.pop());
	const log = fd === 2 ? console.warn : console.log;
	for (const line of lines) if (line.trim()) log(\`[cereusdb] \${line}\`);
}
function createCppException(ptr, type, destructor, message = "C++ exception") {
	const error = new WebAssembly.RuntimeError(message);
	error.__cxa_exception_ptr = ptr >>> 0;
	error.__cxa_type = type >>> 0;
	error.__cxa_destructor = destructor >>> 0;
	return error;
}
function createEnvImports() {
	return {
		emscripten_resize_heap: (requestedSize) => {
			if (!_memory) {
				console.error("[env_shim] emscripten_resize_heap called but no memory set");
				return 0;
			}
			try {
				const oldBytes = _memory.buffer.byteLength;
				if (requestedSize <= oldBytes) return 1;
				const pagesToGrow = Math.ceil((requestedSize - oldBytes) / 65536);
				_memory.grow(pagesToGrow);
				return 1;
			} catch (e) {
				console.error("[env_shim] memory.grow failed:", e);
				return 0;
			}
		},
		emscripten_get_heap_max: () => 2147483648,
		_Unwind_CallPersonality: () => 0,
		__gxx_wasm_personality_v0: () => 0,
		__cxa_begin_catch: (ptr) => {
			const value = ptr >>> 0;
			_caughtCxaExceptions.push(value);
			return value;
		},
		__cxa_end_catch: () => {
			_caughtCxaExceptions.pop();
		},
		__cxa_throw: (ptr, type, destructor) => {
			throw createCppException(ptr, type, destructor);
		},
		__cxa_rethrow: () => {
			throw createCppException(_caughtCxaExceptions.length ? _caughtCxaExceptions[_caughtCxaExceptions.length - 1] : 0, 0, 0, "C++ exception rethrown");
		},
		__c_longjmp: typeof WebAssembly.Tag === "function" ? new WebAssembly.Tag({ parameters: ["i32"] }) : null,
		emscripten_date_now: () => Date.now(),
		emscripten_get_now: () => performance.now(),
		_localtime_js: () => {},
		_tzset_js: () => {},
		__syscall_openat: () => UNSUPPORTED_ERRNO,
		__syscall_fcntl64: () => UNSUPPORTED_ERRNO,
		__syscall_ioctl: () => UNSUPPORTED_ERRNO,
		__syscall_fstat64: () => UNSUPPORTED_ERRNO,
		__syscall_stat64: () => UNSUPPORTED_ERRNO,
		__syscall_lstat64: () => UNSUPPORTED_ERRNO,
		__syscall_newfstatat: () => UNSUPPORTED_ERRNO,
		__syscall_getcwd: () => UNSUPPORTED_ERRNO,
		__syscall_mkdirat: () => UNSUPPORTED_ERRNO,
		__syscall_rmdir: () => UNSUPPORTED_ERRNO,
		__syscall_unlinkat: () => UNSUPPORTED_ERRNO,
		__syscall_renameat: () => UNSUPPORTED_ERRNO,
		__syscall_readlinkat: () => UNSUPPORTED_ERRNO,
		__syscall_getdents64: () => UNSUPPORTED_ERRNO,
		__syscall_statfs64: () => UNSUPPORTED_ERRNO,
		__syscall_faccessat: () => UNSUPPORTED_ERRNO,
		__syscall_chmod: () => UNSUPPORTED_ERRNO,
		__syscall_fchmod: () => UNSUPPORTED_ERRNO,
		__syscall_fchown32: () => UNSUPPORTED_ERRNO,
		__syscall_fdatasync: () => 0,
		__syscall_ftruncate64: () => UNSUPPORTED_ERRNO,
		__syscall_prlimit64: () => UNSUPPORTED_ERRNO,
		__syscall_dup3: () => UNSUPPORTED_ERRNO,
		__syscall_pipe: () => UNSUPPORTED_ERRNO,
		__syscall_pipe2: () => UNSUPPORTED_ERRNO,
		__syscall_wait4: () => UNSUPPORTED_ERRNO,
		__syscall_getuid32: () => 0,
		__syscall_geteuid32: () => 0,
		__syscall_getgid32: () => 0,
		__syscall_getegid32: () => 0,
		__syscall_utimensat: () => UNSUPPORTED_ERRNO,
		emscripten_errn: () => 0,
		emscripten_stack_snapshot: () => 0,
		emscripten_stack_unwind_buffer: () => 0,
		emscripten_asm_const_int: () => 0,
		HaveOffsetConverter: () => 0,
		emscripten_pc_get_function: () => 0,
		malloc_usable_size: () => 0,
		_mmap_js: () => -1,
		_munmap_js: () => -1,
		__wasm_longjmp: () => {
			throw new WebAssembly.RuntimeError("longjmp is not supported in the browser runtime");
		},
		dlopen: () => 0,
		__dlsym: () => 0,
		vfork: () => -1,
		fork: () => -1,
		execve: () => -1,
		_abort_js: () => {
			console.warn("[env_shim] abort called (ignored)");
		},
		exit: (code) => {
			console.warn(\`exit(\${code})\`);
		}
	};
}
function createWasiImports() {
	return {
		fd_close: () => 0,
		fd_write: (fd, iovs, iovcnt, pnum) => {
			const { bytes, length } = readIovs(iovs, iovcnt);
			forwardOutput(fd, bytes);
			writeU32(pnum, length);
			return 0;
		},
		fd_read: (_fd, _iovs, _iovcnt, pnum) => {
			writeU32(pnum, 0);
			return 0;
		},
		fd_pwrite: (_fd, iovs, iovcnt, _offset, pnum) => {
			writeU32(pnum, readIovs(iovs, iovcnt).length);
			return 0;
		},
		fd_pread: (_fd, _iovs, _iovcnt, _offset, pnum) => {
			writeU32(pnum, 0);
			return 0;
		},
		fd_seek: (_fd, _offset, _whence, newOffset) => {
			writeU64(newOffset, 0);
			return 0;
		},
		fd_sync: () => 0,
		fd_fdstat_get: () => 0,
		clock_res_get: (_clockId, resolutionPtr) => {
			writeU64(resolutionPtr, 1e6);
			return 0;
		},
		clock_time_get: (clockId, _precision, timePtr) => {
			writeU64(timePtr, clockId === 1 ? Math.floor(performance.now() * 1e6) : Date.now() * 1e6);
			return 0;
		},
		environ_get: () => 0,
		environ_sizes_get: (countPtr, sizePtr) => {
			writeU32(countPtr, 0);
			writeU32(sizePtr, 0);
			return 0;
		},
		proc_exit: (code) => {
			throw new WebAssembly.RuntimeError(\`proc_exit(\${code})\`);
		},
		random_get: (buf, len) => {
			if (!_memory) return -1;
			const bytes = new Uint8Array(_memory.buffer, buf, len);
			crypto.getRandomValues(bytes);
			return 0;
		}
	};
}
var _memory, _caughtCxaExceptions, UNSUPPORTED_ERRNO, _textDecoder, _pendingOutput;
var init_env_shim = __esmMin((() => {
	_memory = null;
	_caughtCxaExceptions = [];
	UNSUPPORTED_ERRNO = -38;
	_textDecoder = new TextDecoder();
	_pendingOutput = /* @__PURE__ */ new Map();
}));
//#endregion
//#region ../../node_modules/@cereusdb/global/dist/wasm/snippets/cereusdb-object-store-0da8c74e50551289/inline0.js
function cereusdbPumpFetchQueue() {
	while (cereusdbFetchActive < cereusdbFetchMaxConcurrency && cereusdbFetchQueue.length > 0) {
		const task = cereusdbFetchQueue.shift();
		cereusdbFetchActive += 1;
		cereusdbExecuteFetch(task.request).then(task.resolve, task.reject).finally(() => {
			cereusdbFetchActive -= 1;
			cereusdbPumpFetchQueue();
		});
	}
}
async function cereusdbExecuteFetch(request) {
	const headers = new Headers();
	for (const [name, value] of request.headers) headers.append(name, value);
	const init = {
		method: request.method,
		headers
	};
	if (request.body !== void 0 && request.body !== null) init.body = request.body;
	const response = await fetch(request.url, init);
	const responseHeaders = [];
	response.headers.forEach((value, name) => {
		responseHeaders.push([name, value]);
	});
	return {
		status: response.status,
		statusText: response.statusText,
		headers: responseHeaders,
		body: new Uint8Array(await response.arrayBuffer())
	};
}
function cereusdbSetFetchConcurrency(maxConcurrency) {
	const parsed = Number(maxConcurrency);
	if (Number.isFinite(parsed) && parsed >= 1) {
		cereusdbFetchMaxConcurrency = Math.min(Math.trunc(parsed), 256);
		cereusdbPumpFetchQueue();
	}
}
function cereusdbFetch(request) {
	return new Promise((resolve, reject) => {
		cereusdbFetchQueue.push({
			request,
			resolve,
			reject
		});
		cereusdbPumpFetchQueue();
	});
}
var cereusdbFetchMaxConcurrency, cereusdbFetchActive, cereusdbFetchQueue;
var init_inline0 = __esmMin((() => {
	cereusdbFetchMaxConcurrency = 16;
	cereusdbFetchActive = 0;
	cereusdbFetchQueue = [];
}));
//#endregion
//#region ../../node_modules/@cereusdb/global/dist/wasm/cereusdb-external.js
function __wbg_get_imports() {
	return {
		__proto__: null,
		"./cereusdb_bg.js": {
			__proto__: null,
			__wbg_Error_83742b46f01ce22d: function(arg0, arg1) {
				return Error(getStringFromWasm0(arg0, arg1));
			},
			__wbg_Number_a5a435bd7bbec835: function(arg0) {
				return Number(arg0);
			},
			__wbg_String_8564e559799eccda: function(arg0, arg1) {
				const ptr1 = passStringToWasm0(String(arg1), wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN;
				getDataViewMemory0().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_bigint_get_as_i64_447a76b5c6ef7bda: function(arg0, arg1) {
				const v = arg1;
				const ret = typeof v === "bigint" ? v : void 0;
				getDataViewMemory0().setBigInt64(arg0 + 8, isLikeNone(ret) ? BigInt(0) : ret, true);
				getDataViewMemory0().setInt32(arg0 + 0, !isLikeNone(ret), true);
			},
			__wbg___wbindgen_boolean_get_c0f3f60bac5a78d1: function(arg0) {
				const v = arg0;
				const ret = typeof v === "boolean" ? v : void 0;
				return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
			},
			__wbg___wbindgen_debug_string_5398f5bb970e0daa: function(arg0, arg1) {
				const ptr1 = passStringToWasm0(debugString(arg1), wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN;
				getDataViewMemory0().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_in_41dbb8413020e076: function(arg0, arg1) {
				return arg0 in arg1;
			},
			__wbg___wbindgen_is_bigint_e2141d4f045b7eda: function(arg0) {
				return typeof arg0 === "bigint";
			},
			__wbg___wbindgen_is_function_3c846841762788c1: function(arg0) {
				return typeof arg0 === "function";
			},
			__wbg___wbindgen_is_null_0b605fc6b167c56f: function(arg0) {
				return arg0 === null;
			},
			__wbg___wbindgen_is_object_781bc9f159099513: function(arg0) {
				const val = arg0;
				return typeof val === "object" && val !== null;
			},
			__wbg___wbindgen_is_string_7ef6b97b02428fae: function(arg0) {
				return typeof arg0 === "string";
			},
			__wbg___wbindgen_is_undefined_52709e72fb9f179c: function(arg0) {
				return arg0 === void 0;
			},
			__wbg___wbindgen_jsval_eq_ee31bfad3e536463: function(arg0, arg1) {
				return arg0 === arg1;
			},
			__wbg___wbindgen_jsval_loose_eq_5bcc3bed3c69e72b: function(arg0, arg1) {
				return arg0 == arg1;
			},
			__wbg___wbindgen_number_get_34bb9d9dcfa21373: function(arg0, arg1) {
				const obj = arg1;
				const ret = typeof obj === "number" ? obj : void 0;
				getDataViewMemory0().setFloat64(arg0 + 8, isLikeNone(ret) ? 0 : ret, true);
				getDataViewMemory0().setInt32(arg0 + 0, !isLikeNone(ret), true);
			},
			__wbg___wbindgen_string_get_395e606bd0ee4427: function(arg0, arg1) {
				const obj = arg1;
				const ret = typeof obj === "string" ? obj : void 0;
				var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
				var len1 = WASM_VECTOR_LEN;
				getDataViewMemory0().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg___wbindgen_throw_6ddd609b62940d55: function(arg0, arg1) {
				throw new WebAssembly.Exception(__wbindgen_wrapped_jstag, [new Error(getStringFromWasm0(arg0, arg1))]);
			},
			__wbg__wbg_cb_unref_6b5b6b8576d35cb1: function(arg0) {
				arg0._wbg_cb_unref();
			},
			__wbg_arrayBuffer_eb8e9ca620af2a19: function(arg0) {
				return arg0.arrayBuffer();
			},
			__wbg_call_2d781c1f4d5c0ef8: function(arg0, arg1, arg2) {
				return arg0.call(arg1, arg2);
			},
			__wbg_call_e133b57c9155d22c: function(arg0, arg1) {
				return arg0.call(arg1);
			},
			__wbg_cereusdbFetch_ef03c6e2e53e5d27: function(arg0) {
				return cereusdbFetch(arg0);
			},
			__wbg_cereusdbSetFetchConcurrency_5dba4b72020a565e: function(arg0) {
				cereusdbSetFetchConcurrency(arg0 >>> 0);
			},
			__wbg_done_08ce71ee07e3bd17: function(arg0) {
				return arg0.done;
			},
			__wbg_entries_e8a20ff8c9757101: function(arg0) {
				return Object.entries(arg0);
			},
			__wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
				let deferred0_0;
				let deferred0_1;
				try {
					deferred0_0 = arg0;
					deferred0_1 = arg1;
					console.error(getStringFromWasm0(arg0, arg1));
				} finally {
					__wbg_termination_guard();
					try {
						wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
					} catch (e) {
						__wbg_handle_catch(e);
					}
				}
			},
			__wbg_fetch_5550a88cf343aaa9: function(arg0, arg1) {
				return arg0.fetch(arg1);
			},
			__wbg_fetch_f8a611684c3b5fe5: function(arg0, arg1) {
				return arg0.fetch(arg1);
			},
			__wbg_getRandomValues_3f44b700395062e5: function(arg0, arg1) {
				globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
			},
			__wbg_getRandomValues_a1cf2e70b003a59d: function(arg0, arg1) {
				globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
			},
			__wbg_getTime_1dad7b5386ddd2d9: function(arg0) {
				return arg0.getTime();
			},
			__wbg_get_326e41e095fb2575: function(arg0, arg1) {
				return Reflect.get(arg0, arg1);
			},
			__wbg_get_a8ee5c45dabc1b3b: function(arg0, arg1) {
				return arg0[arg1 >>> 0];
			},
			__wbg_get_unchecked_329cfe50afab7352: function(arg0, arg1) {
				return arg0[arg1 >>> 0];
			},
			__wbg_get_with_ref_key_6412cf3094599694: function(arg0, arg1) {
				return arg0[arg1];
			},
			__wbg_instanceof_ArrayBuffer_101e2bf31071a9f6: function(arg0) {
				let result;
				try {
					result = arg0 instanceof ArrayBuffer;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Map_f194b366846aca0c: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Map;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Response_9b4d9fd451e051b1: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Response;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Uint8Array_740438561a5b956d: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Uint8Array;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_instanceof_Window_23e677d2c6843922: function(arg0) {
				let result;
				try {
					result = arg0 instanceof Window;
				} catch (_) {
					result = false;
				}
				return result;
			},
			__wbg_isArray_33b91feb269ff46e: function(arg0) {
				return Array.isArray(arg0);
			},
			__wbg_isSafeInteger_ecd6a7f9c3e053cd: function(arg0) {
				return Number.isSafeInteger(arg0);
			},
			__wbg_iterator_d8f549ec8fb061b1: function() {
				return Symbol.iterator;
			},
			__wbg_length_b3416cf66a5452c8: function(arg0) {
				return arg0.length;
			},
			__wbg_length_ea16607d7b61445b: function(arg0) {
				return arg0.length;
			},
			__wbg_log_524eedafa26daa59: function(arg0) {
				console.log(arg0);
			},
			__wbg_new_0_1dcafdf5e786e876: function() {
				return /* @__PURE__ */ new Date();
			},
			__wbg_new_227d7c05414eb861: function() {
				return /* @__PURE__ */ new Error();
			},
			__wbg_new_5f486cdf45a04d78: function(arg0) {
				return new Uint8Array(arg0);
			},
			__wbg_new_a70fbab9066b301f: function() {
				return new Array();
			},
			__wbg_new_ab79df5bd7c26067: function() {
				return /* @__PURE__ */ new Object();
			},
			__wbg_new_typed_aaaeaf29cf802876: function(arg0, arg1) {
				try {
					var state0 = {
						a: arg0,
						b: arg1
					};
					var cb0 = (arg0, arg1) => {
						const a = state0.a;
						state0.a = 0;
						try {
							return wasm_bindgen__convert__closures_____invoke__h3bcc27440de746c0(a, state0.b, arg0, arg1);
						} finally {
							state0.a = a;
						}
					};
					return new Promise(cb0);
				} finally {
					state0.a = state0.b = 0;
				}
			},
			__wbg_new_with_length_825018a1616e9e55: function(arg0) {
				return new Uint8Array(arg0 >>> 0);
			},
			__wbg_new_with_str_and_init_b4b54d1a819bc724: function(arg0, arg1, arg2) {
				return new Request(getStringFromWasm0(arg0, arg1), arg2);
			},
			__wbg_next_11b99ee6237339e3: function(arg0) {
				return arg0.next();
			},
			__wbg_next_e01a967809d1aa68: function(arg0) {
				return arg0.next;
			},
			__wbg_now_e7c6795a7f81e10f: function(arg0) {
				return arg0.now();
			},
			__wbg_ok_7ec8b94facac7704: function(arg0) {
				return arg0.ok;
			},
			__wbg_performance_3fcf6e32a7e1ed0a: function(arg0) {
				return arg0.performance;
			},
			__wbg_prototypesetcall_d62e5099504357e6: function(arg0, arg1, arg2) {
				Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
			},
			__wbg_queueMicrotask_0c399741342fb10f: function(arg0) {
				return arg0.queueMicrotask;
			},
			__wbg_queueMicrotask_a082d78ce798393e: function(arg0) {
				queueMicrotask(arg0);
			},
			__wbg_resolve_ae8d83246e5bcc12: function(arg0) {
				return Promise.resolve(arg0);
			},
			__wbg_set_282384002438957f: function(arg0, arg1, arg2) {
				arg0[arg1 >>> 0] = arg2;
			},
			__wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {
				arg0[arg1] = arg2;
			},
			__wbg_set_8c0b3ffcf05d61c2: function(arg0, arg1, arg2) {
				arg0.set(getArrayU8FromWasm0(arg1, arg2));
			},
			__wbg_set_method_8c015e8bcafd7be1: function(arg0, arg1, arg2) {
				arg0.method = getStringFromWasm0(arg1, arg2);
			},
			__wbg_set_mode_5a87f2c809cf37c2: function(arg0, arg1) {
				arg0.mode = __wbindgen_enum_RequestMode[arg1];
			},
			__wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
				const ret = arg1.stack;
				const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
				const len1 = WASM_VECTOR_LEN;
				getDataViewMemory0().setInt32(arg0 + 4, len1, true);
				getDataViewMemory0().setInt32(arg0 + 0, ptr1, true);
			},
			__wbg_static_accessor_GLOBAL_8adb955bd33fac2f: function() {
				const ret = typeof global === "undefined" ? null : global;
				return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
			},
			__wbg_static_accessor_GLOBAL_THIS_ad356e0db91c7913: function() {
				const ret = typeof globalThis === "undefined" ? null : globalThis;
				return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
			},
			__wbg_static_accessor_SELF_f207c857566db248: function() {
				const ret = typeof self === "undefined" ? null : self;
				return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
			},
			__wbg_static_accessor_WINDOW_bb9f1ba69d61b386: function() {
				const ret = typeof window === "undefined" ? null : window;
				return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
			},
			__wbg_status_318629ab93a22955: function(arg0) {
				return arg0.status;
			},
			__wbg_stringify_5ae93966a84901ac: function(arg0) {
				return JSON.stringify(arg0);
			},
			__wbg_then_098abe61755d12f6: function(arg0, arg1) {
				return arg0.then(arg1);
			},
			__wbg_then_9e335f6dd892bc11: function(arg0, arg1, arg2) {
				return arg0.then(arg1, arg2);
			},
			__wbg_value_21fc78aab0322612: function(arg0) {
				return arg0.value;
			},
			__wbindgen_cast_0000000000000001: function(arg0, arg1) {
				return makeMutClosure(arg0, arg1, wasm.wasm_bindgen__closure__destroy__hb290b944ae0b8b93, wasm_bindgen__convert__closures_____invoke__h7573a8a64f443504);
			},
			__wbindgen_cast_0000000000000002: function(arg0) {
				return arg0;
			},
			__wbindgen_cast_0000000000000003: function(arg0) {
				return arg0;
			},
			__wbindgen_cast_0000000000000004: function(arg0, arg1) {
				return getStringFromWasm0(arg0, arg1);
			},
			__wbindgen_cast_0000000000000005: function(arg0) {
				return BigInt.asUintN(64, arg0);
			},
			__wbindgen_init_externref_table: function() {
				const table = wasm.__wbindgen_externrefs;
				const offset = table.grow(4);
				table.set(0, void 0);
				table.set(offset + 0, void 0);
				table.set(offset + 1, null);
				table.set(offset + 2, true);
				table.set(offset + 3, false);
			},
			__wbindgen_jstag: WebAssembly.JSTag,
			__wbindgen_wrapped_jstag
		},
		"env": import1,
		"wasi_snapshot_preview1": import2,
		"env": import3,
		"env": import4,
		"env": import5,
		"wasi_snapshot_preview1": import6,
		"wasi_snapshot_preview1": import7,
		"env": import8,
		"env": import9,
		"env": import10,
		"wasi_snapshot_preview1": import11,
		"wasi_snapshot_preview1": import12,
		"wasi_snapshot_preview1": import13,
		"wasi_snapshot_preview1": import14,
		"wasi_snapshot_preview1": import15,
		"env": import16,
		"wasi_snapshot_preview1": import17,
		"env": import18,
		"env": import19,
		"env": import20,
		"env": import21,
		"env": import22,
		"env": import23,
		"env": import24,
		"env": import25,
		"env": import26,
		"env": import27,
		"env": import28,
		"env": import29,
		"env": import30,
		"env": import31,
		"env": import32,
		"env": import33,
		"env": import34,
		"env": import35,
		"env": import36,
		"env": import37,
		"env": import38,
		"env": import39,
		"env": import40,
		"env": import41,
		"env": import42,
		"env": import43,
		"env": import44,
		"env": import45,
		"env": import46,
		"env": import47,
		"env": import48,
		"env": import49,
		"wasi_snapshot_preview1": import50,
		"wasi_snapshot_preview1": import51,
		"env": import52,
		"env": import53,
		"env": import54,
		"env": import55,
		"env": import56,
		"wasi_snapshot_preview1": import57
	};
}
function __wbg_termination_guard() {
	__wbg_terminated_addr ??= wasm.__instance_terminated.value / 4;
	if (getInt32ArrayMemory0()[__wbg_terminated_addr]) throw new Error("Module terminated");
}
function __wbg_handle_catch(e) {
	if (e instanceof WebAssembly.Exception && e.is(__wbindgen_wrapped_jstag)) throw e.getArg(__wbindgen_wrapped_jstag, 0);
	getInt32ArrayMemory0()[__wbg_terminated_addr] = 1;
	throw e;
}
function wasm_bindgen__convert__closures_____invoke__h7573a8a64f443504(arg0, arg1, arg2) {
	let ret;
	__wbg_termination_guard();
	try {
		ret = wasm.wasm_bindgen__convert__closures_____invoke__h7573a8a64f443504(arg0, arg1, arg2);
	} catch (e) {
		__wbg_handle_catch(e);
	}
	if (ret[1]) throw takeFromExternrefTable0(ret[0]);
}
function wasm_bindgen__convert__closures_____invoke__h3bcc27440de746c0(arg0, arg1, arg2, arg3) {
	__wbg_termination_guard();
	try {
		wasm.wasm_bindgen__convert__closures_____invoke__h3bcc27440de746c0(arg0, arg1, arg2, arg3);
	} catch (e) {
		__wbg_handle_catch(e);
	}
}
function addToExternrefTable0(obj) {
	const idx = wasm.__externref_table_alloc();
	wasm.__wbindgen_externrefs.set(idx, obj);
	return idx;
}
function debugString(val) {
	const type = typeof val;
	if (type == "number" || type == "boolean" || val == null) return \`\${val}\`;
	if (type == "string") return \`"\${val}"\`;
	if (type == "symbol") {
		const description = val.description;
		if (description == null) return "Symbol";
		else return \`Symbol(\${description})\`;
	}
	if (type == "function") {
		const name = val.name;
		if (typeof name == "string" && name.length > 0) return \`Function(\${name})\`;
		else return "Function";
	}
	if (Array.isArray(val)) {
		const length = val.length;
		let debug = "[";
		if (length > 0) debug += debugString(val[0]);
		for (let i = 1; i < length; i++) debug += ", " + debugString(val[i]);
		debug += "]";
		return debug;
	}
	const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));
	let className;
	if (builtInMatches && builtInMatches.length > 1) className = builtInMatches[1];
	else return toString.call(val);
	if (className == "Object") try {
		return "Object(" + JSON.stringify(val) + ")";
	} catch (_) {
		return "Object";
	}
	if (val instanceof Error) return \`\${val.name}: \${val.message}\\n\${val.stack}\`;
	return className;
}
function getArrayU8FromWasm0(ptr, len) {
	ptr = ptr >>> 0;
	return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
function getDataViewMemory0() {
	if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
	return cachedDataViewMemory0;
}
function getInt32ArrayMemory0() {
	if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
	return cachedInt32ArrayMemory0;
}
function getStringFromWasm0(ptr, len) {
	ptr = ptr >>> 0;
	return decodeText(ptr, len);
}
function getUint8ArrayMemory0() {
	if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
	return cachedUint8ArrayMemory0;
}
function isLikeNone(x) {
	return x === void 0 || x === null;
}
function makeMutClosure(arg0, arg1, dtor, f) {
	const state = {
		a: arg0,
		b: arg1,
		cnt: 1,
		dtor
	};
	const real = (...args) => {
		state.cnt++;
		const a = state.a;
		state.a = 0;
		try {
			return f(a, state.b, ...args);
		} finally {
			state.a = a;
			real._wbg_cb_unref();
		}
	};
	real._wbg_cb_unref = () => {
		if (--state.cnt === 0) {
			state.dtor(state.a, state.b);
			state.a = 0;
			CLOSURE_DTORS.unregister(state);
		}
	};
	CLOSURE_DTORS.register(real, state, state);
	return real;
}
function passArray8ToWasm0(arg, malloc) {
	const ptr = malloc(arg.length * 1, 1) >>> 0;
	getUint8ArrayMemory0().set(arg, ptr / 1);
	WASM_VECTOR_LEN = arg.length;
	return ptr;
}
function passStringToWasm0(arg, malloc, realloc) {
	if (realloc === void 0) {
		const buf = cachedTextEncoder.encode(arg);
		const ptr = malloc(buf.length, 1) >>> 0;
		getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
		WASM_VECTOR_LEN = buf.length;
		return ptr;
	}
	let len = arg.length;
	let ptr = malloc(len, 1) >>> 0;
	const mem = getUint8ArrayMemory0();
	let offset = 0;
	for (; offset < len; offset++) {
		const code = arg.charCodeAt(offset);
		if (code > 127) break;
		mem[ptr + offset] = code;
	}
	if (offset !== len) {
		if (offset !== 0) arg = arg.slice(offset);
		ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
		const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
		const ret = cachedTextEncoder.encodeInto(arg, view);
		offset += ret.written;
		ptr = realloc(ptr, len, offset, 1) >>> 0;
	}
	WASM_VECTOR_LEN = offset;
	return ptr;
}
function takeFromExternrefTable0(idx) {
	const value = wasm.__wbindgen_externrefs.get(idx);
	wasm.__externref_table_dealloc(idx);
	return value;
}
function decodeText(ptr, len) {
	numBytesDecoded += len;
	if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
		cachedTextDecoder = new TextDecoder("utf-8", {
			ignoreBOM: true,
			fatal: true
		});
		cachedTextDecoder.decode();
		numBytesDecoded = len;
	}
	return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
function __wbg_finalize_init(instance, module) {
	wasm = instance.exports;
	cachedDataViewMemory0 = null;
	cachedInt32ArrayMemory0 = null;
	cachedUint8ArrayMemory0 = null;
	if (typeof wasm.__wasm_call_ctors === "function") wasm.__wasm_call_ctors();
	wasm.__wbindgen_start();
	return wasm;
}
async function __wbg_load(module, imports) {
	if (typeof Response === "function" && module instanceof Response) {
		if (typeof WebAssembly.instantiateStreaming === "function") try {
			return await WebAssembly.instantiateStreaming(module, imports);
		} catch (e) {
			if (module.ok && expectedResponseType(module.type) && module.headers.get("Content-Type") !== "application/wasm") console.warn("\`WebAssembly.instantiateStreaming\` failed because your server does not serve Wasm with \`application/wasm\` MIME type. Falling back to \`WebAssembly.instantiate\` which is slower. Original error:\\n", e);
			else throw e;
		}
		const bytes = await module.arrayBuffer();
		return await WebAssembly.instantiate(bytes, imports);
	} else {
		const instance = await WebAssembly.instantiate(module, imports);
		if (instance instanceof WebAssembly.Instance) return {
			instance,
			module
		};
		else return instance;
	}
	function expectedResponseType(type) {
		switch (type) {
			case "basic":
			case "cors":
			case "default": return true;
		}
		return false;
	}
}
async function __wbg_init(module_or_path) {
	if (wasm !== void 0) return wasm;
	if (module_or_path !== void 0) {
		if (Object.getPrototypeOf(module_or_path) === Object.prototype) ({module_or_path} = module_or_path);
		else console.warn("using deprecated parameters for the initialization function; pass a single object instead");
	}
	if (module_or_path === void 0) throw new Error("@cereusdb external entry requires CereusDB.create({ wasmUrl }) or CereusDB.create({ wasmSource })");
	const imports = __wbg_get_imports();
	if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) module_or_path = fetch(module_or_path);
	const { instance, module } = await __wbg_load(await module_or_path, imports);
	if (instance.exports && instance.exports.memory) setMemory(instance.exports.memory);
	return __wbg_finalize_init(instance, module);
}
var __env, __wasi, CereusDB$1, import1, import2, import3, import4, import5, import6, import7, import8, import9, import10, import11, import12, import13, import14, import15, import16, import17, import18, import19, import20, import21, import22, import23, import24, import25, import26, import27, import28, import29, import30, import31, import32, import33, import34, import35, import36, import37, import38, import39, import40, import41, import42, import43, import44, import45, import46, import47, import48, import49, import50, import51, import52, import53, import54, import55, import56, import57, __wbindgen_wrapped_jstag, __wbg_terminated_addr, __wbindgen_enum_RequestMode, CereusDBFinalization, CLOSURE_DTORS, cachedDataViewMemory0, cachedInt32ArrayMemory0, cachedUint8ArrayMemory0, cachedTextDecoder, MAX_SAFARI_DECODE_BYTES, numBytesDecoded, cachedTextEncoder, WASM_VECTOR_LEN, wasm;
var init_cereusdb_external = __esmMin((() => {
	init_env_shim();
	init_inline0();
	__env = createEnvImports();
	__wasi = createWasiImports();
	CereusDB$1 = class CereusDB$1 {
		static __wrap(ptr) {
			ptr = ptr >>> 0;
			const obj = Object.create(CereusDB$1.prototype);
			obj.__wbg_ptr = ptr;
			CereusDBFinalization.register(obj, obj.__wbg_ptr, obj);
			return obj;
		}
		__destroy_into_raw() {
			const ptr = this.__wbg_ptr;
			this.__wbg_ptr = 0;
			CereusDBFinalization.unregister(this);
			return ptr;
		}
		free() {
			const ptr = this.__destroy_into_raw();
			__wbg_termination_guard();
			try {
				wasm.__wbg_cereusdb_free(ptr, 0);
			} catch (e) {
				__wbg_handle_catch(e);
			}
		}
		/**
		* Create a new CereusDB instance.
		* Initializes DataFusion context and registers all spatial functions.
		* @returns {CereusDB}
		*/
		static create() {
			let ret;
			__wbg_termination_guard();
			try {
				ret = wasm.cereusdb_create();
			} catch (e) {
				__wbg_handle_catch(e);
			}
			if (ret[2]) throw takeFromExternrefTable0(ret[1]);
			return CereusDB$1.__wrap(ret[0]);
		}
		/**
		* Drop a registered table.
		* @param {string} table_name
		*/
		drop_table(table_name) {
			const ptr0 = passStringToWasm0(table_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			let ret;
			__wbg_termination_guard();
			try {
				ret = wasm.cereusdb_drop_table(this.__wbg_ptr, ptr0, len0);
			} catch (e) {
				__wbg_handle_catch(e);
			}
			if (ret[1]) throw takeFromExternrefTable0(ret[0]);
		}
		/**
		* Register a GeoJSON string as a named table.
		* @param {string} table_name
		* @param {string} geojson
		*/
		register_geojson(table_name, geojson) {
			const ptr0 = passStringToWasm0(table_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			const ptr1 = passStringToWasm0(geojson, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN;
			let ret;
			__wbg_termination_guard();
			try {
				ret = wasm.cereusdb_register_geojson(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch(e);
			}
			if (ret[1]) throw takeFromExternrefTable0(ret[0]);
		}
		/**
		* Register a GeoTIFF buffer as a single-column raster table.
		* Requires the full GDAL-enabled build.
		* @param {string} table_name
		* @param {Uint8Array} data
		*/
		register_geotiff_buffer(table_name, data) {
			const ptr0 = passStringToWasm0(table_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			const ptr1 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
			const len1 = WASM_VECTOR_LEN;
			let ret;
			__wbg_termination_guard();
			try {
				ret = wasm.cereusdb_register_geotiff_buffer(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch(e);
			}
			if (ret[1]) throw takeFromExternrefTable0(ret[0]);
		}
		/**
		* Register browser-backed object stores for ranged/listing reads.
		* @param {any} config
		*/
		register_object_stores(config) {
			let ret;
			__wbg_termination_guard();
			try {
				ret = wasm.cereusdb_register_object_stores(this.__wbg_ptr, config);
			} catch (e) {
				__wbg_handle_catch(e);
			}
			if (ret[1]) throw takeFromExternrefTable0(ret[0]);
		}
		/**
		* Register a Uint8Array containing Parquet data as a named table.
		* Use for files obtained via the browser File API.
		* @param {string} table_name
		* @param {Uint8Array} data
		* @returns {Promise<void>}
		*/
		register_parquet_buffer(table_name, data) {
			const ptr0 = passStringToWasm0(table_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			const ptr1 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
			const len1 = WASM_VECTOR_LEN;
			let ret;
			__wbg_termination_guard();
			try {
				ret = wasm.cereusdb_register_parquet_buffer(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch(e);
			}
			return ret;
		}
		/**
		* Register a remote Parquet object or prefix as a DataFusion listing table.
		* @param {string} table_name
		* @param {string} table_url
		* @param {any} options
		* @returns {Promise<void>}
		*/
		register_parquet_table(table_name, table_url, options) {
			const ptr0 = passStringToWasm0(table_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			const ptr1 = passStringToWasm0(table_url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN;
			let ret;
			__wbg_termination_guard();
			try {
				ret = wasm.cereusdb_register_parquet_table(this.__wbg_ptr, ptr0, len0, ptr1, len1, options);
			} catch (e) {
				__wbg_handle_catch(e);
			}
			return ret;
		}
		/**
		* Register a raster buffer as a single-column raster table.
		* Requires the full GDAL-enabled build.
		* @param {string} table_name
		* @param {string} format
		* @param {Uint8Array} data
		*/
		register_raster_buffer(table_name, format, data) {
			const ptr0 = passStringToWasm0(table_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			const ptr1 = passStringToWasm0(format, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN;
			const ptr2 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
			const len2 = WASM_VECTOR_LEN;
			let ret;
			__wbg_termination_guard();
			try {
				ret = wasm.cereusdb_register_raster_buffer(this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, len2);
			} catch (e) {
				__wbg_handle_catch(e);
			}
			if (ret[1]) throw takeFromExternrefTable0(ret[0]);
		}
		/**
		* Register a remote Parquet file URL as a named table.
		* Pre-fetches the entire file via HTTP, then loads into memory.
		* The server must support CORS.
		* @param {string} table_name
		* @param {string} url
		* @returns {Promise<void>}
		*/
		register_remote_parquet(table_name, url) {
			const ptr0 = passStringToWasm0(table_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			const ptr1 = passStringToWasm0(url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len1 = WASM_VECTOR_LEN;
			let ret;
			__wbg_termination_guard();
			try {
				ret = wasm.cereusdb_register_remote_parquet(this.__wbg_ptr, ptr0, len0, ptr1, len1);
			} catch (e) {
				__wbg_handle_catch(e);
			}
			return ret;
		}
		/**
		* Execute a SQL query.
		* Returns results as Arrow IPC bytes (Uint8Array).
		* The caller can decode this with the apache-arrow JS library.
		* @param {string} query
		* @returns {Promise<Uint8Array>}
		*/
		sql(query) {
			const ptr0 = passStringToWasm0(query, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			let ret;
			__wbg_termination_guard();
			try {
				ret = wasm.cereusdb_sql(this.__wbg_ptr, ptr0, len0);
			} catch (e) {
				__wbg_handle_catch(e);
			}
			return ret;
		}
		/**
		* Execute a SQL query and return results as a JSON string.
		* Convenience method for simple use cases.
		* @param {string} query
		* @returns {Promise<string>}
		*/
		sql_json(query) {
			const ptr0 = passStringToWasm0(query, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
			const len0 = WASM_VECTOR_LEN;
			let ret;
			__wbg_termination_guard();
			try {
				ret = wasm.cereusdb_sql_json(this.__wbg_ptr, ptr0, len0);
			} catch (e) {
				__wbg_handle_catch(e);
			}
			return ret;
		}
		/**
		* List all registered table names.
		* @returns {any}
		*/
		tables() {
			let ret;
			__wbg_termination_guard();
			try {
				ret = wasm.cereusdb_tables(this.__wbg_ptr);
			} catch (e) {
				__wbg_handle_catch(e);
			}
			if (ret[2]) throw takeFromExternrefTable0(ret[1]);
			return takeFromExternrefTable0(ret[0]);
		}
		/**
		* Get version information.
		*
		* Release builds set \`CEREUSDB_VERSION\` to the full npm version, including
		* prerelease suffixes; other builds fall back to the crate version.
		* @returns {string}
		*/
		version() {
			let deferred1_0;
			let deferred1_1;
			try {
				let ret;
				__wbg_termination_guard();
				try {
					ret = wasm.cereusdb_version(this.__wbg_ptr);
				} catch (e) {
					__wbg_handle_catch(e);
				}
				deferred1_0 = ret[0];
				deferred1_1 = ret[1];
				return getStringFromWasm0(ret[0], ret[1]);
			} finally {
				__wbg_termination_guard();
				try {
					wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
				} catch (e) {
					__wbg_handle_catch(e);
				}
			}
		}
	};
	if (Symbol.dispose) CereusDB$1.prototype[Symbol.dispose] = CereusDB$1.prototype.free;
	import1 = __env;
	import2 = __wasi;
	import3 = __env;
	import4 = __env;
	import5 = __env;
	import6 = __wasi;
	import7 = __wasi;
	import8 = __env;
	import9 = __env;
	import10 = __env;
	import11 = __wasi;
	import12 = __wasi;
	import13 = __wasi;
	import14 = __wasi;
	import15 = __wasi;
	import16 = __env;
	import17 = __wasi;
	import18 = __env;
	import19 = __env;
	import20 = __env;
	import21 = __env;
	import22 = __env;
	import23 = __env;
	import24 = __env;
	import25 = __env;
	import26 = __env;
	import27 = __env;
	import28 = __env;
	import29 = __env;
	import30 = __env;
	import31 = __env;
	import32 = __env;
	import33 = __env;
	import34 = __env;
	import35 = __env;
	import36 = __env;
	import37 = __env;
	import38 = __env;
	import39 = __env;
	import40 = __env;
	import41 = __env;
	import42 = __env;
	import43 = __env;
	import44 = __env;
	import45 = __env;
	import46 = __env;
	import47 = __env;
	import48 = __env;
	import49 = __env;
	import50 = __wasi;
	import51 = __wasi;
	import52 = __env;
	import53 = __env;
	import54 = __env;
	import55 = __env;
	import56 = __env;
	import57 = __wasi;
	__wbindgen_wrapped_jstag = new WebAssembly.Tag({ parameters: ["externref"] });
	__wbindgen_enum_RequestMode = [
		"same-origin",
		"no-cors",
		"cors",
		"navigate"
	];
	CereusDBFinalization = typeof FinalizationRegistry === "undefined" ? {
		register: () => {},
		unregister: () => {}
	} : new FinalizationRegistry((ptr) => wasm.__wbg_cereusdb_free(ptr >>> 0, 1));
	CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? {
		register: () => {},
		unregister: () => {}
	} : new FinalizationRegistry((state) => state.dtor(state.a, state.b));
	cachedDataViewMemory0 = null;
	cachedInt32ArrayMemory0 = null;
	cachedUint8ArrayMemory0 = null;
	cachedTextDecoder = new TextDecoder("utf-8", {
		ignoreBOM: true,
		fatal: true
	});
	cachedTextDecoder.decode();
	MAX_SAFARI_DECODE_BYTES = 2146435072;
	numBytesDecoded = 0;
	cachedTextEncoder = new TextEncoder();
	if (!("encodeInto" in cachedTextEncoder)) cachedTextEncoder.encodeInto = function(arg, view) {
		const buf = cachedTextEncoder.encode(arg);
		view.set(buf);
		return {
			read: arg.length,
			written: buf.length
		};
	};
	WASM_VECTOR_LEN = 0;
}));
//#endregion
//#region ../../node_modules/@cereusdb/global/dist/external.js
var external_exports = /* @__PURE__ */ __exportAll({ CereusDB: () => CereusDB });
function toUint8Array(data) {
	if (ArrayBuffer.isView(data)) return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
	return new Uint8Array(data);
}
function normalizeRasterFormat(format) {
	const normalized = format.trim().toLowerCase();
	if (normalized === "geotiff" || normalized === "tiff") return normalized;
	throw new Error(\`Unsupported raster format: \${format}\`);
}
var CereusDB;
var init_external = __esmMin((() => {
	init_cereusdb_external();
	CereusDB = class CereusDB {
		constructor(inner) {
			this.inner = inner;
		}
		/**
		* Create and initialize a new CereusDB instance.
		* This loads the WASM module and initializes the query engine.
		*/
		static async create(options) {
			const source = options?.wasmSource ?? options?.wasmUrl;
			if (source === void 0) await __wbg_init();
			else await __wbg_init({ module_or_path: source });
			const inner = CereusDB$1.create();
			const db = new CereusDB(inner);
			if (options?.objectStores !== void 0) db.registerObjectStores(options.objectStores);
			return db;
		}
		/**
		* Execute a SQL query and return results as Arrow IPC bytes.
		*/
		async sql(query) {
			return await this.inner.sql(query);
		}
		/**
		* Execute a SQL query and return results as JSON.
		*/
		async sqlJSON(query) {
			const json = await this.inner.sql_json(query);
			return JSON.parse(json);
		}
		/**
		* Register a remote Parquet file as a table.
		* The server must support CORS.
		*/
		async registerRemoteParquet(name, url) {
			await this.inner.register_remote_parquet(name, url);
		}
		/**
		* Register browser-backed object stores for ranged and listing reads.
		*/
		registerObjectStores(config) {
			this.objectStoreApi().register_object_stores(config);
		}
		/**
		* Register a remote Parquet object or prefix through DataFusion's listing table path.
		*/
		async registerParquetTable(name, url, options = {}) {
			await this.objectStoreApi().register_parquet_table(name, url, options);
		}
		/**
		* Register a local file (from File API / drag-and-drop) as a table.
		* Currently supports Parquet, GeoJSON, and GeoTIFF rasters.
		*/
		async registerFile(name, file) {
			const buffer = new Uint8Array(await file.arrayBuffer());
			const ext = file.name.split(".").pop()?.toLowerCase();
			if (ext === "parquet" || ext === "geoparquet") await this.inner.register_parquet_buffer(name, buffer);
			else if (ext === "geojson" || ext === "json") {
				const text = new TextDecoder().decode(buffer);
				this.inner.register_geojson(name, text);
			} else if (ext === "tif" || ext === "tiff") this.registerRaster(name, buffer, "geotiff");
			else throw new Error(\`Unsupported file format: .\${ext}\`);
		}
		/**
		* Register a GeoJSON object or string as a table.
		*/
		registerGeoJSON(name, geojson) {
			const str = typeof geojson === "string" ? geojson : JSON.stringify(geojson);
			this.inner.register_geojson(name, str);
		}
		/**
		* Register a raster buffer as a single-column raster table.
		* Requires the full GDAL-enabled package build.
		*/
		registerRaster(name, data, format) {
			this.inner.register_raster_buffer(name, normalizeRasterFormat(format), toUint8Array(data));
		}
		/**
		* Register a GeoTIFF buffer as a single-column raster table.
		* Requires the full GDAL-enabled package build.
		*/
		registerGeoTIFF(name, data) {
			this.registerRaster(name, data, "geotiff");
		}
		/** Drop a table. */
		dropTable(name) {
			this.inner.drop_table(name);
		}
		/** List registered tables. */
		tables() {
			return this.inner.tables();
		}
		/** Version string. */
		version() {
			return this.inner.version();
		}
		objectStoreApi() {
			const api = this.inner;
			if (typeof api.register_object_stores !== "function" || typeof api.register_parquet_table !== "function") throw new Error("Browser object stores are not available in this CereusDB build");
			return api;
		}
	};
}));
//#endregion
//#region src/cereusdb-worker.ts
const modules = {
	minimal: () => Promise.resolve().then(() => (init_external$3(), external_exports$3)),
	standard: () => Promise.resolve().then(() => (init_external$2(), external_exports$2)),
	full: () => Promise.resolve().then(() => (init_external$1(), external_exports$1)),
	global: () => Promise.resolve().then(() => (init_external(), external_exports))
};
async function createDb(variant, wasmUrl) {
	const load = modules[variant];
	if (!load) throw new Error(\`Unknown CereusDB variant: \${String(variant)}\`);
	const { CereusDB } = await load();
	return CereusDB.create({ wasmUrl });
}
let db = null;
const ensureDb = () => {
	if (!db) throw new Error("CereusDB worker is not initialized");
	return db;
};
self.onmessage = async (e) => {
	const { id, type, sql, wasmUrl, variant } = e.data;
	try {
		if (type === "init") {
			if (!wasmUrl || !variant) throw new Error("CereusDB worker init requires variant and wasmUrl");
			db = await createDb(variant, wasmUrl);
			self.postMessage({
				id,
				ok: true
			});
			return;
		}
		if (type === "sql" && typeof sql === "string") {
			const rows = await ensureDb().sqlJSON(sql);
			self.postMessage({
				id,
				ok: true,
				rows
			});
			return;
		}
		if (type === "version") {
			const version = ensureDb().version();
			self.postMessage({
				id,
				ok: true,
				version
			});
			return;
		}
		throw new Error(\`Unknown CereusDB worker message: \${String(type)}\`);
	} catch (err) {
		self.postMessage({
			id,
			ok: false,
			error: err instanceof Error ? err.message : String(err)
		});
	}
};
//#endregion

//# sourceMappingURL=cereusdb-worker-DPEI3-7E.js.map`,t=typeof self<`u`&&self.Blob&&new Blob([`URL.revokeObjectURL(import.meta.url);`,e],{type:`text/javascript;charset=utf-8`});function n(n){let r;try{if(r=t&&(self.URL||self.webkitURL).createObjectURL(t),!r)throw``;let e=new Worker(r,{type:`module`,name:n?.name});return e.addEventListener(`error`,()=>{(self.URL||self.webkitURL).revokeObjectURL(r)}),e}catch{return new Worker(`data:text/javascript;charset=utf-8,`+encodeURIComponent(e),{type:`module`,name:n?.name})}}export{n as default};