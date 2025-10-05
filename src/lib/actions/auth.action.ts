'use server';

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "../inngest/client";
import { headers } from "next/headers";



export const signupWithEmail = async({email,password,fullName,country,investmentGoals,riskTolerance,preferredIndustry}: SignUpFormData) => {
   try {

      const response = await auth.api.signUpEmail({
         body: {
            email,
            password,
            name: fullName,
         }
      });

      if(response) {
         await inngest.send({
            name: 'app/user.created',
            data: {
               email,
               name: fullName,
               country,
               investmentGoals,
               riskTolerance,
               preferredIndustry,
            }
         })
      }

      return {success: true, data: response}
   }catch (error) {
      console.log('Error signing up:', error);
      return {success: false, error: 'Error signing up. Please try again.'}
   }
}

export const signOut = async () => {
   try {
      await auth.api.signOut({headers: await headers()});
   }
   catch (error) {
      console.log('Error signing out:', error);
      return {success: false, error: 'Error signing out. Please try again.'}
   }
}