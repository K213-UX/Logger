export function NativeFileWriteSync(filePath: string, buffer: string): void {
  console.log(`[File IO ${filePath}] ${buffer}`);
}

