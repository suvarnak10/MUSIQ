Vue.component('goplay',{
    template:`
    <div class="row">
          <div class="col">
            <div class="nav">
                <nav>
                   <ul>
                   <img src='/static/logo.png' alt="songimg"  alt="logo" width="70" height="70">
                    <span style="color:white;font-size: 40px;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;padding-top: 2px;">MusiQ</span>
                    
                      <div style="overflow: scroll;text-align: center;height: 330px;margin-right: 35px;" class="playlist" >

                      </div>
                   </ul>
                </nav>
               </div>
          </div>
          <div class="col">
            <div class="nav1">

                <div class="container text-center">
                    <div class="row" style="padding-top: 20px;">
                      <div class="col">
                      
                      </div>
                      <div class="col">
                        <a href="/user_login" onMouseOver="this.style.color='white'"  onMouseOut="this.style.color='rgb(140, 137, 137)'" style="text-decoration:none;font-size: 20px; color:rgb(140, 137, 137); text-align: right;" onclick="return confirm('Are you sure?')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                        Logout</a>
                      </div>
                    </div>
                </div>
            </div>
            <div class="main" style="overflow-x: hidden;">
                <div class="container text-center">
                    
                    <h3 style="color: white;text-align: left;padding-left: 20px;padding-top: 20px;padding-bottom: 20px;">Songs in <strong>{{title}}</strong> album</h3>
                    
                    <div class="container-fluid" style="background-color: #0a1027;">
                     
                    <div v-for="song in songs">
                        <div class="row">
                          <div class="col dashbordbox" style="background-color: #030717;">
                            <p><h4>Song :  {{song[1]}}</b> , Singer : {{song[2]}}</h4></p>
                            <button class="col-5" v-on:click="del(song[0])" name="delete" value="Delete">Delete</button>
                          </div>
                        </div>
                      </div>


                      <br>
                  
                  </div>
              </div>
                </div>
            </div>
        </div>
  `,data: function() {
      return {
      songs:null,
      
      }
    }
 ,
    methods:{
      del: async function(sid) {
        var confirmed = confirm('Are you sure you want to remove song from playlist?');
        alert('song deleting...');
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+localStorage.getItem('Token'));
  
      var formdata = new FormData();
      formdata.append("pid", localStorage.getItem('pid'));
      formdata.append("type", "songplaylistdelete");
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
  
          console.log('removed song from playlist');
          
          await this.getA();
          location.reload();
    
    
          },
      getA : () =>{
        return new Promise(resolve => setTimeout(resolve, 500));
      },

    }
,
    mounted: async function() {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer "+localStorage.getItem('Token'));
        
      
      var requestOptions = {method: 'GET', headers: myHeaders, redirect: 'follow'};

      
      songs = await fetch("http://127.0.0.1:8000/api/song?type=playlist&pid="+localStorage.getItem('pid'), requestOptions)
      .then(response => response.text());
    
      this.songs = JSON.parse(songs);
    
    }

    })


 var app = new Vue({
    el: '#app'
  })