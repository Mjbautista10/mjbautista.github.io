
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import "../styles/custom.css"; // Import the custom CSS

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div 
          className={cn(
            "max-w-3xl mx-auto text-center transition-all duration-1000 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="mb-8 h-32 w-full max-w-sm mx-auto relative">
            {/* Using our custom card styling */}
            <div className="card">
              <div className="card-inner">
                <div className="card-front">
                  <p><span style={{fontFamily: "'Courier New', monospace", fontSize: "40px"}}>🛠 Fast Fixes</span></p>
                </div>
                <div className="card-back">
                  <p><span style={{fontFamily: "'Georgia', serif", fontSize: "40px"}}>💡 Smart Solutions</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Expert Tech Support <br className="hidden sm:block" />
            <span className="text-white">When You Need It Most</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Whether it's hardware troubleshooting or software glitches, our team of specialists at MMM Innovation is ready to help you get back up and running.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-[#10b981] hover:bg-[#10b981]/80 rounded-md px-8 transition-transform hover:-translate-y-1">
              <a href="#services">Our Services</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-md px-8 transition-transform hover:-translate-y-1 sm:ml-4 mt-4 sm:mt-0">
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Background shape at the bottom */}
      <div className="absolute -bottom-[50px] left-0 w-full h-[100px] bg-background" 
        style={{clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0% 100%)"}}></div>
    </section>
  );
};

export default HeroSection;
