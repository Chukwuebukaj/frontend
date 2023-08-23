import { useState } from "react";
import DashboardNav from "../components/DashBoardNav/DashboardNav";
import Header from "../components/Header/Header";
import { styled } from "styled-components";
import { useLocation } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";

interface NavProps {
  currentDisplay: string;
  color: string;
  bgColor: string;
}

const DashboardPage = () => {
  const location = useLocation();
  console.log(location);

  const [props, setProps] = useState<NavProps>({
    currentDisplay: "Dashboard",
    color: "#3A62F2",
    bgColor: "#F4F6FE",
  });

  const handleSetCurrentDisplay = (current: string) => {
    const newProps = {
      currentDisplay: current,
      color: "#3A62F2",
      bgColor: "#F4F6FE",
    };
    setProps(newProps);
  };

  return (
    <ProfileWrapper>
      <DashboardNav
        currentDisplay={props.currentDisplay}
        color={props.color}
        handleSetCurrentDisplay={(current) => handleSetCurrentDisplay(current)}
        bgColor={props.bgColor}
      />
      <DashboardRight>
        <Header currentDisplay={props.currentDisplay} />
        <Dashboard currentDisplay={props.currentDisplay} />
      </DashboardRight>
    </ProfileWrapper>
  );
};

export default DashboardPage;

const ProfileWrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: auto;
`;
const DashboardRight = styled.div`
  display: flex;
  flex-direction: column;
`;
