import { styled } from "styled-components";
import { InputField } from "../Reuseables/FormFields";
import { paymentData } from "./CardData";
import Button from "../Reuseables/Button";

export interface PaymentInputProps {
  "Bank Name": string;
  "Account Number": number;
  Installment: number;
  "Initial Deposit %": number;
  "Tax %": number;
  "Discount %": number;
  [key: string | number]: string | number;
}

interface PaymentDetails {
  paymentDetails: PaymentInputProps;
  handlePaymentDetailsChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  goToNext: () => void;
  goToPrev: () => void;
}

const Payment: React.FC<PaymentDetails> = ({
  paymentDetails,
  handlePaymentDetailsChange,
  goToPrev,
  goToNext,
}) => {
  return (
    <PaymentWrapper>
      {paymentData.map((data, index) => (
        <label key={index} className={index > 1 ? "half" : "full"}>
          <span>{data.title}</span>
          <InputField
            type={data.type}
            name={data.title}
            value={paymentDetails[data.title]}
            onChange={handlePaymentDetailsChange}
          />
        </label>
      ))}
      <CtrlBtns>
        <PrevBtn children="Prev" type="button" onClick={goToPrev} />
        <NextBtn
          disabled={Object.values(paymentDetails).includes("" || 0)}
          className={
            Object.values(paymentDetails).includes("") ||
            Object.values(paymentDetails).includes(0)
              ? "grey"
              : "blue"
          }
          children="Next"
          type="button"
          onClick={goToNext}
        />
      </CtrlBtns>
    </PaymentWrapper>
  );
};

export default Payment;

const PaymentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 27rem;
  padding: 1.25rem;
  //   flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--white-200, #f7f7f7);
  background: var(--white-100, #fff);
  justify-content: space-between;

  label {
    display: flex;
    flex-direction: column;
  }

  .half {
    width: 45%;
  }

  .full {
    width: 100%;
  }

  input {
    border-radius: 0.5rem;
    border: 0.5px solid var(--black-100, #b8b8b8);
    background: var(--white-200, #f7f7f7);
    display: flex;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    height: 2.5rem;
  }

  span {
    color: var(--black-400, #5e5e5e);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5rem; /* 171.429% */
  }
`;

const CtrlBtns = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  button {
    display: flex;
    height: 2.6875rem;
    padding: 0.75rem 1rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .blue {
    background: var(--blue-500, #3a62f2);
    border: 1px solid #3a62f2;
  }

  .grey {
    background: var(--white-400, #d3d3d3);
    border: 1px solid #d3d3d3;
    cursor: not-allowed;
  }
`;

const PrevBtn = styled(Button)`
  border-radius: 0.5rem;
  border: 1px solid var(--blue-500, #3a62f2);
  background: transparent;
  color: #3a62f2;
`;
const NextBtn = styled(Button)`
  border-radius: 0.5rem;
  border: 1px solid #3a62f2;
  color: #fff;
`;
