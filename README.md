# MusiQ
A Music streaming app where users enjoy personalized playlists, rate songs, search and view lyrics, while creators upload, edit, and manage their tracks. Admins ensure content quality and policy adherence through user statistics monitoring and the ability to remove inappropriate content.

![MusiQ](https://github.com/suvarnak10/MUSIQ/assets/70807510/275814d8-a8dd-4efe-ab3b-ebf2fc541b79)

## Technologies used
The following technologies were used to build this app:
- Flask for API and backend
- VueJS for UI 
- Jinja2 templates 
- Bootstrap
- SQLite for database
- Redis for caching
- Redis and Celery for batch jobs

## Features
The app has the following features:

- Flask security and token based authentication
- Role-based access control 
- Create, edit, and manage personalized playlists
- Rate songs and view lyrics
- Explore existing songs and albums
- Upload, edit, and manage tracks (for creators)
- Monitor user statistics and song performance
- Remove inappropriate content (for admins)
- Daily reminder to post via email
- Monthly report via email
- Robust search functionality for songs and artists

## Installation

To run this app on your local machine, follow these steps:

Install DB Browser for SQlite to manage database and Redis for jobs and database

1.Clone this repository
```bash
git clone https://github.com/suvarnak10/MUSIQ.git
cd 21f1003205
```


2.Open terminal inside this repository and run local_setup.sh to setup environment and isntall packages needed
```bash
sh local_setup.sh
```
3.Activate virtual environment
```bash
source .env/bin/activate
```
4.Run local_run.sh to run the app
```bash
sh local_run.sh
```
5.Open a new terminal branch to run celery worker
```bash
sh local_workers.sh
```
6.Open another terminal to run celery beat
```bash
sh local_beat.sh
```
7.Open browser and search
```bash
http://127.0.0.1:8000/
```
## Contributers
[Suvarna K](https://github.com/suvarnak10)

