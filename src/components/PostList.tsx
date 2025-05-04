import { FC, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { POSTS_KEY, COMMENTS_KEY } from '../Keys/StorageKeys';
import { Post, Comment } from '../InterfacesPost/Interfaces';
import { PostCards } from '../data/PostCards';
import { loadFromStorage, saveStorage } from '../StorageSave/storage';
import ConfirmDeletePopup from './DelitePost';
import { getPostReactions } from '../reactionUtils';
import styles from '../styles/PostList.module.css';

const PostList: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isWindowOpen, setIsPopupOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = loadFromStorage<Post[]>(POSTS_KEY);
    setPosts(storedPosts?.length ? storedPosts : PostCards);
    if (!storedPosts?.length) saveStorage(POSTS_KEY, PostCards);

    const storedComments = loadFromStorage<Comment[]>(COMMENTS_KEY);
    if (storedComments) setComments(storedComments);
  }, []);

  const handleDelete = (id: string) => {
    setPostToDelete(id);
    setIsPopupOpen(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      const updatedPosts = posts.filter(post => post.id !== postToDelete);
      setPosts(updatedPosts);
      saveStorage(POSTS_KEY, updatedPosts);
    }
    setIsPopupOpen(false);
    setPostToDelete(null);
  };

  const cancelDelete = () => {
    setIsPopupOpen(false);
    setPostToDelete(null);
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className={styles.postList}>
      {posts.map((post) => {
        const postComments = comments.filter(comment => comment.postId === post.id);
        const reactions = getPostReactions(post.id);

        return (
          <div key={post.id} className={styles.postItem}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            <div className={styles.actionButtons}>
              <div>
                {Object.entries(reactions).map(([type, count]) =>
                  count > 0 && (
                    <span key={type}>
                      {type} {count}
                    </span>
                  )
                )}
              </div>
              <button onClick={() => handleDelete(post.id)}>
                <img src="./img/delete-svgrepo-com.svg" alt="Удалить пост" />
              </button>
              <Link to={`/post/${post.id}`}>
                <img src="./img/comment-3-svgrepo-com.svg" alt="Комментарии" />
                <span>{postComments.length}</span>
              </Link>
              <button onClick={() => handleEdit(post.id)}>
                <img src="./img/pencil-svgrepo-com.svg" alt="Редактировать пост" />
              </button>
            </div>
          </div>
        );
      })}

      <ConfirmDeletePopup 
        isOpen={isWindowOpen}
        onClose={cancelDelete}
        onDelete={confirmDelete}
      />
    </div>
  );
};

export default PostList;