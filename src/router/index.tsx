import { useEffect, ComponentType } from "react";
import HomePage from "../pages/Home/HomePage";
import ProductPage from "../pages/Product/ProductPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Header } from "../layouts";
import screenUrl from "../contants/screenUrls";
import Cart from "../components/Cart/Cart";
import CategoryPage from "../pages/Category/CategoryPage";
import Login from "../layouts/Auth/Login/Login";
import Register from "../layouts/Auth/Register/Register";
import ManageProduct from "../components/ManageProduct/ManageProduct";
import Admin from "../components/Admin/Admin";


interface PageWrapperProps {
  title: string;
  component: ComponentType;
  isHeader: boolean;
  isFooter: boolean;
}

const publicRouters = [
  {
    path: screenUrl.RESGISTER,
    component: Register,
    title: "Register Page",
    isHeader: false,
    isFooter: false,
  },
  {
    path: screenUrl.LOGIN,
    component: Login,
    title: "Login Page",
    isHeader: false,
    isFooter: false,
  },
  {
    path: screenUrl.HOME,
    component: HomePage,
    title: "Beyond shop",
    isHeader: true,
    isFooter: true,
  },
  {
    path: screenUrl.CATEGORY,
    component: CategoryPage,
    title: "Category Page",
    isHeader: true,
    isFooter: true,
  },
  {
    path: screenUrl.PRODUCTS,
    component: ProductPage,
    title: "Product Page",
    isHeader: true,
    isFooter: true,
  },
  {
    path: screenUrl.CART,
    component: Cart,
    title: "Cart Page",
    isHeader: false,
    isFooter: false,
  },
  {
    path: screenUrl.MANAGEPRODUCT,
    component: ManageProduct,
    title: "Manage Product",
    isHeader: false,
    isFooter: false,
  },
  {
    path: screenUrl.ADMIN,
    component: Admin,
    title: "Admin",
    isHeader: false,
    isFooter: false,
  },

];

function WrapperComponent({
  title,
  component: Component,
  isHeader,
  isFooter,
}: PageWrapperProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  // Pass all props to the Component
  return (
    <div>
      {isHeader && <Header />}
      <Component />
      {isFooter && <Footer />}
    </div>
  );
}

function NotFound() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '40px',
      backgroundColor: 'pink',

    }}>
      Updating...
    </div>
  );
}


function AppRouter() {
  return (
    <Router>
      <Routes>
        {publicRouters.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={(
              <WrapperComponent
                title={route.title}
                component={route.component}
                isHeader={route.isHeader}
                isFooter={route.isFooter}
              />
            )}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export { AppRouter };
