import { styled } from "styled-components";

export interface TableCardProps {
  title: string;
  description: string;
  quantity: string;
  rate: string;
  amount: string;
}

const ServiceCard: React.FC<TableCardProps> = ({
  title,
  description,
  quantity,
  rate,
  amount,
}) => {
  return (
    <CardWrapper>
      <CardLeft>
        <span className="title">{title}</span>
        <span>{description}</span>
      </CardLeft>
      <CardRight>
        <span>{quantity}</span>
        <span>{rate}</span>
        <span>{amount}</span>
      </CardRight>
    </CardWrapper>
  );
};

export default ServiceCard;

const CardWrapper = styled.div`
  display: flex;
  padding: 0.75rem;
  border-radius: 0.5rem;
  justify-content: space-between;
  width: 100%;
  align-items: flex-start;
  // border: 1px solid red;

  span {
    color: var(--black-800, #262626);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem; /* 171.429% */
  }
`;
const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  justify-content: flex-end;


  .title {
    color: var(--black-800, #262626);
    font-weight: 700;
    line-height: 1.5rem; /* 171.429% */
  }
`;
const CardRight = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 35%;
  height:100%;
  // border: 1px solid red;



  span {
    // border: 1px solid red;
  }
`;
