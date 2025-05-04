import React, { useState } from 'react';
import { Comment } from '../InterfacesPost/Interfaces';

interface CommentPost {
  postId: string;
  onAddComment: (comment: Comment) => void;
}

const CommentPost: React.FC<CommentPost> = ({ postId, onAddComment }) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      author,
      text,
      date: new Date().toISOString(),
    };
    onAddComment(newComment);
    setAuthor('');
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Имя"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        placeholder="Комментарий"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Добавить комментарий</button>
    </form>
  );
};

export default CommentPost;
