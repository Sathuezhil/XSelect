import { BlogForm } from "@/components/forms/BlogForm";

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-navy">Add guide</h1>
      <div className="mt-8"><BlogForm /></div>
    </div>
  );
}
