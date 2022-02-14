// Packages
import React, { useEffect, useRef, useState } from "react";
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
import Text from "components/html/Text"
import Div from "components/html/Div"
import Image from "components/html/Image";
import ResetPasswordModal from "components/modals/ResetPasswordModal";
import MyDatepicker from "components/datePicker/MyDatePicker";
import GenderDropDown from "components/signUp/GenderDropDown";

// Redux
import { createUser, loginUser } from "redux/Auth/api";
import { RESET_PAGE } from "redux/Auth/actions";

// Utils
import R from "utils/getResponsiveValue";
import { clone } from "utils/helpers";

// Constants
import colors from "constants/colors";


const testEmail = "martine.bakkergmail.com";
const testPassword = testEmail;

export default function SignUp(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  
  const successSignUp = useSelector(({ auth }) => auth.signUpSuccess);
  const errorSignUp = useSelector(({ auth }) => auth.signUpError);

  const successLogin = useSelector(({ auth }) => auth.loginSuccess);
  const errorLogin = useSelector(({ auth }) => auth.loginError);

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
  const [selectedGender, setSelectedGender] = useState({value: ''});

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
      //store user email
      localStorage.setItem("email", email);
      toast.success("Signed Up successfully!", {
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
      toast.success("Login successfull! Redirecting...", {
        onClose: () => router.push("/select_club"),
      });
    } else if (errorLogin) {
      setError(errorLogin);
      toast.error(errorLogin, {
        onClose: () =>
          dispatch({
            type: RESET_PAGE,
          }),
      });
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
        <div className="grid grid-cols-2 flex">
          {/*Left Section*/}
          <div className={`bg-[url('/images/bg-blue.png')] bg-[length:100%_100%] bg-no-repeat sm:block relative`}
            style={{ minHeight: R()}}
          >
            <div className={'flex flex-col justify-between h-full'}>
              <Div pl={80} pr={80} className="flex flex-col">
                <Text text={<span>explore Eredivisie <br/> fantasy league</span>} fs={50} fw={900} lh={54} mt={90}
                      fst={'italic'} tt={'uppercase'} color={colors.white} mb={24}/>

                <Text text={<span> Be in the role of a Fantasy manager and lead dream team! <br/> Absolutely free, absolutely immersive experience.</span>}
                      fs={18} lh={26}
                      color={colors.white} className={'opacity-70'} mb={100}/>
              </Div>

              <Image src={'/images/players.png'} al={'players'} w={'100%'} h={'100%'}/>
            </div>
          </div>


          {/*Right-Section*/}
          <Div className={`flex flex-col items-center`} style={{minHeight: R()}} pb={30} pt={62}>
            <Image src={'/images/fantasy_15.png'} alt={''} w={107} h={26} mb={40}/>

            <Div className="flex justify-center relative" mb={20}>
              <Text fs={32}  lh={40} text={'sign'} tt={'uppercase'} fst={'italic'} fw={800} ml={-50} color={colors.black_rock}/>

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
                    <Text fs={32} lh={40} text={'IN'} tt={'uppercase'} fst={'italic'} fw={800}
                          color={colors.black_rock}/>

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
                    <Text fs={32} lh={40} text={'up'} tt={'uppercase'} fst={'italic'} fw={800}
                          color={colors.black_rock}/>
                  </motion.p>
                </AnimatePresence>
              )}
            </Div>

            <Div className="flex justify-center relative w-full" mb={55}>
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
                    <Text fs={18} lh={26} text={'Please enter your email and password to sign in'}
                          color={colors.regent_grey}/>
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
                    <Text fs={18} lh={26} text={`Complete a simple form below and click "Next"`}
                          color={colors.regent_grey}/>
                  </motion.p>
                </AnimatePresence>
              )}
            </Div>

            <Div className="flex flex-col" w={410}>
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
                  <Div mb={error ? 32 : 105}>
                    <Text
                        text={'Forget password?'}
                        color={colors.mandy}
                        fs={14}
                        fw={600}
                        cursor={'pointer'}
                        onClick={() => setShowModal(true)}
                    />
                    <ResetPasswordModal
                      show={showModal}
                      onClose={() => setShowModal(!showModal)}
                    />
                  </Div>
                  {error && (
                      <Text
                          text={<>
                             Your email or password is incorrect. <br/>
                          Please enter valid credentials to sign in
                          </>}
                          textAlign={'center'}
                          fs={14}
                          lh={20}
                          color={colors.bean_red}
                          mb={32}
                          fw={600}
                      />
                  )}
                </div>
              )}

              {!isLoginPage && (
                <Div mb={30}>
                  <Input
                    name="fullName"
                    id="fullName"
                    placeholder="Full name"
                    onChange={(v) => {
                      setFullName(v);
                    }}
                    value={fullName}
                    autoCompleteOff
                  />
                  <Input
                    value={email}
                    name="email"
                    id="email"
                    placeholder="Email address"
                    onChange={(v) => setEmail(v)}
                    autoCompleteOff
                  />
                  <Div className="flex items-center justify-center" mb={32}>
                    <Div w={'50%'} mr={12}>

                      <GenderDropDown
                          selectedGender={selectedGender}
                          setSelectedGender={setSelectedGender}
                      />
                    </Div>
                    <Div w={'50%'} ml={12}>
                      <MyDatepicker
                          dateOfBirth={dateOfBirth}
                          setDateOfBirth={(dob) => setDateOfBirth(dob)}
                      />
                    </Div>
                  </Div>
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
                    autoCompleteOff
                  />
                </Div>
              )}
              {signUpError && (
                  <Text
                      text={signUpError}
                      textAlign={'center'}
                      fs={14}
                      lh={20}
                      color={colors.bean_red}
                      mb={32}
                      fw={600}
                  />
              )}

              <Button
                title="Next"
                onClick={handleOnClick}
                disabled={isLoginPage ? loginDisabled : disabled}
                mb={40}
              />
              <Div center>
                <Text fs={16} lh={20} fw={400} text={isLoginPage ? 'Don’t have an account?' : 'Already have an account?'} color={colors.regent_grey}/>
                <Text fs={16} lh={20} fw={800} ml={5}
                      text={isLoginPage ? 'Sign Up' : 'Sign In'} color={colors.mandy} cursor={'pointer'}
                      onClick={() => { setIsLoginPage(!isLoginPage)}}
                />
              </Div>
            </Div>
          </Div>
        </div>
      </div>
    </Layout>
  );
}
