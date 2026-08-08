import { Eye, EyeOff } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import type { FieldError } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  id: string;
  label: string;
  error?: FieldError;
}

export default function PasswordInput({
  id,
  label,
  error,
  className,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn("pr-11", className)}
          {...props}
        />

        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
        >
          {showPassword ? (
            <EyeOff className="size-4" />
          ) : (
            <Eye className="size-4" />
          )}
        </button>
      </div>

      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-destructive">
          {error.message}
        </p>
      )}
    </div>
  );
}
