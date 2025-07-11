import { PlusCircle } from "@phosphor-icons/react";
import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import YouTube from "react-youtube";
import NoteModal from "./components/Note_Modal/NoteModal";
import NoteModalContext from "./context/NoteModalContext";
import Note from "./components/Note";

function App() {
  const {
    videoId,
    setVideoId,
    setTimeStamp,
    setIsNoteModalOpen,
    setStoredNotes,
    storedNotes,
  } = useContext(NoteModalContext);
  const playerRef = useRef(null);
  const ytRef = useRef(null);
  const lastRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    description: "",
  });

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
    },
  };

  const fetchStoredNotes = () => {
    const notes = JSON.parse(localStorage.getItem(videoId)) || [];
    console.log(notes);
    setStoredNotes(notes);
  };

  const fetchVideoDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      );
      const { title, description } = response.data.items[0].snippet;
      setVideoDetails({ title, description });
    } catch (error) {
      console.error("Failed to fetch video details:", error);
    }
  };

  const handleSeekTo = (time) => {
    if (playerRef.current) {
      playerRef.current.internalPlayer.seekTo(time);
      if (ytRef.current) {
        ytRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToLastNote = () => {
    if (lastRef.current) {
      lastRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchVideoDetails();
    fetchStoredNotes();
  }, [videoId]);

  return (
    <>
      <NoteModal scrollToLastNote={scrollToLastNote} />
      <div
        className={`w-screen h-fit overflow-x-hidden ${
          setIsNoteModalOpen ? "overflow-y-hidden" : "overflow-y-auto"
        } pl-8 py-5 bg-white relative'`}
      >
        {/* header */}
        <header className="flex gap-4">
          <h1 className="font-semibold text-3xl text-[#101828]">
            Video Player with Notes
          </h1>
          <input
            type="text"
            placeholder="Enter Video Id"
            className="px-4 py-2 border border-black rounded-md"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="button"
            className="text-white bg-blue-500 px-4 py-2 rounded-md hover:scale-105 transition-all duration-150"
            onClick={() => setVideoId(inputValue)}
          >
            Fetch Video
          </button>
        </header>
        {/* main - video playe and title and desciption of the video */}
        <main className="w-full pt-8 flex flex-col gap-8">
          <section ref={ytRef} className="flex flex-col gap-4">
            <YouTube
              videoId={videoId}
              opts={opts}
              ref={playerRef}
              onPause={(event) => {
                setTimeStamp(event.target.getCurrentTime());
              }}
            />
            <h2 className="font-semibold text-[#101828] text-lg">
              {videoDetails.title}
            </h2>
            <h3 className="font-normal text-[#475467] text-sm">
              {videoDetails.description}
            </h3>
          </section>
          <hr />
          {/* notes section with a add button which opens up a modal and a list with the notes */}
          <section className="flex flex-col gap-6 border rounded-2xl border-[#EAECF0] p-6 w-[98%]">
            <div className="flex items-center justify-between gap-4 border-b border-[#EAECF0] pb-6">
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold text-[#101828] text-lg">
                  My notes
                </h2>
                <h3 className="font-normal text-[#475467] text-sm">
                  All your notes at a single place. Click on any note to go to
                  specific timestamp in the video.
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNoteModalOpen(true)}
                className="p-3 border rounded-lg border-[#D0D5DD] flex items-center gap-2 text-sm text-[#101828] font-medium"
              >
                <PlusCircle size={20} />
                <span>Add New</span>
              </button>
            </div>
            {storedNotes.length > 0 &&
              storedNotes.map((note, index) => (
                <div
                  key={index}
                  ref={index === storedNotes.length - 1 ? lastRef : null}
                >
                  <Note
                    note={note.note}
                    timeStamp={note.timeStamp}
                    date={note.date}
                    handleSeekTo={handleSeekTo}
                    id={note.id}
                  />
                </div>
              ))}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
