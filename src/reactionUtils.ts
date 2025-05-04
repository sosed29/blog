import { Comment, ReactionType } from './InterfacesPost/Interfaces';
import { loadFromStorage } from './StorageSave/storage';
import { COMMENTS_KEY } from './Keys/StorageKeys';

export const getPostReactions = (postId: string): Record<ReactionType, number> => {
  const allComments = loadFromStorage<Comment[]>(COMMENTS_KEY) || [];
  const postComments = allComments.filter(comment => comment.postId === postId);
  
  const reactionCounts: Record<ReactionType, number> = {
    [ReactionType.LIKE]: 0,
    [ReactionType.HEART]: 0,
    [ReactionType.FIRE]: 0,
    [ReactionType.LAUGH]: 0
  };

  postComments.forEach(comment => {
    if (comment.reaction) {
      reactionCounts[comment.reaction]++;
    }
  });

  return reactionCounts;
};


export const CommentReaction = (
  commentId: string, 
  reaction: ReactionType, 
  allComments: Comment[]
): Comment[] => {
  return allComments.map(comment => 
    comment.id === commentId ? { ...comment, reaction } : comment
  );
};