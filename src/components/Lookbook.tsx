import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";

interface Outfit {
  title: string;
  subtitle: string;
  hero: ShopifyProduct;
  items: ShopifyProduct[];
}

function find(products: ShopifyProduct[], keywords: string[], exclude: Set<string>): ShopifyProduct | undefined {
  return products.find((p) => {
    if (exclude.has(p.node.id)) return false;
    const hay = `${p.node.title} ${p.node.tags?.join(" ") ?? ""}`.toLowerCase();
    return keywords.some((k) => hay.includes(k));
  });
}

function isAccessory(p: ShopifyProduct) {
  const hay = `${p.node.title} ${p.node.tags?.join(" ") ?? ""}`.toLowerCase();
  return ["pendiente", "collar", "anillo", "pulsera", "accesorio", "joya"].some((k) => hay.includes(k));
}

function buildOutfit(
  title: string,
  subtitle: string,
  products: ShopifyProduct[],
  pieces: string[][],
  used: Set<string>
): Outfit | null {
  const items: ShopifyProduct[] = [];
  for (const keywords of pieces) {
    const found = find(products, keywords, used);
    if (found) {
      items.push(found);
      used.add(found.node.id);
    }
  }
  if (items.length < 2) return null;
  return { title, subtitle, hero: items[0], items };
}

export function Lookbook({ products }: { products: ShopifyProduct[] }) {
  const outfits = useMemo(() => {
    if (products.length < 2) return [];
    const used = new Set<string>();
    const clothing = products.filter((p) => !isAccessory(p));
    const accessories = products.filter(isAccessory);

    const results: Outfit[] = [];

    const o1 = buildOutfit(
      "Domingo lento",
      "Para días sin prisa, en casa o terraza.",
      products,
      [["vestido"], ["pendiente", "collar", "accesorio"]],
      used
    );
    if (o1) results.push(o1);

    const o2 = buildOutfit(
      "Look de oficina",
      "Camisa estructurada y falda con caída.",
      products,
      [["camisa", "blusa", "top"], ["falda"], ["pendiente", "collar"]],
      used
    );
    if (o2) results.push(o2);

    const o3 = buildOutfit(
      "Cita de noche",
      "Una pieza statement y joya delicada.",
      products,
      [["vestido", "top"], ["pendiente", "collar", "anillo"]],
      used
    );
    if (o3) results.push(o3);

    // Fallback: si no hay suficientes etiquetas, agrupa de 2 en 2
    if (results.length === 0 && clothing.length >= 2) {
      const items = [clothing[0], clothing[1], accessories[0]].filter(Boolean) as ShopifyProduct[];
      if (items.length >= 2) {
        results.push({
          title: "El look favorito",
          subtitle: "Las piezas que más se llevan esta temporada.",
          hero: items[0],
          items,
        });
      }
    }

    return results;
  }, [products]);

  if (outfits.length === 0) return null;

  return (
    <section className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Lookbook</p>
            <h2 className="font-serif text-4xl md:text-5xl">Cómo combinarlo</h2>
            <p className="text-muted-foreground mt-3 max-w-md">
              Outfits seleccionados por Anita. Toca cualquier pieza para verla y comprarla.
            </p>
          </div>
        </div>

        <div className="space-y-20">
          {outfits.map((outfit, idx) => (
            <article
              key={outfit.title}
              className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                idx % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Link
                to="/product/$handle"
                params={{ handle: outfit.hero.node.handle }}
                className="block relative aspect-[4/5] bg-secondary overflow-hidden group"
              >
                {outfit.hero.node.images.edges[0] && (
                  <img
                    src={outfit.hero.node.images.edges[0].node.url}
                    alt={outfit.hero.node.images.edges[0].node.altText ?? outfit.hero.node.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 text-xs uppercase tracking-widest">
                  Look {String(idx + 1).padStart(2, "0")}
                </div>
              </Link>

              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  Look {String(idx + 1).padStart(2, "0")}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl mb-3">{outfit.title}</h3>
                <p className="text-muted-foreground mb-8">{outfit.subtitle}</p>

                <p className="text-xs uppercase tracking-widest mb-4">Compra el look</p>
                <ul className="divide-y divide-border border-y border-border">
                  {outfit.items.map((item) => {
                    const img = item.node.images.edges[0]?.node;
                    const price = parseFloat(item.node.priceRange.minVariantPrice.amount).toFixed(2);
                    return (
                      <li key={item.node.id}>
                        <Link
                          to="/product/$handle"
                          params={{ handle: item.node.handle }}
                          className="flex items-center gap-4 py-4 group"
                        >
                          <div className="w-16 h-20 bg-secondary overflow-hidden flex-shrink-0">
                            {img && (
                              <img
                                src={img.url}
                                alt={img.altText ?? item.node.title}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate group-hover:text-accent transition-colors">
                              {item.node.title}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.node.priceRange.minVariantPrice.currencyCode} {price}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
