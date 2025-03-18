import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
      return this.http.get<Post[]>(`${this.apiUrl}/all`);
  
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`).pipe(
      map(post => {
        if (!post) throw new Error('Post not found');
        return post;
      }),
      catchError(this.handleError)
    );
  }

  createPost(post: Post): Observable<Post> {

    const postWithCreatedAt = { ...post, createdAt: post.createdAt || new Date() };

    const token = localStorage.getItem('token');
    if (token) {
      return this.http.post<Post>(this.apiUrl, post, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).pipe(catchError(this.handleError));
    } else {
      throw new Error('No token found');
    }
  }

  updatePost(post: Post): Observable<Post> {
    // const postWithCreatedAt = { ...post, createdAt: post.createdAt };

    if (post.id === undefined) {
      throw new Error('Post ID is undefined');
    }
    return this.http.put<Post>(`${this.apiUrl}/${post.id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
}


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Une erreur inconnue est survenue';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erreur côté client : ${error.error.message}`;
    } else {
      errorMessage = `Erreur du serveur : ${error.status}, message : ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
