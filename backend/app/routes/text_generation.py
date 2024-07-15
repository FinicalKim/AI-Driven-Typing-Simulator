from flask import Blueprint, request, jsonify
from app.services.text_generation_service import generate_text

text_generation_bp = Blueprint('text_generation', __name__)

@text_generation_bp.route('/generate_text', methods=['POST'])
def generate_text_endpoint():
    data = request.get_json()
    topic = data.get('topic')
    text = generate_text(topic)
    return jsonify({'text': text})
