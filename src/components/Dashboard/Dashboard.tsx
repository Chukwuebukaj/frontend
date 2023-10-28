import { useEffect, useState } from "react";
import { cardData } from "./CardData";
import DashboardCard from "./DashboardCard";
import { styled } from "styled-components";
import funImg from "../../assets/havefun.png";
import Button from "../Reuseables/Button";
import { formatDate } from "../Date";
import axios from "axios";
import {
  InvoiceDocument,
  InvoiceStatus,
  configData,
} from "../Invoice/CardData";
const baseUrl = import.meta.env.VITE_BASE_URL as string;
const token = document.cookie.slice(7);

interface CountProps {
  total: number;
  pending: number;
  cleared: number;
  disputed: number;
}

interface DashBoardProps {
  currentDisplay: string;
  handleClickCreateInvoice: () => void;
}

const Dashboard: React.FC<DashBoardProps> = ({
  currentDisplay,
  handleClickCreateInvoice,
}) => {
  const [invoiceCount, setInvoiceCount] = useState<CountProps>({
    total: 0,
    pending: 0,
    cleared: 0,
    disputed: 0,
  });
  // Get the current date and time
  const currentDate = new Date();
  const formattedDateTime = formatDate(currentDate);

  const getUserInvoices = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/invoice/user-invoices`,
        configData(token)
      );
      if (response.status === 200) {
        const totalInvoices = response.data.requiredInvoices.length;
        const pendingInvoices = response.data.requiredInvoices?.filter(
          (invoice: InvoiceDocument) => invoice.status === InvoiceStatus.PENDING
        ).length;
        const clearedInvoices = response.data.requiredInvoices.filter(
          (invoice: InvoiceDocument) =>
            invoice.status === InvoiceStatus.COMPLETE
        ).length;
        const disputedInvoices = response.data.requiredInvoices.filter(
          (invoice: InvoiceDocument) =>
            invoice.status === InvoiceStatus.DISPUTED
        ).length;
        setInvoiceCount({
          total: totalInvoices,
          pending: pendingInvoices,
          cleared: clearedInvoices,
          disputed: disputedInvoices,
        });
      }
    } catch (error) {
      console.error(error);
      setInvoiceCount({ total: 0, pending: 0, cleared: 0, disputed: 0 });
    }
  };

  useEffect(() => {
    getUserInvoices();
  }, []);

  return (
    <>
      {currentDisplay === "Dashboard" && (
        <DashboardWrapper>
          <h3>Dashboard</h3>
          <DashboardTop>
            <CardsContainer>
              {cardData.map((data, index) => (
                <DashboardCard
                  key={index}
                  icon={data.icon}
                  count={Object.values(invoiceCount)[index]}
                  description={data.description}
                  bgColor={data.bgColor}
                ></DashboardCard>
              ))}
            </CardsContainer>
            <TopRight>
              <div className="top-details">
                <div className="deadline">
                  <span>Upcoming Deadline</span>
                  <span className="second-line">
                    No deadline today, have fun
                  </span>
                </div>
                <p className="date-time">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M19.5 3H17.25V2.25C17.25 2.05109 17.171 1.86032 17.0303 1.71967C16.8897 1.57902 16.6989 1.5 16.5 1.5C16.3011 1.5 16.1103 1.57902 15.9697 1.71967C15.829 1.86032 15.75 2.05109 15.75 2.25V3H8.25V2.25C8.25 2.05109 8.17098 1.86032 8.03033 1.71967C7.88968 1.57902 7.69891 1.5 7.5 1.5C7.30109 1.5 7.11032 1.57902 6.96967 1.71967C6.82902 1.86032 6.75 2.05109 6.75 2.25V3H4.5C4.10218 3 3.72064 3.15804 3.43934 3.43934C3.15804 3.72064 3 4.10218 3 4.5V19.5C3 19.8978 3.15804 20.2794 3.43934 20.5607C3.72064 20.842 4.10218 21 4.5 21H19.5C19.8978 21 20.2794 20.842 20.5607 20.5607C20.842 20.2794 21 19.8978 21 19.5V4.5C21 4.10218 20.842 3.72064 20.5607 3.43934C20.2794 3.15804 19.8978 3 19.5 3ZM6.75 4.5V5.25C6.75 5.44891 6.82902 5.63968 6.96967 5.78033C7.11032 5.92098 7.30109 6 7.5 6C7.69891 6 7.88968 5.92098 8.03033 5.78033C8.17098 5.63968 8.25 5.44891 8.25 5.25V4.5H15.75V5.25C15.75 5.44891 15.829 5.63968 15.9697 5.78033C16.1103 5.92098 16.3011 6 16.5 6C16.6989 6 16.8897 5.92098 17.0303 5.78033C17.171 5.63968 17.25 5.44891 17.25 5.25V4.5H19.5V7.5H4.5V4.5H6.75ZM19.5 19.5H4.5V9H19.5V19.5ZM10.5 11.25V17.25C10.5 17.4489 10.421 17.6397 10.2803 17.7803C10.1397 17.921 9.94891 18 9.75 18C9.55109 18 9.36032 17.921 9.21967 17.7803C9.07902 17.6397 9 17.4489 9 17.25V12.4631L8.58563 12.6713C8.4076 12.7603 8.2015 12.7749 8.01268 12.712C7.82385 12.649 7.66776 12.5137 7.57875 12.3356C7.48974 12.1576 7.47509 11.9515 7.53803 11.7627C7.60097 11.5739 7.73635 11.4178 7.91437 11.3287L9.41437 10.5787C9.52876 10.5215 9.65589 10.4945 9.78367 10.5002C9.91145 10.506 10.0356 10.5443 10.1444 10.6116C10.2532 10.6788 10.343 10.7728 10.4052 10.8845C10.4675 10.9963 10.5001 11.1221 10.5 11.25ZM16.0463 14.1047L14.25 16.5H15.75C15.9489 16.5 16.1397 16.579 16.2803 16.7197C16.421 16.8603 16.5 17.0511 16.5 17.25C16.5 17.4489 16.421 17.6397 16.2803 17.7803C16.1397 17.921 15.9489 18 15.75 18H12.75C12.6107 18 12.4742 17.9612 12.3557 17.888C12.2372 17.8148 12.1415 17.71 12.0792 17.5854C12.0169 17.4608 11.9905 17.3214 12.003 17.1826C12.0155 17.0439 12.0664 16.9114 12.15 16.8L14.8481 13.2028C14.9095 13.1211 14.9535 13.0277 14.9775 12.9284C15.0015 12.8291 15.0049 12.7259 14.9876 12.6252C14.9703 12.5245 14.9325 12.4284 14.8767 12.3428C14.8209 12.2572 14.7482 12.1839 14.6631 12.1274C14.5779 12.0709 14.4821 12.0324 14.3816 12.0143C14.281 11.9961 14.1778 11.9987 14.0783 12.0219C13.9788 12.0451 13.885 12.0884 13.8028 12.1491C13.7206 12.2098 13.6517 12.2867 13.6003 12.375C13.5525 12.463 13.4876 12.5406 13.4093 12.6031C13.3311 12.6656 13.2411 12.7118 13.1447 12.739C13.0483 12.7661 12.9474 12.7737 12.8481 12.7613C12.7487 12.7489 12.6528 12.7166 12.5661 12.6665C12.4794 12.6165 12.4035 12.5495 12.3431 12.4696C12.2827 12.3898 12.2389 12.2986 12.2142 12.2015C12.1896 12.1044 12.1847 12.0034 12.1997 11.9044C12.2148 11.8054 12.2495 11.7104 12.3019 11.625C12.5496 11.1963 12.9319 10.8612 13.3894 10.6718C13.8469 10.4824 14.3541 10.4493 14.8324 10.5774C15.3107 10.7056 15.7333 10.988 16.0348 11.3808C16.3363 11.7736 16.4998 12.2548 16.5 12.75C16.5016 13.2391 16.3421 13.7152 16.0463 14.1047Z"
                      fill="#5E5E5E"
                    />
                  </svg>
                  <span>{formattedDateTime}</span>
                </p>
              </div>
              <HaveFun></HaveFun>
            </TopRight>
          </DashboardTop>
          <DashboardBottom>
            <span className="recent">Recent Activities</span>
            <div className="last">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="81"
                viewBox="0 0 80 81"
                fill="none"
              >
                <path
                  d="M61.744 40.8312L45.6158 34.8937L39.6783 18.7531C39.3267 17.7979 38.6906 16.9735 37.8557 16.3912C37.0208 15.8089 36.0275 15.4967 35.0096 15.4967C33.9917 15.4967 32.9983 15.8089 32.1635 16.3912C31.3286 16.9735 30.6924 17.7979 30.3408 18.7531L24.3971 34.875L8.25645 40.8125C7.30123 41.1641 6.47685 41.8003 5.89454 42.6351C5.31222 43.47 5 44.4634 5 45.4813C5 46.4991 5.31222 47.4925 5.89454 48.3274C6.47685 49.1622 7.30123 49.7984 8.25645 50.15L24.3752 56.125L30.3127 72.2562C30.6643 73.2115 31.3005 74.0359 32.1353 74.6182C32.9702 75.2005 33.9636 75.5127 34.9815 75.5127C35.9993 75.5127 36.9927 75.2005 37.8276 74.6182C38.6624 74.0359 39.2986 73.2115 39.6502 72.2562L45.5877 56.1281L61.7283 50.1906C62.6836 49.839 63.5079 49.2029 64.0903 48.368C64.6726 47.5331 64.9848 46.5398 64.9848 45.5219C64.9848 44.504 64.6726 43.5106 64.0903 42.6758C63.5079 41.8409 62.6836 41.2047 61.7283 40.8531L61.744 40.8312ZM43.8721 51.4375C43.1965 51.6855 42.583 52.0775 42.0741 52.5864C41.5652 53.0952 41.1732 53.7088 40.9252 54.3844L34.9877 70.4656L29.0627 54.3719C28.8146 53.6999 28.4237 53.0896 27.9172 52.583C27.4106 52.0765 26.8004 51.6857 26.1283 51.4375L10.0471 45.5L26.1283 39.5625C26.8004 39.3143 27.4106 38.9235 27.9172 38.417C28.4237 37.9104 28.8146 37.3001 29.0627 36.6281L35.0002 20.5469L40.9377 36.6281C41.1857 37.3037 41.5777 37.9172 42.0866 38.4261C42.5955 38.935 43.209 39.327 43.8846 39.575L59.9658 45.5125L43.8721 51.4375ZM45.0002 13C45.0002 12.337 45.2636 11.7011 45.7324 11.2322C46.2013 10.7634 46.8372 10.5 47.5002 10.5H52.5002V5.5C52.5002 4.83696 52.7636 4.20107 53.2324 3.73223C53.7013 3.26339 54.3372 3 55.0002 3C55.6632 3 56.2991 3.26339 56.768 3.73223C57.2368 4.20107 57.5002 4.83696 57.5002 5.5V10.5H62.5002C63.1632 10.5 63.7991 10.7634 64.268 11.2322C64.7368 11.7011 65.0002 12.337 65.0002 13C65.0002 13.663 64.7368 14.2989 64.268 14.7678C63.7991 15.2366 63.1632 15.5 62.5002 15.5H57.5002V20.5C57.5002 21.163 57.2368 21.7989 56.768 22.2678C56.2991 22.7366 55.6632 23 55.0002 23C54.3372 23 53.7013 22.7366 53.2324 22.2678C52.7636 21.7989 52.5002 21.163 52.5002 20.5V15.5H47.5002C46.8372 15.5 46.2013 15.2366 45.7324 14.7678C45.2636 14.2989 45.0002 13.663 45.0002 13ZM77.5002 28C77.5002 28.663 77.2368 29.2989 76.768 29.7678C76.2991 30.2366 75.6632 30.5 75.0002 30.5H72.5002V33C72.5002 33.663 72.2368 34.2989 71.768 34.7678C71.2991 35.2366 70.6632 35.5 70.0002 35.5C69.3372 35.5 68.7013 35.2366 68.2324 34.7678C67.7636 34.2989 67.5002 33.663 67.5002 33V30.5H65.0002C64.3372 30.5 63.7013 30.2366 63.2324 29.7678C62.7636 29.2989 62.5002 28.663 62.5002 28C62.5002 27.337 62.7636 26.7011 63.2324 26.2322C63.7013 25.7634 64.3372 25.5 65.0002 25.5H67.5002V23C67.5002 22.337 67.7636 21.7011 68.2324 21.2322C68.7013 20.7634 69.3372 20.5 70.0002 20.5C70.6632 20.5 71.2991 20.7634 71.768 21.2322C72.2368 21.7011 72.5002 22.337 72.5002 23V25.5H75.0002C75.6632 25.5 76.2991 25.7634 76.768 26.2322C77.2368 26.7011 77.5002 27.337 77.5002 28Z"
                  fill="#3A62F2"
                />
              </svg>
              <span className="no-activities">No Activities yet</span>
              <span className="get-paid">
                Send invoice to your clients and get paid
              </span>
              <CreateInvoiceBtn
                children="Create Invoice"
                onClick={handleClickCreateInvoice}
              />
            </div>
          </DashboardBottom>
        </DashboardWrapper>
      )}
    </>
  );
};

export default Dashboard;

const DashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
  gap: 2rem;
  height: 100vh;
  overflow: auto;

  h3 {
    color: var(--blue-1000, #03050d);
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.5rem; /* 125% */
  }
`;
const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 24.125rem;
  gap: 2rem;
`;

const DashboardTop = styled.div`
  display: flex;
  gap: 2rem;
`;
const TopRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 40.5rem;
  height: 21.5rem;
  padding-bottom: 3rem;
  //   border:1px solid red;

  p {
    display: flex;
    align-items: center;
  }

  .deadline {
    display: flex;
    flex-direction: column;

    &:first-child {
      color: var(--black-900, #1a1a1a);
      font-size: 1.125rem;
      font-weight: 500;
      line-height: 2rem; /* 177.778% */
    }

    .second-line {
      color: var(--black-400, #5e5e5e);
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5rem; /* 171.429% */
    }
  }

  .date-time {
    display: flex;
    gap: 0.5rem;
  }

  .top-details {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

const HaveFun = styled.div`
  width: 11.6875rem;
  height: 11.6875rem;
  flex-shrink: 0;
  background: url("${funImg}") no-repeat center;
  background-size: 100% 100%;
  margin: auto auto 0 auto;
  align-self: flex-end;
`;

const DashboardBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .last {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 66.625rem;
    height: 20rem;
    gap: 2rem;
    flex-shrink: 0;
  }

  .recent {
    margin-right: auto;
    margin-bottom: -2rem;
    color: var(--black-800, #262626);
    text-align: center;
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 2rem; /* 177.778% */
  }
`;

export const CreateInvoiceBtn = styled(Button)`
  color: var(--blue-500, #3a62f2);
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  line-height: normal;
  display: flex;
  padding: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: var(--white-100, #fff);
  border: 1px solid #3a62f2;
  cursor: pointer;
`;
