export interface Comment {
    id: number;
    body: string;
    postId: number;
    likes: number; // Agregado el campo likes
    user: {
      id: number;
      username: string;
      fullName: string; // Agregado fullName porque la API lo devuelve
    };
  }
  