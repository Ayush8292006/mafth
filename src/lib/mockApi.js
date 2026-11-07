import { products } from '../data/products';
import { categories } from '../data/categories';
import { vendors } from '../data/vendors';
import { usePlatformStore } from '../store/usePlatformStore';

/**
 * Live catalogue = seed products + vendor-added products approved by Admin,
 * with any price/stock/visibility edits vendors made in their panel.
 */
function getCatalog() {
  const { vendorProducts = [], listingOverrides = {}, partnerVendors = [] } = usePlatformStore.getState();
  const suspended = new Set(partnerVendors.filter((v) => v.status === 'Suspended').map((v) => v.id));
  const added = vendorProducts
    .filter((p) => p.status === 'Approved')
    .map((p) => ({
      id: p.id,
      slug: p.id,
      title: p.title,
      brand: p.vendorName,
      vendorId: p.vendorId,
      vendorName: p.vendorName,
      category: p.category,
      subcategory: '',
      price: p.price,
      mrp: p.mrp,
      discount: p.mrp > p.price ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0,
      rating: 0,
      reviewsCount: 0,
      stock: p.stock,
      isNewArrival: true,
      deliveryEstimate: 'Delivered in 4-6 days',
      freeDelivery: true,
      images: [p.image],
      primaryImage: p.image,
      variants: { sizes: ['Standard'], colors: [] },
      specs: { 'Sold by': p.vendorName },
      description: p.description,
    }));
  return [...added, ...products]
    .filter((p) => !suspended.has(p.vendorId))
    .map((p) => {
      const o = listingOverrides[p.id];
      if (!o) return p;
      const price = o.price ?? p.price;
      return { ...p, price, stock: o.stock ?? p.stock, hidden: o.active === false, discount: p.mrp > price ? Math.round(((p.mrp - price) / p.mrp) * 100) : 0 };
    })
    .filter((p) => !p.hidden);
}

const simulateDelay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // Products
  async getProducts({
    category,
    vendorId,
    search,
    sortBy = 'featured',
    priceRange,
    minRating,
    inStockOnly,
    page = 1,
    limit = 24,
  } = {}) {
    await simulateDelay();

    let filtered = getCatalog();

    if (category && category !== 'all') {
      filtered = filtered.filter(
        (p) => p.category === category || p.subcategory?.toLowerCase() === category.toLowerCase()
      );
    }

    if (vendorId) {
      filtered = filtered.filter((p) => p.vendorId === vendorId);
    }

    if (search) {
      const q = search.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.vendorName.toLowerCase().includes(q)
      );
    }

    if (priceRange) {
      filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    }

    if (minRating) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    if (inStockOnly) {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      products: paginated,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      hasMore: startIndex + limit < total,
    };
  },

  async getProductById(id) {
    await simulateDelay();
    return getCatalog().find((p) => p.id === id) || null;
  },

  async getProductBySlug(slug) {
    await simulateDelay();
    return getCatalog().find((p) => p.slug === slug || p.id === slug) || null;
  },

  async getDealsOfTheDay() {
    await simulateDelay();
    return getCatalog().filter((p) => p.isDealOfTheDay).slice(0, 8);
  },

  async getFeaturedProducts() {
    await simulateDelay();
    return getCatalog().filter((p) => p.isFeatured).slice(0, 10);
  },

  async getNewArrivals() {
    await simulateDelay();
    return getCatalog().filter((p) => p.isNewArrival).slice(0, 8);
  },

  // Categories
  async getCategories() {
    await simulateDelay();
    return categories;
  },

  async getCategoryBySlug(slug) {
    await simulateDelay();
    return categories.find((c) => c.slug === slug) || null;
  },

  // Vendors
  async getVendors() {
    await simulateDelay();
    return vendors;
  },

  async getVendorById(id) {
    await simulateDelay();
    return vendors.find((v) => v.id === id || v.slug === id) || null;
  },

  /** Other vendors selling a comparable item (Amazon-style "Other sellers") */
  async getOtherSellers(product) {
    await simulateDelay(80);
    const others = vendors.filter((v) => v.id !== product.vendorId).slice(0, 14);
    const seed = product.id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return [0, 1].map((k) => {
      const v = others[(seed + k * 5) % others.length];
      const delta = [1.04, 1.09][k];
      return {
        vendorId: v.id,
        vendorName: v.name,
        vendorSlug: v.slug,
        rating: v.rating,
        location: v.location,
        price: Math.round((product.price * delta) / 10) * 10 - 1,
        deliveryEstimate: k === 0 ? 'Delivered in 4-5 days' : 'Delivered in 5-7 days',
      };
    });
  },

  async getVendorsWithStats() {
    await simulateDelay();
    const catalog = getCatalog();
    return vendors.map((v) => {
      const own = catalog.filter((p) => p.vendorId === v.id);
      const cats = [...new Set(own.map((p) => p.category))];
      return { ...v, liveProducts: own.length, departments: cats };
    });
  },

  // Live search autosuggest
  async searchAutosuggest(query) {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase().trim();
    return getCatalog()
      .filter((p) => p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
      .slice(0, 6)
      .map((p) => ({
        id: p.id,
        title: p.title,
        brand: p.brand,
        price: p.price,
        image: p.primaryImage,
        category: p.category,
      }));
  },
};

