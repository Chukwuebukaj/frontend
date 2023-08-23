import { styled } from "styled-components";
import NameForm from "./NameForm";
import { useState } from "react";
import PhotoForm from "./PhotoForm";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
const baseUrl = import.meta.env.VITE_BASE_URL as string;

interface RegistrationProps {
  name: "";
  namecheck: boolean;
  businessname: string;
  profileImage: File | null;
  businessLogo: File | null;
  imageCheck: boolean;
}

const Registration = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  const [details, setDetails] = useState<RegistrationProps>({
    name: "",
    namecheck: false,
    businessname: "",
    profileImage: null,
    businessLogo: null,
    imageCheck: false,
  });
  const [nextClicked, setNextClicked] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files, checked } = event.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]:
        name === "namecheck" || name === "imageCheck"
          ? checked
          : name === "profileImage" || name === "businessLogo"
          ? files?.[0]
          : value,
    }));
  };

  const submitRegistrationForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("fullName", details.name);
    formData.append("walletId", String(address));
    formData.append(
      "businessName",
      details.namecheck ? details.name : details.businessname
    );
    if (details.profileImage && details.imageCheck) {
      formData.append("profilePic", details.profileImage);
      formData.append("businessLogo", details.profileImage);
    } else if (
      details.businessLogo &&
      !details.imageCheck &&
      details.profileImage
    ) {
      formData.append("profilePic", details.profileImage);
      formData.append("businessLogo", details.businessLogo);
    }

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(`${baseUrl}/user/register`, requestOptions);
      const data = await response.json();
      console.log(data);
      console.log(response);
      if (response.ok) {
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RegistrationWrapper onSubmit={submitRegistrationForm}>
      <h1>Just a moment ...</h1>
      <NameForm
        handleClickNext={() => setNextClicked(true)}
        nextClicked={nextClicked}
        isChecked={details.namecheck}
        handleInputChange={handleInputChange}
        formValues={{
          name: details.name,
          businessname: details.businessname,
        }}
      />
      <PhotoForm
        handleInputChange={handleInputChange}
        isChecked={details.imageCheck}
        prevClicked={nextClicked}
        handleClickPrev={() => setNextClicked(false)}
        businessLogo={
          details.businessLogo ? URL.createObjectURL(details.businessLogo) : ""
        }
        profileImage={
          details.profileImage ? URL.createObjectURL(details.profileImage) : ""
        }
      />
    </RegistrationWrapper>
  );
};

export default Registration;

const RegistrationWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
