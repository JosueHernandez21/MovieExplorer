import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  private readonly key = 'my-secret-key-123'; // En producción usa una clave más segura

  encrypt(text: string): string {
    // Encriptación simétrica simple (no usar en producción real)
    let result = '';
    for (let i = 0; i < text.length; i++) {
      const charCode =
        text.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length);
      result += String.fromCharCode(charCode);
    }
    return btoa(result);
  }

  decrypt(encryptedText: string): string {
    // Descifrado
    const decoded = atob(encryptedText);
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      const charCode =
        decoded.charCodeAt(i) ^ this.key.charCodeAt(i % this.key.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  }
}
