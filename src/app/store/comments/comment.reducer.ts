import { createFeature, createReducer, on } from '@ngrx/store';
import { CommentActions } from './comment.actions';
import { Comment } from '../../models/comment.model';

export interface CommentState {
    comments: Comment[];
    filteredComments: Comment[];
    searchTerm: string;
    error: string | null;
    loading: boolean;
}

const initialState: CommentState = {
    comments: [],
    filteredComments: [],
    searchTerm: '',
    error: null,
    loading: false,
};

export const commentFeature = createFeature({
    name: 'commentsFeatureKey',
    reducer: createReducer(
        initialState,

        on(CommentActions.loadComments, (state) => ({
            ...state,
            loading: true,
            error: null,
        })),

        on(CommentActions.loadCommentsSuccess, (state, { comments }) => ({
            ...state,
            comments,
            filteredComments: comments,
            loading: false,
            error: null,
        })),

        on(CommentActions.loadCommentsFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error,
        })),

        on(CommentActions.saveCommentSuccess, (state, { comment }) => ({
            ...state,
            comments: [...state.comments, comment],
            filteredComments: [...state.filteredComments, comment],
        })),

        on(CommentActions.addCommentToPost, (state, { postId, comment }) => {
            // This action can be used to update the state if needed
            return state; // No state change needed here, as comments are handled in saveCommentSuccess
        }),

        on(CommentActions.updateCommentSuccess, (state, { comment }) => ({
            ...state,
            comments: state.comments.map(c => (c.id === comment.id ? comment : c)),
            filteredComments: state.filteredComments.map(c => (c.id === comment.id ? comment : c)),
        })),

        on(CommentActions.deleteComment, (state, { id }) => ({
            ...state,
            comments: state.comments.filter(comment => comment.id !== id),
            filteredComments: state.filteredComments.filter(comment => comment.id !== id),
        }))
    ),
});

export const { 
    name: commentFeatureKey, reducer: commentReducer, selectComments, selectFilteredComments, selectLoading, selectError 
} = commentFeature;