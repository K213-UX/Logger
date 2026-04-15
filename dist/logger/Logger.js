"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const format_1 = require("./format");
const ConsoleTransport_1 = require("./transports/ConsoleTransport");
const LEVEL_WEIGHT = {
    verbose: 10,
    info: 20,
    warning: 30,
    error: 40,
};
class Logger {
    constructor(options = {}) {
        this.minLevel = options.minLevel ?? "verbose";
        this.context = options.context;
        this.transports = options.transports?.length
            ? options.transports
            : [new ConsoleTransport_1.ConsoleTransport()];
    }
    log(level, message) {
        if (!this.shouldWrite(level)) {
            return;
        }
        const record = {
            level,
            message: (0, format_1.normalizeMessage)(message),
            timestamp: new Date(),
            context: this.context,
        };
        this.transports.forEach((transport) => {
            transport.write(record);
        });
    }
    verbose(message) {
        this.log("verbose", message);
    }
    info(message) {
        this.log("info", message);
    }
    warning(message) {
        this.log("warning", message);
    }
    error(message) {
        this.log("error", message);
    }
    shouldWrite(level) {
        return LEVEL_WEIGHT[level] >= LEVEL_WEIGHT[this.minLevel];
    }
}
exports.Logger = Logger;
