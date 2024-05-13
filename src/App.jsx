import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Layout from "/src/components/Layout";
import AllPaintingsPage from "./pages/AllPaintingsPage";
import AllArtistsPage from "./pages/AllArtistsPage";
import PaintingDetailsPage from "./pages/PaintingDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import CheckoutPage from "./pages/CheckoutPage";
import UserProviderWrapper from "./context/user.context.jsx";
import BreadcrumbWrapper from "./context/breadcrumb.context.jsx";
import ArtistDetailsPage from "./pages/ArtistDetailsPage.jsx";

function App() {
  return (
    <div>
      <UserProviderWrapper>
        <BreadcrumbWrapper>
          <Layout>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
              <Route path="/arts" element={<AllPaintingsPage />} />
              <Route path="/artists" element={<AllArtistsPage />} />
              <Route path="/arts/:artId" element={<PaintingDetailsPage />} />
              <Route path="/users/:userId" element={<ArtistDetailsPage />} />
              <Route path="/checkout/:userId" element={<CheckoutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </BreadcrumbWrapper>
      </UserProviderWrapper>
    </div>
  );
}

export default App;
