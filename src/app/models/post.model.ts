export interface Reactions {
    likes: number;
    dislikes: number;
  }
  
  export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    reactions: Reactions;
    // Add other relevant fields if necessary
  }
  