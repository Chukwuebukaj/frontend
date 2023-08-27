import { IoCloseOutline } from "react-icons/io5";
import { addServiceData } from "./CardData";
import { InputField } from "../Reuseables/FormFields";
import Button from "../Reuseables/Button";
import { styled } from "styled-components";
import { ServiceDetailsProps } from "./Details";

interface AddServiceProps {
  handleCloseModal: () => void;
  handleAddService: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  serviceDetails: ServiceDetailsProps | any;
  handleSubmitForm: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

interface BtnProps {
  $bgColor: string;
  $cursor: string;
}

const AddServiceForm: React.FC<AddServiceProps> = ({
  handleCloseModal,
  handleAddService,
  handleInputChange,
  serviceDetails,
  handleSubmitForm,
}) => {
  return (
    <ModalFormWrapper onKeyDown={handleSubmitForm}>
      <FormTop>
        <p>Add Service</p>
        <IoCloseOutline onClick={handleCloseModal} />
      </FormTop>

      {addServiceData.map(
        (data, index) =>
          data.type === "text" && (
            <label key={index} className="service-desc">
              <span>
                {data.title}
                {data.icon}
              </span>
              <InputField
                type={data.type}
                name={data.title}
                onChange={handleInputChange}
                value={serviceDetails?.[data?.title]}
              />
            </label>
          )
      )}
      <QtyRate>
        {addServiceData.map(
          (data, index) =>
            data.type === "number" && (
              <label key={index}>
                <span>{data.title}</span>
                <InputField
                  type={data.type}
                  name={data.title}
                  onChange={handleInputChange}
                  value={serviceDetails?.[data?.title]}
                />
              </label>
            )
        )}
      </QtyRate>
      <SaveBtn
        $bgColor={
          Object.values(serviceDetails).includes("") ||
          Object.values(serviceDetails).includes(0)
            ? "#D3D3D3"
            : "#3a62f2"
        }
        $cursor={
          Object.values(serviceDetails).includes("") ||
          Object.values(serviceDetails).includes(0)
            ? "not-allowed"
            : ""
        }
        children="Save"
        type="button"
        onClick={handleAddService}
        disabled={
          Object.values(serviceDetails).includes("") ||
          Object.values(serviceDetails).includes(0)
        }
      />
    </ModalFormWrapper>
  );
};

export default AddServiceForm;

const ModalFormWrapper = styled.div`
  display: flex;
  width: 27rem;
  padding: 1.25rem;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--white-200, #f7f7f7);
  background: var(--white-100, #fff);

  .service-desc {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  input[type="text"],
  input[type="email"] {
    display: flex;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border-radius: 0.5rem;
    border: 0.5px solid var(--black-100, #b8b8b8);
    background: var(--white-200, #f7f7f7);
    height: 2.5rem;
  }
`;

const FormTop = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1.75rem;

  svg {
    background: #d3d3d3;
    border-radius: 50%;
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
    cursor: pointer;
  }
`;

const QtyRate = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 1.25rem;

  input {
    display: flex;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border-radius: 0.5rem;
    border: 0.5px solid var(--black-100, #b8b8b8);
    background: var(--white-200, #f7f7f7);
    width: 100%;
    height: 2.5rem;
  }

  label {
    width: 50%;
  }
`;

const SaveBtn = styled(Button)<BtnProps>`
  display: flex;
  height: 2.6875rem;
  padding: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  background: ${({ $bgColor }) => $bgColor};
  color: #fff;
  border: 1px solid ${({ $bgColor }) => $bgColor};
  cursor: ${({ $cursor }) => $cursor};
`;
