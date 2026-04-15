"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeFileWriteSync = NativeFileWriteSync;
function NativeFileWriteSync(filePath, buffer) {
    console.log(`[File IO ${filePath}] ${buffer}`);
}
