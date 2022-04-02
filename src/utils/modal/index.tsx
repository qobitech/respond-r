import React from 'react';
import './index.scss';

interface IProps {
  handleClose: () => void;
  show: boolean;
  children: JSX.Element;
  className?: string;
  style?: React.CSSProperties;
}

const Modal: React.FC<IProps> = props => {
  const { handleClose, show, children, style } = props;
  const showHideModalClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className='modal-component'>
      <div className={showHideModalClassName}>
        <section className='modal-main' style={style!}>
          <div className='close'>
            <h4 onClick={handleClose}>close</h4>
          </div>
          {children}
        </section>
      </div>
    </div>
  );
};

export default Modal;
