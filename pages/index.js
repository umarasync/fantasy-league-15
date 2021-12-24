// Packages
import { useRouter } from 'next/router'

// Components
import Input from "components/inputs/input";
import SelectInput from "components/inputs/selectInput";
import SignUpLayout from "components/layout/signupLayout";
import {useEffect, useState} from "react";


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

const initialValue = 'Select'
export default function SignUp() {
    const router = useRouter()
    const [disabled, setDisabled] = useState(true)
    const [isPasswordType, setIsPasswordType] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState(initialValue)

    const validate = () => {

        if(fullName && email && gender.value !== initialValue && dateOfBirth && password){
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    useEffect(() => {
        validate()
    }, [fullName, email, gender.value, dateOfBirth, password])

  return (
      <SignUpLayout
          title="sign up"
          heading={`Complete a simple form below and click "Next"`}
          footerHeading={{
              name: 'Already have an account?',
              link: '/sign_in',
              buttonTitle: 'Sign In'
          }}
          onClick={() => router.push('/confirm_your_account')}
          disabled={disabled}
      >
          <div className="flex flex-col w-[41rem] mb-[3rem]">
              <Input
                  name="fullName"
                  id="fullName"
                  placeholder="Full name"
                  onChange={ v => setFullName(v) }/>
              <Input name="email" id="email" placeholder="Email address" onChange={(v) => setEmail(v)}/>
              <div className="grid grid-cols-2 gap-[2.4rem]">
                  <SelectInput initialValue={initialValue} default name="gender" id="gender" placeholder="Gender" options={options} setValue={(v) => setGender(v)}/>
                  <Input name="dateOfBirth" id="dateOfBirth" placeholder="Date of birth" onChange={(v) => setDateOfBirth(v)}/>
              </div>
              <Input name="password" id="password" type={isPasswordType ? 'password': 'text'} placeholder="Enter your password" icon={isPasswordType? 'eye.png': 'hide.png'} onChange={ v => setPassword(v)} onIconClick={() => setIsPasswordType(!isPasswordType)}/>
          </div>
      </SignUpLayout>
  )
}
