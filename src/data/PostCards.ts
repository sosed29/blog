import { Post } from '../InterfacesPost/Interfaces';

export const PostCards: Post[] = [
  {
    id: '1',
    title: 'Первый пост!',
    content: 'Это первый пост!',
    createdAt: new Date().toISOString(),
    comments: [],
  },
  {
    id: '2',
    title: 'Второй пост',
    content: 'Второй пост!',
    createdAt: new Date().toISOString(),
    comments: [],
  },
];