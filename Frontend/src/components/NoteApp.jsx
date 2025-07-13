import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const NoteApp = () => {
  const { noteId } = useParams();  // e.g. "xJRQcm"
  const [note, setNote] = useState("");
  const [savedNoteId, setSavedNoteId] = useState(noteId || null);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef(null);
  const saveTimeout = useRef(null);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  // Fetch note
  useEffect(() => {
    const fetchNote = async (id) => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseURL}/get_note/${id}`);
        const content = response.data.content || "";
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

    if (noteId) fetchNote(noteId);
  }, [noteId]);

  // Auto-save with debounce
  useEffect(() => {
    const saveNote = async () => {
      if (!note.trim()) return;
      try {
        const response = await axios.post(`${baseURL}/create`, {
          notes: note,
          note_link: savedNoteId || noteId,
        });

        const newId = response.data.note_link;
        if (!savedNoteId && newId) {
          setSavedNoteId(newId);
          window.history.pushState({}, "", `/${newId}`);
        }
      } catch (error) {
        console.error("Error saving note:", error);
      }
    };

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => saveNote(), 1000);

    return () => clearTimeout(saveTimeout.current);
  }, [note, noteId, savedNoteId]);

  // Sync DOM and state
  useEffect(() => {
    if (editorRef.current && !isLoading && editorRef.current.innerText !== note) {
      editorRef.current.innerText = note;
    }
  }, [note, isLoading]);

  const handleInput = (e) => {
    setNote(e.currentTarget.innerText);
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
