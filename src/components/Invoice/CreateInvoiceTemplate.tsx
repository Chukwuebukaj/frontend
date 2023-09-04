import { useState } from "react";
import CreateInvoiceNavBar from "./CreateInvoiceNavBar";
import InvoiceTemplate, { Service } from "./InvoiceTemplate";
import Details, { ClientDetailsProps, ServiceDetailsProps } from "./Details";
import { styled } from "styled-components";
import Payment, { PaymentInputProps } from "./Payment";
import Terms from "./Terms";
import Summary from "./Summary";
import {
  InvoiceDocument,
  InvoiceService,
  InvoiceStatus,
  configData,
  convertServiceDetailsToService,
  symbol,
  fiatTypes,
  cryptoTypes,
} from "./CardData";
import { useAccount } from "wagmi";
import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_URL as string;
const token = document.cookie.slice(7);

interface TemplateProps {
  handleClickListItem: (selected: string) => void;
}

const CreateInvoiceTemplate: React.FC<TemplateProps> = ({
  handleClickListItem,
}) => {
  const { address } = useAccount();
  const [currentForm, setCurrentForm] = useState<string>("Details");
  const [services, setServices] = useState<ServiceDetailsProps[]>([]);
  const [tableServices, setTableServices] = useState<Service[]>([]);
  const [clickAddService, setClickAddService] = useState<boolean>(false);
  const [activeBtn, setActiveBtn] = useState<string>("btn1");
  const [activeCurrency, setActiveCurrency] = useState<string>("Fiat");
  const [denomination, setDenomination] = useState<string>("USD");
  const [clickUpdateBtn, setClickUpdateBtn] = useState<boolean>(false);
  const [clickDeleteBtn, setClickDeleteBtn] = useState<boolean>(false);
  const [clickClearServices, setClickClearServices] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [terms, setTerms] = useState<string>("");
  const [accepted, setAccepted] = useState<boolean>(false);
  const [clientDetails, setClientDetails] = useState<ClientDetailsProps>({
    "Client Name": "",
    "Client Email": "",
    "Start Date": "",
    "End Date": "",
  });
  const [servicedetails, setServicedetails] = useState<ServiceDetailsProps>({
    "Service Title": "",
    "Service Description": "",
    Qty: 0,
    Rate: 0,
  });
  const [paymentDetails, setPaymentDetails] = useState<PaymentInputProps>({
    "Bank Name": "",
    "Account Number": 0,
    Installment: 0,
    "Initial Deposit %": 0,
    "Tax %": 0,
    "Discount %": 0,
  });

  const currentSymbol = symbol.find(
    (item) => item.currency === denomination
  )?.symbol;

  const displayForm = (current: string) => {
    setCurrentForm(current);
  };

  const handleClientDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setClientDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSelectCurrency = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setDenomination(value);
  };

  const handleBtn1 = () => {
    setActiveBtn("btn1");
    setActiveCurrency("Fiat");
    setDenomination(fiatTypes[cryptoTypes.indexOf(denomination)]);
  };

  const handleBtn2 = () => {
    setActiveBtn("btn2");
    setActiveCurrency("Crypto");
    setDenomination(cryptoTypes[fiatTypes.indexOf(denomination)]);
  };

  const handleServiceInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.stopPropagation();
    const { name, value } = event.target;
    setServicedetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddService = () => {
    if (
      Object.values(servicedetails).includes("") ||
      Object.values(servicedetails).includes(0)
    ) {
      return;
    }
    const tableService: Service = {
      service: {
        title: servicedetails["Service Title"],
        description: servicedetails["Service Description"],
      },
      quantity: servicedetails.Qty.toString(),
      rate:
        activeCurrency === "Fiat"
          ? currentSymbol + servicedetails.Rate.toString()
          : servicedetails.Rate.toString() + denomination,
      amount:
        activeCurrency === "Fiat"
          ? currentSymbol + String(servicedetails.Qty * servicedetails.Rate)
          : String(servicedetails.Qty * servicedetails.Rate) + denomination,
    };
    if (clickUpdateBtn) {
      services[currentIndex] = servicedetails;
      tableServices[currentIndex] = tableService;
      setServices(services);
      setTableServices(tableServices);
    } else {
      setServices((prevServices) => [...prevServices, servicedetails]);
      setTableServices((prevServices) => [...prevServices, tableService]);
    }
    handleCloseModal();
  };

  const handleClearServices = () => {
    setServices([]);
    setTableServices([]);
  };

  const handleSubmitForm = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleAddService();
    }
  };

  const handleDeleteWithEnter = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Enter") {
      handleDeleteService();
    }
  };

  const getDuration = () => {
    const startDate = new Date(clientDetails["Start Date"]).getTime();
    const endDate = new Date(clientDetails["End Date"]).getTime();
    return (endDate - startDate) / (60 * 60 * 24 * 1000);
  };

  const handleUpdate = (index: number) => {
    setClickUpdateBtn(true);
    setCurrentIndex(index);
    setServicedetails(services[index]);
  };

  const handleDelete = (index: number) => {
    setClickDeleteBtn(true);
    setCurrentIndex(index);
  };

  const handleDeleteService = () => {
    if (clickClearServices) {
      handleClearServices();
      handleCloseModal();
    }
    setServices((prevServices) =>
      prevServices?.filter((service) => service !== prevServices[currentIndex])
    );
    setTableServices((prevTableServices) =>
      prevTableServices.filter(
        (service) => service !== prevTableServices[currentIndex]
      )
    );
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setClickAddService(false);
    setClickDeleteBtn(false);
    setClickUpdateBtn(false);
    setClickClearServices(false);
    setServicedetails({
      "Service Title": "",
      "Service Description": "",
      Qty: 0,
      Rate: 0,
    });
  };

  const handlePaymentDetailsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setPaymentDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const getInitialDeposit = () => {
    const amount = services
      .map((service) => Number(service.Qty) * Number(service.Rate))
      .reduce((a, b) => a + b, 0);
    const initialDeposit =
      (Number(amount) * Number(paymentDetails["Initial Deposit %"])) / 100;
    return String(initialDeposit);
  };

  const getSubTotal = () => {
    const amount = services
      .map((service) => Number(service.Qty) * Number(service.Rate))
      .reduce((a, b) => a + b, 0);
    return String(amount);
  };

  const getDiscount = () => {
    const amount = services
      .map((service) => Number(service.Qty) * Number(service.Rate))
      .reduce((a, b) => a + b, 0);
    const discount = (amount * Number(paymentDetails["Discount %"])) / 100;
    return String(discount);
  };

  const getTax = () => {
    const amount = services
      .map((service) => Number(service.Qty) * Number(service.Rate))
      .reduce((a, b) => a + b, 0);
    const tax = (amount * Number(paymentDetails["Tax %"])) / 100;
    return String(tax);
  };

  const handleTermsInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setTerms(value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setAccepted(checked);
  };

  const servicesToBeSent: InvoiceService[] = services.map((service) =>
    convertServiceDetailsToService(service)
  );

  const invoiceData: InvoiceDocument = {
    invoiceAddress: String(address),
    amount: Number(getSubTotal()) - Number(getDiscount()) + Number(getTax()),
    currency: denomination,
    paymentType: activeCurrency,
    status: InvoiceStatus.PENDING,
    clientName: clientDetails["Client Name"],
    clientEmail: clientDetails["Client Email"],
    services: servicesToBeSent,
    startDate: clientDetails["Start Date"],
    endDate: clientDetails["End Date"],
    duration: `${getDuration()}days`,
    installment: paymentDetails.Installment,
    initialDeposit: Number(getInitialDeposit()),
    discount: Number(getDiscount()),
    termsAndConditions: terms.split("\n"),
    bankName: paymentDetails["Bank Name"],
    accountNumber: paymentDetails["Account Number"],
    initialDepositPercentage: `${paymentDetails["Initial Deposit %"]}%`,
    taxPercentage: `${paymentDetails["Tax %"]}%`,
    tax: Number(getTax()),
    discountPercentage: `${paymentDetails["Discount %"]}%`,
    accepted: accepted,
  };

  console.log(invoiceData);

  const handleSubmitInvoice = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/invoice/create`,
        invoiceData,
        configData(token)
      );
      if (response.status === 201) {
        console.log("Form Submitted successfully", response);
        toast.success(response.data.message);
        // handleClickListItem("Create Invoice");
        location.reload();
      }
    } catch (error: any) {
      console.error(error);
      error?.response?.data
        ? toast.error(error?.response?.data)
        : error?.message
        ? toast.error(error?.message)
        : toast.error("An error occurred");
      // handleClickListItem("Create Invoice");
    }
  };

  return (
    <TemplateWrapper>
      <CreateInvoiceNavBar
        handleClickListItem={(selected) => handleClickListItem(selected)}
        handleShowForm={(currentForm) => displayForm(currentForm)}
        currentForm={currentForm}
      />
      <CreateInvoiceBody>
        <CreateInvoiceForm onSubmit={handleSubmitInvoice}>
          {currentForm === "Details" && (
            <Details
              services={services}
              handleAddService={handleAddService}
              clickAddService={clickAddService}
              activeBtn={activeBtn}
              handleSelectCurrency={handleSelectCurrency}
              handleBtn1={handleBtn1}
              handleBtn2={handleBtn2}
              clientDetails={clientDetails}
              handleClientDetailsChange={handleClientDetailsChange}
              updateBtnClicked={clickUpdateBtn}
              deleteBtnClicked={clickDeleteBtn}
              handleClickUpdate={(index) => handleUpdate(index)}
              handleClickDelete={(index) => handleDelete(index)}
              serviceDetails={servicedetails}
              handleDeleteService={handleDeleteService}
              handleOpenModal={() => setClickAddService(true)}
              handleToggleModal={handleCloseModal}
              handleServiceInputChange={handleServiceInputChange}
              handleSubmitForm={handleSubmitForm}
              handleClickNext={() => setCurrentForm("Payment")}
              handleDeleteWithEnter={handleDeleteWithEnter}
              handleClickClearServices={() => setClickClearServices(true)}
              clearServicesBtnClicked={clickClearServices}
            />
          )}
          {currentForm === "Payment" && (
            <Payment
              paymentDetails={paymentDetails}
              handlePaymentDetailsChange={handlePaymentDetailsChange}
              goToNext={() => setCurrentForm("Terms")}
              goToPrev={() => setCurrentForm("Details")}
            />
          )}
          {currentForm === "Terms" && (
            <Terms
              goToNext={() => setCurrentForm("Summary")}
              goToPrev={() => setCurrentForm("Payment")}
              handleTermsInputChange={handleTermsInputChange}
              terms={terms}
            />
          )}
          {currentForm === "Summary" && (
            <Summary
              checked={accepted}
              goToPrev={() => setCurrentForm("Terms")}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
        </CreateInvoiceForm>
        <InvoiceTemplate
          clientName={clientDetails["Client Name"]}
          clientEmail={clientDetails["Client Email"]}
          invoiceAddress={""}
          currencyType={activeCurrency}
          denomination={denomination}
          duration={getDuration() ? getDuration().toString() : "0"}
          services={[...tableServices]}
          installments={paymentDetails.Installment.toString()}
          initialDepositpercentage={paymentDetails[
            "Initial Deposit %"
          ].toString()}
          initialDeposit={
            activeBtn === "btn1" && currentSymbol
              ? currentSymbol + getInitialDeposit()
              : `${getInitialDeposit()} ${denomination}`
          }
          subtotal={`${
            activeBtn === "btn1" && currentSymbol
              ? currentSymbol + getSubTotal()
              : `${getSubTotal()} ${denomination}`
          }`}
          percentageDiscount={paymentDetails["Discount %"].toString()}
          discount={
            activeBtn === "btn1" && currentSymbol
              ? currentSymbol + getDiscount()
              : `${getDiscount()} ${denomination}`
          }
          percentageTax={paymentDetails["Tax %"].toString()}
          tax={
            activeBtn === "btn1" && currentSymbol
              ? currentSymbol + getTax()
              : `${getTax()} ${denomination}`
          }
          total={`${
            activeBtn === "btn1" && currentSymbol
              ? currentSymbol +
                String(
                  Number(getSubTotal()) -
                    Number(getDiscount()) +
                    Number(getTax())
                )
              : `${
                  Number(getSubTotal()) -
                  Number(getDiscount()) +
                  Number(getTax())
                } ${denomination}`
          }`}
          clickView={false}
        />
      </CreateInvoiceBody>
    </TemplateWrapper>
  );
};

export default CreateInvoiceTemplate;

const TemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreateInvoiceBody = styled.div`
  display: flex;
`;

const CreateInvoiceForm = styled.form`
  display: flex;
  width: 27rem;
  padding: 1.25rem;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid var(--white-200, #f7f7f7);
  background: var(--white-100, #fff);
`;
