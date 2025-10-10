import { createReducer, on } from '@ngrx/store';
import { getPosts, loadPostsSuccess } from './actions';
import { IPosts } from './model';

// this is default state of post data
export interface IPostsState {
    posts: IPosts[],
    loading: boolean
}

export const initialPostsState: IPostsState = {
    posts: [],
    loading: false
}


export const postsReducer = createReducer(
    initialPostsState,

    // load initial posts and call getPosts Action from here to load posts data from API
    on(getPosts, state => ({
        ...state,
        loading: true
    })),

    // successfull load posts from here by calling action here
    on(loadPostsSuccess, (state, {posts}) => ({
        ...state,
        posts: posts,
        loading: false
    }))

)



