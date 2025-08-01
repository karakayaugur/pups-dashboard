import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly router = inject(Router);
  private readonly storageService = inject(StorageService);

  private readonly _isAuthorized = signal<boolean>(false);
  readonly isAuthorized = this._isAuthorized.asReadonly();

  constructor() {
    this.updateAuthorization();
  }

  private updateAuthorization(): void {
    const user = this.getStoredUser();
    this._isAuthorized.set(!!user);
  }

  private getStoredUser(): any | null {
    const rawUser = this.storageService.getData('user');
    return rawUser ? JSON.parse(rawUser as string) : null;
  }

  flush(): void {
    this._isAuthorized.set(false);
    this.storageService.flush('user');
  }

  flushAndRedirect(): void {
    this.flush();
    this.router.navigate(['/']);
  }

  set auth(data: any) {
    const roles = Array.isArray(data.roles) ? data.roles : [];
    if (!roles.includes('APP_ACCESS')) {
      roles.push('APP_ACCESS');
    }
    this.storageService.setData('user', JSON.stringify({ ...data, roles }));
    this.updateAuthorization();
  }

  get auth(): any | null {
    return this.getStoredUser();
  }
}
