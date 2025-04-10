/**
 * Converts file size in bytes to a human-readable string in MB or KB.
 * Returns MB with 2 decimal places if size ≥ 0.1MB, otherwise KB with 1 decimal place.
 * @param bytes - The file size in bytes
 * @returns A formatted string representation of the file size
 */
export function formatFileSize(bytes: number): string {
  const KB = 1024;
  const MB = KB * 1024;

  if (bytes >= 0.1 * MB) {
    const sizeInMB = bytes / MB;
    return `${sizeInMB.toFixed(2)}MB`;
  } else {
    const sizeInKB = bytes / KB;
    return `${Math.max(0.1, sizeInKB).toFixed(1)}KB`;
  }
}
