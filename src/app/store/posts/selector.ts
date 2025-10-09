import { createSelector, createFeatureSelector } from "@ngrx/store";
import { IPostsState } from "./reducer";
import { IPosts } from "./model";

export const PostsSelector = createFeatureSelector<IPostsState>('posts');

export const selectPosts = createSelector(
    PostsSelector,
    state => state.posts
)

export const selectLoading = createSelector(
    PostsSelector,
    state => state.loading
)