import { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import NavBar from "../components/Navbar/NavBar";
import { useAccount } from "wagmi";
const baseUrl = import.meta.env.VITE_BASE_URL as string;
import { UserProps } from "../components/Hero/Hero";
import { toast } from "react-toastify";

const Home = () => {
  const { address } = useAccount();
  const [btnText, setBtnText] = useState<string>("Get Started");
  const [href, setHref] = useState<string>("/signup");
  const [loggedInUserDetails, setLoggedInUserDetails] = useState<UserProps>({
    businessLogo: "",
    businessName: "",
    profilePic: "",
    fullName: "",
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ walletId: String(address) }),
  };

  console.log(requestOptions);

  const loginUser = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/login`, requestOptions);
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        toast.success(data.message);
        setBtnText("Go to Dashboard");
        setHref("/profile");
        localStorage.setItem("status", JSON.stringify("loggedin"));
        document.cookie = `pavoce=${data.token}`;
        setLoggedInUserDetails((prevDetails) => ({
          ...prevDetails,
          businessName: data.user.businessName,
          profilePic: data.user.profilePic,
          businessLogo: data.user.businessLogo,
          fullName: data.user.fullName,
        }));
      } else {
        setHref("/signup");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const statusFromStorage = localStorage.getItem("status");
    const userStatus = statusFromStorage && JSON.parse(statusFromStorage);
    if (userStatus && address) {
      setBtnText("Go to Dashboard");
      setHref("/profile");
      return;
    } else if (!address) {
      setHref("/");
      setBtnText("Get Started");
      localStorage.removeItem("status");
      return;
    } else {
      loginUser();
    }
  }, [address]);
  return (
    <div>
      <NavBar />
      <Hero btnText={btnText} href={href} userDetails={loggedInUserDetails} />
    </div>
  );
};

export default Home;
