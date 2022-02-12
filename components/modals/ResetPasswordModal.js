// Packages
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Input from "components/inputs/input";
import Button from "components/html/Button";
import Image from "components/html/Image";
import Div from "components/html/Div";
import Text from "components/html/Text";
import ModalWithBackDrop from "components/modals/ModalWithBackDrop";

// Api
import { resetPasswordRequest } from "redux/Auth/api";

// Constants
import colors from "constants/colors";

export default function ResetPasswordModal({ show, onClose }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const successRequest = useSelector(({ auth }) => auth.resetRequestSuccess);
  const errorRequest = useSelector(({ auth }) => auth.resetRequestError);

  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");

  const requestResetPassword = () => {
    dispatch(resetPasswordRequest(email));
    // router.push('/reset_password_new')
  };

  useEffect(() => {
    //Mutation API response
    if (successRequest) {
        setDisabled(true);
        onClose
        toast.success("Password reset request sent to your email!", {
          onClose: () => router.push("/"),
        });
    } else if (errorRequest) {
      toast.error(errorRequest);
      onClose
    }
  }, [successRequest, errorRequest]);

  const validate = () => {
    if (email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  useEffect(() => {
    validate();
  }, [email]);

  return (
        <ModalWithBackDrop show={show} animationSpeed={0.3}>
            <Div className="bg-white" w={482} br={12} p={24} pt={28}>
                <Div className="flex justify-between items-center">
                    <Text
                        text={`Reset password`}
                        fs={28}
                        lh={32}
                        fw={800}
                        fst={'italic'}
                        tt={'uppercase'}
                        color={colors.black_rock}
                    />
                    <Image src="/images/close.png" alt="close" onClick={onClose}/>
                </Div>
                <Text
                    text={`Enter your email address and we’ll send you instructions on how to
                  reset your password.`}
                    fs={18}
                    lh={26}
                    mt={24}
                    mb={32}
                    color={colors.regent_grey}
                />
                <Input
                    value={email}
                    name="email"
                    id="email"
                    placeholder="Email address"
                    onChange={(v) => setEmail(v)}
                />
                <Button
                    title={"Next"}
                    disabled={disabled}
                    onClick={() => !disabled && requestResetPassword()}
                />
            </Div>
        </ModalWithBackDrop>
  );
}
