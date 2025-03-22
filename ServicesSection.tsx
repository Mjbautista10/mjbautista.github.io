
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { 
  Computer, 
  Code2, 
  ShieldCheck, 
  Smartphone, 
  Wifi, 
  Database
} from "lucide-react";

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  isVisible: boolean;
  delay: number;
};

const ServiceCard = ({ icon, title, description, isVisible, delay }: ServiceCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl overflow-hidden transform transition-all duration-700 card-hover-effect",
        isVisible 
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16"
      )}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      <div className="p-6 md:p-8">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        <Button asChild variant="outline" className="w-full justify-center">
          <a href="#application">Get Help</a>
        </Button>
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const services = [
    {
      icon: <Computer className="h-6 w-6" />,
      title: "Computer Repair",
      description: "Expert diagnosis and repair for desktops, laptops, and all-in-one systems. We fix hardware issues fast."
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Software Troubleshooting",
      description: "From operating system errors to application crashes, we'll resolve your software issues efficiently."
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Security Solutions",
      description: "Protect your data and systems with our comprehensive security services and malware removal."
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Device Support",
      description: "Expert assistance for smartphone and tablet issues, both hardware and software related."
    },
    {
      icon: <Wifi className="h-6 w-6" />,
      title: "Network Setup & Repair",
      description: "Wi-Fi issues, connectivity problems, and network setup services for home and small businesses."
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Recovery & Backup",
      description: "Professional data recovery services and setup of reliable backup solutions for peace of mind."
    },
  ];

  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div 
          className={cn(
            "max-w-2xl mx-auto text-center mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
          ref={ref}
        >
          <div className="inline-block mb-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Our Expertise
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Technical Services</h2>
          <p className="text-lg text-muted-foreground">
            MMM Innovation provides comprehensive solutions for all your hardware and software needs
          </p>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              isVisible={isVisible}
              delay={index + 1}
            />
          ))}
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-50 overflow-hidden">
        <div className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-secondary rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-1/4 h-1/4 bg-primary/5 rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default ServicesSection;
