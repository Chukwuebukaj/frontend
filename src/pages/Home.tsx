import { useEffect, useState } from "react";
import Hero from "../components/Hero/Hero";
import NavBar from "../components/Navbar/NavBar";
import { useAccount } from "wagmi";
const baseUrl = import.meta.env.VITE_BASE_URL as string;
import { UserProps } from "../components/Hero/Hero";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteCookie } from "../components/Navbar/NavBarData";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { address } = useAccount();
  const [btnText, setBtnText] = useState<string>("Get Started");
  const [href, setHref] = useState<string>("/signup");
  const [loggedInUserDetails, setLoggedInUserDetails] = useState<UserProps>({
    businessLogo: "",
    businessName: "",
    profilePic: "",
    fullName: "",
    email: "",
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ walletId: String(address) }),
  };

  const loginUser = async () => {
    try {
      const response = await fetch(`${baseUrl}/user/login`, requestOptions);
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        localStorage.setItem("status", JSON.stringify("loggedin"));
        document.cookie = `pavoce=${data.token}`;
        setLoggedInUserDetails((prevDetails) => ({
          ...prevDetails,
          businessName: data.user.businessName,
          profilePic: data.user.profilePic,
          businessLogo: data.user.businessLogo,
          fullName: data.user.fullName,
          email: data.user.email,
        }));
        setTimeout(() => {
          window.location.href = "/profile";
          navigate("/profile", {
            state: {
              businessName: data.user.businessName,
              profilePic: data.user.profilePic,
              businessLogo: data.user.businessLogo,
              fullName: data.user.fullName,
              email: data.user.email,
            },
          });
        }, 2000);
      } else {
        navigate("/signup");
      }
    } catch (error) {
      console.error(error);
      navigate("/signup");
    }
  };

  useEffect(() => {
    const statusFromStorage = localStorage.getItem("status");
    const userStatus = statusFromStorage && JSON.parse(statusFromStorage);
    if (userStatus && address) {
      setBtnText("Go to Dashboard");
      setHref("/profile");
      setLoggedInUserDetails(location.state);
      return;
    } else if (!address) {
      setHref("/profile");
      setBtnText("Get Started");
      localStorage.removeItem("status");
      deleteCookie("pavoce");
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
