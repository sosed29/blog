import React from "react";
import { Comment, ReactionType } from "../InterfacesPost/Interfaces";
import Reaction from "./Reaction";
import { loadFromStorage, saveStorage } from "../StorageSave/storage";
import { COMMENTS_KEY } from "../Keys/StorageKeys";
import { CommentReaction } from "../reactionUtils";

interface CommentListProps {
  comments: Comment[];
  onDeleteComment: (id: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onDeleteComment,
}) => {
  const handleReaction = (commentId: string, reaction: ReactionType) => {
    const allComments = loadFromStorage<Comment[]>(COMMENTS_KEY) || [];
    const updatedComments = CommentReaction(
      commentId,
      reaction,
      allComments
    );
    saveStorage(COMMENTS_KEY, updatedComments);
    onDeleteComment("");
  };

  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="comment-list">
      {sortedComments.map((comment) => (
        <div key={comment.id} className="comment-item">
          <div className="comment-header">
            <strong>{comment.author}</strong>
            <span>{new Date(comment.date).toLocaleString()}</span>
          </div>
          <p className="comment-text">{comment.text}</p>

          {comment.reaction && (
            <span className="comment-reaction">
              Реакция: {comment.reaction}
            </span>
          )}
          <div className="comment-actions">
            <button
              onClick={() => onDeleteComment(comment.id)}
              className="delete-button"
            >
              Удалить
            </button>
            <Reaction
              onReaction={(reaction) => handleReaction(comment.id, reaction)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
