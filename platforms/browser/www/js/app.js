(function(){
  var botdetails = {};
  var pinkapp;
  botdetails.ipaddress = '192.168.1.128';
  function init(){
    Vue.use(Framework7Vue)
    
    Vue.component('page-about', {
      template: '#page-about'
    })
    Vue.component('page-connect', {
      template: '#page-connect',
      data: function(){
        return botdetails;
      },
      methods:{
         connectBot: function (event) {
          console.log('Connect to bot clicked:'+botdetails.ipaddress);
        }
      }
    })

    Vue.component('page-button', {
      template: '#page-button'
    })
    Vue.component('page-form', {
      template: '#page-form'
    })
    Vue.component('page-dynamic-routing', {
      template: '#page-dynamic-routing'
    })

    pinkapp = new Vue({
    el: '#pinkapp',
      data: function(){
        return botdetails;
      },
      methods: {
        greet: function (event) {
          // `this` inside methods points to the Vue instance
          alert('Hello ' + this.name + '!')
          // `event` is the native DOM event
          if (event) {
            alert(event.target.tagName)
          }
        }
      },
      framework7: {
        root: '#pinkapp',
        
        material: true,
        routes: [
          {
            path: '/about/',
            component: 'page-about'
          },
          {
            path: '/connect/',
            component: 'page-connect'
          },
          {
            path: '/button/',
            component: 'page-button'
          },
          {
            path: '/form/',
            component: 'page-form'
          },
          {
            path: '/dynamic-route/blog/:blogId/post/:postId/',
            component: 'page-dynamic-routing'
          }
        ],
      }
    });
  }


  document.addEventListener('deviceready', init, false);
  // setTimeout(function(){
  //   pinapp.greet();
  // },3000);
  
})();