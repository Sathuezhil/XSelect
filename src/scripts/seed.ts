import bcrypt from "bcryptjs";
import { loadEnv } from "@/scripts/load-env";
import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { User } from "@/models/User";
import { BlogPost } from "@/models/BlogPost";
import { categorySeed, postSeed, productSeed } from "@/scripts/seed-data";

loadEnv();

function amazonLinks(keyword: string) {
  const tag = process.env.AMAZON_ASSOCIATE_TAG?.trim() || "xselectdemo-21";
  const amazon = new URL("https://www.amazon.ae/s");
  amazon.searchParams.set("k", keyword);
  const affiliate = new URL(amazon.toString());
  affiliate.searchParams.set("tag", tag);
  return {
    amazonUrl: amazon.toString(),
    affiliateUrl: affiliate.toString(),
    affiliateTag: tag,
  };
}

async function seed() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "";
  if (!process.env.MONGODB_URI) {
    throw new Error("Set MONGODB_URI before seeding.");
  }
  if (!email || password.length < 12) {
    throw new Error("Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters.");
  }

  await connectDB();
  const passwordHash = await bcrypt.hash(password, 12);
  await User.updateOne(
    { email },
    { $set: { name: "XSelect Admin", email, passwordHash, role: "admin" } },
    { upsert: true },
  );

  for (const category of categorySeed) {
    await Category.updateOne(
      { slug: category.slug },
      {
        $set: {
          ...category,
          active: true,
          seoTitle: category.name,
          seoDescription: category.description.slice(0, 160),
        },
      },
      { upsert: true },
    );
  }

  const categories = await Category.find().lean();
  const categoryIds = new Map(categories.map((category) => [category.slug, category._id]));

  for (const product of productSeed) {
    const category = categoryIds.get(product.category);
    if (!category) throw new Error(`Missing category ${product.category}`);
    const links = amazonLinks(product.keyword);
    await Product.updateOne(
      { slug: product.slug },
      {
        $set: {
          name: product.name,
          slug: product.slug,
          shortDescription: product.shortDescription,
          description: product.description,
          images: product.images,
          category,
          brand: product.brand,
          features: product.features,
          specifications: product.specifications,
          pros: product.pros,
          cons: product.cons,
          ...links,
          price: product.price,
          priceUpdatedAt: new Date(),
          featured: Boolean(product.featured),
          trending: Boolean(product.trending),
          isNewArrival: Boolean(product.isNewArrival),
          isDeal: Boolean(product.isDeal),
          active: true,
          isDemo: true,
          seoTitle: product.name,
          seoDescription: product.shortDescription.slice(0, 160),
        },
        $setOnInsert: { clickCount: 0 },
      },
      { upsert: true },
    );
  }

  for (const post of postSeed) {
    await BlogPost.updateOne(
      { slug: post.slug },
      {
        $set: {
          ...post,
          author: "XSelect Editors",
          published: true,
          seoTitle: post.title.slice(0, 70),
          seoDescription: post.excerpt.slice(0, 160),
        },
      },
      { upsert: true },
    );
  }

  console.log(`Seeded ${categorySeed.length} categories, ${productSeed.length} demo products, ${postSeed.length} guides, and admin ${email}.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
