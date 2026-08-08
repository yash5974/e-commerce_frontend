import { Button } from "@/ui/button";
import type { ProductPaginationMeta } from "../types/product.type";

interface ProductPaginationProps {
  meta?: ProductPaginationMeta;
  isFetching: boolean;
  onPageChange: (page: number) => void;
}

export default function ProductPagination({
  meta,
  isFetching,
  onPageChange,
}: ProductPaginationProps) {
  if (!meta || meta.totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      <Button
        type="button"
        variant="outline"
        disabled={!meta.hasPreviousPage || isFetching}
        onClick={() => onPageChange(meta.page - 1)}
      >
        Previous
      </Button>

      <span className="text-sm text-muted-foreground">
        Page {meta.page} of {meta.totalPages}
      </span>

      <Button
        type="button"
        variant="outline"
        disabled={!meta.hasNextPage || isFetching}
        onClick={() => onPageChange(meta.page + 1)}
      >
        Next
      </Button>
    </div>
  );
}
