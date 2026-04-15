import { normalizeMessage } from "./format";
import { ConsoleTransport } from "./transports/ConsoleTransport";
import { LogLevel, LoggerOptions, LogRecord, LogTransport } from "./types";

const LEVEL_WEIGHT: Record<LogLevel, number> = {
  verbose: 10,
  info: 20,
  warning: 30,
  error: 40,
};

export class Logger {
  private readonly minLevel: LogLevel;
  private readonly context?: string;
  private readonly transports: LogTransport[];

  constructor(options: LoggerOptions = {}) {
    this.minLevel = options.minLevel ?? "verbose";
    this.context = options.context;
    this.transports = options.transports?.length
      ? options.transports
      : [new ConsoleTransport()];
  }

  log(level: LogLevel, message: unknown): void {
    if (!this.shouldWrite(level)) {
      return;
    }

    const record: LogRecord = {
      level,
      message: normalizeMessage(message),
      timestamp: new Date(),
      context: this.context,
    };

    this.transports.forEach((transport) => {
      transport.write(record);
    });
  }

  verbose(message: unknown): void {
    this.log("verbose", message);
  }

  info(message: unknown): void {
    this.log("info", message);
  }

  warning(message: unknown): void {
    this.log("warning", message);
  }

  error(message: unknown): void {
    this.log("error", message);
  }

  private shouldWrite(level: LogLevel): boolean {
    return LEVEL_WEIGHT[level] >= LEVEL_WEIGHT[this.minLevel];
  }
}

