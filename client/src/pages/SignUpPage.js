// File for sign-up page

import SignupComponent from "../components/signupComponent";
import StrictNavOnAuth from "../components/StrictNavOnAuth";

export default function SignUpPage(props) {
  const { isLoggedIn } = props;

  return (
    <>
      <SignupComponent />
      <StrictNavOnAuth isLoggedIn={isLoggedIn} page="Login" />
    </>
  );
}
