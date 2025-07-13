from flask import Blueprint, request, jsonify
from db_notezy import get_db_connection
from utils.note_utils import generate_unique_link
from datetime import datetime
import os

note_bp = Blueprint('note', __name__)

# Load from environment or use default localhost during dev
BASE_URL = os.getenv("BASE_URL", "http://localhost:5000")

@note_bp.route('/notes/<random_link>', methods=['GET'])
def get_note_by_link(random_link):
    """
    Retrieve note content by unique random link.
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        full_link = f"{BASE_URL}/notes/{random_link}"
        query = "SELECT notes FROM notes WHERE note_link = %s"
        cursor.execute(query, (full_link,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()

        if result:
            return jsonify({"note": result[0]})
        else:
            return jsonify({"error": "Note not found"}), 404
    except Exception as e:
        return jsonify({"error": "Failed to retrieve note", "details": str(e)}), 500


@note_bp.route('/notes', methods=['POST'])
def save_note():
    """
    Save a new note with a unique random link.
    """
    try:
        data = request.json
        note = data.get('note', '')

        random_link = generate_unique_link()
        note_link = f"{BASE_URL}/notes/{random_link}"
        date = datetime.utcnow()

        conn = get_db_connection()
        cursor = conn.cursor()
        query = "INSERT INTO notes (notes, date, note_link) VALUES (%s, %s, %s) RETURNING note_id"
        cursor.execute(query, (note, date, note_link))
        note_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"note_id": note_id, "note_link": note_link}), 201
    except Exception as e:
        return jsonify({"error": "Failed to save note", "details": str(e)}), 500


@note_bp.route('/create', methods=['POST'])
def create_or_get_note():
    """
    Create or update a note. If note_link is given, update it. Else, create new.
    """
    try:
        data = request.json
        notes = data.get('notes', '')
        note_link = data.get('note_link')  # Existing link if any
        date = datetime.utcnow()

        conn = get_db_connection()
        cursor = conn.cursor()

        if note_link:
            query = "UPDATE notes SET notes = %s, date = %s WHERE note_link = %s"
            cursor.execute(query, (notes, date, note_link))
        else:
            random_link = generate_unique_link()
            note_link = f"{BASE_URL}/notes/{random_link}"
            query = "INSERT INTO notes (notes, date, note_link) VALUES (%s, %s, %s)"
            cursor.execute(query, (notes, date, note_link))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'message': 'Note saved successfully', 'note_link': note_link}), 201
    except Exception as e:
        return jsonify({'error': 'Failed to create or update note', 'details': str(e)}), 500


@note_bp.route('/get_note/<path:note_link>', methods=['GET'])
def get_note(note_link):
    """
    Fetch note by full note_link.
    """
    try:
        full_link = f"{BASE_URL}/notes/{note_link}"

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT notes FROM notes WHERE note_link = %s", (full_link,))
        result = cursor.fetchone()
        conn.close()

        if result:
            return jsonify({'content': result[0]})
        else:
            return jsonify({'error': 'Note not found'}), 404
    except Exception as e:
        return jsonify({'error': 'Database error', 'details': str(e)}), 500
