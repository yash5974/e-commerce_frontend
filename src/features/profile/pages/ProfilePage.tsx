import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/ui/dialog";

import AccountActions from "../components/AccountActions";
import CartSummary from "../components/CartSummary";
import ProfileSummary from "../components/ProfileSummary";
import RecentOrders from "../components/RecentOrders";
import UpdateProfileForm from "../components/UpdateProfileForm";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function ProfilePage() {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const { user, isLoading, isUpdating, fetchCurrentUser, updateCurrentUser } =
    useCurrentUser();

  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">My Account</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your profile, orders, and shopping cart.
        </p>
      </div>

      <ProfileSummary
        user={user}
        isLoading={isLoading}
        fetchCurrentUser={fetchCurrentUser}
        onEditProfile={() => setIsEditProfileOpen(true)}
      />

      <Dialog
        open={isEditProfileOpen}
        onOpenChange={(open) => {
          if (!isUpdating) {
            setIsEditProfileOpen(open);
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>

            <DialogDescription>
              Update your name or email address.
            </DialogDescription>
          </DialogHeader>

          <UpdateProfileForm
            user={user}
            isUpdating={isUpdating}
            onUpdate={updateCurrentUser}
            onSuccess={() => setIsEditProfileOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentOrders />
        <CartSummary />
      </div>

      <AccountActions />
    </main>
  );
}
