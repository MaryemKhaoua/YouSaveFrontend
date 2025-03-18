import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { PostService } from '../../services/post.service';
import { PostActions } from './post.actions';

@Injectable()
export class PostEffects {

  private actions$ = inject(Actions);
  private postService = inject(PostService);

  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.loadPosts),
      tap(() => console.log('loadPosts action dispatched')),
      mergeMap(() =>
        this.postService.getPosts().pipe(
          map((posts) => PostActions.loadPostsSuccess({ posts })),
          catchError((error) =>
            of(PostActions.loadPostsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  savePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.savePost),
      mergeMap(({ post }) => {
        console.log('Dispatching savePost with:', post); // Debugging
        return this.postService.createPost(post).pipe(
          map(savedPost => {
            const postWithCreatedAt = { ...savedPost, createdAt: post.createdAt || new Date() };
            console.log('Post saved successfully:', postWithCreatedAt); // Debugging
            return PostActions.savePostSuccess({ post: postWithCreatedAt });
          }),
          catchError(error => {
            console.error('Error saving post:', error); // Debugging
            return of(PostActions.savePostFailure({ error: error.message }));
          })  
        );
      })
    )
  );

  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.updatePost),
      mergeMap(({ post }) => {
        console.log('Dispatching updatePost with:', post); // Debugging
        if (post.id === undefined) {
          console.error('Post ID is undefined'); // Debugging
          return of(PostActions.updatePostFailure({ error: 'Post ID is undefined' }));
        }
        return this.postService.updatePost(post).pipe(
          map(updatedPost => {
            // Ensure createdAt is preserved in the updated post
            const postWithCreatedAt = { ...updatedPost, createdAt: post.createdAt };
            console.log('Post updated successfully:', postWithCreatedAt); // Debugging
            return PostActions.updatePostSuccess({ post: postWithCreatedAt });
          }),
          catchError(error => {
            console.error('Error updating post:', error); // Debugging
            return of(PostActions.updatePostFailure({ error: error.message }));
          })
        );
      })
    )
  );


  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostActions.deletePost),
      mergeMap(({ id }) =>
        this.postService.deletePost(id).pipe(
          map(() => PostActions.deletePostSuccess({ id })),
          catchError(error => of(PostActions.deletePostFailure({ error: error.message })))
        )
      )
    )
  );
}
