import { useModal } from '../../misc/custom-hooks';
import Modal from '../Modal';
import { MdDelete } from 'react-icons/md';
import { deleteNote } from '../../redux/actions/notesAction';
import { useAppDispatch } from '../../redux/hooks';

const DeleteNoteBtnModal = ({ note }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const dispatch = useAppDispatch();
  const handleEdit = () => {
    dispatch(deleteNote(note._id));
    closeModal();
  };

  return (
    <>
      <button type="button" className="w-full text-center cursor-default">
        <MdDelete
          className="w-8 h-8 mx-auto text-red-400 hover:text-red-600 transition duration-500 cursor-pointer"
          onClick={openModal}
        />
      </button>

      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        closeText="Cancel"
        onClick={handleEdit}
        submitText="Confirm"
        title="Delete Modal"
      >
        <div className="p-4">Are you sure you want to delete this note?</div>
      </Modal>
    </>
  );
};

export default DeleteNoteBtnModal;
