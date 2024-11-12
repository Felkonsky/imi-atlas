from app import db
from sqlalchemy_serializer import SerializerMixin

media_type_association = db.Table('media_type_association',
    db.Column('mediastation_id', db.Integer, db.ForeignKey('mediastation.id'), primary_key=True),
    db.Column('media_type_id', db.Integer, db.ForeignKey('media_type.id'), primary_key=True)
)

interaction_association = db.Table('interaction_association',
    db.Column('mediastation_id', db.Integer, db.ForeignKey('mediastation.id'), primary_key=True),
    db.Column('interaction_id', db.Integer, db.ForeignKey('interaction.id'), primary_key=True)
)

visualization_association = db.Table('visualization_association',
    db.Column('mediastation_id', db.Integer, db.ForeignKey('mediastation.id'), primary_key=True),
    db.Column('visualization_id', db.Integer, db.ForeignKey('visualization.id'), primary_key=True)
)

class MediaStation(db.Model, SerializerMixin):
    __tablename__ = 'mediastation'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.Text)
    path_to_exec = db.Column(db.Text)

    exhibition_id = db.Column(db.Integer, db.ForeignKey('exhibition.id'), nullable=False) 
    
    media_types = db.relationship('MediaType', secondary=media_type_association, backref=db.backref('mediastation', lazy=True))
    interactions = db.relationship('Interaction', secondary=interaction_association, backref=db.backref('mediastation', lazy=True))
    visualizations = db.relationship('Visualization', secondary=visualization_association, backref=db.backref('mediastation', lazy=True))
    
    
class Exhibition(db.Model, SerializerMixin):
    __tablename__ = 'exhibition'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.Text)
    end_date = db.Column(db.Text)
    location = db.Column(db.Text)
    trailer = db.Column(db.Text)

    mediastations = db.relationship('MediaStation', backref='exhibition', lazy=True)
    

class MediaType(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)

class Interaction(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)

class Visualization(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
