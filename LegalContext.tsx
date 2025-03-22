
import React, { createContext, useContext, useState, ReactNode } from "react";

export type LegalDocument = {
  id: string;
  title: string;
  date: string;
  content: string;
};

type LegalContextType = {
  legalDocuments: Record<string, LegalDocument>;
  currentDocument: LegalDocument | null;
  isModalOpen: boolean;
  openModal: (documentId: string) => void;
  closeModal: () => void;
};

const LegalContext = createContext<LegalContextType | undefined>(undefined);

export const useLegal = (): LegalContextType => {
  const context = useContext(LegalContext);
  if (!context) {
    throw new Error("useLegal must be used within a LegalProvider");
  }
  return context;
};

type LegalProviderProps = {
  children: ReactNode;
};

export const LegalProvider: React.FC<LegalProviderProps> = ({ children }) => {
  const [legalDocuments] = useState<Record<string, LegalDocument>>({
    "privacy-policy": {
      id: "privacy-policy",
      title: "Privacy Policy",
      date: "Updated January 15, 2025",
      content: `
        <p>At MMM Innovation, we are committed to protecting your privacy. We have developed this policy to ensure transparency in how we collect, use, and safeguard your data while providing basic troubleshooting solutions for laptops.</p>
        
        <h3>1. Information We Collect</h3>
        <ul>
          <li><strong>Personal Information:</strong> Name, email, and contact number (only when voluntarily provided).</li>
          <li><strong>Device Information:</strong> Laptop model, operating system, and basic issue descriptions.</li>
          <li><strong>Usage Data:</strong> Feedback and interaction data to improve our troubleshooting services.</li>
        </ul>
        
        <h3>2. How We Use Your Information</h3>
        <ul>
          <li>To provide effective troubleshooting assistance.</li>
          <li>To enhance and improve our services based on user feedback.</li>
          <li>To notify users of service updates or improvements.</li>
        </ul>
        
        <h3>3. Data Protection & Security</h3>
        <ul>
          <li>We take reasonable measures to protect user data from unauthorized access or misuse.</li>
          <li>Users are responsible for securing their own devices and data.</li>
        </ul>
        
        <h3>4. Information Sharing</h3>
        <ul>
          <li>We do not sell or share user information with third parties.</li>
          <li>We may disclose information if required by law or to protect our rights.</li>
        </ul>
        
        <h3>5. User Rights</h3>
        <ul>
          <li>Users may request access, updates, or deletion of their personal information.</li>
          <li>Users can opt out of communications at any time.</li>
        </ul>
      `
    },
    "terms-of-service": {
      id: "terms-of-service",
      title: "Terms of Service",
      date: "Updated January 15, 2025",
      content: `
        <p>By using MMM Innovation, you agree to the following terms:</p>
        
        <h3>1. Service Overview</h3>
        <ul>
          <li>We provide basic laptop troubleshooting designed for non-techy individuals.</li>
          <li>Our solutions are for educational and assistance purposes only and do not replace professional IT services.</li>
        </ul>
        
        <h3>2. User Responsibilities</h3>
        <ul>
          <li>Users must provide accurate information about their device and issues.</li>
          <li>Users acknowledge that troubleshooting solutions may vary by laptop brand and model.</li>
        </ul>
        
        <h3>3. Limitation of Liability</h3>
        <ul>
          <li>MMM Innovation is not responsible for data loss or additional issues that may arise from troubleshooting steps.</li>
          <li>Users are advised to back up important files before applying troubleshooting solutions.</li>
        </ul>
        
        <h3>4. Changes to These Terms</h3>
        <ul>
          <li>We may update this policy as our business evolves.</li>
          <li>Users will be notified of major updates through our official channels.</li>
        </ul>
        
        <p>By using MMM Innovation, you confirm that you have read, understood, and agreed to our Privacy Policy and Terms of Service.</p>
      `
    }
  });

  const [currentDocument, setCurrentDocument] = useState<LegalDocument | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (documentId: string) => {
    const document = legalDocuments[documentId];
    if (document) {
      setCurrentDocument(document);
      setIsModalOpen(true);
      // Fix: Use the global document.body instead of trying to access body on LegalDocument
      window.document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    window.document.body.style.overflow = ''; // Re-enable scrolling
  };

  return (
    <LegalContext.Provider value={{
      legalDocuments,
      currentDocument,
      isModalOpen,
      openModal,
      closeModal
    }}>
      {children}
    </LegalContext.Provider>
  );
};
