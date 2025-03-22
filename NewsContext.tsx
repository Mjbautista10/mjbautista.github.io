
import React, { createContext, useContext, useState, ReactNode } from "react";

export type Article = {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  content: string;
};

type NewsContextType = {
  articles: Article[];
  currentArticle: Article | null;
  setCurrentArticle: (article: Article | null) => void;
  isModalOpen: boolean;
  openModal: (article: Article) => void;
  closeModal: () => void;
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const useNews = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};

type NewsProviderProps = {
  children: ReactNode;
};

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [articles] = useState<Article[]>([
    {
      id: "windows-security",
      title: "New Windows Security Update Patches Critical Vulnerabilities",
      date: "February 25, 2025",
      description: "Microsoft released an important security update that addresses several critical vulnerabilities. Users are advised to update immediately.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5URSXzbLNJk0CcjFp-3v8TjYg7f9zL2alxw&s",
      content: `
        <p>Microsoft has released an important security update that addresses several critical vulnerabilities in Windows operating systems. The update, which was released as part of February's Patch Tuesday, fixes 47 security issues including 5 zero-day vulnerabilities that were being actively exploited in the wild.</p>
        
        <p>Security experts at MMM Innovation strongly recommend that all Windows users install this update immediately to protect their systems from potential attacks. The vulnerabilities affect all supported versions of Windows, including Windows 10, Windows 11, and Windows Server.</p>
        
        <h3>Key vulnerabilities addressed:</h3>
        <ul>
          <li>CVE-2025-21841: A remote code execution vulnerability in the Windows Print Spooler</li>
          <li>CVE-2025-22103: An elevation of privilege vulnerability in the Windows Kernel</li>
          <li>CVE-2025-20982: A security feature bypass in Windows Defender</li>
          <li>CVE-2025-23067: A remote code execution vulnerability in Microsoft Exchange Server</li>
        </ul>
        
        <p>"This is one of the most significant security updates we've seen in recent months," said Jane Smith, Chief Security Officer at MMM Innovation. "The fact that several vulnerabilities were already being exploited makes this update particularly urgent."</p>
        
        <h3>How to update:</h3>
        <p>To install the update, Windows users should go to Settings > Update & Security > Windows Update and select "Check for updates". For enterprise environments, IT administrators should deploy the update through their standard patch management systems.</p>
        
        <p>If you need assistance with installing this update or have concerns about compatibility with your systems, please contact our technical support team at MMM Innovation for guidance.</p>
      `
    },
    {
      id: "maintenance-tips",
      title: "Top 10 Computer Maintenance Tips for Extended Hardware Life",
      date: "February 20, 2025",
      description: "Regular maintenance can significantly extend the lifespan of your computer. Learn our top tips for keeping your hardware running smoothly.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO1PrPZQH-M44I_HNCBFqZTILZUdo-dDkkXA&s",
      content: `
        <p>Proper maintenance is essential for keeping your computer hardware running smoothly and extending its operational lifespan. Our tech experts at MMM Innovation have compiled these top 10 maintenance tips that every computer owner should follow.</p>
        
        <h3>1. Regular Dust Cleaning</h3>
        <p>Dust buildup is one of the biggest enemies of computer hardware. It restricts airflow, causing components to overheat and potentially fail prematurely. We recommend cleaning the inside of your desktop computer at least every 6 months using compressed air. For laptops, cleaning the vents and fan areas is crucial.</p>
        
        <h3>2. Manage Your Storage Space</h3>
        <p>Keeping your hard drive or SSD too full can significantly impact performance. Aim to keep at least 15-20% of your storage space free at all times. Regularly uninstall unused programs, delete temporary files, and consider using external storage for large files you don't need to access frequently.</p>
        
        <h3>3. Update Your Software Regularly</h3>
        <p>Software updates often include important performance improvements and security patches. Keep your operating system, drivers, and applications updated to ensure optimal performance and compatibility with your hardware.</p>
        
        <h3>4. Optimize Power Settings</h3>
        <p>Configure your power settings appropriately to balance performance with component longevity. For desktop computers that remain plugged in, the "Balanced" power plan is usually ideal. For laptops, consider using "Power saver" mode when on battery to extend battery life.</p>
        
        <h3>5. Invest in Surge Protection</h3>
        <p>Power surges can cause immediate damage to computer components or contribute to their gradual degradation. Always connect your computer to a quality surge protector or, better yet, an uninterruptible power supply (UPS) that can provide backup power during outages.</p>
        
        <h3>6. Monitor Hardware Temperatures</h3>
        <p>Use software tools to monitor your computer's internal temperatures. Overheating can lead to hardware damage. If you notice high temperatures, improve ventilation or consider additional cooling solutions.</p>

        <h3>7. Perform Regular Backups</h3>
        <p>Data loss can occur due to hardware failures or system errors. Regularly back up important files to external drives or cloud storage to ensure your data remains safe.</p>

        <h3>8. Avoid Physical Impacts</h3>
        <p>Handle your computer, especially laptops, with care. Physical impacts can damage internal components, leading to costly repairs or data loss.</p>

        <h3>9. Use Reliable Antivirus Software</h3>
        <p>Protect your computer from malware and viruses by installing reputable antivirus software and keeping it updated. Regular scans can help detect and remove threats before they harm your system.</p>

        <h3>10. Maintain a Clean Operating System</h3>
        <p>Over time, unnecessary files and registry entries can clutter your system. Use built-in tools like Disk Cleanup or third-party software to optimize your operating system's performance.</p>

        <p>"Many hardware failures we see could have been prevented with basic maintenance," explains Michael Johnson, Hardware Specialist at MMM Innovation. "These simple steps can add years to your computer's useful life and save you significant money in the long run."</p>
        
        <p>If you need professional maintenance for your computer systems or are experiencing hardware issues, contact our team for expert assistance.</p>
      `
    },
    {
      id: "smartphone-issues",
      title: "Common Smartphone Issues and How to Fix Them Yourself",
      date: "February 15, 2025",
      description: "From battery problems to slow performance, learn how to diagnose and fix common smartphone issues without professional help.",
      image: "https://www.devicecure.in/_next/image?url=https%3A%2F%2Fdevicecurebucket.s3.ap-south-1.amazonaws.com%2Fblog%2F1684942329533Common%2520Mobile%2520Issues.png&w=3840&q=75",
      content: `
        <p>Smartphones have become essential tools in our daily lives, but they can sometimes develop problems that disrupt our routines. Before seeking professional help, try these DIY solutions for common smartphone issues.</p>
        
        <h3>Battery Draining Too Quickly</h3>
        <p><strong>Potential solutions:</strong></p>
        <ul>
          <li>Check which apps are consuming battery power in your device settings</li>
          <li>Disable background app refresh for apps you don't need updates from</li>
          <li>Reduce screen brightness or enable auto-brightness</li>
          <li>Turn off location services for apps that don't need it</li>
          <li>Enable battery saver mode when needed</li>
        </ul>
        
        <h3>Phone Running Slowly</h3>
        <p><strong>Potential solutions:</strong></p>
        <ul>
          <li>Restart your device (this fixes many temporary issues)</li>
          <li>Clear app cache in settings</li>
          <li>Uninstall unused apps</li>
          <li>Check for and install system updates</li>
          <li>Free up storage space by deleting old photos, videos, and files</li>
        </ul>
        
        <h3>Overheating Issues</h3>
        <p><strong>Potential solutions:</strong></p>
        <ul>
          <li>Remove the case temporarily to help dissipate heat</li>
          <li>Close resource-intensive apps like games and video streaming</li>
          <li>Avoid using the phone while it's charging</li>
          <li>Keep the phone out of direct sunlight</li>
          <li>If overheating persists, check for malware or consider a factory reset</li>
        </ul>
        
        <h3>Poor Reception or Call Quality</h3>
        <p><strong>Potential solutions:</strong></p>
        <ul>
          <li>Toggle airplane mode on and off to refresh connections</li>
          <li>Restart your device</li>
          <li>Check for carrier settings updates</li>
          <li>Ensure the phone case isn't blocking antennas</li>
          <li>Reset network settings (note: this will remove saved Wi-Fi passwords)</li>
        </ul>
        
        <p>"While these solutions work for many common issues, some problems do require professional diagnosis and repair," notes Sarah Williams, Mobile Device Specialist at MMM Innovation. "If these fixes don't resolve your issue, or if you're dealing with hardware damage like a cracked screen or water damage, we're here to help."</p>
        
        <p>For professional smartphone repair services, contact our technical support team at MMM Innovation.</p>
      `
    }
  ]);

  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (article: Article) => {
    setCurrentArticle(article);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = ''; // Re-enable scrolling
  };

  return (
    <NewsContext.Provider value={{
      articles,
      currentArticle,
      setCurrentArticle,
      isModalOpen,
      openModal,
      closeModal
    }}>
      {children}
    </NewsContext.Provider>
  );
};
