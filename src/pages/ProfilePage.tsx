import { useState } from "react";
import DashboardNav from "../components/DashBoardNav/DashboardNav";
import Header from "../components/Header/Header";
import { styled } from "styled-components";
import Dashboard from "../components/Dashboard/Dashboard";
import InvoiceDisplay from "../components/Invoice/InvoiceDisplay";

interface NavProps {
  currentDisplay: string;
  color: string;
  bgColor: string;
}

const ProfilePage = () => {
  const [props, setProps] = useState<NavProps>({
    currentDisplay: "Dashboard",
    color: "#3A62F2",
    bgColor: "#F4F6FE",
  });
  const [createInvoiceClicked, setCreateInvoiceClicked] =
    useState<boolean>(false);

  const handleSetCurrentDisplay = (current: string) => {
    const newProps = {
      currentDisplay: current,
      color: "#3A62F2",
      bgColor: "#F4F6FE",
    };
    setProps(newProps);
  };

  const createInvoiceFromDashboard = () => {
    handleSetCurrentDisplay("Invoice");
    setCreateInvoiceClicked(true);
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
        <Header
          currentDisplay={props.currentDisplay}
          handleClickCreateInvoice={() => setCreateInvoiceClicked(true)}
        />
        <Dashboard
          currentDisplay={props.currentDisplay}
          handleClickCreateInvoice={createInvoiceFromDashboard}
        />
        <InvoiceDisplay
          currentDisplay={props.currentDisplay}
          clickCreateInvoice={createInvoiceClicked}
          handleClickCreateInvoice={() => setCreateInvoiceClicked(true)}
        />
      </DashboardRight>
    </ProfileWrapper>
  );
};

export default ProfilePage;

const ProfileWrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: auto;
`;
const DashboardRight = styled.div`
  display: flex;
  flex-direction: column;
`;
