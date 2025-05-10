import { FC, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { POSTS_KEY, COMMENTS_KEY } from "../constants";
import { Post, Comment } from "../types";
import { PostCards } from "../data/PostCards";
import { loadFromStorage, saveStorage } from "../utils/storage";
import ConfirmDeletePopup from "./DelitePost";
import styles from "../styles/PostList.module.css";

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
      const updatedPosts = posts.filter((post) => post.id !== postToDelete);
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
        const postComments = comments.filter(
          (comment) => comment.postId === post.id
        );

     
        const totalReactions: Record<string, number> = {};

        postComments.forEach((comment) => {
          if (comment.reaction) {
            totalReactions[comment.reaction] =
              (totalReactions[comment.reaction] || 0) + 1;
          }
        });

       
        if (post.reaction) {
          for (const [type, count] of Object.entries(post.reaction)) {
            totalReactions[type] =
              (totalReactions[type] || 0) + (count as number);
          }
        }

        return (
          <div key={post.id} className={styles.postItem}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            <div className={styles.actionButtons}>
              <Link to={`/post/${post.id}`} className={styles.commentLink}>
                <img src="./img/comment-3-svgrepo-com.svg" alt="Комментарии" />
                <span>{postComments.length}</span>
              </Link>
              <div className={styles.reactionContainer}>
                {Object.entries(totalReactions).map(([type, count]) => (
                  <span key={type} className={styles.reactionBadge}>
                    {type} {count}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleDelete(post.id)}
                className={styles.actionButton}
              >
                <img src="./img/delete-svgrepo-com.svg" alt="Удалить пост" />
              </button>

              <button
                onClick={() => handleEdit(post.id)}
                className={styles.actionButton}
              >
                <img
                  src="./img/pencil-svgrepo-com.svg"
                  alt="Редактировать пост"
                />
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
