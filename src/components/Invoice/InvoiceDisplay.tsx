import React, { Fragment, useEffect, useState } from "react";
import {
  invoiceData,
  cryptoTypes,
  fiatTypes,
  // daysOfTheWeek,
  defaultValues,
  invoiceIcon,
  invoiceTableHeaderData,
  symbol,
  InvoiceTableProps,
  configData,
  InvoiceDocument,
  changeDateFormat,
  InvoiceStatus,
} from "./CardData";
import DashboardCard from "../Dashboard/DashboardCard";
import { Select } from "../Reuseables/FormFields";
import Button from "../Reuseables/Button";
import {
  DisplayWrapper,
  DisplayTop,
  Cards,
  InvoiceMeter,
  MeterTop,
  ToggleBtns,
  MeterBottom,
  DisplayBottom,
  Controls,
  TableWrapper,
} from "./Invoice.Styled";
import { CreateInvoiceBtn } from "../Dashboard/Dashboard";
import CreateInvoiceTemplate from "./CreateInvoiceTemplate";
import Rows from "./Rows";
import { styled } from "styled-components";
import { Line } from "react-chartjs-2";
import { options, data } from "./Chart";
import axios from "axios";
import Modal from "./Modal";
import InvoiceTemplate from "./InvoiceTemplate";
const baseUrl = import.meta.env.VITE_BASE_URL as string;
const token = document.cookie.slice(7);

interface InvoiceProps {
  currentDisplay: string;
  clickCreateInvoice: boolean;
  handleClickCreateInvoice: () => void;
  handleClickListItem: (selected: string) => void;
}

export interface InvoiceCount {
  currentMonth: number;
  recurring: number;
}

const InvoiceDisplay: React.FC<InvoiceProps> = ({
  currentDisplay,
  clickCreateInvoice,
  handleClickCreateInvoice,
  handleClickListItem,
}) => {
  const [invoiceCount, setInvoiceCount] = useState<InvoiceCount>({
    currentMonth: 0,
    recurring: 0,
  });
  const [weeklyEarnings, setWeeklyEarnings] = useState<{
    fiat: number;
    crypto: number;
  }>({ fiat: 0, crypto: 0 });
  const [activeCurrency, setActiveCurrency] = useState<{
    fiat: string;
    crypto: string;
  }>({ fiat: "$", crypto: "ETH" });
  const [activeBtn, setActiveBtn] = useState<string>("btn1");
  const [tableContent, setTableContent] = useState<InvoiceTableProps[]>([]);
  const [allInvoices, setAllInvoices] = useState<InvoiceDocument[]>([]);
  const [invoiceInView, setInvoiceInView] = useState<InvoiceDocument>({
    invoiceAddress: "",
    clientName: "",
    clientEmail: "",
    startDate: "",
    endDate: "",
    duration: "",
    paymentType: "",
    currency: "",
    services: [],
    amount: 0,
    bankName: "",
    accountNumber: 0,
    installment: 0,
    initialDepositPercentage: "",
    initialDeposit: 0,
    taxPercentage: "",
    tax: 0,
    discountPercentage: "",
    discount: 0,
    termsAndConditions: [],
    accepted: false,
    status: InvoiceStatus.PENDING,
    createdAt: "",
    updatedAt: "",
  });
  const [showInvoice, setShowInvoice] = useState<boolean>(false);

  const handleSelectCurrency = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    if (activeBtn === "btn2") {
      setActiveCurrency((prevCurrency) => ({ ...prevCurrency, crypto: value }));
    } else {
      const relevantSymbol = symbol.filter(
        (item) => item.currency === value
      )[0];
      setActiveCurrency((prevCurrency) => ({
        ...prevCurrency,
        fiat: relevantSymbol.symbol,
      }));
    }
  };

  const getUserInvoices = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/invoice/user-invoices`,
        configData(token)
      );
      console.log(response);
      if (response.status === 200) {
        setAllInvoices(response.data.requiredInvoices);
        const restructuredArray: InvoiceTableProps[] =
          response.data.requiredInvoices.map((data: InvoiceDocument) => ({
            "Invoice address": data.invoiceAddress,
            Customer: data.clientName,
            Duration: data.duration,
            "Start date": changeDateFormat(data.startDate),
            "End date": changeDateFormat(data.endDate),
            Status: data.status,
            Payment: data.paymentType,
            Amount: `${
              data.paymentType === "Fiat"
                ? (symbol?.find((item) => item.currency === data.currency)
                    ?.symbol || "") + data.amount
                : `${data.amount} ${data.currency}`
            }`,
          }));
        setTableContent(restructuredArray);
        const currentMonth = new Date().getMonth() + 1;
        const augustInvoices = response.data.requiredInvoices.filter(
          (invoice: InvoiceDocument) =>
            invoice.createdAt &&
            new Date(invoice.createdAt).getMonth() + 1 === currentMonth
        );
        setInvoiceCount({
          currentMonth: augustInvoices.length,
          recurring: response.data.requiredInvoices.filter(
            (item: InvoiceDocument) =>
              item.createdAt &&
              new Date(item.createdAt).getMonth() + 1 !== currentMonth &&
              item.status !== InvoiceStatus.COMPLETE
          ).length,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowInvoice = (address: string) => {
    setShowInvoice(true);
    setInvoiceInView(
      allInvoices.filter(
        (invoice: InvoiceDocument) => invoice.invoiceAddress === address
      )[0]
    );
  };

  const currentSymbol = () => {
    return invoiceInView.paymentType === "Crypto"
      ? invoiceInView.currency
      : symbol?.filter((item) => item.currency === invoiceInView.currency)?.[0]
          ?.symbol;
  };

  useEffect(() => {
    setWeeklyEarnings({ fiat: 0, crypto: 0 });
    getUserInvoices();
  }, [activeBtn]);
  return (
    <>
      {currentDisplay === "Invoice" && (
        <DisplayWrapper>
          <h2>Invoice</h2>
          {!clickCreateInvoice && (
            <>
              <DisplayTop>
                <Cards>
                  {invoiceData.map((data, index) => (
                    <DashboardCard
                      key={index}
                      icon={data.icon}
                      description={data.description}
                      bgColor={data.bgColor}
                      count={Object.values(invoiceCount)[index]}
                    />
                  ))}
                </Cards>
                <InvoiceMeter>
                  <MeterTop>
                    <div className="payments-received">
                      <span className="first">Payments Received</span>
                      <p className="second">
                        You earned a total of{" "}
                        <span style={{ color: "#3A62F2" }}>
                          {activeBtn === "btn1"
                            ? `${activeCurrency.fiat}${weeklyEarnings.fiat}`
                            : `${weeklyEarnings.crypto} ${activeCurrency.crypto}`}{" "}
                        </span>
                        this week
                      </p>
                    </div>
                    <div className="select-type">
                      <ToggleBtns>
                        <Button
                          children="Fiat"
                          className={activeBtn === "btn1" ? "active" : ""}
                          onClick={() => setActiveBtn("btn1")}
                        />
                        <Button
                          children="Crypto"
                          className={activeBtn === "btn2" ? "active" : ""}
                          onClick={() => setActiveBtn("btn2")}
                        />
                      </ToggleBtns>
                      <Select
                        options={
                          activeBtn === "btn1"
                            ? fiatTypes.slice(1)
                            : cryptoTypes.slice(1)
                        }
                        defaultValue={
                          activeBtn === "btn1" ? fiatTypes[0] : cryptoTypes[0]
                        }
                        className="currency-select"
                        onChange={handleSelectCurrency}
                      />
                      <Select
                        className="select-period"
                        defaultValue="This Week"
                      />
                    </div>
                  </MeterTop>
                  <MeterBottom>
                    <InvoiceChart
                      options={options}
                      data={data}
                      width={100}
                      height={50}
                    />
                  </MeterBottom>
                </InvoiceMeter>
              </DisplayTop>
              <DisplayBottom>
                <Controls>
                  <p>All Invoice</p>
                  <div className="all-select">
                    {defaultValues.map((value, index) => (
                      <Fragment key={index}>
                        {value.icon}
                        <Select defaultValue={value.value} />
                      </Fragment>
                    ))}
                  </div>
                </Controls>
                <TableWrapper>
                  {tableContent.length > 0 ? (
                    <>
                      <TableHead>
                        <span></span>
                        {invoiceTableHeaderData.map((item, index) => (
                          <span key={index}>{item}</span>
                        ))}
                      </TableHead>
                      {tableContent.map((content, index) => (
                        <Rows
                          handleShowInvoice={(address) =>
                            handleShowInvoice(address)
                          }
                          key={index}
                          {...content}
                        />
                      ))}
                    </>
                  ) : (
                    <div className="empty-table-state">
                      {invoiceIcon}
                      <p>No Invoice yet</p>
                      <span>Send invoice to your clients and get paid</span>
                      <CreateInvoiceBtn
                        children="Create Invoice"
                        onClick={handleClickCreateInvoice}
                      />
                    </div>
                  )}
                </TableWrapper>
              </DisplayBottom>
            </>
          )}
          {clickCreateInvoice && (
            <CreateInvoiceTemplate
              handleClickListItem={(selected) => handleClickListItem(selected)}
            />
          )}
          {showInvoice && (
            <Modal
              children={
                <InvoiceTemplate
                  clientName={invoiceInView.clientName}
                  clientEmail={invoiceInView.clientEmail}
                  invoiceAddress={invoiceInView.invoiceAddress}
                  currencyType={invoiceInView.paymentType}
                  denomination={invoiceInView.currency}
                  duration={invoiceInView.duration}
                  services={invoiceInView.services.map((service) => ({
                    service: {
                      title: service.title,
                      description: service.description,
                    },
                    quantity: String(service.quantity),
                    rate:
                      invoiceInView.paymentType === "Crypto"
                        ? `${service.rate}${invoiceInView.currency}`
                        : `${currentSymbol()}${service.rate}`,
                    amount:
                      invoiceInView.paymentType === "Crypto"
                        ? `${Number(service.quantity) * Number(service.rate)}${
                            invoiceInView.currency
                          }`
                        : `${currentSymbol()}${
                            Number(service.quantity) * Number(service.rate)
                          }`,
                  }))}
                  installments={String(invoiceInView.installment)}
                  initialDepositpercentage={
                    invoiceInView.initialDepositPercentage
                  }
                  initialDeposit={
                    invoiceInView.paymentType === "Crypto"
                      ? `${invoiceInView.initialDeposit}${invoiceInView.currency}`
                      : `${currentSymbol()}${invoiceInView.initialDeposit}`
                  }
                  subtotal={
                    invoiceInView.paymentType === "Crypto"
                      ? `${
                          Number(invoiceInView.amount) +
                          Number(invoiceInView.discount) -
                          Number(invoiceInView.tax)
                        }${invoiceInView.currency}`
                      : `${currentSymbol()}${
                          Number(invoiceInView.amount) +
                          Number(invoiceInView.discount) -
                          Number(invoiceInView.tax)
                        }`
                  }
                  percentageDiscount={invoiceInView.discountPercentage}
                  discount={
                    invoiceInView.paymentType === "Crypto"
                      ? `${invoiceInView.discount}${invoiceInView.currency}`
                      : `${currentSymbol()}${invoiceInView.discount}`
                  }
                  percentageTax={invoiceInView.taxPercentage}
                  tax={
                    invoiceInView.paymentType === "Crypto"
                      ? `${invoiceInView.tax}${invoiceInView.currency}`
                      : `${currentSymbol()}${invoiceInView.tax}`
                  }
                  total={
                    invoiceInView.paymentType === "Crypto"
                      ? `${invoiceInView.amount}${invoiceInView.currency}`
                      : `${currentSymbol()}${invoiceInView.amount}`
                  }
                  clickView={true}
                  handleCloseModal={() => setShowInvoice(false)}
                />
              }
            />
          )}
        </DisplayWrapper>
      )}
    </>
  );
};

export default InvoiceDisplay;

const TableHead = styled.div`
  display: flex;
  width: 66.625rem;
  padding: 0.75rem 1.25rem;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  background: var(--white-200, #f7f7f7);

  span {
    text-align: center;
    width: 7rem;
    color: var(--black-400, #5e5e5e);
    font-size: 0.75rem;
    font-weight: 700;
    line-height: normal;
    // border: 1px solid red;
  }
`;

const InvoiceChart = styled(Line)`
  // border: 1px solid red;
  // width: 50rem;
  // height:20rem;
`;
