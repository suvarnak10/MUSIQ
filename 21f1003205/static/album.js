Vue.component('albumlist', {
    template: `
    <div class="main" style="overflow-x: hidden;">
                <div class="dashbordbox">
                      <form method="POST"  @submit.prevent="addalbum">
                        <div class="details">
                            <div class="textbox">
                                 <input type="text" id="albumname" placeholder="Album name" name="Album name" required>
                            </div>
                            <input type="submit" value="Submit">
                        </div>
                      </form>
                 </div>
     </div>
            
    `
    ,
    methods: {
            
        addalbum: async function(name) {
            confirm('Are you sure?');

            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer "+localStorage.getItem('Token'));
            
            var formdata = new FormData();
                formdata.append("id",JSON.parse(localStorage.getItem('data'))[0][0]);
                formdata.append("type", "addalbum");
                formdata.append("albumname", document.getElementById('albumname').value);
                
                
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