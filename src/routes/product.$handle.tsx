import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  storefrontApiRequest,
  PRODUCT_BY_HANDLE_QUERY,
  RELATED_PRODUCTS_QUERY,
  type ShopifyProduct,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import {
  Loader2,
  ArrowLeft,
  Check,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  Heart,
  Truck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
  head: () => ({
    meta: [
      { title: "Pieza — anitas.eyes" },
      {
        name: "description",
        content:
          "Joyería artesanal hecha a mano por Anita. Cada pieza lleva el nombre de una amiga.",
      },
    ],
  }),
});

function ProductPage() {
  const { handle } = Route.useParams();
  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [activeImg, setActiveImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    setQuantity(1);
    Promise.all([
      storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle }),
      storefrontApiRequest(RELATED_PRODUCTS_QUERY, { first: 8 }),
    ])
      .then(([pData, rData]) => {
        const p = pData?.data?.product;
        setProduct(p);
        if (p) {
          const first = p.variants.edges[0]?.node;
          const init: Record<string, string> = {};
          first?.selectedOptions?.forEach((o: any) => (init[o.name] = o.value));
          setSelectedOptions(init);
        }
        const all = (rData?.data?.products?.edges ?? []) as ShopifyProduct[];
        setRelated(all.filter((e) => e.node.handle !== handle).slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, [handle]);

  const variant = useMemo(() => {
    if (!product) return null;
    return (
      product.variants.edges.find((v: any) =>
        v.node.selectedOptions.every(
          (o: any) => selectedOptions[o.name] === o.value
        )
      )?.node ?? product.variants.edges[0].node
    );
  }, [product, selectedOptions]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center py-32">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="font-serif text-4xl mb-4">Pieza no encontrada</h1>
          <Button asChild>
            <Link to="/">Volver a la tienda</Link>
          </Button>
        </div>
      </div>
    );
  }

  const images = product.images.edges;
  const hasImages = images.length > 0;
  const prevImg = () => setActiveImg((i) => (i - 1 + images.length) % images.length);
  const nextImg = () => setActiveImg((i) => (i + 1) % images.length);

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Añadido al bolso", { description: product.title });
  };

  // For each option, figure out which values lead to an available variant
  const isOptionValueAvailable = (optName: string, value: string) => {
    return product.variants.edges.some((v: any) => {
      const matches = v.node.selectedOptions.every((o: any) =>
        o.name === optName ? o.value === value : selectedOptions[o.name] === o.value
      );
      return matches && v.node.availableForSale;
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <nav className="text-xs uppercase tracking-widest text-muted-foreground mb-8 flex items-center gap-2">
          <Link to="/" className="hover:text-foreground">
            Tienda
          </Link>
          <span>/</span>
          <span className="text-foreground truncate">{product.title}</span>
        </nav>

        <Link
          to="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Seguir mirando
        </Link>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div>
            <div className="relative aspect-[3/4] bg-muted overflow-hidden group">
              {hasImages ? (
                <img
                  src={images[activeImg].node.url}
                  alt={images[activeImg].node.altText ?? product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Sin imagen
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    aria-label="Imagen anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImg}
                    aria-label="Imagen siguiente"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur text-xs px-2 py-1 rounded-full">
                    {activeImg + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {images.map((img: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 w-20 h-20 bg-muted overflow-hidden border-2 transition ${
                      i === activeImg ? "border-foreground" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.node.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:pt-2">
            {product.vendor && (
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
                {product.vendor}
              </p>
            )}
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
              {product.title}
            </h1>
            <p className="text-2xl font-light mb-2">
              {variant?.price.currencyCode}{" "}
              {parseFloat(variant?.price.amount ?? "0").toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mb-8">
              Impuestos incluidos · Envío calculado al pagar
            </p>

            {/* Options */}
            {product.options
              .filter((opt: any) => opt.values.length > 1 && opt.name.toLowerCase() !== "title")
              .map((opt: any) => (
                <div key={opt.name} className="mb-6">
                  <div className="flex items-baseline justify-between mb-3">
                    <p className="text-xs uppercase tracking-widest">{opt.name}</p>
                    <p className="text-xs text-muted-foreground italic font-serif">
                      {selectedOptions[opt.name]}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {opt.values.map((value: string) => {
                      const isSelected = selectedOptions[opt.name] === value;
                      const available = isOptionValueAvailable(opt.name, value);
                      return (
                        <button
                          key={value}
                          onClick={() =>
                            setSelectedOptions((prev) => ({ ...prev, [opt.name]: value }))
                          }
                          className={`px-4 py-2 border text-sm transition ${
                            isSelected
                              ? "border-foreground bg-foreground text-background"
                              : available
                              ? "border-border hover:border-foreground"
                              : "border-border text-muted-foreground line-through opacity-50"
                          }`}
                        >
                          {value}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest mb-3">Cantidad</p>
              <div className="inline-flex items-center border border-border">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-11 w-11 flex items-center justify-center hover:bg-muted transition"
                  aria-label="Reducir cantidad"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="h-11 w-11 flex items-center justify-center hover:bg-muted transition"
                  aria-label="Aumentar cantidad"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="flex gap-3 mb-8">
              <Button
                onClick={handleAdd}
                disabled={isLoading || !variant?.availableForSale}
                size="lg"
                className="flex-1 h-12"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : variant?.availableForSale ? (
                  "Añadir al bolso"
                ) : (
                  "Agotado"
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 w-12 p-0"
                aria-label="Guardar"
                onClick={() => toast("Guardado en favoritos")}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3 mb-8 text-xs">
              <div className="flex items-start gap-2 p-3 border border-border">
                <Sparkles className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Hecho a mano</p>
                  <p className="text-muted-foreground">Pieza única por Anita</p>
                </div>
              </div>
              <div className="flex items-start gap-2 p-3 border border-border">
                <Truck className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Envío España</p>
                  <p className="text-muted-foreground">2-4 días laborables</p>
                </div>
              </div>
            </div>

            {/* Description / Accordion */}
            <Accordion type="single" collapsible defaultValue="desc" className="w-full">
              <AccordionItem value="desc">
                <AccordionTrigger className="text-xs uppercase tracking-widest">
                  Descripción
                </AccordionTrigger>
                <AccordionContent>
                  {product.descriptionHtml ? (
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                    />
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description || "Pieza artesanal hecha a mano con cariño."}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="care">
                <AccordionTrigger className="text-xs uppercase tracking-widest">
                  Cuidados
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm space-y-2">
                  <p>Evita el contacto con perfumes, cremas y agua del mar.</p>
                  <p>Guarda tu pieza en su bolsita para conservar su brillo.</p>
                  <p>Limpia con un paño suave y seco.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="ship">
                <AccordionTrigger className="text-xs uppercase tracking-widest">
                  Envíos y devoluciones
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm space-y-2">
                  <p className="flex items-center gap-2"><Check className="h-4 w-4" /> Envíos a toda España en 2-4 días.</p>
                  <p className="flex items-center gap-2"><Check className="h-4 w-4" /> Pago 100% seguro vía Shopify.</p>
                  <p className="flex items-center gap-2"><Check className="h-4 w-4" /> Cambios y devoluciones en 14 días.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-24 border-t border-border pt-16">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  También te puede gustar
                </p>
                <h2 className="font-serif text-3xl md:text-4xl">Otras piezas</h2>
              </div>
              <Link
                to="/"
                className="hidden sm:inline-block text-sm uppercase tracking-widest border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition"
              >
                Ver toda la colección →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              {related.map((p) => (
                <ProductCard key={p.node.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
