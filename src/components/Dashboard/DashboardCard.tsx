import { ReactNode } from "react";
import { styled } from "styled-components";

export interface CardProps {
  icon: ReactNode;
  count?: number;
  description: string;
  bgColor: string;
}

interface BgProp {
  $bgColor: string;
}
const DashboardCard: React.FC<CardProps> = ({
  icon,
  count,
  description,
  bgColor,
}) => {
  return (
    <CardWrapper>
      <IconWrapper $bgColor={bgColor}>{icon}</IconWrapper>
      <span className="count">{count}</span>
      <span>{description}</span>
    </CardWrapper>
  );
};

export default DashboardCard;

const CardWrapper = styled.div`
  display: flex;
  width: 11.0625rem;
  padding: 1.25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--white-200, #f7f7f7);
  background: var(--white-100, #fff);

  .count {
    color: var(--black-800, #262626);
    font-size: 3.5rem;
    font-weight: 600;
    line-height: 4rem; /* 114.286% */
  }
`;

const IconWrapper = styled.div<BgProp>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${({ $bgColor }) => $bgColor};
`;
