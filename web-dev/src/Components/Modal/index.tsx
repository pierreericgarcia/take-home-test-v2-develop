import styled from "@emotion/styled";
import Backdrop from "./Backdrop";
import { ModalHeader } from "./ModalHeader";
import { ModalContent } from "./ModalContent";
import { ModalFooter } from "./ModalFooter";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
}

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 425px;
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 50;
  animation: modalEnter 0.2s ease-out;

  @keyframes modalEnter {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @media (max-width: 640px) {
    max-width: 70%;
  }
`;

function Modal({
  isOpen,
  onClose,
  children,
  ariaLabelledby,
  ariaDescribedby,
}: ModalProps) {
  return (
    <Backdrop isOpen={isOpen} onClose={onClose}>
      <ModalContainer
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
      >
        {children}
      </ModalContainer>
    </Backdrop>
  );
}

export { ModalHeader, ModalContent, ModalFooter };
export default Modal;
