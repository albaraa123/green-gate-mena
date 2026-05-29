# Admin Panel Design

**Goal:** Build a protected admin panel at `/admin` allowing up to 3 admin users to manage all content on the Green Gate MENA website via a simple CRUD interface backed by Supabase.

**Architecture:** Next.js App Router route group `src/app/admin/` protected by middleware. Supabase Auth (email/password) for authentication. Supabase PostgreSQL for all data storage. Public pages query Supabase instead of static `.ts` files.

**Tech Stack:** Next.js 16, Supabase (supabase-js + ssr), react-hook-form + zod (already installed), @radix-ui/react-dialog (already installed), Tailwind CSS.

---

## 1. Routing Structure

```
src/app/admin/
  layout.tsx              ← shared sidebar + auth check
  page.tsx                ← dashboard (counts per content type)
  login/
    page.tsx              ← public login page
  opportunities/
    page.tsx              ← list + delete
    new/page.tsx          ← create form
    [id]/page.tsx         ← edit form
  events/
    page.tsx
    new/page.tsx
    [id]/page.tsx
  resources/
    page.tsx
    new/page.tsx
    [id]/page.tsx
  directory/
    page.tsx
    new/page.tsx
    [id]/page.tsx
  partners/
    page.tsx
    new/page.tsx
    [id]/page.tsx
  team/
    page.tsx
    new/page.tsx
    [id]/page.tsx
  stories/
    page.tsx
    new/page.tsx
    [id]/page.tsx
```

`/admin/login` is the only public route. All others require an active Supabase session.

---

## 2. Authentication

**Middleware** (`middleware.ts` updated):
- Matches `/admin/:path*` excluding `/admin/login`
- Uses `@supabase/ssr` `createServerClient` to read session from cookies
- No session → `NextResponse.redirect('/admin/login')`
- Valid session → allow request

**Login flow:**
1. User visits `/admin/login` — email + password form
2. `supabase.auth.signInWithPassword({ email, password })`
3. On success → redirect to `/admin`
4. On failure → inline error message

**Logout:**
- Button in sidebar → Server Action calling `supabase.auth.signOut()` → redirect to `/admin/login`

**User management:**
- 3 admin accounts created manually in Supabase Dashboard (Authentication → Users)
- No signup page — the admin panel is invite-only

**Environment variables required:**
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## 3. Database Schema

All tables use Supabase PostgreSQL. Arrays stored as `text[]`. Booleans default to `false`.

### `opportunities`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | auto-generated |
| slug | text (unique) | URL identifier |
| title | text | |
| organization | text | |
| type | text | fellowship/grant/event/competition/internship/volunteer/training/job |
| theme | text[] | |
| countries | text[] | ISO codes |
| format | text | in-person/online/hybrid |
| deadline | date | nullable |
| start_date | date | nullable |
| description | text | |
| link | text | |
| logo | text | nullable, URL |
| featured | boolean | default false |
| tags | text[] | nullable |
| stipend | boolean | default false |
| funded | boolean | default false |
| created_at | timestamptz | auto |

### `events`
| Column | Type |
|---|---|
| id | uuid (PK) |
| slug | text (unique) |
| title | text |
| organizer | text |
| date | date |
| end_date | date (nullable) |
| location | text |
| country | text |
| format | text |
| description | text |
| link | text |
| image | text (nullable) |
| theme | text[] |
| featured | boolean |
| created_at | timestamptz |

### `resources`

| Column | Type |
| --- | --- |
| id | uuid (PK) |
| slug | text (unique) |
| title | text |
| type | text — report/guide/article/toolkit/video/podcast |
| theme | text — single value, not an array (matches existing Resource type) |
| published_at | date |
| author | text (nullable) |
| description | text |
| link | text |
| image | text (nullable) |
| featured | boolean |
| tags | text[] (nullable) |
| created_at | timestamptz |

### `directory_profiles`
| Column | Type |
|---|---|
| id | uuid (PK) |
| slug | text (unique) |
| name | text |
| type | text | ngo/youth-group/individual/institution/business |
| country | text |
| city | text (nullable) |
| description | text |
| themes | text[] |
| website | text (nullable) |
| email | text (nullable) |
| logo | text (nullable) |
| verified | boolean |
| tags | text[] (nullable) |
| founded | integer (nullable) |
| members | integer (nullable) |
| created_at | timestamptz |

### `partners`
| Column | Type |
|---|---|
| id | text (PK) | manual slug |
| name | text |
| logo | text | URL |
| website | text (nullable) |
| tier | text | strategic/program/media/community |
| country | text (nullable) |
| created_at | timestamptz |

### `team_members`
| Column | Type |
|---|---|
| id | text (PK) |
| name | text |
| name_ar | text (nullable) |
| role | text |
| role_ar | text (nullable) |
| country | text |
| bio | text (nullable) |
| avatar | text (nullable) |
| linkedin | text (nullable) |
| created_at | timestamptz |

### `stories`
| Column | Type |
|---|---|
| id | text (PK) |
| name | text |
| role | text |
| role_ar | text (nullable) |
| country | text |
| quote | text |
| quote_ar | text (nullable) |
| avatar | text (nullable) |
| opportunity_title | text (nullable) |
| created_at | timestamptz |

**Row Level Security (RLS):**
- All tables: `SELECT` allowed for `anon` role (public reads for the website)
- `INSERT`, `UPDATE`, `DELETE`: allowed for `authenticated` role only (admin users)

---

## 4. Admin UI

**Layout (`src/app/admin/layout.tsx`):**
- Server component — checks session, redirects to login if missing
- Renders sidebar (nav links for all 7 sections + Logout button)
- Simple white background, no locale/RTL

**Sidebar links:**
- Dashboard, Opportunities, Events, Resources, Directory, Partners, Team, Stories

**Per-section pattern (example: Opportunities):**

`/admin/opportunities` — list page:
- Table with columns: Title, Type, Deadline, Featured, Actions (Edit / Delete)
- "Add New" button → `/admin/opportunities/new`
- Delete: opens confirm dialog (Radix Dialog), then Server Action

`/admin/opportunities/new` and `/admin/opportunities/[id]`:
- Single form page — same component, pre-filled when editing
- Fields: title, organization, type (select), themes (checkboxes), countries (multi-select or comma input), format (select), deadline (date), description (textarea), link, funded (checkbox), stipend (checkbox), featured (checkbox)
- Submit → Server Action → `supabase.from('opportunities').insert()` or `.update()`
- On success → redirect to `/admin/opportunities`
- On error → inline error message

**Slug generation:**
Auto-generated from title on create (e.g., `"Green Fellowship 2026"` → `"green-fellowship-2026"`). Editable.

**Language:** English only throughout the admin panel.

---

## 5. Public Pages — Migration from Static Files

**New Supabase query helpers (`src/lib/supabase/queries.ts`):**

```ts
export async function getOpportunities(filters?: OpportunityFilters): Promise<Opportunity[]>
export async function getOpportunityBySlug(slug: string): Promise<Opportunity | null>
export async function getFeaturedOpportunities(count?: number): Promise<Opportunity[]>

export async function getEvents(): Promise<Event[]>
export async function getUpcomingEvents(): Promise<Event[]>
export async function getFeaturedEvents(count?: number): Promise<Event[]>

export async function getResources(filters?: ResourceFilters): Promise<Resource[]>
export async function getFeaturedResources(count?: number): Promise<Resource[]>
export async function getResourceBySlug(slug: string): Promise<Resource | null>

export async function getDirectoryProfiles(filters?: DirectoryFilters): Promise<DirectoryProfile[]>
export async function getPartners(): Promise<Partner[]>
export async function getTeam(): Promise<TeamMember[]>
export async function getStories(): Promise<Story[]>
```

**Supabase client helpers:**
- `src/lib/supabase/server.ts` — server component client (uses cookies)
- `src/lib/supabase/client.ts` — browser client (for future client-side use)

**Pages updated:**
All existing page components that currently import from `src/data/*.ts` are updated to call the query helpers instead. The component structure and UI stay exactly the same — only the data source changes.

**`src/data/*.ts` files:**
Left in place. The empty array exports (e.g. `export const opportunities: Opportunity[] = []`) are kept so existing imports do not break. The utility functions inside each file (getBySlug, getFeatured, getUpcoming, etc.) are deleted — they are fully replaced by the Supabase query helpers in `src/lib/supabase/queries.ts`.

---

## 6. File Structure Summary

**New files:**
```
src/app/admin/
  layout.tsx
  page.tsx
  login/page.tsx
  opportunities/page.tsx
  opportunities/new/page.tsx
  opportunities/[id]/page.tsx
  events/page.tsx
  events/new/page.tsx
  events/[id]/page.tsx
  resources/page.tsx
  resources/new/page.tsx
  resources/[id]/page.tsx
  directory/page.tsx
  directory/new/page.tsx
  directory/[id]/page.tsx
  partners/page.tsx
  partners/new/page.tsx
  partners/[id]/page.tsx
  team/page.tsx
  team/new/page.tsx
  team/[id]/page.tsx
  stories/page.tsx
  stories/new/page.tsx
  stories/[id]/page.tsx

src/lib/supabase/
  server.ts       ← server-side Supabase client
  client.ts       ← browser-side Supabase client
  queries.ts      ← all read queries for public pages

src/app/admin/_components/
  AdminSidebar.tsx
  AdminTable.tsx
  DeleteButton.tsx

src/app/admin/_actions/
  opportunities.ts   ← Server Actions: create, update, delete
  events.ts
  resources.ts
  directory.ts
  partners.ts
  team.ts
  stories.ts
```

**Modified files:**
```
middleware.ts                              ← add admin auth check
src/app/[locale]/ecosystem/opportunities/page.tsx
src/app/[locale]/ecosystem/opportunities/[slug]/page.tsx
src/app/[locale]/ecosystem/events/page.tsx
src/app/[locale]/ecosystem/directory/page.tsx
src/app/[locale]/knowledge/page.tsx
src/app/[locale]/knowledge/[slug]/page.tsx
src/app/[locale]/page.tsx                 ← homepage sections
src/app/[locale]/about/page.tsx
src/app/[locale]/impact/page.tsx
src/components/home/StoriesSection.tsx
src/components/home/KnowledgePreview.tsx
src/components/home/PartnersSection.tsx
src/components/home/EcosystemPreview.tsx
```
