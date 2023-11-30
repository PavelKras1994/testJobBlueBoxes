import React from 'react';

import './Modal.scss';

const Modal = ({playerScore, computerScore, closeModal}) => {

    return (
        <div className="modal">
            <div className="modal__content">
                <div className='modal__content_result'>
                    <div>{playerScore > computerScore ? 'Вітаємо ви були достатньо швидкі!' : 'Комп`ютер переміг, cпробуйте ще.'}</div>
                    <div>Ваш рахунок: {playerScore}</div>
                    <div>Комп'ютер: {computerScore}</div>
                </div>
                <button onClick={closeModal} className='modal__content_button'> Зіграти ще раз </button>
            </div>
        </div>
    );
};

export default Modal;
