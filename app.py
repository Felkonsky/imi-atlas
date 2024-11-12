from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
# from flask_uploads import UploadSet, IMAGES, configure_uploads


# Mediastation images and data entry points
# ms_images = UploadSet("images", IMAGES)
# ms_data = UploadSet("data")

db:SQLAlchemy = SQLAlchemy()

def create_app():
    
    app = Flask(__name__, template_folder="templates")
    # As declared in config.py
    SECRET_KEY = os.getenv("SECRET_KEY")
    DATABASE_URL = os.getenv("SQLALCHEMY_DATABASE_URI")
    
    # app.config.from_object("config.DevelopmentConfig")
    app.config['SECRET_KEY'] = SECRET_KEY
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    
    # configure_uploads(app, (ms_images, ms_data))
    
    db.init_app(app)
    
    # imports
    from routes import register_routes
    register_routes(app, db)
    Migrate(app, db)
    return app