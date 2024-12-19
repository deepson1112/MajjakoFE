// "use client";

// import React, { useState, useRef } from "react";

// type OTPInputProps = {
//   length?: number; // Optional length of the OTP input (default to 6)
//   onSubmit?: (otp: string) => void; // Optional callback for form submission
// };

// type InputRefs = HTMLInputElement | null;

// const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onSubmit }) => {
//   const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
//   const inputs = useRef<InputRefs[]>([]);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ): void => {
//     const value = e.target.value;
//     if (!/^[0-9]?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < otp.length - 1) {
//       inputs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (
//     e: React.KeyboardEvent<HTMLInputElement>,
//     index: number
//   ): void => {
//     if (e.key === "Backspace" || e.key === "Delete") {
//       const newOtp = [...otp];
//       newOtp[index] = "";
//       setOtp(newOtp);

//       if (index > 0) {
//         inputs.current[index - 1]?.focus();
//       }
//     }
//   };

//   const handleFocus = (index: number): void => {
//     inputs.current[index]?.select();
//   };

//   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text");
//     if (!new RegExp(`^[0-9]{${otp.length}}$`).test(pasteData)) return;

//     const newOtp = pasteData.split("", otp.length);
//     setOtp(newOtp);
//     inputs.current[newOtp.length - 1]?.focus();
//   };

//   const handleSubmit = (e: React.FormEvent): void => {
//     e.preventDefault();
//     const otpValue = otp.join("");
//     console.log("Submitted OTP:", otpValue);
//     onSubmit?.(otpValue);
//   };

//   return (
//     <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
//       <header className="mb-8">
//         <h1 className="text-2xl font-bold mb-1">Mobile Phone Verification</h1>
//         <p className="text-[15px] text-slate-500">
//           Enter the {length}-digit verification code that was sent to your phone
//           number.
//         </p>
//       </header>
//       <form onSubmit={handleSubmit}>
//         <div className="flex items-center justify-center gap-3">
//           {otp.map((value, index) => (
//             <input
//               key={index}
//               type="text"
//               className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
//               maxLength={1}
//               value={value}
//               onChange={(e) => handleChange(e, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//               onFocus={() => handleFocus(index)}
//               onPaste={handlePaste}
//               ref={(el) => (inputs.current[index] = el)}
//             />
//           ))}
//         </div>
//         <div className="max-w-[260px] mx-auto mt-4">
//           <button
//             type="submit"
//             className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
//           >
//             Verify Account
//           </button>
//         </div>
//       </form>
//       <div className="text-sm text-slate-500 mt-4">
//         Didnt receive code?{" "}
//         <a
//           className="font-medium text-indigo-500 hover:text-indigo-600"
//           href="#0"
//         >
//           Resend
//         </a>
//       </div>
//     </div>
//   );
// };

// export default OTPInput;
import React from "react";

const page = () => {
  return <div>join</div>;
};

export default page;
