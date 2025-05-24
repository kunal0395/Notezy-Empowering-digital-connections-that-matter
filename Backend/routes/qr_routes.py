from flask import Blueprint, request, jsonify
from db_notezy import get_db_connection
from utils.qr_utils import generate_qr_code
from datetime import datetime

qr_bp = Blueprint('qr', __name__)

@qr_bp.route('/generate_qr', methods=['POST'])
def generate_qr():
    """
    Generates a QR code for the provided URL and stores it in the database.
    If the QR code already exists, returns the existing one.
    """
    if not request.is_json:
        return jsonify({"error": "Content-Type must be application/json"}), 415

    data = request.get_json()
    user_url = data.get("url", "").strip()

    if not user_url:
        return jsonify({"error": "Missing or empty 'url' field"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT qr_id, qr FROM qr WHERE user_url = %s", (user_url,))
        result = cursor.fetchone()

        if result:
            cursor.close()
            conn.close()
            return jsonify({"qr_id": result[0], "qr_code": result[1]}), 200

        qr_code = generate_qr_code(user_url)
        cursor.execute(
            "INSERT INTO qr (user_url, qr_date, qr) VALUES (%s, %s, %s) RETURNING qr_id;",
            (user_url, datetime.now().date(), qr_code),
        )
        qr_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"qr_id": qr_id, "qr_code": qr_code}), 201

    except Exception as e:
        return jsonify({"error": f"Server error: {e}"}), 500
