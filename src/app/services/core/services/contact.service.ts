// src/app/services/core/services/contact.service.ts
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root', // Service is available app-wide
})
export class ContactService {
  // 🔹 Define your backend endpoint for sending emails
  private apiUrl = 'https://kc6ji3w74i.execute-api.us-east-1.amazonaws.com/api/contact';

  constructor(private http: HttpClient) {}

  /**
   * Sends contact form data to the backend endpoint.
   * @param formData Object containing name, email, and message.
   * @returns Observable with backend response or error.
   */
  sendContactForm(formData: { name: string; email: string; message: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post<any>(this.apiUrl, formData, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Handles HTTP errors from the backend or network.
   * Returns a user-friendly message wrapped in an Observable.
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network issue
      console.error('❌ Client-side error:', error.error.message);
      return throwError(() => ({
        error: 'A network error occurred. Please try again.',
      }));
    } else {
      // Backend returned an unsuccessful response code
      console.error(`❌ Server error (status: ${error.status}):`, error.error || error.message);
      return throwError(() => ({
        error:
          error.error?.error ||
          'Something went wrong while sending your message. Please try again later.',
      }));
    }
  }
}
