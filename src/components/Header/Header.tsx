import { styled } from "styled-components";
import Button from "../Reuseables/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  currentDisplay: string;
  handleClickCreateInvoice: () => void;
}

interface AvatarProp {
  $bgImg: string;
}

const Header: React.FC<HeaderProps> = ({
  currentDisplay,
  handleClickCreateInvoice,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleClickEditProfile = () => {
    navigate("/signup", { state: location.state });
  };

  return (
    <HeaderWrapper>
      {currentDisplay === "Invoice" && (
        <CreateInvoiceBtn
          children="Create Invoice"
          onClick={handleClickCreateInvoice}
        />
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M21.5308 20.9693L16.8368 16.2762C18.1973 14.6428 18.8757 12.5478 18.7309 10.4269C18.5861 8.30604 17.6293 6.32265 16.0593 4.88932C14.4894 3.45599 12.4274 2.68308 10.3021 2.73138C8.17687 2.77968 6.15205 3.64547 4.64888 5.14864C3.14571 6.65181 2.27993 8.67663 2.23163 10.8019C2.18333 12.9271 2.95623 14.9892 4.38956 16.5591C5.82289 18.129 7.80629 19.0859 9.92715 19.2307C12.048 19.3755 14.1431 18.6971 15.7765 17.3365L20.4696 22.0306C20.5393 22.1003 20.622 22.1556 20.713 22.1933C20.8041 22.231 20.9017 22.2504 21.0002 22.2504C21.0988 22.2504 21.1963 22.231 21.2874 22.1933C21.3784 22.1556 21.4612 22.1003 21.5308 22.0306C21.6005 21.9609 21.6558 21.8782 21.6935 21.7871C21.7312 21.6961 21.7506 21.5985 21.7506 21.5C21.7506 21.4014 21.7312 21.3038 21.6935 21.2128C21.6558 21.1218 21.6005 21.039 21.5308 20.9693ZM3.75021 11C3.75021 9.66495 4.14609 8.3599 4.88779 7.24987C5.62949 6.13984 6.6837 5.27467 7.9171 4.76378C9.1505 4.25289 10.5077 4.11922 11.8171 4.37967C13.1264 4.64012 14.3292 5.28299 15.2732 6.227C16.2172 7.171 16.8601 8.37374 17.1205 9.68311C17.381 10.9925 17.2473 12.3497 16.7364 13.5831C16.2255 14.8165 15.3603 15.8707 14.2503 16.6124C13.1403 17.3541 11.8352 17.75 10.5002 17.75C8.71061 17.748 6.99488 17.0362 5.72944 15.7707C4.46399 14.5053 3.7522 12.7896 3.75021 11Z"
          fill="#262626"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M20.7936 16.9944C20.2733 16.0981 19.4999 13.5622 19.4999 10.25C19.4999 8.26088 18.7097 6.35322 17.3032 4.9467C15.8967 3.54018 13.989 2.75 11.9999 2.75C10.0108 2.75 8.10311 3.54018 6.69659 4.9467C5.29007 6.35322 4.49989 8.26088 4.49989 10.25C4.49989 13.5631 3.72551 16.0981 3.2052 16.9944C3.07233 17.2222 3.00189 17.4811 3.00099 17.7449C3.00008 18.0086 3.06874 18.268 3.20005 18.4967C3.33135 18.7255 3.52065 18.9156 3.74886 19.0478C3.97708 19.1801 4.23613 19.2498 4.49989 19.25H8.32583C8.49886 20.0967 8.95904 20.8577 9.62851 21.4042C10.298 21.9507 11.1357 22.2492 11.9999 22.2492C12.8641 22.2492 13.7018 21.9507 14.3713 21.4042C15.0407 20.8577 15.5009 20.0967 15.674 19.25H19.4999C19.7636 19.2496 20.0225 19.1798 20.2506 19.0475C20.4787 18.9151 20.6678 18.725 20.799 18.4963C20.9302 18.2676 20.9988 18.0083 20.9979 17.7446C20.9969 17.4809 20.9265 17.2222 20.7936 16.9944ZM11.9999 20.75C11.5347 20.7499 11.081 20.6055 10.7013 20.3369C10.3215 20.0683 10.0343 19.6886 9.87926 19.25H14.1205C13.9655 19.6886 13.6783 20.0683 13.2985 20.3369C12.9187 20.6055 12.4651 20.7499 11.9999 20.75ZM4.49989 17.75C5.22176 16.5087 5.99989 13.6325 5.99989 10.25C5.99989 8.6587 6.63203 7.13258 7.75725 6.00736C8.88247 4.88214 10.4086 4.25 11.9999 4.25C13.5912 4.25 15.1173 4.88214 16.2425 6.00736C17.3677 7.13258 17.9999 8.6587 17.9999 10.25C17.9999 13.6297 18.7761 16.5059 19.4999 17.75H4.49989Z"
          fill="#262626"
        />
      </svg>
      <div className="avatar-name">
        <span>{location.state?.fullName}</span>
        <AvatarWrapper $bgImg={location.state?.profilePic}>
          {!location.state?.profilePic && "me"}
        </AvatarWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          className="pointer"
          onClick={() => setShowOptions(!showOptions)}
        >
          <path
            d="M16.6922 8.44219L10.4422 14.6922C10.3841 14.7503 10.3152 14.7964 10.2393 14.8279C10.1635 14.8593 10.0821 14.8755 10 14.8755C9.91787 14.8755 9.83654 14.8593 9.76067 14.8279C9.68479 14.7964 9.61586 14.7503 9.55782 14.6922L3.30782 8.44219C3.22031 8.35478 3.1607 8.24337 3.13655 8.12207C3.11239 8.00076 3.12477 7.87502 3.17211 7.76076C3.21946 7.64649 3.29964 7.54884 3.40252 7.48017C3.50539 7.41151 3.62632 7.3749 3.75 7.375H16.25C16.3737 7.3749 16.4946 7.41151 16.5975 7.48017C16.7004 7.54884 16.7805 7.64649 16.8279 7.76076C16.8752 7.87502 16.8876 8.00076 16.8635 8.12207C16.8393 8.24337 16.7797 8.35478 16.6922 8.44219Z"
            fill="#262626"
          />
        </svg>
        {showOptions && (
          <OptionsDiv>
            <span onClick={handleClickEditProfile}>Edit Profile</span>
          </OptionsDiv>
        )}
      </div>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  padding: 4rem 4rem 2rem 0;
  width: calc(100vw - 16.375rem);
  height: fit-content;
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  align-items: center;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }

  .avatar-name {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    span {
      color: var(--black-800, #262626);
      text-align: center;
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 2rem; /* 200% */
    }
  }

  .pointer {
    cursor: pointer;
  }
`;
const CreateInvoiceBtn = styled(Button)`
  color: var(--white-100, #fff);
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  line-height: normal;
  display: flex;
  padding: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: var(--blue-500, #3a62f2);
  border: 1px solid #3a62f2;
  cursor: pointer;
`;

const AvatarWrapper = styled.div<AvatarProp>`
  background: ${({ $bgImg }) => `url("${$bgImg}") no-repeat center`};
  background-size: 100% 100%;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OptionsDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  // border: 1px solid red;
  top: 6.5rem;
  right: 2rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  span:hover {
    background: #3a62f2;
    color: #fff;
  }
`;
