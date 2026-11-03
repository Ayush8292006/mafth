import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Grid, Search, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { motion } from 'framer-motion';

export default function MobileTabBar() {
  const location = useLocation();
  const { getTotalCount, openDrawer } = useCartStore();
  const cartCount = getTotalCount();

  const tabs = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Categories', path: '/categories', icon: Grid },
    { label: 'Search', path: '/search', icon: Search },
    { label: 'Bag', isCart: true, icon: ShoppingBag, badge: cartCount },
    { label: 'Account', path: '/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-beige-300 pb-[env(safe-area-inset-bottom,0px)] shadow-lift">
      <div className="grid grid-cols-5 h-14 items-center">
        {tabs.map((tab, idx) => {
          const Icon = tab.icon;
          
          if (tab.isCart) {
            return (
              <button
                key={idx}
                onClick={openDrawer}
                className="relative flex flex-col items-center justify-center h-full active:scale-95 transition-transform min-h-[44px]"
                aria-label="Open Shopping Bag"
              >
                <div className="relative">
                  <Icon className="w-5 h-5 text-black" />
                  {tab.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {tab.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium text-grey-600 mt-0.5">
                  {tab.label}
                </span>
              </button>
            );
          }

          const isActive = location.pathname === tab.path;

          return (
            <NavLink
              key={idx}
              to={tab.path}
              className="relative flex flex-col items-center justify-center h-full active:scale-95 transition-transform min-h-[44px]"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-black stroke-[2.2]' : 'text-grey-400 stroke-[1.8]'
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-black rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              <span
                className={`text-[10px] mt-0.5 transition-colors ${
                  isActive ? 'font-bold text-black' : 'font-normal text-grey-600'
                }`}
              >
                {tab.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

