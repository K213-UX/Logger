"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLogLine = toLogLine;
exports.normalizeMessage = normalizeMessage;
function toLogLine(record) {
    const ts = record.timestamp.toISOString();
    const level = record.level.toUpperCase();
    const context = record.context ? ` [${record.context}]` : "";
    return `[${ts}] [${level}]${context} ${record.message}`;
}
function normalizeMessage(input) {
    if (typeof input === "string") {
        return input;
    }
    try {
        return JSON.stringify(input);
    }
    catch {
        return String(input);
    }
}
