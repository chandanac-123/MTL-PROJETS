import React from "react";
import AuthHeader from "../header";
import { Button } from "@/components/ui/button";
import OtpInput from "@/components/ui/otp";

export default function page() {
  const descriptionContent = (
    <>
      Enter the verification code we just sent to your email{" "}
      <span className="font-semibold text-primary">michael@gmail.com</span>
    </>
  );

  return (
    <div className="flex flex-col w-full px-20 items-center">
      <AuthHeader
        miniHead="Forgot Password"
        mainHead="OTP Verification"
        discription={descriptionContent}
      />
      <div className="bg-bg_secondary w-auto mobile:w-1/3 gap-4 rounded-xl p-10 flex flex-col justify-between">
        <OtpInput />
        <div className="flex justify-center mt-4">
          <Button variant="default" label="Verify Code" />
        </div>
        <div className="text-sm justify-center flex text-grey">
          Didn&apos;t receive the code?{" "}
          <Button label="Resend code" size="sm" variant="destructive"></Button>{" "}
        </div>
      </div>
    </div>
  );
}
