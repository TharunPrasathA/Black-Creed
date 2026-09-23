import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/common/Breadcrumbs";

const OrderDetails = () => {
  const { orderId } = useParams();

  const order = {
    id: orderId || "BC-10001",
    date: "23 September 2026",
    status: "Processing",
    total: 1598,
    items: [
      {
        id: 1,
        name: "Essential Oversized T-Shirt",
        quantity: 1,
        price: 1499,
        size: "M",
        color: "Deep Forest",
        image: "/images/product-1.jpg",
      },
    ],
    address: {
      name: "Customer Name",
      address: "Delivery address will appear here.",
      city: "Coimbatore",
      state: "Tamil Nadu",
      postalCode: "641001",
    },
  };

  return (
    <main className="min-h-screen bg-[#FAF8F2] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Account", href: "/account" },
            { label: "Order Details", href: `/orders/${order.id}` },
          ]}
        />

        <div className="mt-8 flex flex-col justify-between gap-4 border-b border-[#DCE2D8] pb-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#B59A63]">
              Order Details
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-[#12372A]">
              Order #{order.id}
            </h1>

            <p className="mt-2 text-sm text-[#68736A]">
              Placed on {order.date}
            </p>
          </div>

          <span className="w-fit rounded-full bg-[#F1F3EC] px-4 py-2 text-sm font-semibold text-[#12372A]">
            {order.status}
          </span>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <section className="rounded-2xl bg-white p-6">
            <h2 className="text-lg font-semibold text-[#12372A]">
              Items Ordered
            </h2>

            <div className="mt-5 space-y-5">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-[#DCE2D8] pb-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium text-[#202923]">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-[#68736A]">
                      Size: {item.size} · Color: {item.color}
                    </p>

                    <p className="mt-2 text-sm text-[#68736A]">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-2 font-semibold text-[#12372A]">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-2xl bg-white p-6">
              <h2 className="text-lg font-semibold text-[#12372A]">
                Delivery Address
              </h2>

              <div className="mt-4 text-sm leading-relaxed text-[#68736A]">
                <p className="font-medium text-[#202923]">
                  {order.address.name}
                </p>

                <p className="mt-2">{order.address.address}</p>

                <p>
                  {order.address.city}, {order.address.state}
                </p>

                <p>{order.address.postalCode}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6">
              <h2 className="text-lg font-semibold text-[#12372A]">
                Order Total
              </h2>

              <div className="mt-4 flex justify-between border-t border-[#DCE2D8] pt-4 font-semibold text-[#12372A]">
                <span>Total</span>
                <span>₹{order.total.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </aside>
        </div>

        <Link
          to="/account"
          className="mt-8 inline-block text-sm font-semibold text-[#12372A] underline underline-offset-4"
        >
          Back to Account
        </Link>
      </div>
    </main>
  );
};

export default OrderDetails;