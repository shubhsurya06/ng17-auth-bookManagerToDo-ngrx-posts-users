# ng17 - auth - TODO bookManager - POSTS/USERS using NgRx

A small Angular (standalone components + NgRx) demo project that includes:

- A login form with authentication against an API (dummyjson).
- Token storage, refresh handling and session timeout helpers.
- Route-based authorization via role guard.
- User data loaded from NgRx (UserEffects -> UserService -> API).
- Posts loaded using NgRx (PostsEffects -> PostService -> API).
- Basic navigation and example components (books, counter, editor, admin, user, posts).

## Getting started

1. Install dependencies

	 ```bash
	 npm install
	 ```

2. Run the app (development)

	 ```bash
	 npm start
	 ```

## What this README documents

- Routes in the app
- How authentication is implemented
- Authorization (role guard)
- How user data is loaded via NgRx
- How posts are loaded and displayed via NgRx
- Key files and where to look for logic

## Routes (from `src/app/app.routes.ts`)

- `/` (redirects to `/login`)
- `/login` — Login page (component: `LoginComponent`)
- `/counter` — Counter (component: `CounterComponent`)
- `/user` — User data (component: `UserComponent`) — user data provided by NgRx store
- `/posts` — Posts (component: `PostsComponent`) — posts provided by NgRx store
- `/books` — Book Manager (component: `BooksComponent`) — protected by `authGuard` (requires authentication)
- `/admin` — Admin Panel (component: `AdminComponent`) — protected by `roleGuard`, required role: `admin`
- `/editor` — Editor Panel (component: `EditorComponent`) — protected by `roleGuard`, required role: `moderator`

## Authentication (login flow)

- Login form is implemented in `src/app/login/login.component.ts` and its template.
- The form posts credentials to `AuthService.login()`, which calls `https://dummyjson.com/auth/login`.
- On successful login the component:
	- Saves access token with `AuthService.saveToken(token)` (localStorage key: `token`).
	- Saves refresh token with `AuthService.saveRefreshToken(refreshToken)` (localStorage key: `refreshToken`).
	- Saves user details with `AuthService.saveUserData(user)`.
	- Redirects the user to `/books`.
- `AuthService` helpers:
	- `getToken()`, `getRefreshToken()`, `removeToken()`, `removeRefreshToken()`, `saveUserData()`, `getUserData()`, `removeUserData()`.
	- `startTokenRefresh()` calls `https://dummyjson.com/auth/refresh` to get refreshed tokens.
	- `isAuthenticated()` checks presence of token in localStorage.
	- `startSessionTimeout(timeoutInMins)` triggers a browser alert when session times out (demo).
- Auth interceptor (`src/app/auth.interceptor.ts`):
	- Adds `Authorization: Bearer <token>` header to outgoing HTTP requests.
	- On 401 responses it attempts to refresh token with `AuthService.startTokenRefresh()`; on success it retries the failed request with the new token; on failure it clears tokens and navigates to `/login`.
- Logging interceptor (`src/app/logging.interceptor.ts`) logs requests and response times for debugging.

## Authorization (role guard)

- `src/app/role.guard.ts` checks user roles via `AuthService.userRoles$` (in this demo the service emits roles like `admin`, `moderator`, `user`).
- When a route contains `data: { role: 'admin' }` or `data: { role: 'moderator' }`, `roleGuard` attempts to collect roles and verify membership. If the user is not authenticated or does not have the required role, the guard removes token & user data and navigates to `/login`.
- Example protected routes:
	- `/books` — requires authentication (`authGuard`)
	- `/admin` — requires role `admin` (`roleGuard`)
	- `/editor` — requires role `moderator` (`roleGuard`)

## NgRx: user data flow

- Store setup (see `src/app/app.config.ts`):
	- `provideStore` is configured with: `count` (CounterReducer), `user` (userReducer), `posts` (postsReducer).
	- `provideEffects` registers `UserEffects` and `PostsEffects`.
- User actions: `src/app/store/user.action.ts`
	- `getUserData` — dispatched to begin loading user
	- `loadUserDataSuccess` — dispatched by effect when user data arrives
- User reducer: `src/app/store/user.reducer.ts`
	- Keeps `user: IUser | null` and `loading: boolean`.
	- on(`getUserData`) sets loading true.
	- on(`loadUserDataSuccess`) stores user and sets loading false.
- User effects: `src/app/store/user.effect.ts`
	- On `getUserData`, calls `UserService.getUsers()` (calls `https://dummyjson.com/users/1`), delays 2s (for demo), and maps response to `loadUserDataSuccess({ user })`.
- User service: `src/app/service/user.service.ts` performs GET `https://dummyjson.com/users/1`.
- `LoginComponent` dispatches `getUserData()` on `ngOnInit` to populate the store and selects user via `selectUser` selector.
- Selectors: `src/app/store/user.selector.ts` exposes `selectUser` and `selectLoading`.

## NgRx: posts flow

- Posts actions: `src/app/store/posts/actions.ts`
	- `getPosts` — trigger to fetch posts
	- `loadPostsSuccess` — contains posts payload
- Posts reducer: `src/app/store/posts/reducer.ts`
	- Keeps posts array and loading boolean, sets loading true when `getPosts` is dispatched and stores posts when `loadPostsSuccess` fires.
- Posts effects: `src/app/store/posts/effects.ts`
	- On `getPosts`, calls `PostService.getPosts()`, which GETs `https://dummyjson.com/posts` and maps to first 10 posts.
	- Dispatches `loadPostsSuccess({ posts })` on success.
- Post service: `src/app/store/posts/service.ts` GETs the posts and slices to first 10 items.
- `PostsComponent` (`src/app/posts/posts.component.ts`) selects posts via `selectPosts` and dispatches `getPosts()` in `ngOnInit`. The template `src/app/posts/posts.component.html` displays a navbar and cards for posts; shows a loading spinner while posts are loading.

## Key files & responsibilities

- `src/app/app.routes.ts` — route definitions and guards usage.
- `src/app/app.config.ts` — application config, registers router, http interceptors, store, and effects.
- `src/app/login/*` — login component: form, dispatches store actions, uses `AuthService` for authentication.
- `src/app/auth.service.ts` — token & user data helper, API endpoints for login/refresh, `isAuthenticated()`.
- `src/app/auth.interceptor.ts` — attaches `Authorization` header; refreshes token on 401 and retries request.
- `src/app/role.guard.ts` — checks roles emitted by `AuthService`; enforces route role data.
- `src/app/logging.interceptor.ts` — logs request/response for debugging.
- `src/app/store/*` — NgRx setup: `user.*` (actions/reducer/selectors/effects), `posts/*` (actions/reducer/selectors/effects/service).

## Notes, assumptions & caveats

- The project uses dummyjson.com as the demo backend; configured endpoints in code:
	- AuthService: login -> `POST https://dummyjson.com/auth/login`
	- AuthService: startTokenRefresh -> `POST https://dummyjson.com/auth/refresh`
	- AuthService: getAuthUser -> `GET https://dummyjson.com/user/me`
	- PostService: `GET https://dummyjson.com/posts` (first 10 posts are used)
	- UserService: `GET https://dummyjson.com/users/1`
- Role detection in `role.guard.ts` uses a simple observable `AuthService.userRoles$` emitting role strings; in a real app you would store roles in the token or in the user profile.
- The auth token is stored in localStorage under key `token` and refresh token under `refreshToken` — convenient for demo but not the most secure approach for production. Consider secure cookies or other storage for real deployments.
- The interceptors are provided globally via `provideHttpClient(withInterceptors([authInterceptor, loggingInterceptor]))` in `app.config.ts`.
- The role guard uses synchronous subscribe to build `userRoles` from an observable. In production code you'd want to refactor to a pure observable chain (avoid synchronous subscribe during guard evaluation) or provide roles from a synchronous source.

## Next steps (optional)

- Improve the `role.guard` to use token-based roles or synchronous user profile.
- Replace localStorage token storage with a more secure approach for production.
- Add unit tests for the effects and guards.

---
