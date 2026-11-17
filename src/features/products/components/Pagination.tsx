import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/ui/button";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching?: boolean;
}

const Pagination = ({
  page,
  totalPages,
  onPageChange,
  isFetching = false,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const canGoPrevious = page > 1;
  const canGoNext = page < totalPages;

  const handlePrevious = () => {
    if (!canGoPrevious || isFetching) {
      return;
    }

    onPageChange(page - 1);
  };

  const handleNext = () => {
    if (!canGoNext || isFetching) {
      return;
    }

    onPageChange(page + 1);
  };

  return (
    <div className="flex flex-col gap-3 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-center text-sm text-muted-foreground sm:text-left">
        Page <span className="font-medium text-foreground">{page}</span> of{" "}
        <span className="font-medium text-foreground">{totalPages}</span>
      </p>

      <div className="flex items-center justify-center gap-2 sm:justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canGoPrevious || isFetching}
          onClick={handlePrevious}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />

          <span className="hidden sm:inline">Previous</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!canGoNext || isFetching}
          onClick={handleNext}
          aria-label="Next page"
        >
          <span className="hidden sm:inline">Next</span>

          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
