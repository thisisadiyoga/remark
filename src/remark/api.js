var EventEmitter = require('events').EventEmitter
  , highlighter = require('./highlighter')
  , converter = require('./converter')
  , resources = require('./resources')
  , Parser = require('./parser')
  , Slideshow = require('./models/slideshow')
  , SlideshowView = require('./views/slideshowView')
  , DefaultController = require('./controllers/defaultController')
  , Dom = require('./dom')
  , macros = require('./macros')
  ;

module.exports = Api;

function Api (dom) {
  this.dom = dom || new Dom();
  this.macros = macros;
  this.version = resources.version;
  this.extPlugins = [];
}

// Expose highlighter to allow enumerating available styles and
// including external language grammars
Api.prototype.highlighter = highlighter;

Api.prototype.convert = function (markdown) {
  var parser = new Parser()
    , content = parser.parse(markdown || '', macros)[0].content
    ;

  return converter.convertMarkdown(content, {}, true);
};

// Register external plugins
Api.prototype.register = function(init) {
  var self = this;
  self.extPlugins.push(init);
};

// Creates slideshow initialized from options
Api.prototype.create = function (options, callback) {
  var self = this
    , events
    , slideshow
    , slideshowView
    , controller
    , pluginIndex
    ;

  options = applyDefaults(this.dom, options);

  events = new EventEmitter();
  events.setMaxListeners(0);

  slideshow = new Slideshow(events, this.dom, options, function (slideshow) {
    slideshowView = new SlideshowView(events, self.dom, options, slideshow);
    controller = options.controller || new DefaultController(events, self.dom, slideshowView, options.navigation);
    if (typeof callback === 'function') {
      // Add options to the callback
      callback(slideshow, options);
    }
  
    // Call registered external plugins to be initialized
    // Pass the options to the external plugins to be used
    for (pluginIndex=0; pluginIndex<self.extPlugins.length; pluginIndex++) {
      self.extPlugins[pluginIndex](options, slideshow);
    }
  });

  return slideshow;
};

function applyDefaults (dom, options) {
  var sourceElement;

  options = options || {};

  if (!options.hasOwnProperty('source')) {
    sourceElement = dom.getElementById('source');
    if (sourceElement) {
      options.source = unescape(sourceElement.innerHTML);
      sourceElement.style.display = 'none';
    }
  }

  if (!(options.container instanceof window.HTMLElement)) {
    options.container = dom.getBodyElement();
  }

  return options;
}

function unescape (source) {
  source = source.replace(/&[l|g]t;/g,
    function (match) {
      return match === '&lt;' ? '<' : '>';
    });

  source = source.replace(/&amp;/g, '&');
  source = source.replace(/&quot;/g, '"');

  return source;
}