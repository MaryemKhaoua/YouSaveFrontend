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
      mergeMap(({ post }) =>
        this.postService.createPost(post).pipe(
          map(savedPost => PostActions.savePostSuccess({ post: savedPost })),
          catchError(error => of(PostActions.savePostFailure({ error: error.message })))
        )
      )
    )
  );

updatePost$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PostActions.updatePost),
    mergeMap(({ post }) => {
      if (post.id === undefined) {
        return of(PostActions.updatePostFailure({ error: 'Post ID is undefined' }));
      }
      return this.postService.updatePost(post.id, post).pipe(
        map(updatedPost => PostActions.updatePostSuccess({ post: updatedPost })),
        catchError(error => of(PostActions.updatePostFailure({ error: error.message })))
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
