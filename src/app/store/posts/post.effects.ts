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
        return this.postService.createPost(post).pipe(
          map(savedPost => {
            const postWithCreatedAt = { ...savedPost, createdAt: post.createdAt || new Date() };
            return PostActions.savePostSuccess({ post: postWithCreatedAt });
          }),
          catchError(error => {
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
        if (post.id === undefined) {
          return of(PostActions.updatePostFailure({ error: 'Post ID is undefined' }));
        }
        return this.postService.updatePost(post).pipe(
          map(updatedPost => {
            const postWithCreatedAt = { ...updatedPost, createdAt: post.createdAt };
            return PostActions.updatePostSuccess({ post: postWithCreatedAt });
          }),
          catchError(error => {
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
