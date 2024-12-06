import styled from "@emotion/styled";

interface BackdropProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
}

const BackdropContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 40;
  animation: backdropEnter 0.2s ease-out;

  @keyframes backdropEnter {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
export default function Backdrop({ children, onClose, isOpen }: BackdropProps) {
  if (!isOpen) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <BackdropContainer onClick={handleOutsideClick}>
      {children}
    </BackdropContainer>
  );
}
