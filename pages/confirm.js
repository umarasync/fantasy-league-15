// Packages
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { emailConfirmation } from "redux/Auth/api";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from "components/layout";


export default function EmailConfirmation() {

    const router = useRouter();
    const dispatch = useDispatch();
    const [confirmationID, setConfirmationID] = useState(false);

    const error = useSelector(({ auth }) => auth.confirmationError);
    const success = useSelector(({ auth }) => auth.confirmationSuccess);

    //getting the confirmation code from URL params
    useEffect(() => {
        let confirmation_code = location.search.split('?q=')[1];
        console.log("confirmation_code", confirmation_code);
        if (confirmation_code) {
            setConfirmationID(confirmation_code);
        } else {
            toast.error("Invalid Confirmation Code In Link!", {
                onClose: () => router.push("/"),
            });
        }
    }, []);

    //Dispatching the confirmation code to server for validation
    useEffect(() => {
        if (confirmationID) {
            dispatch(emailConfirmation(confirmationID));
        }
    }, [confirmationID]);

    //Listening to Redux Reponse
    useEffect(() => {
        if (success) {
            toast.success("Account Activated Successfully! Please login to continue.", {
                onClose: () => router.push("/sign_in"),
            });
        } else if (error) {
            toast.error(error, {
                onClose: () => router.push("/"),
            });
        }
    }, [success, error]);


    return (

        <Layout title="Confirm Your Account">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
            <div className="bg-[url('/images/bg_full.png')] bg-[length:100%_100%] h-screen bg-no-repeat pt-[6.2rem]">
                <div className="flex flex-col items-center">
                    <img src="/images/logo_white.png" alt="" className="w-[23rem] h-[5.6rem] mb-[14rem]" />
                    <img src="/images/check_red.png" alt="" className="w-[8rem] h-[8rem] mb-[4rem]" />
                    <p className="text-white font-[800] leading-[5.4rem] text-[5rem] italic uppercase">Confirming your account.</p>
                </div>
            </div>
        </Layout>

    )
}


