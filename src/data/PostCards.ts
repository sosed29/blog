import { Post } from '../types';

export const PostCards: Post[] = [
  {
    id: '1',
    title: 'Первый пост!',
    content: 'Это первый пост!',
    createdAt: new Date().toISOString(),
    comments: [],
    reaction: undefined
  },
  {
    id: '2',
    title: 'Второй пост',
    content: 'Второй пост!',
    createdAt: new Date().toISOString(),
    comments: [],
    reaction: undefined
  },
];