import { Link } from "@tanstack/react-router";
import type { ShopifyProduct } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const img = p.images.edges[0]?.node;
  const price = p.priceRange.minVariantPrice;
  return (
    <Link to="/product/$handle" params={{ handle: p.handle }} className="group block">
      <div className="aspect-[3/4] bg-muted overflow-hidden mb-3">
        {img ? (
          <img
            src={img.url}
            alt={img.altText ?? p.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Sin imagen</div>
        )}
      </div>
      <h3 className="font-medium text-sm uppercase tracking-wide">{p.title}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        {price.currencyCode} {parseFloat(price.amount).toFixed(2)}
      </p>
    </Link>
  );
}
