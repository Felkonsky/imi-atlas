from os import urandom

class Config(object):
    TESTING = False
    DEBUG = False
    SECRET_KEY = urandom(24)
    DATA_UPLOAD = ""
    IMG_UPLOAD = ""
    SQLALCHEMY_DATABASE_URI = "sqlite:///medienatlas.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    DATA_UPLOAD = "uploads/data/"
    IMG_UPLOAD = "uploads/images/"
    DEBUG = True