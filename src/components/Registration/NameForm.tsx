import { styled } from "styled-components";
import { InputField } from "../Reuseables/FormFields";
import Button from "../Reuseables/Button";

interface NameFormProps {
  handleClickNext: () => void;
  nextClicked: boolean;
  isChecked: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formValues: { name: string; businessname: string; email: string };
}

const NameForm: React.FC<NameFormProps> = ({
  nextClicked,
  isChecked,
  formValues,
  handleClickNext,
  handleInputChange,
}) => {
  const validated: boolean =
    (isChecked && formValues.name !== "" && formValues.email !== "") ||
    (!isChecked && !Object.values(formValues).includes(""));
  return (
    <>
      {!nextClicked && (
        <FormWrapper>
          <p className="top-para">Let us know you</p>
          <FormFieldsWrapper>
            <div className="input-container">
              <label htmlFor="">Enter name</label>
              <FormField
                name="name"
                placeholder="Enter your full name"
                onChange={handleInputChange}
                value={formValues.name}
              />
            </div>
            <span>
              <CheckBox
                type="checkbox"
                name="namecheck"
                onChange={handleInputChange}
                checked={isChecked}
              />
              Use as business name
            </span>
            {!isChecked && (
              <div className="input-container">
                <label htmlFor="">Enter business name</label>
                <FormField
                  name="businessname"
                  placeholder="Enter your business name"
                  onChange={handleInputChange}
                  value={formValues.businessname}
                />
              </div>
            )}
            <div className="input-container">
              <label htmlFor="">Enter email</label>
              <FormField
                name="email"
                placeholder="Enter your email address"
                onChange={handleInputChange}
                value={formValues.email}
              />
            </div>
          </FormFieldsWrapper>

          <NextBtn
            $bgColor={validated ? "#3A62F2" : "#D3D3D3"}
            disabled={!validated}
            onClick={handleClickNext}
          >
            Next
          </NextBtn>
        </FormWrapper>
      )}
    </>
  );
};

export default NameForm;

const FormWrapper = styled.div`
  width: 24.5rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  .top-para {
    margin: 2rem auto 5rem auto;
  }

  .input-container {
    display: flex;
    flex-direction: column;
  }

  span {
    display: flex;
    align-items: center;
    width: fit-content;
    gap: 0.5rem;
  }
`;

const FormField = styled(InputField)`
  width: 100%;
  padding: 0.5rem 0 0.5rem 0.5rem;
  border-radius: 0.5rem;
  border: 0.5px solid var(--black-100, #b8b8b8);
  background: var(--white-200, #f7f7f7);
  color: var(--black-800, #262626);
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5rem; /* 171.429% */

  &:focus {
    outline: none;
  }
`;

const FormFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CheckBox = styled(InputField)`
  margin-right: auto;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
`;

const NextBtn = styled(Button)<{ $bgColor: string }>`
  padding: 0.75rem 1rem;
  width: fit-content;
  border-radius: 0.5rem;
  background: ${({ $bgColor }) => $bgColor};
  color: var(--white-100, #fff);
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  line-height: normal;
  border: 1px solid ${({ $bgColor }) => $bgColor};
  margin: 3.25rem 0 0 auto;
`;
