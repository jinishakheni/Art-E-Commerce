import { useLocation } from "react-router-dom";
import Header from "./Header";
import AppBreadcrumbs from "./AppBreadcrumbs";
import { Footer } from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const ignoreRoute = ["/", "/register", "/forgotpassword"];
  const shouldDisplayNavbar = ignoreRoute.indexOf(location.pathname) < 0;

  return (
    <>
      {shouldDisplayNavbar && (
        <>
          <Header />
          <AppBreadcrumbs />
        </>
      )}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
