var botdetails = {};
var gspin = 0;
var rspin = 0;
var mm1 = 0, mm2=0;
var move = 'stop';
(function(){
  
  var pinkapp;
  botdetails.ipaddress = '192.168.1.128';
  botdetails.rangeval = 20;
  botdetails.message = '';
  botdetails.gyroval = '';
  botdetails.m = 'stop';
  botdetails.m1 = 0;
  botdetails.m2 = 0;
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
          connecttocb(botdetails.ipaddress);
        }
      }
    })
    Vue.component('page-rcbutton', {
      template: '#page-rcbutton',
      data: function(){
        return botdetails;
      },
      methods:{
        rcmouseUp: function (event) {
          console.log('button is released....');
          initJq();
        },
        rcclick: function (btn,event) {
          console.log(event);
          console.log('button is clicked....'+btn);
        },
        rcrelease: function (btn,event) {
          console.log(event);
          console.log('button is released....'+btn);
        }
      }
    })

    Vue.component('page-rcgyro', {
      template: '#page-rcgyro',
      data: function(){
        return botdetails;
      },
      methods:{
        rcgyroMove: function (btn,event) {
          console.log('button is released....');
          rspin = gspin;
          if(btn == 1){
            botdetails.gyroval = 'Move Forward';
            botdetails.m = 'f';
          }else if(btn == 2){
            botdetails.gyroval = 'Move Backward';
            botdetails.m = 'b';
          }else{
            botdetails.gyroval = 'Stop';
            botdetails.m = 'stop';
          }
        },
        rcpginit: function(){
          console.log('RC gyro page init is called');
          var btn = document.getElementById("stopbtn");
          setTimeout(function(){ btn.value='after';
            console.log('after set value -----');
            console.log(btn);
            document.getElementById("stopbtn").addEventListener('touchstart', function(){
              botdetails.gyroval = 'down';
            }, false);
            document.getElementById("stopbtn").addEventListener('touchend', function(){
              botdetails.gyroval = 'up';
            }, false);
            // document.getElementById("stopbtn").touchstart = function() {console.log('mouse down'); botdetails.gyroval = 'down';};
            // document.getElementById("stopbtn").touchend = function() {console.log('mouse up'); botdetails.gyroval = 'up';};
          },3000);
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
            path: '/rcbutton/',
            component: 'page-rcbutton'
          },
          {
            path: '/rcgyro/',
            component: 'page-rcgyro'
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
    initGyro(); 
    //initJq();

  }
  function initGyro(){
    function processEvent(event) {
    // process the event object
        console.log('got gyro event');
        
        console.log(event);
        var alpha = event.alpha;  
        var beta = event.beta;
        var gamma = event.gamma;
        var betaR = beta / 180 * Math.PI;
        var gammaR = gamma / 180 * Math.PI;
        var spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));

        // convert back to degrees
        var spin = spinR * 180 / Math.PI;
        gspin = spin;
        var mobj = getMotorVoltage((gspin - rspin));
        
        if(botdetails.m =='f' || botdetails.m =='b' ){
          botdetails.gyroval = 'Motor:'+botdetails.m+'  gyro moved alpha:'+mobj.m1+'  beta:'+mobj.m2+'  gama:'+gamma;
          sendAction(mobj);
        }
    }
    window.addEventListener("deviceorientation",processEvent, true);    
  }

  document.addEventListener('deviceready', init, false);
  // setTimeout(function(){
  //   pinapp.greet();
  // },3000);
  function getMotorVoltage(angleValue){
    var m1 = 350;
    var m2 = 350;
    var m1v = parseInt(m1 + (angleValue*6));
    var m2v = parseInt(m2 - (angleValue*6));
    return {m1:m1v,m2:m2v};
  }
})();