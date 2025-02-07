// DOM selectors
const bgSpace = document.getElementById('my-space');
const bgSpaceCtx = bgSpace.getContext('2d');

let screen,
    starsElements,cloudsElements,
    requestAnimation;
let  starsParams = { 
        speed: 10,
        number: 400,
        extinction: 0.7,
        dir : 'up'
    };
init();
load();

// update background on resize to keep them centered
window.onresize = function() {
    //console.log('window resize');
    init();
    load();
};

// star constructor
function Star() {
    this.x = Math.floor(Math.random() * bgSpace.width);
    this.y = Math.floor(Math.random() * bgSpace.height);
    this.z = Math.floor(Math.random() * bgSpace.width);
    this.moveStar = function(){
        let speed = starsParams.speed;
        switch (starsParams.dir) {
            case 'forward':{
                    this.z -= speed /100;
                    if (this.z <= 0) {
                        this.z = bgSpace.width ;
                    }
                }break;
                case 'back':{
                    this.z += speed / 100;
                    if (this.z >= bgSpace.width) {
                        this.z =  0;
                    }
                }break;                  
                case 'left':{
                    this.x -= speed /100;
                    if (this.x <= 0) {
                        this.x = bgSpace.width;
                    }
                }break;      
                case 'right':{
                    this.x += speed /100;
                    if (this.x >= bgSpace.width) {
                        this.x = 0;
                    }
                }break;  
                case 'up':{
                    this.y -= speed /100;
                    if (this.y <= 0) {
                        this.y = bgSpace.height;
                    }
                }break;                    
                case 'down':{
                    this.y += speed / 100;
                    if (this.y >= bgSpace.height) {
                        this.y = 0;
                    }
                }break;  
                default :{
                    this.y -= speed /100;
                    if (this.y <= 0) {
                        this.y = bgSpace.height;
                    }
                }break;                                                          
        }
    }   
    this.show = function() {
        let x, y, rad, opacity;
        x = (this.x - screen.c.w) * bgSpace.width / this.z;
        x = x + screen.c.w;
        y = (this.y - screen.c.h) * bgSpace.width / this.z;
        y = y + screen.c.h;
        rad =  bgSpace.width / this.z;

        opacity = (rad > starsParams.extinction) ? 0.5 * (3 - rad / starsParams.extinction) : 0.4;

        bgSpaceCtx.beginPath();
        bgSpaceCtx.fillStyle = "rgba(255, 255, 2255, " + opacity + ")";
        bgSpaceCtx.arc(x, y,rad, 0, Math.PI * 2);
        bgSpaceCtx.fill();
    }
}

// setup <canvas>, create all the starts
function init() {
    //console.log('init');
    screen = {
        w: window.innerWidth,
        h: window.innerHeight,
        c: { 
            w: window.innerWidth * 0.5, 
            h: window.innerHeight * 0.5
        }
    };
    setCountStars();
    window.cancelAnimationFrame(requestAnimation);
    bgSpace.width = screen.w;
    bgSpace.height = screen.h;
    starsElements = [];
    cloudsElements = [];
    for (let i = 0; i < starsParams.number; i++) {
        starsElements[i] = new Star();        
    }
}

// redraw the frame
function load() {
    let grd = bgSpaceCtx.createRadialGradient(screen.c.w,screen.h,190,screen.c.w,screen.h,screen.h-10);
    grd.addColorStop(0,'#1b2735');
    grd.addColorStop(1,'#090a0f');
    //  background: radial-gardient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    bgSpaceCtx.fillStyle=grd;
    bgSpaceCtx.fillRect(0, 0, bgSpace.width, bgSpace.height);
    starsElements.forEach(function (s) {
        s.show();
        s.moveStar();
    });
    requestAnimation = window.requestAnimationFrame(load) ;
       
}

function stop(){
    window.cancelAnimationFrame(requestAnimation);
}

function setCountStars() {
    starsParams.number = Math.floor((screen.w + screen.h) / 2);
    //console.log('count stars = '+starsParams.number);
}

function move(d,t = 800) {
    
    let defaultSpeed = starsParams.speed;    
    let speed = Math.floor((screen.w + screen.h) / 2);
    starsParams.dir = d;
    starsParams.speed = (d === 'forward' || d === 'back') ? speed * 3 :speed;
    setTimeout(() => {
        starsParams.speed = defaultSpeed;
    },t );

}
