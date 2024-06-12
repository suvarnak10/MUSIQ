from flask_restful import Resource, Api
from flask_restful import fields, marshal_with,marshal
from flask_restful import reqparse

from application.models import *
from application.database import db
from application import functions
from flask import current_app as app
from datetime import datetime
import werkzeug,os,shutil,random
from werkzeug.utils import secure_filename
from .functions import *
from flask import abort, jsonify, request
from flask_security import auth_required, login_required
from flask_jwt_extended import jwt_required,get_jwt_identity
from main import socketio,emit 
from application import tasks
import time

create_user_parser = reqparse.RequestParser()
create_user_parser.add_argument('username')
create_user_parser.add_argument('email')

update_user_parser = reqparse.RequestParser()
update_user_parser.add_argument('email')

resource_fields = {
    'user_id':   fields.Integer,
    'username':    fields.String,
    'email':    fields.String
}


class API(Resource):
    # get user details
    @jwt_required()
    def get(self):
        
        print('inside get api')
        email = get_jwt_identity()
        # email='abc@gmail.com'
        print('this is ', email)
        # a = time.perf_counter_ns()
        data = functions.getdata(email)
        # print("this is data",data)
        # b = time.perf_counter_ns()
        # print('this is time taken :',b-a)
        return jsonify(data)
    
    # to change user role
    @jwt_required()
    def post(self):
        print('inside post user')
        if request.form.get('type')=='role':
            print('inside post')
            email = request.form['email']
            print(email)
            user = User.query.filter_by(user_email=email).first()
            print(user)
            print('this is old user role ', user.role)
            if user:
                if user.role == 0:
                    user.role = 1
                    creator = Creator(
                        user_id=user.user_id, creator_name=user.user_name, creator_email=user.user_email)
                    db.session.add(creator)
                    db.session.commit()
                    print("creator registered")
            return 'role change operation completed'
        
        

# for song
class API2(Resource):
    # to input rating
    @jwt_required()
    def post(self):
        # to add song
        if request.form.get('type')=='addsong':
            print('inside add song')
            title = request.form.get('title')
            singer=request.form.get('singer')
            release=request.form.get('date')
            genre=request.form.get('genre')
            lyrics=request.form.get('lyrics')
            uid = request.form.get('id')
            all_song=db.session.query(Song).filter(Song.song_name == title).all()
            if len(all_song)!=0:
                return "song already exists"
            new_song=Song(song_name=title,singer=singer,release=release,genre=genre,lyrics=lyrics,creator_id=uid,rating=0,num_ratings=0)
            db.session.add(new_song)
            db.session.commit() 
            return "song added succesfully"
        # to update rating
        elif request.form.get('type')=='rating':
            print('starting rating update')
            uid = request.form.get('uid')
            song_id = request.form.get('song_id')
            rating = request.form.get('rating')
            user = User.query.get(uid)
            song = Song.query.get(song_id)

            # print(song.rating,song.song_name,song.num_ratings,rating)

            if not user or not song:
                return jsonify({"error": "User or Song not found"}), 404

            existing_rating = Rating.query.filter_by(
                user_id=uid, song_id=song_id).first()

            if existing_rating:
                print('existing rating')
                song.rating = (int(song.rating) * int(song.num_ratings) -
                            int(existing_rating.rating) + int(rating)) / (int(song.num_ratings))

                existing_rating.rating = rating
            else:

                song.rating = (int(song.rating) * int(song.num_ratings) +
                            int(rating)) / (int(song.num_ratings) + 1)
                song.num_ratings += 1
                new_rating = Rating(user_id=uid, song_id=song_id, rating=rating)
                db.session.add(new_rating)

            db.session.commit()
            print('rating update succesfull')
            return "Rating updated successfully", 200

        # to update song
        elif request.form.get('type')=='editsong':
            print('this is inside editsong')
            sid = request.form.get('sid')
            song = db.session.query(Song).filter(Song.song_id == sid).first()
            uid = song.creator_id
            song = db.session.query(Song).filter(Song.song_id == sid).first()
            song.song_name = request.form.get('title')
            song.singer = request.form.get('singer')
            song.release = request.form.get('date')
            song.genre = request.form.get('genre')
            song.lyrics = request.form.get('lyrics')
            db.session.commit()
            print('song edit complete')
        
        # add album
        elif request.form.get('type')=='addalbum':
            print('this is add to album')
            p_name = request.form.get('albumname')
            uid = request.form.get('id')
            new_album=Album(album_name=p_name,creator_id=uid)
            db.session.add(new_album)
            db.session.commit()
            return "album created"
        
        elif request.form.get('type')=='addplaylist':
            print('this is add to playlist')
            p_name = request.form.get('playlist')
            uid = request.form.get('id')
            new_play=Playlist(p_name=p_name,uid=uid)
            db.session.add(new_play)
            db.session.commit()
            return "playlist created"
        # add song to album
        elif request.form.get('type')=='addtoalbum':
            print('this is add song to album')
            sid = request.form.get('sid')
            aid = request.form.get('aid')
            new_al=Album_song(album_id=aid,song_id=sid)
            db.session.add(new_al)
            db.session.commit()
            return "song added to album"
    
        elif request.form.get('type')=='addtoplaylist':
            print('this is add song to playlist')
            sid = request.form.get('sid')
            pid = request.form.get('pid')
            new_play=Play_song(play_id=pid,song_id=sid)
            db.session.add(new_play)
            db.session.commit()
            return "song added to playlist"
        
    # delete song
    @jwt_required()
    def delete(self):
        if request.form.get('type')=='songplaylistdelete':
            print('inside delete from playlsit')
            sid = request.form.get('sid')
            pid = request.form.get('pid')
            playlistrow=db.session.query(Play_song).filter(Play_song.play_id == pid and Play_song.song_id==sid).first()
            db.session.delete(playlistrow)
            db.session.commit()
            return "song deleted from playlist"
        
        if request.form.get('type')=='songalbumdelete':
            print('inside delete from album')
            sid = request.form.get('sid')
            aid = request.form.get('aid')
            albumrow=db.session.query(Album_song).filter(Album_song.album_id == aid and Album_song.song_id==sid).first()
            db.session.delete(albumrow)
            db.session.commit()
            return "song deleted from album"

        print('inside delete')
        sid = request.form.get('sid')
        song = db.session.query(Song).filter(Song.song_id == sid).first()
        db.session.delete(song)
        db.session.commit()
        print('song with id deleted', sid)
        '''except Exception as e:
            print('error ',e)
            abort(400,'Operation failed')'''

    @jwt_required()
    def get(self):
        # to get songs in playlist
        if request.args.get('type')=='playlist':
            print('this is get playlist')
            pid = request.args.get('pid')
            songids=[i.song_id for i in db.session.query(Play_song).filter(Play_song.play_id == pid).all()]
            songs = [[i.song_id,i.song_name,i.singer ] for i in db.session.query(Song).filter(Song.song_id.in_(songids)).all()]
            return songs
        
        elif request.args.get('type')=='album':
            print('this is get album')
            aid = request.args.get('aid')
            songids=[i.song_id for i in db.session.query(Album_song).filter(Album_song.album_id == aid).all()]
            songs = [[i.song_id,i.song_name,i.singer ] for i in db.session.query(Song).filter(Song.song_id.in_(songids)).all()]
            return songs

# for admin
class API3(Resource):

    @jwt_required()
    def get(self):
        print('inside admin get\n')
        email = get_jwt_identity()
        # email='abc@gmail.com'
        print('this is ', email)
        # a = time.perf_counter_ns()
        data = functions.getadmindata(email)
        # print("this is data",data)
        # b = time.perf_counter_ns()
        # print('this is time taken :',b-a)
        return jsonify(data)
    
    #delete post
    @jwt_required()
    def delete(self):
        try:
            print('inside admin delete')
            id=request.form['id']
            song = db.session.query(Song).filter(Song.song_id == id).first()
            db.session.delete(song)
            db.session.commit()
            print('song deleted')
        except Exception as e:
            print('error is :',e)
            abort(400,'Operation failed')

