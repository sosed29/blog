import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadFromStorage, saveStorage } from '../../utils/storage';
import { POSTS_KEY, COMMENTS_KEY } from '../../constants';
import { Post, Comment, ReactionType } from '../../types';
import CommentForm from '../../components/CommentPost';
import CommentList from '../../components/CommentList';
import Reaction from '../../components/Reaction';
import styles from '../../styles/EditPost.module.css';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  // Загрузка и фильтрация комментариев по postId
  const updateComments = () => {
    const storedComments = loadFromStorage<Comment[]>(COMMENTS_KEY) || [];
    setComments(storedComments.filter(comment => comment.postId === id));
  };

  // Обработка реакции на пост
  const handlePostReaction = (reaction: ReactionType) => {
    if (!id) return;

    const allPosts = loadFromStorage<Post[]>(POSTS_KEY) || [];
    const updatedPosts = allPosts.map(p => {
      if (p.id === id) {
        const currentReactions = typeof p.reaction === 'object' && p.reaction !== null ? p.reaction : {};
        const updatedReactions = {
          ...currentReactions,
          [reaction]: (currentReactions[reaction] || 0) + 1,
        };
        return { ...p, reaction: updatedReactions };
      }
      return p;
    });

    saveStorage(POSTS_KEY, updatedPosts);
    setPost(updatedPosts.find(p => p.id === id) || null);
  };

  // Загрузка данных поста и комментариев
  useEffect(() => {
    const storedPosts = loadFromStorage<Post[]>(POSTS_KEY) || [];
    setPost(storedPosts.find(p => p.id === id) || null);
    updateComments();
  }, [id]);

  // Добавление нового комментария
  const addComment = (newComment: Comment) => {
    const allComments = loadFromStorage<Comment[]>(COMMENTS_KEY) || [];
    const updatedComments = [...allComments, newComment];
    saveStorage(COMMENTS_KEY, updatedComments);
    updateComments();
  };

  // Удаление комментария
  const deleteComment = (commentId: string) => {
    const allComments = loadFromStorage<Comment[]>(COMMENTS_KEY) || [];
    const updatedComments = allComments.filter(c => c.id !== commentId);
    saveStorage(COMMENTS_KEY, updatedComments);
    updateComments();
  };

  if (!post) {
    return <div className={styles.notFound}>Пост не найден</div>;
  }

  return (
    <div className={styles.container}>
      <article className={styles.post}>
        <h1>{post.title}</h1>
        <p>{post.content}</p>

        <div className={styles.postReactions}>
          <Reaction onReaction={handlePostReaction} />
          {post.reaction && Object.entries(post.reaction).map(([type, count]) => (
            <span key={type} className={styles.reactionBadge}>
              {type} {count as number}
            </span>
          ))}
        </div>
      </article>

      <section className={styles.comments}>
        <h2>Комментарии</h2>
        <CommentForm postId={id!} onAddComment={addComment} />
        <CommentList comments={comments} onDeleteComment={deleteComment} />
      </section>
    </div>
  );
};

export default PostDetail;
