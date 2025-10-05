import { inngest } from "./client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";
import { sendWelcomeEmail } from "../nodemailer";

export const sendSignupEmail = inngest.createFunction(
   {id: "sign-up-email"},
{event: 'app/user.created'},
async ({event,step}) => {
   const userProfile = `
      - Country: ${event.data.country || 'N/A'}
      - Investment Goals: ${event.data.investmentGoals || 'N/A'}
      - Risk Tolerance: ${event.data.riskTolerance || 'N/A'}
      - Preferred Industries: ${event.data.preferredIndustries || 'N/A'}
   `;

   const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace("{{userProfile}}", userProfile);

   const response = await step.ai.infer('generate-welcome-intro', {
      model: step.ai.models.gemini({model: 'gemini-2.5-flash'}), 
      body: {
         contents: [
            {
               role: 'user',
               parts: [{text: prompt}]
            }
         ]
      }
   })

   await step.run('send-welcome-email', async () => {
      const part = response.candidates?.[0]?.content?.parts?.[0];
      const introText = (part && 'text' in part ? part.text : null) || "Welcome to Signalist! We're excited to have you on board.";

      const {data: {email,name}} = event;
      //email sending logic
      return await sendWelcomeEmail({email,name,intro: introText})
   })

   return {
      success: true,
      message: 'Welcome email process initiated.'
   }
})