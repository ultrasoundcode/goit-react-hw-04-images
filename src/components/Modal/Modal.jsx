/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import styles from './Modal.module.css';

export function Modal({ image, onClose }) {
  const handleCloseClick = event => {
    if (event.target.tagName !== 'IMG') {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={styles.Overlay} onClick={handleCloseClick}>
      <div className={styles.Modal}>
        <img src={image} alt="" />
      </div>
    </div>
  );
}

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
