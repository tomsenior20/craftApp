import React, { useEffect, useState } from 'react';
import '../styling/alert.scss';

type Model = {
  type: 'success' | 'error';
  message: string;
  isVisible: boolean;
  onClose: () => void;
};

export const Alert: React.FC<Model> = ({
  type,
  message,
  isVisible,
  onClose
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);

  const Close = () => {
    setVisible(false);
    onClose();
  };

  // if not visible ~ then return null
  if (!visible) return null;
  const modalClass = type === 'success' ? 'modal-success' : 'modal-error';

  return (
    <div className="modal-backdrop">
      <div className={`modal-container ${modalClass}`}>
        <h2>{type === 'success' ? 'Success!' : 'Error!'}</h2>
        <p>{message}</p>
        <button className="closeAlertButton btn btn-dark" onClick={Close}>
          Close
        </button>
      </div>
    </div>
  );
};
