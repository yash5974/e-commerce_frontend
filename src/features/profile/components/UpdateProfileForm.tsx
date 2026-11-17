import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";

import { updateProfileSchema } from "../schemas/profile.schema";
import type { UpdateProfileFormValues } from "../schemas/profile.schema";
import type { CurrentUser, UpdateProfileRequest } from "../types/profile.type";

interface UpdateProfileFormProps {
  user: CurrentUser | null;
  isUpdating: boolean;
  onUpdate: (payload: UpdateProfileRequest) => Promise<CurrentUser | null>;
  onSuccess?: () => void;
}

const UpdateProfileForm = ({
  user,
  isUpdating,
  onUpdate,
  onSuccess,
}: UpdateProfileFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    reset({
      name: user.name,
      email: user.email,
    });
  }, [user, reset]);

  const onSubmit = async (values: UpdateProfileFormValues): Promise<void> => {
    if (!user) {
      return;
    }

    const payload: UpdateProfileRequest = {};

    const name = values.name.trim();
    const email = values.email.trim().toLowerCase();

    if (name !== user.name) {
      payload.name = name;
    }

    if (email !== user.email) {
      payload.email = email;
    }

    if (Object.keys(payload).length === 0) {
      return;
    }

    const updatedUser = await onUpdate(payload);

    if (!updatedUser) {
      return;
    }

    reset({
      name: updatedUser.name,
      email: updatedUser.email,
    });

    onSuccess?.();
  };

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
      className="space-y-5 pt-2"
    >
      <div className="space-y-2">
        <Label htmlFor="profile-name">Name</Label>

        <Input
          id="profile-name"
          type="text"
          autoComplete="name"
          disabled={isUpdating}
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="profile-email">Email</Label>

        <Input
          id="profile-email"
          type="email"
          autoComplete="email"
          disabled={isUpdating}
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={isUpdating}
          onClick={onSuccess}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isUpdating || !isDirty}>
          {isUpdating && <Loader2 className="mr-2 size-4 animate-spin" />}

          {isUpdating ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
