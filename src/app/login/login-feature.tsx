'use client'

import { useEffect, useState, useCallback } from 'react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { useToast } from '@/components/shadcn/use-toast'
import { getBackendURL } from '@/lib/utils'
import { useLocalAuth, useLocalAuthVerify } from '@/lib/queries/auth.queries'
import Login from './login-ui'
import { redirect, useRouter } from 'next/navigation'
import { useKeyPress } from '@/lib/hook/use-key-press'

interface FormData {
  email: string
}

export default function LoginFeature() {
  const [step, setStep] = useState<'initial' | 'emailInput' | 'otpInput'>('initial')
  const [otpValue, setOtpValue] = useState('')
  const { toast } = useToast()
  const router = useRouter()

  const { mutate: sendEmail } = useLocalAuth()
  const { mutate: verifyEmail, data: verified } = useLocalAuthVerify()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  })

  const emailRegister = register('email', {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  })

  const onSubmit = useCallback(
    (data: FormData) => {
      console.log(data)
      sendEmail(data.email)
      localStorage.setItem('email', data.email)
      setStep('otpInput')
    },
    [sendEmail]
  )

  const handleEmailClick = useCallback(() => {
    if (step === 'initial') {
      setStep('emailInput')
    } else if (step === 'emailInput' && isValid) {
      handleSubmit(onSubmit)()
    }
  }, [step, isValid, handleSubmit, onSubmit])

  const handleGitHubClick = useCallback(() => {
    console.log('GitHub')
    window.location.href = getBackendURL() + '/auth/github'
  }, [])

  const handleGoogleClick = useCallback(() => {
    console.log('CGoogle')

    window.location.href = getBackendURL() + '/auth/google'
  }, [])

  const handleOtpChange = useCallback((value: string) => {
    setOtpValue(value)
  }, [])

  const handleContinueClick = useCallback(() => {
    console.log('OTP:', otpValue)
    const email = localStorage.getItem('email')
    if (!email) {
      console.error('Email not found in local storage.')
      return
    }
    localStorage.removeItem('email')
    verifyEmail({ email: email, token: otpValue })
  }, [otpValue, verifyEmail])

  const handleTryAgainClick = useCallback(() => {
    console.log('A new OTP has been sent.')
    toast({
      title: 'A new one time password has been sent.',
      description: 'Please check your email.',
    })
  }, [toast])

  const handleBackToLoginClick = useCallback(() => {
    setStep('initial')
    setOtpValue('')
  }, [])

  const handleEscapeKeyPress = useCallback(
    (e: KeyboardEvent) => {
      console.log('Delete key pressed')
      e.preventDefault()
      router.push('/')
    },
    [router]
  )

  useKeyPress('Escape', handleEscapeKeyPress);

  useEffect(() => {
    if (verified) {
      console.log('Verified:', verified)
      toast({
        title: 'You have been verified.',
      })

      redirect('/mygist')
    }
  }, [verified, toast])

  return (
    <Login
      step={step}
      email={emailRegister as UseFormRegisterReturn<'email'>}
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
  )
}
