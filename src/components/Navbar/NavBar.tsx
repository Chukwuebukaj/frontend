import styled from "styled-components";
import Logo from "../Logo/Logo";
import { navList } from "./NavBarData";
import { Web3Button } from "@web3modal/react";
const NavBar = () => {
  return (
    <NavWrapper>
      <Logo />
      <NavList>
        {navList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </NavList>
      <Web3Button />
    </NavWrapper>
  );
};

export default NavBar;

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 5rem;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
`;
