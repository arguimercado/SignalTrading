'use client'
import FooterLink from '@/components/commons/forms/FooterLink';
import InputField from '@/components/commons/forms/InputField';
import { Button } from '@/components/ui/button';
import React from 'react'
import { useForm } from 'react-hook-form'



const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur'
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log(data);
    }catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
      <h1 className='form-title'>Sign in to your account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <InputField 
          name='email'
          label='Email Address'
          placeholder='jhondoe@gmail.com'
          register={register}
          error={errors.email}
          validation={{required: 'Email is required', pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Invalid email address'}}}
        />
        <InputField 
          name='password'
          label='Password'
          type='password'
          placeholder='Enter strong password'
          register={register}
          error={errors.password}
          validation={{required: 'Password is required', minLength: {value: 6, message: 'Password must be at least 6 characters long'}}}
        />
      
        <Button type='submit' disabled={isSubmitting} className='yellow-btn w-full mt-5' size='sm'>
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>

        <FooterLink text="Don't have an account?" linkText="Sign up" href="/sign-up" />
      </form>

    </>
  )
}
export default SignIn
