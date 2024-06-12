Vue.component('editsong', {
    template: `
    <form method="POST" @submit.prevent="save">
            
            <div class="details">
                <div class="textbox">
                     <input type="text" placeholder="Title" id="title" name="title" v-bind:value="song[1]" required>
                </div>
                <div class="textbox">
                    <input type="text" placeholder="Singer" id="singer" name="singer" v-bind:value="song[5]" required>
                </div>
                  <label style="color: white;padding-left: 10px;padding-top: 10px;padding-bottom: -1px;">Release Date:</label>
                <div class="textbox">
                    <input id="date" type="date" placeholder="Release Date" name="date" v-bind:value="song[7]" required>
                </div>
                <div class="textbox">
                    <input id="genre" type="text" placeholder="Genre" name="genre" v-bind:value="song[4]" required>
               </div>
                <div class="textbox">
                    <textarea cols="30" id="lyrics" rows="5" name="lyrics" v-bind:value="song[3]" style="overflow: scroll;resize: none;" >lyrics</textarea>
                </div>
                <input type="submit" value="Save"/>
                <div class="btn1"><a href="/creator_dashboard">Cancel</a></div>
        
            </div>
    </form>

        `,
    data: function() {
        return {
            title:null,
            singer:null,
            date:null,
            genre:null,
            lyrics:null,
            sid:JSON.parse(localStorage.getItem("sid")),
            song:[1,1,1,1,1,1,1,1,1,1,1]
            }
        },
        methods: {
            
            save: async function() {
                confirm('Are you sure?');

                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer "+localStorage.getItem('Token'));
                
                var formdata = new FormData();
                    formdata.append("type", "editsong");
                    formdata.append("sid", this.sid);
                    formdata.append("title", document.getElementById('title').value);
                    formdata.append("singer", document.getElementById('singer').value);
                    formdata.append("date", document.getElementById('date').value);
                    formdata.append("genre", document.getElementById('genre').value);
                    formdata.append("lyrics", document.getElementById('lyrics').value);
                    
                    
                var requestOptions = {method: 'POST', headers: myHeaders, body: formdata, redirect: 'follow'};

                
                fetch("http://127.0.0.1:8000/api/song", requestOptions);
                    
                
                await this.getA();
                alert('edit is done');
                window.location.href = "/creator_dashboard";    
            },
            getA : () =>{
            return new Promise(resolve => setTimeout(resolve, 500));
            }
        },
        computed: { 
        
            
            
        },
        mounted: async function() {
            sid=this.sid;
            data=JSON.parse(localStorage.getItem("data"));
            
            for (var i = 0; i < data[1].length; ++i) {  
                
                if (data[1][i][0]==this.sid){
                this.song=data[1][i];
                }

            }
            
        
        }
    })
      
      
      
var app = new Vue({
          el: '#app'
      })

      