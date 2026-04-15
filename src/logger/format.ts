import { LogRecord } from "./types";

export function toLogLine(record: LogRecord): string {
  const ts = record.timestamp.toISOString();
  const level = record.level.toUpperCase();
  const context = record.context ? ` [${record.context}]` : "";
  return `[${ts}] [${level}]${context} ${record.message}`;
}

export function normalizeMessage(input: unknown): string {
  if (typeof input === "string") {
    return input;
  }

  try {
    return JSON.stringify(input);
  } catch {
    return String(input);
  }
}

