import { useEffect, useState } from "react";
import { ShoppingBag, ExternalLink, Loader2, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";

/**
 * Sticky mini-cart bar shown on mobile when the cart has items.
 * - Stays visible across navigation (mounted in root)
 * - Shows count + total, opens the full drawer to edit, or jumps straight to checkout
 * - Adds bottom safe-area padding and exposes its height as --mini-cart-h
 *   so pages can offset content (we also add bottom padding on body via spacer).
 */
export function MobileMiniCart() {
  const items = useCartStore((s) => s.items);
  const isLoading = useCartStore((s) => s.isLoading);
  const isSyncing = useCartStore((s) => s.isSyncing);
  const getCheckoutUrl = useCartStore((s) => s.getCheckoutUrl);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const currency = items[0]?.price.currencyCode ?? "EUR";

  // Avoid SSR/hydration mismatch — only render after mount
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || totalItems === 0) return null;

  const openDrawer = () => {
    // Reuse the existing CartDrawer trigger in the header — find and click it
    const trigger = document.querySelector<HTMLButtonElement>(
      '[data-cart-trigger="true"]'
    );
    trigger?.click();
  };

  const checkout = () => {
    const url = getCheckoutUrl();
    if (url) window.location.href = url;
  };

  const busy = isLoading || isSyncing;

  return (
    <>
      {/* Spacer so the fixed bar doesn't cover page content */}
      <div aria-hidden="true" className="md:hidden h-20" />

      <div
        className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        role="region"
        aria-label="Resumen del carrito"
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={openDrawer}
            className="flex items-center gap-3 flex-1 min-w-0 text-left rounded-md py-1 -ml-1 pl-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            aria-label={`Abrir bolso, ${totalItems} artículo${totalItems !== 1 ? "s" : ""}, total ${currency} ${totalPrice.toFixed(2)}`}
          >
            <span className="relative inline-flex h-10 w-10 items-center justify-center bg-secondary rounded-full shrink-0">
              <ShoppingBag className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-foreground text-background text-[10px] font-semibold flex items-center justify-center">
                {totalItems}
              </span>
            </span>
            <span className="flex flex-col min-w-0">
              <span className="text-[11px] uppercase tracking-widest text-muted-foreground leading-tight">
                Tu bolso
              </span>
              <span className="text-base font-semibold leading-tight truncate">
                {currency} {totalPrice.toFixed(2)}
              </span>
            </span>
            <ChevronUp className="h-4 w-4 text-muted-foreground ml-1 shrink-0" />
          </button>

          <Button
            onClick={checkout}
            size="lg"
            disabled={busy}
            className="h-11 shrink-0"
            aria-label="Ir al checkout"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <ExternalLink className="h-4 w-4 mr-2" />
                Checkout
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
