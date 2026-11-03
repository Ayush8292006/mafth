import { products } from '../data/products';
import { categories } from '../data/categories';
import { vendors } from '../data/vendors';

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

    let filtered = [...products];

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
    return products.find((p) => p.id === id) || null;
  },

  async getProductBySlug(slug) {
    await simulateDelay();
    return products.find((p) => p.slug === slug || p.id === slug) || null;
  },

  async getDealsOfTheDay() {
    await simulateDelay();
    return products.filter((p) => p.isDealOfTheDay).slice(0, 8);
  },

  async getFeaturedProducts() {
    await simulateDelay();
    return products.filter((p) => p.isFeatured).slice(0, 10);
  },

  async getNewArrivals() {
    await simulateDelay();
    return products.filter((p) => p.isNewArrival).slice(0, 8);
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

  // Live search autosuggest
  async searchAutosuggest(query) {
    if (!query || query.length < 2) return [];
    const q = query.toLowerCase().trim();
    return products
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

