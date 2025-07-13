from flask import Blueprint, request, jsonify
from db_notezy import get_db_connection
from utils.note_utils import generate_unique_link
from datetime import datetime
import os

note_bp = Blueprint('note', __name__)

# Env vars (frontend and backend base URLs)
FRONTEND_BASE = os.getenv("FRONTEND_BASE_URL", "http://localhost:5173")
BACKEND_BASE = os.getenv("BACKEND_BASE_URL", "http://localhost:5000")

# -----------------------
# GET: fetch note by random link (used by browser direct hit)
# -----------------------
@note_bp.route('/notes/<random_link>', methods=['GET'])
def get_note_by_random_link(random_link):
    full_link = f"{FRONTEND_BASE}/{random_link}"  # must match what frontend sends
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT notes FROM notes WHERE note_link = %s", (full_link,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()

        if result:
            return jsonify({"note": result[0]})
        else:
            return jsonify({"error": "Note not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# -----------------------
# POST: Save new note
# -----------------------
@note_bp.route('/notes', methods=['POST'])
def save_note():
    data = request.json
    note = data.get('note', '')
    short = generate_unique_link()
    full_link = f"{FRONTEND_BASE}/{short}"
    date = datetime.utcnow()

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO notes (notes, date, note_link) VALUES (%s, %s, %s) RETURNING note_id",
            (note, date, full_link)
        )
        note_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"note_id": note_id, "note_link": full_link}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@note_bp.route('/get_note/<note_id>', methods=['GET'])
def get_note(note_id):
    """
    Retrieve a note by its short ID.
    """
    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Look up by short ID, not full URL
        cur.execute("SELECT notes FROM notes WHERE note_link LIKE %s", (f"%/{note_id}",))
        result = cur.fetchone()
        cur.close()
        conn.close()

        if result:
            return jsonify({"content": result[0]})
        else:
            return jsonify({"error": "Note not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@note_bp.route('/create', methods=['POST'])
def create_or_update_note():
    data = request.json
    note = data.get("notes", "")
    note_link = data.get("note_link")

    try:
        conn = get_db_connection()
        cur = conn.cursor()

       if note_link:
           full_link = f"{FRONTEND_BASE}/{note_link}"
           cur.execute(
           "UPDATE notes SET notes = %s, date = %s WHERE note_link = %s",
           (note, datetime.utcnow(), full_link)
       )
       else:
          short = generate_unique_link()
          full_link = f"{FRONTEND_BASE}/{short}"
          cur.execute(
          "INSERT INTO notes (notes, date, note_link) VALUES (%s, %s, %s)",
          (note, datetime.utcnow(), full_link)
         )

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"note_link": full_link}), 201
    except Exception as e:
        return jsonify({"error": "Failed to save note", "details": str(e)}), 500

