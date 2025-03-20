import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8080/api/comments';

  constructor(private http: HttpClient) {}

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/all`);
  }

  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/${id}`).pipe(
      map(comment => {
        if (!comment) throw new Error('Comment not found');
        return comment;
      }),
      catchError(this.handleError)
    );
  }

  createComment(comment: Comment): Observable<Comment> {
    const commentWithCreatedAt = { ...comment, createdAt: comment.createdAt || new Date() };

    const token = localStorage.getItem('token');
    if (token) {
      return this.http.post<Comment>(this.apiUrl, commentWithCreatedAt, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).pipe(catchError(this.handleError));
    } else {
      throw new Error('No token found');
    }
  }

  updateComment(comment: Comment): Observable<Comment> {
    if (comment.id === undefined) {
      throw new Error('Comment ID is undefined');
    }
    return this.http.put<Comment>(`${this.apiUrl}/${comment.id}`, comment).pipe(
      catchError(this.handleError)
    );
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status}, message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
