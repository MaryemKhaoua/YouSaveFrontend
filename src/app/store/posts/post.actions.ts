    import { createActionGroup, emptyProps, props } from '@ngrx/store';
    import { Post } from '../../models/post.model';

    export const PostActions = createActionGroup({
    source: 'Post/API',
    events: {
        'Load Posts': emptyProps(), 
        'Load Posts Success': props<{ posts: Post[] }>(),
        'Load Posts Failure': props<{ error: string }>(),

        'Save Post': props<{ post: Post }>(),
        'Save Post Success': props<{ post: Post }>(),
        'Save Post Failure': props<{ error: string }>(),

        'Update Post': props<{ post: Post }>(),
        'Update Post Success': props<{ post: Post }>(),
        'Update Post Failure': props<{ error: string }>(),

        'Delete Post': props<{ id: number }>(),
        'Delete Post Success': props<{ id: number }>(),
        'Delete Post Failure': props<{ error: string }>(),

        
    }
    });