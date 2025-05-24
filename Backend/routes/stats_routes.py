from flask import Blueprint, jsonify
from utils.users_utils import get_last_id

stats_bp = Blueprint('stats', __name__)

@stats_bp.route('/api/stats', methods=['GET'])
def stats():
    """
    Return counts of QR codes, URLs, and notes by fetching last inserted IDs.
    """
    try:
        last_qr_id = get_last_id('qr', 'qr_id')
        last_url_id = get_last_id('url', 'url_id')
        last_note_id = get_last_id('notes', 'note_id')


        return jsonify({
            "qr_count": last_qr_id or 0,
            "url_count": last_url_id or 0,
            "note_count": last_note_id or 0,
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
