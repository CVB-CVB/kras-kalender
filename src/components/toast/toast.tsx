"use client";

import * as Toast from "@radix-ui/react-toast";
interface ToastComponentProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  title: string;
  description: string;
}
export const ToastComponent = ({
  open,
  setOpen,
  title,
  description,
}: ToastComponentProps) => {
  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className={`
          rounded-xl px-4 py-3 shadow-lg
          bg-zinc-900 text-white
          border border-zinc-700
        `}
      >
        <Toast.Title className="font-bold">{title}</Toast.Title>

        <Toast.Description className="text-sm opacity-80">
          {description}
        </Toast.Description>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-4 right-4 w-80" />
    </Toast.Provider>
  );
};
