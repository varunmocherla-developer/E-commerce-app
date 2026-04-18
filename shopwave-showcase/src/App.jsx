import { useMemo, useState } from "react";

const categories = ["All", "Audio", "Wearables", "Furniture", "Lifestyle"];

const products = [
  {
    id: 1,
    name: "Nova Headphones",
    category: "Audio",
    price: 20699,
    oldPrice: 26499,
    rating: 4.8,
    reviews: 128,
    badge: "Best Seller",
    accent: "from #ff9966 to #ff5e62",
    description: "Immersive over-ear sound with adaptive noise control.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Pulse Smartwatch",
    category: "Wearables",
    price: 15699,
    oldPrice: 18999,
    rating: 4.7,
    reviews: 96,
    badge: "New",
    accent: "from #7f7fd5 to #86a8e7",
    description: "Fitness tracking, message sync, and all-day battery life.",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Cloud Lounge Chair",
    category: "Furniture",
    price: 34999,
    oldPrice: 42499,
    rating: 4.9,
    reviews: 41,
    badge: "Premium",
    accent: "from #c79081 to #dfa579",
    description: "Statement seating designed for modern creative spaces.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Aura Lamp",
    category: "Lifestyle",
    price: 6199,
    oldPrice: 8199,
    rating: 4.6,
    reviews: 73,
    badge: "Studio Pick",
    accent: "from #43cea2 to #185a9d",
    description: "Soft ambient lighting with touch dimming control.",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    name: "Echo Speaker",
    category: "Audio",
    price: 11299,
    oldPrice: 14499,
    rating: 4.5,
    reviews: 67,
    badge: "Trending",
    accent: "from #f7971e to #ffd200",
    description: "Room-filling wireless sound in a compact cylindrical body.",
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 6,
    name: "Orbit Desk",
    category: "Furniture",
    price: 32299,
    oldPrice: 37299,
    rating: 4.8,
    reviews: 29,
    badge: "Editor Choice",
    accent: "from #654ea3 to #eaafc8",
    description: "Minimal work desk tailored for creators and remote teams.",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80",
  },
];

const highlights = [
  { value: "12k+", label: "Monthly visitors" },
  { value: "4.9/5", label: "Average rating" },
  { value: "48h", label: "Express dispatch" },
];

const features = [
  {
    title: "Curated collections",
    text: "Browse handpicked pieces designed to bring style, comfort, and function into everyday spaces.",
  },
  {
    title: "Easy cart updates",
    text: "Add favorites to the cart, review the order summary, and adjust selections with a smooth flow.",
  },
  {
    title: "Modern shopping feel",
    text: "Clean layouts, warm colors, and clear product discovery create a neat and enjoyable store experience.",
  },
];

const testimonials = [
  {
    quote: "A clean shopping experience with bold visuals and a smooth browsing flow.",
    author: "ShopWave Customer",
  },
  {
    quote: "The cart, wishlist, and product sections make the store feel simple and complete.",
    author: "Design Community",
  },
];

const featuredCollection = {
  name: "Luxe Living Edit",
  price: 64999,
  image:
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80",
};

function formatPrice(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        activeCategory === "All" || product.category === activeCategory;
      const searchMatch = `${product.name} ${product.description}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchTerm]);

  const cartSummary = useMemo(() => {
    const count = cart.length;
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const shipping = subtotal > 0 ? 1499 : 0;
    const discount = subtotal > 25000 ? 2500 : 0;
    const total = subtotal + shipping - discount;

    return { count, subtotal, shipping, discount, total };
  }, [cart]);

  function addToCart(product) {
    setCart((current) => [...current, product]);
  }

  function removeFromCart(productId) {
    const index = cart.findIndex((item) => item.id === productId);
    if (index === -1) {
      return;
    }

    setCart((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  function toggleWishlist(productId) {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }

  return (
    <div className="app-shell">
      <div className="background-orb orb-one" />
      <div className="background-orb orb-two" />

      <header className="hero">
        <nav className="nav">
          <div>
            <span className="brand-mark">SW</span>
            <span className="brand-text">ShopWave</span>
          </div>
          <div className="nav-links">
            <a href="#catalog">Catalog</a>
            <a href="#features">Collections</a>
            <a href="#reviews">Reviews</a>
          </div>
          <a href="#catalog" className="nav-cta">
            Shop now
          </a>
        </nav>

        <div className="hero-grid">
          <section className="hero-copy">
            <p className="eyebrow">Fresh arrivals</p>
            <h1>Discover modern essentials for your space and style.</h1>
            <p className="hero-text">
              ShopWave brings together premium audio, smart wearables, modern
              furniture, and lifestyle accessories in one clean shopping
              experience made for effortless browsing.
            </p>
            <div className="hero-actions">
              <a href="#catalog" className="primary-button">
                Explore products
              </a>
              <a href="#features" className="secondary-button">
                View collections
              </a>
            </div>

            <div className="stats-row">
              {highlights.map((item) => (
                <article key={item.label} className="stat-card">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </article>
              ))}
            </div>
          </section>

          <aside className="hero-panel">
            <div className="panel-copy">
              <span>Weekly drop</span>
              <h2>Thoughtfully chosen pieces for everyday living.</h2>
              <p>
                Explore elevated products that blend comfort, utility, and
                modern design across every category.
              </p>
            </div>
            <div className="panel-card">
              <div className="panel-visual">
                <img
                  className="panel-image"
                  src={featuredCollection.image}
                  alt={featuredCollection.name}
                />
              </div>
              <div className="panel-meta">
                <div>
                  <p>Featured collection</p>
                  <strong>{featuredCollection.name}</strong>
                </div>
                <span>{formatPrice(featuredCollection.price)}</span>
              </div>
            </div>
          </aside>
        </div>
      </header>

      <main>
        <section className="section" id="catalog">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Smart discovery</p>
              <h2>Shop by mood, need, or category</h2>
            </div>
            <div className="search-box">
              <input
                type="search"
                placeholder="Search products"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
          </div>

          <div className="filters">
            {categories.map((category) => (
              <button
                key={category}
                className={category === activeCategory ? "filter active" : "filter"}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="catalog-layout">
            <div className="products-grid">
              {filteredProducts.map((product) => {
                const inWishlist = wishlist.includes(product.id);

                return (
                  <article key={product.id} className="product-card">
                    <div
                      className="product-visual"
                      style={{ backgroundImage: `linear-gradient(135deg, ${product.accent})` }}
                    >
                      <img
                        className="product-image"
                        src={product.image}
                        alt={product.name}
                      />
                      <span className="product-badge">{product.badge}</span>
                      <button
                        className={inWishlist ? "wishlist active" : "wishlist"}
                        onClick={() => toggleWishlist(product.id)}
                        aria-label={`Toggle wishlist for ${product.name}`}
                      >
                        {inWishlist ? "\u2665" : "\u2661"}
                      </button>
                    </div>

                    <div className="product-info">
                      <div className="product-topline">
                        <span>{product.category}</span>
                        <span>
                          {product.rating} · {product.reviews} reviews
                        </span>
                      </div>
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <div className="product-footer">
                        <div>
                          <strong>{formatPrice(product.price)}</strong>
                          <span>{formatPrice(product.oldPrice)}</span>
                        </div>
                        <button onClick={() => addToCart(product)}>Add to cart</button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="cart-panel">
              <div className="cart-header">
                <div>
                  <p className="eyebrow">Cart preview</p>
                  <h3>{cartSummary.count} items selected</h3>
                </div>
                <span className="cart-pill">{wishlist.length} saved</span>
              </div>

              <div className="cart-items">
                {cart.length === 0 ? (
                  <div className="empty-state">
                    <strong>Your cart is empty</strong>
                    <p>Add your favorite items to get started with your order.</p>
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <article key={`${item.id}-${index}`} className="cart-item">
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.category}</span>
                      </div>
                      <div className="cart-item-actions">
                        <span>{formatPrice(item.price)}</span>
                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                      </div>
                    </article>
                  ))
                )}
              </div>

              <div className="summary">
                <div>
                  <span>Subtotal</span>
                  <strong>{formatPrice(cartSummary.subtotal)}</strong>
                </div>
                <div>
                  <span>Shipping</span>
                  <strong>{formatPrice(cartSummary.shipping)}</strong>
                </div>
                <div>
                  <span>Discount</span>
                  <strong>-{formatPrice(cartSummary.discount)}</strong>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <strong>{formatPrice(cartSummary.total)}</strong>
                </div>
              </div>

              <button className="checkout-button">Proceed to checkout</button>
            </aside>
          </div>
        </section>

        <section className="section feature-strip" id="features">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </section>

        <section className="section review-section" id="reviews">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">What people love</p>
              <h2>Shopping made simple, stylish, and smooth</h2>
            </div>
          </div>

          <div className="review-grid">
            {testimonials.map((item) => (
              <article key={item.author} className="review-card">
                <p>"{item.quote}"</p>
                <strong>{item.author}</strong>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Made with love {"\u2764\uFE0F"} by Varun Mocherla
        </p>
      </footer>
    </div>
  );
}
