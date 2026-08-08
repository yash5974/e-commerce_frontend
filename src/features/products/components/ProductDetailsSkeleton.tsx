export default function ProductDetailsSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="aspect-square animate-pulse rounded-xl bg-muted" />

      <div className="space-y-6">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />

        <div className="h-10 w-4/5 animate-pulse rounded bg-muted" />

        <div className="h-6 w-32 animate-pulse rounded bg-muted" />

        <div className="h-10 w-48 animate-pulse rounded bg-muted" />

        <div className="space-y-3">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>

        <div className="h-12 w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
