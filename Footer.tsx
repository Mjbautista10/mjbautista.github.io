
import { cn } from "@/lib/utils";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { useLegal } from "@/context/LegalContext";
import Modal from "@/components/Modal";
import { openSocialLink } from "@/utils/SocialMedia";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
}

const FooterLink = ({ href, children, external = false, onClick }: FooterLinkProps) => (
  <li>
    <a
      href={href}
      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      onClick={onClick}
    >
      {children}
    </a>
  </li>
);

type SocialPlatform = 'facebook' | 'twitter' | 'linkedin' | 'instagram';

const SocialLink = ({ 
  platform, 
  children 
}: { 
  platform: SocialPlatform; 
  children: React.ReactNode;
}) => (
  <button
    className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
    aria-label={`${platform} profile`}
    onClick={() => openSocialLink(platform)}
  >
    {children}
  </button>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { legalDocuments, currentDocument, isModalOpen, openModal, closeModal } = useLegal();
  
  // Fix: Modify these handlers to not return the event handler function, but to directly call openModal
  const handlePrivacyPolicyClick = () => {
    openModal('privacy-policy');
  };
  
  const handleTermsOfServiceClick = () => {
    openModal('terms-of-service');
  };
  
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center text-xl font-semibold">
              <span className="text-foreground">MMM</span>
              <span className="text-primary ml-1">Innovation</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Expert hardware and software support for all your technical needs.
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink href="#">Home</FooterLink>
              <FooterLink href="#services">Services</FooterLink>
              <FooterLink href="#news">Tech News</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2">
              <FooterLink 
                href="#"
                onClick={handlePrivacyPolicyClick}
              >
                Privacy Policy
              </FooterLink>
              <FooterLink 
                href="#"
                onClick={handleTermsOfServiceClick}
              >
                Terms of Service
              </FooterLink>
              <FooterLink 
                href="https://docs.google.com/forms/d/e/1FAIpQLScQjxB78RBALPhYNNqjtETE_BEpLHPta_Q_KzylTYsrksl8nw/viewform" 
                external
              >
                Apply Now
              </FooterLink>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-4 text-sm font-semibold">Contact Us</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>CSA, COLLEGE OF SAINT AMATIEL</li>
              <li>+1 (555) 123-4567</li>
              <li>support@mmminnovation.com</li>
              <li>Monday - Friday: 8am - 6pm</li>
              <li>Saturday: 9am - 2pm</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 flex flex-col justify-between gap-6 border-t border-border pt-6 md:flex-row md:items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} MMM Innovation. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <SocialLink platform="facebook">
              <Facebook className="h-4 w-4" />
            </SocialLink>
            <SocialLink platform="twitter">
              <Twitter className="h-4 w-4" />
            </SocialLink>
            <SocialLink platform="linkedin">
              <Linkedin className="h-4 w-4" />
            </SocialLink>
            <SocialLink platform="instagram">
              <Instagram className="h-4 w-4" />
            </SocialLink>
          </div>
        </div>
      </div>
      
      {/* Legal Document Modal */}
      {currentDocument && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={currentDocument.title}
          date={currentDocument.date}
        >
          <div 
            className="prose prose-sm sm:prose-base dark:prose-invert max-w-none" 
            dangerouslySetInnerHTML={{ __html: currentDocument.content }}
          />
        </Modal>
      )}
    </footer>
  );
};

export default Footer;
