import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Post } from '../InterfacesPost/Interfaces';
import { loadFromStorage, saveStorage } from '../StorageSave/storage';
import styles from '../styles/EditPost.module.css';
import { POSTS_KEY } from '../Keys/StorageKeys';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);

 
  useEffect(() => {
    if (!id) return;
    
    const storedPosts = loadFromStorage<Post[]>(POSTS_KEY) || [];
    const foundPost = storedPosts.find(p => p.id === id);
    
    if (foundPost) {
      setPost(foundPost);
    }
  }, [id]);

  
  const handleEditPostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!post) return;
    
    setPost({
      ...post,
      [e.target.name]: e.target.value
    });
  };

 
  const EditPostSave = () => {
    if (!post || !id) return;
    
    const posts = loadFromStorage<Post[]>(POSTS_KEY) || [];
    const updatedPosts = posts.map(p => p.id === id ? post : p);
    
    saveStorage(POSTS_KEY, updatedPosts);
    navigate('/');
  };

  if (!post) {
    return <div className={styles.error}>Пост не найден</div>;
  }

  return (
    <div className={styles.formWrapper}>
      <h2>Редактировать пост</h2>
      <input
        type="text"
        name="title"
        value={post.title}
        onChange={handleEditPostChange}
        placeholder="Заголовок"
      />
      <textarea
        name="content"
        value={post.content}
        onChange={handleEditPostChange}
        placeholder="Содержимое"
      />
      <button onClick={EditPostSave}>Сохранить изменения</button>
    </div>
  );
};

export default EditPost;