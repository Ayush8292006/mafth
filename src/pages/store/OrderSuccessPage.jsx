import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';

export default function OrderSuccessPage() {
  const orderNumber = `MF-ORD-${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div className="bg-white min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-lg w-full text-center">
        
        <div className="w-16 h-16 rounded-full bg-status-success/10 text-status-success flex items-center justify-center mx-auto mb-4 border border-status-success/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-[11px] uppercase font-bold text-beige-500 tracking-wider block mb-1">
          Direct Guild Confirmation
        </span>
        <h1 className="font-serif text-3xl font-bold text-black mb-2">
          Order Successfully Placed!
        </h1>
        <p className="text-xs text-grey-600 mb-6 leading-relaxed">
          Thank you for supporting independent Indian artisans. Your order <strong className="text-black font-semibold">{orderNumber}</strong> has been transmitted directly to the vendor ateliers for batch packing and dispatch.
        </p>

        <div className="p-4 bg-beige-50 border border-beige-300 rounded text-left text-xs space-y-2 mb-8">
          <div className="flex items-center justify-between pb-2 border-b border-beige-200">
            <span className="text-grey-600">Expected Delivery:</span>
            <span className="font-bold text-black">Within 2 to 3 Business Days</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-grey-600">Live Status:</span>
            <span className="text-status-success font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Allocated to BlueDart Express
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/profile"
            className="px-6 py-3 bg-black text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Track Order Timeline</span>
          </Link>
          <Link
            to="/"
            className="px-6 py-3 border border-beige-300 text-black text-xs uppercase tracking-wider font-semibold rounded hover:bg-beige-100 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}

