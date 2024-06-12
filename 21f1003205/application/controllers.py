from flask import Flask, request, flash, redirect, url_for
from flask import render_template, send_from_directory
from flask import current_app as app
from application.models import *
from flask_login import login_user, login_required, current_user
from flask_security import login_required
import random
import json
import os
import shutil
import zipfile
import requests
import time
import smtplib
from flask_jwt_extended import create_access_token, jwt_required
from datetime import datetime
from flask_login import LoginManager
from application import tasks
from main import socketio, emit


@app.route("/")
def main():

    return render_template('home.html')


@app.route('/user_login')
def login():
    print('inside login')
    return render_template('user_login.html')


@app.route('/login', methods=['POST'])
def login_post():
    # print('inside login post')
    # login code goes here
    email = request.form.get('email')
    email = email.lower()
    password = request.form.get('password')
    print('this is email', email)

    user = db.session.query(User).filter(User.user_email == email).first()
    # user = User.query.filter_by(user_email=email).first()
    print(user)
    # check if the user actually exists
    # take the user-supplied password, hash it, and compare it to the hashed password in the database
    # if the user doesn't exist or password is wrong, reload the page

    if not user:
        # print('no user\n')
        flash('Wrong email try again.', 'error')
        return redirect(url_for('login'))

    if not (user.user_password == password):
        # print('password wrong....\n')
        flash('Please check your password and try again.', 'error')
        return redirect(url_for('login'))

    # if the above check passes, then we know the user has the right credentials
    global token
    token = create_access_token(identity=email)
    print("Login Succeeded!, access_token= ", token)

    login_user(user, remember=True)
    return redirect(url_for('user_dashboard', token=token))


@app.route('/signup')
def signup():
    return render_template('user_register.html')


@app.route('/signup', methods=['POST'])
def signup_post():
    # code to validate and add user to database goes here
    email = request.form.get('email')
    name = request.form.get('username')
    password = request.form.get('password')
    print("this is name", name)
    print("this is email", email)
    print("this is password", password)

    # if this returns a user, then the email already exists in database
    user = User.query.filter_by(user_email=email).first()
    print(user)
    if user:  # if a user is found, we want to redirect back to signup page so user can try again
        print("Email already used")
        flash('Email already used', 'error')
        return redirect(url_for('login'))

    new_user = User(user_email=email, user_name=name,
                    user_password=password, role=0)
    db.session.add(new_user)
    db.session.commit()
    print("this is new user", new_user)

    new_user = db.session.query(User).filter(User.user_email == email).first()
    id = new_user.user_id
    print(id)

    flash('New user registered', 'error2')
    return redirect(url_for('login'))


@app.route('/ad_login')
def ad_login():
    return render_template('admin_login.html')


@app.route('/admin_login', methods=['POST'])
def admin_login():

    email = request.form.get('email')
    email = email.lower()
    password = request.form.get('password')
    print('this is email', email)

    user = db.session.query(Admin).filter(Admin.admin_email == email).first()

    print(user)

    if not user:
        print('Wrong email try again.', email)
        flash('Wrong email try again.', 'error')
        return redirect(url_for('ad_login'))

    if not (user.admin_password == password):
        print('Please check your password and try again.', password)
        flash('Please check your password and try again.', 'error')
        return redirect(url_for('ad_login'))

    # if the above check passes, then we know the user has the right credentials
    global token
    token = create_access_token(identity=email)
    print("Login Succeeded!, access_token= ", token)

    login_user(user, remember=True)
    return redirect(url_for('admin_dashboard', token=token))


@app.route("/admin_dashboard", methods=["GET", "POST"])
@login_required
def admin_dashboard():
    try:
        print('this is token', token)
        return render_template('admin_dashboard.html', token=token)
    except:
        print('\ntoken gone \n')
        return render_template('admin_dashboard.html', token='')


@app.route("/user_dashboard", methods=["GET", "POST"])
@login_required
def user_dashboard():
    try:
        print('this is token', token)
        return render_template('user_dashboard.html', token=token)
    except:
        print('\ntoken gone \n')
        return render_template('user_dashboard.html', token='')


@app.route("/add_song")
def add_song():

    return render_template('add_song.html')


@app.route("/creator_dashboard")
def creator_dashboard():
    return render_template('creator_dashboard.html')


@app.route('/create_playlist')
def create_playlist():

    return render_template('playlist.html')


@app.route('/create_album', methods=['GET', 'POST'])
def create_album():

    return render_template('album.html')


@app.route("/editsong", methods=['GET', 'POST'])
def editsong():

    return render_template('edit.html')


@app.route("/go_play")
def go_play():

    return render_template("go_play.html")


@app.route("/go_album")
def go_album():

    return render_template("go_album.html")


@app.login_manager.user_loader
def load_user(user_id):
    # since the user_id is just the primary key of our user table, use it in the query for the user
    return User.query.get(int(user_id))

