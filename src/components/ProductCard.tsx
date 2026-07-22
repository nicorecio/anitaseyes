import { Link } from "@tanstack/react-router";
import type { ShopifyProduct } from "@/lib/shopify";

function getBadge(p: ShopifyProduct["node"]) {
  const variants = p.variants.edges.map((v) => v.node);
  const available = variants.filter((v) => v.availableForSale);
  const tags = (p.tags ?? []).map((t) => t.toLowerCase());

  if (available.length === 0) return { label: "Agotado", tone: "muted" as const };
  if (tags.includes("preorder")) return { label: "Preventa", tone: "accent" as const };
  if (tags.includes("nuevo") || tags.includes("new")) return { label: "Nuevo", tone: "accent" as const };
  if (tags.includes("best-seller") || tags.includes("bestseller")) return { label: "Best seller", tone: "dark" as const };
  if (variants.length > 1 && available.length === 1) return { label: "Última talla", tone: "dark" as const };
  return null;
}

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const img = p.images.edges[0]?.node;
  const price = p.priceRange.minVariantPrice;
  const badge = getBadge(p);
  const soldOut = badge?.label === "Agotado";

  const badgeClass =
    badge?.tone === "dark"
      ? "bg-foreground text-background"
      : badge?.tone === "accent"
      ? "bg-accent text-accent-foreground"
      : "bg-background/90 text-foreground border border-border";

  return (
    <Link to="/product/$handle" params={{ handle: p.handle }} className="group block">
      <div className="relative aspect-[3/4] bg-muted overflow-hidden mb-3">
        {img ? (
          <img
            src={img.url}
            alt={img.altText ?? p.title}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${soldOut ? "opacity-60" : ""}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Sin imagen</div>
        )}
        {badge && (
          <span className={`absolute top-3 left-3 text-[10px] uppercase tracking-widest px-2 py-1 ${badgeClass}`}>
            {badge.label}
          </span>
        )}
      </div>
      <h3 className="font-medium text-sm uppercase tracking-wide">{p.title}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: price.currencyCode }).format(parseFloat(price.amount))}
      </p>
    </Link>
  );
}
