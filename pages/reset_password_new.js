// Packages
import {useState, useEffect} from "react";

// Components
import Layout from "components/layout";
import Input from "components/inputs/input";
import PrimaryButton from "../components/buttons/primaryButton";
import {useRouter} from "next/router";

export default function ResetPassword() {

    const router = useRouter()
    const [disabled, setDisabled] = useState(true)
    const [password, setPassword] = useState('')
    const [isPasswordType, setIsPasswordType] = useState(true)
    const [cPassword, setCPassword] = useState('')
    const [isCPasswordType, setIsCPasswordType] = useState(true)

    const validate = () => {
        if(password && cPassword){
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    useEffect(() => {
        validate()
    }, [password, cPassword])

    return (
        <Layout title="Password Reset">
            <div className="flex flex-col items-center pt-[6.2rem]">
                <div className="flex flex-col items-center w-[41.2rem]">
                    <img src="/images/logo_blue.png" alt="" className="w-[23rem] h-[5.6rem] mb-[14rem]"/>
                    <p className='uppercase italic text-black_rock text-[3.2rem] leading-[4rem] font-[800] mb-[2rem]'>Reset your password</p>
                    <p className="text-[1.8rem] leading-[2.6rem] normal text-center text-regent_grey mb-[3.2rem]">
                        Securely access your account by creating <br/>a new sign in password
                    </p>
                    <Input
                        name="password"
                        id="password"
                        type={isPasswordType ? 'password': 'text'}
                        placeholder="Create new password" icon={isPasswordType? 'eye.png': 'hide.png'}
                        onChange={ v => setPassword(v)}
                        onIconClick={() => setIsPasswordType(!isPasswordType)}
                        value={password}
                    />

                    <Input
                        name="cPassword"
                        id="cPassword"
                        type={isCPasswordType ? 'password': 'text'}
                        placeholder="Confirm new password" icon={isCPasswordType? 'eye.png': 'hide.png'}
                        onChange={ v => setCPassword(v)}
                        onIconClick={() => setIsCPasswordType(!isCPasswordType)}
                        value={cPassword}
                        style='mb-[6rem]'
                    />
                    <PrimaryButton title={'Next'} disabled={disabled} onClick={() => !disabled && router.push('/reset_password_new_success')}/>
                </div>
            </div>
        </Layout>
    )
}
