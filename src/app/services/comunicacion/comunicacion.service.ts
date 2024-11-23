import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  private loginEventSource = new Subject<void>();
  loginEvent$ = this.loginEventSource.asObservable();

  emitirLogin() {
    this.loginEventSource.next();
  }
}