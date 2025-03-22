
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const NavLink = ({ href, children, onClick }: NavLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Handle smooth scrolling
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth'
        });
      }
    } else {
      // For regular links
      window.location.href = href;
    }
    
    // Call the passed onClick handler if provided
    if (onClick) onClick();
  };

  return (
    <li>
      <a 
        href={href} 
        className="nav-link px-1 py-2 text-sm font-medium"
        onClick={handleClick}
      >
        {children}
      </a>
    </li>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when escape key is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/80 backdrop-blur-lg shadow-subtle" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 md:h-20">
          <a 
            href="/" 
            className="flex items-center text-xl font-semibold"
            aria-label="MMM Innovation"
          >
            <span className="text-foreground">MMM</span>
            <span className="text-primary ml-1">Innovation</span>
          </a>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex md:items-center md:gap-x-8">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#application">Get Support</NavLink>
            <NavLink href="#news">Tech News</NavLink>
            <NavLink href="#contact">Contact Us</NavLink>
          </ul>
          
          {/* Mobile Menu Toggle */}
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden p-1"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 z-50 md:hidden glass-effect flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <a href="/" className="flex items-center text-xl font-semibold">
            <span className="text-foreground">MMM</span>
            <span className="text-primary ml-1">Innovation</span>
          </a>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-1"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ul className="flex flex-col space-y-4 p-8">
          <NavLink href="#services" onClick={closeMenu}>Services</NavLink>
          <NavLink href="#application" onClick={closeMenu}>Get Support</NavLink>
          <NavLink href="#news" onClick={closeMenu}>Tech News</NavLink>
          <NavLink href="#contact" onClick={closeMenu}>Contact Us</NavLink>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
