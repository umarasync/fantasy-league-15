// Packages
import {useEffect, useRef, useState} from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from 'framer-motion'

// Components
import Layout from "components/layout";
import PrimaryButton from "components/buttons/primaryButton";
import {useRouter} from "next/router";
import Input from "components/inputs/input";
import SelectInput from "components/inputs/selectInput";
import ResetPasswordModal from "components/modals/resetPasswordModal";
import useResize from "../../hooks/useResize";

const defaultBGImage = 'bg-blue.png'

const initialValue = 'Select'

const options = [
  {
    name: 'Male',
    value: 'male'
  },
  {
    name: 'Female',
    value: 'female'
  }
]

const testEmail = 'martine.bakkergmail.com'
const testPassword = testEmail

export default function SignUp(props) {
  const router = useRouter()
  const headingBoxRef = useRef()
  const { width: headingBoxWidth } = useResize(headingBoxRef)

  const [isLoginPage, setIsLoginPage] = useState(props.isLoginPage)
  const [initialOpacity, setInitialOpacity] = useState(1)
  const [disabled, setDisabled] = useState(true)
  const [isPasswordType, setIsPasswordType] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [isLoginPasswordType, setIsLoginPasswordType] = useState(true)
  const [loginDisabled, setLoginDisabled] = useState(true)

  const [fullName, setFullName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState({
    name:'',
    value: ''
  })
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false)


  const duration = 0.2

  const fadeInOutAnimation = {
    initial: {
      opacity: initialOpacity, // Starting point we initial it in state, so that on initial render it is one, but after the subsequent click we want it to be 0, to have fade in effect
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
    if(fullName && email && gender.value && gender.value !== initialValue && dateOfBirth && password){
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }

  const handleSignUpNext = () => {
    router.push('/confirm_your_account')
  }

  /*** Sign Up Flow:Ends ****/

  /*** Sign In Flow:Starts ****/
  const validateSignIn = () => {
    if(loginEmail && loginPassword){
      setLoginDisabled(false)
    } else {
      setLoginDisabled(true)
    }
  }

  const handleSignInNext = () => {
    if(loginEmail === testEmail && loginPassword === testPassword){
      setError(false)
      router.push('/select_club')
    } else {
      setError(true)
    }
  }
  /*** Sign Up Flow:Ends ****/

  const validate = () => {
    if(isLoginPage) {
      validateSignIn()
    }else {
      validateSignUp()
    }
  }

  const handleOnClick = () => {
    if(isLoginPage) {
      handleSignInNext()
    }else {
      handleSignUpNext()
    }
  }

  const getResponsiveValue = (containerWidth, value) => {
      return containerWidth / value
  }

  useEffect(() => {
    validate()
  }, [fullName, email, gender.value, dateOfBirth, password, loginEmail, loginPassword])

  useEffect(() => {
      if(initialOpacity) {
        setInitialOpacity(0)
      }
  }, [isLoginPage])


  return (
      <Layout
          title="Sign Up"
      >
        <div className="mx-auto bg-white">
          <div className="grid grid-cols-2 flex h-screen">

            <div
                className={`bg-[url('/images/bg-blue.png')] bg-[length:100%_100%] bg-no-repeat hidden sm:block relative`}
            >
              <div className="h-screen relative">
                <div className="flex flex-col w-full sm:pl-[3rem] md:px-[4rem] xl:px-[8rem]" ref={headingBoxRef}>
                  <p
                      className={`text-white mt-[10rem] italic font-black uppercase`}
                      style={{
                        fontSize: getResponsiveValue(headingBoxWidth, 14.4),
                        lineHeight: `${getResponsiveValue(headingBoxWidth, 14)}px`
                      }}
                  >
                   explore Eredivisie <br/>fantasy league
                  </p>
                  <p
                      className="mt-[2rem] text-white text-[1.3rem] opacity-70 normal"
                      style={{fontSize: getResponsiveValue(headingBoxWidth, 40)}}
                  >
                    Be in the role of a Fantasy manager and lead dream team!{" "}
                    <br />
                    Absolutely free, absolutely immersive experience.
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 w-[100%]">
                <img
                    src="/images/players.png"
                    alt=""
                    className="w-[100%]"
                />
              </div>
            </div>
            <div className={`flex flex-col items-center pt-[6.2rem] ${isLoginPage ? 'mb-[21.8rem]' : 'mb-[8.8rem]'}`}>
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
                ): (
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
                ): (
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
              <div className="flex flex-col w-[41rem]">
                {
                  isLoginPage && (
                      <div>
                        <Input
                            name="loginEmail"
                            id="loginEmail"
                            placeholder="Email address"
                            onChange={ v => setLoginEmail(v)}
                            value={loginEmail}
                        />
                        <Input
                            name="loginPassword"
                            id="loginPassword"
                            type={isLoginPasswordType ? 'password': 'text'}
                            placeholder="Enter your password" icon={isLoginPasswordType? 'eye.png': 'hide.png'}
                            onChange={ v => setLoginPassword(v)}
                            onIconClick={() => setIsLoginPasswordType(!isLoginPasswordType)}
                            style={'mb-[1.2rem]'}
                            value={loginPassword}
                        />
                        <div className={`${error ? 'mb-[3.2rem]' : 'mb-[10.5rem]'}`}>
                          <p className={`text-mandy text-[1.4rem] font-[600] cursor-pointer` } onClick={() => setShowModal(true)}>Forget password?</p>
                          <ResetPasswordModal show={showModal} onClose={() => setShowModal(!showModal)}/>
                        </div>
                        { error && <p className="text-center font-[600] text-[1.4rem] leading-[2rem] text-bean_red mb-[3.2rem]">Your email or password is incorrect. <br/>
                          Please enter valid credentials to sign in
                        </p> }
                      </div>
                  )
                }

                {
                  !isLoginPage && (
                      <div className="mb-[3rem]">
                        <Input
                            name="fullName"
                            id="fullName"
                            placeholder="Full name"
                            onChange={ v => {
                              console.log("setting full name", v)
                              setFullName(v)
                            }}
                            value={fullName}
                        />
                        <Input value={email} name="email" id="email" placeholder="Email address" onChange={(v) => setEmail(v)}/>
                        <div className="grid grid-cols-2 gap-[2.4rem]">
                          <SelectInput initialValue={initialValue} default name="gender" id="gender" placeholder="Gender" options={options} setValue={(v) => setGender(v)}/>
                          <Input value={dateOfBirth} name="dateOfBirth" id="dateOfBirth" placeholder="Date of birth" onChange={(v) => setDateOfBirth(v)}/>
                        </div>
                        <Input value={password} name="password" id="password" type={isPasswordType ? 'password': 'text'} placeholder="Enter your password" icon={isPasswordType? 'eye.png': 'hide.png'} onChange={ v => setPassword(v)} onIconClick={() => setIsPasswordType(!isPasswordType)}/>
                      </div>
                  )
                }

                <PrimaryButton
                    title='Next'
                    onClick={handleOnClick}
                    disabled={isLoginPage ? loginDisabled : disabled}
                    style="mb-[4rem]"
                />
                <p className="text-regent_grey text-[1.6rem] font-[400] leading-[2rem] text-center">
                  {isLoginPage ? 'Don’t have an account?' : 'Already have an account?'}
                  <span className="text-brick_red font-[600] cursor-pointer" onClick={(e) => {
                    e.preventDefault()
                    setIsLoginPage(!isLoginPage)
                  }}>
                      {isLoginPage ? ' Sign Up' : ' Sign In'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  );
}
