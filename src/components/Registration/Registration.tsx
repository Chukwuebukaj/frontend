import { styled } from "styled-components";
import NameForm from "./NameForm";
import { useState } from "react";
import PhotoForm from "./PhotoForm";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_BASE_URL as string;

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
  const [details, setDetails] = useState<RegistrationProps>({
    name: "",
    email: "",
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
        toast.success(data.message);
        document.cookie = `pavoce=${data.token}`;
        setTimeout(() => {
          navigate("/profile", {
            state: {
              businessName: data.user.businessName,
              profilePic: data.user.profilePic,
              businessLogo: data.user.businessLogo,
              fullName: data.user.fullName,
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
