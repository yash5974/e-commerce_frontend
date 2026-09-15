// src/features/analytics/components/TopProductsAnalyticsSkeleton.tsx

export const TopProductsAnalyticsSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg border">
      <div className="h-12 border-b bg-muted/50" />

      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-5 gap-4 border-b p-4 last:border-0"
        >
          <div className="h-4 rounded bg-muted" />
          <div className="h-4 rounded bg-muted" />
          <div className="h-4 rounded bg-muted" />
          <div className="h-4 rounded bg-muted" />
          <div className="h-4 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
};
