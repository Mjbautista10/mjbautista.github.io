
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
          <div className="relative h-16 w-16">
            <div className="absolute h-full w-full rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <div className="absolute h-full w-full rounded-full border-4 border-r-primary border-l-transparent border-t-transparent border-b-transparent animate-spin animation-delay-500"></div>
          </div>
        </div>
      ) : (
        <>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Layout;
