import { toLogLine } from "../format";
import { LogRecord, LogTransport } from "../types";

export class ConsoleTransport implements LogTransport {
  write(record: LogRecord): void {
    const line = toLogLine(record);

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

