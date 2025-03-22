
import { useParams, useNavigate } from "react-router-dom";
import { useNews } from "@/context/NewsContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const ArticlePage = () => {
  const { articleId } = useParams();
  const { articles } = useNews();
  const navigate = useNavigate();
  
  // Find the article matching the ID parameter
  const article = articles.find((a) => a.id === articleId);
  
  // If article not found, redirect to homepage
  useEffect(() => {
    if (!article) {
      navigate("/");
    }
  }, [article, navigate]);
  
  if (!article) return null;

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Button 
        variant="outline" 
        className="mb-8 group"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Button>
      
      <div className="bg-card rounded-xl shadow-lg overflow-hidden">
        <div className="aspect-video relative">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6 md:p-8">
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <span>{article.date}</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{article.title}</h1>
          
          <div 
            className="prose prose-lg dark:prose-invert max-w-none" 
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
