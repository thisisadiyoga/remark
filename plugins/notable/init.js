(function() {
  let BASE = '';
  
  /**
   * Initialise Notable Elements
   */
  function initNotableElements(opt, slideshow) {
    for(const note of document.getElementsByClassName('notable')) {
      const h5 = note.getElementsByTagName('h5')[0];
      h5.classList.add('remark-notable-btn');
      const content = note.getElementsByClassName('content')[0];
      content.classList.add('remark-notable-hide');
      const txt = h5.innerHTML;
      
      let t = 1;
      h5.innerHTML = '&nbsp;+ ' + txt
      h5.onclick = function(e) {
        if (t == 0) { // close
          h5.innerHTML = '&nbsp;+ ' + txt
        } else {      // open
          h5.innerHTML = '&nbsp;× ' + txt
        }
        t = 1 - t;
        content.classList.toggle('remark-notable-hide');
      }
    }
  }
  
  /**
   * Initialise Notable CSS
   */
  function initNotableCSS(opt, slideshow) {
    let head = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
    link.href = `${BASE}plugins/notable/style.css`;
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

    initNotableElements(opt, slideshow);
    initNotableCSS(opt, slideshow);
  }
  
  remark.register(init);
})();