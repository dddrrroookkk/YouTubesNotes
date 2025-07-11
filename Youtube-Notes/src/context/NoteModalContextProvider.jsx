import React, { useState } from "react";
import NoteModalContext from "./NoteModalContext";

const NoteModalContextProvider = ({ children }) => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [timeStamp, setTimeStamp] = useState(0);
  const [storedNotes, setStoredNotes] = useState([]);
  const [forEdit, setForEdit] = useState(false);
  const [note, setNote] = useState("");
  const [noteId, setNoteId] = useState("");

  const contextObj = {
    timeStamp,
    setTimeStamp,
    videoId,
    setVideoId,
    isNoteModalOpen,
    setIsNoteModalOpen,
    storedNotes,
    setStoredNotes,
    forEdit,
    setForEdit,
    note,
    setNote,
    noteId,
    setNoteId,
  };
  return (
    <NoteModalContext.Provider value={contextObj}>
      {children}
    </NoteModalContext.Provider>
  );
};

export default NoteModalContextProvider;
