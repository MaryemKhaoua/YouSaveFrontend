import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { CommentActions } from './comment.actions';

@Injectable()
export class CommentEffects {

  private actions$ = inject(Actions);
  private commentService = inject(CommentService);

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.loadComments),
      tap(() => console.log('loadComments action dispatched')),
      mergeMap(() =>
        this.commentService.getComments().pipe(
          map((comments) => CommentActions.loadCommentsSuccess({ comments })),
          catchError((error) =>
            of(CommentActions.loadCommentsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  saveComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.saveComment),
      mergeMap(({ comment }) => {
        return this.commentService.createComment(comment).pipe(
          map(savedComment => {
            const commentWithCreatedAt = { ...savedComment, createdAt: comment.createdAt || new Date() };
            return CommentActions.saveCommentSuccess({ comment: commentWithCreatedAt });
          }),
          catchError(error => {
            return of(CommentActions.saveCommentFailure({ error: error.message }));
          })  
        );
      })
    )
  );

  updateComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.updateComment),
      mergeMap(({ comment }) => {
        if (comment.id === undefined) {
          return of(CommentActions.updateCommentFailure({ error: 'Comment ID is undefined' }));
        }
        return this.commentService.updateComment(comment).pipe(
          map(updatedComment => {
            const commentWithCreatedAt = { ...updatedComment, createdAt: comment.createdAt };
            return CommentActions.updateCommentSuccess({ comment: commentWithCreatedAt });
          }),
          catchError(error => {
            return of(CommentActions.updateCommentFailure({ error: error.message }));
          })
        );
      })
    )
  );

  deleteComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CommentActions.deleteComment),
      mergeMap(({ id }) =>
        this.commentService.deleteComment(id).pipe(
          map(() => CommentActions.deleteCommentSuccess({ id })),
          catchError(error => of(CommentActions.deleteCommentFailure({ error: error.message })))
        )
      )
    )
  );

  addCommentToPost$ = createEffect(() =>
    this.actions$.pipe(
        ofType(CommentActions.addCommentToPost),
        mergeMap(({ postId, comment }) => {
            return this.commentService.createComment(comment).pipe(
                map(savedComment => {
                    const commentWithCreatedAt = { ...savedComment, createdAt: comment.createdAt || new Date() };
                    return CommentActions.saveCommentSuccess({ comment: commentWithCreatedAt });
                }),
                catchError(error => {
                    return of(CommentActions.saveCommentFailure({ error: error.message }));
                })
            );
        })
    )
);

}
