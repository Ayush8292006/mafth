# MAFTH — Multi-Vendor Marketplace (Frontend)

React + Vite + Tailwind prototype of a multi-vendor marketplace with **10 departments** and **4 roles**.
All data is mocked in Zustand stores (persisted in localStorage) so every dashboard action works in the demo.

## Run

```bash
npm install
npm run dev
```

## The 4 roles

| # | Role | URL | What they do |
|---|------|-----|--------------|
| 1 | **Super Admin** | `/super-admin` | Everything: staff accounts, roles & permission matrix, 10 departments + commission, platform settings, activity log, plus all Admin and Partnership screens |
| 2 | **Admin** | `/admin` | Orders, product approvals, customers, support tickets (limited by the permissions the Super Admin sets) |
| 3 | **Partnership Manager** | `/partner` | Vendor applications pipeline (KYC), vendor accounts & commission, vendor payouts |
| 4 | **User / Customer** | `/` | Storefront: browse, cart, wishlist, checkout, profile |

Public vendor sign-up page: `/partner-with-us` — submissions appear in the Partnership Manager's Applications board.

### Demo logins (`/login`)

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@mafth.in | super@123 |
| Admin | admin@mafth.in | admin@123 |
| Partnership Manager | partners@mafth.in | partner@123 |
| Customer | kabir.mehta@mafth.in | user@123 |

The login page also has one-click "enter as" cards for each role.
Super Admin → Settings → **Reset demo data** restores the seed data.

## Brand theme — "Emerald & Marigold"

- `brand` (deep emerald) `#0A5A41` — header band, buttons, sidebar, links
- `marigold` `#FFC21F` — deals, badges, CTAs, highlights
- `mist` — cool neutral surfaces and borders
- Fonts: **Bricolage Grotesque** (headings) + **Plus Jakarta Sans** (UI)
- Logo: same MAFTH letterforms — "MAF" marigold, "TH" white on an emerald tile (no pink anywhere)

Tokens live in `tailwind.config.js`; shared button/input classes (`btn-primary`, `btn-accent`, `btn-ghost`, `input`) in `src/index.css`.

## Structure

```
src/
  store/useAuthStore.js       roles, demo accounts, login/logout
  store/usePlatformStore.js   permissions matrix + all dashboard mock data/actions
  components/auth/RequireRole.jsx
  components/dashboard/       DashboardLayout + shared UI (StatCard, Panel, Table, Toggle…)
  pages/super-admin/          Overview, Team, Roles, Departments, Settings, Audit
  pages/admin/                Overview, Orders, Products, Customers, Support
  pages/partner/              Overview, Applications, Vendors, Payouts
  pages/store/                Storefront pages + PartnerWithUsPage
```

## Backend hand-off

Replace `login()` in `useAuthStore` with the real auth API (return the user's role), and swap the actions in
`usePlatformStore` for API calls. The `can(role, module, action)` matrix maps 1:1 to a backend RBAC table.
