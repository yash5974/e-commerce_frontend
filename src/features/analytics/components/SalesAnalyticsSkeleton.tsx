export const SalesAnalyticsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-lg border bg-muted/40"
          />
        ))}
      </div>

      <div className="h-[420px] animate-pulse rounded-lg border bg-muted/40" />
    </div>
  );
};
