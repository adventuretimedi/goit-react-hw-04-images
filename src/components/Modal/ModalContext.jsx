import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalImage, setModalImage] = useState(null);

  const showModal = modalImage => {
    console.log('showModal: ', modalImage);
    setModalImage(modalImage);
  };

  const closeModal = () => {
    console.log('close modal');
    setModalImage(null);
  };

  return (
    <ModalContext.Provider value={{ modalImage, showModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
