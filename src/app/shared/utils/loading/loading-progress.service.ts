import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingProgressService {
  isLoading = signal(false);

  constructor() {}
}
