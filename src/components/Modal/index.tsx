import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="mt-3 sm:mt-0 sm:text-left">
                <Dialog.Title className="flex items-center justify-between p-4 text-lg font-medium leading-6 text-gray-900 border-b sm:px-6">
                  <span className="capitalize">{title}</span>
                  <div
                    className="flex items-center justify-center flex-shrink-0 rounded-full cursor-pointer"
                    onClick={onClose}
                  >
                    <XMarkIcon
                      className="w-5 h-5 duration-200 hover:text-red-500"
                      aria-hidden="true"
                    />
                  </div>
                </Dialog.Title>
                <div className="pb-4 mt-3 sm:px-6">{children}</div>
              </div>
              {/* <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <Button
                  label={closeBtnText || "Close"}
                  size="sm"
                  variant="danger"
                  onClick={onClose}
                />
              </div> */}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
