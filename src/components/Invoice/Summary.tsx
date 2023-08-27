import { styled } from "styled-components";
import Button from "../Reuseables/Button";
import { InputField } from "../Reuseables/FormFields";

interface SummaryProps {
  checked: boolean;
  goToPrev: () => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Summary: React.FC<SummaryProps> = ({
  goToPrev,
  handleCheckboxChange,
  checked,
}) => {
  return (
    <SummaryWrapper>
      <p>
        Wallet address is generated and assigned to this invoice when you click
        create invoice button. <br />
        <br /> By clicking on create invoice, you agree to the{" "}
        <a href="https://www.pavoce.speke/conditions">
          Terms and Conditions of Pavoce
        </a>
      </p>
      <CheckBoxWrapper>
        <CheckBox
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={checked}
        />
        <p>I agree to the Terms and Conditions of Pavoce</p>
      </CheckBoxWrapper>
      <CtrlBtns>
        <PrevBtn type="button" children="Prev" onClick={goToPrev} />
        <SubmitInvoiceBtn
          className={checked ? "blue" : "grey"}
          type="submit"
          children="Create Invoice"
          disabled={!checked}
        />
      </CtrlBtns>
    </SummaryWrapper>
  );
};

export default Summary;

const SummaryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem; /* 171.429% */

  a {
    color: var(--blue-500, #3a62f2);
    text-decoration-line: underline;
  }

  p {
    color: var(--black-800, #262626);
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

const SubmitInvoiceBtn = styled(Button)`
  border-radius: 0.5rem;
  color: #fff;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CheckBox = styled(InputField)`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
`;
