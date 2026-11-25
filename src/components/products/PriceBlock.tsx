import { canShowPrice, formatAed } from "@/lib/utils";
import type { ProductDTO } from "@/types";

export function PriceBlock({ product, prominent = false }: { product: ProductDTO; prominent?: boolean }) {
  if (!canShowPrice(product) || product.price == null) {
    return (
      <p className={prominent ? "text-lg font-semibold text-navy" : "text-sm font-medium text-navy"}>
        See price on Amazon
      </p>
    );
  }

  return (
    <div>
      <p className={prominent ? "font-heading text-3xl font-semibold text-navy" : "font-heading text-xl font-semibold text-navy"}>
        {formatAed(product.price)}
      </p>
      <p className="mt-1 text-xs leading-5 text-muted">
        Last recorded by our editors within the past week. Confirm the live price and availability on Amazon.ae.
      </p>
    </div>
  );
}
