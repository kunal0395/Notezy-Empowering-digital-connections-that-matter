import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NoteApp = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState("");
  const [savedNoteId, setSavedNoteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef(null);
  const saveTimeout = useRef(null);

  useEffect(() => {
    // Helper: fetch note content from backend
    const fetchNote = async (id) => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/get_note/${id}`);
        const content = response.data.content || response.data.note || "";
        setNote(content);
      } catch (error) {
        if (error.response?.status === 404) {
          setNote("");
          console.log("Note not found, starting fresh.");
        } else {
          console.error("Error fetching note:", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Helper: save note content to backend
    const saveNote = async () => {
      if (!note.trim()) return; // don't save empty note
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/create`, {
          notes: note,
          note_link: savedNoteId || noteId,
        });
        const newId = response.data.note_link?.split("/").pop();
        if (!savedNoteId && newId) {
          setSavedNoteId(newId);
          window.history.pushState({}, "", `/${newId}`);
        }
      } catch (error) {
        console.error("Error saving note:", error);
      }
    };

    if (noteId) {
      // If noteId changed: fetch the note
      fetchNote(noteId);
    }

    // Clear any existing timeout (for debounce)
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current);
    }

    // Set debounce to save note 1s after typing stops
    saveTimeout.current = setTimeout(() => {
      saveNote();
    }, 1000);

    // Cleanup on unmount or note/noteId change
    return () => clearTimeout(saveTimeout.current);
  }, [note, noteId, savedNoteId]);

  // Sync editor's contentEditable div with note state
  useEffect(() => {
    if (
      editorRef.current &&
      !isLoading &&
      editorRef.current.innerText !== note
    ) {
      editorRef.current.innerText = note;
    }
  }, [note, isLoading]);

  const handleInput = (e) => {
    setNote(e.target.innerText);
  };

  return (
    <div className="w-full min-h-screen bg-[#031f39] text-white">
      {isLoading ? (
        <div className="p-4">Loading note...</div>
      ) : (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          className="p-4 border min-h-screen outline-none whitespace-pre-wrap break-words text-lg"
          style={{ direction: "ltr", unicodeBidi: "plaintext" }}
          spellCheck={false}
        />
      )}
    </div>
  );
};

export default NoteApp;
