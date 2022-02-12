// Components
import Modal from "components/modals";
import BackDrop from "components/misc/BackDrop";

export default function ModalWithBackDrop({show, animationSpeed, children}) {

    return (
        <Modal>
            <BackDrop show={show} animationSpeed={animationSpeed}>{children}</BackDrop>
        </Modal>
    );
}
