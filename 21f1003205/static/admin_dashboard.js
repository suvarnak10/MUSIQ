Vue.component('side',{
    template:` 
    <div class="row">
          <div class="col">
            <div class="nav">
              
                <nav>
                  <ul>
                    <img src='/static/logo.png' alt="songimg"  alt="logo" width="70" height="70">
                    <span style="color:white;font-size: 40px;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;padding-top: 2px;">MusiQ</span>
                    <div class="container text-center" style="margin-top: 60px;">
                        <div class="row justify-content-evenly" style="margin: 9px;">
                          <div style="background-color:black;border-radius:20px;padding:10px;border: 2px solid white; margin-bottom:110px;">
                            <h4 style="color: white;height: 80px; padding:20px;">Total Users</h4>
                            <h3 style="color: rgb(160, 153, 153);padding:10px;margin-top:-20px;">{{totalusers}}</h3>
                          </div>
                          <div style="background-color:black;border-radius:20px;padding:10px;border: 2px solid white; margin-bottom:110px;">
                            <h4 style="color: white;height: 80px;padding:20px;">Creators</h4>
                            <h3 style="color: rgb(160, 153, 153);padding:10px;margin-top:-20px;">{{creators}}</h3>
                          </div>
                        </div>
                    </div> 
                  </ul>
                </nav>
               </div>
          </div>
          <div class="col">
            <div class="nav1">
              <div class="container text-center">
                <div class="row" style="padding-top: 30px;">
                  <div class="col">
                    <a href="/ad_login" onMouseOver="this.style.color='white'"  onMouseOut="this.style.color='rgb(140, 137, 137)'" style="text-decoration:none;font-size: 20px; color:rgb(140, 137, 137); text-align: right;" onclick="return confirm('Are you sure?')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                    Logout</a>
                  </div>
                </div>
            </div>
           </div>
        <div class="main">
            <div class="container text-center">
                <h4 style="color: white;padding: 20px;text-align: left;"> Admin Dashboard </h4>
                <div class="row justify-content-evenly" style="margin: 9px;">
                  <div class="col-4">
                    <h4 style="color: white;">Tracks</h4>
                    <h3 style="color: rgb(160, 153, 153);">{{tracks}}</h3>
                  </div>
                  <div class="col-4">
                    <h4 style="color: white;">Total Albums</h4>
                    <h3 style="color: rgb(160, 153, 153);">{{albums}}</h3>
                  </div>
                  <div class="col-4">
                    <h4 style="color: white;">Genres</h4>
                    <h3 style="color: rgb(160, 153, 153);">{{genres}}</h3>
                  </div>
                </div>
              </div> 
            <div class="container text-center">
              <div v-for="song in songs" style="width:92%;">  <!-- loop starting -->

              <div class="container-fluid dashbordbox" style="background-color: #030717;">
                <div class="row">
                  <div class="col">
                    <p><h4>Song : {{song[1]}}, Date : {{song[7]}}, Singer : {{song[5]}}</b></h4></p>
                    <a  data-bs-toggle="modal" v-bind:data-bs-target="'#model'+song[0]" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="60" fill="blue" class="bi bi-music-note-list" viewBox="0 0 16 16">
                      <path d="M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z"/>
                      <path fill-rule="evenodd" d="M12 3v10h-1V3h1z"/>
                      <path d="M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z"/>
                      <path fill-rule="evenodd" d="M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z"/>
                    </svg></a>
                  
                    <div class="modal fade" v-bind:id="'model'+song[0]" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" varia-labelledby="staticBackdropLabel" aria-hidden="true">
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
                          
                      </div>
                      </div>
                  </div>


                    </div>
                    
                  </div>
                  <button style="margin-left: 400px;" class="col-5" class="input button" v-on:click="del(song[0])" name="delete" value="Delete">Delete</button>
                </div>    
                
                </div>  <!-- loop ending -->

                
                

                    </div>  
                  </div>
                </div>
            </div>
    `
    ,
    data: function() {
      return {
      id:JSON.parse(localStorage.getItem('data'))[0][0],
      name:JSON.parse(localStorage.getItem('data'))[0][1],
      email:JSON.parse(localStorage.getItem('data'))[0][2],
      songs:JSON.parse(localStorage.getItem('data'))[1],
      totalusers:JSON.parse(localStorage.getItem('data'))[0][3],
      creators:JSON.parse(localStorage.getItem('data'))[0][7],
      tracks:JSON.parse(localStorage.getItem('data'))[0][4],
      albums:JSON.parse(localStorage.getItem('data'))[0][6],
      genres:JSON.parse(localStorage.getItem('data'))[0][5],
     }
  }
  ,
  methods: {
      setid: function(id) {
  
        localStorage.setItem('id',id);
      }
      ,
      del: async function(id) {
        confirm('Are you sure?');
        var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+localStorage.getItem('Token'));

      var formdata = new FormData();
      formdata.append("id", id);

      var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("http://127.0.0.1:8000/api/admin", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      
      alert('song deleted');
      window.location.reload();
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
    var data=await fetch("http://127.0.0.1:8000/api/admin", requestOptions).then(response => response.text())
    console.log('this is data sample');
    
    localStorage.setItem("data",data)
    
    //console.log(JSON.parse(localStorage.getItem('data'))[4][1]);
    data=JSON.parse(localStorage.getItem("data"))
    this.songs = data[1]
    console.log(data)
  
  
  
  }
  })


var app = new Vue({
    el: '#app'
  })