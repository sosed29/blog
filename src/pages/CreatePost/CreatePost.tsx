import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../../types';
import { loadFromStorage, saveStorage } from '../../utils/storage';
import { POSTS_KEY } from '../../constants';
import styles from '../../styles/EditPost.module.css';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreate = () => {
    const newPost: Post = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date().toISOString(),
      reaction: undefined
    };

    const existingPosts = loadFromStorage<Post[]>(POSTS_KEY) || [];
    saveStorage(POSTS_KEY, [...existingPosts, newPost]);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Создать новый пост</h2>
      <form className={styles.form} onSubmit={handleCreate}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок поста"
          className={styles.input}
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Содержание поста"
          className={styles.textarea}
          required
        />
        <button type="submit" className={styles.button}>
          Опубликовать пост
        </button>
      </form>
    </div>
  );
};

export default CreatePost;