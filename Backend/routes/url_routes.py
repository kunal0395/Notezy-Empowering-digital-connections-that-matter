from flask import Blueprint, request, jsonify, redirect
from db_notezy import get_db_connection
from utils.url_utils import shorten_url
from datetime import datetime

url_bp = Blueprint('url', __name__)

import os
BASE_URL = os.getenv("FRONTEND_BASE_URL", "http://localhost:5173")

@url_bp.route('/shorten', methods=['POST'])
def shorten_url_route():
    """
    Shortens a long URL, stores the mapping, and returns the short URL.
    If URL already shortened, returns existing short URL.
    """
    if not request.is_json:
        return jsonify({"error": "Content-Type must be application/json"}), 415

    data = request.get_json()
    user_url = data.get("long_url", "").strip()

    if not user_url:
        return jsonify({"error": "Missing or empty 'long_url' field"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT new_url FROM url WHERE user_url = %s", (user_url,))
        result = cursor.fetchone()

        if result:
            cursor.close()
            conn.close()
            return jsonify({"short_url": result[0]}), 200

        new_url = shorten_url(user_url)
        cursor.execute(
            "INSERT INTO url (user_url, url_date, new_url) VALUES (%s, %s, %s) RETURNING new_url;",
            (user_url, datetime.now().date(), new_url),
        )
        short_url = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"short_url": short_url}), 200

    except Exception as e:
        return jsonify({"error": f"Database error: {e}"}), 500

@url_bp.route('/u/<short_path>', methods=['GET'])
def redirect_to_long_url(short_path):
    """
    Redirects the short URL to the original long URL.
    """
    try:
        short_url = f"{BASE_URL}/{short_path}"

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT user_url FROM url WHERE new_url = %s",
            (short_url,)
        )
        result = cursor.fetchone()
        cursor.close()
        conn.close()

        if result:
            return redirect(result[0], code=302)
        else:
            return jsonify({"error": "URL not found"}), 404

    except Exception as e:
        return jsonify({"error": f"Database error: {e}"}), 500
    except Exception as e:
        return jsonify({"error": f"Database error: {e}"}), 500
