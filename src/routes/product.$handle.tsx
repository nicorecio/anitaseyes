import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$handle")({
  component: ProductPage,
});

function ProductPage() {
  const { handle } = Route.useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [activeImg, setActiveImg] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle })
      .then((d) => {
        const p = d?.data?.product;
        setProduct(p);
        setSelectedVariantId(p?.variants?.edges?.[0]?.node?.id ?? "");
      })
      .finally(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center py-32"><Loader2 className="h-6 w-6 animate-spin" /></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="font-serif text-4xl mb-4">Producto no encontrado</h1>
          <Button asChild><Link to="/">Volver a la tienda</Link></Button>
        </div>
      </div>
    );
  }

  const variant = product.variants.edges.find((v: any) => v.node.id === selectedVariantId)?.node ?? product.variants.edges[0].node;
  const images = product.images.edges;

  const handleAdd = async () => {
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Añadido al bolso", { description: product.title });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" /> Volver
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="aspect-[3/4] bg-muted overflow-hidden mb-4">
              {images[activeImg]?.node ? (
                <img src={images[activeImg].node.url} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">Sin imagen</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img: any, i: number) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-20 h-20 bg-muted overflow-hidden border-2 ${i === activeImg ? "border-foreground" : "border-transparent"}`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="md:pt-4">
            <h1 className="font-serif text-4xl md:text-5xl mb-3">{product.title}</h1>
            <p className="text-2xl mb-6">
              {variant.price.currencyCode} {parseFloat(variant.price.amount).toFixed(2)}
            </p>

            {product.description && (
              <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>
            )}

            {product.options.map((opt: any) => (
              opt.values.length > 1 && (
                <div key={opt.name} className="mb-6">
                  <p className="text-xs uppercase tracking-widest mb-3">{opt.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.edges.map((v: any) => {
                      const val = v.node.selectedOptions.find((o: any) => o.name === opt.name)?.value;
                      const isSelected = v.node.id === selectedVariantId;
                      return (
                        <button
                          key={v.node.id}
                          onClick={() => setSelectedVariantId(v.node.id)}
                          className={`px-4 py-2 border text-sm ${isSelected ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )
            ))}

            <Button onClick={handleAdd} disabled={isLoading || !variant.availableForSale} size="lg" className="w-full">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : variant.availableForSale ? "Añadir al bolso" : "Agotado"}
            </Button>

            <div className="mt-8 pt-8 border-t border-border text-sm text-muted-foreground space-y-2">
              <p className="flex items-center gap-2"><Check className="h-4 w-4" /> Pago 100% seguro vía Shopify</p>
              <p className="flex items-center gap-2"><Check className="h-4 w-4" /> Envíos a toda España</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
