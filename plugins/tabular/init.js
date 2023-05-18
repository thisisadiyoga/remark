(function() {
  /* Options
  tabular: {
    cell: 'tbl-cell'
    row: 'tbl-row'
    span: 'tbl-span'
  }
  */
  
  let BASE = '';
  
  const DEFAULT_CELL = 'tbl-cell';
  const DEFAULT_ROW = 'tbl-row';
  const DEFAULT_SPAN = 'tbl-span';
  
  /**
   * Initialise Tabular Elements
   */
  function initTabularElements(opt, slideshow) {
    // Get Default
    // - Cell
    let cellName = opt && opt.tabular && (opt.tabular.cell ?? DEFAULT_CELL);
    if(typeof(cellName) !== 'string' || cellName === '') {
      cellName = DEFAULT_CELL;
    }
    // - Row
    let rowName = opt && opt.tabular && (opt.tabular.row ?? DEFAULT_ROW);
    if(typeof(rowName) !== 'string' || rowName === '') {
      rowName = DEFAULT_ROW;
    }
    // - Span
    let spanName = opt && opt.tabular && (opt.tabular.span ?? DEFAULT_SPAN);
    if(typeof(spanName) !== 'string' || spanName === '') {
      spanName = DEFAULT_SPAN;
    }
    
    // Process
    // - Cell
    for(let cell of document.getElementsByClassName(cellName)) {
      const cls  = cell.innerHTML;
      const elem = findCell(cell);
      if(elem) {
        elem.classList.add(cls);
      }
    }
    // - Row
    for(let row of document.getElementsByClassName(rowName)) {
      const cls  = row.innerHTML;
      const elem = findRow(row);
      if(elem) {
        elem.classList.add(cls);
      }
    }
    // - Span
    for(let cell of document.getElementsByClassName(spanName)) {
      const val  = cell.innerHTML;
      const elem = findCell(cell);
      if(elem) {
        elem.colSpan = val;
      }
    }
  }
  
  // HELPER
  function findCell(cell) {
    while(cell.parentNode && cell.tagName !== 'TH' && cell.tagName !== 'TD') {
      cell = cell.parentNode;
    }
    return cell;
  }
  function findRow(cell) {
    while(cell.parentNode && cell.tagName !== 'TR') {
      cell = cell.parentNode;
    }
    return cell;
  }
    
  /**
   * Initialise Tabular CSS
   */
  function initTabularCSS(opt, slideshow) {
    let head = document.getElementsByTagName('head')[0];
    let link  = document.createElement('link');
    link.href = `${BASE}plugins/tabular/style.css`;
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
    
    initTabularElements(opt, slideshow);
    initTabularCSS(opt, slideshow);
  }
  
  remark.register(init);
})();