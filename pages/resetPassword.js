// Packages
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { updatePassword } from "../redux/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Layout from "components/layout";
import Input from "components/inputs/input";
import Button from "components/html/Button";

// Utils
import R from "utils/getResponsiveValue";

export default function ResetPassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordType, setIsPasswordType] = useState(true);
  const [cPassword, setCPassword] = useState("");
  const [isCPasswordType, setIsCPasswordType] = useState(true);
  const [confirmationID, setConfirmationID] = useState(false);
  const [errorHandler, setErrorHandler] = useState(false);

  const error = useSelector(({ auth }) => auth.resetPasswordError);
  const success = useSelector(({ auth }) => auth.resetPasswordSuccess);

  //getting the confirmation code from URL params
  useEffect(() => {
    setDisabled(true);
    let confirmation_code = location.search.split("?q=")[1];
    console.log("confirmation_code", confirmation_code);
    if (confirmation_code) {
      setDisabled(false);
      setConfirmationID(confirmation_code);
    } else {
      toast.error("Invalid Password Reset Link!", {
        onClose: () => router.push("/"),
      });
    }
  }, []);

  //Dispatching the confirmation code to server for validation
  //   useEffect(() => {
  //     if (confirmationID) {
  //       dispatch(emailConfirmation(confirmationID));
  //     }
  //   }, [confirmationID]);

  const processResetPassword = () => {
    let data = { id: confirmationID, password: password };
    dispatch(updatePassword(data));
  };

  //Listening to Redux Reponse
  useEffect(() => {
    if (success) {
      toast.success(
        "Password Reset Successful!",
        {
          onClose: () => router.push("/reset_password_new_success"),
        }
      );
    } else if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const validate = () => {
    if (password && cPassword) {
      if (password === cPassword) {
        if (password.length < 8) {
          setErrorHandler("Atleast 8 character password required.");
        } else if (password.length > 7) {
          setErrorHandler(false);
          setDisabled(false);
        }
      } else {
        setDisabled(true);
        setErrorHandler("Password and Confirm password does not match.");
      }
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    validate();
  }, [password, cPassword]);

  return (
    <Layout title="Password Reset">
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
      <div className="flex flex-col items-center pt-[6.2rem]">
        <div className="flex flex-col items-center w-[41.2rem]">
          <img
            src="/images/logo_blue.png"
            alt=""
            className="w-[23rem] h-[5.6rem] mb-[14rem]"
          />
          <p className="uppercase italic text-black_rock text-[3.2rem] leading-[4rem] font-[800] mb-[2rem]">
            Reset your password
          </p>
          <p className="text-[1.8rem] leading-[2.6rem] normal text-center text-regent_grey mb-[3.2rem]">
            Securely access your account by creating <br />a new sign in
            password
          </p>
          <Input
            name="password"
            id="password"
            type={isPasswordType ? "password" : "text"}
            placeholder="Create new password"
            icon={isPasswordType ? "eye.png" : "hide.png"}
            onChange={(v) => setPassword(v)}
            onIconClick={() => setIsPasswordType(!isPasswordType)}
            value={password}
          />

          <Input
            name="cPassword"
            id="cPassword"
            type={isCPasswordType ? "password" : "text"}
            placeholder="Confirm new password"
            icon={isCPasswordType ? "eye.png" : "hide.png"}
            onChange={(v) => setCPassword(v)}
            onIconClick={() => setIsCPasswordType(!isCPasswordType)}
            value={cPassword}
            style={{ marginBottom: R(60) }}
          />
          {errorHandler && (
            <p className="text-center font-[600] text-[1.4rem] leading-[2rem] text-bean_red mb-[3.2rem]">
              {errorHandler}
            </p>
          )}
          <Button
            title={"Next"}
            disabled={disabled}
            onClick={() => !disabled && processResetPassword()}
          />
        </div>
      </div>
    </Layout>
  );
}
