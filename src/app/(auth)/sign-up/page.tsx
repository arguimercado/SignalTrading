'use client'
import CountrySelectField from '@/components/commons/forms/CountrySelectField';
import FooterLink from '@/components/commons/forms/FooterLink';
import InputField from '@/components/commons/forms/InputField';
import SelectField from '@/components/commons/forms/SelectField';
import { Button } from '@/components/ui/button';
import { signupWithEmail } from '@/lib/actions/auth.action';
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';



const SignUp = () => {

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: {errors, isSubmitting},
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      country: 'PHL',
      investmentGoals: 'Growth',
      riskTolerance: 'Medium',
      preferredIndustry: 'Technology',
    },
    mode: 'onBlur'
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const result = await signupWithEmail(data);
      if(result.success) router.push('/');

    }
    catch (error) {
      toast.error('Error signing up. Please try again.',{
        description: error instanceof Error ? error.message : 'Failed to create an account.',
      });
    }
  }
  
  return (
    <>
      <h1 className='form-title'>Sign up and Personalize</h1>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <InputField 
          name='fullName'
          label='Full Name'
          placeholder='John Doe'
          register={register}
          error={errors.fullName}
          validation={{required: 'Fullname is required', minLength: {value: 2, message: 'Fullname must be at least 2 characters long'}}}
        />
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
        {/* Country */}
        <CountrySelectField 
          name='country'
          label='Country'
          placeholder='Select your country'
          control={control}
          error={errors.country}
          required
        />
        {/* Investment Goals */}
        <SelectField 
          name='investmentGoals'
          label='Investment Goals'
          placeholder='Select your investment goals'
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required
        />

        {/* Risk Tolerance */}
         <SelectField 
          name='riskTolerance'
          label='Risk Tolerance'
          placeholder='Select your risk level'
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required
        />
        {/* Preferred Industry */}
        <SelectField 
          name='preferredIndustry'
          label='Preferred Industry'
          placeholder='Select your preferred industry'
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required
        />
        <Button type='submit' disabled={isSubmitting} className='yellow-btn w-full mt-5' size='sm'>
          {isSubmitting ? 'Creating Account...' : 'Start your investing journey'}
        </Button>

        <FooterLink text="Already have an account?" linkText="Log in" href="/sign-in" />
      </form>

    </>
  )
}
export default SignUp
