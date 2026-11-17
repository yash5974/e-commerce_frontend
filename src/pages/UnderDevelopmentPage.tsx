import { ArrowLeft, Clock, Construction, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/ui/button";

interface UnderDevelopmentPageProps {
  title?: string;
  description?: string;
}

const UnderDevelopmentPage = ({
  title = "Feature Under Development",
  description = "We're currently working on this feature to make it better for you. It will be available soon. Thank you for your patience!",
}: UnderDevelopmentPageProps) => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-lg text-center">
        {/* Illustration */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 sm:h-28 sm:w-28">
          <Construction className="h-12 w-12 text-primary sm:h-14 sm:w-14" />
        </div>

        {/* Status */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-medium text-amber-600 dark:text-amber-400">
          <Clock className="h-4 w-4" />
          Work in Progress
        </div>

        {/* Content */}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
          {description}
        </p>

        {/* Progress Indicator */}
        <div className="mx-auto mt-8 max-w-xs">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Development in progress</span>
            <span>Please check back later</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-2/3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>

        {/* Actions */}
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Button
            type="button"
            className="w-full sm:w-auto"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-muted-foreground">
          Thank you for your patience and understanding!
        </p>
      </div>
    </main>
  );
};

export default UnderDevelopmentPage;
