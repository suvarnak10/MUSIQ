from .database import db
from flask_login import login_manager,UserMixin


class User(db.Model,UserMixin):
    __tablename__ = 'User'
    user_id=db.Column(db.Integer, primary_key=True,autoincrement=True)
    user_email= db.Column(db.String,nullable=False,unique=True)
    user_name = db.Column(db.String,nullable=False) 
    user_password= db.Column(db.String,nullable=False, unique=True )
    role= db.Column(db.Integer)
    #fs_uniquifier = db.Column(db.String(225),unique=True,nullable=False)
    #playlist = db.relationship("Playlist")
    creator=db.relationship("Creator")
    rating=db.relationship("Rating")
    def get_id(self):
        return (self.user_id)
    
class Admin(db.Model,UserMixin):
    __tablename__ = 'Admin'
    admin_id=db.Column(db.Integer,primary_key=True,autoincrement=True,nullable=False,unique=True)
    admin_email=db.Column(db.Integer,nullable=False)
    admin_name=db.Column(db.String,nullable=False)
    admin_password=db.Column(db.String,nullable=False,unique=True)
    def get_id(self):
        return (self.admin_id)

class Creator(db.Model):
    __tablename__ = 'Creator'
    creator_id=db.Column(db.Integer,primary_key=True,nullable=False,unique=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.user_id'), unique=True)
    creator_name=db.Column(db.String,nullable=False,unique=True)
    creator_email=db.Column(db.String,nullable=False,unique=True)
    #album = db.relationship("Album")
    Song = db.relationship("Song")
    
class Rating(db.Model):
    __tablename__ = 'Rating'
    user_id = db.Column(db.Integer,db.ForeignKey("User.user_id"),primary_key=True)
    song_id = db.Column(db.Integer,db.ForeignKey("Song.song_id"),primary_key=True)
    rating = db.Column(db.Integer)

class Song(db.Model):
    __tablename__ = 'Song'
    song_id = db.Column(db.Integer, autoincrement=True, primary_key=True,nullable=False, unique=True)
    song_name = db.Column(db.String,nullable=False)
    rating=db.Column(db.Integer,nullable=False)
    lyrics=db.Column(db.String)
    genre=db.Column(db.String)
    singer=db.Column(db.String)
    num_ratings=db.Column(db.Integer,nullable=False)
    release=db.Column(db.String)
    '''image=db.Column(db.BLOB)'''
    creator_id= db.Column(db.Integer,db.ForeignKey("Creator.creator_id"))
    #album_id= db.Column(db.Integer,db.ForeignKey("Album.album_id"))

class Playlist(db.Model):
    __tablename__ = 'Playlist'
    p_id = db.Column(db.Integer, autoincrement=True, primary_key=True,nullable=False, unique=True)
    p_name= db.Column(db.String, nullable=False)
    uid= db.Column(db.Integer)

class Play_song(db.Model):
    __tablename__ = 'Play_song'
    play_id = db.Column(db.Integer, primary_key=True)
    song_id= db.Column(db.Integer,primary_key=True)

class Album(db.Model):
    __tablename__ = 'Album'
    album_id = db.Column(db.Integer, autoincrement=True, primary_key=True,nullable=False, unique=True)
    album_name = db.Column(db.String,nullable=False)
    creator_id = db.Column(db.Integer)
    
class Album_song(db.Model):
    __tablename__ = 'Album_song'
    album_id = db.Column(db.Integer, primary_key=True)
    song_id= db.Column(db.Integer,primary_key=True)
    


   
 
