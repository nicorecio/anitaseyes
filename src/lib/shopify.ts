import { toast } from "sonner";

export const SHOPIFY_API_VERSION = "2025-07";
export const SHOPIFY_STORE_PERMANENT_DOMAIN = "anita-s-eyes-shop-folzn.myshopify.com";
export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
export const SHOPIFY_STOREFRONT_TOKEN = "3947c875fc682e2d60565bc57c7ba6b5";

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: { amount: string; currencyCode: string };
    };
    images: {
      edges: Array<{ node: { url: string; altText: string | null } }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: { amount: string; currencyCode: string };
          availableForSale: boolean;
          selectedOptions: Array<{ name: string; value: string }>;
        };
      }>;
    };
    options: Array<{ name: string; values: string[] }>;
    tags?: string[];
  };
}

export async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Pago requerido", {
      description: "El acceso a Shopify requiere un plan activo. Visita https://admin.shopify.com para actualizar.",
    });
    return;
  }

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  if (data.errors) throw new Error(data.errors.map((e: any) => e.message).join(", "));
  return data;
}

export const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id title description handle
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 5) { edges { node { url altText } } }
          variants(first: 25) {
            edges { node { id title price { amount currencyCode } availableForSale selectedOptions { name value } } }
          }
          options { name values }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id title description descriptionHtml handle productType vendor tags
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 10) { edges { node { url altText } } }
      variants(first: 25) {
        edges { node { id title price { amount currencyCode } availableForSale selectedOptions { name value } } }
      }
      options { name values }
    }
  }
`;

export const RELATED_PRODUCTS_QUERY = `
  query GetRelated($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id title handle
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 2) { edges { node { url altText } } }
          variants(first: 5) {
            edges { node { id title price { amount currencyCode } availableForSale selectedOptions { name value } } }
          }
          options { name values }
          description
        }
      }
    }
  }
`;
