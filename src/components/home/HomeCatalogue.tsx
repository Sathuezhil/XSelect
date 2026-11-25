import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { ProductRail } from "@/components/home/ProductRail";
import { WhyChoose } from "@/components/home/WhyChoose";
import { GuideCards } from "@/components/blog/GuideCards";
import { DatabaseNotice } from "@/components/ui/States";
import { listCategories } from "@/services/categories";
import { listProducts } from "@/services/products";
import { listPosts } from "@/services/posts";
import { loadResult } from "@/lib/load";

export async function HomeCatalogue() {
  const loaded = await loadResult(() =>
    Promise.all([
      listCategories(),
      listProducts({ featured: true, limit: 4, page: 1 }),
      listProducts({ deals: true, limit: 4, page: 1 }),
      listProducts({ trending: true, limit: 4, page: 1 }),
      listProducts({ isNewArrival: true, limit: 4, page: 1 }),
      listPosts({ publishedOnly: true, limit: 3, page: 1 }),
    ]),
  );

  if (!loaded.ok) {
    return (
      <div className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <DatabaseNotice />
        </div>
        <div className="mt-16">
          <WhyChoose />
        </div>
      </div>
    );
  }

  const [categories, featured, deals, trending, arrivals, guides] = loaded.data;

    return (
      <>
        <CategoryShowcase categories={categories} />
        <ProductRail
          eyebrow="Featured"
          title="Selected this season"
          description="A short edit of products our editors would actually recommend looking at."
          href="/shop?featured=1"
          action="View featured"
          tone="band"
          products={featured.items}
          empty="Mark products as featured in the admin dashboard to fill this row."
        />
        <ProductRail
          eyebrow="Best deals"
          title="Worth a closer look"
          description="Editor picks for value. These are not timed discount claims, and the live price is always on Amazon."
          href="/deals"
          action="See all picks"
          products={deals.items}
          empty="Mark products as deal picks to show them here. We do not invent discount percentages."
        />
        <ProductRail
          eyebrow="Trending"
          title="What people keep opening"
          description="Products drawing attention in the catalogue. Popularity here is editorial, not a scraped sales rank."
          href="/trending"
          action="View trending"
          tone="band"
          products={trending.items}
          empty="Trending products will appear after they are flagged in the dashboard."
        />
        <ProductRail
          eyebrow="New arrivals"
          title="Just added"
          description="The latest entries in the XSelect catalogue."
          href="/new-arrivals"
          action="View new arrivals"
          products={arrivals.items}
          empty="New products show here when they are marked as new arrivals."
        />
        <WhyChoose />
        <GuideCards posts={guides.items} />
      </>
    );
}
