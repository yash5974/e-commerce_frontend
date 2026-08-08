import { Heart } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="text-xl font-bold">
              ShopSphere
            </Link>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Build modern shopping experiences with React, TypeScript, Tailwind
              CSS and Node.js.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-semibold">Company</h3>

            <div className="flex flex-col gap-2 text-sm">
              <Link to="/about" className="hover:text-primary">
                About
              </Link>

              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>

              <Link to="/careers" className="hover:text-primary">
                Careers
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold">Resources</h3>

            <div className="flex flex-col gap-2 text-sm">
              <Link to="/blog" className="hover:text-primary">
                Blog
              </Link>

              <Link to="/faq" className="hover:text-primary">
                FAQ
              </Link>

              <Link to="/support" className="hover:text-primary">
                Support
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 font-semibold">Follow Us</h3>

            <div className="flex gap-3">
              <a
                href="#"
                aria-label="GitHub"
                className="rounded-lg border p-2 hover:bg-muted"
              >
                <FaGithub className="size-5" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="rounded-lg border p-2 hover:bg-muted"
              >
                <FaXTwitter className="size-5" />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="rounded-lg border p-2 hover:bg-muted"
              >
                <FaLinkedin className="size-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {year} ShopSphere. All rights reserved.</p>

          <p className="flex items-center gap-2">
            Built with
            <Heart className="size-4 fill-red-500 text-red-500" />
            React + TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
