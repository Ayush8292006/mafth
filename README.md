# MAFTH — Multi-Vendor Indian Marketplace Platform

A production-grade, multi-vendor e-commerce platform front-end inspired by Amazon and Flipkart's scale, elevated with an editorial, minimal aesthetic (White, Black, and Beige) and curated Indian craftsmanship.

---

## Brand & Design System

- **Brand Name**: MAFTH
- **Logo Rule**: Bold serif wordmark **"MAF"** in yellow (`#FFE600`) and **"TH"** in white (`#FFFFFF`) on a hot-pink square tile (`#FF007A`). As specified, the logo is strictly rendered inside its pink tile everywhere (header chip, footer, loader, favicon, app icon) and never placed bare on a white background.
- **Color Palette**:
  - `--white`: `#FFFFFF` (Primary background)
  - `--beige-50`: `#FAF7F2` (Alternate sections, hero band)
  - `--beige-100`: `#F3EDE3` (Cards, chips, subtle badges)
  - `--beige-300`: `#E3D8C6` (1px thin dividers & borders)
  - `--beige-500`: `#B9A68A` (Muted accents, location icons)
  - `--black`: `#0B0B0B` (Text, headlines, primary buttons)
  - `--grey-600`: `#5E5A54` (Secondary text)
  - Status accents: `#1B873F` (Success), `#D32F2F` (Error), `#F59E0B` (Rating Gold). No gradients, neon, or AI aesthetic.
- **Typography**: Playfair Display (Serif) for headlines, Inter (Sans) for UI, with fluid `clamp()` sizing.
- **Photography**: 100% real studio photography across all 194 products and 14 Indian maker guilds.

---

## Quick Start & Running the Project

```bash
# 1. Install dependencies
npm install

# 2. Launch Vite dev server
npm run dev

# 3. Production build
npm run build
```

The application runs on `http://localhost:3000`.

---

## Three Apps in One Codebase

The platform unifies three distinct user experiences:
1. **Customer Storefront** (`/`): Header with location/pincode selector, smart search, autosuggest, mega-menu, Deal of the Day live countdown, Flipkart-style circular category rails, top picks, bank offers, brand stores, trust badges, cart mini-drawer, and fixed mobile bottom tab bar.
2. **Vendor (Seller) Portal** (`/vendor`): Seller dashboard, KYC verification, dispatch SLA tracking, sales metrics, and product management.
3. **Admin + Sub-Admin RBAC Control** (`/admin`): Super Admin overview, Gross Merchandise Value, vendor moderation, and fine-grained Role-Based Access Control matrix.

> **Role Switcher for Review**: Use the **"Demo Mode"** dropdown located in the top utility bar of the header to switch between Customer, Vendor, Super Admin, and Sub-Admin views instantly.

---

## How to Customize Data & Design

### 1. Changing Images (`src/data/images.js`)
All curated studio photography collections, hero banners, and category assets are organized in `src/data/images.js`. To replace any image:
- Edit the image URL strings in `studioImages.heroBanners`, `studioImages.mensFashion`, `studioImages.homeKitchen`, etc.
- Or place your local images into `/public/images/` and reference them as `/images/your-image.webp`.

### 2. Changing or Adding Products (`src/data/products.js`)
The catalogue contains **194 rich mock products** generated from `scripts/generate-products.js`. Each product includes:
- `id`, `title`, `slug`, `brand`, `vendorId`, `vendorName`, `category`, `subcategory`
- `price`, `mrp`, `discount`, `rating`, `reviewsCount`, `stock`
- `isDealOfTheDay`, `dealEndsInHours`, `isFeatured`, `isBestSeller`
- `images` (3-5 real photography URLs)
- `variants` (sizes, colors with hex swatches)
- `specs` (materials, technique, warranty, country of origin)
- `description` and `otherSellers` comparison array

You can edit items directly in `src/data/products.js` or run `node scripts/generate-products.js` to re-generate.

### 3. Changing Vendors (`src/data/vendors.js`)
Contains 14 verified regional Indian guilds (e.g. Rawat Heritage Weaves, The Leather Atelier, Studio Mitti Ceramics, Aura Tech & Acoustics, Varanasi Silk Guild).
- Update vendor names, logos, banners, ratings, locations, joined dates, and metrics in `src/data/vendors.js`.

### 4. Customizing Colors & Theme (`tailwind.config.js` and `src/index.css`)
- Colors are declared via CSS variables in `src/index.css` and extended in `tailwind.config.js`.
- Simply modify the hex values of `beige`, `black`, or `status` colors to update the entire application systematically.

---

## Build Phases Roadmap

- [x] **Phase 1: Design System, Header/Footer, Home Page, Mobile Tab Bar** (COMPLETED)
- [ ] **Phase 2: Product Listing, Advanced Filters, Product Detail Page, Cart & Checkout**
- [ ] **Phase 3: Multi-Vendor Seller Portal & Product Management**
- [ ] **Phase 4: Super Admin & Sub-Admin RBAC Permission Matrix**
- [ ] **Phase 5: Performance Polish, GSAP/Lenis Enhancements, PWA**

