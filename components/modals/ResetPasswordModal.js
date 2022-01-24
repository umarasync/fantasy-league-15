// Packages
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Modal from "components/modals";
import Input from "components/inputs/input";
import Button from "components/html/Button";
import { resetPasswordRequest } from "../../redux/api/auth";

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
      toast.success("Password reset request sent to your email!");
    } else if (errorRequest) {
      toast.error(errorRequest);
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
    <Modal>
      <div
        className={`${
          !show && "hidden"
        } fixed z-10 overflow-auto top-0 left-0 w-full h-full bg-backdrop flex items-center justify-center`}
      >
        <div className="bg-white w-[48.2rem] rounded-[1.2rem] p-[2.4rem] pt-[2.8rem]">
          <div className="flex justify-between items-center">
            <p className="italic uppercase text-black_rock text-[2.8rem] font-[800] leading-[3.2rem]">
              Reset password
            </p>
            <img src="/images/close.png" alt="" onClick={onClose} />
          </div>
          <p className="text-regent_grey text-[1.8rem] leading-[2.6rem] mt-[2.4rem] mb-[3.2rem]">
            Enter your email address and we’ll send you instructions on how to
            reset your password.
          </p>
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
        </div>
      </div>
    </Modal>
  );
}
