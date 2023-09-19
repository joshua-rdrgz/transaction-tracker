import { AuthPageLayout } from '@/ui/auth-page-layout';
import { LoginForm } from '@/features/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthPageLayout
      formTitle='Welcome back!'
      formSubtitle='Please enter your credentials to log in.'
      formComponent={<LoginForm />}
      footerLabel="Haven't registered?"
      footerLinkLabel='Signup here'
      footerLinksTo='/signup'
    />
  );
}
