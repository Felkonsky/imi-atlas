from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
# import os

# SECRET_KEY = os.getenv("SECRET_KEY")
# DATABASE_URL = os.getenv("SQLALCHEMY_DATABASE_URI")
# IMAGE_PATH = os.getenv("IMAGE_PATH")

db:SQLAlchemy = SQLAlchemy()

def create_app():
    
    app = Flask(__name__, template_folder="templates")
    
    # app.config['SECRET_KEY'] = SECRET_KEY
    # app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    # app.config['IMG_UPLOAD'] = IMAGE_PATH
    
    app.config.from_object("config.DevelopmentConfig") # comment out for testing


    # configure_uploads(app, (ms_images, ms_data))
    
    db.init_app(app)
    
    from routes import register_routes
    register_routes(app, db)
    Migrate(app, db)
    return app