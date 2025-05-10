import React from "react";
import { Comment } from "../types";
import styles from '../styles/EditPost.module.css';

interface CommentListProps {
  comments: Comment[];
  onDeleteComment: (id: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onDeleteComment,
}) => {
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className={styles.commentList}>
      {sortedComments.map((comment) => (
        <div key={comment.id} className={styles.commentItem}>
          <div className={styles.commentHeader}>
            <strong>{comment.author}</strong>
            <span>{new Date(comment.date).toLocaleString()}</span>
          </div>
          <p className={styles.commentText}>{comment.text}</p>
          <div className={styles.commentActions}>
            <button
              onClick={() => onDeleteComment(comment.id)}
              className={styles.deleteButton}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;