
Vue.component('login_form', {
    template: `
    <div class="login">
        <form class="form-group fom" id="form2" method="POST" enctype="multipart/form-data" action="/signup">
        
            
                <input class="textbox" type="text" placeholder="Username" name="username"  required/>
            
        
                <input class="textbox" type="text" placeholder="Email Id" name="email"  required/>
        
        
               <input class="textbox" type="password" placeholder="Password" name="password"  required/>
            
               <input class="btn" type="submit" name="Login" value="Register">
        </form>
    </div>
        `,
    data: function() {
      return {
          email: null,
          password: null,
          messages: []
        }
    },
    methods: {
        Login: function(name) {
            
            this.messages.push({
                "email": this.email,
                "message": this.password
            });
            formData = new FormData(document.getElementById('form2'));
            console.log(this.Password);
            
            let data={"name":"name","password":"password"}
			fetch("http://localhost:8000/login?include_auth_token",{"headers" :{'Content-Type':'application/json'},method:'POST',body:JSON.stringify(data)}).then(response=>response.json()).then(data=>console.log(data));



            this.email="";
            this.password="";
            console.log(formData.get("name"));
                    
                   
        }
    },
    computed: {
        count: function() {
            return this.messages.length;
        }
    }
})


var app = new Vue({
    el: '#app'
})