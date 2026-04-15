import { LogLevel, LoggerOptions } from "./types";
export declare class Logger {
    private readonly minLevel;
    private readonly context?;
    private readonly transports;
    constructor(options?: LoggerOptions);
    log(level: LogLevel, message: unknown): void;
    verbose(message: unknown): void;
    info(message: unknown): void;
    warning(message: unknown): void;
    error(message: unknown): void;
    private shouldWrite;
}
