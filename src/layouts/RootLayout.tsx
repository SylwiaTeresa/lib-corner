import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import { NavBar }from "../components/NavBar/NavBar"
import Footer from "../components/Footer/Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}