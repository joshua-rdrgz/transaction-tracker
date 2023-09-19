import { AuthPageLayout } from '@/ui/auth-page-layout';
import { SignupForm } from '@/features/auth/SignupForm';

export default function SignupPage() {
  return (
    <AuthPageLayout
      formTitle='Welcome!'
      formSubtitle='Please enter your details to sign up.'
      formComponent={<SignupForm />}
      footerLabel='Already registered?'
      footerLinkLabel='Sign in here'
      footerLinksTo='/login'
    />
  );
}
