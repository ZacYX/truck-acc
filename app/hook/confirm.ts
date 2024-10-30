import { useState } from "react";

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [callback, setCallback] = useState<(value: unknown) => void>();

  const confirm = () => {
    console.debug(`useConfirm confirm function called`);
    return new Promise((resolve) => {
      setCallback(() => resolve);
      setIsOpen(true);
    });
  }

  const onConfirm = () => {
    if (callback) {
      console.debug(`useConfirm confirmed`);
      callback(true);
    }
    setIsOpen(false);
  }

  const onCancel = () => {
    if (callback) {
      console.debug(`useConfirm canceled`);
      callback(false);
    }
    setIsOpen(false);
  }

  return { confirm, isOpen, onConfirm, onCancel };
}