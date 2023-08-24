import React, { Fragment, useEffect, useState } from "react";
import {
  invoiceData,
  cryptoTypes,
  fiatTypes,
  daysOfTheWeek,
  defaultValues,
  inviceIcon,
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

interface InvoiceProps {
  currentDisplay: string;
  clickCreateInvoice: boolean;
  handleClickCreateInvoice: () => void;
}

interface InvoiceCount {
  currentMonth: number;
  recurring: number;
}

const InvoiceDisplay: React.FC<InvoiceProps> = ({
  currentDisplay,
  clickCreateInvoice,
  handleClickCreateInvoice,
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
  const symbol: { currency: string; symbol: string }[] = [
    {
      currency: "USD",
      symbol: "$",
    },
    {
      currency: "EUR",
      symbol: "€",
    },
    {
      currency: "NGN",
      symbol: "₦",
    },
    {
      currency: "GBP",
      symbol: "£",
    },
    {
      currency: "AUD",
      symbol: "$",
    },
    {
      currency: "JPY",
      symbol: "¥",
    },
  ];

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

  useEffect(() => {
    setInvoiceCount({ currentMonth: 0, recurring: 0 });
    setWeeklyEarnings({ fiat: 0, crypto: 0 });
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
                    <div className="tracker">
                      <span>$0</span>
                      <div className="tracker-right">
                        <div className="line"></div>
                      </div>
                    </div>
                    <div className="days">
                      {daysOfTheWeek.map((day, index) => (
                        <span key={index}>{day}</span>
                      ))}
                    </div>
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
                  <div className="empty-table-state">
                    {inviceIcon}
                    <p>No Invoice yet</p>
                    <span>Send invoice to your clients and get paid</span>
                    <CreateInvoiceBtn
                      children="Create Invoice"
                      onClick={handleClickCreateInvoice}
                    />
                  </div>
                </TableWrapper>
              </DisplayBottom>
            </>
          )}
        </DisplayWrapper>
      )}
    </>
  );
};

export default InvoiceDisplay;
