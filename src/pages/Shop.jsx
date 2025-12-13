import React, { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/context/CurrencyContext";

const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under 500", min: 0, max: 500 },
  { label: "500 - 1000", min: 500, max: 1000 },
  { label: "1000 - 2000", min: 1000, max: 2000 },
  { label: "Over 2000", min: 2000, max: 3500 },
];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rating", value: "rating" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState(4);

  const { formatPrice } = useCurrency();

  const selectedCategory = (searchParams.get("category") || "all").toString();
  const rawPrice = searchParams.get("price") || "0";
  const priceIndex = Math.min(Math.max(Number.isNaN(Number.parseInt(rawPrice)) ? 0 : Number.parseInt(rawPrice), 0), priceRanges.length - 1);
  const selectedSort = (searchParams.get("sort") || "featured").toString();
  const selectedSpecial = (searchParams.get("special") || "").toString();

  const priceLabels = priceRanges.map((range) => ({
    ...range,
    label: range.label.replace(/(\d+)/g, (match) => {
      const kes = parseInt(match, 10);
      return formatPrice(kes);
    }),
  }));

  const categoryList = useMemo(() => categories, []);

  // --- URL normalization on mount ---
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let changed = false;

    // price sanity
    const p = params.get("price");
    const parsed = parseInt(p ?? "0", 10);
    if (p !== null) {
      if (isNaN(parsed) || parsed < 0 || parsed >= priceRanges.length) {
        params.delete("price");
        changed = true;
      }
    }

    // category sanity
    const cat = params.get("category");
    if (cat !== null) {
      const good = categoryList.some((c) => c.id === cat);
      if (!good) {
        params.delete("category");
        changed = true;
      }
    }

    // sort sanity
    const sort = params.get("sort");
    if (sort !== null && !sortOptions.some((s) => s.value === sort)) {
      params.delete("sort");
      changed = true;
    }

    // special sanity
    const sp = params.get("special");
    if (sp !== null && sp !== "new" && sp !== "bestsellers") {
      params.delete("special");
      changed = true;
    }

    if (changed) {
      setSearchParams(params, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    if (selectedCategory !== "all") filtered = filtered.filter((p) => p.category === selectedCategory);
    const priceRange = priceRanges[priceIndex];
    if (priceRange) filtered = filtered.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    if (selectedSpecial === "new") filtered = filtered.filter((p) => p.isNew);
    if (selectedSpecial === "bestsellers") filtered = filtered.filter((p) => p.featured);

    switch (selectedSort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return filtered;
  }, [selectedCategory, priceIndex, selectedSort, selectedSpecial]);

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key === "category" && value !== "all") params.delete("special");
    if (value === "all" || value === "0" || value === "" || value == null) params.delete(key);
    else params.set(key, value);
    setSearchParams(params);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold mb-4">Shop Collection</h1>
          <p className="text-muted-foreground text-lg">
            Explore our handcrafted collection, each piece made with love and attention to detail.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
              <Filter className="h-4 w-4 mr-2" /> Filters
            </Button>
            <p className="text-sm text-muted-foreground">{filteredProducts.length} products</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1 border border-border rounded-lg p-1">
              <button onClick={() => setGridCols(3)} className={cn("p-2 rounded-md", gridCols === 3 ? "bg-muted" : "" )}><LayoutGrid className="h-4 w-4" /></button>
              <button onClick={() => setGridCols(4)} className={cn("p-2 rounded-md", gridCols === 4 ? "bg-muted" : "" )}><Grid3X3 className="h-4 w-4" /></button>
            </div>

            <select value={selectedSort} onChange={(e) => updateFilter("sort", e.target.value)} className="h-10 px-4 pr-8 rounded-lg border border-border bg-card text-sm">
              {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className={cn("w-64 space-y-6", showFilters ? "block" : "hidden lg:block")}> 
            <div>
              <h3 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2"><SlidersHorizontal className="h-4 w-4" /> Categories</h3>
              <div className="space-y-2">
                <button onClick={() => updateFilter("category", "all")} className={cn("w-full text-left px-4 py-2 rounded-lg text-sm", selectedCategory === "all" ? "bg-primary/10 text-primary font-medium" : "" )}>All Products</button>
                {categoryList.map((cat) => (
                  <button key={cat.id} onClick={() => updateFilter("category", cat.id)} className={cn("w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-2", selectedCategory === cat.id ? "bg-primary/10 text-primary font-medium" : "" )}>
                    <span>{cat.icon}</span>{cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold mb-4">Special</h3>
              <div className="space-y-2">
                <button onClick={() => updateFilter("special", "new")} className={cn("w-full text-left px-4 py-2 rounded-lg text-sm", selectedSpecial === "new" ? "bg-primary/10 text-primary font-medium" : "" )}>✨ New Arrivals</button>
                <button onClick={() => updateFilter("special", "bestsellers")} className={cn("w-full text-left px-4 py-2 rounded-lg text-sm", selectedSpecial === "bestsellers" ? "bg-primary/10 text-primary font-medium" : "" )}>🔥 Best Sellers</button>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-lg font-semibold mb-4">Price Range</h3>
              <div className="space-y-2">
                {priceLabels.map((range, index) => (
                  <button key={range.label} onClick={() => updateFilter("price", index.toString())} className={cn("w-full text-left px-4 py-2 rounded-lg text-sm", priceIndex === index ? "bg-primary/10 text-primary font-medium" : "" )}>{range.label}</button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className={cn("grid gap-6 grid-cols-1 sm:grid-cols-2", gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
                {filteredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">No products found matching your filters.</p>
                <Button onClick={() => setSearchParams({})}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}