import { toLogLine } from "../format";
import { NativeFileWriteSync } from "../native-file";
import { LogRecord, LogTransport } from "../types";

export class FileTransport implements LogTransport {
  constructor(private readonly filePath: string) {}

  write(record: LogRecord): void {
    const line = `${toLogLine(record)}\n`;
    NativeFileWriteSync(this.filePath, line);
  }
}

