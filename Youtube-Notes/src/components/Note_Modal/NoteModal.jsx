import React, { useContext, useState } from "react";
import MoadalLayout from "../../layouts/Moadal.layout";
import NoteModalContext from "../../context/NoteModalContext";
import { X } from "@phosphor-icons/react";

const NoteModal = ({ scrollToLastNote }) => {
  const {
    timeStamp,
    videoId,
    isNoteModalOpen,
    setIsNoteModalOpen,
    storedNotes,
    setStoredNotes,
    forEdit,
    setForEdit,
    note,
    setNote,
    noteId,
  } = useContext(NoteModalContext);

  function generateRandomCode() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const codeLength = 10;
    let code = "";

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }

    return code;
  }

  const handleAddNote = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
      "default",
      { month: "short" }
    )} '${currentDate.getFullYear().toString().slice(-2)}`;
    const noteObj = {
      note,
      timeStamp,
      date: formattedDate,
      id: generateRandomCode(),
    };
    const newNotes = [...storedNotes, noteObj];
    setStoredNotes(newNotes);
    console.log(newNotes);
    localStorage.setItem(videoId.toString(), JSON.stringify(newNotes));
    setNote("");
    setIsNoteModalOpen(false);
    scrollToLastNote();
  };

  const handleEditNote = () => {
    const index = storedNotes.findIndex((note) => note.id === noteId);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
      "default",
      { month: "short" }
    )} '${currentDate.getFullYear().toString().slice(-2)}`;
    const noteObj = {
      note,
      timeStamp,
      date: formattedDate,
      id: noteId,
    };
    let arr = storedNotes;
    arr[index] = noteObj;
    setStoredNotes(arr);
    localStorage.setItem(videoId.toString(), JSON.stringify(arr));
    setForEdit(false);
    setIsNoteModalOpen(false);
  };

  if (!isNoteModalOpen) return null;
  return (
    <MoadalLayout>
      <div className="bg-white rounded-md flex flex-col gap-4 p-4 w-[500px]">
        <div className="flex items-center justify-between">
          <span className="w-2 h-2"></span>
          <h2 className="font-semibold text-[#101828] text-lg text-center">
            {forEdit ? "Edit Note" : "Add Note"}
          </h2>
          <X
            size={24}
            className="cursor-pointer"
            onClick={() => setIsNoteModalOpen(false)}
          />
        </div>
        <textarea
          className="border border-[#D0D5DD] rounded-md p-2 h-24"
          placeholder="Enter your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <button
          type="button"
          className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4"
          onClick={() => {
            forEdit ? handleEditNote() : handleAddNote();
          }}
        >
          {forEdit ? "Edit Note" : "Add Note"}
        </button>
      </div>
    </MoadalLayout>
  );
};

export default NoteModal;
