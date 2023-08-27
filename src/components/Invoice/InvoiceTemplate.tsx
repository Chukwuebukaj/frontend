import React from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../../assets/react.svg";
import { useAccount } from "wagmi";
import ServiceCard from "./ServiceCard";

interface LogoProps {
  $bgImg: string;
}

export interface ServiceDetails {
  title: string;
  description: string;
}

export interface Service {
  service: ServiceDetails;
  quantity: string;
  rate: string;
  amount: string;
}
export interface InvoiceTemplateProps {
  clientName: string;
  clientEmail: string;
  invoiceAddress: string;
  currencyType: string;
  denomination: string;
  duration: string;
  services: Service[];
  installments: string;
  initialDepositpercentage: string;
  initialDeposit: string;
  subtotal: string;
  percentageDiscount: string;
  discount: string;
  percentageTax: string;
  tax: string;
  total: string;
}

const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({
  clientEmail,
  clientName,
  invoiceAddress,
  currencyType,
  denomination,
  duration,
  services,
  installments,
  initialDepositpercentage,
  initialDeposit,
  subtotal,
  percentageDiscount,
  discount,
  percentageTax,
  tax,
  total,
}) => {
  const location = useLocation();
  const { address } = useAccount();

  return (
    <TemplateWrapper>
      <Top>
        <NameAndEmail>
          <p className="business-name">
            {location.state?.businessName || "Business name goes here"}
          </p>
          <p className="email">{location.state?.email || "Email goes here"}</p>
        </NameAndEmail>
        <Logo $bgImg={location.state?.businessLogo || logo}></Logo>
      </Top>
      <BillTo>
        <BillToLeft>
          <h4>BILL TO</h4>
          <span>{clientName}</span>
          <span>{clientEmail}</span>
        </BillToLeft>
        <BillToRight>
          <p>Invoice address</p>
          <span className="denomination">{invoiceAddress || address}</span>
          <span>Currency: {currencyType}</span>
          <span className="denomination">{denomination}</span>
          <span>
            Duration:{" "}
            {`${duration ? duration : 0}day${Number(duration) > 1 ? "s" : ""}`}
          </span>
        </BillToRight>
      </BillTo>
      <ServiceTable>
        <Head>
          <span>Service</span>
          <div className="others">
            <span>Qty</span>
            <span>Rate</span>
            <span>Amount</span>
          </div>
        </Head>
        {services?.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.service.title}
            description={service.service.description}
            quantity={service.quantity}
            rate={service.rate}
            amount={service.amount}
          />
        ))}
      </ServiceTable>
      <InvoiceBottom>
        <BottomLeft>
          <span>Payment:{installments} Installments</span>
          <span>
            Initial Deposit {initialDepositpercentage}%: {initialDeposit}
          </span>
        </BottomLeft>
        <BottomRight>
          <span>Sub total: {subtotal}</span>
          <span>
            Discount {percentageDiscount}%: {discount}
          </span>
          <span>
            Tax {percentageTax}%: {tax}
          </span>
          <span className="total">Total: {total}</span>
        </BottomRight>
      </InvoiceBottom>
      <TermsAndConditions>
        <span className="terms">Terms & Conditions</span>
        <span>
          <a
            href="https://www.pavoce.speke/conditions"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.pavoce.speke/conditions
          </a>
        </span>
      </TermsAndConditions>
    </TemplateWrapper>
  );
};

export default InvoiceTemplate;

const TemplateWrapper = styled.div`
  display: flex;
  width: 35.125rem;
  min-height: 44.1875rem;
  padding: 1.25rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.5rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 0.5px solid var(--black-100, #b8b8b8);
  background: var(--white-100, #fff);
  margin-left: auto;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div<LogoProps>`
  background: ${({ $bgImg }) => `url('${$bgImg}') no-repeat center`};
  background-size: 100% 100%;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

const NameAndEmail = styled.div`
  display: flex;
  flex-direction: column;

  .business-name {
    color: var(--black-700, #303030);
    font-size: 1rem;
    font-weight: 700;
    line-height: normal;
  }

  .email {
    color: var(--black-700, #303030);
    font-size: 0.75rem;
    font-weight: 500;
    line-height: normal;
  }
`;

const BillTo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const BillToLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;

  span {
    color: var(--black-800, #262626);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5rem; /* 171.429% */
  }
`;
const BillToRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  overflow: hidden;
  gap: 0.5rem;
  color: var(--black-800, #262626);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem; /* 171.429% */

  .denomination {
    color: var(--black-200, #8f8f8f);
    font-size: 0.75rem;
    font-weight: 700;
    line-height: normal;
  }
`;

const ServiceTable = styled.div`
  display: flex;
  padding-bottom: 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--white-200, #f7f7f7);
  width: 32.6875rem;
  min-height: 15.6875rem;
`;

const Head = styled.div`
  display: flex;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: var(--white-200, #f7f7f7);
  justify-content: space-between;
  width: 100%;
  align-items: center;
  color: var(--black-400, #5e5e5e);
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  .others {
    display: flex;
    align-items: center;
    gap: 2.625rem;
  }
`;

const InvoiceBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const BottomLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  color: var(--black-800, #262626);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem; /* 171.429% */
`;
const BottomRight = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  text-align: right;
  color: var(--black-500, #4d4d4d);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem; /* 171.429% */

  .total {
    color: var(--black-800, #262626);
    text-align: right;
    font-size: 1rem;
    font-weight: 700;
    line-height: normal;
    border-top: 1px solid #262626;
    border-bottom: 1px solid #262626;
    width: fit-content;
    margin-left: auto;
  }
`;
const TermsAndConditions = styled.div`
  display: flex;
  flex-direction: column;

  .terms {
    color: var(--black-800, #262626);
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 1.5rem; /* 171.429% */
  }

  a {
    color: var(--blue-500, #3a62f2);
    text-align: center;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;
  }
`;
