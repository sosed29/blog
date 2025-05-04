import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../InterfacesPost/Interfaces';
import { loadFromStorage, saveStorage } from '../StorageSave/storage';
import { POSTS_KEY } from '../Keys/StorageKeys';


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
    };

    const existingPosts = loadFromStorage<Post[]>(POSTS_KEY) || [];
    saveStorage(POSTS_KEY, [...existingPosts, newPost]);
    alert('Пост создан');
    navigate('/'); 
  };

  return (
    <div>
      <h2>Создать пост</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Содержимое"
      />
      <button onClick={handleCreate}>Создать</button>
    </div>
  );
};

export default CreatePost;
