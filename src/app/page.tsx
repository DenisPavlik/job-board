import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import {
  getSignInUrl,
  getSignUpUrl,
  getUser,
  signOut,
} from '@workos-inc/authkit-nextjs';

export default async function Home() {

  // Get the URL to redirect the user to AuthKit to sign up
  const signUpUrl = await getSignUpUrl();
  return (
    <>

    
      <Hero />
      <Jobs />
    </>
  );
}
