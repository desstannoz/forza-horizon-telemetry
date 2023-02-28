"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ForzaServer_listeners;
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = require("dgram");
const parse_1 = require("./parse");
class ForzaServer {
    constructor(port) {
        _ForzaServer_listeners.set(this, {
            listening: [],
            error: [],
            message: [],
            data: [],
            connect: [],
            close: []
        });
        this.port = port;
        this.server = (0, dgram_1.createSocket)('udp6');
        this.server.on('listening', (...args) => {
            __classPrivateFieldGet(this, _ForzaServer_listeners, "f")['listening'].forEach(f => f(...args));
        });
        this.server.on('error', (...args) => {
            __classPrivateFieldGet(this, _ForzaServer_listeners, "f")['error'].forEach(f => f(...args));
        });
        this.server.on('message', (...args) => {
            let data = (0, parse_1.default)(args[0].toJSON().data);
            __classPrivateFieldGet(this, _ForzaServer_listeners, "f")['data'].forEach(f => f(data));
            __classPrivateFieldGet(this, _ForzaServer_listeners, "f")['message'].forEach(f => f(...args));
        });
        this.server.on('connect', (...args) => {
            __classPrivateFieldGet(this, _ForzaServer_listeners, "f")['connect'].forEach(f => f(...args));
        });
        this.server.on('close', (...args) => {
            __classPrivateFieldGet(this, _ForzaServer_listeners, "f")['close'].forEach(f => f(...args));
        });
    }
    bind(...args) {
        this.server.bind(this.port, ...args);
    }
    close(onClosed = () => { }) {
        this.server.close(onClosed);
    }
    on(event, onEvent) {
        __classPrivateFieldGet(this, _ForzaServer_listeners, "f")[event].push(onEvent);
    }
}
exports.default = ForzaServer;
_ForzaServer_listeners = new WeakMap();
