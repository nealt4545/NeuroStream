// src/components/Modal.tsx
"use client";
import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full text-black">
        <button onClick={onClose} className="float-right text-gray-700 text-2xl leading-none">
          &times;
        </button>
        <div className="clear-both mt-4">{children}</div>
      </div>
    </div>
  );
}
