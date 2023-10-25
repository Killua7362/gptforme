import {ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn, } from "@clerk/clerk-react";

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
import BasePage from '@components/BasePage'
const App = () => {
  return (
    <div>
      <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <BasePage />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>      
      </ClerkProvider>
    </div>
    );
}
 
export default App;