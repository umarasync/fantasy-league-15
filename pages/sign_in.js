// Packages
import { useRouter } from 'next/router'

// Components
import Input from "components/inputs/input";
import SignUpLayout from "components/layout/signupLayout";
import {useEffect, useState} from "react";
import ResetPasswordModal from "components/modals/resetPasswordModal";

const testEmail = 'martine.bakkergmail.com'
const testPassword = testEmail

export default function SignUp() {

    const router = useRouter()
    const [disabled, setDisabled] = useState(true)
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('')
    const [isPasswordType, setIsPasswordType] = useState(true)
    const [password, setPassword] = useState('')

    const validate = () => {
        if(email && password){
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    const handleOnClick = () => {
        if(email === testEmail && password === testPassword){
            console.log('in ff')
            setError(false)
            router.push('/select_club')
        } else {
            setError(true)
        }
    }


    useEffect(() => {
        validate()
    }, [email, password])


    return (
        <SignUpLayout
            title="sign in"
            heading={`Please enter your email and password to sign in`}
            footerHeading={{
                name: 'Don’t have an account?',
                link: '/',
                buttonTitle: 'Sign Up'
            }}
            onClick={handleOnClick}
            disabled={disabled}
        >
            <div className="flex flex-col w-[41rem]">
                <Input name="email" id="email" placeholder="Email address" onChange={ v => setEmail(v)}/>
                <Input
                    name="password"
                    id="password"
                    type={isPasswordType ? 'password': 'text'}
                    placeholder="Enter your password" icon={isPasswordType? 'eye.png': 'hide.png'}
                    onChange={ v => setPassword(v)}
                    onIconClick={() => setIsPasswordType(!isPasswordType)}
                    style={'mb-[1.2rem]'}
                />
                <div className={`${error ? 'mb-[3.2rem]' : 'mb-[10.5rem]'}`}>
                    <p className={`text-mandy text-[1.4rem] font-[600]` } onClick={() => setShowModal(true)}>Forget password?</p>
                    <ResetPasswordModal show={showModal} onClose={() => setShowModal(!showModal)}/>
                </div>
                { error && <p className="text-center font-[600] text-[1.4rem] leading-[2rem] text-bean_red mb-[3.2rem]">Your email or password is incorrect. <br/>
                    Please enter valid credentials to sign in
                </p> }
            </div>
        </SignUpLayout>
    )
}
