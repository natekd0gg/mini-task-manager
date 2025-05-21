import React from "react";

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <h2 className="text-lg font-semibold text-black mb-2">
          Are you sure you want to delete this task?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          This action cannot be undone.
        </p>

        <div className="flex justify-between gap-4">
          <button
            data-testid="cancel-delete-button"
            onClick={onClose}
            className="flex-1 border border-black text-black py-2 rounded-full font-medium hover:bg-gray-100 transition cursor-pointer"
          >
            Go back
          </button>

          <button
            data-testid="confirm-delete-button"
            onClick={onConfirm}
            className="flex-1 [background-color:#ff50be] text-black py-2 rounded-full font-medium hover:bg-pink-600 transition cursor-pointer"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
