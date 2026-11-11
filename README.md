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
| 2 | **Admin** | `/admin` | Vendor applications (KYC → approve), vendors & commission, vendor payouts, product approvals, orders, customers, support (limited by the permissions the Super Admin sets) |
| 3 | **Partnership Manager = Vendor Partner** | `/partner` | Seller Panel — each vendor runs **their own shop**: add products (go live after Admin approval), edit price/stock, pack & ship their orders, earnings & payouts, store profile |
| 4 | **User / Customer** | `/` | Storefront: browse all shops, compare sellers, one cart split into per-seller packages |

### Multi-vendor flow
1. A seller applies on `/partner-with-us` → appears in **Admin → Vendor Applications**
2. Admin verifies KYC and approves → vendor is created and gets a Seller Panel login
3. Vendor adds a product in **My Products** → **Admin → Product Approvals** → once approved it shows on the storefront
4. Customer buys from several shops in one cart → each vendor sees only their own order in **My Orders**
5. Payouts = vendor sales − MAFTH commission (per department / per vendor)

Storefront multi-vendor features: `/shops` directory, shop pages `/vendor/:slug`, "Sold by" on every product, "Also sold by other sellers" on product page, cart grouped by seller.

### Demo logins (`/login`)

| Role | Email | Password |
|------|-------|----------|
| Super Admin | superadmin@mafth.in | super@123 |
| Admin | admin@mafth.in | admin@123 |
| Partnership Manager (vendor: Rawat Heritage Weaves) | vendor@mafth.in | vendor@123 |
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
  pages/admin/                 + ApplicationsPage, VendorsPage, PayoutsPage (vendor network)
  pages/vendor/               Seller Panel: Overview, MyProducts, MyOrders, Earnings, StoreProfile
  pages/store/ShopsPage.jsx   vendor directory
  pages/store/                Storefront pages + PartnerWithUsPage
```

## Backend hand-off
<<<<<<< HEAD

Replace `login()` in `useAuthStore` with the real auth API (return the user's role), and swap the actions in
`usePlatformStore` for API calls. The `can(role, module, action)` matrix maps 1:1 to a backend RBAC table.

## Update — client changes (Nov 2026)
- Hero slider: 12 slides, auto-changes every 3 seconds
- Top bar: "Sell on MAFTH", "Help Centre" moved into the Account menu + Profile page; staff login link removed (staff use `/login`)
- Intro loader cycles through all 10 department names
- Department strip auto-scrolls right → left (pauses on hover), full names, "Upto X% off" badges
- Offers popup (New Launch, Top Brands, Mega Offer, Bank Deals, Free Delivery, Gift Store) — auto-opens once per session, reopen from the top-bar "Offers" button or floating Offers button
- Top 20 Buyers leaderboard: home section + `/leaderboard`; Admin → Top Buyers Leaderboard can show/hide it, hide buyers, toggle Instagram handles; customers add their Instagram handle on Profile / Leaderboard page
- Sell on MAFTH: commission & documents section removed; form has mobile OTP verification, PAN via DigiLocker, GSTIN optional
  - OTP & DigiLocker are **demo** — see `src/components/storefront/VendorApplicationForm.jsx` (top of file) for where real APIs plug in
=======

Replace `login()` in `useAuthStore` with the real auth API (return the user's role), and swap the actions in
`usePlatformStore` for API calls. The `can(role, module, action)` matrix maps 1:1 to a backend RBAC table.
>>>>>>> bc75d2a7e123e8022cd2ed0de1aa6593c9eb5191
