import React, { useContext } from "react";
import NoteModalContext from "../context/NoteModalContext";

const Note = ({ date, timeStamp, note, handleSeekTo, id }) => {
  const {
    setNote,
    setForEdit,
    setIsNoteModalOpen,
    setNoteId,
    storedNotes,
    setStoredNotes,
    videoId,
  } = useContext(NoteModalContext);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const hrsStr = hrs > 0 ? `${hrs}hr${hrs > 1 ? "s" : ""} ` : "";
    const minsStr = mins > 0 ? `${mins}min${mins > 1 ? "s" : ""} ` : "";
    const secsStr = secs > 0 ? `${secs}sec${secs > 1 ? "s" : ""}` : "";

    return `${hrsStr}${minsStr}${secsStr}`.trim();
  };

  const handleEditNote = () => {
    setNote(note);
    setNoteId(id);
    setForEdit(true);
    setIsNoteModalOpen(true);
  };

  const handleDeleteNote = () => {
    const newNotes = storedNotes.filter((note) => note.id !== id);
    setStoredNotes(newNotes);
    localStorage.setItem(videoId.toString(), JSON.stringify(newNotes));
  };

  return (
    <div className="flex flex-col gap-4 pb-4 border-b border-[#EAECF0]">
      <div className="flex flex-col gap-2">
        <span className="text-sm text-[#344054] font-medium">{date}</span>
        <span className="text-sm text-[#475467]">
          Timestamp:{" "}
          <span
            onClick={() => {
              handleSeekTo(timeStamp);
            }}
            className="font-medium text-purple-400 cursor-pointer hover:underline underline-offset-2"
          >
            {formatTime(timeStamp)}
          </span>
        </span>
      </div>

      <div className="p-3 border border-[#EAECF0] rounded-bl-lg rounded-r-lg text-sm text-[#344054] shadow-sm">
        {note}
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          type="button"
          className="p-2 border border-[#D0D5DD] rounded-md text-[#344054] text-sm font-medium"
          onClick={handleDeleteNote}
        >
          Delete Note
        </button>
        <button
          type="button"
          className="p-2 border border-[#D0D5DD] rounded-md text-[#344054] text-sm font-medium"
          onClick={handleEditNote}
        >
          Edit Note
        </button>
      </div>
    </div>
  );
};

export default Note;
