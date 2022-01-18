// Packages
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Layout from "components/layout";
import Button from "components/html/Button";
import { useRouter } from "next/router";
import Input from "components/inputs/input";
import SelectInput from "components/inputs/SelectInput";
import ResetPasswordModal from "components/modals/ResetPasswordModal";
import { createUser, loginUser } from "../../redux/api/auth";

// Utils
import R from "utils/getResponsiveValue";
import { clone } from "utils/helpers";

// Constants
import { GENDERS } from "constants/data/user";

const testEmail = "martine.bakkergmail.com";
const testPassword = testEmail;

export default function SignUp(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const successSignUp = useSelector(({ auth }) => auth.signUpSuccess);
  const errorSignUp = useSelector(({ auth }) => auth.signUpError);

  const successLogin = useSelector(({ auth }) => auth.loginSuccess);
  const errorLogin = useSelector(({ auth }) => auth.loginError);

  const GENDERS_INITIAL = clone(GENDERS);

  const [isLoginPage, setIsLoginPage] = useState(props.isLoginPage);
  const [initialOpacity, setInitialOpacity] = useState(1);
  const [disabled, setDisabled] = useState(true);
  const [isPasswordType, setIsPasswordType] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoginPasswordType, setIsLoginPasswordType] = useState(true);
  const [loginDisabled, setLoginDisabled] = useState(true);

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  // Gender States
  const [genders, setGenders] = useState([...GENDERS_INITIAL]);
  const [selectedGender, setSelectedGender] = useState(GENDERS_INITIAL[0]);

  const duration = 0.2;

  const fadeInOutAnimation = {
    initial: {
      opacity: initialOpacity, // Starting point we set initial opacity in state, so that on initial render it is one, but after the subsequent click we want it to be 0, to have fade in effect
    },
    animate: {
      opacity: 1,
      transition: {
        duration: duration,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: duration,
      },
    },
  };

  /*** Sign Up Flow:Starts ****/
  const validateSignUp = () => {
    if (
      fullName &&
      email &&
      selectedGender.value &&
      selectedGender.value !== GENDERS_INITIAL[0].value &&
      dateOfBirth &&
      password
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleSignUpNext = () => {
    //Calling signup Mutation API
    let userObj = {
      fullName: fullName,
      email: email,
      gender: selectedGender.value,
      dob: dateOfBirth,
      password: password,
    };
    dispatch(createUser(userObj));
  };

  useEffect(() => {
    //Mutation API response
    if (successSignUp) {
      setSignUpError(false);
      toast.success(successSignUp, {
        onClose: () => router.push("/confirm_your_account"),
      });
    } else if (errorSignUp) {
      setSignUpError(errorSignUp);
      toast.error(errorSignUp);
    }
  }, [successSignUp, errorSignUp]);

  /*** Sign Up Flow:Ends ****/

  /*** Sign In Flow:Starts ****/
  const validateSignIn = () => {
    if (loginEmail && loginPassword) {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  };

  const handleSignInNext = () => {
    let loginObj = {
      email: loginEmail,
      password: loginPassword,
    };
    dispatch(loginUser(loginObj));
    // if (loginEmail === testEmail && loginPassword === testPassword) {
    //   setError(false);
    //   router.push("/select_club");
    // } else {
    //   setError(true);
    // }
  };

  useEffect(() => {
    //Login Query API response
    if (successLogin) {
      setError(false);
      toast.success(successLogin, {
        onClose: () => router.push("/select_club"),
      });
    } else if (errorLogin) {
      setError(errorLogin);
      toast.error(errorLogin);
    }
  }, [successLogin, errorLogin]);
  /*** Sign Up Flow:Ends ****/

  const validate = () => {
    if (isLoginPage) {
      validateSignIn();
    } else {
      validateSignUp();
    }
  };

  const handleOnClick = () => {
    if (isLoginPage) {
      handleSignInNext();
    } else {
      handleSignUpNext();
    }
  };

  useEffect(() => {
    validate();
  }, [
    fullName,
    email,
    selectedGender.value,
    dateOfBirth,
    password,
    loginEmail,
    loginPassword,
  ]);

  useEffect(() => {
    if (initialOpacity) {
      setInitialOpacity(0);
    }
  }, [isLoginPage]);

  return (
    <Layout title="Sign Up">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="mx-auto bg-white">
        <div className="grid grid-cols-2 flex h-screen">
          <div
            className={`bg-[url('/images/bg-blue.png')] bg-[length:100%_100%] bg-no-repeat sm:block relative`}
            style={{
              minHeight: R(),
            }}
          >
            <div className="h-screen relative">
              <div
                className="flex flex-col"
                style={{
                  paddingLeft: R(80),
                  paddingRight: R(80),
                }}
              >
                <p
                  className={`text-white italic font-black uppercase`}
                  style={{
                    fontSize: R(50),
                    lineHeight: R(54, "px"),
                    marginTop: R(90),
                  }}
                >
                  explore Eredivisie <br />
                  fantasy league
                </p>
                <p
                  className="text-white opacity-70 normal"
                  style={{
                    fontSize: R(18),
                    lineHeight: R(26, "px"),
                    marginTop: R(20),
                    paddingBottom: R(50),
                  }}
                >
                  Be in the role of a Fantasy manager and lead dream team!{" "}
                  <br />
                  Absolutely free, absolutely immersive experience.
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 w-[100%]">
              <img src="/images/players.png" alt="" className="w-[100%]" />
            </div>
          </div>
          <div
            className={`flex flex-col items-center pt-[6.2rem] ${
              isLoginPage ? "mb-[21.8rem]" : "mb-[8.8rem]"
            }`}
          >
            <img
              src="/images/fantasy_15.png"
              alt=""
              className="w-[11rem] h-[2.6rem] mb-[4.7rem]"
            />
            <div className="flex justify-center relative">
              <p className="ml-[-5rem] title">SIGN</p>

              {isLoginPage ? (
                <AnimatePresence>
                  <motion.p
                    className="in-up"
                    variants={fadeInOutAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={1} // This key thing is important for simultaneous fadein & fadeout
                  >
                    IN
                  </motion.p>
                </AnimatePresence>
              ) : (
                <AnimatePresence>
                  <motion.p
                    className="in-up"
                    variants={fadeInOutAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={2}
                  >
                    up
                  </motion.p>
                </AnimatePresence>
              )}
            </div>

            <div className="flex justify-center relative mb-[5.5rem] w-full">
              {isLoginPage ? (
                <AnimatePresence>
                  <motion.p
                    className="absolute signup-heading"
                    variants={fadeInOutAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={1} // This key thing is important for simultaneous fadein & fadeout
                  >
                    Please enter your email and password to sign in
                  </motion.p>
                </AnimatePresence>
              ) : (
                <AnimatePresence>
                  <motion.p
                    className="absolute signup-heading"
                    variants={fadeInOutAnimation}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={2}
                  >
                    {`Complete a simple form below and click "Next"`}
                  </motion.p>
                </AnimatePresence>
              )}
            </div>
            <div className="flex flex-col md:w-[41rem]">
              {isLoginPage && (
                <div>
                  <Input
                    name="loginEmail"
                    id="loginEmail"
                    placeholder="Email address"
                    onChange={(v) => setLoginEmail(v)}
                    value={loginEmail}
                  />
                  <Input
                    name="loginPassword"
                    id="loginPassword"
                    type={isLoginPasswordType ? "password" : "text"}
                    placeholder="Enter your password"
                    icon={isLoginPasswordType ? "eye.png" : "hide.png"}
                    onChange={(v) => setLoginPassword(v)}
                    onIconClick={() =>
                      setIsLoginPasswordType(!isLoginPasswordType)
                    }
                    value={loginPassword}
                    style={{ paddingRight: R(70) }}
                  />
                  <div className={`${error ? "mb-[3.2rem]" : "mb-[10.5rem]"}`}>
                    <p
                      className={`text-mandy text-[1.4rem] font-[600] cursor-pointer`}
                      onClick={() => setShowModal(true)}
                    >
                      Forget password?
                    </p>
                    <ResetPasswordModal
                      show={showModal}
                      onClose={() => setShowModal(!showModal)}
                    />
                  </div>
                  {error && (
                    <p className="text-center font-[600] text-[1.4rem] leading-[2rem] text-bean_red mb-[3.2rem]">
                      Your email or password is incorrect. <br />
                      Please enter valid credentials to sign in
                    </p>
                  )}
                </div>
              )}

              {!isLoginPage && (
                <div className="mb-[3rem]">
                  <Input
                    name="fullName"
                    id="fullName"
                    placeholder="Full name"
                    onChange={(v) => {
                      setFullName(v);
                    }}
                    value={fullName}
                  />
                  <Input
                    value={email}
                    name="email"
                    id="email"
                    placeholder="Email address"
                    onChange={(v) => setEmail(v)}
                  />
                  <div className="grid grid-cols-2 gap-[2.4rem]">
                    <SelectInput
                      name="gender"
                      id="gender"
                      placeholder="Gender"
                      options={genders}
                      selectedOption={selectedGender}
                      default
                      skipFirstOption={true}
                      onOptionChange={(option) => setSelectedGender(option)}
                    />
                    <Input
                      value={dateOfBirth}
                      name="dateOfBirth"
                      id="dateOfBirth"
                      placeholder="Date of birth"
                      onChange={(v) => setDateOfBirth(v)}
                    />
                  </div>
                  <Input
                    value={password}
                    name="password"
                    id="password"
                    type={isPasswordType ? "password" : "text"}
                    placeholder="Enter your password"
                    icon={isPasswordType ? "eye.png" : "hide.png"}
                    onChange={(v) => setPassword(v)}
                    onIconClick={() => setIsPasswordType(!isPasswordType)}
                    style={{ paddingRight: R(70) }}
                  />
                </div>
              )}

              {signUpError && (
                <p className="text-center font-[600] text-[1.4rem] leading-[2rem] text-bean_red mb-[3.2rem]">
                  {signUpError}
                </p>
              )}

              <Button
                title="Next"
                onClick={handleOnClick}
                disabled={isLoginPage ? loginDisabled : disabled}
                mb={40}
              />
              <p className="text-regent_grey text-[1.6rem] font-[400] leading-[2rem] text-center">
                {isLoginPage
                  ? "Don’t have an account?"
                  : "Already have an account?"}
                <span
                  className="text-brick_red font-[600] cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLoginPage(!isLoginPage);
                  }}
                >
                  {isLoginPage ? " Sign Up" : " Sign In"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
