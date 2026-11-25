import type { CategoryDTO } from "@/types";

const sorts = [
  { value: "newest", label: "Newest" },
  { value: "name", label: "Name" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export function ShopFilters({
  action,
  categories,
  brands,
  values,
}: {
  action: string;
  categories: CategoryDTO[];
  brands: string[];
  values: {
    q: string;
    category: string;
    brand: string;
    min: string;
    max: string;
    sort: string;
    featured: boolean;
  };
}) {
  return (
    <form method="get" action={action} className="space-y-5 rounded-3xl border border-line bg-white p-5">
      <div>
        <h2 className="font-heading text-lg font-semibold text-navy">Filter</h2>
        <p className="mt-1 text-xs leading-5 text-muted">Search by name or brand. Prices filter only products with a current recorded price.</p>
      </div>
      <Field label="Search" htmlFor="q">
        <input id="q" name="q" defaultValue={values.q} placeholder="Name or brand" className={inputClass} />
      </Field>
      <Field label="Category" htmlFor="category">
        <select id="category" name="category" defaultValue={values.category} className={inputClass}>
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>{category.name}</option>
          ))}
        </select>
      </Field>
      <Field label="Brand" htmlFor="brand">
        <select id="brand" name="brand" defaultValue={values.brand} className={inputClass}>
          <option value="">All brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Min AED" htmlFor="min">
          <input id="min" name="min" inputMode="decimal" defaultValue={values.min} className={inputClass} />
        </Field>
        <Field label="Max AED" htmlFor="max">
          <input id="max" name="max" inputMode="decimal" defaultValue={values.max} className={inputClass} />
        </Field>
      </div>
      <Field label="Sort" htmlFor="sort">
        <select id="sort" name="sort" defaultValue={values.sort || "newest"} className={inputClass}>
          {sorts.map((sort) => (
            <option key={sort.value} value={sort.value}>{sort.label}</option>
          ))}
        </select>
      </Field>
      <label className="flex items-center gap-2 text-sm text-ink">
        <input type="checkbox" name="featured" value="1" defaultChecked={values.featured} className="h-4 w-4 accent-emerald" />
        Featured only
      </label>
      <div className="flex gap-2">
        <button type="submit" className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">Apply</button>
        <a href={action} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-navy">Clear</a>
      </div>
    </form>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-navy">
      {label}
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

const inputClass = "w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-navy";
