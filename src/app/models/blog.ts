export interface Blog {
   _id: string;
    title: string;
    author: string;
    content: string;
    summary?: string;
    tags?: string;
    category: string;
    publicationDate: Date;
    status: string;
    featuredImage?: string;
    slug: string;
    metaTitle?: string;
    metaDescription?: string;
    commentsEnabled: boolean;
    viewCount: number;
    likes: number;
    dislikes: number;
    seoKeywords?: string;
  }
  