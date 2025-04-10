/**
 * Converts file size in bytes to a human-readable string in MB or KB.
 * Returns MB with 2 decimal places if size ≥ 0.1MB, otherwise KB with 1 decimal place.
 * @param bytes - The file size in bytes
 * @returns A formatted string representation of the file size
 */
export function formatFileSize(bytes: number): string {
  const KB = 1024;
  const MB = KB * 1024;

  if (bytes >= 0.9 * MB) {
    const sizeInMB = bytes / MB;
    return `${sizeInMB.toFixed(2)} MB`;
  } else {
    const sizeInKB = bytes / KB;
    return `${Math.max(0.1, sizeInKB).toFixed(1)} KB`;
  }
}

/**
 * Truncates a string and adds ellipsis if it exceeds the maximum length
 * @param str The input string to process
 * @param maxLength The maximum allowed length before truncation
 * @returns The original string if within max length, otherwise truncated with ellipsis
 */
export function ellipsisString(str: string, maxLength: number): string {
  if (str.length <= maxLength) {
    return str;
  }

  return str.slice(0, maxLength - 9) + " ..." + str.slice(-12);
}

/**
 * Creates a hash from two strings combined
 * @param str1 First string to hash
 * @param str2 Second string to hash
 * @param hashLength Length of the output hash (default: 20)
 * @returns A string hash of specified length
 */
export function hashStrings(
  str1: string,
  str2: string,
  hashLength = 20
): string {
  const combinedString = `${str1}:${str2}`;

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < combinedString.length; i++) {
    const char = combinedString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  let hexHash = Math.abs(hash).toString(16);

  // Add entropy if hash is too short
  while (hexHash.length < hashLength) {
    const entropy = (
      str1.charCodeAt(hexHash.length % str1.length) ^
      str2.charCodeAt(hexHash.length % str2.length) ^
      hexHash.charCodeAt(hexHash.length % hexHash.length)
    ).toString(16);
    hexHash += entropy;
  }

  return hexHash.substring(0, hashLength);
}

/**
 * Convert base64 to Blob
 * @param base64 The base64 string
 * @param contentType The content type of the file
 * @returns A Blob object
 */
export function base64ToBlob(base64: string, contentType: string): Blob {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

/**
 * Formats an ISO date string to DD/MM/YYYY, HH:MM format
 * @param isoDateString The ISO date string to format
 * @returns Formatted date string in DD/MM/YYYY, HH:MM format
 */
export function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string provided");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} @${hours}:${minutes}`;
}
