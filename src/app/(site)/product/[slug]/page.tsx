import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AffiliateDisclosure } from "@/components/products/AffiliateDisclosure";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductCard } from "@/components/products/ProductCard";
import { PriceBlock } from "@/components/products/PriceBlock";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { buttonClass } from "@/components/ui/button-styles";
import { canShowPrice } from "@/lib/utils";
import { getProductBySlug, relatedProducts } from "@/services/products";
import { site } from "@/lib/site";
import type { ProductDTO } from "@/types";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) return { title: "Product" };
  const title = product.seoTitle || product.name;
  const description = product.seoDescription || product.shortDescription;
  return {
    title,
    description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: { title, description, url: `/product/${product.slug}`, type: "website" },
  };
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<Container className="py-16 text-sm text-muted">Loading product…</Container>}>
      <ProductContent params={params} />
    </Suspense>
  );
}

async function ProductContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) notFound();
  const related = await relatedProducts(product).catch(() => []);
  return (
    <Container className="py-8 md:py-12">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.category.name, href: `/categories/${product.category.slug}` },
          { label: product.name },
        ]}
      />
      {product.isDemo && (
        <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
          Demonstration product. The copy, specifications, and images are sample content for this preview. They are not live Amazon data, and no public price is shown.
        </p>
      )}
      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} name={product.name} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-ink">{product.category.name}</p>
          <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-navy">{product.name}</h1>
          <p className="mt-2 text-sm text-muted">{product.brand}</p>
          <p className="mt-5 text-lg leading-8 text-ink">{product.shortDescription}</p>
          <div className="mt-6"><PriceBlock product={product} prominent /></div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={`/out/${product.slug}`} target="_blank" rel="sponsored nofollow noopener noreferrer" className={buttonClass("primary", "uppercase tracking-[0.14em]")}>
              Buy on Amazon
            </a>
            <Link href={`/categories/${product.category.slug}`} className={buttonClass("ghost")}>More in this category</Link>
          </div>
          <div className="mt-4"><AffiliateDisclosure compact /></div>
        </div>
      </div>
      <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-10">
          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">Description</h2>
            {product.description.split(/\n{2,}/).map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-4 leading-8 text-ink">{paragraph}</p>
            ))}
          </section>
          {product.features.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-semibold text-navy">Key features</h2>
              <ul className="mt-4 space-y-2">
                {product.features.map((feature) => (
                  <li key={feature} className="rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-ink">{feature}</li>
                ))}
              </ul>
            </section>
          )}
          {product.specifications.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-semibold text-navy">Specifications</h2>
              <dl className="mt-4 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
                {product.specifications.map((spec) => (
                  <div key={spec.label} className="grid gap-1 px-4 py-3 sm:grid-cols-[180px_1fr]">
                    <dt className="text-sm font-medium text-muted">{spec.label}</dt>
                    <dd className="text-sm text-ink">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
        <div className="space-y-4">
          <h2 className="font-heading text-2xl font-semibold text-navy">Editor&apos;s notes</h2>
          <p className="text-sm leading-6 text-muted">These points are written by XSelect. They are not customer reviews, star ratings, or verified purchase claims.</p>
          <Note title="Pros" items={product.pros} />
          <Note title="Cons" items={product.cons} />
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-3xl font-semibold text-navy">Related products</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((item) => <ProductCard key={item.id} product={item} />)}
          </div>
        </section>
      )}
      <ProductSchema product={product} />
    </Container>
  );
}

function Note({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="rounded-3xl border border-line bg-white p-5">
      <h3 className="font-semibold text-navy">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-ink">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

function ProductSchema({ product }: { product: ProductDTO }) {
  if (product.isDemo) return null;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category.name,
    url: `${site.url}/product/${product.slug}`,
  };
  if (canShowPrice(product) && product.price != null) {
    data.offers = {
      "@type": "Offer",
      priceCurrency: "AED",
      price: product.price,
      url: product.amazonUrl,
    };
  }
  return <JsonLd data={data} />;
}
