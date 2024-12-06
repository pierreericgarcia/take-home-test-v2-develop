import styled from "@emotion/styled";

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 0;
  font-size: 0.875rem;
`;

export function ModalContent({ children }: { children: React.ReactNode }) {
  return <StyledContent>{children}</StyledContent>;
}
