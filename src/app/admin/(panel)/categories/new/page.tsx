import { CategoryForm } from "@/components/forms/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-navy">Add category</h1>
      <div className="mt-8"><CategoryForm /></div>
    </div>
  );
}
