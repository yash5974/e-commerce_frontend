import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 transition-opacity hover:opacity-80"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-primary-foreground">
        S
      </div>

      <div className="hidden sm:block">
        <p className="text-lg font-bold tracking-tight">ShopSphere</p>

        <p className="text-xs text-muted-foreground">Premium Store</p>
      </div>
    </Link>
  );
}
