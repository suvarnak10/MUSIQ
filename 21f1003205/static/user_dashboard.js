Vue.component('sidenav', {
  template: `
  <div>
  <li v-if="role==1">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a onMouseOver="this.style.color='white'" onMouseOut="this.style.color='rgb(140, 137, 137)'" href='/creator_dashboard'><svg onMouseOver="this.style.color='white'" xmlns="http://www.w3.org/2000/svg" width="60" height="30" fill="rgb(140, 137, 137)" class="bi bi-person-vcard-fill" viewBox="0 0 16 16" style="padding-right:-30px;margin-bottom:-7px">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
          </svg>Creator Account
      </a>
  </li>
  <li v-if="role!=1">
  <a onMouseOver="this.style.color='white'" data-bs-toggle="modal" data-bs-target="#exampleModalToggle" onMouseOut="this.style.color='rgb(140, 137, 137)'">
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="30" fill="rgb(140, 137, 137)" class="bi bi-person-vcard-fill" viewBox="0 0 16 16" style="padding-right:-30px">
      </svg>Creator Register
  </a>


          
  

    <!-- Modal for registering as a creator -->
    <div class="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalToggleLabel">Register as Creator!</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="textinmodel">
                    Want to register as a Creator?
                </div>
                <div class="modal-footer">
                    
                        <button type="submit" id="modelbutton" class="btn btn-primary" @click="registerAsCreator">Register</button>
                    
                </div>
            </div>
        </div>
    </div> 
   


<h4 style="padding-bottom: 15px;">  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ____________________</h4> 
<li>
      <a onMouseOver="this.style.color='white'"
       onMouseOut="this.style.color='rgb(140, 137, 137)'" href="create_playlist">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add Playlist <svg xmlns="http://www.w3.org/2000/svg" width="80" height="30" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16" style="padding-right:40px;padding-top:-3px;margin-bottom:-7px">
      <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
      </svg>
      </a>
  </li>
<h4 style="padding-bottom: 15px;">  &nbsp;&nbsp;&nbsp; ____________________</h4> 
<div style="overflow: scroll;text-align: center;height: 330px;margin-right: 35px;" class="playlist" >
<h2 style="color: white;">&nbsp;&nbsp;&nbsp;&nbsp;Playlists</h2>
    <div v-for="p in playlists" style="overflow: scroll;text-align: center;">
    <li><a><button style="color:#8c8989;background-color:#030717;border-color: #030717;" v-on:click="gotoplaylist(p[0])">{{p[1]}}</button></a></li>
  
      
    </div> 
                  
                  
  </div>`,
  data: function() {
      return {
      id:JSON.parse(localStorage.getItem('data'))[0][0],
      name:JSON.parse(localStorage.getItem('data'))[0][1],
      role:JSON.parse(localStorage.getItem('data'))[0][2],
      email:JSON.parse(localStorage.getItem('data'))[0][3],
      playlists:null,																																																																																																																																																																																			

     }
}
,
methods: {
      setid: function(id) {

        localStorage.setItem('id',id);
      }
      ,
      
      registerAsCreator: async function() {
                    
          var myHeaders = new Headers();
          myHeaders.append("Authorization", "Bearer "+localStorage.getItem('Token'));
          console.log("inside role change");
          var formdata = new FormData();
          var mail = JSON.parse(localStorage.getItem('data'))[0][3];
          formdata.append('email', mail); 
          formdata.append('type', 'role'); 
          console.log('inside role change2');
          var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
              redirect: 'follow'
          };	

          
        fetch("http://127.0.0.1:8000/api/user", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        
        console.log('beofre second model')
        document.getElementById("modelbutton").disabled = true; 
        document.getElementById("textinmodel").innerHTML = "Role change succesfull!";
        await this.getA();
        location.reload();
        
        },
        getA : () =>{
          return new Promise(resolve => setTimeout(resolve, 1500));
        },
        gotoplaylist: async function(pid) {
          localStorage.setItem('pid',pid);
          await this.getA();
          window.location.href = '/go_play';
        },
}
,

mounted: async function() {
      
//try{
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem("Token"));
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }
  data=await fetch("http://127.0.0.1:8000/api/user", requestOptions).then(response => response.text())
  console.log('this is data mounted');
  console.log(data);

  localStorage.setItem("data",data)
  

  this.role=JSON.parse(localStorage.getItem('data'))[0][2]
  this.playlists =JSON.parse(localStorage.getItem('data'))[3];
  data=JSON.parse(localStorage.getItem("data"))
}

})













Vue.component('music',{
  template:`
  <div>

  <div class="container text-center">
    <div class="row flex-nowrap" style="overflow-x: auto;">
        
      <div v-for="song in songs" style="width:32%;">  <!-- loop starting -->


                  <div class ="col-4" style="width:auto;" v-bind:id="song[0]">
                  <div class="col-4 dbox2" style="max-width:320%;height:375px">
                    
                  <div class="dropdown">
                    <button style="width:160px; margin-right:130px;" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Add to Playlist
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <div v-for="p in playlists">
                      <button v-on:click="addtoplaylist(song[0],p[0])">{{p[1]}}</button><br>
                        
                      </div>
                    </div>
                  </div>


                    <img src='/static/b2b04f5f29b09d6f141d8acdc52a3d35.jpg' alt="songimg" width="150" height="190">
                    <h8><br>{{song[1]}} &nbsp;&nbsp; |&nbsp; &nbsp;  rating:{{song[2]}} </h8>
                    <h8><br>{{song[5]}}</h8>
                    
                            <div>
                                  <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="60" fill="blue" class="bi bi-play-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                                  </svg></a> 
                              
                                  <a  data-bs-toggle="modal" v-bind:data-bs-target="'#model'+song[0]" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="60" fill="blue" class="bi bi-music-note-list" viewBox="0 0 16 16">
                                    <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                    <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
                                    <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                                    <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                                  </svg></a>
                                
                                <!-- Modal -->
                                <div class="modal fade" v-bind:id="'model'+song[0]" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel" style="color: #030717;">{{song[1]}}|{{song[5]}}</h1>
                                        
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="color: #030717;">
                                        <pre style="color:black;align-items: center;">{{song[3]}}
                                            </pre>  
                                        </div>
                                          <div class="modal-footer">

                                                <form method="post" action="#">
                                                  <div class="slidecontainer">
                                                  <input type="range" v-model="sliderValue" min="1" max="5" value="3" class="slider" id="myRange" @change="ratingupdate(song[0])" >
                                                  <p style="color: #030717;">1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5</p>
                                                  </div>                                     
                                                </form>
                                          </div>
                                    </div>
                                    </div>
                                </div>
                                  
                            </div>
                </div>
              </div>

      </div>  <!-- loop ending -->

    </div>
  </div>




  </div>


  `,
  data: function() {
    return {
    id:JSON.parse(localStorage.getItem('data'))[0][0],
    name:JSON.parse(localStorage.getItem('data'))[0][1],
    role:JSON.parse(localStorage.getItem('data'))[0][2],
    email:JSON.parse(localStorage.getItem('data'))[0][3],
    songs:null,
    sliderValue:null,
    playlists:null,
   }
}
,
methods: {
    setid: function(id) {

      localStorage.setItem('id',id);
    }
    ,
    
    
    ratingupdate(songid) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+localStorage.getItem('Token'));

      const formdata = new FormData();
      formdata.append("type", "rating");
      formdata.append("song_id", songid);
      formdata.append("uid", this.id);
      formdata.append("rating", this.sliderValue);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      fetch("http://127.0.0.1:8000/api/song", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
      alert('rating is updated!');
    },
    addtoplaylist: (sid,pid) =>{
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+localStorage.getItem('Token'));
      
      var formdata = new FormData();
          formdata.append("pid",pid);
          formdata.append("type", "addtoplaylist");
          formdata.append("sid", sid);

          
      var requestOptions = {method: 'POST', headers: myHeaders, body: formdata, redirect: 'follow'};

      
      fetch("http://127.0.0.1:8000/api/song", requestOptions)
      .then(response => response.text())
      .then(data => alert(data.slice(1,-1)));
  },
}
,

mounted: async function() {
    
//try{
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+localStorage.getItem("Token"));
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
}
data=await fetch("http://127.0.0.1:8000/api/user", requestOptions).then(response => response.text())
console.log('this is data sample');

localStorage.setItem("data",data)

//console.log(JSON.parse(localStorage.getItem('data'))[4][1]);
data=JSON.parse(localStorage.getItem("data"))
this.songs = data[1];
this.playlists = data[3]
console.log(data)



}
})






Vue.component('albums',{
  template:`
  <div>

  <div class="container text-center">
    <div class="row flex-nowrap" style="overflow-x: auto;">
        
      <div v-for="song in songs" style="width:32%;">  <!-- loop starting -->


                  <div class ="col-4" style="width:auto;" v-bind:id="song[0]">
                  <div class="col-4 dbox2" style="max-width:320%">
                    
                  <div class="dropdown">
                    <button style="width:160px; margin-right:130px;" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Add to Playlist
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <div v-for="p in playlists">
                      <button v-on:click="addtoplaylist(song[0],p[0])">{{p[1]}}</button><br>
                        
                      </div>
                    </div>
                  </div>


                    <img src='/static/b2b04f5f29b09d6f141d8acdc52a3d35.jpg' alt="songimg" width="150" height="190">
                    <h8><br>{{song[1]}} &nbsp;&nbsp; |&nbsp; &nbsp;  rating:{{song[2]}} </h8>
                    <h8><br>{{song[5]}}</h8>
                    
                            <div>
                                  <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="60" fill="blue" class="bi bi-play-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                                  </svg></a> 
                              
                                  <a  data-bs-toggle="modal" v-bind:data-bs-target="'#model'+song[0]" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="60" fill="blue" class="bi bi-music-note-list" viewBox="0 0 16 16">
                                    <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                                    <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
                                    <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                                    <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                                  </svg></a>
                                
                                <!-- Modal -->
                                <div class="modal fade" v-bind:id="'model'+song[0]" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="staticBackdropLabel" style="color: #030717;">{{song[1]}}|{{song[5]}}</h1>
                                        
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="color: #030717;">
                                        <pre style="color:black;align-items: center;">{{song[3]}}
                                            </pre>  
                                        </div>
                                          <div class="modal-footer">

                                                <form method="post" action="#">
                                                  <div class="slidecontainer">
                                                  <input type="range" v-model="sliderValue" min="1" max="5" value="3" class="slider" id="myRange" @change="ratingupdate(song[0])" >
                                                  <p style="color: #030717;">1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;4 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5</p>
                                                  </div>                                     
                                                </form>
                                          </div>
                                    </div>
                                    </div>
                                </div>
                                  
                            </div>
                </div>
              </div>

      </div>  <!-- loop ending -->

    </div>
  </div>




  </div>


  `,
  data: function() {
    return {
    id:JSON.parse(localStorage.getItem('data'))[0][0],
    name:JSON.parse(localStorage.getItem('data'))[0][1],
    role:JSON.parse(localStorage.getItem('data'))[0][2],
    email:JSON.parse(localStorage.getItem('data'))[0][3],
    songs:null,
    sliderValue:null,
    playlists:null,
   }
}
,
methods: {
    setid: function(id) {

      localStorage.setItem('id',id);
    }
    ,
    
    
    ratingupdate(songid) {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+localStorage.getItem('Token'));

      const formdata = new FormData();
      formdata.append("type", "rating");
      formdata.append("song_id", songid);
      formdata.append("uid", this.id);
      formdata.append("rating", this.sliderValue);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow"
      };

      fetch("http://127.0.0.1:8000/api/song", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
      alert('rating is updated!');
    },
    addtoplaylist: (sid,pid) =>{
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+localStorage.getItem('Token'));
      
      var formdata = new FormData();
          formdata.append("pid",pid);
          formdata.append("type", "addtoplaylist");
          formdata.append("sid", sid);

          
      var requestOptions = {method: 'POST', headers: myHeaders, body: formdata, redirect: 'follow'};

      
      fetch("http://127.0.0.1:8000/api/song", requestOptions)
      .then(response => response.text())
      .then(data => alert(data.slice(1,-1)));
  },
}
,

mounted: async function() {
    
//try{
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer "+localStorage.getItem("Token"));
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
}
data=await fetch("http://127.0.0.1:8000/api/user", requestOptions).then(response => response.text())

localStorage.setItem("data",data)

//console.log(JSON.parse(localStorage.getItem('data'))[4][1]);
data=JSON.parse(localStorage.getItem("data"))
this.songs = data[1];
this.playlists = data[3]
console.log(data)



}
})

var app = new Vue({
  el: '#app'
})