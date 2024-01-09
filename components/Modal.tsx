"use client";

import { FormEvent, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import Image from "next/image";
import { PhotoIcon } from "@heroicons/react/16/solid";

function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null);

  const [image, newTaskInput, newTaskType, setImage, setNewTaskInput, addTask] =
    useBoardStore((state) => [
      state.image,
      state.newTaskInput,
      state.newTaskType,
      state.setImage,
      state.setNewTaskInput,
      state.addTask,
    ]);
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;

    addTask(newTaskInput, newTaskType, image);

    setImage(null);
    closeModal();
  };

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        className="relative z-9"
        onClose={closeModal}
        onSubmit={handleSubmit}
      >
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 "
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/* Modal */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center p-4 min-h-full text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel
                className="align-middle p-6 w-full max-w-md bg-white rounded-2xl text-left
               overflow-hidden transform transition-all shadow-xl"
              >
                <Dialog.Title
                  as="h3"
                  className="pb-2 text-lg font-medium leading-6 text-gray-900"
                >
                  Add a task
                </Dialog.Title>

                <div>
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter a task here..."
                    className="p-5 w-full border border-gray-300 rounded-md outline-none"
                  />
                </div>

                <TaskTypeRadioGroup />

                <div className="mt-2">
                  <button
                    type="button"
                    className="p-5 w-full border border-gray-300 rounded-md outline-none focus-visible:ring-2
                        focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      imagePickerRef.current?.click();
                    }}
                  >
                    <PhotoIcon className="inline-block mr-2 h-6 w-6" />
                    Upload Image
                  </button>

                  {image && (
                    <Image
                      alt="Uploaded Image"
                      width={200}
                      height={200}
                      className="mt-2 w-full h-44 object-cover filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                      src={URL.createObjectURL(image)}
                      onClick={() => {
                        setImage(null);
                      }}
                    />
                  )}

                  <input
                    type="file"
                    ref={imagePickerRef}
                    hidden
                    onChange={(e) => {
                      if (!e.target.files![0].type.startsWith("image/")) return;
                      setImage(e.target.files![0]);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="inline-flex justify-center px-4 py-2 rounded-md border border-transparent bg-blue-100 
                    text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2
                    focus-visible: ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 
                    disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
