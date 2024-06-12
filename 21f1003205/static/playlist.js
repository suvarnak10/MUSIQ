Vue.component('playlist', {
    template: `
    <div class="main" style="overflow-x: hidden;">
                <div class="dashbordbox">
                      <form method="POST"  @submit.prevent="addplaylist">
                        <div class="details">
                            <div class="textbox">
                                 <input type="text" id="playlist" placeholder="Playlist name" name="Playlist name" required>
                            </div>
                            <input type="submit" value="Submit">
                        </div>
                      </form>
                 </div>
     </div>
            
    `
    ,
    methods: {
            
        addplaylist: async function(name) {
            confirm('Are you sure?');

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+localStorage.getItem('Token'));
            
            var formdata = new FormData();
                formdata.append("id",JSON.parse(localStorage.getItem('data'))[0][0]);
                formdata.append("type", "addplaylist");
                formdata.append("playlist", document.getElementById('playlist').value);
                
                
            var requestOptions = {method: 'POST', headers: myHeaders, body: formdata, redirect: 'follow'};

            
            fetch("http://127.0.0.1:8000/api/song", requestOptions)
            .then(response => response.text())
            .then(data => alert(data.slice(1,-1)));

                
            
            await this.getA();
            window.location.href = "/user_dashboard";  
        },
        getA : () =>{
        return new Promise(resolve => setTimeout(resolve, 500));
        }
    },

      })

var app = new Vue({
    el: '#app'
})