// src/services/articleService.ts

interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    date: string;
    category: string;
    source: string;
    author: string;
  }
  
  const dummyArticles: Article[] = [
    {
      id: '1',
      title: 'Tech Innovations in 2026',
      description: 'A deep dive into the latest tech innovations that will shape the future.',
      content: 'Detailed article content on the latest tech innovations.',
      date: '2025-01-01',
      category: 'tech',
      source: 'BBC',
      author: 'John Doe',
    },
    {
      id: '2',
      title: 'Health Trends for the New Year',
      description: 'Explore the health trends to watch out for in 2025.',
      content: 'Detailed content about health trends in 2025.',
      date: '2025-01-10',
      category: 'health',
      source: 'CNN',
      author: 'Jane Smith',
    },
    {
      id: '3',
      title: 'Sports Events to Look Forward to',
      description: 'A look at the most anticipated sports events in 2025.',
      content: 'Detailed content on upcoming sports events.',
      date: '2025-02-01',
      category: 'sports',
      source: 'NY Times',
      author: 'John Doe',
    },
    {
      id: '4',
      title: 'Business Strategies in 2025',
      description: 'What business strategies will dominate in the coming year?',
      content: 'Detailed article on business strategies for 2025.',
      date: '2025-01-15',
      category: 'business',
      source: 'BBC',
      author: 'Jane Smith',
    },
    {
      id: '5',
      title: 'New Innovations in Artificial Intelligence',
      description: 'How AI is shaping industries in 2025.',
      content: 'An in-depth look at AI technologies and their impact.',
      date: '2025-01-20',
      category: 'tech',
      source: 'NY Times',
      author: 'John Doe',
    },
    {
      id: '6',
      title: 'The Future of Space Exploration',
      description: 'Exploring the exciting future of space exploration in the next decade.',
      content: 'An exciting exploration of space missions and technological advancements.',
      date: '2025-01-22',
      category: 'tech',
      source: 'CNN',
      author: 'Jane Smith',
    },
    // Add more articles as needed...
  ];
  
  // Simulate an API call and return filtered articles
  export const articleService = {
    getArticles: async (filters: any) => {
      // Apply filters
      const filteredArticles = dummyArticles.filter((article) => {
        let matches = true;
  
        // Search filter
        if (filters.search && !article.title.toLowerCase().includes(filters.search.toLowerCase())) {
          matches = false;
        }
  
        // Date filter
        if (filters.date && article.date !== filters.date) {
          matches = false;
        }
  
        // Category filter
        if (filters.category && article.category !== filters.category) {
          matches = false;
        }
  
        // Source filter
        if (filters.source && article.source !== filters.source) {
          matches = false;
        }
  
        // Author filter
        if (filters.author && article.author !== filters.author) {
          matches = false;
        }
  
        return matches;
      });
  
      // Pagination: return 10 articles per page (dummy pagination)
      const startIndex = (filters.page - 1) * 10;
      const endIndex = startIndex + 10;
      const paginatedArticles = filteredArticles.slice(startIndex, endIndex);
  
      return {
        data: paginatedArticles,
      };
    },
  
    // Dummy function to get article details
    getArticleDetail: async (id: string) => {
      const article = dummyArticles.find((article) => article.id === id);
      return { data: article };
    },
  };
  