import { LoaderCircle } from "lucide-react";

import { cn } from "@/lib/utils";

type LoaderVariant =
  "spinner" | "button" | "page" | "table" | "overlay" | "fullscreen";

type LoaderSize = "sm" | "md" | "lg";

interface LoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  text?: string;
  className?: string;
}

const sizeClasses: Record<LoaderSize, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-8",
};

const Loader = ({
  variant = "spinner",
  size = "md",
  text,
  className,
}: LoaderProps) => {
  const spinner = (
    <LoaderCircle
      aria-hidden="true"
      className={cn("shrink-0 animate-spin", sizeClasses[size], className)}
    />
  );

  if (variant === "button") {
    return (
      <span
        role="status"
        aria-label={text ?? "Loading"}
        className="inline-flex items-center gap-2"
      >
        {spinner}
        {text && <span>{text}</span>}
      </span>
    );
  }

  if (variant === "page") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex min-h-[240px] items-center justify-center",
          className,
        )}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {spinner}
          {text && <span>{text}</span>}
        </div>
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-center justify-center gap-2 border-b px-4 py-2 text-xs text-muted-foreground",
          className,
        )}
      >
        {spinner}
        {text && <span>{text}</span>}
      </div>
    );
  }

  if (variant === "overlay") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-[1px]",
          className,
        )}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {spinner}
          {text && <span>{text}</span>}
        </div>
      </div>
    );
  }

  if (variant === "fullscreen") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm",
          className,
        )}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {spinner}
          {text && <span>{text}</span>}
        </div>
      </div>
    );
  }

  return (
    <span
      role="status"
      aria-label={text ?? "Loading"}
      className={cn("inline-flex items-center gap-2", className)}
    >
      {spinner}
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </span>
  );
};

export default Loader;
