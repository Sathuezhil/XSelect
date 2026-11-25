import { Container } from "@/components/layout/Container";
import { ShopFilters } from "@/components/products/ShopFilters";
import { ProductGrid } from "@/components/products/ProductCard";
import { Pagination } from "@/components/ui/Pagination";
import { DatabaseNotice, EmptyState } from "@/components/ui/States";
import { listCategories } from "@/services/categories";
import { listBrands, listProducts } from "@/services/products";
import { oneParam, pageNumber } from "@/lib/utils";
import { loadResult } from "@/lib/load";
import type { ProductListQuery } from "@/types";

type SearchParams = Record<string, string | string[] | undefined>;

const sorts = new Set(["newest", "name", "price-asc", "price-desc"]);

export async function ProductBrowser({
  searchParams,
  preset,
}: {
  searchParams: Promise<SearchParams>;
  preset: {
    basePath: string;
    categorySlug?: string;
    featured?: boolean;
    trending?: boolean;
    isNewArrival?: boolean;
    deals?: boolean;
    showFilters?: boolean;
  };
}) {
  const params = await searchParams;
  const q = oneParam(params.q);
  const category = preset.categorySlug || oneParam(params.category);
  const brand = oneParam(params.brand);
  const min = oneParam(params.min);
  const max = oneParam(params.max);
  const sortValue = oneParam(params.sort);
  const sort = sorts.has(sortValue) ? (sortValue as ProductListQuery["sort"]) : "newest";
  const featured = preset.featured || oneParam(params.featured) === "1";
  const page = pageNumber(params.page);
  const minPrice = min ? Number(min) : undefined;
  const maxPrice = max ? Number(max) : undefined;

  const loaded = await loadResult(() =>
    Promise.all([
      listProducts({
        q,
        categorySlug: category || undefined,
        brand: brand || undefined,
        minPrice: minPrice != null && Number.isFinite(minPrice) ? minPrice : undefined,
        maxPrice: maxPrice != null && Number.isFinite(maxPrice) ? maxPrice : undefined,
        sort,
        featured: featured || undefined,
        trending: preset.trending,
        isNewArrival: preset.isNewArrival,
        deals: preset.deals,
        page,
        limit: 12,
      }),
      preset.showFilters ? listCategories() : Promise.resolve([]),
      preset.showFilters ? listBrands() : Promise.resolve([]),
    ]),
  );

  if (!loaded.ok) {
    return (
      <Container className="py-10">
        <DatabaseNotice />
      </Container>
    );
  }

  const [result, categories, brands] = loaded.data;

    const query: Record<string, string> = {};
    if (q) query.q = q;
    if (category && !preset.categorySlug) query.category = category;
    if (brand) query.brand = brand;
    if (min) query.min = min;
    if (max) query.max = max;
    if (sort && sort !== "newest") query.sort = sort;
    if (featured && !preset.featured) query.featured = "1";

    return (
      <Container className="py-10">
        <div className={preset.showFilters ? "grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]" : ""}>
          {preset.showFilters && (
            <ShopFilters
              action={preset.basePath}
              categories={categories}
              brands={brands}
              values={{ q, category, brand, min, max, sort: sort ?? "newest", featured }}
            />
          )}
          <div>
            <p className="mb-5 text-sm text-muted">
              {result.total} {result.total === 1 ? "product" : "products"}
            </p>
            {result.items.length === 0 ? (
              <EmptyState title="Nothing matches yet" body="Try another search, or check back after new products are published in the admin dashboard." />
            ) : (
              <ProductGrid products={result.items} />
            )}
            <Pagination page={result.page} totalPages={result.totalPages} pathname={preset.basePath} query={query} />
          </div>
        </div>
      </Container>
    );
}
