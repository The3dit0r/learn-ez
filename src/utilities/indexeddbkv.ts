export class IndexedDBKeyValue<T> {
  private dbName: string;
  private storeName: string;
  private version: number;
  private db: IDBDatabase | null;

  constructor(
    dbName: string = "keyValueStore",
    storeName: string = "keyValuePairs",
    version: number = 1
  ) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.version = version;
    this.db = null;
  }

  // Initialize the database
  async init(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request: IDBOpenDBRequest = indexedDB.open(
        this.dbName,
        this.version
      );

      request.onerror = (event: Event) => {
        reject(
          `Error opening database: ${(event.target as IDBOpenDBRequest).error}`
        );
      };

      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

        // Create an object store if it doesn't exist
        if (!db.objectStoreNames.contains(this.storeName)) {
          db.createObjectStore(this.storeName);
        }
      };
    });
  }

  // Set a key-value pair
  async set(key: string, value: T): Promise<boolean> {
    if (!this.db) await this.init();

    return new Promise<boolean>((resolve, reject) => {
      const transaction: IDBTransaction = this.db!.transaction(
        [this.storeName],
        "readwrite"
      );
      const store: IDBObjectStore = transaction.objectStore(this.storeName);

      const request: IDBRequest = store.put(value, key);

      request.onsuccess = () => resolve(true);
      request.onerror = (event: Event) => {
        reject(`Error storing data: ${(event.target as IDBRequest).error}`);
      };

      transaction.oncomplete = () => resolve(true);
      transaction.onerror = (/* event: Event */) => {
        reject(`Transaction error: ${transaction.error}`);
      };
    });
  }

  // Get a value by key
  async get(key: string): Promise<T | null> {
    if (!this.db) await this.init();

    return new Promise<T | null>((resolve, reject) => {
      const transaction: IDBTransaction = this.db!.transaction(
        [this.storeName],
        "readonly"
      );
      const store: IDBObjectStore = transaction.objectStore(this.storeName);

      const request: IDBRequest = store.get(key);

      request.onsuccess = (event: Event) => {
        const result = (event.target as IDBRequest).result;
        resolve(result === undefined ? null : (result as T));
      };

      request.onerror = (event: Event) => {
        reject(`Error retrieving data: ${(event.target as IDBRequest).error}`);
      };
    });
  }

  // Delete a key-value pair
  async delete(key: string): Promise<boolean> {
    if (!this.db) await this.init();

    return new Promise<boolean>((resolve, reject) => {
      const transaction: IDBTransaction = this.db!.transaction(
        [this.storeName],
        "readwrite"
      );
      const store: IDBObjectStore = transaction.objectStore(this.storeName);

      const request: IDBRequest = store.delete(key);

      request.onsuccess = () => resolve(true);
      request.onerror = (event: Event) => {
        reject(`Error deleting data: ${(event.target as IDBRequest).error}`);
      };
    });
  }

  // Check if a key exists
  async has(key: string): Promise<boolean> {
    const value = await this.get(key);
    return value !== null;
  }

  // Get all keys
  async keys(): Promise<string[]> {
    if (!this.db) await this.init();

    return new Promise<string[]>((resolve, reject) => {
      const transaction: IDBTransaction = this.db!.transaction(
        [this.storeName],
        "readonly"
      );
      const store: IDBObjectStore = transaction.objectStore(this.storeName);
      const request: IDBRequest = store.getAllKeys();

      request.onsuccess = (event: Event) => {
        resolve((event.target as IDBRequest).result as string[]);
      };

      request.onerror = (event: Event) => {
        reject(`Error getting keys: ${(event.target as IDBRequest).error}`);
      };
    });
  }

  // Get all values
  async values<T>(): Promise<T[]> {
    if (!this.db) await this.init();

    return new Promise<T[]>((resolve, reject) => {
      const transaction: IDBTransaction = this.db!.transaction(
        [this.storeName],
        "readonly"
      );
      const store: IDBObjectStore = transaction.objectStore(this.storeName);
      const request: IDBRequest = store.getAll();

      request.onsuccess = (event: Event) => {
        resolve((event.target as IDBRequest).result as T[]);
      };

      request.onerror = (event: Event) => {
        reject(`Error getting values: ${(event.target as IDBRequest).error}`);
      };
    });
  }

  // Get all entries as an array of [key, value] pairs
  async entries(): Promise<[string, T][]> {
    if (!this.db) await this.init();

    return new Promise<[string, T][]>((resolve, reject) => {
      const transaction: IDBTransaction = this.db!.transaction(
        [this.storeName],
        "readonly"
      );
      const store: IDBObjectStore = transaction.objectStore(this.storeName);
      const keysRequest: IDBRequest = store.getAllKeys();
      const valuesRequest: IDBRequest = store.getAll();

      let keyList: string[], valueList: T[];

      keysRequest.onsuccess = (event: Event) => {
        keyList = (event.target as IDBRequest).result as string[];
        if (valueList) {
          const entries: [string, T][] = keyList.map((key, index) => [
            key,
            valueList[index],
          ]);
          resolve(entries);
        }
      };

      valuesRequest.onsuccess = (event: Event) => {
        valueList = (event.target as IDBRequest).result as T[];
        if (keyList) {
          const entries: [string, T][] = keyList.map((key, index) => [
            key,
            valueList[index],
          ]);
          resolve(entries);
        }
      };

      transaction.onerror = (/* event: Event */) => {
        reject(`Error getting entries: ${transaction.error}`);
      };
    });
  }

  // Clear all key-value pairs
  async clear(): Promise<boolean> {
    if (!this.db) await this.init();

    return new Promise<boolean>((resolve, reject) => {
      const transaction: IDBTransaction = this.db!.transaction(
        [this.storeName],
        "readwrite"
      );
      const store: IDBObjectStore = transaction.objectStore(this.storeName);
      const request: IDBRequest = store.clear();

      request.onsuccess = () => resolve(true);
      request.onerror = (event: Event) => {
        reject(`Error clearing store: ${(event.target as IDBRequest).error}`);
      };
    });
  }

  // Close the database connection
  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}
