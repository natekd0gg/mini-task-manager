import React, { useState, useRef, useEffect } from "react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: {
    title: string;
    description: string;
    due?: string;
  }) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [due, setDue] = useState<string>("");

  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, due });
    setTitle("");
    setDescription("");
    setDue("");
    onClose();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
      data-testid="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-task-modal-title"
    >
      <div
        ref={modalRef}
        className="relative bg-[#f5f5f5] p-6 rounded-2xl shadow-lg w-full max-w-md"
        data-testid="modal-container"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold cursor-pointer"
          aria-label="Close modal"
        >
          ×
        </button>
        <h2
          className="text-2xl font-extrabold uppercase text-black mb-6 leading-tight"
          id="add-task-modal-title"
          data-testid="modal-title"
        >
          LESS JUGGLING, MORE CHILL. ADD YOUR TASK AND RELAX.
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="block text-sm font-medium text-black mb-1"
            >
              <span className="text-red-500">*</span>Title
            </label>
            <input
              id="task-title"
              data-testid="input-title"
              type="text"
              placeholder="Task name"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="task-due"
              className="block text-sm font-medium text-black mb-1"
            >
              <span className="text-red-500">*</span>Due date
            </label>
            <div className="relative">
              <input
                id="task-due"
                data-testid="input-due"
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-pink-500"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
              <span className="absolute right-3 top-2.5 text-gray-400 pointer-events-none">
                📅
              </span>
            </div>
          </div>
          <div>
            <label
              htmlFor="task-description"
              className="block text-sm font-medium text-black mb-1"
            >
              <span className="text-red-500">*</span>Task description
            </label>
            <textarea
              id="task-description"
              data-testid="input-description"
              placeholder="Your message"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl text-black resize-none h-24 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              data-testid="btn-submit"
              className="w-full [background-color:#ff50be] hover:[background-color:#e647aa] text-black text-lg font-bold py-2 rounded-full hover:bg-pink-600 transition cursor-pointer"
            >
              Create task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
