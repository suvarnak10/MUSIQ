from application.workers import celery
from datetime import datetime
import smtplib,csv,os,shutil,zipfile,time
from datetime import datetime
from application.models import *
from application import controllers
from celery.schedules import crontab

@celery.on_after_finalize.connect
def setup_periodic_tasks(sender,**kwargs):
    sender.add_periodic_task(
        crontab(hour=ist(18,2)[0],minute=ist(18,2)[1]),mail_send.s()   
    )
    sender.add_periodic_task(
        crontab(hour=ist(18,2)[0],minute=ist(18,2)[1]),mail_send_monthly.s()   
    )
    

@celery.task
def mail_send():
    print('inside mail send')
    users = db.session.query(User).all()
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login("21f1003205@ds.study.iitm.ac.in", "ahmbutphthbxxvay")
    for user in users:
        daily_mail(user.user_name,user.user_email,s)
    s.quit()

@celery.task
def mail_send_monthly():
    print('inside monthly mail')
    s = smtplib.SMTP('smtp.gmail.com', 587)
    s.starttls()
    s.login("21f1003205@ds.study.iitm.ac.in", "ahmbutphthbxxvay")
    users = db.session.query(User).all()
    for user in users:
         monthly_report(user.user_name,user.user_email,s)
    s.quit()
        

#function to change utc to itc to put in crontab,eg: hour=ist(11,37)[0],minute=ist(11,37)[1]
def ist(a,b):
    if b>30:
        a=(a-5)%24
        b=b-30
    else:
       a=(a-6)%24
       b=b+30
    return a,b

#finction to send daily reminder
def daily_mail(name,mail,s):
    print('inside daily mail',mail,name,)
    
    message = '''From: From Person <from@fromdomain.com> 
To: To Person <to@todomain.com>
MIME-Version: 1.0
Content-type: text/html
Subject: Don't Miss Out! Visit Musiq Today
Dear {0},
<br>
We hope this email finds you well! At Musiq, we're passionate about bringing you the latest and greatest in music. We've noticed that we haven't seen you around lately, and we wanted to remind you to check out what's new in the world of music.
<br>
Whether you're into chart-topping hits, discovering emerging artists, or exploring niche genres, Musiq has something for everyone. From curated playlists to personalized recommendations, there's always something exciting waiting for you. 
<br>
Don't miss out on the opportunity to Discover new music that matches your taste ,Create playlists for every mood and occasion and Stay up-to-date with the latest releases from your favorite artists
<br>
Thank you for being a valued member of the Musiq community. We can't wait to see you back in the app soon!
<br>
Best regards,
<br>
Musiq Team'''.format(name)
    s.sendmail("21f1003205@ds.study.iitm.ac.in", mail, message)
    #s.quit()
    print('mail send')


@celery.task
def test():
    print('inside test task on3')
    time.sleep(15)
    print('inside task test two')

#function to send monthly report
def monthly_report(name,mail,s):
    uid = db.session.query(User).filter(User.user_email == mail).first().user_id
    mysongs = db.session.query(Song).filter(Song.creator_id == uid).all()
    myalbums = db.session.query(Album).filter(Album.creator_id == uid).all()
    myplaylists = db.session.query(Playlist).filter(Playlist.uid == uid).all()

    m1 = '''From: From Person <from@fromdomain.com> 
To: To Person <to@todomain.com>
MIME-Version: 1.0
Content-type: text/html
Subject: Musiq Monthly report
<div>
<h2>Dear <b>{0}</b>,</h2>
<h3>Here is your monthly report</h3>

<h3><b>Songs you have created : {1}</b></h3>
<h3><b>Albums you have created : {2}</b></h3>
<h3><b>Playlists you have created : {3}</b></h3>
<br>'''.format(name,len(mysongs),len(myalbums),len(myplaylists))

   
    m1+='''
<br>
Thank you for being a valuable member of our Musiq community, and we look forward to your new songs!
<br>
Best regards,
<br>
Musiq Team

</div>'''
    #print(m1)   
    try:
        s.sendmail("21f1003205@ds.study.iitm.ac.in", mail, m1)
        print('mail send to ',name)
    except Exception as e:
        print('failed to email ',name,' with error ',str(e))
