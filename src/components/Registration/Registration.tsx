import { styled } from "styled-components";
import NameForm from "./NameForm";
import { useState } from "react";
import PhotoForm from "./PhotoForm";
import { useAccount } from "wagmi";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { configData } from "../Invoice/CardData";
const baseUrl = import.meta.env.VITE_BASE_URL as string;
const token = document.cookie.slice(7);

interface RegistrationProps {
  name: string;
  email: string;
  namecheck: boolean;
  businessname: string;
  profileImage: File | null;
  businessLogo: File | null;
  imageCheck: boolean;
}

const Registration = () => {
  const { address } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const userDetails = location.state;
  const [details, setDetails] = useState<RegistrationProps>({
    name: userDetails.fullName ? userDetails.fullName : "",
    email: userDetails.email ? userDetails.email : "",
    namecheck: false,
    businessname: userDetails.businessName ? userDetails.businessName : "",
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

  const userUpdateDetails = {
    fullName: details.name,
    walletId: String(address),
    email: details.email,
    businessName: details.namecheck ? details.name : details.businessname,
    profilePic: details.profileImage
      ? details.profileImage
      : userDetails.profilePic,
    businessLogo: details.businessLogo
      ? details.businessLogo
      : userDetails.businessLogo,
  };

  console.log(userUpdateDetails);

  const submitRegistrationForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("fullName", details.name);
    formData.append("walletId", String(address));
    formData.append("email", String(details.email));
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
      method: userDetails.fullName ? "PUT" : "POST",
      headers: userDetails.fullName ? configData(token).headers : {},
      body: userDetails.fullName ? JSON.stringify(userUpdateDetails) : formData,
    };

    try {
      const response = await fetch(
        `${baseUrl}/user/${userDetails.fullName ? "update" : "register"}`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      console.log(response);
      if (response.ok) {
        toast.success(data.message);
        document.cookie = `pavoce=${data.token}`;
        setTimeout(() => {
          navigate("/profile", {
            state: {
              businessName:
                data[`${data.user ? "user" : "updatedUser"}`].businessName,
              profilePic:
                data[`${data.user ? "user" : "updatedUser"}`].profilePic,
              businessLogo:
                data[`${data.user ? "user" : "updatedUser"}`].businessLogo,
              fullName: data[`${data.user ? "user" : "updatedUser"}`].fullName,
              email: data[`${data.user ? "user" : "updatedUser"}`].email,
            },
          });
        }, 3000);
      } else toast.error(data.error ? data.error : response.statusText);
    } catch (error: any) {
      console.error(error);
      toast.error(error.statusText);
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
          email: details.email,
        }}
      />
      <PhotoForm
        handleInputChange={handleInputChange}
        isChecked={details.imageCheck}
        prevClicked={nextClicked}
        handleClickPrev={() => setNextClicked(false)}
        businessLogo={
          details.businessLogo
            ? URL.createObjectURL(details.businessLogo)
            : userDetails.businessLogo
        }
        profileImage={
          details.profileImage
            ? URL.createObjectURL(details.profileImage)
            : userDetails.profilePic
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
