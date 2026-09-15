import AccountActions from "../components/AccountActions";
import CartSummary from "../components/CartSummary";
import ProfileSummary from "../components/ProfileSummary";
import RecentOrders from "../components/RecentOrders";

export default function ProfilePage() {
  return (
    <main className="container mx-auto space-y-6 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold">My Account</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your profile, orders, and shopping cart.
        </p>
      </div>

      <ProfileSummary />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentOrders />
        <CartSummary />
      </div>
      <AccountActions />
    </main>
  );
}
