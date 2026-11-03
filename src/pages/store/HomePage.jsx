import React, { useEffect, useState } from 'react';
import HeroCarousel from '../../components/storefront/HeroCarousel';
import CategoryIconStrip from '../../components/storefront/CategoryIconStrip';
import DealOfTheDayRail from '../../components/storefront/DealOfTheDayRail';
import BankOffersStrip from '../../components/storefront/BankOffersStrip';
import FeaturedVendorsRail from '../../components/storefront/FeaturedVendorsRail';
import EditorialBanner from '../../components/storefront/EditorialBanner';
import CategoryProductRail from '../../components/storefront/CategoryProductRail';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { mockApi } from '../../lib/mockApi';

export default function HomePage() {
  const [deals, setDeals] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [mensFashion, setMensFashion] = useState([]);
  const [womensFashion, setWomensFashion] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [homeKitchen, setHomeKitchen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [
          dealsRes,
          featuredRes,
          mensRes,
          womensRes,
          elecRes,
          homeRes,
        ] = await Promise.all([
          mockApi.getDealsOfTheDay(),
          mockApi.getFeaturedProducts(),
          mockApi.getProducts({ category: 'mens-fashion', limit: 4 }),
          mockApi.getProducts({ category: 'womens-fashion', limit: 4 }),
          mockApi.getProducts({ category: 'electronics', limit: 4 }),
          mockApi.getProducts({ category: 'home-kitchen', limit: 4 }),
        ]);

        setDeals(dealsRes);
        setFeatured(featuredRes);
        setMensFashion(mensRes.products);
        setWomensFashion(womensRes.products);
        setElectronics(elecRes.products);
        setHomeKitchen(homeRes.products);
      } catch (err) {
        console.error("Failed to load home products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadHomeData();
  }, []);

  return (
    <div className="w-full bg-white overflow-hidden">
      {/* 1. HERO CAROUSEL */}
      <ScrollReveal variant="fade-in" duration={0.8}>
        <HeroCarousel />
      </ScrollReveal>

      {/* 2. CATEGORY ICON STRIP (FLIPKART STYLE CIRCLES) */}
      <ScrollReveal variant="fade-up" delay={0.1}>
        <CategoryIconStrip />
      </ScrollReveal>

      {/* 3. DEAL OF THE DAY WITH LIVE COUNTDOWN TIMER */}
      {deals.length > 0 && (
        <ScrollReveal variant="fade-up" delay={0.15}>
          <DealOfTheDayRail deals={deals} />
        </ScrollReveal>
      )}

      {/* 4. TOP PICKS FOR YOU */}
      {featured.length > 0 && (
        <ScrollReveal variant="fade-up" delay={0.1}>
          <CategoryProductRail
            title="Top Curated Picks for You"
            subtitle="Algorithmically Selected For Discerning Taste"
            products={featured}
            viewAllLink="/search?filter=top-picks"
            bg="bg-white"
            count={4}
          />
        </ScrollReveal>
      )}

      {/* 5. BANK OFFERS & COUPON STRIP */}
      <ScrollReveal variant="fade-up" delay={0.15}>
        <BankOffersStrip />
      </ScrollReveal>

      {/* 6. CATEGORY-WISE RAIL: MEN'S HANDLOOM & LINEN */}
      {mensFashion.length > 0 && (
        <ScrollReveal variant="fade-up" delay={0.1}>
          <CategoryProductRail
            title="Handloom Linen & Tailored Menswear"
            subtitle="Department Showcase • 01"
            categorySlug="mens-fashion"
            products={mensFashion}
            bg="bg-beige-50"
            count={4}
          />
        </ScrollReveal>
      )}

      {/* 7. EDITORIAL BANNER 01 (BEIGE BAND) */}
      <ScrollReveal variant="clip-reveal" duration={0.9}>
        <EditorialBanner inverted={false} />
      </ScrollReveal>

      {/* 8. CATEGORY-WISE RAIL: WOMEN'S SILKS & FESTIVE DRESSES */}
      {womensFashion.length > 0 && (
        <ScrollReveal variant="fade-up" delay={0.1}>
          <CategoryProductRail
            title="Master Weaves: Varanasi & Chanderi Silks"
            subtitle="Department Showcase • 02"
            categorySlug="womens-fashion"
            products={womensFashion}
            bg="bg-white"
            count={4}
          />
        </ScrollReveal>
      )}

      {/* 9. FEATURED INDEPENDENT VENDORS & BRAND STORES */}
      <ScrollReveal variant="fade-up" delay={0.15}>
        <FeaturedVendorsRail />
      </ScrollReveal>

      {/* 10. EDITORIAL BANNER 02 (BLACK BAND) */}
      <ScrollReveal variant="clip-reveal" duration={0.9}>
        <EditorialBanner inverted={true} />
      </ScrollReveal>

      {/* 11. CATEGORY-WISE RAIL: HOROLOGY & AUDIO ESSENTIALS */}
      {electronics.length > 0 && (
        <ScrollReveal variant="fade-up" delay={0.1}>
          <CategoryProductRail
            title="Audiophile Equipment & Minimalist Tech"
            subtitle="Department Showcase • 03"
            categorySlug="electronics"
            products={electronics}
            bg="bg-beige-50"
            count={4}
          />
        </ScrollReveal>
      )}

      {/* 12. RECENTLY VIEWED RAIL */}
      {homeKitchen.length > 0 && (
        <ScrollReveal variant="fade-up" delay={0.1}>
          <CategoryProductRail
            title="Recently Viewed & Trending Across India"
            subtitle="Live Community Activity"
            categorySlug="home-kitchen"
            products={homeKitchen}
            bg="bg-white"
            count={4}
          />
        </ScrollReveal>
      )}
    </div>
  );
}
