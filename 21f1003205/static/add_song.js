Vue.component('add_song', {
    template: `
    <form method="POST" @submit.prevent="addsong">
            <div class="details">
                <div class="textbox">
                     <input type="text" id="title" placeholder="Title" name="title" required>
                </div>
                <div class="textbox">
                    <input type="text" id="singer" placeholder="Singer" name="singer" required>
                </div>
                  <label style="color: white;padding-left: 10px;padding-top: 10px;padding-bottom: -1px;">Release Date:</label>
                <div class="textbox">
                    <input type="date" id="date" placeholder="Release Date" name="date" required>
                </div>
                <div class="textbox">
                    <input type="text" id="genre" placeholder="Genre" name="genre" required>
               </div>
                <div class="textbox">
                    <textarea cols="30" id="lyrics" rows="5" style="overflow: scroll;resize: none;" input type="text" placeholder="Lyrics" name="lyrics" required></textarea>
                </div>
                <input type="submit" value="Save"/>
                <div class="btn1"><a href="/creator_dashboard">Cancel</a></div>
    </form>

        `
    ,
    methods: {
            
        addsong: async function(name) {
            confirm('Are you sure?');

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+localStorage.getItem('Token'));
            
            var formdata = new FormData();
                formdata.append("id",JSON.parse(localStorage.getItem('data'))[0][0]);
                formdata.append("type", "addsong");
                formdata.append("title", document.getElementById('title').value);
                formdata.append("singer", document.getElementById('singer').value);
                formdata.append("date", document.getElementById('date').value);
                formdata.append("genre", document.getElementById('genre').value);
                formdata.append("lyrics", document.getElementById('lyrics').value);
                
                
            var requestOptions = {method: 'POST', headers: myHeaders, body: formdata, redirect: 'follow'};

            
            fetch("http://127.0.0.1:8000/api/song", requestOptions)
            .then(response => response.text())
            .then(data => alert(data.slice(1,-1)));

                
            
            await this.getA();
            window.location.href = "/creator_dashboard";  
        },
        getA : () =>{
        return new Promise(resolve => setTimeout(resolve, 500));
        }
    },

      })
      
      
var app = new Vue({
          el: '#app'
      })