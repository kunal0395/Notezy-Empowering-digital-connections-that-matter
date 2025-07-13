from flask import Blueprint, request, jsonify
from db_notezy import get_db_connection
from utils.note_utils import generate_unique_link
from datetime import datetime
import os

note_bp = Blueprint('note', __name__)

# Use environment variable for base URL or fallback to localhost
BASE_URL = os.getenv("BASE_URL", "http://localhost:5000")


@note_bp.route('/notes/<random_link>', methods=['GET'])
def get_note_by_link(random_link):
    """
    Retrieve note content by full note_link.
    """
    full_link = f"{BASE_URL}/notes/{random_link}"
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


@note_bp.route('/notes', methods=['POST'])
def save_note():
    """
    Save a new note with a unique random link.
    """
    data = request.json
    note = data['note']
    random_link = generate_unique_link()
    note_link = f"{BASE_URL}/notes/{random_link}"
    date = datetime.now()

    conn = get_db_connection()
    cursor = conn.cursor()
    query = "INSERT INTO notes (notes, date, note_link) VALUES (%s, %s, %s) RETURNING note_id"
    cursor.execute(query, (note, date, note_link))
    note_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"note_id": note_id, "note_link": note_link})


@note_bp.route('/create', methods=['POST'])
def create_or_get_note():
    """
    Create a new note or update an existing note if note_link is provided.
    """
    data = request.json
    notes = data.get('notes', '')
    note_link = data.get('note_link')  # full link from frontend if exists

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        if note_link:
            query = "UPDATE notes SET notes = %s, date = %s WHERE note_link = %s;"
            cursor.execute(query, (notes, datetime.utcnow(), note_link))
        else:
            # Generate and store full link
            short = generate_unique_link()
            note_link = f"{BASE_URL}/notes/{short}"
            query = "INSERT INTO notes (notes, date, note_link) VALUES (%s, %s, %s);"
            cursor.execute(query, (notes, datetime.utcnow(), note_link))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Note created', 'note_link': note_link}), 201
    except Exception as e:
        return jsonify({"error": "Failed to save note", "details": str(e)}), 500


@note_bp.route('/get_note/<note_id>', methods=['GET'])
def get_note(note_id):
    """
    Retrieve a note's content by its short ID.
    """
    try:
        full_link = f"{BASE_URL}/notes/{note_id}"

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT notes FROM notes WHERE note_link = %s", (full_link,))
        result = cur.fetchone()
        conn.close()

        if result:
            return jsonify({'content': result[0]})
        else:
            return jsonify({'error': 'Note not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500
