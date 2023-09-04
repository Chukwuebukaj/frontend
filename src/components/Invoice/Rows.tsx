import { styled } from "styled-components";
import { InvoiceStatus, InvoiceTableProps } from "./CardData";

interface RowProps {
  handleShowInvoice: (address: string) => void;
}

const Rows: React.FC<InvoiceTableProps & RowProps> = ({
  "Invoice address": InvoiceAddress,
  Customer,
  Duration,
  "Start date": StartDate,
  "End date": EndDate,
  Status,
  Payment,
  Amount,
  handleShowInvoice,
}) => {
  return (
    <RowWrapper>
      <span
        className="method"
        onClick={() => handleShowInvoice(InvoiceAddress)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
        >
          <path
            d="M10.5153 3.85969L7.89031 1.23469C7.85546 1.19987 7.81409 1.17227 7.76857 1.15345C7.72305 1.13463 7.67426 1.12496 7.625 1.125H3.125C2.92609 1.125 2.73532 1.20402 2.59467 1.34467C2.45402 1.48532 2.375 1.67609 2.375 1.875V10.125C2.375 10.3239 2.45402 10.5147 2.59467 10.6553C2.73532 10.796 2.92609 10.875 3.125 10.875H9.875C10.0739 10.875 10.2647 10.796 10.4053 10.6553C10.546 10.5147 10.625 10.3239 10.625 10.125V4.125C10.625 4.07574 10.6154 4.02695 10.5966 3.98143C10.5777 3.93591 10.5501 3.89454 10.5153 3.85969ZM8 8.25H5C4.90054 8.25 4.80516 8.21049 4.73484 8.14017C4.66451 8.06984 4.625 7.97446 4.625 7.875C4.625 7.77554 4.66451 7.68016 4.73484 7.60983C4.80516 7.53951 4.90054 7.5 5 7.5H8C8.09946 7.5 8.19484 7.53951 8.26517 7.60983C8.33549 7.68016 8.375 7.77554 8.375 7.875C8.375 7.97446 8.33549 8.06984 8.26517 8.14017C8.19484 8.21049 8.09946 8.25 8 8.25ZM8 6.75H5C4.90054 6.75 4.80516 6.71049 4.73484 6.64017C4.66451 6.56984 4.625 6.47446 4.625 6.375C4.625 6.27554 4.66451 6.18016 4.73484 6.10983C4.80516 6.03951 4.90054 6 5 6H8C8.09946 6 8.19484 6.03951 8.26517 6.10983C8.33549 6.18016 8.375 6.27554 8.375 6.375C8.375 6.47446 8.33549 6.56984 8.26517 6.64017C8.19484 6.71049 8.09946 6.75 8 6.75ZM7.625 4.125V2.0625L9.6875 4.125H7.625Z"
            fill="#3A62F2"
          />
        </svg>
        View
      </span>
      <span className="address">{InvoiceAddress}</span>
      <span>{Customer}</span>
      <span>{Duration}</span>
      <span>{StartDate}</span>
      <span>{EndDate}</span>
      <span
        className={
          Status === InvoiceStatus.APPROVED
            ? "approved"
            : Status === InvoiceStatus.COMPLETE
            ? "complete"
            : Status === InvoiceStatus.PENDING
            ? "pending"
            : ""
        }
      >
        {Status}
      </span>
      <span>{Payment}</span>
      <span>{Amount}</span>
    </RowWrapper>
  );
};

export default Rows;

const RowWrapper = styled.div`
  display: flex;
  width: 66.625rem;
  padding: 0.25rem 1.25rem;
  align-items: center;
  justify-content: space-between;
  //   gap: 2.625rem;

  span {
    text-align: center;
    justify-content: flex-start;
    border-radius: 0.2rem;
    color: var(--black-800, #262626);
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5rem;
    height: 1.5rem;
    // border: 1px solid red;
    width: 7rem;
    overflow: hidden;

    svg {
      width: 0.75rem;
      height: 0.75rem;
      flex-shrink: 0;
    }
  }

  .address {
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .method {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
    flex-shrink: 0;
    background: var(--white-200, #f7f7f7);
    cursor: pointer;
  }

  .approved {
    background: #d7f0e9;
    color: var(--green-700, #008a64);
  }

  .complete {
    background: #f4f6fe;
    color: #0a2070;
  }

  .pending {
    color: #775f00;
    background: #fffbeb;
  }
`;
