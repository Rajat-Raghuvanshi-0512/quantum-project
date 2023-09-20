import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { addNote } from '../../redux/actions/notesAction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { clearAddedState, clearErrors } from '../../redux/slices/notesSlice';

export default function AddNote() {
  const dispatch = useAppDispatch();
  const { isAdded, error } = useAppSelector((s) => s.notes);

  const [note, setNote] = useState({
    title: '',
    desc: '',
    tag: '',
  });
  const handleInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const value = e.target.value;
    setNote({ ...note, [name]: value });
  };
  const handleOnClick = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addNote(note));
  };
  useEffect(() => {
    if (isAdded) {
      toast.success('Note Added');
      dispatch(clearAddedState());
      setNote({ title: '', desc: '', tag: '' });
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [isAdded, error, dispatch]);
  return (
    <div className="new-container md:px-20 flex items-center justify-center flex-col ">
      <div className="bg-slate-50 p-5 md:p-10 rounded-lg min-w-[50%]">
        <h1 className="mb-3 text-3xl font-bold text-center">Add a note</h1>
        <form method="post" onSubmit={handleOnClick}>
          <div className="mb-3 flex flex-col">
            <label htmlFor="title" className="form-label">
              Title<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className=" w-full p-2"
              minLength={3}
              required
              name="title"
              onChange={handleInput}
              value={note.title}
              id="title"
              placeholder="Enter Title (Atleast 3 characters)"
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="desc" className="form-label">
              Description<span className="text-danger">*</span>
            </label>
            <textarea
              name="desc"
              minLength={5}
              required
              onChange={handleInput}
              value={note.desc}
              id="desc"
              rows={4}
              placeholder="Enter Description (Atleast 5 characters)"
              className="p-2 resize-none"
            />
          </div>
          <div className="mb-3 flex flex-col">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className=" w-full p-2"
              name="tag"
              onChange={handleInput}
              value={note.tag}
              id="tag"
              placeholder="Enter Tag"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-600 hover:bg-slate-800 text-white py-2 rounded transition duration-500"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
