(function() {
  /* Options
  anims: {
    sep: string (default '~@~')
  }
  */

  let BASE = '';
  let SEP = '~@~';
  
  const anims = {};
  
  /**
   * Initialise Anims Elements
   */
  function initAnimElement(opt, slideshow) {
    // Anchor
    for(const anc of document.getElementsByClassName('anims-anchor')) {
      const on  = anc.getElementsByClassName('anims-on')[0].innerHTML;
      for(const _tag of anc.getElementsByClassName('anims-anchor-tag')) {
        for(const tag of _tag.innerHTML.split(SEP)) {
          if(anims[tag] === undefined) {
            anims[tag] = {
              anc: [], tgt: []
            };
          }
          for(const _on of on.split(SEP)) {
            anims[tag].anc.push([anc,_on]);
          }
        }
      }
    }
    
    // Target
    for(const tgt of document.getElementsByClassName('anims-target')) {
      const cls = tgt.getElementsByClassName('anims-cls')[0].innerHTML;
      for(const _tag of tgt.getElementsByClassName('anims-target-tag')) {
        for(const tag of _tag.innerHTML.split(SEP)) {
          if(anims[tag] === undefined) {
            anims[tag] = {
              anc: [], tgt: []
            };
          }
          anims[tag].tgt.push([tgt,cls]);
        }
      }
    }
  }
  
  /**
   * Initialise Anims JS
   */
  function initAnimJS(opt, slideshow) {
    for(const key of Object.keys(anims)) {
      const anim = anims[key];
      for(const anc of anim.anc) {
        anc[0].addEventListener(anc[1], function(e) {
          for(const tgt of anim.tgt) {
            for(const cls of tgt[1].split(SEP)) {
              tgt[0].classList.toggle(cls);
            }
          }
        });
      }
    }
  }
  
  /**
   * Initialise Anims CSS
   */
  function initAnimCSS(opt, slideshow) {
    let head = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
    link.href = `${BASE}plugins/anims/style.css`;
    link.rel  = 'stylesheet';
    link.type = 'text/css'; 
    head.appendChild(link);
  }
  
  function init(opt, slideshow) {
    if (opt && opt.anims && opt.anims.sep && typeof(opt.anims.sep) == 'string') {
      SEP = opt.anims.sep;
    }
    if (opt && opt.base) {
      BASE = opt.base;
      if (BASE[BASE.length-1] != '/') {
        BASE = BASE + '/';
      }
    }
    initAnimElement(opt, slideshow);
    initAnimJS(opt, slideshow);
    initAnimCSS(opt, slideshow);
  }
  
  remark.register(init);
})();