import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ViolatorService {
  private apiUrl = 'http://localhost:3000/violator'; // Local backend URL

  constructor(private http: HttpClient) {}

  getViolator(id: string): Observable<{ message: string; data: Violator }> {
    return this.http
      .get<{ message: string; data: Violator }>(`${this.apiUrl}/get/${id}`)
      .pipe(
        catchError(this.handleError) // Catch any HTTP error and pass it to the handler
      );
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!'; // Default error message

    if (error.error instanceof ErrorEvent) {
      // If it's a client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // If it's a backend error
      errorMessage = `Backend error: ${error.status} ${error.message}`;
    }

    return throwError(errorMessage); // Return an observable with the error message
  }

  addViolator(violator: any): Observable<{ message: string; data: Violator }> {
    return this.http.post<{ message: string; data: Violator }>(
      `${this.apiUrl}/add`,
      violator
    ).pipe(
      tap(response => {
        console.log(response.message);  // Log the message from the response
        console.log(response.data);     // Log the Violator data from the response
      })
    );
  }



  getAllViolators(): Observable<{message:string, data: Violator[]}> {
    return this.http.get<{message:string, data: Violator[]}> (
      `${this.apiUrl}/get-all`
    );
  }
}

// Define the Violator interface within the service
export interface Violator {
  violatorID: string;
  firstName: string;
  lastName: string;
  DoB: Date;
  email: string;
  contactNumber: string;
  address: {
    street: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
  };
}
