(function() {
  // IMPORTANT: We use cooltipz
  
  /* Options
  tooltip: {
    position : 'top' / 'left' / 'bottom' / 'right' (default: 'top')
    size     : 'small' / 'medium' / 'large' / 'fit' (default: 'large')
    separator: <string> (default: '~@~')
    underline: true / false (default: true)
  }
  */
  
  let BASE = '';
  
  const POS  = ['top', 'left', 'bottom', 'right'];
  const SIZE = ['small', 'medium', 'large', 'fit'];
  
  const DEFAULT_SEP = '~@~';
  const DEFAULT_ULINE = true;
  const DEFAULT_SIZE = 'large';
  const DEFAULT_POS = 'top';
  
  /**
   * Initialise Tooltip JS
   */
  function initTooltipJS(opt, slideshow) {
    // Get Defaults
    // Separation
    let sep = opt && opt.tooltip && (opt.tooltip.sep ?? DEFAULT_SEP);
    if(typeof(sep) !== 'string' || sep === '') {
      sep = DEFAULT_SEP;
    }
    // Underline
    let uline = opt && opt.tooltip && opt.tooltip.underline && DEFAULT_ULINE;
    if(typeof(uline) !== 'boolean' && uline !== 'true' && uline !== 'false') {
      uline = true;
    }
    // Size
    let size = opt && opt.tooltip && (opt.tooltip.size ?? DEFAULT_SIZE);
    if(SIZE.indexOf(size) < 0) {
      size = DEFAULT_SIZE;
    }
    // Position
    let pos = opt && opt.tooltip && (opt.tooltip.position ?? DEFAULT_POS);
    if(POS.indexOf(pos) < 0) {
      pos = DEFAULT_POS;
    }
    // Class Name
    let className = 'tooltip'
    
    // Initialise elements
    initTooltipElem(document.getElementsByClassName(className), sep, size, pos, uline);
    
    // Initialise by position
    for(const _pos of POS) {
      initTooltipElem(document.getElementsByClassName(`tooltip_${_pos}`), sep, size, _pos, uline);
      initTooltipElem(document.getElementsByClassName(`tooltip_${_pos}_noline`), sep, size, _pos, false);
    }
    
    // Initialise by size
    for(const _size of SIZE) {
      initTooltipElem(document.getElementsByClassName(`tooltip_${_size}`), sep, _size, pos, uline);
      initTooltipElem(document.getElementsByClassName(`tooltip_${_size}_noline`), sep, _size, pos, false);
    }
    
    // Initialise by size and position
    for(const _pos of POS) {
      for(const _size of SIZE) {
        initTooltipElem(document.getElementsByClassName(`tooltip_${_pos}_${_size}`), sep, _size, _pos, uline);
        initTooltipElem(document.getElementsByClassName(`tooltip_${_size}_${_pos}`), sep, _size, _pos, uline);
        initTooltipElem(document.getElementsByClassName(`tooltip_${_pos}_${_size}_noline`), sep, _size, _pos, false);
        initTooltipElem(document.getElementsByClassName(`tooltip_${_size}_${_pos}_noline`), sep, _size, _pos, false);
      }
    }
  }
  
  /**
   * Initialise Tooltip Elements
   */
  function initTooltipElem(ttips, sep, size, pos, uline) {
    const temps = [];
    for(const ttip of ttips) { temps.push(ttip); }
    for(const ttip of temps) {
      let tips = ttip.innerHTML.split(sep);
      if(tips.length > 1) {
        if(uline) {
          ttip.innerHTML = `<span data-cooltipz-dir="${pos}" data-cooltipz-size="${size}" aria-label="${tips[1]}" class="tooltip_">${tips[0]}</span>`;
        } else {
          ttip.innerHTML = `<span data-cooltipz-dir="${pos}" data-cooltipz-size="${size}" aria-label="${tips[1]}" class="tooltip">${tips[0]}</span>`;
        }
      }
    }
  }
  
  /**
   * Initialise Tooltip CSS
   */
  function initTooltipCSS(opt, slideshow) {
    let head = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
    link.href = `${BASE}plugins/tooltip/cooltipz.css`;
    link.rel  = 'stylesheet';
    link.type = 'text/css'; 
    head.appendChild(link);
  }
  
  // Initialise
  function init(opt, slideshow) {
    if (opt && opt.base) {
      BASE = opt.base;
      if (BASE[BASE.length-1] != '/') {
        BASE = BASE + '/';
      }
    }
    initTooltipJS(opt, slideshow);
    initTooltipCSS(opt, slideshow);
  }
  
  remark.register(init);
})();