import { base64ToBlob, hashStrings } from "./converter";
import { IndexedDBKeyValue } from "./indexeddbkv";

const $FID = "$FILE_"; // File identifier prefix

const LOCAL_STORAGE = new IndexedDBKeyValue<string>("learnZ", "myStore");

LOCAL_STORAGE.init();

type FileMetadata = {
  name: string;
  type: string;
  byteSize: number;
  lastModified: string;
  uploadedDate: string;
  hash: string;
};

/**
 * Get file's hash
 * @param n File name
 * @returns File hash
 */
export const getFileHash = (n: string) =>
  $FID + hashStrings(n, "", 32 - $FID.length);

/**
 * Saves a File object to localStorage
 * @param file The File object to save
 * @returns The original File object
 */
export function saveFileToLocalStorage(file: File): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const lastModified = new Date(file.lastModified).toISOString();
      const uploadedDate = new Date().toISOString();
      const HASHED = getFileHash(file.name);

      try {
        const fileData = {
          name: file.name,
          type: file.type,
          byteSize: file.size,
          hash: HASHED,

          lastModified,
          uploadedDate,

          content: event.target?.result,
        };

        LOCAL_STORAGE.set(HASHED, JSON.stringify(fileData));
        resolve(file);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Loads a File object from localStorage
 * @param name The name of the file to load
 * @returns A File object if found, null otherwise
 */
export async function loadFileFromLocalStorage(
  hash: string
): Promise<File | null> {
  // const hash = getFileHash(name);
  const fileData = await LOCAL_STORAGE.get(hash);

  if (!fileData) {
    return null;
  }

  try {
    const parsedData = JSON.parse(fileData);

    // Convert the data URL to a Blob
    const contentParts = parsedData.content.split(",");
    const contentType = contentParts[0].split(":")[1].split(";")[0];
    const contentBase64 = contentParts[1];
    const contentBlob = base64ToBlob(contentBase64, contentType);

    // Create a new File from the Blob
    return new File([contentBlob], parsedData.name, {
      type: parsedData.type,
      lastModified: parsedData.lastModified,
    });
  } catch (error) {
    console.error("Error loading file from localStorage:", error);
    return null;
  }
}

/**
 * Checks if a file exists in localStorage
 * @param name The name of the file to check
 * @returns True if the file exists, false otherwise
 */
export async function fileExistInLocalStorage(name: string) {
  const hash = getFileHash(name);
  return await LOCAL_STORAGE.has(hash);
}

/**
 * Remove a file in local storage
 * @param name The name of the file to check
 * @returns True if the file is removed, false otherwise
 */
export function removeFileFromLocalStorage(hash: string) {
  return LOCAL_STORAGE.delete(hash);
}

/**
 * Retrieves all files saved in localStorage with the 'file_' prefix
 * @returns An array of file objects with their names and metadata
 */
export async function getAllSavedFiles(): Promise<FileMetadata[]> {
  const savedFiles = [];
  const entries = await LOCAL_STORAGE.entries();

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];

    if (key && key.startsWith($FID)) {
      try {
        const fileData = JSON.parse(value || "");
        const fileName = fileData.name;

        savedFiles.push({
          name: fileName,
          type: fileData.type,
          byteSize: fileData.byteSize,
          lastModified: fileData.lastModified,
          uploadedDate: fileData.uploadedDate,
          hash: key,
        });
      } catch (error) {
        console.error(`Error parsing data for key ${key}:`, error);
      }
    }
  }

  return savedFiles;
}

/**
 * Verify file's hash integrity
 * @returns If the hash matched with expected value
 */
export function verifyFileHash(name: string, expected: string) {
  const output = getFileHash(name);
  return expected === output;
}

export type { FileMetadata };
