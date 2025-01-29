export interface IArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  category: string;
  source: string;
  author: string;
}



export interface IAuthor {
  label: string;
  value: string;
}


// Type for filters
export interface Filters {
  date: string;
  category: string;
  source: string;
  author: string;
}

export interface AuthorFilterProps {
  value: string;
  onChange: (author: string) => void;
  initialAuthors: IAuthor[]; // Initial authors from parent
}
