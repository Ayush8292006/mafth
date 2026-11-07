import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * MAFTH supports 4 roles:
 * 1. Super Admin         – owns the platform: admins, roles & permissions, commission, departments, settings
 * 2. Admin               – runs daily operations: orders, product moderation, customers, support
 *                          (limited by the permission matrix the Super Admin sets)
 * 3. Partnership Manager – brings vendors onto the platform: applications, KYC, vendor accounts, payouts
 * 4. User                – shops on the storefront: cart, wishlist, orders, addresses
 */
export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  PARTNERSHIP_MANAGER: 'partnership_manager',
  USER: 'user',
};

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Admin',
  [ROLES.ADMIN]: 'Admin',
  [ROLES.PARTNERSHIP_MANAGER]: 'Partnership Manager',
  [ROLES.USER]: 'Customer',
};

// Where each role lands after login
export const ROLE_HOME = {
  [ROLES.SUPER_ADMIN]: '/super-admin',
  [ROLES.ADMIN]: '/admin',
  [ROLES.PARTNERSHIP_MANAGER]: '/partner',
  [ROLES.USER]: '/profile',
};

// Demo logins (frontend prototype only — replace with real API auth)
export const DEMO_ACCOUNTS = {
  [ROLES.SUPER_ADMIN]: {
    name: 'Arjun Malhotra',
    email: 'superadmin@mafth.in',
    password: 'super@123',
    title: 'Founder & Super Admin',
  },
  [ROLES.ADMIN]: {
    name: 'Neha Kapoor',
    email: 'admin@mafth.in',
    password: 'admin@123',
    title: 'Operations Admin',
  },
  [ROLES.PARTNERSHIP_MANAGER]: {
    name: 'Rohan Verma',
    email: 'partners@mafth.in',
    password: 'partner@123',
    title: 'Vendor Partnership Manager',
  },
  [ROLES.USER]: {
    name: 'Kabir Mehta',
    email: 'kabir.mehta@mafth.in',
    password: 'user@123',
    title: 'Customer',
  },
};

const initials = (name) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      currentRole: ROLES.USER,
      staff: null, // { name, email, title, initials } for staff roles

      user: {
        id: 'usr-101',
        name: 'Kabir Mehta',
        email: 'kabir.mehta@mafth.in',
        phone: '+91 98765 43210',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        joinedDate: 'October 2023',
        walletBalance: 1250,
        loyaltyTier: 'MAFTH Gold Member',
      },

      addresses: [
        {
          id: 'addr-1',
          name: 'Kabir Mehta',
          type: 'Home',
          addressLine: 'Flat 402, Shanti Niketan, 12th Main, Indiranagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560038',
          phone: '+91 98765 43210',
          isDefault: true,
        },
        {
          id: 'addr-2',
          name: 'Kabir Mehta (Studio)',
          type: 'Work',
          addressLine: 'Unit 3B, WeWork Galaxy, 43 Residency Road',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560025',
          phone: '+91 98765 43210',
          isDefault: false,
        },
      ],

      /** Returns { ok, role, error } */
      login: (email, password) => {
        const entry = Object.entries(DEMO_ACCOUNTS).find(
          ([, acc]) => acc.email.toLowerCase() === email.trim().toLowerCase()
        );
        if (!entry) return { ok: false, error: 'No account found with this email.' };
        const [role, acc] = entry;
        if (acc.password !== password) return { ok: false, error: 'Incorrect password.' };
        get().loginAs(role);
        return { ok: true, role };
      },

      loginAs: (role) => {
        const acc = DEMO_ACCOUNTS[role];
        set({
          isAuthenticated: true,
          currentRole: role,
          staff:
            role === ROLES.USER
              ? null
              : { name: acc.name, email: acc.email, title: acc.title, initials: initials(acc.name) },
        });
      },

      logout: () => set({ isAuthenticated: false, currentRole: ROLES.USER, staff: null }),
    }),
    {
      name: 'mafth-auth-v2',
    }
  )
);
