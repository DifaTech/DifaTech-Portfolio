// variable
let $body = document.querySelector('body');
    $wrapper = document.querySelector('#wrapper');
    $sidebar = document.querySelectorAll('.sidebar');
    $navLinks = document.querySelector('.nav-links');
    sections = {
        'hero':document.querySelector('#hero')
    };
    screenDim = {
        w: window.innerWidth,
        h: window.innerHeight
    }
    is_small = false;
    openNav = false;
    breakpoints({
        xlarge:   [ '1281px',  '1680px' ],
        large:    [ '981px',   '1280px' ],
        medium:   [ '737px',   '980px'  ],
        small:    [ '481px',   '736px'  ],
        xsmall:   [ '361px',   '480px'  ],
        xxsmall:  [ null,      '360px'  ],
        'xlarge-to-max':    '(min-width: 1681px)',
        'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
    });
    //    
    //Enable blur background
    function enableBlur (){
        const bg_blur = document.createElement('div');
        bg_blur.classList.add('bg-filter')
        $body.appendChild(bg_blur);
    }
    // disabel blur background
    function disableBlur (){
        const bg_blur = document.querySelector('.bg-filter');
        if(bg_blur){
            $body.removeChild(bg_blur);
        }       
    }    
    // manage a responsive nav links
    function manageNavSlide(){
        const nav = document.querySelector('.nav-links');
        const burger = document.querySelector('.navbar-toggle');  
        const navLinks = nav.querySelectorAll('.nav-links>li');  
        animateLinks = () =>{
            navLinks.forEach((link, index) => {
            link.classList.toggle('an_animated');
            link.classList.toggle('an__fadeInRightBig');
            link.style.animationDuration = (index +1) * 0.1+'s' ;            
            })
        }

        burger.addEventListener('click',()=>{
            openNav = !openNav;
            //Toogle         
            nav.classList.toggle('nav-active');
            $body.classList.toggle('nav-open');
            
            // background effect
            openNav ? enableBlur() : disableBlur()
            //Animate links
            animateLinks();

            //Animate btn-burger        
            burger.classList.toggle('push');
        });    
    }
    function setHeroHeight(){        
        console.table(sections)
        sections['hero'].style.height = (screenDim.h - 60)+'px';

    }
// ... loaded.
window.addEventListener('load', function() {
    window.setTimeout(function() {
        $body.classList.remove('is-preload');
    }, 100);
});

// ... stopped resizing.
var resizeTimeout;

window.addEventListener('resize', function() {

    // Mark as resizing.
        $body.classList.add('is-resizing');       
    // Unmark after delay.
        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(function() {
            $body.classList.remove('is-resizing');
        }, 100);

});

breakpoints.on('<=small', function(e) {    
    if(!is_small){
        $wrapper.style.gridTemplateColumns = '0px auto 0px';
        is_small = true;
        $sidebar.forEach((el,index) =>{
            const socialBare = document.createElement('li');
           // const ell = el.cloneNode(true);
            socialBare.appendChild(el);
            index == 0 ?  $navLinks.appendChild(socialBare) : $navLinks.insertBefore(socialBare,$navLinks.firstChild);            
         //   el.style.display='none';
        });
    }


});
breakpoints.on('>=medium', function() {
    is_small = false;
    disableBlur();
    $wrapper.style.gridTemplateColumns = '100px auto 100px';
    const main = document.querySelector('main');
    $sidebar.forEach((el) =>{
        main.parentNode.insertBefore(el,main.previousSibling);
        //el.style.display='flex';
    })

});

manageNavSlide();
setHeroHeight();