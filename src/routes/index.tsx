import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storefrontApiRequest, PRODUCTS_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { Loader2, Instagram, ArrowRight, Mail } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Anitas Eyes — Joyería, ropa y accesorios para mujer" },
      { name: "description", content: "Tienda online de Anitas Eyes. Pedidos y pago seguro." },
    ],
  }),
});

const COLLECTIONS = [
  {
    name: "Pendientes",
    tag: "pendiente",
    image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?w=900&q=80",
  },
  {
    name: "Collares",
    tag: "collar",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&q=80",
  },
  {
    name: "Anillos",
    tag: "anillo",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=900&q=80",
  },
];

const PROCESS = [
  {
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=900&q=80",
    title: "Bocetos a mano",
    text: "Cada pieza nace en papel, dibujada al detalle antes de tocar el metal.",
  },
  {
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=900&q=80",
    title: "Taller artesanal",
    text: "Trabajamos en pequeñas series, cuidando cada acabado a mano.",
  },
  {
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=900&q=80",
    title: "Lista para ti",
    text: "Empaquetada con mimo, lista para regalar — o regalarte.",
  },
];

function Index() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    storefrontApiRequest(PRODUCTS_QUERY, { first: 24 })
      .then((d) => setProducts(d?.data?.products?.edges ?? []))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const featured = useMemo(() => products.slice(0, 4), [products]);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("¡Gracias!", { description: "Te avisaremos cuando salga una pieza nueva." });
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* HERO */}
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
            <div className="flex flex-wrap gap-4">
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

      {/* COLECCIONES DESTACADAS */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">Explora</p>
            <h2 className="font-serif text-4xl md:text-5xl">Colecciones destacadas</h2>
          </div>
          <a href="#tienda" className="hidden md:inline-flex items-center text-sm uppercase tracking-widest hover:text-accent">
            Ver todo <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {COLLECTIONS.map((c) => (
            <a
              key={c.name}
              href="#tienda"
              className="group relative aspect-[3/4] overflow-hidden bg-secondary"
            >
              <img
                src={c.image}
                alt={c.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                <p className="text-xs uppercase tracking-[0.3em] mb-2 opacity-80">Colección</p>
                <p className="font-serif text-3xl">{c.name}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* EL PROCESO */}
      <section className="bg-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="max-w-2xl mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">El proceso</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Hecho a mano, con tiempo y con cariño.
            </h2>
            <p className="text-muted-foreground text-lg">
              Detrás de cada pieza hay horas de taller, pruebas y una idea pensada para durar — no para llenar.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {PROCESS.map((p, i) => (
              <div key={p.title}>
                <div className="aspect-[4/5] overflow-hidden mb-5 bg-background">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-2">
                  0{i + 1}
                </p>
                <h3 className="font-serif text-2xl mb-2">{p.title}</h3>
                <p className="text-muted-foreground">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIO */}
      <section className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">En palabras de Anita</p>
        <blockquote className="font-serif text-3xl md:text-5xl leading-tight italic">
          “Quería crear piezas que se sientan como un abrazo —
          <span className="text-accent"> bonitas, cercanas y para siempre.</span>”
        </blockquote>
        <p className="mt-8 text-sm uppercase tracking-widest text-muted-foreground">
          Anita · Fundadora
        </p>
      </section>

      {/* TIENDA */}
      <section id="tienda" className="max-w-7xl mx-auto px-6 py-20 border-t border-border">
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
          <>
            {featured.length > 0 && (
              <div className="mb-16">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">Favoritos de la semana</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
                  {featured.map((p) => <ProductCard key={p.node.id} product={p} />)}
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {products.map((p) => <ProductCard key={p.node.id} product={p} />)}
            </div>
          </>
        )}
      </section>

      {/* NEWSLETTER */}
      <section className="bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <Mail className="mx-auto h-6 w-6 mb-6 opacity-70" />
          <h2 className="font-serif text-4xl md:text-5xl mb-4">
            Sé la primera en saberlo.
          </h2>
          <p className="opacity-70 max-w-md mx-auto mb-8">
            Avisos de nuevas piezas, ediciones limitadas y momentos del taller. Sin ruido.
          </p>
          <form onSubmit={onSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="bg-background/10 border-background/20 text-background placeholder:text-background/50 h-12"
            />
            <Button type="submit" size="lg" variant="secondary">
              Suscribirme
            </Button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <p className="font-serif text-2xl mb-3">anitas.eyes</p>
            <p className="text-muted-foreground max-w-sm">
              Joyería, ropa y accesorios para mujeres con mirada propia. Hecho con cariño.
            </p>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs mb-3">Tienda</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#tienda" className="hover:text-accent">Productos</a></li>
              <li><Link to="/sobre" className="hover:text-accent">Sobre Anita</Link></li>
            </ul>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs mb-3">Ayuda</p>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/envios" className="hover:text-accent">Envíos</Link></li>
              <li><Link to="/cambios" className="hover:text-accent">Cambios</Link></li>
              <li><Link to="/devoluciones" className="hover:text-accent">Devoluciones</Link></li>
            </ul>
          </div>
          <div>
            <p className="uppercase tracking-widest text-xs mb-3">Contacto</p>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="https://www.instagram.com/anitas.eyes/" target="_blank" rel="noreferrer" className="hover:text-accent">
                  Instagram @anitas.eyes
                </a>
              </li>
              <li>
                <a href="mailto:hola@anitaseyes.com" className="hover:text-accent">hola@anitaseyes.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-6 py-6 text-xs text-muted-foreground flex flex-col md:flex-row justify-between gap-2">
            <p>© {new Date().getFullYear()} Anitas Eyes. Hecho con cariño.</p>
            <p>Envíos a toda España · Pago seguro</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
