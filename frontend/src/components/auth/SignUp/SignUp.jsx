import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../../Redux/auth/authSlice.js";
import { useApi } from "../../../hooks/useApi.js";
import AuthFormLayout from "../AuthFormLayout.jsx";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { request } = useApi();
  // const [showOtpForm, setShowOtpForm] = useState(false);
  // const [signupFormData, setSignupFormData] = useState(null);

  const submit = async (data) => {
    try {
      const signupData = await request("POST", "/auth/signup", data);

      if (signupData) {
        const loginData = await request("POST", "/auth/login", {
          email: data.email,
          password: data.password,
        });

        if (loginData?.user) {
          dispatch(authLogin({ userInfo: loginData.user }));
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  };

  // const onOtpSubmit = async (otp) => {
  //   const otpDataWithUser = { ...signupFormData, otp };

  //   try {
  //     const verifyData = await request("POST", "/otp/verify", otpDataWithUser);
  //     console.log("Verify response:", verifyData);

  //     if (verifyData) {
  //       const loginData = await request("POST", "/auth/login", {
  //         email: signupFormData.email,
  //         password: signupFormData.password,
  //       });

  //       if (loginData?.user) {
  //         dispatch(authLogin({ userInfo: loginData.user }));
  //         navigate("/");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("OTP verification failed:", error);
  //     alert("OTP verification failed. Please try again.");
  //   }
  // };

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "Enter Your Name",
      validation: {
        required: "Name is required",
      },
    },
    {
      name: "username",
      type: "text",
      placeholder: "Enter username",
      validation: {
        required: "username is required",
      },
    },
    {
      name: "email",
      type: "email",
      placeholder: "Enter Your Email",
      validation: {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Email address must be a valid address",
        },
      },
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter Your Password",
      validation: {
        required: "Password is required",
        pattern: {
          value:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message:
            "Password must be 8+ chars, include uppercase, lowercase, number & special character",
        },
      },
    },
  ];

  // return
  // showOtpForm ? (
  //   <OtpInput onOtpSubmit={onOtpSubmit} email={signupFormData?.email} />
  // ) :
  return (
    <AuthFormLayout
      title="Sign Up"
      fields={fields}
      onSubmit={submit}
      buttonText="Sign UP"
      bottomLinkUrl="/login"
      bottomLinkText="Log In"
      bottomDescription="Already have an account?"
      containerClass="signup-Container"
    />
  );
}

// function OtpInput({ onOtpSubmit, email }) {
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [loading, setLoading] = useState(false);
//   const inputRefs = useRef([]);

//   const handleChange = (index, e) => {
//     const value = e.target.value.replace(/[^0-9]/g, "");
//     if (value.length > 1) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto-focus to next input
//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }

//     // Auto-submit if all 6 digits are filled
//     if (newOtp.every((digit) => digit !== "") && value) {
//       const otpString = newOtp.join("");
//       setLoading(true);
//       onOtpSubmit(otpString);
//       setLoading(false);
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace") {
//       if (otp[index] === "") {
//         if (index > 0) {
//           inputRefs.current[index - 1]?.focus();
//         }
//       } else {
//         const newOtp = [...otp];
//         newOtp[index] = "";
//         setOtp(newOtp);
//       }
//     } else if (e.key === "ArrowLeft" && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     } else if (e.key === "ArrowRight" && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleClick = (index) => {
//     inputRefs.current[index]?.setSelectionRange(1, 1);
//   };

//   useEffect(() => {
//     inputRefs.current[0]?.focus();
//   }, []);
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-center bg-black px-4 text-white">
//       <div className="w-full max-w-md rounded-xl border border-gray-700 bg-gray-950 p-8 shadow-2xl">
//         <h2 className="mb-2 text-3xl font-bold">Verify OTP</h2>
//         <p className="mb-6 text-sm text-gray-400">
//           We sent a 6-digit code to {email}
//         </p>

//         <div className="mb-8 flex justify-center gap-3">
//           {otp.map((value, index) => (
//             <input
//               key={index}
//               ref={(input) => (inputRefs.current[index] = input)}
//               type="text"
//               inputMode="numeric"
//               value={value}
//               maxLength="1"
//               disabled={loading}
//               onChange={(e) => handleChange(index, e)}
//               onClick={() => handleClick(index)}
//               onKeyDown={(e) => handleKeyDown(index, e)}
//               className="h-14 w-12 rounded-lg border-2 border-gray-600 bg-gray-900 text-center text-2xl font-bold text-white transition-all duration-200 outline-none hover:border-gray-500 focus:border-blue-500 focus:shadow-xl disabled:opacity-50"
//             />
//           ))}
//         </div>

//         {loading && (
//           <div className="flex items-center justify-center text-sm text-blue-400">
//             <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent"></div>
//             Verifying...
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

export default SignUp;
