from flask import Flask
from app.routes.text_generation import text_generation_bp

app = Flask(__name__)

app.register_blueprint(text_generation_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
