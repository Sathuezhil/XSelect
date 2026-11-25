import Link from "next/link";
import { MediaImage } from "@/components/ui/MediaImage";
import { PriceBlock } from "@/components/products/PriceBlock";
import { buttonClass } from "@/components/ui/button-styles";
import type { ProductDTO } from "@/types";

export function ProductCard({ product }: { product: ProductDTO }) {
  const image = product.images[0];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white shadow-[0_18px_40px_-28px_rgba(9,25,50,0.45)] ring-1 ring-slate-200/80 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_-28px_rgba(9,25,50,0.55)] hover:ring-emerald/30">
      <Link href={`/product/${product.slug}`} aria-label={product.name} className="relative block aspect-[4/5] overflow-hidden bg-canvas">
        {image && (
          <MediaImage
            src={image}
            alt={product.name}
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 33vw, 100vw"
            className="transition duration-500 group-hover:scale-[1.04]"
          />
        )}
        {product.isDemo && (
          <span aria-hidden="true" className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy">
            Demo
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{product.category.name}</p>
        <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-navy">
          <Link href={`/product/${product.slug}`} className="hover:text-emerald-ink">{product.name}</Link>
        </h3>
        <p className="mt-1 text-xs text-muted">{product.brand}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">{product.shortDescription}</p>
        <div className="mt-4">
          <PriceBlock product={product} />
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Link href={`/product/${product.slug}`} className={buttonClass("ghost", "whitespace-nowrap px-2.5 py-1.5 text-center text-xs")}>
            View product
          </Link>
          <a
            href={`/out/${product.slug}`}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className={buttonClass("primary", "whitespace-nowrap px-2.5 py-1.5 text-center text-xs")}
          >
            Buy on Amazon
          </a>
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ products }: { products: ProductDTO[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
