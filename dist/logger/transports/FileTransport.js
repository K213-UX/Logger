"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTransport = void 0;
const format_1 = require("../format");
const native_file_1 = require("../native-file");
class FileTransport {
    constructor(filePath) {
        this.filePath = filePath;
    }
    write(record) {
        const line = `${(0, format_1.toLogLine)(record)}\n`;
        (0, native_file_1.NativeFileWriteSync)(this.filePath, line);
    }
}
exports.FileTransport = FileTransport;
