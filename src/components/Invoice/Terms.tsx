import { styled } from "styled-components";
import Button from "../Reuseables/Button";
import { TextArea } from "../Reuseables/FormFields";

interface TermsProps {
  goToNext: () => void;
  goToPrev: () => void;
  handleTermsInputChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  terms: string;
}

interface BtnBgColor {
  $bgColor: string;
  $cursor: string;
}

const Terms: React.FC<TermsProps> = ({
  goToNext,
  goToPrev,
  handleTermsInputChange,
  terms,
}) => {
  return (
    <TermsWrapper>
      <TermsTextArea
        placeholder="Type terms and conditions here"
        onChange={handleTermsInputChange}
        name="terms"
        value={terms}
      />
      <CtrlBtns>
        <PrevBtn children="Prev" type="button" onClick={goToPrev} />
        <NextBtn
          $cursor={terms === "" ? "not-allowed" : "pointer"}
          $bgColor={terms === "" ? "#d3d3d3" : "#3a62f2"}
          children="Next"
          type="button"
          onClick={goToNext}
          disabled={terms === ""}
        />
      </CtrlBtns>
    </TermsWrapper>
  );
};

export default Terms;

const TermsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 27rem;
  padding: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--white-200, #f7f7f7);
  background: var(--white-100, #fff);
  justify-content: space-between;
`;

const TermsTextArea = styled(TextArea)`
  display: flex;
  width: 100%;
  height: 23.5rem;
  padding: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 18.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--white-200, #f7f7f7);
  background: var(--white-100, #fff);

  &:focus {
    outline: none;
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
`;

const PrevBtn = styled(Button)`
  border-radius: 0.5rem;
  border: 1px solid var(--blue-500, #3a62f2);
  background: transparent;
  color: #3a62f2;
`;
const NextBtn = styled(Button)<BtnBgColor>`
  border-radius: 0.5rem;
  background-color: ${({ $bgColor }) => $bgColor};
  border: 1px solid ${({ $bgColor }) => $bgColor};
  color: #fff;
  cursor:${({ $cursor }) => $cursor};
`;
