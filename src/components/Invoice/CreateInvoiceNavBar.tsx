import { styled } from "styled-components";
import { createInvoiceNavBar } from "./CardData";

interface NavBarProps {
  handleClickListItem: (clickedListItem: string) => void;
  handleShowForm: (currentForm: string) => void;
  currentForm: string;
}

const CreateInvoiceNavBar: React.FC<NavBarProps> = ({
  handleClickListItem,
  // handleShowForm,
  currentForm,
}) => {
  return (
    <NavWrapper>
      <NavList>
        {createInvoiceNavBar.map((item, index) => (
          <li
            key={index}
            onClick={
              item.title === "Create Invoice"
                ? () => handleClickListItem(item.title)
                : undefined
            }
          >
            <span
              className={
                item.title === "Create Invoice"
                  ? "grey"
                  : item.title === currentForm
                  ? "blue"
                  : "black"
              }
            >
              {item.title}
            </span>
            {item.title === "Create Invoice" ? (
              <p className="close-icon">{item.icon}</p>
            ) : (
              <p>{item.icon}</p>
            )}
          </li>
        ))}
      </NavList>
    </NavWrapper>
  );
};

export default CreateInvoiceNavBar;

const NavWrapper = styled.nav`
  width: 36.625rem;
  height: 3rem;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  width: 100%;
  list-style: none;
  gap: 1rem;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .grey {
    color: var(--white-600, #bebebe);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5rem; /* 171.429% */
    cursor: pointer;
  }

  .blue {
    color: var(--blue-500, #3a62f2);
    border-bottom: 4px solid var(--blue-500, #3a62f2);
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.5rem; /* 171.429% */
  }

  .black {
    color: var(--black-800, #262626);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5rem; /* 171.429% */
  }

  p {
    display: flex;
    align-items: center;
  }

  svg {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    color: #262626;
  }

  .close-icon {
    cursor: pointer;
    svg {
      width: 1.5rem;
      height: 1.5rem;
      flex-shrink: 0;
      color: #de2929;
    }
  }
`;
