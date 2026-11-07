import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../components/ui/Logo';
import { ArrowRight, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="bg-white min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <Logo size="lg" />
        </div>
        <span className="text-[11px] uppercase font-bold text-brand-600 tracking-widest block mb-2">
          Error 404 • Page Not Found
        </span>
        <h1 className="font-display text-3xl font-bold text-black mb-3">
          This piece seems to be out of the catalogue
        </h1>
        <p className="text-xs text-grey-600 mb-8 leading-relaxed">
          The link you followed may have moved or expired. Return to the marketplace storefront to discover active artisan collections.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 text-white text-xs uppercase tracking-wider font-semibold rounded hover:bg-brand-800 transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Back to MAFTH Home</span>
        </Link>
      </div>
    </div>
  );
}

