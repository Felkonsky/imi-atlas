import os
from flask_wtf import FlaskForm
# from forms import UploadForm
from flask import session, request, render_template, flash, redirect, send_from_directory, url_for, jsonify
from models import MediaStation, Exhibition, MediaType, Interaction, Visualization
# , mt_audio, mt_image, mt_object, mt_text, mt_video, it_compare, it_connect, it_point_and_click, it_focus, it_move, it_touch, it_zoom, viz_book, viz_glyph, viz_map, viz_slideshow, viz_tiles, viz_timeline
from werkzeug.utils import secure_filename
# from app import ms_data, ms_images


def register_routes(app, db):
    """Routing and db related stuff."""
    ################
    # Static Types #
    ################

    # Media types
    mt_audio = MediaType(name="Audio")
    mt_video = MediaType(name="Video")
    mt_image = MediaType(name="Bilder")
    mt_text = MediaType(name="Text")
    mt_object = MediaType(name="3D Objekt")

    # Interaction types
    it_zoom = Interaction(name="Vergrößern")
    it_compare = Interaction(name="Vergleichen")
    it_point_and_click = Interaction(name="Zeigen und Klicken")
    it_touch = Interaction(name="Berühren")
    it_connect = Interaction(name="Verknüpfen")
    it_move = Interaction(name="Bewegen")
    it_focus = Interaction(name="Fokussieren")

    # Interactive Visualization realization
    viz_slideshow = Visualization(name="Diashow")
    viz_glyph = Visualization(name="Glyphen")
    viz_timeline = Visualization(name="Zeitstrahl")
    viz_map = Visualization(name="Karte")
    viz_book = Visualization(name="Buch")
    viz_tiles = Visualization(name="Kacheln")
    
    
    type_dict = {
        "media": {
            "audio": mt_audio,
            "video": mt_video,
            "image": mt_image,
            "text": mt_text,
            "object": mt_object
        },
        "interaction": {
            "compare": it_compare,
            "connect": it_connect,
            "focus": it_focus,
            "move": it_move,
            "pointclick": it_point_and_click,
            "touch": it_touch,
            "zoom": it_zoom
        },
        "visualization": {
            "book": viz_book,
            "glyph": viz_glyph,
            "map": viz_map,
            "slideshow": viz_slideshow,
            "tiles": viz_tiles,
            "timeline": viz_timeline
        }
    }
    @app.route("/index")
    @app.route("/")
    def index():
        
        mediatypes = MediaType.query.all()
        interactions = Interaction.query.all()
        visualizations = Visualization.query.all()
        
        return render_template("index.html", interactions=interactions, visualizations=visualizations, mediatypes=mediatypes)
    
    @app.route("/uploads/images/<img>")
    def get_image(img):
        return send_from_directory(app.config["IMG_UPLOAD"], img)
    
    @app.route("/uploads/data/<data>")
    def get_data(data):
        return send_from_directory(app.config["DATA_UPLOAD"], data)
        
        
    @app.route("/mediastations/<id>")
    def get_mediastation(id):
        idx = request.args.get("idx", default=0, type=int)
        mediastation = MediaStation.query.get(id)
        exhibition = Exhibition.query.get(mediastation.exhibition_id)
        
        media_types = db.session.query(MediaType).join(MediaStation.media_types).filter(MediaStation.id == id).all()
        interactions = db.session.query(Interaction).join(MediaStation.interactions).filter(MediaStation.id == id).all()
        visualizations = db.session.query(Visualization).join(MediaStation.visualizations).filter(MediaStation.id == id).all()
        
        return render_template("mediastation.html", mediastation=mediastation, id=id, exhibition=exhibition, mediatypes=media_types, interactions=interactions, visualizations=visualizations, idx=idx)
    
    @app.route("/mediastations/media/<id>")
    def get_media(id):
        mediastation = MediaStation.query.get(id)
        return render_template("media.html", mediastation=mediastation)
    
    @app.route("/mediastations/images/<id>")
    def get_mediastation_images(id):
        idx = request.args.get("idx", default=0, type=int)
        mediastation = MediaStation.query.get(id)
        
        return render_template("slider.html", mediastation=mediastation, idx=idx)
    

    @app.route("/api/mediastations", methods=["GET"])
    def get_all_mediastations():
        mediastations = MediaStation.query.all()
        mediastation_subset = []
        for ms in mediastations:
            ms_data = {
                "id": ms.id,
                "name": ms.title,
                "images": [
                    url_for("get_image", img=image_filename)
                    for image_filename in ms.image_urls
                ],
                "media_type": [media_type.name for media_type in ms.media_types],
                "visualization_type": [visualization.name for visualization in ms.visualizations],
                "interaction_type": [interaction.name for interaction in ms.interactions]
            }
            mediastation_subset.append(ms_data)
        if mediastation_subset:
            return jsonify(mediastation_subset), 200
        return "Ups, something went wrong", 400
