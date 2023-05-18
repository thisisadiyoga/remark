(function() {
  // IMPORTANT: Require FontAwesone
  
  /* options
  qanvas: {
    size:
      - 'small'  (16px)
      - 'medium' (20px) [default]
      - large'   (24px)
    layout:
      - 'vertical'   [default]
      - 'horizontal'
  }
  */
  
  let BASE = '';
  let BUTTON_KLASS = 'remark-canvas-button';
  let CANVAS_KLASS = 'remark-slide-canvas';
  let FA_KLASS = 'fa-solid fa';
  let isShown = 0;
  
  const SEPARATOR = {
    'color': '#111',
    'icon': 'ellipsis-vertical',
    'class': `${BUTTON_KLASS}-separator`,
  };
  const BUTTONS = [
    // Canvas Buttons
    {
      'color': '#111',
      'icon': 'square-pen',
      'class': `${BUTTON_KLASS}-show-hide`
    },
    SEPARATOR,
    // Canvas Draw Tools
    {
      'color': '#111',
      'icon': 'pencil',
      'class': `${BUTTON_KLASS}-drawing ${BUTTON_KLASS}-draw-off`
    },
    {
      'color': '#111',
      'icon': 'highlighter',
      'class': `${BUTTON_KLASS}-drawing ${BUTTON_KLASS}-draw-off`
    },
    {
      'color': '#111',
      'icon': 'eraser',
      'class': `${BUTTON_KLASS}-drawing ${BUTTON_KLASS}-draw-off`
    },
    {
      'color': '#111',
      'icon': 'pen-fancy',
      'class': `${BUTTON_KLASS}-drawing ${BUTTON_KLASS}-draw-off`
    },
    SEPARATOR,
    // Canvas Colours
    {
      'color': '#111',
      'icon': 'square',
      'class': `${BUTTON_KLASS}-colour ${BUTTON_KLASS}-draw-off`
    },
    {
      'color': '#FE2712',
      'icon': 'square',
      'class': `${BUTTON_KLASS}-colour ${BUTTON_KLASS}-draw-off`
    },
    {
      'color': '#559E54',
      'icon': 'square',
      'class': `${BUTTON_KLASS}-colour ${BUTTON_KLASS}-draw-off`
    },
    {
      'color': '#0247FE',
      'icon': 'square',
      'class': `${BUTTON_KLASS}-colour ${BUTTON_KLASS}-draw-off`
    },
    {
      'color': '#FEFE33',
      'icon': 'square',
      'class': `${BUTTON_KLASS}-colour ${BUTTON_KLASS}-draw-off`
    },
    SEPARATOR,
    {
      'color': '#111',
      'icon': 'trash-can',
      'class': `${BUTTON_KLASS}-trash ${BUTTON_KLASS}-draw-on`
    },
  ];
  const SIZES = {
    'small': `${BUTTON_KLASS}-small`,
    'medium': `${BUTTON_KLASS}-medium`,
    'large': `${BUTTON_KLASS}-large`
  };
  const DEFAULT_SIZE = 'medium';
  const DEFAULT_LAYOUT = 'vertical';
  
  const L_BUTTON = 1;
  const R_BUTTON = 2;
  const STATE = ['source-over', 'source-over', 'destination-out'];
  
  const STATE_PENCIL = 0;
  const STATE_HIGHLIGHTER = 1;
  const STATE_ERASER = 2;
  const STATE_LASER = 3;
  
  const HIDDEN = 0;
  const SHOWN = 1;

  /**
   * Initialize Canvas Elements
   */
  function initCanvasElements(allContainers, opt, slideshow) {
    let canvasContainers = [];
    
    // Initialise 2 Canvases per Slide
    // 1. Pen
    // 2. Highlighter
    for (const container of allContainers) {
      let canvasContainer = document.createElement('div');
      canvasContainer.className = `${CANVAS_KLASS}-container`;
      
      // Canvas for pen
      let penCanvas = document.createElement('canvas');
      penCanvas.className = `${CANVAS_KLASS}-pen`;
      canvasContainer.appendChild(penCanvas);
      
      // Canvas for highlighter
      let highlighterCanvas = document.createElement('canvas');
      highlighterCanvas.className = `${CANVAS_KLASS}-highlighter`;
      canvasContainer.appendChild(highlighterCanvas);
      
      canvasContainers.push({
        'pen': penCanvas,
        'highlighter': highlighterCanvas
      });
      container.appendChild(canvasContainer);
    }
    
    return canvasContainers;
  }

  /**
   * Initialize Canvas Buttons
   */
  function initCanvasButtons(allContainers, opt, slideshow) {
    // Retrieve the size option
    let size = DEFAULT_SIZE;
    if (opt && opt.qanvas && opt.qanvas.size) {
      size = opt.qanvas.size ?? DEFAULT_SIZE;
    }
    if (!SIZES.hasOwnProperty(size)) {
      size = DEFAULT_SIZE;
    }
    const sizeClass = SIZES[size];
    const baseClass = `${BUTTON_KLASS}-button`;
    
    // Retrieve the layout option
    let layout = DEFAULT_LAYOUT;
    if (opt && opt.qanvas && opt.qanvas.layout) {
      layout = opt.qanvas.layout ?? DEFAULT_LAYOUT;
    }
    if (layout !== 'vertical' && layout !== 'horizontal') {
      layout = DEFAULT_LAYOUT;
    }
    
    // Create all buttons
    const buttons = document.createElement('div');
    buttons.className = BUTTON_KLASS;
    
    for (const buttonElement of BUTTONS) {
      const span = document.createElement('span');
      span.className = `${sizeClass} ${buttonElement.class} ${baseClass}`;
      span.style.color = buttonElement.color;
      
      const icon = document.createElement('i');
      icon.className = `${FA_KLASS}-${buttonElement.icon}`;
      
      span.appendChild(icon);
      buttons.appendChild(span);
      
      if (layout === 'vertical') {
        buttons.appendChild(document.createElement('br'));
      }
      
      document.getElementsByTagName('body')[0].appendChild(buttons);
    }
  }
  
  /**
   * Initialize Canvas Actions
   */
  function initCanvasActions(canvasContainers, opt, slideshow) {
    // FUNCTIONS
    const $pointers = [];
    const $functions = [];
    
    // Internal State
    let canvasColor = '#111';
    let canvasState = STATE_PENCIL;
    let currentColor = 0;
    
    // HELPER
    function initCanvas(penCanvas, hilCanvas, showhide, scaler, colours) {
      let isDown = false;
      
      // Initialise pen
      const penContext = penCanvas.getContext('2d');
      penCanvas.style.cursor = `url("${BASE}plugins/qanvas/resc/pencil.png") 0 24,crosshair`;
      penCanvas.width = parseInt(scaler.style.width);
      penCanvas.height = parseInt(scaler.style.height);
      
      // Initialise highlighter
      const hilContext = hilCanvas.getContext('2d');
      hilCanvas.style.cursor = `url("${BASE}plugins/qanvas/resc/pencil.png") 0 24,crosshair`;
      hilCanvas.width = parseInt(scaler.style.width);
      hilCanvas.height = parseInt(scaler.style.height);
      
      // INNER HELPER
      function getPoints(event) {
        let scale = scaler.style.transform;
        scale = parseFloat(scale.slice(scale.indexOf('(') + 1, -1));
        
        let offsetLeft = parseFloat(scaler.style.left);
        let offsetTop = parseFloat(scaler.style.top);
        
        return [
          (event.pageX - offsetLeft) / scale,
          (event.pageY - offsetTop) / scale
        ];
      }
      function setPointer(currState) {
        switch(currState ?? canvasState) {
          case STATE_PENCIL:
            penCanvas.style.cursor = `url("${BASE}plugins/qanvas/resc/pencil.png") 0 24,crosshair`;
            hilCanvas.style.cursor = `url("${BASE}plugins/qanvas/resc/pencil.png") 0 24,crosshair`;
            break;
          case STATE_HIGHLIGHTER:
            penCanvas.style.cursor = `url("${BASE}plugins/qanvas/resc/hiliter.png") 0 24,crosshair`;
            hilCanvas.style.cursor = `url("${BASE}plugins/qanvas/resc/hiliter.png") 0 24,crosshair`;
            break;
          case STATE_ERASER:
            penCanvas.style.cursor = `url("${BASE}plugins/qanvas/resc/eraser.png") 0 24,crosshair`;
            hilCanvas.style.cursor = `url("${BASE}plugins/qanvas/resc/eraser.png") 0 24,crosshair`;
            break;
          case STATE_LASER:
            penCanvas.style.cursor = `url("${BASE}plugins/qanvas/resc/laser.png") 16 16,crosshair`;
            hilCanvas.style.cursor = `url("${BASE}plugins/qanvas/resc/laser.png") 16 16,crosshair`;
            break;
        }
      }
      $pointers.push(setPointer);
      
      // EVENT HELPER
      function _stop(event) {
        event.stopPropagation();
        event.preventDefault();
      }
      // - DOWN
      function _mousedown(event) {
        isDown = true;
        
        const pt = getPoints(event);
        const ptX = pt[0];
        const ptY = pt[1];
        
        switch (event.buttons) {
          case L_BUTTON:
            switch (canvasState) {
              case STATE_PENCIL:
                penContext.globalCompositeOperation = 'source-over';
                penContext.lineWidth = 1;
                penContext.strokeStyle = _stroke(canvasColor);
                setPointer();
                
                penContext.beginPath();
                penContext.moveTo(ptX, ptY); // TODO: check swap
                break;
              case STATE_HIGHLIGHTER:
                hilContext.globalCompositeOperation = 'source-over';
                hilContext.lineWidth = 16;
                hilContext.strokeStyle = _stroke(canvasColor);
                setPointer();
                
                hilContext.beginPath();
                hilContext.moveTo(ptX, ptY); // TODO: check swap
                break;
              case STATE_ERASER:
                penContext.globalCompositeOperation = 'destination-out';
                penContext.lineWidth = 31;
                penContext.strokeStyle = _stroke(canvasColor);
                hilContext.globalCompositeOperation = 'destination-out';
                hilContext.lineWidth = 31;
                hilContext.strokeStyle = _stroke(canvasColor);
                setPointer();
                
                penContext.beginPath();
                penContext.moveTo(ptX, ptY); // TODO: check swap
                hilContext.beginPath();
                hilContext.moveTo(ptX, ptY); // TODO: check swap
                break;
            }
            break;
          case R_BUTTON:
            penContext.globalCompositeOperation = 'destination-out';
            penContext.lineWidth = 31;
            hilContext.globalCompositeOperation = 'destination-out';
            hilContext.lineWidth = 50;
            setPointer();
            
            hilContext.moveTo(ptX, ptY); // TODO: check swap
            hilContext.beginPath();
            break;
        }
        _stop(event);
      }
      function _touchstart(event) {
        _stop(event);
        const touch = event.touches[0];
        _mousedown(new MouseEvent('mousedown', {
          clientX: touch.clientX,
          clientY: touch.clientY,
          buttons: L_BUTTON
        }));
      }
      // - MOVE
      function _mousemove(event) {
        if (isDown) {
          const pt = getPoints(event);
          const ptX = pt[0];
          const ptY = pt[1];
          
          switch (canvasState) {
            case STATE_PENCIL:
              penContext.lineTo(ptX, ptY);
              penContext.stroke();
              break;
            case STATE_HIGHLIGHTER:
              hilContext.lineTo(ptX, ptY);
              hilContext.stroke();
              break;
            case STATE_ERASER:
              penContext.lineTo(ptX, ptY);
              penContext.stroke();
              hilContext.lineTo(ptX, ptY);
              hilContext.stroke();
              break;
          }
          _stop(event);
        }
      }
      function _touchmove(event) {
        _stop(event);
        const touch = event.touches[0];
        _mousemove(new MouseEvent('mousemove', {
          clientX: touch.clientX,
          clientY: touch.clientY,
          buttons: L_BUTTON
        }));
      }
      // - UP
      function _mouseup(event) {
        if (isDown) {
          switch (canvasState) {
            case STATE_PENCIL:
              penContext.closePath();
              break;
            case STATE_HIGHLIGHTER:
              hilContext.closePath();
              break;
            case STATE_ERASER:
              penContext.closePath();
              hilContext.closePath();
              break;
          }
          _stop(event);
        }
        isDown = false;
      }
      function _touchend(event) {
        const touch = event.touches[0];
        _mouseup(new MouseEvent('mouseup', {}));
      }
      // Attach event to pen canvas
      penCanvas.addEventListener('mousedown', _mousedown, false);
      penCanvas.addEventListener('mousemove', _mousemove, false);
      penCanvas.addEventListener('mouseup', _mouseup, false);
      penCanvas.addEventListener('touchstart', _touchstart, false);
      penCanvas.addEventListener('touchmove', _touchmove, false);
      penCanvas.addEventListener('touchend', _touchend, false);
      penCanvas.addEventListener('pointercancel', _stop, false);
      penCanvas.addEventListener('contextmenu', _stop, false);
      // Attach event to highlighter canvas
      hilCanvas.addEventListener('mousedown', _mousedown, false);
      hilCanvas.addEventListener('mousemove', _mousemove, false);
      hilCanvas.addEventListener('mouseup', _mouseup, false);
      hilCanvas.addEventListener('touchstart', _touchstart, false);
      hilCanvas.addEventListener('touchmove', _touchmove, false);
      hilCanvas.addEventListener('touchend', _touchend, false);
      hilCanvas.addEventListener('pointercancel', _stop, false);
      hilCanvas.addEventListener('contextmenu', _stop, false);
      
      function _stateChange(event) {
        switch (canvasState) {
          case STATE_PENCIL:
            penCanvas.classList.remove('canvas-hide');
            hilCanvas.classList.remove('canvas-show');
            penCanvas.classList.add('canvas-show');
            hilCanvas.classList.add('canvas-hide');
            break;
          case STATE_HIGHLIGHTER:
            penCanvas.classList.remove('canvas-show');
            hilCanvas.classList.remove('canvas-hide');
            penCanvas.classList.add('canvas-hide');
            hilCanvas.classList.add('canvas-show');
            break;
          case STATE_ERASER:
            penCanvas.classList.remove('canvas-hide');
            hilCanvas.classList.remove('canvas-hide');
            penCanvas.classList.add('canvas-show');
            hilCanvas.classList.add('canvas-show');
            break;
        }
      }
      function _show(event) {
        if (isShown == SHOWN) {
          penCanvas.classList.remove('canvas-show');
          hilCanvas.classList.remove('canvas-show');
          penCanvas.classList.add('canvas-hide');
          hilCanvas.classList.add('canvas-hide');
        } else {
          _stateChange(event);
        }
      }
      $functions.push(_show);
      showhide.addEventListener('click', _show);
      
      function _clear(event) {
        penContext.clearRect(0, 0, penCanvas.width, penCanvas.height);
        hilContext.clearRect(0, 0, hilCanvas.width, hilCanvas.height);
      }
      
      return [_clear, _stateChange];
    }
    
    function _stroke(colour) {
      let colours = colour.slice(colour.indexOf('(')+1,-1).split(', ');
      return `rgba(${colours[0]}, ${colours[1]}, ${colours[2]}, ${1})`;
    }
    
    // INITIALISATION
    const _button = document.getElementsByClassName(`${BUTTON_KLASS}-button`);
    const _colour = document.getElementsByClassName(`${BUTTON_KLASS}-colour`);
    const _drawing = document.getElementsByClassName(`${BUTTON_KLASS}-drawing`);
    const _trash = document.getElementsByClassName(`${BUTTON_KLASS}-trash`);
    const _scaler = document.getElementsByClassName('remark-slide-scaler');
    
    const _canvasFunc = [];
    for (let i=0; i<canvasContainers.length; i++) {
      _canvasFunc.push(initCanvas(canvasContainers[i].pen, canvasContainers[i].highlighter, _button[0], _scaler[i], _colour));
    }
    _trash[0].addEventListener('click', function(event) {
      _canvasFunc[slideshow.getCurrentSlideIndex()][0](event);
    });
    
    // Initialise Toggle
    function _toggle(event) {
      _button[0].classList.toggle(`${BUTTON_KLASS}-draw-on`);
      for (let i=0; i<_colour.length; i++) {
        _colour[i].classList.toggle(`${BUTTON_KLASS}-show-hide`);
        _colour[i].classList.toggle(`${BUTTON_KLASS}-draw-off`);
        if (i === currentColor) {
          _colour[i].classList.toggle(`${BUTTON_KLASS}-draw-on`);
        }
      }
      for (let i=0; i<_drawing.length; i++) {
        _drawing[i].classList.toggle(`${BUTTON_KLASS}-show-hide`);
        _drawing[i].classList.toggle(`${BUTTON_KLASS}-draw-off`);
        if (i === canvasState) {
          _drawing[i].classList.toggle(`${BUTTON_KLASS}-draw-on`);
        }
      }
      isShown = 1 - isShown;
    }
    _button[0].addEventListener('click', _toggle);
    
    // Initialise Colour
    const _action = {};
    for (let i=0; i<_colour.length; i++) {
      _colour[i].onclick = function(event) {
        if(isShown === SHOWN) {
          canvasColor = _colour[i].style.color;
          _colour[currentColor].classList.toggle(`${BUTTON_KLASS}-draw-on`);
          _colour[i].classList.toggle(`${BUTTON_KLASS}-draw-on`);
          currentColor = i;
        }
      };
      _action[i+1] = _colour[i].onclick;
    }
    canvasColor = _colour[0].style.color;
    
    // Initialise Drawing
    for (let i=0; i<_drawing.length; i++) {
      _drawing[i].onclick = function(e) {
        if (isShown === SHOWN) {
          _drawing[canvasState].classList.toggle(`${BUTTON_KLASS}-draw-on`);
          _drawing[i].classList.toggle(`${BUTTON_KLASS}-draw-on`);
          canvasState = i;
          for (const $ptx of $pointers) {
            $ptx();
          }
          for (const $func of _canvasFunc) {
            $func[1](e);
          }
        }
      };
    }
    
    _action['q'] = function() {
      _button[0].click();
    };
    return _action;
  }
  
  /**
   * Initialize Canvas Events
   */
  function initCanvasEvent(action, canvasContainers, opt, slideshow) {
    window.addEventListener('keypress', function(e) {
      if (isShown === SHOWN) {
        if (action.hasOwnProperty(e.key)) {
          action[e.key]();
        }
        e.stopPropagation();
      } else {
        if (action.hasOwnProperty(e.key)) {
          action[e.key]();
        }
      }
    });
  }
  
  /**
   * Initialize Canvas CSS
   */
  function initCanvasCSS(opt, slideshow) {
    let head = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
    link.href = `${BASE}plugins/qanvas/style.css`;
    link.rel  = 'stylesheet';
    link.type = 'text/css'; 
    head.appendChild(link);
  }
  
  // Initialization function
  function init(opt, slideshow) {
    if (opt && opt.base) {
      BASE = opt.base;
      if (BASE[BASE.length - 1] != '/') {
        BASE = BASE + '/';
      }
    }
    
    const allContainers = document.getElementsByClassName('remark-slide-scaler');
    if (allContainers.length === 0) {
      return;
    }
    
    const canvasContainers = initCanvasElements(allContainers, opt, slideshow);
    initCanvasButtons(allContainers, opt, slideshow);
    const action = initCanvasActions(canvasContainers, opt, slideshow);
    initCanvasEvent(action, canvasContainers, opt, slideshow);
    
    initCanvasCSS(opt, slideshow);
  }
  
  // Register the plugin to remark
  remark.register(init);
})();