import { Injectable } from '@angular/core';

type StorageType = 'local' | 'session';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private getStorage(type: StorageType): Storage {
    return type === 'local' ? localStorage : sessionStorage;
  }

  setData(key: string, data: any, type: StorageType = 'session'): void {
    const storage = this.getStorage(type);
    storage.setItem(key, JSON.stringify(data));
  }

  getData<T>(key: string, type: StorageType = 'session'): T | null {
    const storage = this.getStorage(type);
    const rawData = storage.getItem(key);

    if (!rawData) {
      return null;
    }

    try {
      return JSON.parse(rawData) as T;
    } catch {
      return null;
    }
  }

  flush(key: string, type: StorageType = 'session'): void {
    const storage = this.getStorage(type);
    storage.removeItem(key);
  }

  flushAll(type: StorageType = 'session'): void {
    const storage = this.getStorage(type);
    storage.clear();
  }
}
