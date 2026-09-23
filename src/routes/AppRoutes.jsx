import { Navigate, Route, Routes } from "react-router-dom";

// Layouts
import StorefrontLayout from "../layouts/StorefrontLayout";
import AuthLayout from "../layouts/AuthLayout";

// Storefront Pages
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetails from "../pages/ProductDetails";
import Collections from "../pages/Collections";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Account from "../pages/Account";
import OrderDetails from "../pages/OrderDetails";

// Authentication Pages
import Login from "../pages/Login";
import Register from "../pages/Register";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ========================================
          STOREFRONT ROUTES
      ======================================== */}
      <Route element={<StorefrontLayout />}>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Shop */}
        <Route path="/shop" element={<Shop />} />

        {/* Product Details */}
        <Route path="/product/:slug" element={<ProductDetails />} />

        {/* Collections */}
        <Route path="/collections" element={<Collections />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Checkout */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Account */}
        <Route path="/account" element={<Account />} />

        {/* Order Details */}
        <Route path="/orders" element={<OrderDetails />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />

        {/* Temporary Wishlist Route */}
        {/* Replace this with Wishlist page later */}
        <Route
          path="/wishlist"
          element={<Navigate to="/shop" replace />}
        />
      </Route>

      {/* ========================================
          AUTHENTICATION ROUTES
      ======================================== */}
      <Route element={<AuthLayout />}>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ========================================
          FALLBACK ROUTE
      ======================================== */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;