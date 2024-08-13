<<<<<<< HEAD
"use client";

import { useEffect, useState, useCallback } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { useToast } from "@/components/shadcn/use-toast";
import { getBackendURL } from "@/lib/utils";
import { useLocalAuth } from "@/lib/queries/auth.queries";
import Login from "./login-ui";

interface FormData {
  email: string;
}

export default function LoginFeature() {
  const [step, setStep] = useState<"initial" | "emailInput" | "otpInput">(
    "initial",
  );
  const [otpValue, setOtpValue] = useState("");
  const { toast } = useToast();

  const { mutate: sendEmail } = useLocalAuth();
  // const { mutate: verifyEmail, data: verified } = useLocalAuthVerify();
=======
'use client'

import { useState, useCallback } from 'react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { useToast } from '@/components/shadcn/use-toast'
import Login from './login'

interface FormData {
  email: string
}

export default function LoginFeature() {
  const [step, setStep] = useState<'initial' | 'emailInput' | 'otpInput'>('initial')
  const [otpValue, setOtpValue] = useState('')
  const { toast } = useToast()
>>>>>>> 2a5eedf (style(GIST-19): update gists layout)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
<<<<<<< HEAD
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
    const email = localStorage.getItem("email");
    if (!email) {
      console.error("Email not found in local storage.");
      return;
    }
    localStorage.removeItem("email");
    // verifyEmail({ email: email, token: otpValue });
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
    sendEmail(data.email);
    localStorage.setItem("email", data.email);
    setStep("otpInput");
  };

  // useEffect(() => {
  //   if (verified) {
  //     console.log("Verified:", verified);
  //     toast({
  //       title: "You have been verified.",
  //     });
  //
  //     redirect("/dashboard");
  //   }
  // }, [verified, toast]);
=======
    mode: 'onChange',
  })

  const emailRegister = register('email', {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  })

  const handleEmailClick = useCallback(() => {
    if (step === 'initial') {
      setStep('emailInput')
    } else if (step === 'emailInput' && isValid) {
      handleSubmit(onSubmit)()
    }
  }, [step, isValid, handleSubmit])

  const handleGitHubClick = useCallback(() => {
    console.log('GitHub')
  }, [])

  const handleGoogleClick = useCallback(() => {
    console.log('CGoogle')
  }, [])

  const handleOtpChange = useCallback((value: string) => {
    setOtpValue(value)
  }, [])

  const handleContinueClick = useCallback(() => {
    console.log('OTP:', otpValue)
  }, [otpValue])

  const handleTryAgainClick = useCallback(() => {
    console.log('A new OTP has been sent.')
    toast({ title: 'A new one time password has been sent.', description: 'Please check your email.' })
  }, [toast])

  const handleBackToLoginClick = useCallback(() => {
    setStep('initial')
    setOtpValue('')
  }, [])

  const onSubmit = (data: FormData) => {
    console.log(data)
    setStep('otpInput')
  }
>>>>>>> 2a5eedf (style(GIST-19): update gists layout)

  return (
    <Login
      step={step}
<<<<<<< HEAD
      email={emailRegister as UseFormRegisterReturn<"email">}
=======
      email={emailRegister as UseFormRegisterReturn<'email'>}
>>>>>>> 2a5eedf (style(GIST-19): update gists layout)
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
<<<<<<< HEAD
  );
=======
  )
>>>>>>> 2a5eedf (style(GIST-19): update gists layout)
}
