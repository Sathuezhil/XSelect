import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EmptyState } from "@/components/ui/States";
import type { ProductDTO } from "@/types";

export function ProductRail({
  eyebrow,
  title,
  description,
  href,
  action,
  products,
  empty,
  tone = "plain",
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  action: string;
  products: ProductDTO[];
  empty: string;
  tone?: "plain" | "band";
}) {
  return (
    <section className={tone === "band" ? "bg-white py-16 md:py-20" : "py-16 md:py-20"}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} href={href} action={action} />
        <div className="mt-8">
          {products.length === 0 ? (
            <EmptyState title="No products in this section" body={empty} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
