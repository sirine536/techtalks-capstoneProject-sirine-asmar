
# DevCommunity

A full-stack developer community platform for discovering communities, publishing technical blogs, and building a public developer profile — built as a capstone project for the TechTalks Full-Stack Bootcamp.

**Live demo:** https://techtalks-capstone-project-sirine-asmar-git-caps-519211-sirine8.vercel.app/

---

## Features

- **Authentication** — GitHub and Google OAuth via Auth.js, with automatic unique username generation on first sign-in
- **Homepage** — hero section, featured communities, latest blogs, and a personalized sidebar (profile summary, joined communities, trending topics) for signed-in users
- **Communities** — browse, search, create, view details, join/leave, with technology-branded icons (via `react-icons`)
- **Blogs** — browse, search, create, read, edit, delete (owner-only)
- **Comments** — add and view comments on any post
- **Bookmarks** — save posts to read later
- **Follows** — follow/unfollow other developers, with follower/following counts on each profile
- **Developer profiles** — public profile page with bio, skills, joined communities, published posts, and follow stats
- **Dashboard** — protected personal overview: content stats (posts, bookmarks, communities, followers), recent posts, and the latest comments other users left on your posts
- **Settings** — edit your own bio and skills
- **Authorization** — server-side ownership checks on every mutation (a user can only edit/delete their own content)
- **Responsive layout** — persistent sidebar navigation on desktop, collapsing to a horizontal nav bar on mobile

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | MongoDB Atlas + Mongoose |
| Authentication | Auth.js (GitHub + Google OAuth) |
| Validation | Zod |
| Deployment | Vercel |

## Architecture Decisions

**Rendering strategies** — different pages use different strategies based on how their data behaves:
- **ISR** (`revalidate`) — `/`, `/blogs`, `/blogs/[slug]`, `/communities`, `/communities/[slug]`, `/profile/[username]`: public content that changes moderately often, where a short staleness window is acceptable in exchange for speed.
- **Dynamic** (`force-dynamic`) — `/dashboard`, `/bookmarks`, `/settings`, `/blogs/[slug]/edit`, `/login`, `/profile` (the redirect route): personalized or session-dependent pages that must always reflect the current user's state.
- Any session-dependent fragment inside an otherwise static/ISR page — the top bar's `AuthStatus` and the homepage's `HomeSidebar` — is isolated in its own component behind a `<Suspense>` boundary, so reading the session doesn't force the whole page to become dynamic. `Sidebar` and `TopBar` themselves read no session data, keeping the shared layout static.

**Embedding vs. referencing** — `Membership`, `Bookmark`, and `Follow` are separate collections rather than arrays embedded in `User`/`Community`/`Post`, because:
1. An embedded array of members/bookmarks/followers could approach MongoDB's 16MB document size limit as a community, post, or popular user's follower list grows.
2. Querying "all communities a user has joined," "all posts a user has bookmarked," or "who follows this user" is a direct, indexed query on a dedicated collection, instead of scanning every document for a match.

`Comment` is likewise a separate collection referencing `postId`, for the same size and query-pattern reasons. `Follow` stores `followerId`/`followingId` as two distinct fields (rather than a single `userId`) since the relationship is directional — the schema needs to distinguish who is following from who is being followed.

**Ownership enforcement** — all ownership checks happen server-side, at the point of mutation (`PATCH`/`DELETE` route handlers), comparing the resource's `authorId` against the signed-in user's session ID. The UI hides edit/delete controls from non-owners as a UX nicety, but the real enforcement is the API returning `401` (not signed in) or `403` (signed in, not the owner) — a hidden button is never treated as security on its own.

**Validation** — every mutation is validated twice: once client-side (via HTML `required` attributes and basic checks, for fast feedback) and once server-side with Zod (the actual trust boundary), since client-side validation can always be bypassed by calling the API directly.

**Visual design without file uploads** — rather than adding image upload infrastructure (storage, an upload endpoint, optimization) for a bonus feature, community icons are rendered from `react-icons` technology logos keyed off the community name (`lib/techIcons.tsx`), and post banners are deterministic gradients derived from the post's `_id` (`lib/postBanner.ts`) so the same post always gets the same banner. Both fall back gracefully (a generic icon, a default gradient) when no match is found.

## Project Structure

```
app/            Routes, layouts, pages, Route Handlers
components/     Reusable UI and feature components
lib/            DB connection, auth helpers, service layer (data access), design helpers
models/         Mongoose schemas
schemas/        Zod validation schemas
data/           Static configuration (nav items)
```

## Local Setup

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the project root with the following variables (see below for where to obtain each):
   ```
   MONGODB_URI=
   AUTH_SECRET=
   GITHUB_CLIENT_ID=
   GITHUB_CLIENT_SECRET=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

| Variable | Where to get it |
|---|---|
| `MONGODB_URI` | MongoDB Atlas → Connect → Drivers (connection string for your cluster) |
| `AUTH_SECRET` | Generate with `npx auth secret` |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | [github.com/settings/developers](https://github.com/settings/developers) → New OAuth App (callback: `http://localhost:3000/api/auth/callback/github`) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | [console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Credentials → OAuth Client ID (redirect URI: `http://localhost:3000/api/auth/callback/google`) |

## Deployment

Deployed on Vercel, connected to this repository's `main` branch. Environment variables are configured in the Vercel project settings, matching `.env.local` above (with production OAuth callback URLs added to the GitHub/Google OAuth app configurations).