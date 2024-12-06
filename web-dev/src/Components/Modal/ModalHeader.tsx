import styled from "@emotion/styled";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 0.5rem;

  @media (min-width: 640px) {
    text-align: left;
  }
`;

const Title = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

const Description = styled.p`
  font-size: 0.875rem;
  margin: 0;
`;

interface ModalHeaderProps {
  title: string;
  description?: string;
}

export function ModalHeader({ title, description }: ModalHeaderProps) {
  return (
    <StyledHeader>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </StyledHeader>
  );
}
