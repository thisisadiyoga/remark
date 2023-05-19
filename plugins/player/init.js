(function() {
  // IMPORTANT: Require FontAwesome
  
  /* Options
  player: {
    size  : 'small' (20px) / 'medium' (24px) / 'large' (28px) (default: 'medium')
    time  : <number> (default: 15)
  }
  */
  
  let BASE = '';
  
  const BTN = [
    /* Slide   */
    {'color': '#111'   , 'fa': 'solid'  , 'icon': 'backward-step' , 'class': 'remark-player-button-btn remark-player-button-on remark-player-button-L'},
    {'color': '#111'   , 'fa': 'regular', 'icon': 'circle-play', 'class': 'remark-player-button-btn remark-player-button-on'},
    {'color': '#111'   , 'fa': 'solid'  , 'icon': 'forward-step', 'class': 'remark-player-button-btn remark-player-button-on remark-player-button-R'},
    
  ];
  const SIZE = {
    'small' : 'remark-player-button-small' ,
    'medium': 'remark-player-button-medium',
    'large' : 'remark-player-button-large' ,
  };
  const BTNS = [];
  const ICONS = [];
  
  const PREV_BUTTON = 0;
  const PLAY_BUTTON = 1;
  const NEXT_BUTTON = 2;
  
  const DEFAULT_TIME = 15;
  const DEFAULT_SIZE = 'medium';
  
  const MAX = DEFAULT_TIME;
  
  let LAST = 0;
  let TIME = DEFAULT_TIME;
  let INTV = null;
  let CTX = 0;
  
  /**
   * Initialise Player Elements
   */
  function initPlayerElements(opt, slideshow) {
    let size = opt && opt.player && (opt.player.size ?? DEFAULT_SIZE);
    if(!SIZE.hasOwnProperty(size)) {
      size = DEFAULT_SIZE;
    }
    let time = opt && opt.player && (opt.player.time ?? `${DEFAULT_TIME}`);
    try {
      time = parseInt(time);
    } catch(e) {
      time = DEFAULT_TIME;
    }
    if(isNaN(time)) {
      time = DEFAULT_TIME;
    }
    TIME = time*1000;
    
    const buttons = document.createElement('div');
    buttons.className = 'remark-player-button';
    
    for(const button of BTN) {
      const span = document.createElement('span');
      span.className = SIZE[size] + ' ' + button.class + ' remark-player-button-button';
      span.style.color = button.color;
      const icon = document.createElement('i');
      icon.className = `fa-${button.fa} fa-${button.icon}`;
      span.appendChild(icon);
      buttons.appendChild(span);
      BTNS.push(span);
      ICONS.push(icon);
    }
    document.getElementsByTagName('body')[0].appendChild(buttons);
    
    LAST = slideshow.getSlides().length-1;
  }
  
  /**
   * Initialise Player JS
   */
  function initPlayerJS(opt, slideshow) {
    BTNS[PREV_BUTTON].onclick = slideshow.gotoPreviousSlide;
    BTNS[PLAY_BUTTON].onclick = play_pause(slideshow);
    BTNS[NEXT_BUTTON].onclick = slideshow.gotoNextSlide;
    slideshow.on('showSlide', _update);
    
    let curr = slideshow.getCurrentSlideIndex();
    let ctmx = slideshow.getSlideCount();
    if(curr > ctmx) { curr = ctmx; slideshow.gotoSlide(curr); }
    if(curr < 0)    { curr = 0;    slideshow.gotoSlide(curr); }
    _update(slideshow.getSlides()[curr]);
  }
    function play_pause(slideshow) {
      return function() {
        if(INTV === null) {
          CTX = 0;
          INTV = setTimeout(slideshow.gotoNextSlide, TIME);
          BTNS[PLAY_BUTTON].innerHTML = `<i class='fa-solid fa-circle-notch rotated0' style="animation:rotator ${TIME/1000}s linear infinite"></i>`;
        } else {
          clearTimeout(INTV);
          INTV = null;
          BTNS[PLAY_BUTTON].innerHTML = `<i class="fa-${BTN[PLAY_BUTTON].fa} fa-${BTN[PLAY_BUTTON].icon}"></i>`;
        }
      }
    }
    function play_stop() {
      if(INTV !== null) {
        clearInterval(INTV);
        INTV = null;
        BTNS[PLAY_BUTTON].innerHTML = `<i class="fa-${BTN[PLAY_BUTTON].fa} fa-${BTN[PLAY_BUTTON].icon}"></i>`;
      }
    }
    function _update(slide) {
      const curr = slide.getSlideIndex();
      if(curr === 0) {
        BTNS[PREV_BUTTON].classList.remove('remark-player-button-btn');
        BTNS[PREV_BUTTON].classList.add('remark-player-button-off');
      } else {
        BTNS[PREV_BUTTON].classList.remove('remark-player-button-off');
        BTNS[PREV_BUTTON].classList.add('remark-player-button-btn');
      }
      if(curr === LAST) {
        BTNS[NEXT_BUTTON].classList.remove('remark-player-button-btn');
        BTNS[NEXT_BUTTON].classList.add('remark-player-button-off');
        if(INTV !== null) {
          play_stop();
        }
      } else {
        BTNS[NEXT_BUTTON].classList.remove('remark-player-button-off');
        BTNS[NEXT_BUTTON].classList.add('remark-player-button-btn');
      }
      
      if(INTV !== null) {
        CTX = 0;
        clearTimeout(INTV);
        INTV = setTimeout(slideshow.gotoNextSlide, TIME);
        BTNS[PLAY_BUTTON].innerHTML = `<i class='fa-solid fa-circle-notch rotated0' style="animation:rotator ${TIME/1000}s linear infinite"></i>`;
      } else {
        clearTimeout(INTV);
        INTV = null;
        BTNS[PLAY_BUTTON].innerHTML = `<i class="fa-${BTN[PLAY_BUTTON].fa} fa-${BTN[PLAY_BUTTON].icon}"></i>`;
      }
    }
  
  /**
   * Initialise Player CSS
   */
  function initPlayerCSS(opt, slideshow) {
    let head = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
    link.href = `${BASE}plugins/player/style.css`;
    link.rel  = 'stylesheet';
    link.type = 'text/css'; 
    head.appendChild(link);
  }
  
  function init(opt, slideshow) {
    if (opt && opt.base) {
      BASE = opt.base;
      if (BASE[BASE.length-1] != '/') {
        BASE = BASE + '/';
      }
    }
    
    initPlayerElements(opt, slideshow);
    initPlayerJS(opt, slideshow);
    initPlayerCSS(opt, slideshow);
  }
  
  remark.register(init);
})();