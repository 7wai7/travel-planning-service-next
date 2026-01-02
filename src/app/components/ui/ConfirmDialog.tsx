"use client";

import { useState } from "react";
import useConfirmDialogStore from "../../stores/ConfirmDialogStore";

export default function ConfirmDialog() {
  const {
    isOpen,
    title,
    description,
    error,
    onCancel,
    onConfirm,
    reset,
    setConfirm,
  } = useConfirmDialogStore();

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const closeDialog = () => {
    setLoading(false);
    reset();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeDialog();
  };

  const handleConfirm = async () => {
    if (!onConfirm) return closeDialog();

    setLoading(true);
    try {
      await onConfirm();
      closeDialog();
    } catch (e: unknown) {
      const err = e instanceof Error ? e : new Error("Unknown error.");
      setConfirm({ error: err });
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="w-130 bg-white p-4 rounded-2xl">
        <h3 className="text-black text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-10">{description}</p>

        <div className="flex justify-end gap-4">
          <button
            disabled={loading}
            className="interact border border-gray-300 hover:border-gray-700 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2"
            onClick={handleCancel}
          >
            Cancel
          </button>

          <button
            disabled={loading}
            className="interact border border-red-200 hover:border-red-500 bg-red-100 hover:bg-red-200 text-red-600 py-1 px-2"
            onClick={handleConfirm}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mt-5">
            {error.message || "Something went wrong"}
          </p>
        )}
      </div>
    </div>
  );
}
