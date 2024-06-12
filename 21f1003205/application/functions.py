import os,random
from main import cache
from application.models import *

#to get user and posts data with api get method after login
@cache.cached(timeout=3,key_prefix='getdata')
def getdata(email):
	print('inside getdata')
	user = db.session.query(User).filter(User.user_email == email).first()
	allalbums = db.session.query(Album).filter(Album.creator_id==user.user_id).all()
	allplaylists = db.session.query(Playlist).filter(Playlist.uid==user.user_id).all()
	song=Song.query.all()
	id=user.user_id
	role=user.role
	songs=[]
	data=[[id,user.user_name,role,user.user_email,len(allalbums)]]
	for i in song:
		songs.append([i.song_id,i.song_name,i.rating,i.lyrics,i.genre,i.singer,i.num_ratings,i.release,i.creator_id])
	
	songs=sorted(songs, key=lambda x: x[2], reverse=True)
	
	data.append(songs)
	albums=[]
	for i in allalbums:
		albums.append([i.album_id,i.album_name])
	data.append(albums)

	playlists=[]
	for i in allplaylists:
		playlists.append([i.p_id,i.p_name])
	data.append(playlists)
	
	
	return data

@cache.cached(timeout=600,key_prefix='getadmindata')
def getadmindata(email):
	print('inside admin getdata')
	admin = db.session.query(Admin).filter(Admin.admin_email == email).first()
	users_ = User.query.all()
	song=Song.query.all()
	album = Album.query.all()
	id=admin.admin_id
	genres=[]
	songs=[]
	for i in song:
		if i.genre not in genres:
			genres.append(i.genre)
	data=[[id,admin.admin_name,admin.admin_email, len(users_), len(song), len(genres), len(album)]]
	for i in song:
		songs.append([i.song_id,i.song_name,i.rating,i.lyrics,i.genre,i.singer,i.num_ratings,i.release,i.creator_id])
	data.append(songs)
	creators=0
	for i in users_:
		if i.role==1:
			creators+=1

	data[0].append(creators)
	print(data[0],creators)

	return data
	
	

