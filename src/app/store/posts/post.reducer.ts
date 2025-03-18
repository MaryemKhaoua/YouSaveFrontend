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
      error: null
    })),

    on(PostActions.loadPostsSuccess, (state, { posts }) => ({
      ...state,
      posts,
      filteredPosts: posts,
      loading: false,
      error: null
    })),

    on(PostActions.loadPostsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
    })),

    on(PostActions.savePostSuccess, (state, { post }) => ({
        ...state,
        posts: [...state.posts, post],
        filteredPosts: [...state.filteredPosts, post]
      })),

    on(PostActions.updatePostSuccess, (state, { post }) => ({
      ...state,
      posts: state.posts.map(p => p.id === post.id ? post : p),
      filteredPosts: state.filteredPosts.map(p => p.id === post.id ? post : p)
    })),      

    on(PostActions.deletePost, (state, { id }) => ({
      ...state,
      posts: state.posts.filter(post => post.id !== id),
      filteredPosts: state.filteredPosts.filter(post => post.id !== id)
    })),

  )
});

export const { name: postFeatureKey, reducer: postReducer, selectPosts, selectFilteredPosts, selectLoading, selectError } = postFeature;