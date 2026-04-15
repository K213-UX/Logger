import { LogRecord, LogTransport } from "../types";
export declare class ConsoleTransport implements LogTransport {
    write(record: LogRecord): void;
}
