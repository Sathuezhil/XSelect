"use client";

import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, productSchema, type ProductFormValues } from "@/lib/validators";
import { slugify } from "@/lib/utils";
import type { CategoryDTO, ProductDTO } from "@/types";

function rows(values: string[]) {
  return values.length ? values.map((value) => ({ value })) : [{ value: "" }];
}

export function ProductForm({ product, categories }: { product?: ProductDTO; categories: CategoryDTO[] }) {
  const router = useRouter();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: product?.name ?? "",
      slug: product?.slug ?? "",
      shortDescription: product?.shortDescription ?? "",
      description: product?.description ?? "",
      images: rows(product?.images ?? []),
      categoryId: product?.category.id ?? categories[0]?.id ?? "",
      brand: product?.brand ?? "",
      features: rows(product?.features ?? []),
      specifications: product?.specifications.length ? product.specifications : [{ label: "", value: "" }],
      pros: rows(product?.pros ?? []),
      cons: rows(product?.cons ?? []),
      amazonUrl: product?.amazonUrl ?? "",
      affiliateUrl: product?.affiliateUrl ?? "",
      affiliateTag: product?.affiliateTag ?? "",
      price: product?.price != null ? String(product.price) : "",
      featured: product?.featured ?? false,
      trending: product?.trending ?? false,
      isNewArrival: product?.isNewArrival ?? false,
      isDeal: product?.isDeal ?? false,
      active: product?.active ?? true,
      isDemo: product?.isDemo ?? true,
      seoTitle: product?.seoTitle ?? "",
      seoDescription: product?.seoDescription ?? "",
    },
  });

  const images = useFieldArray({ control: form.control, name: "images" });
  const features = useFieldArray({ control: form.control, name: "features" });
  const specifications = useFieldArray({ control: form.control, name: "specifications" });
  const pros = useFieldArray({ control: form.control, name: "pros" });
  const cons = useFieldArray({ control: form.control, name: "cons" });

  async function onSubmit(values: ProductFormValues) {
    const price = values.price.trim() === "" ? null : Number(values.price);
    const payload = {
      ...values,
      slug: slugify(values.slug || values.name),
      images: values.images.map((item) => item.value.trim()).filter(Boolean),
      features: values.features.map((item) => item.value.trim()).filter(Boolean),
      specifications: values.specifications.filter((item) => item.label.trim() && item.value.trim()),
      pros: values.pros.map((item) => item.value.trim()).filter(Boolean),
      cons: values.cons.map((item) => item.value.trim()).filter(Boolean),
      price: price != null && Number.isFinite(price) ? price : null,
    };
    const parsed = productSchema.safeParse(payload);
    if (!parsed.success) {
      form.setError("root", { message: parsed.error.issues[0]?.message ?? "Check the form." });
      return;
    }
    const response = await fetch(product ? `/api/products/${product.id}` : "/api/products", {
      method: product ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    const body = (await response.json()) as { error?: string };
    if (!response.ok) {
      form.setError("root", { message: body.error ?? "Could not save the product." });
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  async function onDelete() {
    if (!product || !confirm("Delete this product?")) return;
    const response = await fetch(`/api/products/${product.id}`, { method: "DELETE" });
    if (!response.ok) {
      form.setError("root", { message: "Could not delete the product." });
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Text label="Name" {...form.register("name")} error={form.formState.errors.name?.message} onBlur={() => {
          if (!form.getValues("slug")) form.setValue("slug", slugify(form.getValues("name")));
        }} />
        <Text label="Slug" {...form.register("slug")} error={form.formState.errors.slug?.message} />
        <Text label="Brand" {...form.register("brand")} error={form.formState.errors.brand?.message} />
        <label className="block text-sm font-medium text-navy">
          Category
          <select className={inputClass} {...form.register("categoryId")}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </label>
      </div>
      <TextArea label="Short description" rows={3} {...form.register("shortDescription")} error={form.formState.errors.shortDescription?.message} />
      <TextArea label="Full description" rows={6} {...form.register("description")} error={form.formState.errors.description?.message} />
      <ListEditor title="Images" hint="Use image URLs you have permission to publish. Do not paste Amazon-hosted images." onAdd={() => images.append({ value: "" })}>
        {images.fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input className={inputClass} placeholder="https://" {...form.register(`images.${index}.value`)} />
            <Remove onClick={() => images.remove(index)} />
          </div>
        ))}
      </ListEditor>
      <ListEditor title="Features" onAdd={() => features.append({ value: "" })}>
        {features.fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input className={inputClass} {...form.register(`features.${index}.value`)} />
            <Remove onClick={() => features.remove(index)} />
          </div>
        ))}
      </ListEditor>
      <ListEditor title="Specifications" onAdd={() => specifications.append({ label: "", value: "" })}>
        {specifications.fields.map((field, index) => (
          <div key={field.id} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
            <input className={inputClass} placeholder="Label" {...form.register(`specifications.${index}.label`)} />
            <input className={inputClass} placeholder="Value" {...form.register(`specifications.${index}.value`)} />
            <Remove onClick={() => specifications.remove(index)} />
          </div>
        ))}
      </ListEditor>
      <div className="grid gap-4 md:grid-cols-2">
        <ListEditor title="Pros" hint="Editorial notes, not customer reviews." onAdd={() => pros.append({ value: "" })}>
          {pros.fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input className={inputClass} {...form.register(`pros.${index}.value`)} />
              <Remove onClick={() => pros.remove(index)} />
            </div>
          ))}
        </ListEditor>
        <ListEditor title="Cons" onAdd={() => cons.append({ value: "" })}>
          {cons.fields.map((field, index) => (
            <div key={field.id} className="flex gap-2">
              <input className={inputClass} {...form.register(`cons.${index}.value`)} />
              <Remove onClick={() => cons.remove(index)} />
            </div>
          ))}
        </ListEditor>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Text label="Amazon.ae URL" {...form.register("amazonUrl")} error={form.formState.errors.amazonUrl?.message} />
        <Text label="Affiliate URL" {...form.register("affiliateUrl")} error={form.formState.errors.affiliateUrl?.message} />
        <Text label="Associate tag" {...form.register("affiliateTag")} />
        <Text label="Recorded price (AED)" {...form.register("price")} hint="Shown publicly only if the product is not a demo and this price is saved within 7 days." />
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Check label="Featured" {...form.register("featured")} />
        <Check label="Trending" {...form.register("trending")} />
        <Check label="New arrival" {...form.register("isNewArrival")} />
        <Check label="Deal pick" {...form.register("isDeal")} />
        <Check label="Active" {...form.register("active")} />
        <Check label="Demonstration content" {...form.register("isDemo")} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Text label="SEO title" {...form.register("seoTitle")} />
        <Text label="SEO description" {...form.register("seoDescription")} />
      </div>
      {product && <p className="text-sm text-muted">Outbound clicks recorded: {product.clickCount}. This count is internal and is not a commission report.</p>}
      {form.formState.errors.root && <p className="text-sm text-red-700">{form.formState.errors.root.message}</p>}
      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={form.formState.isSubmitting} className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
          {form.formState.isSubmitting ? "Saving…" : "Save product"}
        </button>
        {product && (
          <button type="button" onClick={onDelete} className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700">
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

const inputClass = "w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm font-normal text-ink outline-none focus:border-navy";

function Text({ label, error, hint, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string }) {
  return (
    <label className="block text-sm font-medium text-navy">
      {label}
      <input className={`${inputClass} mt-1.5`} {...props} />
      {hint && <span className="mt-1 block text-xs font-normal text-muted">{hint}</span>}
      {error && <span className="mt-1 block text-xs font-normal text-red-700">{error}</span>}
    </label>
  );
}

function TextArea({ label, error, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string }) {
  return (
    <label className="block text-sm font-medium text-navy">
      {label}
      <textarea className={`${inputClass} mt-1.5`} {...props} />
      {error && <span className="mt-1 block text-xs font-normal text-red-700">{error}</span>}
    </label>
  );
}

function Check({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-sm text-navy">
      <input type="checkbox" className="h-4 w-4 accent-emerald" {...props} />
      {label}
    </label>
  );
}

function ListEditor({ title, hint, onAdd, children }: { title: string; hint?: string; onAdd: () => void; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-2 rounded-2xl border border-line bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <legend className="text-sm font-semibold text-navy">{title}</legend>
          {hint && <p className="text-xs text-muted">{hint}</p>}
        </div>
        <button type="button" onClick={onAdd} className="text-sm font-semibold text-emerald-ink">Add</button>
      </div>
      {children}
    </fieldset>
  );
}

function Remove({ onClick }: { onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-xl border border-line px-3 text-sm text-muted">Remove</button>;
}
