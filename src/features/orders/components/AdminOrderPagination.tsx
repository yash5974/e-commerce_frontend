import type { AdminOrdersMeta } from "../types/order.type";

interface AdminOrderPaginationProps {
  meta?: AdminOrdersMeta;
  isFetching: boolean;
  onPageChange: (page: number) => void;
}

const AdminOrderPagination = ({
  meta,
  isFetching,
  onPageChange,
}: AdminOrderPaginationProps) => {
  if (!meta || meta.totalPages <= 1) {
    return null;
  }

  const canGoPrevious = meta.page > 1;
  const canGoNext = meta.page < meta.totalPages;

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Page {meta.page} of {meta.totalPages}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          disabled={!canGoPrevious || isFetching}
          onClick={() => onPageChange(meta.page - 1)}
          className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <button
          type="button"
          disabled={!canGoNext || isFetching}
          onClick={() => onPageChange(meta.page + 1)}
          className="rounded-md border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminOrderPagination;
