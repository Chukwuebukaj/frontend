import styled from "styled-components";

export const DisplayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 0 4rem 2rem 3rem;
  height: 100vh;
  overflow: auto;

  h2 {
    color: var(--blue-1000, #03050d);
    font-size: 2rem;
    font-weight: 600;
    line-height: 2.5rem; /* 125% */
  }
`;

export const DisplayTop = styled.div`
  display: flex;
  gap: 2rem;
`;
export const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InvoiceMeter = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.5rem;

  .payments-received {
    display: flex;
    flex-direction: column;

    .first {
      color: var(--black-800, #262626);
      font-size: 1.125rem;
      font-weight: 500;
      line-height: 2rem; /* 177.778% */
    }

    .second {
      color: var(--black-400, #5e5e5e);
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5rem; /* 171.429% */
    }
  }

  .select-type {
    display: flex;
  }

  .currency-select {
    border-radius: 0rem 0.5rem 0.5rem 0rem;
    border: 0.5px solid var(--black-100, #b8b8b8);
    display: flex;
    width: 4.5rem;
    padding: 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .select-period {
    border-radius: 0.5rem;
    border: 0.5px solid var(--black-100, #b8b8b8);
    display: flex;
    padding: 0.5rem;
    align-items: center;
    gap: 0.5rem;
    margin-left: 3rem;
  }
`;
export const MeterBottom = styled.div`
  display: flex;
  width: 51.0625rem;
  height: 13.5rem;
  // padding: 0.75rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  border: 1px solid var(--white-200, #fff);

  .days {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-left: 4rem;

    span {
      color: var(--black-800, #262626);
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }

  .tracker {
    display: flex;
    width: 48.875rem;
    height: 10rem;
    align-items: center;
    gap: 2.5rem;
    flex-shrink: 0;
  }

  .tracker-right {
    .line {
      width: 44.125rem;
      height: 0.0625rem;
      background: #262626;
      margin: auto 0;
    }
  }
`;

export const DisplayBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ToggleBtns = styled.div`
  display: flex;
  padding: 0.5rem;
  align-items: center;
  gap: 0.75rem;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
  background: var(--white-200, #f7f7f7);
  width: 8.75rem;
  height: 2.5rem;
  justify-content: center;

  button {
    width: 3.5rem;
    padding: 0rem 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    color: var(--black-400, #5e5e5e);
    text-align: center;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5rem; /* 171.429% */
    border-radius: 0.25rem;
  }

  .active {
    background: #3a62f2;
    color: #fff;
  }
`;

export const MeterTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  select {
    padding: 0.5rem 0.5rem 0.5rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.5rem;
    border: 0.5px solid var(--black-100, #b8b8b8);
  }

  .all-select {
    display: flex;
    align-items: center;
    gap: 1.25rem;

    svg {
      margin-right: -2.5rem;
      z-index: 100;
    }
  }
`;
export const TableWrapper = styled.div`
  display: flex;
  width: 66.625rem;
  height: 20rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 1px solid var(--white-200, #f7f7f7);

  .empty-table-state {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    p {
      color: var(--black-800, #262626);
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 2rem; /* 133.333% */
    }

    span {
      color: var(--black-400, #5e5e5e);
      text-align: center;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5rem; /* 171.429% */
    }

    button {
      margin-top: 1rem;
    }
  }
`;
