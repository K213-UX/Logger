export type LogLevel = "verbose" | "info" | "warning" | "error";
export interface LogRecord {
    level: LogLevel;
    message: string;
    timestamp: Date;
    context?: string;
}
export interface LogTransport {
    write(record: LogRecord): void;
}
export interface LoggerOptions {
    minLevel?: LogLevel;
    context?: string;
    transports?: LogTransport[];
}
