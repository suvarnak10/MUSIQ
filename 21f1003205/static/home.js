Vue.component('home', {
    template: `
    <div id="app">
    <div class="nav">
            <nav>
               <ul>
                <img src='/static/logo.png' alt="logo" width="70" height="70">
                <span style="color:white;font-size: 40px;font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;padding-top: 2px;">MusiQ</span>
                <li><a href="/ad_login">Admin Login?</a></li>
               </ul>
            </nav>
        </div>
        
        <div class="mainheading">
            <h1>music music</h1>
            <h3>Unlock the Soundtrack of Your Life: Stream Your Heart Out!</h3>
            
          </div>
	
          <div class="btn">
          <div class="button">
              <a href="/user_login" style="color:white;font-size: x-large; text-align:center;text-decoration: none;"></style> Login</a>
          </div> 
          <div class="button">
              <a href="/signup" style="color:white;font-size: x-large; text-align:center;text-decoration: none;"></style> Register</a>
          </div> 
      </div>
   </div>
        `,
})

var app = new Vue({
    el: '#app'
})
