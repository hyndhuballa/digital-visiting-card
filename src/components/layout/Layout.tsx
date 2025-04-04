
import { ReactNode } from "react";
import BottomNavbar from "./BottomNavbar";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pb-16">{children}</main>
      {!isAuthPage && <BottomNavbar />}
    </div>
  );
};

export default Layout;
