// Packages
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

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
import Animated from "components/animation/Animated";

// Redux
import { signup, login } from "redux/Auth/api";
import { RESET_PAGE } from "redux/Auth/actionCreators";

// Utils
import R from "utils/getResponsiveValue";

// Constants
import colors from "constants/colors";

// Animation
import {signupHeadingAnimation} from "Animations/signUp/SignupAnimation";
import Loader from "components/loaders/Loader";
import {useAuth} from "../../context/authContext";

export default function SignUp(props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoginPage, setIsLoginPage] = useState(props.isLoginPage);
  const [disabled, setDisabled] = useState(true);
  const [isPasswordType, setIsPasswordType] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoginPasswordType, setIsLoginPasswordType] = useState(true);
  const [loginDisabled, setLoginDisabled] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [signUpError, setSignUpError] = useState(false);

  // Gender States
  const [selectedGender, setSelectedGender] = useState({value: ''});

  const { isAuthenticated } = useAuth();

  /*** Sign Up Flow:Starts ****/
  const validateSignUp = () => {
    if (
      firstName &&
      lastName &&
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

  const handleSignUpNext = async () => {
    let userObj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: selectedGender.value,
      dob: dateOfBirth,
      password: password,
    };
    let {success, msg}  = await dispatch(signup(userObj));

    if (success) {
      setSignUpError(false);
      localStorage.setItem("email", email);
      toast.success(msg, {
        onClose: () => router.push("/confirm_your_account"),
      });
    } else {
      setSignUpError(msg);
      toast.error(msg);
    }

  };

  /*** Sign In Flow:Starts ****/
  const validateSignIn = () => {
    if (loginEmail && loginPassword) {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }
  };

  const handleSignInNext = async () => {
    let loginObj = {
      email: loginEmail,
      password: loginPassword,
    };
    let {success, msg} = await dispatch(login(loginObj));

    if (success) {
      setError(false);
      toast.success( msg, {onClose: () => router.push("/select_club"),});
    } else {
      setError(msg);
      toast.error(msg, {
        onClose: () =>
          dispatch({
            type: RESET_PAGE,
          }),
      });
    }
  };

  // Validations
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
    firstName,
    email,
    selectedGender.value,
    dateOfBirth,
    password,
    loginEmail,
    loginPassword,
  ]);

  if(isAuthenticated) { return <Loader/> }

  return (
    <Layout title="Sign Up" showToast>
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
              <Text fs={32}  lh={40} text={'sign'} tt={'uppercase'} fst={'italic'} fw={800} color={colors.black_rock}/>
              <Animated toggleAnimation={isLoginPage} animationSpeed={0.2}>
                  <Text
                      w={50}
                      fs={32}
                      lh={40}
                      text={`${isLoginPage ? 'IN': 'UP'}`}
                      tt={'uppercase'}
                      fst={'italic'}
                      fw={800}
                      color={colors.black_rock}
                      ml={7}
                  />
              </Animated>
            </Div>

            <Div className="flex justify-center relative w-full" mb={55}>
              {isLoginPage ? (
                <AnimatePresence>
                  <motion.p
                    className="absolute signup-heading"
                    variants={signupHeadingAnimation()}
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
                    variants={signupHeadingAnimation()}
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
                    name="firstName"
                    id="firstName"
                    placeholder="First name"
                    onChange={(v) => {
                      setFirstName(v);
                    }}
                    value={firstName}
                    autoCompleteOff
                  />
                  <Input
                    name="lastName"
                    id="lastName"
                    placeholder="Last name"
                    onChange={(v) => {
                      setLastName(v);
                    }}
                    value={lastName}
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
              <Div center mb={60}>
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
