import { styled } from "styled-components";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <LogoWrapper to="/">
      <img src={logo} alt="pavoce logo" />
      <span>Pavoce</span>
    </LogoWrapper>
  );
};

export default Logo;

const LogoWrapper = styled(Link)`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #050d2a;
`;
