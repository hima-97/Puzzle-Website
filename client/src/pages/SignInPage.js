// File for sign-in page

import SignInComponent from "../components/signInComponent";
import StrictNavOnAuth from "../components/StrictNavOnAuth";

export default function SignInPage(props) {
  const { isLoggedIn } = props;

  return (
    <>
      <SignInComponent />
      <StrictNavOnAuth isLoggedIn={isLoggedIn} page="Login" />
    </>
  );
}
