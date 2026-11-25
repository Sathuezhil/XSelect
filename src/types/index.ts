export type Spec = { label: string; value: string };

export type CategoryDTO = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
  active: boolean;
  seoTitle: string;
  seoDescription: string;
  productCount?: number;
};

export type ProductDTO = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  images: string[];
  category: { id: string; name: string; slug: string };
  brand: string;
  features: string[];
  specifications: Spec[];
  pros: string[];
  cons: string[];
  amazonUrl: string;
  affiliateUrl: string;
  affiliateTag: string;
  price: number | null;
  priceUpdatedAt: string | null;
  featured: boolean;
  trending: boolean;
  isNewArrival: boolean;
  isDeal: boolean;
  active: boolean;
  isDemo: boolean;
  seoTitle: string;
  seoDescription: string;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
};

export type PostDTO = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  author: string;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
};

export type SubscriberDTO = {
  id: string;
  email: string;
  consent: boolean;
  source: string;
  createdAt: string;
};

export type MessageDTO = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type ProductListQuery = {
  q?: string;
  categorySlug?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "name" | "price-asc" | "price-desc";
  featured?: boolean;
  trending?: boolean;
  isNewArrival?: boolean;
  deals?: boolean;
  page?: number;
  limit?: number;
  includeInactive?: boolean;
};

export type ServiceError = {
  ok: false;
  error: string;
  status: number;
  issues?: { path: string; message: string }[];
};

export type ServiceSuccess<T> = { ok: true; data: T };
export type ServiceResult<T> = ServiceSuccess<T> | ServiceError;
