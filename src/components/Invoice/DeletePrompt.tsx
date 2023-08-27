import { styled } from "styled-components";
import Button from "../Reuseables/Button";

interface DeletePromptProps {
  handleDeleteService: () => void;
  handleCloseModal: () => void;
}

const DeletePrompt: React.FC<DeletePromptProps> = ({
  handleCloseModal,
  handleDeleteService,
}) => {
  return (
    <DeletePromptWrapper>
      <span>Are you sure you want to delete this service?</span>
      <div className="btns-container">
        <Button type="button" children="Yes" onClick={handleDeleteService} />
        <Button type="button" children="No" onClick={handleCloseModal} />
      </div>
    </DeletePromptWrapper>
  );
};

export default DeletePrompt;

const DeletePromptWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #fff;
  padding: 1rem;
  align-items: center;

  .btns-container {
    display: flex;
    gap: 2rem;

    button {
      display: flex;
      width: 3.5rem;
      padding: 0.25rem;
      justify-content: center;
      align-items: center;
      border-radius: 0.25rem;
      background: var(--blue-500, #3a62f2);
      border: 1px solid #3a62f2;
      color: #fff;
    }
  }
`;
