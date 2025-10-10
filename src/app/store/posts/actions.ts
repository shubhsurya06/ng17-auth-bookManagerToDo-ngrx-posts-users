import { createAction, props } from "@ngrx/store";
import { IPosts } from "./model";

export const getPosts = createAction('[Get All Posts] get all posts from API');

export const loadPostsSuccess = createAction(
    '[Get All Posts Success] Get all posts successfully',
    props<{posts: IPosts[]}>()
)