import React, { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/shadcn/button"
import { Input } from "@/components/shadcn/input"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/shadcn/input-otp"
import { UseFormRegisterReturn } from "react-hook-form"
import { Icon } from "@iconify/react"
import { useKeyPress } from "@/lib/hook/use-key-press"

interface LoginProps {
  step: "initial" | "emailInput" | "otpInput"
  email: UseFormRegisterReturn<"email">
  otpValue: string
  onEmailClick: () => void
  onGitHubClick: () => void
  onGoogleClick: () => void
  onOtpChange: (value: string) => void
  onContinueClick: () => void
  onTryAgainClick: () => void
  onBackToLoginClick: () => void
  isEmailValid: boolean
  emailError?: string
}

export default function Login({
  step,
  email,
  otpValue,
  onEmailClick,
  onGitHubClick,
  onGoogleClick,
  onOtpChange,
  onContinueClick,
  onTryAgainClick,
  onBackToLoginClick,
  isEmailValid,
  emailError,
}: LoginProps) {
  const inputRef = useRef(null)
  const otpContainerRef = useRef(null)
  const loginContainerRef = useRef(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    setShouldAnimate(true)
  }, [])

  useEffect(() => {
    if (!shouldAnimate) return

    if (step === "emailInput" && inputRef.current) {
      gsap.fromTo(inputRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" })
    }

    if (step === "otpInput" && otpContainerRef.current) {
      gsap.fromTo(
        otpContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
    }

    if (step === "initial" && loginContainerRef.current) {
      gsap.fromTo(
        loginContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      )
    }
  }, [step, shouldAnimate])

  const handleBackToLogin = () => {
    setIsAnimating(true)
    gsap.to(otpContainerRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        onBackToLoginClick()
        setIsAnimating(false)
      },
    })
  }

  const renderContent = () => {
    if (step === "otpInput") {
      return (
        <div ref={otpContainerRef} className="flex flex-col justify-center items-center gap-8 p-2">
          <h2>Check your email</h2>
          <div className="flex flex-col text-center gap-2">
            <span>We&apos;ve sent a temporary login code.</span>
            <span>
              Please check your inbox at <b>{email.name}</b>
            </span>
          </div>
          <div className="flex flex-col gap-8">
            <InputOTP maxLength={6} value={otpValue} onChange={onOtpChange}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
              </InputOTPGroup>
              <InputOTPSeparator className="hidden md:block" />
              <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
              <InputOTPSeparator className="hidden md:block" />
              <InputOTPGroup>
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button onClick={onContinueClick} className="w-full">
              Continue
            </Button>
          </div>
          <span>
            Nothing received ?{" "}
            <Button onClick={onTryAgainClick} variant={"link"} size={"no-padding"} className="text-primary underline">
              Try again !
            </Button>
          </span>
          <Button
            onClick={handleBackToLogin}
            variant={"link"}
            size={"no-padding"}
            className="text-slate-500 font-bold hover:no-underline"
            disabled={isAnimating}
          >
            Back to login
          </Button>
        </div>
      )
    }

    return (
      <div ref={loginContainerRef} className="flex flex-col justify-center items-center gap-8 w-96 p-2">
        <h2>Log in to Gists</h2>
        <div className="flex flex-col gap-4 w-full">
          {step === "emailInput" && (
            <div ref={inputRef} style={{ opacity: shouldAnimate ? 0 : 1 }}>
              <Input type="email" placeholder="Enter your email address..." {...email} />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>
          )}
          <Button onClick={onEmailClick} disabled={step === "emailInput" && !isEmailValid}>
            Continue with email
          </Button>
          {step === "emailInput" && <div className="h-[1px] w-full bg-slate-800"></div>}

          <Button variant={"secondary"} onClick={onGitHubClick} className="gap-1">
            <Icon icon="mdi:github" width={22} height={22} />
            Continue with GitHub
          </Button>
          <Button variant={"secondary"} onClick={onGoogleClick} className="gap-1">
            <Icon icon="mdi:google" width={18} height={18} />
            Continue with Google
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-full flex justify-center items-center">
      <div className="absolute top-4 right-12 cursor-pointer">{/* <ThemeSwitch /> */}</div>
      {renderContent()}
    </div>
  )
}
