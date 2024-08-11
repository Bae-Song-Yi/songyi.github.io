import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import styled from 'styled-components';

const StyledContainer = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 5px;
  }
  .Toastify__close-button {
    display: none;
  }

  .Toastify__toast-icon {
    svg {
      fill: var(--toastify-color-light);
    }
  }

  .Toastify__toast--success {
    background-color: var(--toastify-color-success);

    .Toastify__toast-body {
      color: var(--toastify-color-light);
    }
  }

  .Toastify__toast--error {
    background-color: #e51b27;

    .Toastify__toast-body {
      color: var(--toastify-color-light);
    }
  }

  @media all and (max-width: 580px) {
    .Toastify__toast-container--bottom-center,
    .Toastify__toast-container--bottom-left,
    .Toastify__toast-container--bottom-right {
      top: 8.7rem;
      width: 87.74%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const ToastComponent = () => {
  return (
    <StyledContainer
      position="bottom-center"
      autoClose={1000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      transition={Zoom}
    />
  );
};

export default ToastComponent;
