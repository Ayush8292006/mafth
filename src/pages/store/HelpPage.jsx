import React from 'react';
import { HelpCircle, ShieldCheck, RotateCcw, Truck, MessageSquare, PhoneCall, Mail } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="bg-white min-h-screen py-6 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase font-bold text-brand-600 tracking-wider">
            MAFTH 24x7 Customer Care & Vendor Concierge
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-bold text-black mt-2">
            How can our concierge assist you?
          </h1>
          <p className="text-xs text-grey-600 mt-2 max-w-md mx-auto">
            Direct resolution for order tracking, reverse pickups, artisan queries, and seller disputes.
          </p>
        </div>

        {/* Quick Contact Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="p-5 border border-mist-300 rounded bg-mist-50 text-center">
            <PhoneCall className="w-6 h-6 text-black mx-auto mb-2" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Toll-Free Helpline</h3>
            <p className="text-sm font-semibold text-black mt-1">1800-419-MAFTH</p>
            <p className="text-[10px] text-grey-500 mt-0.5">9:00 AM – 9:00 PM IST (Mon-Sun)</p>
          </div>

          <div className="p-5 border border-mist-300 rounded bg-mist-50 text-center">
            <Mail className="w-6 h-6 text-black mx-auto mb-2" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">Email Concierge</h3>
            <p className="text-sm font-semibold text-black mt-1">care@mafth.in</p>
            <p className="text-[10px] text-grey-500 mt-0.5">Average reply time &lt; 2 hours</p>
          </div>

          <div className="p-5 border border-mist-300 rounded bg-mist-50 text-center">
            <MessageSquare className="w-6 h-6 text-black mx-auto mb-2" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">WhatsApp Desk</h3>
            <p className="text-sm font-semibold text-black mt-1">+91 98765 43210</p>
            <p className="text-[10px] text-grey-500 mt-0.5">Instant delivery & dispatch tracking</p>
          </div>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-black mb-4">Frequently Answered Queries</h2>
          
          <div className="border border-mist-300 rounded p-4 bg-white">
            <h3 className="text-sm font-bold text-black">How do I return or exchange an item?</h3>
            <p className="text-xs text-grey-600 mt-1.5 leading-relaxed">
              You can initiate a return within 7 days of delivery directly from your Profile &gt; Orders section. Our courier partner will inspect the tag and pick up the package from your doorstep without packaging hassle.
            </p>
          </div>

          <div className="border border-mist-300 rounded p-4 bg-white">
            <h3 className="text-sm font-bold text-black">How does MAFTH verify artisan authenticity?</h3>
            <p className="text-xs text-grey-600 mt-1.5 leading-relaxed">
              Every seller on MAFTH undergoes physical verification of looms or manufacturing units, Silk Mark / GI tag authentication where applicable, and mandatory GST compliance.
            </p>
          </div>

          <div className="border border-mist-300 rounded p-4 bg-white">
            <h3 className="text-sm font-bold text-black">Can multiple items from different vendors ship together?</h3>
            <p className="text-xs text-grey-600 mt-1.5 leading-relaxed">
              Because items are dispatched directly from the respective regional ateliers (e.g. linen from Jaipur, ceramics from Pondicherry), you will receive separate tracking links for each vendor package with zero additional delivery cost.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

