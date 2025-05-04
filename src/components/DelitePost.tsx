import React from 'react';
import styles from '../styles/DelitePost.module.css';

interface DeletePostProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeletePost: React.FC<DeletePostProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.deliteContainer}>
      <div className={styles.deliteContent }>
        <h3>Подтвердите удаление!</h3>
        <p>Удалить пост?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.deliteButton} onClick={onDelete}>
            Удалить
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;