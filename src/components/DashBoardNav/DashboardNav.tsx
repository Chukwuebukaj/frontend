import { styled } from "styled-components";
import Logo from "../Logo/Logo";
import Button from "../Reuseables/Button";
import { navBarData } from "./NavData";

interface DashboardNavProps {
  currentDisplay: string;
  color: string;
  bgColor: string;
  handleSetCurrentDisplay: (currentDisplay: string) => void;
}

interface BtnColorProp {
  color: string;
  bgColor: string;
}

const DashboardNav: React.FC<DashboardNavProps> = ({
  currentDisplay,
  color,
  bgColor,
  handleSetCurrentDisplay,
}) => {
  return (
    <NavWrapper>
      <Logo />
      <NavList>
        {navBarData.map((data, index) => (
          <li key={index}>
            <NavBtn
              color={currentDisplay === data.text ? color : ""}
              bgColor={currentDisplay === data.text ? bgColor : "transparent"}
              onClick={() => handleSetCurrentDisplay(data.text)}
            >
              {data.icon}
              {data.text}
            </NavBtn>
          </li>
        ))}
      </NavList>
    </NavWrapper>
  );
};

export default DashboardNav;

const NavWrapper = styled.nav`
  display: flex;
  width: 16.375rem;
  height: 100vh;
  padding: 4rem 0 0 4rem;
  flex-direction: column;
  gap: 5rem;
  flex-shrink: 0;
  background: var(--white-200, #f7f7f7);
`;

const NavList = styled.ul`
  width: 10.375rem;
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 1.25rem;
`;

const NavBtn = styled(Button)<BtnColorProp>`
  display: flex;
  width: 100%;
  padding: 0.75rem 0;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #f7f7f7;
  background: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  cursor: pointer;

  svg {
    stroke: ${({ color }) => color};
  }
`;
