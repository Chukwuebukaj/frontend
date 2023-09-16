import { InputField, Select } from "../Reuseables/FormFields";
import Button from "../Reuseables/Button";
import { fiatTypes, cryptoTypes, fieldTitles } from "./CardData";
import { ToggleBtns } from "./Invoice.Styled";
import { styled } from "styled-components";
import { AiOutlinePlus, AiOutlineClear } from "react-icons/ai";
import Modal from "./Modal";
import AddServiceForm from "./AddServiceForm";
import { PiPencilSimpleLight } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import DeletePrompt from "./DeletePrompt";

export interface ServiceDetailsProps {
  "Service Title": string;
  "Service Description": string;
  Qty: number;
  Rate: number;
}

export interface ClientDetailsProps {
  "Client Name": string;
  "Client Email": string;
  "Start Date": string;
  "End Date": string;
}

export interface DetailsProps {
  services: ServiceDetailsProps[];
  handleAddService: () => void;
  handleServiceInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleToggleModal: () => void;
  clickAddService: boolean;
  activeBtn: string;
  handleSelectCurrency: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBtn1: () => void;
  handleBtn2: () => void;
  clientDetails: ClientDetailsProps;
  handleClientDetailsChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleClickUpdate: (index: number) => void;
  handleClickDelete: (index: number) => void;
  updateBtnClicked: boolean;
  deleteBtnClicked: boolean;
  clearServicesBtnClicked: boolean;
  serviceDetails: ServiceDetailsProps;
  handleDeleteService: () => void;
  handleOpenModal: () => void;
  handleClickNext: () => void;
  handleClickClearServices: () => void;
  handleSubmitForm: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  handleDeleteWithEnter: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const Details: React.FC<DetailsProps> = ({
  services,
  handleAddService,
  handleServiceInputChange,
  handleToggleModal,
  clickAddService,
  activeBtn,
  handleSelectCurrency,
  handleBtn1,
  handleBtn2,
  clientDetails,
  handleClientDetailsChange,
  handleClickUpdate,
  handleClickDelete,
  updateBtnClicked,
  deleteBtnClicked,
  clearServicesBtnClicked,
  serviceDetails,
  handleDeleteService,
  handleOpenModal,
  handleSubmitForm,
  handleClickNext,
  handleDeleteWithEnter,
  handleClickClearServices,
}) => {
  const disabled =
    services.length === 0 || Object.values(clientDetails).includes("");

  return (
    <DetailsForm>
      {fieldTitles.map(
        (title, index) =>
          title.type !== "date" && (
            <label key={index} htmlFor={title.id}>
              <span>{title.title}</span>
              <InputField
                type={title.type}
                id={title.id}
                name={title.title}
                value={Object.values(clientDetails)[index]}
                onChange={handleClientDetailsChange}
              />
            </label>
          )
      )}
      <Dates>
        {fieldTitles.map(
          (title, index) =>
            title.type === "date" && (
              <label key={index} htmlFor={title.id}>
                <span>{title.title}</span>
                <InputField
                  type={title.type}
                  id={title.id}
                  name={title.title}
                  value={Object.values(clientDetails)[index]}
                  onChange={handleClientDetailsChange}
                />
              </label>
            )
        )}
      </Dates>
      <div className="select-type">
        <ToggleBtns>
          <Button
            children="Fiat"
            className={activeBtn === "btn1" ? "active" : ""}
            onClick={handleBtn1}
            type="button"
          />
          <Button
            children="Crypto"
            className={activeBtn === "btn2" ? "active" : ""}
            onClick={handleBtn2}
            type="button"
          />
        </ToggleBtns>
        <Select
          options={
            activeBtn === "btn1" ? fiatTypes.slice(1) : cryptoTypes.slice(1)
          }
          defaultValue={activeBtn === "btn1" ? fiatTypes[0] : cryptoTypes[0]}
          className="currency-select"
          onChange={handleSelectCurrency}
        />
      </div>
      <Services>
        <h3>Service</h3>
        <div className="services-list">
          {services?.map((service, index) => (
            <div key={index} className="services-list-item">
              <span>{service["Service Title"]}</span>
              <div className="icons-container">
                <PiPencilSimpleLight onClick={() => handleClickUpdate(index)} />
                <MdDeleteOutline
                  className="delete-icon"
                  onClick={() => handleClickDelete(index)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="add-clear">
          <AddServiceButton type="button" onClick={handleOpenModal}>
            <AiOutlinePlus />
            Add service
          </AddServiceButton>
          {services.length > 1 && (
            <ClearServicesBtn type="button" onClick={handleClickClearServices}>
              Clear services
              <AiOutlineClear />
            </ClearServicesBtn>
          )}
        </div>
      </Services>
      {clickAddService && (
        <Modal
          children={
            <AddServiceForm
              handleCloseModal={handleToggleModal}
              handleAddService={handleAddService}
              serviceDetails={serviceDetails}
              handleInputChange={handleServiceInputChange}
              handleSubmitForm={handleSubmitForm}
            />
          }
        />
      )}
      {updateBtnClicked && (
        <Modal
          children={
            <AddServiceForm
              handleCloseModal={handleToggleModal}
              handleAddService={handleAddService}
              serviceDetails={serviceDetails}
              handleInputChange={handleServiceInputChange}
              handleSubmitForm={handleSubmitForm}
            />
          }
        />
      )}

      {(deleteBtnClicked || clearServicesBtnClicked) && (
        <Modal
          children={
            <DeletePrompt
              handleDeleteService={handleDeleteService}
              handleCloseModal={handleToggleModal}
              handleDeleteWithEnter={handleDeleteWithEnter}
              lastWords={
                deleteBtnClicked ? "delete this service" : "clear all services"
              }
            />
          }
        />
      )}
      <NextBtn
        children="Next"
        type="button"
        onClick={handleClickNext}
        className={disabled ? "grey" : "blue"}
        disabled={disabled}
      />
    </DetailsForm>
  );
};

export default Details;

const DetailsForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.25rem;

  .select-type {
    display: flex;
  }

  .currency-select {
    border-radius: 0rem 0.5rem 0.5rem 0rem;
    border: 0.5px solid var(--black-100, #b8b8b8);
    display: flex;
    width: 4.5rem;
    padding: 0.5rem;
    justify-content: center;
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

  input[type="date"] {
    svg {
      cursor: pointer;
    }
    cursor: pointer;
  }

  label {
    display: flex;
    flex-direction: column;
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

const Dates = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  input {
    width: 11.625rem;
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

const AddServiceButton = styled(Button)`
  color: var(--blue-500, #3a62f2);
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #fff;
  gap: 0.5rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const ClearServicesBtn = styled(Button)`
  color: var(--blue-500, #3a62f2);
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  line-height: normal;
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #fff;
  gap: 0.5rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: crimson;
  }
`;

const Services = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .services-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .services-list-item {
    display: flex;
    justify-content: space-between;
    color: var(--black-800, #262626);
    background: #f7f7f7;
    padding: 0.5rem;
    border-radius: 0.2rem;
  }

  .icons-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      cursor: pointer;
    }
  }

  .delete-icon {
    color: red;
  }

  .add-clear {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const NextBtn = styled(Button)`
  display: flex;
  height: 2.6875rem;
  padding: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  color: #fff;
  width: 4.3125rem;
  margin-left: auto;
`;
