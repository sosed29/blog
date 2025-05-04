export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  comments?: string[]; 
}


export interface Comment {
  id: string;
  postId: string; 
  author: string;
  text: string;
  date: string;
  reaction?: ReactionType; 
}


export enum ReactionType {
  LIKE = '👍',
  HEART = '❤️',
  FIRE = '🔥',
  LAUGH = '😂'
}