import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Comment } from '../../models/comment.model';

export const CommentActions = createActionGroup({
    source: 'Comment/API',
    events: {
        'Load Comments': emptyProps(), 
        'Load Comments Success': props<{ comments: Comment[] }>(),
        'Load Comments Failure': props<{ error: string }>(),

        'Save Comment': props<{ comment: Comment }>(),
        'Save Comment Success': props<{ comment: Comment }>(),
        'Save Comment Failure': props<{ error: string }>(),

        'Update Comment': props<{ comment: Comment }>(),
        'Update Comment Success': props<{ comment: Comment }>(),
        'Update Comment Failure': props<{ error: string }>(),

        'Delete Comment': props<{ id: number }>(),
        'Delete Comment Success': props<{ id: number }>(),
        'Delete Comment Failure': props<{ error: string }>(),

        // New action for adding a comment to a post
        'Add Comment To Post': props<{ postId: number; comment: Comment }>(),
    }
});