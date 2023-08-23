import { styled } from "styled-components";
import { InputField } from "../Reuseables/FormFields";
import Button from "../Reuseables/Button";
import { Link, useLocation } from "react-router-dom";

interface PhotoFormProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
  prevClicked: boolean;
  handleClickPrev: () => void;
  businessLogo: string;
  profileImage: string;
}

interface ImageProps {
  $imageurl: string;
}

const PhotoForm: React.FC<PhotoFormProps> = ({
  handleInputChange,
  isChecked,
  prevClicked,
  handleClickPrev,
  businessLogo,
  profileImage,
}) => {
  const location = useLocation();
  console.log(location);

  return (
    <>
      {prevClicked && (
        <PhotoFormWrapper>
          <p className="top-para">Upload profile image</p>
          <FormFieldsWrapper>
            <ProfileImageWrapper>
              <ProfileImageDisplay $imageurl={profileImage} htmlFor="profile">
                {!profileImage && " Profile Image"}
              </ProfileImageDisplay>
              <InputField
                id="profile"
                type="file"
                accept="image/*"
                name="profileImage"
                onChange={handleInputChange}
              />
              <span>
                <CheckBox
                  type="checkbox"
                  name="imageCheck"
                  onChange={handleInputChange}
                  checked={isChecked}
                />
                Use as business logo
              </span>
            </ProfileImageWrapper>
            {!isChecked && (
              <BusinessLogoWrapper>
                <BusinessLogoDisplay
                  $imageurl={businessLogo}
                  htmlFor="business"
                >
                  {!businessLogo && "Business Logo"}
                </BusinessLogoDisplay>
                <InputField
                  id="business"
                  type="file"
                  accept="image/*"
                  name="businessLogo"
                  onChange={handleInputChange}
                />
              </BusinessLogoWrapper>
            )}
          </FormFieldsWrapper>
          <BtnsWrapper>
            <Button children="Prev" onClick={handleClickPrev} />
            <Link to={"/profile"} state={location.state}>
              <Button children="Continue" type="submit" />
            </Link>
          </BtnsWrapper>
        </PhotoFormWrapper>
      )}
    </>
  );
};

export default PhotoForm;

const PhotoFormWrapper = styled.div`
  width: 27rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  .top-para {
    margin: 2rem auto;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10.75rem;
    height: 10.75rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    margin: 0 auto;
    border: 1px solid lightgray;
  }
`;
const ProfileImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    margin: 1rem 0;
  }
`;

const ProfileImageDisplay = styled.label<ImageProps>`
  background: ${({ $imageurl }) => `url("${$imageurl}") no-repeat center`};
  background-size: 100% 100%;
`;

const BusinessLogoDisplay = styled.label<ImageProps>`
  background: ${({ $imageurl }) => `url("${$imageurl}") no-repeat center`};
  background-size: 100% 100%;
`;

const BusinessLogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CheckBox = styled(InputField)`
  margin-right: auto;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
`;

const BtnsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;

  button {
    padding: 0.75rem 1rem;
    width: fit-content;
    border-radius: 0.5rem;
    background: var(--blue-500, #3a62f2);
    color: var(--white-100, #fff);
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    line-height: normal;
    border: 1px solid #3a62f2;
  }
`;

const FormFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  width: 100%;
  align-items: center;

  input[type="file"] {
    display: none;
  }
`;
