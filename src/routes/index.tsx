import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { Loader2, Instagram, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Anitas Eyes — Joyería, ropa y accesorios para mujer" },
      { name: "description", content: "Tienda online de Anitas Eyes. Pedidos y pago seguro." },
    ],
  }),
});

function Index() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    storefrontApiRequest(PRODUCTS_QUERY, { first: 24 })
      .then((d) => setProducts(d?.data?.products?.edges ?? []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="relative overflow-hidden border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-24 md:py-36 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
              Edición curada · Made with love
            </p>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6">
              Piezas que <em className="italic text-accent">enamoran</em> a primera vista.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mb-8">
              Joyería, ropa y accesorios seleccionados para la mujer que se atreve a brillar todos los días.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <a href="#tienda">
                  Ver tienda <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://www.instagram.com/anitas.eyes/" target="_blank" rel="noreferrer">
                  <Instagram className="mr-2 h-4 w-4" /> @anitas.eyes
                </a>
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/5] bg-secondary overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80"
              alt="Anitas Eyes editorial"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-background/90 backdrop-blur p-4">
              <p className="font-serif text-xl">Nueva temporada</p>
              <p className="text-sm text-muted-foreground">Descubre las piezas favoritas de Anita</p>
            </div>
          </div>
        </div>
      </section>

      <section id="tienda" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Tienda</p>
            <h2 className="font-serif text-4xl md:text-5xl">Productos</h2>
          </div>
          <p className="text-sm text-muted-foreground hidden md:block">
            Envíos a toda España · Pago seguro
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border">
            <p className="font-serif text-2xl mb-2">No hay productos todavía</p>
            <p className="text-muted-foreground max-w-md mx-auto">
              Cuéntale a Anita qué quieres añadir a la tienda (nombre, precio y foto) y aparecerá aquí al instante.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
          </div>
        )}
      </section>

      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="font-serif text-2xl mb-2">anitas.eyes</p>
            <p className="text-muted-foreground">Joyería, ropa y accesorios para mujeres con mirada propia.</p>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs mb-3">Síguenos</p>
            <a href="https://www.instagram.com/anitas.eyes/" target="_blank" rel="noreferrer" className="hover:text-accent">
              Instagram @anitas.eyes
            </a>
          </div>
          <div className="text-muted-foreground">
            © {new Date().getFullYear()} Anitas Eyes. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
