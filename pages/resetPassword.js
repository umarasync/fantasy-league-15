// Packages
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { updatePassword } from "redux/Auth/api";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Layout from "components/layout";
import Input from "components/inputs/input";
import Button from "components/html/Button";
import Image from "components/html/Image"
import Text from "components/html/Text"
import Div from "components/html/Div"

// Constants
import colors from "constants/colors"

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
      <Div className="flex flex-col items-center" pt={62} style={{minHeight: R()}}>
        <Div className="flex flex-col items-center" w={412}>
          <Image src={'/images/logo_blue.png'} w={231} h={56} mb={140}/>
          <Text text={'Reset your password'} fs={32} lh={40} fw={800} fst={'italic'} tt={'uppercase'}
                color={colors.black_rock} mb={20}/>

          <Text
              text={<span>Securely access your account by creating <br/>a new sign in password</span>}
              fs={18}
              lh={26}
              color={colors.regent_grey}
              textAlign={'center'}
              mb={32}
          />

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
              <Text
                  text={errorHandler}
                  fw={600}
                  fs={14}
                  textAlign={'center'}
                  lh={20}
                  color={colors.bean_red}
                  mb={32}
              />
          )}
          <Button
            title={"Next"}
            disabled={disabled}
            onClick={() => !disabled && processResetPassword()}
          />
        </Div>
      </Div>
    </Layout>
  );
}
