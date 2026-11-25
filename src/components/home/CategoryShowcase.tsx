import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MediaImage } from "@/components/ui/MediaImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CategoryDTO } from "@/types";

export function CategoryShowcase({ categories }: { categories: CategoryDTO[] }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Shop by category"
          title="Eight places to start"
          description="Each collection is edited for life in the UAE, from compact apartments to weekend travel."
          href="/categories"
          action="All categories"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-[1.6rem] shadow-[0_18px_40px_-30px_rgba(9,25,50,0.7)] ring-1 ring-white">
              <MediaImage src={category.image} alt="" sizes="(min-width: 1024px) 22vw, 50vw" className="transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand via-brand/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald">Explore</p>
                <h3 className="mt-1 font-heading text-xl font-semibold">{category.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-white/75">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
