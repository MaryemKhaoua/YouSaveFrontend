import { createFeature, createReducer, on } from '@ngrx/store';
import { PostActions } from './post.actions';
import { Post } from '../../models/post.model';

export interface PostState {
  posts: Post[];
  filteredPosts: Post[];
  searchTerm: string;
  error: string | null;
  loading: boolean;
}

const initialState: PostState = {
  posts: [],
  filteredPosts: [],
  searchTerm: '',
  error: null,
  loading: false,
};

export const postFeature = createFeature({
  name: 'postsFeatureKey',
  reducer: createReducer(
    initialState,

    on(PostActions.loadPosts, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),

    on(PostActions.loadPostsSuccess, (state, { posts }) => {
      const sortedPosts = [...posts].sort((a, b) =>
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );

      return {
        ...state,
        posts: sortedPosts,
        filteredPosts: sortedPosts,
        loading: false,
        error: null,
      };
    }),

    on(PostActions.loadPostsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),

    on(PostActions.savePostSuccess, (state, { post }) => {
      const updatedPosts = [...state.posts, post].sort((a, b) =>
        new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );

      return {
        ...state,
        posts: updatedPosts,
        filteredPosts: updatedPosts,
      };
    }),

    on(PostActions.updatePostSuccess, (state, { post }) => {
      const updatedPosts = state.posts
        .map((p) => (p.id === post.id ? post : p))
        .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());

      return {
        ...state,
        posts: updatedPosts,
        filteredPosts: updatedPosts,
      };
    }),

    on(PostActions.deletePost, (state, { id }) => {
      const updatedPosts = state.posts
        .filter((post) => post.id !== id)
        .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());

      return {
        ...state,
        posts: updatedPosts,
        filteredPosts: updatedPosts,
      };
    })
  ),
});

export const {
  name: postFeatureKey,
  reducer: postReducer,
  selectPosts,
  selectFilteredPosts,
  selectLoading,
  selectError,
} = postFeature;
