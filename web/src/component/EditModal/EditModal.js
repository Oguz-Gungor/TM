import EditForm from "../EditForm/EditForm";
import Modal from "../Modal/Modal";
import "./EditModal.scss";

export default function EditModal({ userInfo, onSubmit }) {
  return (
    <Modal>
      <EditForm onSubmit={onSubmit} userInfo={userInfo} />
    </Modal>
  );
}
