import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  CreditCard,
  Headphones,
  Heart,
  RefreshCcw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Sparkles,
    title: "Curated Products",
    description:
      "We focus on products that offer real value, practical quality, and a great everyday shopping experience.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "Your account, orders, and payments are protected with modern security practices throughout your journey.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "From discovering a product to completing an order, every part of the experience is designed around you.",
  },
];

const benefits = [
  {
    icon: ShoppingBag,
    title: "Easy Shopping",
    description:
      "Browse products, explore details, manage your cart, and place orders without unnecessary complexity.",
  },
  {
    icon: CreditCard,
    title: "Flexible Payments",
    description:
      "Choose from supported payment methods and enjoy a clear, reliable checkout experience.",
  },
  {
    icon: Truck,
    title: "Order Tracking",
    description:
      "Keep track of your orders and stay informed as your purchase moves through its journey.",
  },
  {
    icon: Headphones,
    title: "Helpful Support",
    description:
      "We believe great shopping does not end at checkout. We're here to make the experience smoother.",
  },
];

const journey = [
  {
    number: "01",
    icon: ShoppingBag,
    title: "Discover",
    description:
      "Explore products, categories, and details to find something that fits your needs.",
  },
  {
    number: "02",
    icon: Box,
    title: "Add to Cart",
    description:
      "Choose what you love, adjust quantities, and keep everything organized in your cart.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Checkout",
    description:
      "Create your order and complete payment through a secure and straightforward process.",
  },
  {
    number: "04",
    icon: Truck,
    title: "Enjoy Your Order",
    description:
      "Follow your order status and look forward to receiving the products you selected.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative border-b bg-muted/30">
        <div className="mx-auto grid min-h-[520px] max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-sm font-medium"
            >
              <Sparkles className="size-4" />
              <span>Shopping made simple</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              A better way to
              <span className="block text-muted-foreground">shop online.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
            >
              We built this store with one simple idea: online shopping should
              feel easy, trustworthy, and enjoyable. Discover products you love,
              checkout securely, and manage your orders with confidence.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Explore Products
                <ArrowRight className="size-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl border bg-background shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-muted via-background to-muted" />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex size-32 items-center justify-center rounded-3xl border bg-background shadow-lg sm:size-40"
                >
                  <ShoppingBag className="size-16 sm:size-20" />
                </motion.div>
              </div>

              <div className="absolute left-6 top-6 rounded-xl border bg-background/90 p-3 shadow-sm backdrop-blur">
                <ShieldCheck className="size-5" />
              </div>

              <div className="absolute bottom-6 right-6 rounded-xl border bg-background/90 p-3 shadow-sm backdrop-blur">
                <CreditCard className="size-5" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Our story
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Built around a better shopping experience.
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
              className="space-y-5 text-muted-foreground"
            >
              <motion.p variants={fadeUp} className="leading-7">
                Shopping online should not feel complicated. From the moment you
                discover a product to the moment you receive your order, every
                step should be clear and predictable.
              </motion.p>

              <motion.p variants={fadeUp} className="leading-7">
                That's why our platform brings products, cart management,
                orders, and secure payments together in one simple experience.
                We focus on making the important things easy while keeping the
                details that matter close at hand.
              </motion.p>

              <motion.p variants={fadeUp} className="leading-7">
                Whether you're making your first purchase or coming back for
                something you already love, our goal remains the same:
                <span className="font-medium text-foreground">
                  {" "}
                  make every interaction feel effortless.
                </span>
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              What we believe
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Simple principles. Better experiences.
            </h2>

            <p className="mt-4 text-muted-foreground">
              Everything we build starts with making online shopping more
              useful, transparent, and enjoyable.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="mt-12 grid gap-5 md:grid-cols-3"
          >
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <motion.article
                  key={value.title}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border bg-background p-6 shadow-sm"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl border bg-muted">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">{value.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {value.description}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Why shop with us
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need for a smoother journey.
              </h2>

              <p className="mt-5 leading-7 text-muted-foreground">
                We keep the shopping experience focused on the things that
                matter: finding the right products, paying securely, and staying
                in control of your orders.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={staggerContainer}
              className="grid gap-4 sm:grid-cols-2"
            >
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <motion.div
                    key={benefit.title}
                    variants={fadeUp}
                    className="rounded-2xl border p-5 transition-colors hover:bg-muted/40"
                  >
                    <Icon className="size-5" />

                    <h3 className="mt-4 font-semibold">{benefit.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {benefit.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              From discovery to delivery.
            </h2>

            <p className="mt-4 text-muted-foreground">
              A straightforward shopping journey designed to keep you in
              control.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="relative mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {journey.map((step) => {
              const Icon = step.icon;

              return (
                <motion.article
                  key={step.number}
                  variants={fadeUp}
                  className="relative rounded-2xl border bg-background p-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-11 items-center justify-center rounded-xl border bg-muted">
                      <Icon className="size-5" />
                    </div>

                    <span className="text-sm font-semibold text-muted-foreground">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-semibold">{step.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {step.description}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-b">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border bg-muted">
              <BadgeCheck className="size-7" />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Shop with confidence.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Your shopping experience is supported by protected accounts,
              authenticated access, secure payment processing, order management,
              and clear payment status updates. We aim to give you confidence at
              every important step.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <span className="rounded-full border bg-muted/50 px-4 py-2 text-sm">
                Secure accounts
              </span>

              <span className="rounded-full border bg-muted/50 px-4 py-2 text-sm">
                Protected payments
              </span>

              <span className="rounded-full border bg-muted/50 px-4 py-2 text-sm">
                Order management
              </span>

              <span className="rounded-full border bg-muted/50 px-4 py-2 text-sm">
                Reliable checkout
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border bg-muted/30 px-6 py-14 text-center sm:px-10"
          >
            <RefreshCcw className="mx-auto size-7" />

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to find something you love?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Explore our collection and experience a simpler way to shop
              online.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Start Shopping
                <ArrowRight className="size-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-md border bg-background px-6 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
