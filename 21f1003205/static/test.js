Vue.component('test', {
    template: `
    <div id="app">
    <h1>This is a testing page</h1>
    <p>If you can see this, the backend is successfully routing to this page.</p>
   </div>
        `,
})

var app = new Vue({
    el: '#app'
})
