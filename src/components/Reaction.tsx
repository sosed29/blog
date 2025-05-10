import React, { useState } from 'react';
import { ReactionType } from '../types';
import styles from '../styles/Reaction.module.css';

interface ReactionProps {
  onReaction: (reaction: ReactionType) => void;
}

const Reaction: React.FC<ReactionProps> = ({ onReaction }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleReaction = (reaction: ReactionType) => {
    onReaction(reaction);
    setIsOpen(false);
  };

  return (
    <div className={styles.reactionContainer}>
      <button 
        className={styles.reactionButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Добавить реакцию"
      >
        <span>😊</span> Реакция
      </button>
      
      {isOpen && (
        <div className={styles.reactionOptions}>
          {Object.values(ReactionType).map((emoji) => (
            <button
              key={emoji}
              className={styles.reactionOption}
              onClick={() => handleReaction(emoji)}
              aria-label={`Реакция ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reaction;