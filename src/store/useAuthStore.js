import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  SUB_ADMIN: 'sub_admin',
  VENDOR: 'vendor',
  CUSTOMER: 'customer',
};

export const SUB_ADMIN_ROLES = {
  CATALOG_MANAGER: 'Catalog Manager',
  VENDOR_MANAGER: 'Vendor Manager',
  ORDER_SUPPORT_MANAGER: 'Order & Support Manager',
  FINANCE_MANAGER: 'Finance Manager',
  MARKETING_MANAGER: 'Content & Marketing Manager',
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      currentRole: ROLES.CUSTOMER,
      subAdminPreset: SUB_ADMIN_ROLES.CATALOG_MANAGER,
      
      // Permissions matrix: view, create, edit, delete, approve per module
      permissions: {
        vendors: { view: true, create: true, edit: true, delete: false, approve: true },
        products: { view: true, create: true, edit: true, delete: false, approve: true },
        orders: { view: true, create: false, edit: true, delete: false, approve: false },
        finance: { view: true, create: false, edit: false, delete: false, approve: false },
        cms: { view: true, create: true, edit: true, delete: true, approve: true },
      },

      user: {
        id: 'usr-101',
        name: 'Kabir Mehta',
        email: 'kabir.mehta@mafth.in',
        phone: '+91 98765 43210',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        joinedDate: 'October 2023',
        walletBalance: 1250,
        loyaltyTier: 'MAFTH Club Noir',
      },

      activeVendor: {
        id: 'v-rawat-crafts',
        name: 'Rawat Heritage Weaves',
        email: 'partners@rawatheritage.com',
        kycStatus: 'verified', // 'pending' | 'verified' | 'rejected'
        gstNumber: '08AAAAA0000A1Z5',
        panNumber: 'AAACR1234F',
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
        }
      ],

      setRole: (role) => set({ currentRole: role }),
      setSubAdminPreset: (preset) => set({ subAdminPreset: preset }),
      
      updatePermissions: (newPermissions) => set({ permissions: newPermissions }),

      hasPermission: (module, action) => {
        const { currentRole, permissions } = get();
        if (currentRole === ROLES.SUPER_ADMIN) return true;
        if (currentRole !== ROLES.SUB_ADMIN) return false;
        return !!permissions?.[module]?.[action];
      },
    }),
    {
      name: 'mafth-auth-storage',
    }
  )
);

