export default function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="aspect-square animate-pulse bg-muted" />

      <div className="space-y-3 p-4">
        <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />

        <div className="h-5 w-4/5 animate-pulse rounded bg-muted" />

        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />

        <div className="h-6 w-1/3 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
