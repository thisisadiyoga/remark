(function() {
  /* options
  coder: {
    print: 'print'
  }
  */
  
  let BASE = '';
  
  const DEFAULT_PRINT = 'print';
  let PRINT = DEFAULT_PRINT;
  
  const BLANK = [
    ['ㅤ',''],
    ['​',''],  // zero width space (ZWSP)
    ['ㅤ',''], // Hangul Filler Character (Unicode U+3164, HTML &#12644)
    ['‎',''],  // ??
    ['​',''],  // &#32;
    ['​ ',''], // &#160;  (&nbsp;)
    [' ',''], // &#8194; (&ensp;)
    [' ',''], // &#8195; (&emsp;)
    [' ',''], // &#8196; (&emsp13;)
    [' ',''], // &#8197; (&emsp14;)
    [' ',''], // &#8198;
    [' ',''], // &#8199; (&numsp;)
    [' ',''], // &#8200; (&puncsp;)
    [' ',''], // &#8201; (&thinsp;)
    [' ',''], // &#8202; (&hairsp;)
    [' ',''], // &#8239;
    [' ',''], // &#8287; (MediumSpace)
    ['　',''], // &#12288;
  ];
  
  function process$name(code,vals,opt,slideshow) {
    // Preprocess
    vals = vals.split(';');
    const name = vals[0];
    const pre  = vals[1] ?? '';
    
    // Process
    const hdiv = document.createElement('div');
    hdiv.className = 'remark-code-header'
    const ndiv = document.createElement('div');
    ndiv.innerHTML = `<p class="remark-code-title"><i class="fa-solid fa-file-code"></i>&nbsp;<samp>${name}</samp></p>`;
    hdiv.append(ndiv);
    
    // Events
    let res = '';
    for(const child of code.childNodes) {
      res += pres[pre](child,opt);
    }
    ndiv.onclick = function() {
      var el = document.createElement('a');
      el.setAttribute('href',  'data:text/plain;charset=utf-8,'
      + encodeURIComponent(res));
      el.setAttribute('download', name);

      document.body.appendChild(el);
      el.click();
      document.body.removeChild(el);
    };
    
    // Finalise
    code.parentElement.prepend(hdiv);
    return 1;
  }
              function codes_hasMeta(code) {
                if(code && code.childNodes[0] && code.childNodes[0].classList) {
                  return code.childNodes[0].classList.contains('hljs-meta');
                } else {
                  return false;
                }
              }
              function codes_replaceBlank(txt) {
                for(const blank of BLANK) {
                  txt = txt.replaceAll(blank[0],blank[1]);
                }
                return txt;
              }
          function codes_processCodes_cmnt(clone) {
            for(const cmnt of clone.getElementsByClassName('hljs-comment')) {
              cmnt.innerHTML = '';
            }
            return clone;
          }
          function codes_processCodes_meta(clone) {
            for(const meta of clone.getElementsByClassName('hljs-meta')) {
              meta.innerHTML = '';
            }
            return clone;
          }
          function codes_processCodes_outp(clone) {
            for(const outp of clone.getElementsByClassName('hljs-output')) {
              outp.innerHTML = '';
            }
            return clone;
          }
          function codes_processCodes_errs(clone) {
            for(const errs of clone.getElementsByClassName('hljs-error')) {
              errs.innerHTML = '';
            }
            return clone;
          }
      function process$namePrint(code,opt) {
        let clone = code.cloneNode(true);
        if(codes_hasMeta(code)) {
          clone = codes_processCodes_meta(clone);
          clone = codes_processCodes_cmnt(clone);
          const txt = codes_replaceBlank(clone.textContent);
          return `${PRINT}(${txt.trimEnd().slice(1)})\r\n`;
        } else {
          return '';
        }
      }
      function process$nameShell(code,opt) {
        let clone = code.cloneNode(true);
        if(codes_hasMeta(code)) {
          clone = codes_processCodes_meta(clone);
          clone = codes_processCodes_cmnt(clone);
          const txt = codes_replaceBlank(clone.textContent);
          return `${txt.trimEnd().slice(1)}\r\n`;
        } else {
          return '';
        }
      }
      function process$nameCodes(code,opt) {
        let clone = code.cloneNode(true);
        if(codes_hasMeta(code)) {
          clone = codes_processCodes_meta(clone);
          clone = codes_processCodes_outp(clone);
          const txt = codes_replaceBlank(clone.textContent);
          return `${txt.trimEnd().slice(1)}\r\n`;
        } else {
          clone = codes_processCodes_outp(clone);
          const txt = codes_replaceBlank(clone.textContent);
          return `${txt.trimEnd()}\r\n`;
        }
      }
      function process$nameID(code,opt) {
        let clone = code.cloneNode(true);
        if(codes_hasMeta(code)) {
          clone = codes_processCodes_meta(clone);
          const txt = codes_replaceBlank(clone.textContent);
          return `${txt.trimEnd().slice(1)}\r\n`;
        } else {
          const txt = codes_replaceBlank(clone.textContent);
          return `${txt.trimEnd()}\r\n`;
        }
      }
      function process$nameNones(code,opt) {
        return '';
      }
  function process$multi(code,vals,kind,opt,slideshow) {
    try {
      // Preprocess
      vals = vals.split(';');
      const line = [];
      for(const lines of vals) {
        line.push(process$multi_getLine(lines,opt));
      }
      const codes = [];
      const process = stepper[kind]
      for(const lns of line) {
        codes.push(process(code,lns,opt));
      }
      codes.push(code.cloneNode(true));
      const cmnts = process$multi_uncomment(codes,opt);
      const shadow = [cmnts,codes];

      let curr = 0;
      let cmnt = 0;
      let last = shadow[0].length-1;
    
      // Process
      const sdiv = document.createElement('div');
      sdiv.className = 'remark-code-footer'
        const fdiv = document.createElement('span');
        fdiv.innerHTML = '<i class="fa-solid fa-backward-fast"></i>';
        fdiv.className = 'remark-code-footer-btn remark-code-btn-active';
        const bdiv = document.createElement('span');
        bdiv.innerHTML = '<i class="fa-solid fa-backward-step"></i>';
        function bdiv_className() {
          if(curr === 0) {
            bdiv.className = 'remark-code-footer-btn remark-code-btn-passive';
          } else {
            bdiv.className = 'remark-code-footer-btn remark-code-btn-active';
          }
        } bdiv_className();
        const ndiv = document.createElement('span');
        ndiv.innerHTML = '<i class="fa-solid fa-forward-step"></i>';
        function ndiv_className() {
          if(curr === last) {
            ndiv.className = 'remark-code-footer-btn remark-code-btn-passive';
          } else {
            ndiv.className = 'remark-code-footer-btn remark-code-btn-active';
          }
        } ndiv_className();
        const ldiv = document.createElement('span');
        ldiv.innerHTML = '<i class="fa-solid fa-forward-fast"></i>';
        ldiv.className = 'remark-code-footer-btn remark-code-btn-active';
        const cdiv = document.createElement('span');
        cdiv.innerHTML = '<i class="fa-solid fa-comment"></i>';
        cdiv.className = 'remark-code-footer-btn remark-code-btn-active';
        sdiv.appendChild(fdiv);
        sdiv.appendChild(bdiv);
        sdiv.appendChild(ndiv);
        sdiv.appendChild(ldiv);
        sdiv.appendChild(cdiv);

      // Events
      fdiv.onclick = function(e) {
        curr = 0;
        code.innerHTML = shadow[cmnt][curr].innerHTML;
        bdiv_className();
        ndiv_className();
      };
      bdiv.onclick = function(e) {
        if(curr === 0) { return; }
        if(curr === last) { curr = last; }
        curr--;
        code.innerHTML = shadow[cmnt][curr].innerHTML;
        bdiv_className();
        ndiv_className();
      };
      ndiv.onclick = function(e) {
        if(curr === last) { return; }
        curr++;
        code.innerHTML = shadow[cmnt][curr].innerHTML;
        bdiv_className();
        ndiv_className();
      };
      ldiv.onclick = function(e) {
        curr = last;
        code.innerHTML = shadow[cmnt][curr].innerHTML;
        bdiv_className();
        ndiv_className();
      };
      cdiv.onclick = function(e) {
        cmnt = shadow.length-1-cmnt;
        code.innerHTML = shadow[cmnt][curr].innerHTML;
        if(cmnt === 0) {
          cdiv.innerHTML = '<i class="fa-solid fa-comment"></i>';
        } else {
          cdiv.innerHTML = '<i class="fa-solid fa-comment-dots"></i>';
        }
      };

      window.addEventListener('beforeprint', function(e) {
        code.innerHTML = shadow[shadow.length-1][last].innerHTML;
      });
      window.addEventListener('afterprint', function(e) {
        code.innerHTML = shadow[cmnt][curr].innerHTML;
      });

      // Finalise
      code.parentElement.append(sdiv);
      code.innerHTML = shadow[cmnt][curr].innerHTML;
      return 2;
    } catch(e) {console.error(e);}
  }
  function process$single(code,vals,kind,opt,slideshow) {
    try {
      // Preprocess
      vals = vals.split(';');
      const line = [];
      for(const lines of vals) {
        line.push(process$multi_getLine(lines,opt));
        break;
      }
      const codes = [];
      const process = stepper[kind]
      for(const lns of line) {
        codes.push(process(code,lns,opt));
      }
      codes.push(code.cloneNode(true));

      // Finalise
      code.innerHTML = codes[0].innerHTML;
      return 0;
    } catch(e) {console.error(e);}
  }
      function process$steps(code,lns,opt) {
        const clone = code.cloneNode(true);
        for(let i=0; i<clone.childNodes.length; i++) {
          if(lns.indexOf(i) < 0) {
            clone.childNodes[i].classList.add("remark-code-hidden");
          }
        }
        return clone;
      }
      function process$emphs(code,lns,opt) {
        const clone = code.cloneNode(true);
        for(let i=0; i<clone.childNodes.length; i++) {
          if(lns.indexOf(i) < 0) {
            clone.childNodes[i].classList.add("remark-code-unhighlighted");
          }
        }
        return clone;
      }
      function process$lites(code,lns,opt) {
        const clone = code.cloneNode(true);
        for(let i=0; i<clone.childNodes.length; i++) {
          if(lns.indexOf(i) >= 0) {
            clone.childNodes[i].classList.add("remark-code-hilite");
          }
        }
        return clone;
      }
      function process$shows(code,lns,opt) {
        const clone = code.cloneNode(true);
        for(let i=0; i<clone.childNodes.length; i++) {
          if(lns.indexOf(i) < 0) {
            clone.childNodes[i].classList.add("remark-code-dispnone");
          }
        }
        return clone;
      }
      function process$multi_uncomment(codes,opt) {
        const cmnts = [];
        for(const code of codes) {
          const clone = code.cloneNode(true);
          for(const cmnt of clone.getElementsByClassName('hljs-comment')) {
            cmnt.classList.add("remark-code-hidden");
          }
          cmnts.push(clone);
        }
        return cmnts;
      }
      function process$multi_getLine(lines,opt) {
        // Number is decremented by 1 to match index
        let line = [];
        for(const lns of lines.split(',')) {
          if(lns.indexOf('-') >= 0) {
            const rng = lns.split('-');
            const s = parseInt(rng[0]),
                  e = parseInt(rng[1]);
            if(e < s) { throw "range error"; }
            for(let i=s-1; i<e; i++) {
              line.push(i);
            }
          } else {
            line.push(parseInt(lns-1));
          }
        }
        return line;
      }
  function process$copy(code,pre,kind,opt,slideshow) {
    // Process
    const cdiv = document.createElement('div');
    cdiv.className = 'remark-code-copy remark-code-btn-active';
    cdiv.innerHTML = '<i class="fa-solid fa-copy"></i>';
    
    // Events
    let res = '';
    for(const child of code.childNodes) {
      res += pres[pre](child,opt);
    }
    if(res !== '') {
      cdiv.onclick = function() {
        navigator.clipboard.writeText(res);
        cdiv.innerHTML = '<i class="fa-solid fa-copy" style="color:#006400"></i>';
        setTimeout(function() {
          cdiv.innerHTML = '<i class="fa-solid fa-copy"></i>';
        }, 1500)
      };

      // Finalise
      code.parentElement.prepend(cdiv);
    }
  }
  
  const proc  = {
    name : process$name,
    steps: process$multi,
    emphs: process$multi,
    lites: process$multi,
    step : process$single,
    emph : process$single,
    lite : process$single,
    show : process$single,
    copy : process$copy,
  }
  const pres  = {
    print: process$namePrint,
    codes: process$nameCodes,
    shell: process$nameShell,
    nones: process$nameNones,
    '':    process$nameID,
  }
  const stepper  = {
    steps: process$steps,
    emphs: process$emphs,
    lites: process$lites,
    step:  process$steps,
    emph:  process$emphs,
    lite:  process$lites,
    show:  process$shows,
    '':    process$nameID,
  }
  const clsnm = ['remark-code-none','remark-code-headed','remark-code-footed','remark-code-both'];
  
  
  /**
   * Preprocessor
   *   TODO: Use peg.js
   */
  function parse(classList) {
    const res = {};
    for(let i=0; i<classList.length; i++) {
      if(classList[i].indexOf('[')>=0) {
        const className = classList[i].slice(0,classList[i].indexOf('['));
        const properties = classList[i].slice(classList[i].indexOf('[')+1,-1);
        
        classList.remove(classList[i]);
        classList.add(className);
        
        for(const property of properties.split('|')) {
          const keyVal = property.split('=');
          res[keyVal[0]] = keyVal[1];
        }
      }
    }
    return res;
  }
  
  /**
   * Initialize Coder Elements
   */
  function initCoderElements(opt, slideshow) {
    const codes = document.getElementsByClassName('remark-code');
    const temps = [];
    
    // Temporary to avoid infinite loop
    for (const code of codes) {
      temps.push(code);
    }
    
    // Process
    for(const code of temps) {
      const properties = parse(code.classList);
      let clsn = 0, copied = false;
      for(const key in properties) {
        if(key === 'copy') { copied = true; }
        clsn = clsn | proc[key](code,properties[key],key,opt,slideshow);
      }
      if(!copied) {
        process$copy(code,'codes','',opt,slideshow);
      }
      code.classList.add(clsnm[clsn]);
    }
  }
  
  /**
   * Initialize Coder CSS
   */
  function initCoderCSS(opt, slideshow) {
    let head = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
    link.href = `${BASE}plugins/coder/style.css`;
    link.rel  = 'stylesheet';
    link.type = 'text/css'; 
    head.appendChild(link);
  }
  
  // Initialization function
  function init(opt, slideshow) {
    if (opt && opt.base) {
      BASE = opt.base;
      if (BASE[BASE.length-1] != '/') {
        BASE = BASE + '/';
      }
    }
    if (opt && opt.coder && opt.coder.print) {
      PRINT = opt.coder.print;
    }
    initCoderElements(opt, slideshow);
    initCoderCSS(opt, slideshow);
  }
  
  remark.register(init);
})();