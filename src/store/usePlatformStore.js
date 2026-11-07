import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { categories } from '../data/categories';
import { vendors } from '../data/vendors';
import { products } from '../data/products';
import { ROLES } from './useAuthStore';

/* ------------------------------------------------------------------ */
/*  Permission matrix                                                  */
/* ------------------------------------------------------------------ */
export const MODULES = [
  { key: 'orders', label: 'Orders' },
  { key: 'products', label: 'Products & Catalogue' },
  { key: 'customers', label: 'Customers' },
  { key: 'support', label: 'Support Tickets' },
  { key: 'vendors', label: 'Vendors' },
  { key: 'applications', label: 'Vendor Applications' },
  { key: 'payouts', label: 'Vendor Payouts' },
  { key: 'reports', label: 'Reports & Analytics' },
];
export const ACTIONS = ['view', 'create', 'edit', 'delete', 'approve'];

const row = (view, create, edit, del, approve) => ({ view, create, edit, delete: del, approve });

const DEFAULT_PERMISSIONS = {
  [ROLES.ADMIN]: {
    orders: row(true, true, true, false, true),
    products: row(true, true, true, false, true),
    customers: row(true, false, true, false, false),
    support: row(true, true, true, false, true),
    vendors: row(true, true, true, false, true),
    applications: row(true, true, true, false, true),
    payouts: row(true, false, true, false, true),
    reports: row(true, false, false, false, false),
  },
  // Vendor partners only ever see their OWN store data; this row is kept for API parity.
  [ROLES.PARTNERSHIP_MANAGER]: {
    orders: row(true, false, false, false, false),
    products: row(true, false, false, false, false),
    customers: row(false, false, false, false, false),
    support: row(false, false, false, false, false),
    vendors: row(true, true, true, false, true),
    applications: row(true, true, true, false, true),
    payouts: row(true, false, true, false, true),
    reports: row(true, false, false, false, false),
  },
};

/* ------------------------------------------------------------------ */
/*  Seed data                                                          */
/* ------------------------------------------------------------------ */
const CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Pune', 'Jaipur', 'Kolkata', 'Chennai', 'Lucknow', 'Ahmedabad'];
const NAMES = ['Aarav Shah', 'Isha Reddy', 'Vikram Singh', 'Ananya Iyer', 'Rahul Gupta', 'Meera Nair', 'Karan Joshi', 'Pooja Desai', 'Siddharth Rao', 'Tanvi Kulkarni', 'Aditya Bose', 'Riya Chawla'];
const ORDER_STATUSES = ['Placed', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Return Requested'];

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

const seedOrders = () =>
  Array.from({ length: 24 }, (_, i) => {
    const p = products[(i * 37) % products.length];
    const qty = (i % 3) + 1;
    return {
      id: `MF-${24810 + i}`,
      customer: NAMES[i % NAMES.length],
      city: CITIES[i % CITIES.length],
      product: p.title,
      vendor: p.vendorName,
      vendorId: p.vendorId,
      productId: p.id,
      image: p.primaryImage,
      department: categories.find((c) => c.slug === p.category)?.name || p.category,
      amount: p.price * qty,
      qty,
      payment: i % 4 === 0 ? 'COD' : 'Prepaid',
      status: ORDER_STATUSES[[0, 1, 2, 3, 3, 2, 0, 5, 3, 4, 1, 3, 2, 0, 3, 3, 1, 2, 0, 0, 1, 3, 2, 3][i]],
      date: daysAgo(Math.floor(i / 2)),
    };
  });

const seedProductQueue = () =>
  Array.from({ length: 10 }, (_, i) => {
    const p = products[(i * 53 + 11) % products.length];
    return {
      id: p.id,
      title: p.title,
      image: p.primaryImage,
      vendor: p.vendorName,
      vendorId: p.vendorId,
      productId: p.id,
      image: p.primaryImage,
      department: categories.find((c) => c.slug === p.category)?.name || p.category,
      price: p.price,
      status: i < 6 ? 'Pending' : i < 8 ? 'Approved' : 'Rejected',
      submitted: daysAgo(i),
    };
  });

const seedCustomers = () =>
  NAMES.map((name, i) => ({
    id: `CU-${1001 + i}`,
    name,
    email: `${name.split(' ')[0].toLowerCase()}@gmail.com`,
    city: CITIES[i % CITIES.length],
    orders: 2 + ((i * 7) % 19),
    spend: 4200 + ((i * 13729) % 92000),
    status: i === 4 || i === 9 ? 'Blocked' : 'Active',
    joined: daysAgo(30 + i * 21),
  }));

const seedTickets = () => [
  { id: 'TK-501', subject: 'Order not delivered yet', customer: 'Isha Reddy', priority: 'High', status: 'Open', date: daysAgo(0) },
  { id: 'TK-502', subject: 'Wrong size received – need exchange', customer: 'Karan Joshi', priority: 'Medium', status: 'Open', date: daysAgo(1) },
  { id: 'TK-503', subject: 'Refund not credited', customer: 'Meera Nair', priority: 'High', status: 'In Progress', date: daysAgo(1) },
  { id: 'TK-504', subject: 'Coupon code not applying', customer: 'Aarav Shah', priority: 'Low', status: 'Open', date: daysAgo(2) },
  { id: 'TK-505', subject: 'Want to change delivery address', customer: 'Tanvi Kulkarni', priority: 'Medium', status: 'Resolved', date: daysAgo(3) },
  { id: 'TK-506', subject: 'Damaged packaging', customer: 'Riya Chawla', priority: 'Medium', status: 'In Progress', date: daysAgo(4) },
];

export const APPLICATION_STAGES = ['New', 'Documents Review', 'KYC Verified', 'Approved', 'Rejected'];

const seedApplications = () => [
  { id: 'AP-301', business: 'Kashi Silk House', owner: 'Mohit Agarwal', phone: '+91 98111 22334', email: 'mohit@kashisilk.in', city: 'Varanasi', department: "Women's Fashion", gst: '09ABCDE1234F1Z5', skus: 120, stage: 'New', date: daysAgo(0) },
  { id: 'AP-302', business: 'UrbanSole Footwear', owner: 'Sana Qureshi', phone: '+91 99200 11223', email: 'sana@urbansole.in', city: 'Agra', department: 'Footwear', gst: '09PQRSX5678K1Z2', skus: 64, stage: 'New', date: daysAgo(1) },
  { id: 'AP-303', business: 'VoltEdge Audio', owner: 'Nikhil Menon', phone: '+91 98450 66778', email: 'nikhil@voltedge.in', city: 'Bengaluru', department: 'Electronics & Audio', gst: '29LMNOP4321Q1Z8', skus: 38, stage: 'Documents Review', date: daysAgo(2) },
  { id: 'AP-304', business: 'Ghar Craft Kitchen', owner: 'Priya Sharma', phone: '+91 97650 44556', email: 'priya@gharcraft.in', city: 'Pune', department: 'Home & Kitchen', gst: '27GHIJK8765L1Z3', skus: 210, stage: 'Documents Review', date: daysAgo(3) },
  { id: 'AP-305', business: 'FitNation Gear', owner: 'Harsh Patel', phone: '+91 98980 99887', email: 'harsh@fitnation.in', city: 'Ahmedabad', department: 'Sports & Fitness', gst: '24RSTUV2468M1Z1', skus: 85, stage: 'KYC Verified', date: daysAgo(5) },
  { id: 'AP-306', business: 'Little Lotus Toys', owner: 'Divya Krishnan', phone: '+91 94440 33221', email: 'divya@littlelotus.in', city: 'Chennai', department: 'Kids & Toys', gst: '33WXYZA1357N1Z6', skus: 140, stage: 'KYC Verified', date: daysAgo(6) },
  { id: 'AP-307', business: 'Glow Botanica', owner: 'Ritika Bansal', phone: '+91 98720 55443', email: 'ritika@glowbotanica.in', city: 'Chandigarh', department: 'Beauty & Personal Care', gst: '04BCDEF9753P1Z4', skus: 52, stage: 'Rejected', date: daysAgo(9), note: 'GST certificate mismatch' },
];

const seedPartnerVendors = () =>
  vendors.map((v, i) => ({
    id: v.id,
    name: v.name,
    slug: v.slug,
    logo: v.logo,
    city: v.location,
    rating: v.rating,
    products: v.metrics?.productsCount || 20,
    gmv: 180000 + ((i * 271331) % 1650000),
    commission: [12, 10, 15, 12, 8, 12, 10, 14, 12, 9, 11, 12, 13, 10][i % 14],
    status: i === 11 ? 'Suspended' : 'Active',
    fulfillment: v.metrics?.fulfillmentRate || '98%',
    joined: v.joinedDate,
  }));

const seedPayouts = (pv) => [
  ...['14 Oct – 20 Oct', '7 Oct – 13 Oct', '30 Sep – 6 Oct'].map((period, i) => ({
    id: `PO-76${90 + i}`,
    vendorId: pv[0].id,
    vendor: pv[0].name,
    period,
    gross: [212400, 187650, 196300][i],
    commission: Math.round([212400, 187650, 196300][i] * (pv[0].commission / 100)),
    status: 'Paid',
  })),
  ...pv.slice(0, 9).map((v, i) => ({
    id: `PO-${7701 + i}`,
    vendorId: v.id,
    vendor: v.name,
    period: i < 5 ? '28 Oct – 3 Nov' : '21 Oct – 27 Oct',
    gross: Math.round(v.gmv / 6),
    commission: Math.round((v.gmv / 6) * (v.commission / 100)),
    status: i < 4 ? 'Pending' : i < 6 ? 'Processing' : 'Paid',
  })),
];

const seedAdmins = () => [
  { id: 'AD-1', name: 'Neha Kapoor', email: 'admin@mafth.in', role: ROLES.ADMIN, status: 'Active', lastActive: daysAgo(0) },
  { id: 'AD-2', name: 'Imran Sheikh', email: 'imran@mafth.in', role: ROLES.ADMIN, status: 'Active', lastActive: daysAgo(1) },
  { id: 'AD-5', name: 'Gaurav Mishra', email: 'gaurav@mafth.in', role: ROLES.ADMIN, status: 'Disabled', lastActive: daysAgo(24) },
];

const seedDepartments = () =>
  categories.map((c, i) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    image: c.image,
    products: c.count,
    enabled: true,
    commission: [12, 12, 10, 15, 12, 8, 10, 14, 10, 11][i % 10],
  }));

const seedAudit = () => [
  { id: 1, who: 'Arjun Malhotra', role: 'Super Admin', action: 'Updated default commission to 12%', at: daysAgo(1) },
  { id: 2, who: 'Neha Kapoor', role: 'Admin', action: 'Approved vendor "Rawat Heritage Weaves"', at: daysAgo(2) },
  { id: 3, who: 'Neha Kapoor', role: 'Admin', action: 'Marked order MF-24813 as Delivered', at: daysAgo(2) },
  { id: 4, who: 'Arjun Malhotra', role: 'Super Admin', action: 'Created admin account for Imran Sheikh', at: daysAgo(5) },
];

const buildSeed = () => {
  const partnerVendors = seedPartnerVendors();
  return {
    permissions: DEFAULT_PERMISSIONS,
    settings: {
      platformName: 'MAFTH',
      supportEmail: 'care@mafth.in',
      defaultCommission: 12,
      payoutCycle: 'Weekly',
      codEnabled: true,
      vendorSelfSignup: true,
      maintenanceMode: false,
    },
    departments: seedDepartments(),
    admins: seedAdmins(),
    orders: seedOrders(),
    productQueue: seedProductQueue(),
    customers: seedCustomers(),
    tickets: seedTickets(),
    applications: seedApplications(),
    partnerVendors,
    payouts: seedPayouts(partnerVendors),
    audit: seedAudit(),
    vendorProducts: [], // products created by vendors in their panel
    listingOverrides: {}, // { [productId]: { price, stock, active } } edits vendors make to existing listings
    storeProfiles: {
      'v-rawat-crafts': {
        tagline: 'Block-printed & handloom wear from Jaipur',
        description: vendors[0]?.description || '',
        dispatchDays: 1,
        returnDays: 7,
        bank: 'HDFC Bank •••• 4417',
        holidayMode: false,
      },
    },
  };
};

/* ------------------------------------------------------------------ */
/*  Store                                                              */
/* ------------------------------------------------------------------ */
export const usePlatformStore = create(
  persist(
    (set, get) => {
      const log = (actor, action) =>
        set((s) => ({
          audit: [
            { id: Date.now(), who: actor?.name || 'System', role: actor?.roleLabel || '', action, at: new Date().toISOString() },
            ...s.audit,
          ].slice(0, 60),
        }));

      return {
        ...buildSeed(),

        resetDemo: () => set(buildSeed()),

        /* Permissions */
        can: (role, module, action) => {
          if (role === ROLES.SUPER_ADMIN) return true;
          const p = get().permissions?.[role]?.[module];
          return !!(p && p.view && p[action]);
        },
        togglePermission: (role, module, action, actor) => {
          set((s) => {
            const current = s.permissions[role][module][action];
            return {
              permissions: {
                ...s.permissions,
                [role]: { ...s.permissions[role], [module]: { ...s.permissions[role][module], [action]: !current } },
              },
            };
          });
          log(actor, `Changed "${action}" on ${module} for ${role.replace('_', ' ')}`);
        },

        /* Settings & departments */
        updateSettings: (patch, actor) => {
          set((s) => ({ settings: { ...s.settings, ...patch } }));
          log(actor, `Updated platform settings (${Object.keys(patch).join(', ')})`);
        },
        toggleDepartment: (id, actor) => {
          const d = get().departments.find((x) => x.id === id);
          set((s) => ({ departments: s.departments.map((x) => (x.id === id ? { ...x, enabled: !x.enabled } : x)) }));
          log(actor, `${d.enabled ? 'Disabled' : 'Enabled'} department "${d.name}"`);
        },
        setDepartmentCommission: (id, commission) =>
          set((s) => ({ departments: s.departments.map((x) => (x.id === id ? { ...x, commission } : x)) })),

        /* Admin accounts */
        addAdmin: (data, actor) => {
          set((s) => ({
            admins: [{ id: `AD-${Date.now()}`, status: 'Active', lastActive: new Date().toISOString(), ...data }, ...s.admins],
          }));
          log(actor, `Created ${data.role.replace('_', ' ')} account for ${data.name}`);
        },
        toggleAdminStatus: (id, actor) => {
          const a = get().admins.find((x) => x.id === id);
          set((s) => ({
            admins: s.admins.map((x) => (x.id === id ? { ...x, status: x.status === 'Active' ? 'Disabled' : 'Active' } : x)),
          }));
          log(actor, `${a.status === 'Active' ? 'Disabled' : 'Enabled'} account of ${a.name}`);
        },
        removeAdmin: (id, actor) => {
          const a = get().admins.find((x) => x.id === id);
          set((s) => ({ admins: s.admins.filter((x) => x.id !== id) }));
          log(actor, `Removed account of ${a.name}`);
        },

        /* Orders */
        updateOrderStatus: (id, status, actor) => {
          set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) }));
          log(actor, `Marked order ${id} as ${status}`);
        },

        /* Product moderation */
        moderateProduct: (id, status, actor) => {
          const p = get().productQueue.find((x) => x.id === id);
          set((s) => ({
            productQueue: s.productQueue.map((x) => (x.id === id ? { ...x, status } : x)),
            vendorProducts: s.vendorProducts.map((x) => (x.id === id ? { ...x, status } : x)),
          }));
          log(actor, `${status} product "${p.title.slice(0, 40)}"`);
        },

        /* Customers */
        toggleCustomer: (id, actor) => {
          const c = get().customers.find((x) => x.id === id);
          set((s) => ({
            customers: s.customers.map((x) => (x.id === id ? { ...x, status: x.status === 'Active' ? 'Blocked' : 'Active' } : x)),
          }));
          log(actor, `${c.status === 'Active' ? 'Blocked' : 'Unblocked'} customer ${c.name}`);
        },

        /* Support */
        setTicketStatus: (id, status, actor) => {
          set((s) => ({ tickets: s.tickets.map((t) => (t.id === id ? { ...t, status } : t)) }));
          log(actor, `Set ticket ${id} to ${status}`);
        },

        /* Vendor applications */
        submitApplication: (data) =>
          set((s) => ({
            applications: [
              { id: `AP-${300 + s.applications.length + 1}`, stage: 'New', date: new Date().toISOString(), skus: Number(data.skus) || 0, ...data },
              ...s.applications,
            ],
          })),
        moveApplication: (id, stage, actor, note) => {
          const app = get().applications.find((a) => a.id === id);
          set((s) => ({ applications: s.applications.map((a) => (a.id === id ? { ...a, stage, note: note ?? a.note } : a)) }));
          if (stage === 'Approved' && !get().partnerVendors.some((v) => v.name === app.business)) {
            set((s) => ({
              partnerVendors: [
                {
                  id: `v-${app.id.toLowerCase()}`,
                  name: app.business,
                  slug: app.business.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                  logo: null,
                  city: app.city,
                  rating: 0,
                  products: app.skus,
                  gmv: 0,
                  commission: s.departments.find((d) => d.name === app.department)?.commission ?? s.settings.defaultCommission,
                  status: 'Active',
                  fulfillment: '—',
                  joined: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
                },
                ...s.partnerVendors,
              ],
            }));
          }
          log(actor, `Moved application "${app.business}" to ${stage}`);
        },

        /* Partner vendors */
        setVendorCommission: (id, commission, actor) => {
          const v = get().partnerVendors.find((x) => x.id === id);
          set((s) => ({ partnerVendors: s.partnerVendors.map((x) => (x.id === id ? { ...x, commission } : x)) }));
          log(actor, `Set commission of ${v.name} to ${commission}%`);
        },
        toggleVendor: (id, actor) => {
          const v = get().partnerVendors.find((x) => x.id === id);
          set((s) => ({
            partnerVendors: s.partnerVendors.map((x) =>
              x.id === id ? { ...x, status: x.status === 'Active' ? 'Suspended' : 'Active' } : x
            ),
          }));
          log(actor, `${v.status === 'Active' ? 'Suspended' : 'Re-activated'} vendor ${v.name}`);
        },

        /* Vendor self-service (Partnership Manager = vendor) */
        addVendorProduct: (data, actor) => {
          const id = `vp-${Date.now()}`;
          const dept = get().departments.find((d) => d.slug === data.category);
          const item = {
            id,
            title: data.title,
            category: data.category,
            price: Number(data.price),
            mrp: Number(data.mrp) || Number(data.price),
            stock: Number(data.stock) || 0,
            image: data.image,
            description: data.description,
            vendorId: data.vendorId,
            vendorName: data.vendorName,
            status: 'Pending',
            createdAt: new Date().toISOString(),
          };
          set((s) => ({
            vendorProducts: [item, ...s.vendorProducts],
            productQueue: [
              {
                id,
                title: item.title,
                image: item.image,
                vendor: item.vendorName,
                department: dept?.name || item.category,
                price: item.price,
                status: 'Pending',
                submitted: item.createdAt,
              },
              ...s.productQueue,
            ],
          }));
          log(actor, `Submitted new product "${item.title}" for approval`);
        },
        updateListing: (productId, patch) =>
          set((s) => ({
            listingOverrides: { ...s.listingOverrides, [productId]: { ...s.listingOverrides[productId], ...patch } },
          })),
        updateStoreProfile: (vendorId, patch, actor) => {
          set((s) => ({ storeProfiles: { ...s.storeProfiles, [vendorId]: { ...s.storeProfiles[vendorId], ...patch } } }));
          log(actor, 'Updated store profile');
        },

        /* Payouts */
        advancePayout: (id, actor) => {
          const p = get().payouts.find((x) => x.id === id);
          const next = p.status === 'Pending' ? 'Processing' : 'Paid';
          set((s) => ({ payouts: s.payouts.map((x) => (x.id === id ? { ...x, status: next } : x)) }));
          log(actor, `Payout ${id} (${p.vendor}) → ${next}`);
        },
      };
    },
    { name: 'mafth-platform-v2' }
  )
);
