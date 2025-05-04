import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadFromStorage, saveStorage } from '../StorageSave/storage';
import { POSTS_KEY, COMMENTS_KEY } from '../Keys/StorageKeys';
import { Post, Comment } from '../InterfacesPost/Interfaces';
import CommentForm from '../components/CommentPost';
import CommentList from '../components/CommentList';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  
  const updateComments = () => {
    const storedComments = loadFromStorage<Comment[]>(COMMENTS_KEY) || [];
    setComments(storedComments.filter(comment => comment.postId === id));
  };

 
  useEffect(() => {
    const storedPosts = loadFromStorage<Post[]>(POSTS_KEY) || [];
    setPost(storedPosts.find(p => p.id === id) || null);
    updateComments();
  }, [id]);

  
  const addComment = (newComment: Comment) => {
    const allComments = loadFromStorage<Comment[]>(COMMENTS_KEY) || [];
    const updatedComments = [...allComments, newComment];
    saveStorage(COMMENTS_KEY, updatedComments);
    updateComments();
  };

 
  const deleteComment = (commentId: string) => {
    const allComments = loadFromStorage<Comment[]>(COMMENTS_KEY) || [];
    const updatedComments = allComments.filter(c => c.id !== commentId);
    saveStorage(COMMENTS_KEY, updatedComments);
    updateComments();
  };

  if (!post) {
    return <div>Пост не найден</div>;
  }

  return (
    <div className="post-detail">
      <article className="post-content">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </article>
      
      <section className="comments-section">
        <h2>Комментарии</h2>
        <CommentForm 
          postId={id!} 
          onAddComment={addComment} 
        />
    
    
        <CommentList 
          comments={comments} 
          onDeleteComment={deleteComment} 
        />
      </section>
    </div>
  );
};

export default PostDetail;