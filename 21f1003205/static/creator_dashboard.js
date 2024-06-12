Vue.component('creatornav', {
    template: `
    <div class="row">
          <div class="col">
            <div class="nav">
                <nav>
                   <ul>
                   <img src='/static/logo.png' alt="logo" width="70" height="70">
                    <span style="color:white;font-size: 40px;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;padding-top: 2px;">MusiQ</span>
                  
                    <li><a onMouseOver="this.style.color='white'"
                        onMouseOut="this.style.color='rgb(140, 137, 137)'" href=#><svg xmlns="http://www.w3.org/2000/svg" width="60" height="30"  fill="rgb(140, 137, 137)" class="bi bi-house" viewBox="0 0 16 16" style="padding-right:-30px;margin-bottom:-7px">
                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                      </svg>Home</a></li>
                    
                      <li>
                        <a onMouseOver="this.style.color='white'" onMouseOut="this.style.color='rgb(140, 137, 137)'" href="/user_dashboard">
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="30" fill="rgb(140, 137, 137)" class="bi bi-person-vcard-fill" viewBox="0 0 16 16" style="padding-right:-30px;margin-bottom:-7px">
                                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm9 1.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4a.5.5 0 0 0-.5.5ZM9 8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 0-1h-4A.5.5 0 0 0 9 8Zm1 2.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5Zm-1 2C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 0 2 13h6.96c.026-.163.04-.33.04-.5ZM7 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                            </svg>User Account
                        </a>
                    </li>
                    
                      <h4>________________</h4>
                      <li><a onMouseOver="this.style.color='white'"
                        onMouseOut="this.style.color='rgb(140, 137, 137)'" href="/add_song">Upload Song <svg xmlns="http://www.w3.org/2000/svg" width="80" height="25" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16" style="padding-right:40px;margin-bottom:-7px">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                          </svg></a></li>
                      <li><a onMouseOver="this.style.color='white'"
                            onMouseOut="this.style.color='rgb(140, 137, 137)'" href="/create_album">Create Album<svg xmlns="http://www.w3.org/2000/svg" width="80" height="25" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16" style="padding-right:40px;margin-bottom:-7px">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                              </svg></a></li>
                              <h4>________________</h4>
                              <!-- Link to Album -->
                              <h2 style="color: white;">&nbsp;&nbsp;&nbsp;Albums</h2>
                              <div v-for="a in albums" style="overflow: scroll;text-align: center;">
                              <li><button style="margin-right:75px;color:#8c8989;background-color:#030717;border-color: #030717;" v-on:click="gotoalbum(a[0])">{{a[1]}}</button></li>
                                                                
                              </div>
                        
                   </ul>
                </nav>
               </div>
          </div>
          <div class="col">
            <div class="nav1">
              <div class="container text-center">
                <div class="row" style="padding-top: 20px;">

                   <!--
                   <div class="col">
                    <div style="padding: 1px 1px;width:600px" class="container-fluid">
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                  </div>
                  -->
                  <div class="col">
                    <a href="/user_login" onMouseOver="this.style.color='white'"  onMouseOut="this.style.color='rgb(140, 137, 137)'" style="text-decoration:none;font-size: 20px; color:rgb(140, 137, 137); text-align: right;" onclick="return confirm('Are you sure?')">
                    <svg style="margin-bottom:-6px" xmlns="http://www.w3.org/2000/svg" width="30" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
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
                <h4 style="color: white;padding: 20px;text-align: left;"> Creator Dashboard </h4>
                <div class="row justify-content-evenly" style="margin: 9px;">
                  <div class="col-4">
                    <h4 style="color: white;">Total Songs Uploaded</h4>
                    <h3 style="color: rgb(160, 153, 153);">{{totalsongs}}</h3>
                  </div>
                  <div class="col-4">
                    <h4 style="color: white;">Average Rating</h4>
                    <h3 style="color: rgb(160, 153, 153);">{{averagerating}}</h3>
                  </div>
                  <div class="col-4">
                    <h4 style="color: white;">Total Albums</h4>
                    <h3 style="color: rgb(160, 153, 153);">{{totalalbums}}</h3>
                  </div>
                </div>
              </div> 
              
            <div class="container text-center">
              <h4 style="color: white;text-align: left;padding-left: 20px;padding-top: 20px;">Your Uploads</h4>
              
              <div v-for="song in songs">  <!-- loop starting -->
              <div v-if="song[8]==id">

              <div class="container-fluid dashbordbox" style="background-color: #030717;">
                <div class="row">
                  <div class="col">
                  <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Add to album
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <div v-for="album in albums">
                        <button v-on:click="addtoalbum(song[0],album[0])">{{album[1]}}</button><br>
                      </div>
                    </div>
                  </div>
                    

                    <p><h4>Song : {{song[1]}}, <b>Singer : {{song[5]}},</b> Rating : {{song[2]}}</b></h4></p>
                    <div class="row justify-content-evenly" style="margin: 9px;">
                        <div class="col-5"><a data-bs-toggle="modal" v-bind:data-bs-target="'#model'+song[0]" href ="#"> View Lyrics</a></div>
                        
                        <div class="modal fade" v-bind:id="'model'+song[0]" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                          <div class="modal-dialog">
                          <div class="modal-content">
                              <div class="modal-header">
                              <h1 class="modal-title fs-5" id="staticBackdropLabel" style="color: #030717;">{{song[1]}}|{{song[5]}}</h1>
                              </div>
                              <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="color: #030717;">
                              <pre style="color:black;align-items: center;">{{song[3]}}
                                      </pre>
                                      
                              </div>
                                
                              <div class="modal-footer"> 
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                              </div>
                          </div>
                          </div>
                      </div>
                      
                        <div class="col-5"><a href="/editsong" v-on:click="setid(song[0])"> Edit</a></div>
                        <button class="col-5" v-on:click="del(song[0])" name="delete" value="Delete">Delete</button>
                        </div>
                          </div>
                        </div>
                        </div>
                  
                    </div>

                    </div>  <!-- if clause ending -->
                    </div>  <!-- loop ending -->

        
        
          </div>
       
           </div>
          </div>
    
    `,data: function() {
      return {
      id:JSON.parse(localStorage.getItem('data'))[0][0],
      name:JSON.parse(localStorage.getItem('data'))[0][1],
      role:JSON.parse(localStorage.getItem('data'))[0][2],
      email:JSON.parse(localStorage.getItem('data'))[0][3],
      songs:JSON.parse(localStorage.getItem('data'))[1],
      totalsongs:0,
      averagerating:0,
      totalalbums:JSON.parse(localStorage.getItem('data'))[0][4],
      totalrating:0,
      albums:JSON.parse(localStorage.getItem('data'))[2],
     }
  }
  ,
  methods: {  
    del: async function(sid) {
      confirm('Are you sure you want to delete song?');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem('Token'));

    var formdata = new FormData();
    formdata.append("sid", sid);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

      fetch("http://127.0.0.1:8000/api/song", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      console.log('deleted song');
      
      await this.getA();

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+localStorage.getItem("Token"));
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }
      data=await fetch("http://127.0.0.1:8000/api/user", requestOptions).then(response => response.text())

      localStorage.setItem("data",data)

      data=JSON.parse(localStorage.getItem("data"))
      this.songs = data[1]


      window.location.href = "/creator_dashboard"; 
      },
  getA : () =>{
    return new Promise(resolve => setTimeout(resolve, 500));
  },

  setid: function(sid) {
    localStorage.setItem('sid',sid);
  },
  addtoalbum: (sid,aid) =>{
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+localStorage.getItem('Token'));
      
      var formdata = new FormData();
          formdata.append("aid",aid);
          formdata.append("type", "addtoalbum");
          formdata.append("sid", sid);

          
      var requestOptions = {method: 'POST', headers: myHeaders, body: formdata, redirect: 'follow'};

      
      fetch("http://127.0.0.1:8000/api/song", requestOptions)
      .then(response => response.text())
      .then(data => alert(data.slice(1,-1)));
  }
  ,
  gotoalbum : async function(aid) {
      localStorage.setItem('aid',aid);
      await this.getA();
      window.location.href = '/go_album';
  },
  
  }
  ,
  
  mounted: async function() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+localStorage.getItem("Token"));
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }
    data=await fetch("http://127.0.0.1:8000/api/user", requestOptions).then(response => response.text())

    localStorage.setItem("data",data)
    data=JSON.parse(localStorage.getItem("data"))
    this.songs = data[1];
    ratings = 0;
    console.log(data);
    for(i=0;i<this.songs.length;i++){
      if(this.songs[i][8]==this.id){
          this.totalsongs=this.totalsongs+1;
          ratings=ratings+this.songs[i][2]
      }
    }
    this.averagerating = Math.round(ratings*100/this.totalsongs)/100;
    this.albums = data[2];
  
  
  }
  })


    

var app = new Vue({
    el: '#app'
  })
