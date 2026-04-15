import { LogRecord, LogTransport } from "../types";
export declare class FileTransport implements LogTransport {
    private readonly filePath;
    constructor(filePath: string);
    write(record: LogRecord): void;
}
