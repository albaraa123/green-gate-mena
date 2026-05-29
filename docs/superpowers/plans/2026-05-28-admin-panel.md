# Admin Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Supabase-backed admin panel at `/admin` for managing all 7 content types, and migrate all public pages from static `.ts` data files to live Supabase queries.

**Architecture:** Supabase PostgreSQL stores all content with Row Level Security. `@supabase/ssr` handles auth session cookies in Next.js. A new `/admin` route group (outside `[locale]`) provides English-only CRUD UI. A new `src/middleware.ts` protects all `/admin/*` routes (except `/admin/login`). Public pages switch from static imports to async Supabase query helpers in `src/lib/supabase/queries.ts`.

**Tech Stack:** Next.js 16 App Router, @supabase/supabase-js + @supabase/ssr, react-hook-form + zod (already installed), @radix-ui/react-dialog (already installed), Tailwind CSS.

**Important context:**
- Working directory: `c:\Users\albar\OneDrive\سطح المكتب\green-gate-mena`
- No `middleware.ts` exists yet — must be created at `src/middleware.ts`
- No git repository — skip all git commit steps
- TypeScript path alias `@/` maps to `src/`
- All public pages use `params: Promise<{ locale: string }>` pattern (Next.js 16)
- `src/data/*.ts` files currently export empty arrays + utility functions

---

## Task 1: Install Supabase packages and create environment variables

**Files:**
- Run: `npm install`
- Create: `.env.local`

- [ ] **Step 1: Install packages**

Run from project root:
```
npm install @supabase/supabase-js @supabase/ssr
```

Expected: packages added to `node_modules/`, `package.json` updated.

- [ ] **Step 2: Create `.env.local`**

Create `.env.local` at project root with this content (fill in real values from Supabase Dashboard → Settings → API):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

- [ ] **Step 3: Verify TypeScript sees the types**

Run:
```
npx tsc --noEmit
```

Expected: zero output (zero errors).

---

## Task 2: Create Supabase database schema

**This task is manual — run the SQL below in Supabase Dashboard → SQL Editor.**

- [ ] **Step 1: Open Supabase Dashboard SQL Editor**

Go to your Supabase project → SQL Editor → New query.

- [ ] **Step 2: Run the full schema SQL**

Paste and run this entire block:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── opportunities ─────────────────────────────────────────────────────────────
create table if not exists opportunities (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  title       text not null,
  organization text not null,
  type        text not null,
  theme       text[] not null default '{}',
  countries   text[] not null default '{}',
  format      text not null,
  deadline    date,
  start_date  date,
  description text not null,
  link        text not null,
  logo        text,
  featured    boolean not null default false,
  tags        text[],
  stipend     boolean not null default false,
  funded      boolean not null default false,
  created_at  timestamptz not null default now()
);
alter table opportunities enable row level security;
create policy "Public read" on opportunities for select using (true);
create policy "Auth write" on opportunities for all using (auth.role() = 'authenticated');

-- ── events ────────────────────────────────────────────────────────────────────
create table if not exists events (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  title       text not null,
  organizer   text not null,
  date        date not null,
  end_date    date,
  location    text not null,
  country     text not null,
  format      text not null,
  description text not null,
  link        text not null,
  image       text,
  theme       text[] not null default '{}',
  featured    boolean not null default false,
  created_at  timestamptz not null default now()
);
alter table events enable row level security;
create policy "Public read" on events for select using (true);
create policy "Auth write" on events for all using (auth.role() = 'authenticated');

-- ── resources ─────────────────────────────────────────────────────────────────
create table if not exists resources (
  id           uuid primary key default uuid_generate_v4(),
  slug         text unique not null,
  title        text not null,
  type         text not null,
  theme        text not null,
  published_at date not null,
  author       text,
  description  text not null,
  link         text not null,
  image        text,
  featured     boolean not null default false,
  tags         text[],
  created_at   timestamptz not null default now()
);
alter table resources enable row level security;
create policy "Public read" on resources for select using (true);
create policy "Auth write" on resources for all using (auth.role() = 'authenticated');

-- ── directory_profiles ────────────────────────────────────────────────────────
create table if not exists directory_profiles (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  name        text not null,
  type        text not null,
  country     text not null,
  city        text,
  description text not null,
  themes      text[] not null default '{}',
  website     text,
  email       text,
  logo        text,
  verified    boolean not null default false,
  tags        text[],
  founded     integer,
  members     integer,
  created_at  timestamptz not null default now()
);
alter table directory_profiles enable row level security;
create policy "Public read" on directory_profiles for select using (true);
create policy "Auth write" on directory_profiles for all using (auth.role() = 'authenticated');

-- ── partners ──────────────────────────────────────────────────────────────────
create table if not exists partners (
  id         text primary key,
  name       text not null,
  logo       text not null,
  website    text,
  tier       text not null,
  country    text,
  created_at timestamptz not null default now()
);
alter table partners enable row level security;
create policy "Public read" on partners for select using (true);
create policy "Auth write" on partners for all using (auth.role() = 'authenticated');

-- ── team_members ──────────────────────────────────────────────────────────────
create table if not exists team_members (
  id         text primary key,
  name       text not null,
  name_ar    text,
  role       text not null,
  role_ar    text,
  country    text not null,
  bio        text,
  avatar     text,
  linkedin   text,
  created_at timestamptz not null default now()
);
alter table team_members enable row level security;
create policy "Public read" on team_members for select using (true);
create policy "Auth write" on team_members for all using (auth.role() = 'authenticated');

-- ── stories ───────────────────────────────────────────────────────────────────
create table if not exists stories (
  id                 text primary key,
  name               text not null,
  role               text not null,
  role_ar            text,
  country            text not null,
  quote              text not null,
  quote_ar           text,
  avatar             text,
  opportunity_title  text,
  created_at         timestamptz not null default now()
);
alter table stories enable row level security;
create policy "Public read" on stories for select using (true);
create policy "Auth write" on stories for all using (auth.role() = 'authenticated');
```

Expected: "Success. No rows returned." for each table creation.

- [ ] **Step 3: Create admin users**

In Supabase Dashboard → Authentication → Users → "Invite user" — add the 3 admin email addresses. Each user receives an email to set their password.

---

## Task 3: Supabase client helpers

**Files:**
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/client.ts`

- [ ] **Step 1: Create `src/lib/supabase/server.ts`**

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component — cookie mutations handled by middleware
          }
        },
      },
    }
  )
}
```

- [ ] **Step 2: Create `src/lib/supabase/client.ts`**

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 3: TypeScript check**

Run:
```
npx tsc --noEmit
```

Expected: zero errors.

---

## Task 4: Create middleware for admin auth

**Files:**
- Create: `src/middleware.ts`

The project currently has no middleware. This creates one that protects all `/admin/*` routes (except `/admin/login`) by checking for a valid Supabase session.

- [ ] **Step 1: Create `src/middleware.ts`**

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Only act on /admin/* — skip /admin/login
  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  const response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
```

- [ ] **Step 2: TypeScript check**

Run:
```
npx tsc --noEmit
```

Expected: zero errors.

---

## Task 5: Admin login page

**Files:**
- Create: `src/app/admin/login/page.tsx`

- [ ] **Step 1: Create `src/app/admin/login/page.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 w-full max-w-sm">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Green Gate Admin</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-teal-800 disabled:opacity-50 transition-colors mt-1"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify page renders**

Run `npm run dev` and visit `http://localhost:3000/admin/login`. Expect to see the login form. Visiting `http://localhost:3000/admin` without a session should redirect to `/admin/login`.

---

## Task 6: Admin layout and sidebar

**Files:**
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/_components/AdminSidebar.tsx`

- [ ] **Step 1: Create `src/app/admin/_components/AdminSidebar.tsx`**

```typescript
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/opportunities', label: 'Opportunities' },
  { href: '/admin/events', label: 'Events' },
  { href: '/admin/resources', label: 'Resources' },
  { href: '/admin/directory', label: 'Directory' },
  { href: '/admin/partners', label: 'Partners' },
  { href: '/admin/team', label: 'Team' },
  { href: '/admin/stories', label: 'Stories' },
] as const

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col min-h-screen shrink-0">
      <div className="px-4 py-5 border-b border-gray-100">
        <p className="font-semibold text-sm text-teal-700">Green Gate</p>
        <p className="text-xs text-gray-400 mt-0.5">Admin Panel</p>
      </div>
      <nav className="flex-1 py-3 flex flex-col gap-0.5 px-2">
        {NAV.map(({ href, label, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={[
                'px-3 py-2 rounded-lg text-sm transition-colors',
                active
                  ? 'bg-teal-50 text-teal-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              ].join(' ')}
            >
              {label}
            </Link>
          )
        })}
      </nav>
      <div className="px-2 pb-4 border-t border-gray-100 pt-3">
        <button
          onClick={handleLogout}
          className="w-full px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 text-left transition-colors"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
```

- [ ] **Step 2: Create `src/app/admin/layout.tsx`**

```typescript
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from './_components/AdminSidebar'

export const metadata = { title: { default: 'Admin', template: '%s | Admin' } }

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
```

- [ ] **Step 3: TypeScript check**

Run:
```
npx tsc --noEmit
```

Expected: zero errors.

---

## Task 7: Admin dashboard page

**Files:**
- Create: `src/app/admin/page.tsx`

- [ ] **Step 1: Create `src/app/admin/page.tsx`**

```typescript
import { createClient } from '@/lib/supabase/server'

const SECTIONS = [
  { table: 'opportunities', label: 'Opportunities', href: '/admin/opportunities' },
  { table: 'events', label: 'Events', href: '/admin/events' },
  { table: 'resources', label: 'Resources', href: '/admin/resources' },
  { table: 'directory_profiles', label: 'Directory Profiles', href: '/admin/directory' },
  { table: 'partners', label: 'Partners', href: '/admin/partners' },
  { table: 'team_members', label: 'Team Members', href: '/admin/team' },
  { table: 'stories', label: 'Stories', href: '/admin/stories' },
] as const

export default async function AdminDashboard() {
  const supabase = await createClient()

  const counts = await Promise.all(
    SECTIONS.map(async ({ table, label, href }) => {
      const { count } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })
      return { label, count: count ?? 0, href }
    })
  )

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {counts.map(({ label, count, href }) => (
          <a
            key={label}
            href={href}
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-teal-300 hover:shadow-sm transition-all"
          >
            <p className="text-3xl font-semibold text-teal-700">{count}</p>
            <p className="text-sm text-gray-600 mt-1">{label}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify dashboard loads**

Visit `http://localhost:3000/admin` after logging in. Expect to see the dashboard with 7 count cards (all showing 0).

---

## Task 8: Shared admin components

**Files:**
- Create: `src/app/admin/_components/DeleteButton.tsx`
- Create: `src/app/admin/_components/AdminTable.tsx`

- [ ] **Step 1: Create `src/app/admin/_components/DeleteButton.tsx`**

```typescript
'use client'

import { useState, useTransition } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

interface Props {
  id: string
  action: (id: string) => Promise<void>
}

export function DeleteButton({ id, action }: Props) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      await action(id)
      setOpen(false)
    })
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="text-red-500 hover:text-red-700 text-sm transition-colors">
          Delete
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 w-80 shadow-lg z-50">
          <Dialog.Title className="font-semibold text-gray-900 mb-2">Delete item?</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-5">
            This action cannot be undone.
          </Dialog.Description>
          <div className="flex gap-2 justify-end">
            <Dialog.Close asChild>
              <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50"
            >
              {isPending ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

- [ ] **Step 2: Create `src/app/admin/_components/AdminTable.tsx`**

```typescript
import Link from 'next/link'

interface Column<T> {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
}

interface Props<T extends { id: string }> {
  rows: T[]
  columns: Column<T>[]
  editBase: string
  deleteAction: (id: string) => Promise<void>
  addHref: string
  title: string
  emptyMessage?: string
}

import { DeleteButton } from './DeleteButton'

export function AdminTable<T extends { id: string }>({
  rows,
  columns,
  editBase,
  deleteAction,
  addHref,
  title,
  emptyMessage = 'No items yet.',
}: Props<T>) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        <Link
          href={addHref}
          className="bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-800 transition-colors"
        >
          Add New
        </Link>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3 text-left font-medium text-gray-600"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-left font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-4 py-10 text-center text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={String(col.key)} className="px-4 py-3 text-gray-700">
                      {col.render
                        ? col.render(row)
                        : String((row as Record<string, unknown>)[String(col.key)] ?? '—')}
                    </td>
                  ))}
                  <td className="px-4 py-3 flex items-center gap-3">
                    <Link
                      href={`${editBase}/${row.id}`}
                      className="text-teal-700 hover:text-teal-900 text-sm"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={row.id} action={deleteAction} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: TypeScript check**

```
npx tsc --noEmit
```

Expected: zero errors.

---

## Task 9: Opportunities admin CRUD

**Files:**
- Create: `src/app/admin/_actions/opportunities.ts`
- Create: `src/app/admin/opportunities/page.tsx`
- Create: `src/app/admin/opportunities/_components/OpportunityForm.tsx`
- Create: `src/app/admin/opportunities/new/page.tsx`
- Create: `src/app/admin/opportunities/[id]/page.tsx`

### Step 9a — Server Actions

- [ ] **Create `src/app/admin/_actions/opportunities.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export interface OppInput {
  slug: string
  title: string
  organization: string
  type: string
  theme: string[]
  countries: string[]
  format: string
  deadline: string | null
  start_date: string | null
  description: string
  link: string
  logo: string | null
  featured: boolean
  stipend: boolean
  funded: boolean
}

export async function createOpportunity(input: OppInput) {
  const supabase = await createClient()
  const { error } = await supabase.from('opportunities').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/opportunities')
  revalidatePath('/en/ecosystem/opportunities')
  revalidatePath('/ar/ecosystem/opportunities')
  redirect('/admin/opportunities')
}

export async function updateOpportunity(id: string, input: OppInput) {
  const supabase = await createClient()
  const { error } = await supabase.from('opportunities').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/opportunities')
  revalidatePath('/en/ecosystem/opportunities')
  revalidatePath('/ar/ecosystem/opportunities')
  redirect('/admin/opportunities')
}

export async function deleteOpportunity(id: string) {
  const supabase = await createClient()
  await supabase.from('opportunities').delete().eq('id', id)
  revalidatePath('/admin/opportunities')
  revalidatePath('/en/ecosystem/opportunities')
  revalidatePath('/ar/ecosystem/opportunities')
}
```

### Step 9b — List page

- [ ] **Create `src/app/admin/opportunities/page.tsx`**

```typescript
import { createClient } from '@/lib/supabase/server'
import { AdminTable } from '../_components/AdminTable'
import { deleteOpportunity } from '../_actions/opportunities'

export const metadata = { title: 'Opportunities' }

export default async function OpportunitiesAdminPage() {
  const supabase = await createClient()
  const { data: rows } = await supabase
    .from('opportunities')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <AdminTable
      title="Opportunities"
      rows={rows ?? []}
      addHref="/admin/opportunities/new"
      editBase="/admin/opportunities"
      deleteAction={deleteOpportunity}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'organization', label: 'Organization' },
        { key: 'type', label: 'Type' },
        {
          key: 'deadline',
          label: 'Deadline',
          render: (row) => row.deadline ?? '—',
        },
        {
          key: 'featured',
          label: 'Featured',
          render: (row) => (row.featured ? '✓' : '—'),
        },
      ]}
    />
  )
}
```

### Step 9c — Form component

- [ ] **Create `src/app/admin/opportunities/_components/OpportunityForm.tsx`**

```typescript
'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createOpportunity, updateOpportunity } from '../../_actions/opportunities'

const TYPES = ['fellowship', 'grant', 'event', 'competition', 'internship', 'volunteer', 'training', 'job'] as const
const FORMATS = ['in-person', 'online', 'hybrid'] as const
const THEMES = ['climate', 'energy', 'water', 'biodiversity', 'waste', 'sustainability', 'policy', 'finance', 'agriculture', 'urban', 'oceans', 'youth'] as const

const schema = z.object({
  slug: z.string().min(1, 'Required'),
  title: z.string().min(1, 'Required'),
  organization: z.string().min(1, 'Required'),
  type: z.enum(TYPES),
  theme: z.array(z.enum(THEMES)).min(1, 'Select at least one theme'),
  countries: z.string().min(1, 'Required'),
  format: z.enum(FORMATS),
  deadline: z.string().optional().nullable(),
  start_date: z.string().optional().nullable(),
  description: z.string().min(1, 'Required'),
  link: z.string().url('Must be a valid URL'),
  logo: z.string().optional().nullable(),
  featured: z.boolean(),
  stipend: z.boolean(),
  funded: z.boolean(),
})

type FormValues = z.infer<typeof schema>

interface Row {
  id: string
  slug: string
  title: string
  organization: string
  type: string
  theme: string[]
  countries: string[]
  format: string
  deadline: string | null
  start_date: string | null
  description: string
  link: string
  logo: string | null
  featured: boolean
  stipend: boolean
  funded: boolean
}

interface Props {
  row?: Row
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}

const inputCls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500'

export function OpportunityForm({ row }: Props) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: row
      ? {
          ...row,
          countries: row.countries.join(', '),
          theme: row.theme as typeof THEMES[number][],
          deadline: row.deadline ?? undefined,
          start_date: row.start_date ?? undefined,
          logo: row.logo ?? undefined,
        }
      : {
          theme: [],
          featured: false,
          stipend: false,
          funded: false,
        },
  })

  const selectedThemes = watch('theme') ?? []
  const title = watch('title') ?? ''

  // Auto-generate slug from title (only when creating)
  function handleTitleBlur() {
    if (!row) {
      setValue(
        'slug',
        title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
      )
    }
  }

  async function onSubmit(data: FormValues) {
    const payload = {
      ...data,
      countries: data.countries.split(',').map((c) => c.trim()).filter(Boolean),
      deadline: data.deadline || null,
      start_date: data.start_date || null,
      logo: data.logo || null,
    }
    if (row) {
      await updateOpportunity(row.id, payload)
    } else {
      await createOpportunity(payload)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 max-w-2xl">
      <Field label="Title *" error={errors.title?.message}>
        <input {...register('title')} onBlur={handleTitleBlur} className={inputCls} />
      </Field>

      <Field label="Slug *" error={errors.slug?.message}>
        <input {...register('slug')} className={inputCls} />
      </Field>

      <Field label="Organization *" error={errors.organization?.message}>
        <input {...register('organization')} className={inputCls} />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Type *" error={errors.type?.message}>
          <select {...register('type')} className={inputCls}>
            <option value="">Select…</option>
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Field>

        <Field label="Format *" error={errors.format?.message}>
          <select {...register('format')} className={inputCls}>
            <option value="">Select…</option>
            {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Themes * (select one or more)" error={errors.theme?.message}>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((theme) => {
            const checked = selectedThemes.includes(theme)
            return (
              <button
                key={theme}
                type="button"
                onClick={() => {
                  setValue(
                    'theme',
                    checked
                      ? selectedThemes.filter((t) => t !== theme)
                      : [...selectedThemes, theme],
                    { shouldValidate: true }
                  )
                }}
                className={[
                  'rounded-full px-3 py-1 text-xs border transition-colors',
                  checked
                    ? 'bg-teal-700 text-white border-teal-700'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-teal-400',
                ].join(' ')}
              >
                {theme}
              </button>
            )
          })}
        </div>
      </Field>

      <Field label="Countries (comma-separated ISO codes, e.g. SA, EG, MA) *" error={errors.countries?.message}>
        <input {...register('countries')} className={inputCls} placeholder="SA, EG, MA, ALL" />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Deadline" error={errors.deadline?.message}>
          <input type="date" {...register('deadline')} className={inputCls} />
        </Field>
        <Field label="Start Date" error={errors.start_date?.message}>
          <input type="date" {...register('start_date')} className={inputCls} />
        </Field>
      </div>

      <Field label="Description *" error={errors.description?.message}>
        <textarea {...register('description')} rows={5} className={inputCls} />
      </Field>

      <Field label="Link (full URL) *" error={errors.link?.message}>
        <input type="url" {...register('link')} className={inputCls} />
      </Field>

      <Field label="Logo URL (optional)" error={errors.logo?.message}>
        <input {...register('logo')} className={inputCls} />
      </Field>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" {...register('featured')} className="rounded" />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" {...register('funded')} className="rounded" />
          Funded
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" {...register('stipend')} className="rounded" />
          Stipend
        </label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-teal-800 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving…' : row ? 'Update Opportunity' : 'Create Opportunity'}
        </button>
        <a
          href="/admin/opportunities"
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
```

### Step 9d — New and Edit pages

- [ ] **Create `src/app/admin/opportunities/new/page.tsx`**

```typescript
import { OpportunityForm } from '../_components/OpportunityForm'

export const metadata = { title: 'New Opportunity' }

export default function NewOpportunityPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">New Opportunity</h1>
      <OpportunityForm />
    </div>
  )
}
```

- [ ] **Create `src/app/admin/opportunities/[id]/page.tsx`**

```typescript
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { OpportunityForm } from '../_components/OpportunityForm'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Edit Opportunity' }

export default async function EditOpportunityPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: row } = await supabase.from('opportunities').select('*').eq('id', id).single()
  if (!row) notFound()

  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit Opportunity</h1>
      <OpportunityForm row={row} />
    </div>
  )
}
```

- [ ] **Step 9e: TypeScript check**

```
npx tsc --noEmit
```

Expected: zero errors.

---

## Task 10: Events admin CRUD

**Files:**
- Create: `src/app/admin/_actions/events.ts`
- Create: `src/app/admin/events/page.tsx`
- Create: `src/app/admin/events/_components/EventForm.tsx`
- Create: `src/app/admin/events/new/page.tsx`
- Create: `src/app/admin/events/[id]/page.tsx`

Follows the exact same pattern as Task 9. Use these specifics:

- [ ] **Create `src/app/admin/_actions/events.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface EventInput {
  slug: string
  title: string
  organizer: string
  date: string
  end_date: string | null
  location: string
  country: string
  format: string
  description: string
  link: string
  image: string | null
  theme: string[]
  featured: boolean
}

export async function createEvent(input: EventInput) {
  const supabase = await createClient()
  const { error } = await supabase.from('events').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/events')
  revalidatePath('/en/ecosystem/events')
  revalidatePath('/ar/ecosystem/events')
  redirect('/admin/events')
}

export async function updateEvent(id: string, input: EventInput) {
  const supabase = await createClient()
  const { error } = await supabase.from('events').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/events')
  revalidatePath('/en/ecosystem/events')
  revalidatePath('/ar/ecosystem/events')
  redirect('/admin/events')
}

export async function deleteEvent(id: string) {
  const supabase = await createClient()
  await supabase.from('events').delete().eq('id', id)
  revalidatePath('/admin/events')
  revalidatePath('/en/ecosystem/events')
  revalidatePath('/ar/ecosystem/events')
}
```

- [ ] **Create `src/app/admin/events/page.tsx`**

```typescript
import { createClient } from '@/lib/supabase/server'
import { AdminTable } from '../_components/AdminTable'
import { deleteEvent } from '../_actions/events'

export const metadata = { title: 'Events' }

export default async function EventsAdminPage() {
  const supabase = await createClient()
  const { data: rows } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: false })

  return (
    <AdminTable
      title="Events"
      rows={rows ?? []}
      addHref="/admin/events/new"
      editBase="/admin/events"
      deleteAction={deleteEvent}
      columns={[
        { key: 'title', label: 'Title' },
        { key: 'organizer', label: 'Organizer' },
        { key: 'date', label: 'Date' },
        { key: 'format', label: 'Format' },
        { key: 'country', label: 'Country' },
      ]}
    />
  )
}
```

- [ ] **Create `src/app/admin/events/_components/EventForm.tsx`**

Form fields: slug (auto from title), title, organizer, date (date input), end_date (date input, optional), location, country (text), format (select: in-person/online/hybrid), theme[] (same pill checkboxes as OpportunityForm), description (textarea), link (url), image (url, optional), featured (checkbox).

Zod schema:
```typescript
const schema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  organizer: z.string().min(1),
  date: z.string().min(1),
  end_date: z.string().optional().nullable(),
  location: z.string().min(1),
  country: z.string().min(1),
  format: z.enum(['in-person', 'online', 'hybrid']),
  theme: z.array(z.enum(THEMES)).min(1),
  description: z.string().min(1),
  link: z.string().url(),
  image: z.string().optional().nullable(),
  featured: z.boolean(),
})
```

Follow the exact same form pattern as `OpportunityForm`. On submit call `createEvent` / `updateEvent`.

- [ ] **Create `src/app/admin/events/new/page.tsx`** (same pattern as opportunities/new)
- [ ] **Create `src/app/admin/events/[id]/page.tsx`** (same pattern as opportunities/[id], query `events` table)

- [ ] **TypeScript check:** `npx tsc --noEmit` → zero errors.

---

## Task 11: Resources admin CRUD

**Files:**
- Create: `src/app/admin/_actions/resources.ts`
- Create: `src/app/admin/resources/page.tsx`
- Create: `src/app/admin/resources/_components/ResourceForm.tsx`
- Create: `src/app/admin/resources/new/page.tsx`
- Create: `src/app/admin/resources/[id]/page.tsx`

- [ ] **Create `src/app/admin/_actions/resources.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface ResourceInput {
  slug: string
  title: string
  type: string
  theme: string
  published_at: string
  author: string | null
  description: string
  link: string
  image: string | null
  featured: boolean
  tags: string[] | null
}

export async function createResource(input: ResourceInput) {
  const supabase = await createClient()
  const { error } = await supabase.from('resources').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/resources')
  revalidatePath('/en/knowledge')
  revalidatePath('/ar/knowledge')
  redirect('/admin/resources')
}

export async function updateResource(id: string, input: ResourceInput) {
  const supabase = await createClient()
  const { error } = await supabase.from('resources').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/resources')
  revalidatePath('/en/knowledge')
  revalidatePath('/ar/knowledge')
  redirect('/admin/resources')
}

export async function deleteResource(id: string) {
  const supabase = await createClient()
  await supabase.from('resources').delete().eq('id', id)
  revalidatePath('/admin/resources')
  revalidatePath('/en/knowledge')
  revalidatePath('/ar/knowledge')
}
```

- [ ] **Create `src/app/admin/resources/page.tsx`** — list with columns: title, type, theme, published_at, featured. Use `deleteResource` action.

- [ ] **Create `src/app/admin/resources/_components/ResourceForm.tsx`**

Form fields: slug (auto from title), title, type (select: report/guide/article/toolkit/video/podcast), theme (single select dropdown from THEMES — not array), published_at (date input), author (optional), description (textarea), link (url), image (url, optional), featured (checkbox), tags (comma-separated, split on save → string[]).

Zod schema:
```typescript
const schema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  type: z.enum(['report', 'guide', 'article', 'toolkit', 'video', 'podcast']),
  theme: z.enum(THEMES),
  published_at: z.string().min(1),
  author: z.string().optional().nullable(),
  description: z.string().min(1),
  link: z.string().url(),
  image: z.string().optional().nullable(),
  featured: z.boolean(),
  tags: z.string().optional(),
})
```

Note: `theme` is a single select `<select>` element (not checkboxes) since resources have one theme. On submit: `tags` string → split by comma into `string[] | null`.

- [ ] **Create `src/app/admin/resources/new/page.tsx`** and **`src/app/admin/resources/[id]/page.tsx`** (same pattern).
- [ ] **TypeScript check:** `npx tsc --noEmit` → zero errors.

---

## Task 12: Directory admin CRUD

**Files:**
- Create: `src/app/admin/_actions/directory.ts`
- Create: `src/app/admin/directory/page.tsx`
- Create: `src/app/admin/directory/_components/DirectoryForm.tsx`
- Create: `src/app/admin/directory/new/page.tsx`
- Create: `src/app/admin/directory/[id]/page.tsx`

- [ ] **Create `src/app/admin/_actions/directory.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface DirectoryInput {
  slug: string
  name: string
  type: string
  country: string
  city: string | null
  description: string
  themes: string[]
  website: string | null
  email: string | null
  logo: string | null
  verified: boolean
  tags: string[] | null
  founded: number | null
  members: number | null
}

export async function createDirectoryProfile(input: DirectoryInput) {
  const supabase = await createClient()
  const { error } = await supabase.from('directory_profiles').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/directory')
  revalidatePath('/en/ecosystem/directory')
  revalidatePath('/ar/ecosystem/directory')
  redirect('/admin/directory')
}

export async function updateDirectoryProfile(id: string, input: DirectoryInput) {
  const supabase = await createClient()
  const { error } = await supabase.from('directory_profiles').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/directory')
  revalidatePath('/en/ecosystem/directory')
  revalidatePath('/ar/ecosystem/directory')
  redirect('/admin/directory')
}

export async function deleteDirectoryProfile(id: string) {
  const supabase = await createClient()
  await supabase.from('directory_profiles').delete().eq('id', id)
  revalidatePath('/admin/directory')
  revalidatePath('/en/ecosystem/directory')
  revalidatePath('/ar/ecosystem/directory')
}
```

- [ ] **Create `src/app/admin/directory/page.tsx`** — list with columns: name, type, country, verified. Use `deleteDirectoryProfile`.

- [ ] **Create `src/app/admin/directory/_components/DirectoryForm.tsx`**

Form fields: slug (auto from name), name, type (select: ngo/youth-group/individual/institution/business), country (text), city (optional), themes[] (pill checkboxes like OpportunityForm), description (textarea), website (url, optional), email (email, optional), logo (url, optional), verified (checkbox), founded (number, optional), members (number, optional), tags (comma-separated, optional).

- [ ] **Create `src/app/admin/directory/new/page.tsx`** and **`src/app/admin/directory/[id]/page.tsx`**.
- [ ] **TypeScript check:** `npx tsc --noEmit` → zero errors.

---

## Task 13: Partners admin CRUD

**Files:**
- Create: `src/app/admin/_actions/partners.ts`
- Create: `src/app/admin/partners/page.tsx`
- Create: `src/app/admin/partners/_components/PartnerForm.tsx`
- Create: `src/app/admin/partners/new/page.tsx`
- Create: `src/app/admin/partners/[id]/page.tsx`

Note: `partners` table uses `id text primary key` (not uuid). The `id` field is manually set by the admin (a short slug like `"undp"` or `"wwf"`). The form includes an `id` field.

- [ ] **Create `src/app/admin/_actions/partners.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface PartnerInput {
  id: string
  name: string
  logo: string
  website: string | null
  tier: string
  country: string | null
}

export async function createPartner(input: PartnerInput) {
  const supabase = await createClient()
  const { error } = await supabase.from('partners').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/partners')
  revalidatePath('/en')
  revalidatePath('/ar')
  revalidatePath('/en/about')
  revalidatePath('/ar/about')
  redirect('/admin/partners')
}

export async function updatePartner(id: string, input: PartnerInput) {
  const supabase = await createClient()
  const { error } = await supabase.from('partners').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/partners')
  revalidatePath('/en')
  revalidatePath('/ar')
  revalidatePath('/en/about')
  revalidatePath('/ar/about')
  revalidatePath('/en/impact')
  revalidatePath('/ar/impact')
  redirect('/admin/partners')
}

export async function deletePartner(id: string) {
  const supabase = await createClient()
  await supabase.from('partners').delete().eq('id', id)
  revalidatePath('/admin/partners')
  revalidatePath('/en')
  revalidatePath('/ar')
}
```

- [ ] **Create `src/app/admin/partners/page.tsx`** — columns: name, tier, country.
- [ ] **Create `src/app/admin/partners/_components/PartnerForm.tsx`**

Form fields: id (text, manual slug — disable when editing), name, logo (url), website (url, optional), tier (select: strategic/program/media/community), country (text, optional).

- [ ] **Create `src/app/admin/partners/new/page.tsx`** and **`src/app/admin/partners/[id]/page.tsx`**.
- [ ] **TypeScript check:** `npx tsc --noEmit` → zero errors.

---

## Task 14: Team admin CRUD

**Files:**
- Create: `src/app/admin/_actions/team.ts`
- Create: `src/app/admin/team/page.tsx`
- Create: `src/app/admin/team/_components/TeamForm.tsx`
- Create: `src/app/admin/team/new/page.tsx`
- Create: `src/app/admin/team/[id]/page.tsx`

Note: `team_members` table uses `id text primary key` — manually set by admin.

- [ ] **Create `src/app/admin/_actions/team.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface TeamInput {
  id: string
  name: string
  name_ar: string | null
  role: string
  role_ar: string | null
  country: string
  bio: string | null
  avatar: string | null
  linkedin: string | null
}

export async function createTeamMember(input: TeamInput) {
  const supabase = await createClient()
  const { error } = await supabase.from('team_members').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/team')
  revalidatePath('/en/about')
  revalidatePath('/ar/about')
  redirect('/admin/team')
}

export async function updateTeamMember(id: string, input: TeamInput) {
  const supabase = await createClient()
  const { error } = await supabase.from('team_members').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/team')
  revalidatePath('/en/about')
  revalidatePath('/ar/about')
  redirect('/admin/team')
}

export async function deleteTeamMember(id: string) {
  const supabase = await createClient()
  await supabase.from('team_members').delete().eq('id', id)
  revalidatePath('/admin/team')
  revalidatePath('/en/about')
  revalidatePath('/ar/about')
}
```

- [ ] **Create `src/app/admin/team/page.tsx`** — columns: name, role, country.
- [ ] **Create `src/app/admin/team/_components/TeamForm.tsx`**

Form fields: id (text, disable when editing), name, name_ar (optional), role, role_ar (optional), country (text), bio (textarea, optional), avatar (url, optional), linkedin (url, optional).

- [ ] **Create `src/app/admin/team/new/page.tsx`** and **`src/app/admin/team/[id]/page.tsx`**.
- [ ] **TypeScript check:** `npx tsc --noEmit` → zero errors.

---

## Task 15: Stories admin CRUD

**Files:**
- Create: `src/app/admin/_actions/stories.ts`
- Create: `src/app/admin/stories/page.tsx`
- Create: `src/app/admin/stories/_components/StoryForm.tsx`
- Create: `src/app/admin/stories/new/page.tsx`
- Create: `src/app/admin/stories/[id]/page.tsx`

Note: `stories` table uses `id text primary key` — manually set by admin.

- [ ] **Create `src/app/admin/_actions/stories.ts`**

```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface StoryInput {
  id: string
  name: string
  role: string
  role_ar: string | null
  country: string
  quote: string
  quote_ar: string | null
  avatar: string | null
  opportunity_title: string | null
}

export async function createStory(input: StoryInput) {
  const supabase = await createClient()
  const { error } = await supabase.from('stories').insert(input)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/stories')
  revalidatePath('/en/impact')
  revalidatePath('/ar/impact')
  redirect('/admin/stories')
}

export async function updateStory(id: string, input: StoryInput) {
  const supabase = await createClient()
  const { error } = await supabase.from('stories').update(input).eq('id', id)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/stories')
  revalidatePath('/en/impact')
  revalidatePath('/ar/impact')
  redirect('/admin/stories')
}

export async function deleteStory(id: string) {
  const supabase = await createClient()
  await supabase.from('stories').delete().eq('id', id)
  revalidatePath('/admin/stories')
  revalidatePath('/en/impact')
  revalidatePath('/ar/impact')
}
```

- [ ] **Create `src/app/admin/stories/page.tsx`** — columns: name, role, country.
- [ ] **Create `src/app/admin/stories/_components/StoryForm.tsx`**

Form fields: id (text, disable when editing), name, role, role_ar (optional), country (text), quote (textarea), quote_ar (textarea, optional), avatar (url, optional), opportunity_title (text, optional).

- [ ] **Create `src/app/admin/stories/new/page.tsx`** and **`src/app/admin/stories/[id]/page.tsx`**.
- [ ] **TypeScript check:** `npx tsc --noEmit` → zero errors.

---

## Task 16: Supabase query helpers for public pages

**Files:**
- Create: `src/lib/supabase/queries.ts`

This file replaces all the utility functions from `src/data/*.ts` with Supabase-backed async functions.

- [ ] **Create `src/lib/supabase/queries.ts`**

```typescript
import { createClient } from './server'
import type {
  Opportunity,
  Event,
  Resource,
  DirectoryProfile,
  Partner,
  TeamMember,
  Story,
} from '@/types'

// ── Opportunities ─────────────────────────────────────────────────────────────

export async function getOpportunities(filters?: {
  type?: string
  theme?: string
  format?: string
  funded?: boolean
}): Promise<Opportunity[]> {
  const supabase = await createClient()
  let query = supabase
    .from('opportunities')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.type) query = query.eq('type', filters.type)
  if (filters?.theme) query = query.contains('theme', [filters.theme])
  if (filters?.format) query = query.eq('format', filters.format)
  if (filters?.funded) query = query.eq('funded', true)

  const { data } = await query
  return (data ?? []).map(mapOpportunity)
}

export async function getFeaturedOpportunities(count = 4): Promise<Opportunity[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('opportunities')
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(count)
  return (data ?? []).map(mapOpportunity)
}

export async function getOpportunityBySlug(slug: string): Promise<Opportunity | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('opportunities')
    .select('*')
    .eq('slug', slug)
    .single()
  return data ? mapOpportunity(data) : null
}

function mapOpportunity(row: Record<string, unknown>): Opportunity {
  const { start_date, ...rest } = row
  return { ...rest, startDate: start_date } as unknown as Opportunity
}

// ── Events ────────────────────────────────────────────────────────────────────

export async function getUpcomingEvents(): Promise<Event[]> {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]
  const { data } = await supabase
    .from('events')
    .select('*')
    .gte('date', today)
    .order('date', { ascending: true })
  return (data ?? []).map(mapEvent)
}

export async function getPastEvents(): Promise<Event[]> {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]
  const { data } = await supabase
    .from('events')
    .select('*')
    .lt('date', today)
    .order('date', { ascending: false })
  return (data ?? []).map(mapEvent)
}

export async function getFeaturedEvents(count = 4): Promise<Event[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('events')
    .select('*')
    .eq('featured', true)
    .order('date', { ascending: true })
    .limit(count)
  return (data ?? []).map(mapEvent)
}

function mapEvent(row: Record<string, unknown>): Event {
  const { end_date, ...rest } = row
  return { ...rest, endDate: end_date } as unknown as Event
}

// ── Resources ─────────────────────────────────────────────────────────────────

export async function getResources(filters?: {
  type?: string
  theme?: string
}): Promise<Resource[]> {
  const supabase = await createClient()
  let query = supabase
    .from('resources')
    .select('*')
    .order('published_at', { ascending: false })

  if (filters?.type) query = query.eq('type', filters.type)
  if (filters?.theme) query = query.eq('theme', filters.theme)

  const { data } = await query
  return (data ?? []).map(mapResource)
}

export async function getFeaturedResources(count = 3): Promise<Resource[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('resources')
    .select('*')
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(count)
  return (data ?? []).map(mapResource)
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from('resources')
    .select('*')
    .eq('slug', slug)
    .single()
  return data ? mapResource(data) : null
}

function mapResource(row: Record<string, unknown>): Resource {
  const { published_at, ...rest } = row
  return { ...rest, publishedAt: published_at } as unknown as Resource
}

// ── Directory ─────────────────────────────────────────────────────────────────

export async function getDirectoryProfiles(filters?: {
  type?: string
  theme?: string
  verified?: boolean
}): Promise<DirectoryProfile[]> {
  const supabase = await createClient()
  let query = supabase
    .from('directory_profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (filters?.type) query = query.eq('type', filters.type)
  if (filters?.theme) query = query.contains('themes', [filters.theme])
  if (filters?.verified) query = query.eq('verified', true)

  const { data } = await query
  return (data ?? []) as unknown as DirectoryProfile[]
}

// ── Partners ──────────────────────────────────────────────────────────────────

export async function getPartners(): Promise<Partner[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('partners').select('*').order('created_at')
  return (data ?? []) as unknown as Partner[]
}

// ── Team ──────────────────────────────────────────────────────────────────────

export async function getTeam(): Promise<TeamMember[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('team_members').select('*').order('created_at')
  return (data ?? []).map(mapTeamMember)
}

function mapTeamMember(row: Record<string, unknown>): TeamMember {
  const { name_ar, role_ar, ...rest } = row
  return { ...rest, nameAr: name_ar, roleAr: role_ar } as unknown as TeamMember
}

// ── Stories ───────────────────────────────────────────────────────────────────

export async function getStories(): Promise<Story[]> {
  const supabase = await createClient()
  const { data } = await supabase.from('stories').select('*').order('created_at')
  return (data ?? []).map(mapStory)
}

function mapStory(row: Record<string, unknown>): Story {
  const { role_ar, quote_ar, opportunity_title, ...rest } = row
  return {
    ...rest,
    roleAr: role_ar,
    quoteAr: quote_ar,
    opportunityTitle: opportunity_title,
  } as unknown as Story
}
```

- [ ] **TypeScript check:** `npx tsc --noEmit` → zero errors.

---

## Task 17: Migrate public pages to Supabase queries

**Files to modify:**
- `src/app/[locale]/ecosystem/opportunities/page.tsx`
- `src/app/[locale]/ecosystem/opportunities/[slug]/page.tsx`
- `src/app/[locale]/ecosystem/events/page.tsx`
- `src/app/[locale]/knowledge/page.tsx`
- `src/app/[locale]/knowledge/[slug]/page.tsx`
- `src/app/[locale]/ecosystem/directory/page.tsx`
- `src/app/[locale]/about/page.tsx`
- `src/app/[locale]/impact/page.tsx`
- `src/components/home/EcosystemPreview.tsx`
- `src/components/home/KnowledgePreview.tsx`
- `src/components/home/StoriesSection.tsx`
- `src/components/home/PartnersSection.tsx`
- `src/data/events.ts`, `src/data/resources.ts`, `src/data/directory.ts`, `src/data/opportunities.ts`, `src/data/partners.ts`, `src/data/team.ts`, `src/data/stories.ts`

### Step 17a — Remove utility functions from data files

For each file in `src/data/`, delete every function export, keeping only the empty array export. Example result for `src/data/opportunities.ts`:

```typescript
import type { Opportunity } from '@/types'
export const opportunities: Opportunity[] = []
```

Do the same for events.ts, resources.ts, directory.ts, partners.ts, team.ts, stories.ts.

### Step 17b — Update `src/app/[locale]/ecosystem/opportunities/page.tsx`

Replace lines 10–11 (static import) and lines 31–37 (filter logic) with Supabase:

```typescript
// Replace this:
import { opportunities } from '@/data/opportunities'
// ...
const filtered = opportunities.filter((opp) => { ... })

// With this (at the top of the file, add):
import { getOpportunities } from '@/lib/supabase/queries'

// And in the component function, replace the filter block with:
const filtered = await getOpportunities({
  type: filters.type,
  theme: filters.theme,
  format: filters.format,
  funded: filters.funded === '1',
})
```

Also replace `opportunities.length` with `filtered.length` in the `<OpportunityFilters total={...} />` prop — since we no longer have the total unfiltered count as a separate variable, pass `filtered.length` for both `total` and `filtered` for now, or do a separate `getOpportunities()` call without filters to get total.

The correct approach: add one extra query for total count:
```typescript
const [allOpps, filtered] = await Promise.all([
  getOpportunities(),
  getOpportunities({ type: filters.type, theme: filters.theme, format: filters.format, funded: filters.funded === '1' }),
])
// Then: <OpportunityFilters total={allOpps.length} filtered={filtered.length} />
```

### Step 17c — Update `src/app/[locale]/ecosystem/events/page.tsx`

```typescript
// Replace:
import { events } from '@/data/events'
// and the filter/sort logic

// With:
import { getUpcomingEvents, getPastEvents } from '@/lib/supabase/queries'

// In component:
const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()])
```

Remove the manual `.filter()` and `.sort()` calls — the query functions handle this.

### Step 17d — Update `src/app/[locale]/knowledge/page.tsx`

```typescript
// Replace:
import { resources } from '@/data/resources'

// With:
import { getResources, getFeaturedResources } from '@/lib/supabase/queries'

// In component:
const [allResources, filtered, featuredArr] = await Promise.all([
  getResources(),
  getResources({ type: filters.type, theme: filters.theme }),
  getFeaturedResources(1),
])
const featured = featuredArr[0] ?? null
// Pass: <KnowledgeFilters total={allResources.length} filtered={filtered.length} />
```

### Step 17e — Update `src/app/[locale]/ecosystem/directory/page.tsx`

```typescript
// Replace:
import { directoryProfiles } from '@/data/directory'

// With:
import { getDirectoryProfiles } from '@/lib/supabase/queries'

// In component:
const [allProfiles, filtered] = await Promise.all([
  getDirectoryProfiles(),
  getDirectoryProfiles({ type: filters.type, theme: filters.theme, verified: filters.verified === '1' }),
])
// Pass: <DirectoryFilters total={allProfiles.length} filtered={filtered.length} />
```

### Step 17f — Update `src/app/[locale]/about/page.tsx`

```typescript
// Replace:
import { team } from '@/data/team'
import { partners } from '@/data/partners'

// With:
import { getTeam, getPartners } from '@/lib/supabase/queries'

// In component:
const [team, allPartners] = await Promise.all([getTeam(), getPartners()])
const strategic = allPartners.filter((p) => p.tier === 'strategic' || p.tier === 'program')
```

### Step 17g — Update `src/app/[locale]/impact/page.tsx`

```typescript
// Replace:
import { stories } from '@/data/stories'
import { partners } from '@/data/partners'

// With:
import { getStories, getPartners } from '@/lib/supabase/queries'

// In component:
const [stories, allPartners] = await Promise.all([getStories(), getPartners()])
const strategic = allPartners.filter((p) => p.tier === 'strategic' || p.tier === 'program')
```

### Step 17h — Update homepage sections

**`src/components/home/EcosystemPreview.tsx`:**
```typescript
// Replace:
import { getFeaturedOpportunities } from '@/data/opportunities'
// With:
import { getFeaturedOpportunities } from '@/lib/supabase/queries'

// Add await to the call (line 14):
const featured = await getFeaturedOpportunities(3)
```

Note: The Directory and Events columns in EcosystemPreview are static promo cards (translation strings only, no live data). Only the opportunities list needs migrating.

**`src/components/home/KnowledgePreview.tsx`:**
```typescript
// Replace:
import { getFeaturedResources } from '@/data/resources'
// With:
import { getFeaturedResources } from '@/lib/supabase/queries'
// Usage stays the same: const featured = await getFeaturedResources(3)
```

**`src/components/home/StoriesSection.tsx`:**
```typescript
// Replace:
import { stories } from '@/data/stories'
// With:
import { getStories } from '@/lib/supabase/queries'
// In function:
const allStories = await getStories()
const featured = allStories.slice(0, 3)
```

**`src/components/home/PartnersSection.tsx`:**
```typescript
// Replace:
import { partners } from '@/data/partners'
// With:
import { getPartners } from '@/lib/supabase/queries'
// In function:
const allPartners = await getPartners()
const strategic = allPartners.filter((p) => p.tier === 'strategic' || p.tier === 'program')
```

### Step 17i — Update slug pages

**`src/app/[locale]/ecosystem/opportunities/[slug]/page.tsx`:** Read the current file, replace `getOpportunityBySlug(slug)` import from `@/data/opportunities` with import from `@/lib/supabase/queries`.

**`src/app/[locale]/knowledge/[slug]/page.tsx`:** Same — replace `getResourceBySlug(slug)` from `@/data/resources` with `@/lib/supabase/queries`.

### Step 17j — Final TypeScript check and build

```
npx tsc --noEmit
```
Expected: zero errors.

```
npm run build
```
Expected: build succeeds, all pages generated.

---

## Summary of new files created

```
src/middleware.ts
src/lib/supabase/server.ts
src/lib/supabase/client.ts
src/lib/supabase/queries.ts
src/app/admin/layout.tsx
src/app/admin/page.tsx
src/app/admin/login/page.tsx
src/app/admin/_components/AdminSidebar.tsx
src/app/admin/_components/AdminTable.tsx
src/app/admin/_components/DeleteButton.tsx
src/app/admin/_actions/opportunities.ts
src/app/admin/_actions/events.ts
src/app/admin/_actions/resources.ts
src/app/admin/_actions/directory.ts
src/app/admin/_actions/partners.ts
src/app/admin/_actions/team.ts
src/app/admin/_actions/stories.ts
src/app/admin/opportunities/page.tsx
src/app/admin/opportunities/new/page.tsx
src/app/admin/opportunities/[id]/page.tsx
src/app/admin/opportunities/_components/OpportunityForm.tsx
src/app/admin/events/page.tsx
src/app/admin/events/new/page.tsx
src/app/admin/events/[id]/page.tsx
src/app/admin/events/_components/EventForm.tsx
src/app/admin/resources/page.tsx
src/app/admin/resources/new/page.tsx
src/app/admin/resources/[id]/page.tsx
src/app/admin/resources/_components/ResourceForm.tsx
src/app/admin/directory/page.tsx
src/app/admin/directory/new/page.tsx
src/app/admin/directory/[id]/page.tsx
src/app/admin/directory/_components/DirectoryForm.tsx
src/app/admin/partners/page.tsx
src/app/admin/partners/new/page.tsx
src/app/admin/partners/[id]/page.tsx
src/app/admin/partners/_components/PartnerForm.tsx
src/app/admin/team/page.tsx
src/app/admin/team/new/page.tsx
src/app/admin/team/[id]/page.tsx
src/app/admin/team/_components/TeamForm.tsx
src/app/admin/stories/page.tsx
src/app/admin/stories/new/page.tsx
src/app/admin/stories/[id]/page.tsx
src/app/admin/stories/_components/StoryForm.tsx
```
