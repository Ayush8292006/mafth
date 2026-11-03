import fs from 'fs';
import path from 'path';

// Template product archetypes per category to generate 150+ realistic items
const archetypes = [
  // Men's Fashion (20 items)
  {
    cat: "mens-fashion",
    brand: "Rawat Heritage",
    vendorId: "v-rawat-crafts",
    vendorName: "Rawat Heritage Weaves",
    items: [
      { name: "Kora Handloom Linen Camp Collar Shirt", basePrice: 2890, mrp: 4490, sub: "Linen Shirts" },
      { name: "Indigo Block-Printed Bandhgala Nehru Jacket", basePrice: 4950, mrp: 7990, sub: "Nehru Jackets" },
      { name: "Relaxed Fit 14oz Khadi Cotton Trousers", basePrice: 3200, mrp: 4990, sub: "Tailored Trousers" },
      { name: "Handspun Chanderi Festive Short Kurta", basePrice: 2450, mrp: 3800, sub: "Kurtas" },
      { name: "Raw Slub Cotton Utility Safari Overshirt", basePrice: 3600, mrp: 5400, sub: "Overshirts" },
      { name: "Natural Ecru Woven Cuban Shirt", basePrice: 2650, mrp: 3990, sub: "Linen Shirts" },
      { name: "Ajrakh Natural Mud Resist Cotton Kurta", basePrice: 2800, mrp: 4200, sub: "Kurtas" },
      { name: "Double Pleated Tailored Wool-Blend Trousers", basePrice: 4200, mrp: 6500, sub: "Tailored Trousers" }
    ]
  },
  {
    cat: "mens-fashion",
    brand: "Bombay Clothiers",
    vendorId: "v-bombay-tailors",
    vendorName: "Bombay Clothiers Co.",
    items: [
      { name: "Unstructured Washed French Linen Blazer", basePrice: 7800, mrp: 11990, sub: "Tailored Trousers" },
      { name: "13.5oz Shuttle-Loom Selvedge Denim Jeans", basePrice: 4900, mrp: 7200, sub: "Raw Denim" },
      { name: "Heavyweight 280GSM Supima Cotton Mock Neck", basePrice: 1850, mrp: 2900, sub: "Linen Shirts" },
      { name: "Camp Collar Embroidered Resort Shirt", basePrice: 2990, mrp: 4500, sub: "Linen Shirts" },
      { name: "Relaxed Gurkha Linen Trousers with Side Tabs", basePrice: 3900, mrp: 5800, sub: "Tailored Trousers" },
      { name: "Mercerized Pima Cotton Knit Polo", basePrice: 2400, mrp: 3600, sub: "Linen Shirts" },
      { name: "Waffle-Knit Organic Raglan Crewneck", basePrice: 2200, mrp: 3400, sub: "Linen Shirts" },
      { name: "Herringbone Tweed Field Overshirt", basePrice: 4600, mrp: 6900, sub: "Overshirts" }
    ]
  },
  // Women's Fashion (20 items)
  {
    cat: "womens-fashion",
    brand: "Varanasi Silk Guild",
    vendorId: "v-banaras-guild",
    vendorName: "Varanasi Silk Guild",
    items: [
      { name: "Handwoven Katan Pure Silk Saree with Antique Gold Zari", basePrice: 18500, mrp: 26000, sub: "Handloom Sarees" },
      { name: "Chanderi Tissue Silk Saree with Hand-Cut Floral Jaal", basePrice: 12900, mrp: 18500, sub: "Handloom Sarees" },
      { name: "Organza Silk Embroidered Festive Dupatta & Kurta Set", basePrice: 8900, mrp: 13500, sub: "Co-ord Sets" },
      { name: "Pure Mulberry Silk Jamdani Motif Saree", basePrice: 21000, mrp: 30000, sub: "Handloom Sarees" },
      { name: "Brocade Silk Tailored Trench Jacket", basePrice: 9500, mrp: 14000, sub: "Jackets" },
      { name: "Kanjeevaram Korvai Weave Bridal Silk Saree", basePrice: 24500, mrp: 34000, sub: "Modern Silks" },
      { name: "Moonga Georgette Hand-Dyed Tunic", basePrice: 6200, mrp: 8900, sub: "Tunics & Kurtas" }
    ]
  },
  {
    cat: "womens-fashion",
    brand: "Rawat Heritage",
    vendorId: "v-rawat-crafts",
    vendorName: "Rawat Heritage Weaves",
    items: [
      { name: "Kora Pure Linen Tiered Maxi Dress with Pockets", basePrice: 4400, mrp: 6800, sub: "Linen Dresses" },
      { name: "Hand-Block Printed Dabu Indigo Co-ord Pant Set", basePrice: 3800, mrp: 5600, sub: "Co-ord Sets" },
      { name: "Mulmul Cotton Hand-Pleated Angrakha Kurta", basePrice: 3200, mrp: 4800, sub: "Tunics & Kurtas" },
      { name: "Structured Khadi Linen Blazer Dress", basePrice: 5600, mrp: 8200, sub: "Jackets" },
      { name: "Natural Flax Sleeveless Slip Dress with Shell Buttons", basePrice: 3450, mrp: 5200, sub: "Linen Dresses" },
      { name: "Kashmiri Aari Embroidered Wool Trench Coat", basePrice: 11500, mrp: 16800, sub: "Jackets" },
      { name: "Maheshwari Handloom Silk Cotton Saree", basePrice: 6800, mrp: 9800, sub: "Handloom Sarees" },
      { name: "Boxy Cut Organic Cotton Poplin Smock Shirt", basePrice: 2700, mrp: 4100, sub: "Linen Dresses" }
    ]
  },
  // Footwear (16 items)
  {
    cat: "footwear",
    brand: "The Leather Atelier",
    vendorId: "v-artisanal-hide",
    vendorName: "The Leather Atelier",
    items: [
      { name: "Goodyear-Welted Belgian Loafers in Horween Suede", basePrice: 6800, mrp: 9900, sub: "Leather Loafers" },
      { name: "Full-Grain Leather Oxford Brogue in Antique Walnut", basePrice: 7400, mrp: 10800, sub: "Oxford Shoes" },
      { name: "Hand-Burnished Chelsea Boots with Dainite Sole", basePrice: 8900, mrp: 12900, sub: "Chelsea Boots" },
      { name: "Artisanal Double-Strap Kolhapuri Sandals in Tan", basePrice: 2800, mrp: 4200, sub: "Artisanal Sandals" },
      { name: "Minimalist Italian White Calfskin Leather Trainers", basePrice: 5900, mrp: 8600, sub: "Sneakers" },
      { name: "Penny Loafer with Vibram Cushion Lug Sole", basePrice: 6400, mrp: 9200, sub: "Leather Loafers" },
      { name: "Hand-Woven Leather Huarache Slip-Ons", basePrice: 3400, mrp: 5000, sub: "Artisanal Sandals" },
      { name: "Monk Strap Dress Shoes in Midnight Black Box Calf", basePrice: 7800, mrp: 11200, sub: "Oxford Shoes" }
    ]
  },
  {
    cat: "footwear",
    brand: "Prana Athletics",
    vendorId: "v-prana-athletics",
    vendorName: "Prana Performance Lab",
    items: [
      { name: "Aeroflex Barefoot Trail Running Shoes", basePrice: 3800, mrp: 5800, sub: "Sneakers" },
      { name: "Knit Zero-Drop Everyday Walking Sneakers", basePrice: 2950, mrp: 4400, sub: "Sneakers" },
      { name: "Recovery Foam Slide Sandals with Arch Support", basePrice: 1850, mrp: 2800, sub: "Artisanal Sandals" },
      { name: "Vibram Megagrip All-Weather Hiking Shoes", basePrice: 6200, mrp: 8900, sub: "Sneakers" }
    ]
  },
  // Watches & Accessories (16 items)
  {
    cat: "watches-accessories",
    brand: "Kronos Horology",
    vendorId: "v-zenith-horology",
    vendorName: "Kronos Independent Watchmakers",
    items: [
      { name: "Heritage Automatic Field Watch 38mm with Exhibition Back", basePrice: 19800, mrp: 28000, sub: "Automatic Watches" },
      { name: "Mecha-Quartz Minimalist Chronograph with Sapphire Glass", basePrice: 14500, mrp: 21000, sub: "Chronographs" },
      { name: "Diver 200m Automatic with Ceramic Bezel & Jubilee Strap", basePrice: 26500, mrp: 38000, sub: "Automatic Watches" },
      { name: "Bauhaus Dress Watch 36mm with Enamel White Dial", basePrice: 16900, mrp: 24000, sub: "Automatic Watches" },
      { name: "Fluted Bezel Tuxedo Automatic Watch in Rose Gold", basePrice: 22400, mrp: 32000, sub: "Automatic Watches" }
    ]
  },
  {
    cat: "watches-accessories",
    brand: "Trikuta Silversmiths",
    vendorId: "v-sindoor-jewels",
    vendorName: "Trikuta Temple Silversmiths",
    items: [
      { name: "92.5 Hallmarked Sterling Silver Fluted Signet Ring", basePrice: 3200, mrp: 4800, sub: "Silver Jewelry" },
      { name: "Hand-Chiseled Tribal Silver Choker Necklace", basePrice: 8400, mrp: 12500, sub: "Silver Jewelry" },
      { name: "Solid Brass & Onyx Architectural Cuff Links", basePrice: 2400, mrp: 3600, sub: "Silver Jewelry" },
      { name: "Filigree Silver Hoop Earrings with Natural Pearl", basePrice: 2900, mrp: 4200, sub: "Silver Jewelry" },
      { name: "Handmade Acetate Polarized Aviator Sunglasses", basePrice: 4500, mrp: 6800, sub: "Sunglasses" },
      { name: "Bridle Leather Full Grain Dress Belt with Solid Brass Buckle", basePrice: 2600, mrp: 3900, sub: "Leather Belts" }
    ]
  },
  // Bags & Luggage (14 items)
  {
    cat: "bags",
    brand: "The Leather Atelier",
    vendorId: "v-artisanal-hide",
    vendorName: "The Leather Atelier",
    items: [
      { name: "The Commander Weekender Duffle in Full Grain Saddle Leather", basePrice: 13500, mrp: 19900, sub: "Weekender Duffles" },
      { name: "Minimalist Briefcase 15-inch Laptop Bag in Cognac", basePrice: 9800, mrp: 14500, sub: "Messenger Bags" },
      { name: "Heritage Roll-Top Leather & Waxed Canvas Backpack", basePrice: 8400, mrp: 12200, sub: "Leather Backpacks" },
      { name: "Vegetable Tanned Leather Folio Sleeve for 14-inch MacBook", basePrice: 3200, mrp: 4800, sub: "Laptop Sleeves" },
      { name: "Slim Bi-Fold Card Wallet with RFID Blocking", basePrice: 1650, mrp: 2600, sub: "Messenger Bags" },
      { name: "Structured Tall Leather Everyday Tote with Zipper", basePrice: 7900, mrp: 11500, sub: "Totes" },
      { name: "Heavy Duty 18oz Waxed Canvas Crossbody Field Bag", basePrice: 4200, mrp: 6300, sub: "Messenger Bags" }
    ]
  },
  // Electronics & Audio (16 items)
  {
    cat: "electronics",
    brand: "Aura Tech",
    vendorId: "v-nordic-audio",
    vendorName: "Aura Tech & Acoustics",
    items: [
      { name: "Aura Reference Open-Back Planar Magnetic Headphones", basePrice: 24900, mrp: 34990, sub: "Headphones" },
      { name: "CNC Machined Aluminum 75% Mechanical Keyboard (Gateron Oil Kings)", basePrice: 12800, mrp: 17900, sub: "Mechanical Keyboards" },
      { name: "Solid Walnut Hi-Fi Active Bluetooth Bookshelf Speakers (Pair)", basePrice: 18900, mrp: 26500, sub: "Hi-Fi Speakers" },
      { name: "Active Noise-Cancelling Wireless Over-Ear Headphones 45h Battery", basePrice: 14900, mrp: 21990, sub: "Headphones" },
      { name: "Precision Machined Aluminium Monitor Riser & Desk Mat", basePrice: 3990, mrp: 5990, sub: "Desk Essentials" },
      { name: "USB-C Audiophile DAC & Headphone Amplifier 384kHz/32bit", basePrice: 6500, mrp: 9500, sub: "Desk Essentials" },
      { name: "Ceramic Smart Ring for Sleep & Health Tracking", basePrice: 16400, mrp: 22900, sub: "Smart Wearables" },
      { name: "Retro Dual-Driver Tube Preamplifier for Vinyl & Digital", basePrice: 11200, mrp: 16000, sub: "Hi-Fi Speakers" }
    ]
  },
  // Home & Kitchen (18 items)
  {
    cat: "home-kitchen",
    brand: "Studio Mitti",
    vendorId: "v-terracotta-studio",
    vendorName: "Studio Mitti Ceramics",
    items: [
      { name: "Speckled Oatmeal Stoneware Dinner Set (16 Pieces)", basePrice: 7400, mrp: 10900, sub: "Ceramic Tableware" },
      { name: "Handmade Ceramic Pour-Over Dripper & Server Carafe Set", basePrice: 2600, mrp: 3900, sub: "Pour-over Coffee" },
      { name: "Rustic Terracotta Water Urn with Hand-Hammered Brass Spigot", basePrice: 3400, mrp: 4900, sub: "Brass Decor" },
      { name: "Organic Washed Belgian Linen Duvet Cover Set in Moss Green", basePrice: 8900, mrp: 13000, sub: "Handloom Linen" },
      { name: "Hand-Carved Teakwood Serving Platter with Brass Inlay", basePrice: 2850, mrp: 4200, sub: "Brass Decor" },
      { name: "Ultrasonic Ultrasonic Ceramic Aroma Diffuser with Ambient Light", basePrice: 3600, mrp: 5400, sub: "Aroma Diffusers" },
      { name: "Cast Iron Dutch Oven 5.5L with Enamel Satin Finish", basePrice: 5900, mrp: 8600, sub: "Ceramic Tableware" },
      { name: "Hand-Spun Pure Wool Dhurrie Rug 5x7 Ft in Geometric Beige", basePrice: 9400, mrp: 14000, sub: "Handloom Linen" },
      { name: "Handmade Wabi-Sabi Ceramic Espresso Cups (Set of 4)", basePrice: 1800, mrp: 2700, sub: "Ceramic Tableware" }
    ]
  },
  // Beauty & Personal Care (14 items)
  {
    cat: "beauty-care",
    brand: "Malabar Botanics",
    vendorId: "v-malabar-botanics",
    vendorName: "Malabar Botanics",
    items: [
      { name: "Kumkumadi Miraculous Night Beauty Elixir with Saffron (30ml)", basePrice: 2850, mrp: 4100, sub: "Facial Serums" },
      { name: "Cold-Pressed Bringadi & Virgin Coconut Intensive Hair Treatment", basePrice: 1450, mrp: 2200, sub: "Botanical Hair Oils" },
      { name: "Wild Vetiver (Khus) Artisanal Botanical Eau de Parfum 50ml", basePrice: 3600, mrp: 5200, sub: "Artisanal Perfumes" },
      { name: "Sandalwood & Wild Turmeric Polishing Ubtan Cleanser", basePrice: 1250, mrp: 1850, sub: "Body Butter" },
      { name: "Double-Edge Safety Razor with Solid Brass Handle & Stand", basePrice: 2400, mrp: 3500, sub: "Shaving Kits" },
      { name: "Raw Shea Butter & Cardamom Lip Hydrating Balm (Set of 2)", basePrice: 850, mrp: 1300, sub: "Body Butter" },
      { name: "Pure Himalayan Rose Water Distillate Toner 200ml", basePrice: 980, mrp: 1500, sub: "Facial Serums" }
    ]
  },
  // Kids & Toys (12 items)
  {
    cat: "kids-toys",
    brand: "Channapatna Crafts",
    vendorId: "v-channapatna-crafts",
    vendorName: "Channapatna Wooden Heirlooms",
    items: [
      { name: "Ivory-Wood Hand-Turned Balancing Rainbow Stacker", basePrice: 1650, mrp: 2450, sub: "Wooden Toys" },
      { name: "Artisanal Wooden Architectural Castle Blocks (50 Pcs)", basePrice: 2900, mrp: 4200, sub: "Puzzles & Blocks" },
      { name: "Natural Lacquered Wooden Chess Set with Staunton Figures", basePrice: 4800, mrp: 6900, sub: "Wooden Toys" },
      { name: "Organic Cotton Muslin Baby Swaddle Blankets (Pack of 3)", basePrice: 1850, mrp: 2800, sub: "Organic Cotton Sets" },
      { name: "Hand-Carved Animal Pull Toy in Non-Toxic Vegetable Lacquer", basePrice: 1200, mrp: 1750, sub: "Wooden Toys" },
      { name: "Montessori Wooden Sorting & Math Geometric Board", basePrice: 1950, mrp: 2900, sub: "Puzzles & Blocks" }
    ]
  },
  // Sports & Fitness (12 items)
  {
    cat: "sports-fitness",
    brand: "Prana Athletics",
    vendorId: "v-prana-athletics",
    vendorName: "Prana Performance Lab",
    items: [
      { name: "Organic Cork & Natural Tree Rubber Grip Yoga Mat (5mm)", basePrice: 3450, mrp: 5100, sub: "Cork Yoga Mats" },
      { name: "Precision Cast Iron Competition Kettlebell (16kg)", basePrice: 3800, mrp: 5500, sub: "Cast-Iron Weights" },
      { name: "High-Density Cork Massage Roller for Myofascial Release", basePrice: 1450, mrp: 2200, sub: "Resistance Gear" },
      { name: "Double-Walled Vacuum Insulated Steel Water Flask (1 Litre)", basePrice: 1650, mrp: 2400, sub: "Hydration Flasks" },
      { name: "Natural Latex Resistance Loop Bands Set with Carrying Pouch", basePrice: 1100, mrp: 1650, sub: "Resistance Gear" },
      { name: "Seamless Breathable Bamboo Running Tee", basePrice: 1750, mrp: 2600, sub: "Activewear" }
    ]
  }
];

// Curated image pools per category
const imagePools = {
  "mens-fashion": [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
  ],
  "womens-fashion": [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=800&q=80"
  ],
  "footwear": [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80"
  ],
  "watches-accessories": [
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=800&q=80"
  ],
  "bags": [
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80"
  ],
  "electronics": [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80"
  ],
  "home-kitchen": [
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
  ],
  "beauty-care": [
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1608248597359-0026e632d847?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
  ],
  "kids-toys": [
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80"
  ],
  "sports-fitness": [
    "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80"
  ]
};

const allProducts = [];
let idCounter = 1;

// Expand templates with variations to hit 160+ unique, detailed products
for (let repeat = 0; repeat < 2; repeat++) {
  for (const arch of archetypes) {
    for (const it of arch.items) {
      const id = `mf-${idCounter.toString().padStart(3, '0')}`;
      const suffix = repeat === 0 ? "" : (repeat === 1 ? " — Limited Edition" : " — Studio Craft");
      const title = `${it.name}${suffix}`;
      const price = repeat === 0 ? it.basePrice : Math.round(it.basePrice * 1.15);
      const mrp = repeat === 0 ? it.mrp : Math.round(it.mrp * 1.15);
      const discount = Math.round(((mrp - price) / mrp) * 100);
      
      const pool = imagePools[arch.cat] || imagePools["mens-fashion"];
      // Pick 3-4 images cyclically
      const img1 = pool[(idCounter) % pool.length];
      const img2 = pool[(idCounter + 1) % pool.length];
      const img3 = pool[(idCounter + 2) % pool.length];
      const img4 = pool[(idCounter + 3) % pool.length];

      const ratingsList = [4.7, 4.8, 4.9, 4.6, 5.0, 4.8, 4.9];
      const rating = ratingsList[idCounter % ratingsList.length];
      const reviewsCount = 45 + ((idCounter * 17) % 680);
      const stock = 6 + ((idCounter * 7) % 45);

      const isDealOfTheDay = idCounter % 9 === 0;
      const isFeatured = idCounter % 5 === 0;
      const isBestSeller = idCounter % 6 === 0;
      const isNewArrival = idCounter % 4 === 0;

      allProducts.push({
        id,
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        brand: arch.brand,
        vendorId: arch.vendorId,
        vendorName: arch.vendorName,
        category: arch.cat,
        subcategory: it.sub,
        price,
        mrp,
        discount,
        rating,
        reviewsCount,
        stock,
        isDealOfTheDay,
        dealEndsInHours: isDealOfTheDay ? (6 + (idCounter % 12)) : null,
        isFeatured,
        isBestSeller,
        isNewArrival,
        deliveryEstimate: idCounter % 2 === 0 ? "Fast 2-Day Delivery" : "Delivered in 3-4 days",
        freeDelivery: true,
        images: [img1, img2, img3, img4],
        primaryImage: img1,
        variants: {
          sizes: arch.cat.includes("fashion") ? ["S", "M", "L", "XL", "XXL"] : 
                 arch.cat.includes("footwear") ? ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"] : 
                 arch.cat.includes("watches") ? ["38mm Case", "42mm Case"] : 
                 arch.cat.includes("home") ? ["Standard", "Large Studio Set"] : ["Standard"],
          colors: [
            { name: "Raw Ecru / Oatmeal", hex: "#E8E2D5" },
            { name: "Washed Charcoal", hex: "#2B2927" },
            { name: "Deep Indigo", hex: "#1A2E40" }
          ]
        },
        specs: {
          "Material": arch.cat.includes("fashion") ? "100% Handloom Organic Cotton / Flax" : 
                      arch.cat.includes("footwear") ? "Full-grain calfskin leather" : 
                      arch.cat.includes("electronics") ? "Anodized Aerospace 6063 Aluminium" : "Pure Artisanal Grade",
          "Craft Technique": "Master Guild Certified",
          "Packaging": "Plastic-free, 100% recycled cotton pulp gift box",
          "Warranty / Care": "1-Year Quality Assurance with easy 7-day pickup returns",
          "Country of Origin": "India"
        },
        description: `Every piece of ${title} is crafted with precision, celebrating organic textures and authentic Indian materiality. Ethically produced by ${arch.vendorName} with zero compromise on durability, tactility, and contemporary aesthetics.`,
        otherSellers: [
          {
            vendorId: "v-rawat-crafts",
            vendorName: "Rawat Heritage Weaves",
            rating: 4.88,
            price: price + 100,
            delivery: "2 days"
          },
          {
            vendorId: "v-bombay-tailors",
            vendorName: "Bombay Clothiers Co.",
            rating: 4.76,
            price: price - 50,
            delivery: "3 days"
          }
        ]
      });

      idCounter++;
    }
  }
}

const fileContent = `// Autogenerated 150+ realistic multi-vendor catalog data
export const products = ${JSON.stringify(allProducts, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/products.js'), fileContent, 'utf-8');
console.log(`Generated ${allProducts.length} mock products in src/data/products.js!`);

