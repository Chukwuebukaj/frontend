import styled from "styled-components";
import { bottom, middle, para, top } from "./HeroData";
import Button from "../Reuseables/Button";
import buttomImage from "../../assets/mockup.png";
import { Link } from "react-router-dom";

export interface UserProps {
  businessName: string;
  businessLogo: string;
  fullName: string;
  profilePic: string;
}

interface HeroProps {
  btnText: string;
  href: string;
  userDetails: UserProps;
}

const Hero: React.FC<HeroProps> = ({ btnText, href, userDetails }) => {
  return (
    <HeroWrapper>
      <HeadingWrapper>
        <span>{top}</span>
        <BlueLine></BlueLine>
        <span className="second-line">
          {middle}
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Money">
              <path
                id="Vector"
                opacity="0.2"
                d="M50 40C50 41.9778 49.4135 43.9112 48.3147 45.5557C47.2159 47.2002 45.6541 48.4819 43.8268 49.2388C41.9996 49.9957 39.9889 50.1937 38.0491 49.8079C36.1093 49.422 34.3275 48.4696 32.9289 47.0711C31.5304 45.6725 30.578 43.8907 30.1921 41.9509C29.8063 40.0111 30.0043 38.0004 30.7612 36.1732C31.5181 34.3459 32.7998 32.7841 34.4443 31.6853C36.0888 30.5865 38.0222 30 40 30C42.6522 30 45.1957 31.0536 47.0711 32.9289C48.9464 34.8043 50 37.3478 50 40ZM62.5 20C63.0293 23.1229 64.5169 26.0038 66.7565 28.2435C68.9962 30.4831 71.8771 31.9707 75 32.5V20H62.5ZM62.5 60H75V47.5C71.8771 48.0293 68.9962 49.5169 66.7565 51.7565C64.5169 53.9962 63.0293 56.8771 62.5 60ZM5 47.5V60H17.5C16.9707 56.8771 15.4831 53.9962 13.2435 51.7565C11.0038 49.5169 8.12286 48.0293 5 47.5ZM5 32.5C8.12286 31.9707 11.0038 30.4831 13.2435 28.2435C15.4831 26.0038 16.9707 23.1229 17.5 20H5V32.5Z"
                fill="#3A62F2"
              />
              <path
                id="Vector_2"
                d="M40 27.5C37.5277 27.5 35.111 28.2331 33.0554 29.6066C30.9998 30.9801 29.3976 32.9324 28.4515 35.2165C27.5054 37.5005 27.2579 40.0139 27.7402 42.4386C28.2225 44.8634 29.413 47.0907 31.1612 48.8388C32.9093 50.587 35.1366 51.7775 37.5614 52.2598C39.9861 52.7421 42.4995 52.4946 44.7835 51.5485C47.0676 50.6024 49.0199 49.0002 50.3934 46.9446C51.7669 44.889 52.5 42.4723 52.5 40C52.5 36.6848 51.183 33.5054 48.8388 31.1612C46.4946 28.817 43.3152 27.5 40 27.5ZM40 47.5C38.5166 47.5 37.0666 47.0601 35.8332 46.236C34.5999 45.4119 33.6386 44.2406 33.0709 42.8701C32.5032 41.4997 32.3547 39.9917 32.6441 38.5368C32.9335 37.082 33.6478 35.7456 34.6967 34.6967C35.7456 33.6478 37.082 32.9335 38.5368 32.6441C39.9917 32.3547 41.4997 32.5032 42.8701 33.0709C44.2406 33.6386 45.4119 34.5999 46.236 35.8332C47.0601 37.0666 47.5 38.5166 47.5 40C47.5 41.9891 46.7098 43.8968 45.3033 45.3033C43.8968 46.7098 41.9891 47.5 40 47.5ZM75 17.5H5C4.33696 17.5 3.70107 17.7634 3.23223 18.2322C2.76339 18.7011 2.5 19.337 2.5 20V60C2.5 60.663 2.76339 61.2989 3.23223 61.7678C3.70107 62.2366 4.33696 62.5 5 62.5H75C75.663 62.5 76.2989 62.2366 76.7678 61.7678C77.2366 61.2989 77.5 60.663 77.5 60V20C77.5 19.337 77.2366 18.7011 76.7678 18.2322C76.2989 17.7634 75.663 17.5 75 17.5ZM7.5 22.5H14.1781C12.8887 25.4986 10.4986 27.8887 7.5 29.1781V22.5ZM7.5 57.5V50.8219C10.4986 52.1113 12.8887 54.5014 14.1781 57.5H7.5ZM72.5 57.5H65.8219C67.1113 54.5014 69.5014 52.1113 72.5 50.8219V57.5ZM72.5 45.5156C69.6613 46.355 67.0776 47.8912 64.9844 49.9844C62.8912 52.0776 61.355 54.6613 60.5156 57.5H19.4844C18.645 54.6613 17.1088 52.0776 15.0156 49.9844C12.9224 47.8912 10.3387 46.355 7.5 45.5156V34.4844C10.3387 33.645 12.9224 32.1088 15.0156 30.0156C17.1088 27.9224 18.645 25.3387 19.4844 22.5H60.5156C61.355 25.3387 62.8912 27.9224 64.9844 30.0156C67.0776 32.1088 69.6613 33.645 72.5 34.4844V45.5156ZM72.5 29.1781C69.5014 27.8887 67.1113 25.4986 65.8219 22.5H72.5V29.1781Z"
                fill="#1D3AA3"
              />
            </g>
          </svg>
          {bottom}
        </span>
      </HeadingWrapper>
      <p>{para}</p>
      <CTABtnsWrapper>
        <Link to={href} state={userDetails}>
          <GetStartedBtn>{btnText}</GetStartedBtn>
        </Link>
        <WatchDemoBtn>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <path
              d="M12 2.75C10.0716 2.75 8.18657 3.32183 6.58319 4.39317C4.97982 5.46451 3.73013 6.98726 2.99218 8.76884C2.25422 10.5504 2.06114 12.5108 2.43735 14.4021C2.81355 16.2934 3.74215 18.0307 5.10571 19.3943C6.46928 20.7579 8.20656 21.6865 10.0979 22.0627C11.9892 22.4389 13.9496 22.2458 15.7312 21.5078C17.5127 20.7699 19.0355 19.5202 20.1068 17.9168C21.1782 16.3134 21.75 14.4284 21.75 12.5C21.7473 9.91498 20.7192 7.43661 18.8913 5.60872C17.0634 3.78084 14.585 2.75273 12 2.75ZM12 20.75C10.3683 20.75 8.77326 20.2661 7.41655 19.3596C6.05984 18.4531 5.00242 17.1646 4.378 15.6571C3.75358 14.1496 3.5902 12.4908 3.90853 10.8905C4.22685 9.29016 5.01259 7.82015 6.16637 6.66637C7.32016 5.51259 8.79017 4.72685 10.3905 4.40852C11.9909 4.09019 13.6497 4.25357 15.1571 4.87799C16.6646 5.50242 17.9531 6.55984 18.8596 7.91655C19.7661 9.27325 20.25 10.8683 20.25 12.5C20.2475 14.6873 19.3775 16.7843 17.8309 18.3309C16.2843 19.8775 14.1873 20.7475 12 20.75ZM15.4163 11.8756L10.9163 8.87562C10.8033 8.80025 10.672 8.75696 10.5363 8.75039C10.4006 8.74382 10.2657 8.77421 10.146 8.83831C10.0263 8.90241 9.9262 8.99782 9.85645 9.11436C9.78671 9.2309 9.74992 9.36419 9.75 9.5V15.5C9.74992 15.6358 9.78671 15.7691 9.85645 15.8856C9.9262 16.0022 10.0263 16.0976 10.146 16.1617C10.2657 16.2258 10.4006 16.2562 10.5363 16.2496C10.672 16.243 10.8033 16.1998 10.9163 16.1244L15.4163 13.1244C15.5191 13.0559 15.6035 12.9631 15.6618 12.8542C15.7202 12.7452 15.7507 12.6236 15.7507 12.5C15.7507 12.3764 15.7202 12.2548 15.6618 12.1458C15.6035 12.0369 15.5191 11.9441 15.4163 11.8756ZM11.25 14.0984V10.9062L13.6481 12.5L11.25 14.0984Z"
              fill="#262626"
            />
          </svg>
          Watch Demo
        </WatchDemoBtn>
      </CTABtnsWrapper>
      <MockUp></MockUp>
    </HeroWrapper>
  );
};

export default Hero;

const HeroWrapper = styled.div`
  width: 66vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  p {
    width: 49vw;
    color: var(--black-800, #262626);
    text-align: center;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2rem; /* 177.778% */
    margin: 0 auto;
  }
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  span {
    color: var(--blue-900, #050d2a);
    text-align: center;
    font-family: "Sintony", sans-serif;
    font-size: 4.5rem;
    font-weight: 700;
    line-height: 5.25rem; /* 116.667% */
  }

  .second-line {
    display: flex;
    align-items: flex-end;
    width: fit-content;
    gap: 0.5rem;
  }
`;

const GetStartedBtn = styled(Button)`
  height: 2.6875rem;
  padding: 0 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: var(--blue-500, #3a62f2);
  color: #fff;
  border: 1px solid #3a62f2;
  text-align: center;
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const WatchDemoBtn = styled(Button)`
  height: 2.6875rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--blue-800, #0b1741);
  font-size: 1rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border: 1px solid #fff;
`;

const CTABtnsWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 0 auto;

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }
`;

const MockUp = styled.div`
  background: url("${buttomImage}") no-repeat center;
  background-size: 100% 100%;
  width: 28.575rem;
  height: 29.36rem;
  margin: 0 auto;
`;

const BlueLine = styled.div`
  width: 20rem;
  height: 0.5rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  background: var(--blue-500, #3a62f2);
  margin-left: -27rem;
`;
