
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useInView } from "react-intersection-observer";
import { Calendar, ArrowRight } from "lucide-react";
import { useNews, Article } from "@/context/NewsContext";
import Modal from "@/components/Modal";
import { Link } from "react-router-dom";

type NewsCardProps = {
  article: Article;
  isVisible: boolean;
  delay: number;
  onReadMore: (article: Article) => void;
};

const NewsCard = ({ article, isVisible, delay, onReadMore }: NewsCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={`/article/${article.id}`}
      className={cn(
        "block overflow-hidden rounded-xl glass-card transition-all duration-700 transform card-hover-effect",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      )}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      <div className="overflow-hidden">
        <AspectRatio ratio={16 / 9} className="bg-muted relative">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          )}
          <img
            src={article.image}
            alt={article.title}
            className={cn(
              "object-cover w-full h-full transition-opacity duration-500",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </AspectRatio>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{article.date}</span>
        </div>
        
        <h3 className="text-xl font-semibold leading-tight mb-3 line-clamp-2">{article.title}</h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">{article.description}</p>
        
        <Button 
          variant="outline" 
          className="group"
          onClick={(e) => {
            e.preventDefault(); // Prevent the Link from navigating
            onReadMore(article);
          }}
        >
          Read More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Link>
  );
};

const NewsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const { articles, currentArticle, isModalOpen, openModal, closeModal } = useNews();

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  return (
    <section id="news" className="py-24 relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div 
          ref={ref}
          className={cn(
            "max-w-2xl mx-auto text-center mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          <div className="inline-block mb-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Stay Informed
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Tech News</h2>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest technology trends and solutions from MMM Innovation
          </p>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <NewsCard 
              key={article.id}
              article={article}
              isVisible={isVisible}
              delay={index + 1}
              onReadMore={openModal}
            />
          ))}
        </div>
      </div>

      {/* Modal for article content */}
      {currentArticle && (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={currentArticle.title}
          date={currentArticle.date}
        >
          <div 
            className="prose prose-sm sm:prose-base dark:prose-invert max-w-none" 
            dangerouslySetInnerHTML={{ __html: currentArticle.content }}
          />
        </Modal>
      )}

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-1/3 h-1/3 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/4 h-1/4 bg-secondary rounded-full filter blur-3xl"></div>
      </div>
    </section>
  );
};

export default NewsSection;
