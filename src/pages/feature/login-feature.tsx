"use client";

import { useState, useCallback } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import Login from "../ui/login";
import { useToast } from "@/components/shadcn/use-toast";
import { getBackendURL } from "@/lib/utils";

interface FormData {
  email: string;
}

export default function LoginFeature() {
  const [step, setStep] = useState<"initial" | "emailInput" | "otpInput">(
    "initial",
  );
  const [otpValue, setOtpValue] = useState("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const emailRegister = register("email", {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  });

  const handleEmailClick = useCallback(() => {
    if (step === "initial") {
      setStep("emailInput");
    } else if (step === "emailInput" && isValid) {
      handleSubmit(onSubmit)();
    }
  }, [step, isValid, handleSubmit]);

  const handleGitHubClick = useCallback(() => {
    console.log("GitHub");
    window.location.href = getBackendURL() + "/auth/github";
  }, []);

  const handleGoogleClick = useCallback(() => {
    console.log("CGoogle");

    window.location.href = getBackendURL() + "/auth/google";
  }, []);

  const handleOtpChange = useCallback((value: string) => {
    setOtpValue(value);
  }, []);

  const handleContinueClick = useCallback(() => {
    console.log("OTP:", otpValue);
  }, [otpValue]);

  const handleTryAgainClick = useCallback(() => {
    console.log("A new OTP has been sent.");
    toast({
      title: "A new one time password has been sent.",
      description: "Please check your email.",
    });
  }, [toast]);

  const handleBackToLoginClick = useCallback(() => {
    setStep("initial");
    setOtpValue("");
  }, []);

  const onSubmit = (data: FormData) => {
    console.log(data);
    setStep("otpInput");
  };

  return (
    <Login
      step={step}
      email={emailRegister as UseFormRegisterReturn<"email">}
      otpValue={otpValue}
      onEmailClick={handleEmailClick}
      onGitHubClick={handleGitHubClick}
      onGoogleClick={handleGoogleClick}
      onOtpChange={handleOtpChange}
      onContinueClick={handleContinueClick}
      onTryAgainClick={handleTryAgainClick}
      onBackToLoginClick={handleBackToLoginClick}
      isEmailValid={isValid}
      emailError={errors.email?.message}
    />
  );
}
