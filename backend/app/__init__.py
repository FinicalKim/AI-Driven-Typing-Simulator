from flask import Flask

app = Flask(__name__)

# Import and register blueprints here
from routes.text_generation import text_generation_bp
from services.text_generation_services import generate_text
app.register_blueprint(text_generation_bp, url_prefix='/api')
