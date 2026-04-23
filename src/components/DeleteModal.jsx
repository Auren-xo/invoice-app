import { useEffect } from "react";

export default function DeleteModal({ onClose, onConfirm }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold mb-4">
          Delete this invoice?
        </h2>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="px-3 py-1 border"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-3 py-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}