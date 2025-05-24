from flask import Flask, send_from_directory
from flask_cors import CORS
from routes.qr_routes import qr_bp
from routes.url_routes import url_bp
from routes.note_routes import note_bp
from routes.stats_routes import stats_bp
import os

app = Flask(__name__)
CORS(app)  # Enable CORS globally

# Register Blueprints for different route groups
app.register_blueprint(qr_bp)
app.register_blueprint(url_bp)
app.register_blueprint(note_bp)
app.register_blueprint(stats_bp)

# Serve React build files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("build/" + path):
        return send_from_directory('build', path)
    else:
        return send_from_directory('build', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
