import { useCallback, useState } from "react";

type ToastVariant = "success" | "error" | "warning" | "info";

export const useToast = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [variant, setVariant] = useState<ToastVariant>("success");

  const showToast = useCallback(
    (
      newTitle: string,
      newDescription: string,
      newVariant: ToastVariant = "success"
    ) => {
      setTitle(newTitle);
      setDescription(newDescription);
      setVariant(newVariant);
      setOpen(true);

      setTimeout(() => setOpen(false), 3500);
    },
    []
  );

  return {
    toastProps: { open, setOpen, title, description, variant },
    showToast,
  };
};
