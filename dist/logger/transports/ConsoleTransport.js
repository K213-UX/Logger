"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleTransport = void 0;
const format_1 = require("../format");
class ConsoleTransport {
    write(record) {
        const line = (0, format_1.toLogLine)(record);
        if (record.level === "error") {
            console.error(line);
            return;
        }
        if (record.level === "warning") {
            console.warn(line);
            return;
        }
        console.log(line);
    }
}
exports.ConsoleTransport = ConsoleTransport;
