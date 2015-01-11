/*
  @todo The NOF_NS init needs to be moved out to a shared JS that gets loaded prior to all
  its clients using it. Right now is just Flash but will likely add more in the future. For instances
  DB could inject in the same name space. It simply uses now NOF_xxxx

  @todo: refine it further by moving the navbar specifics to a subclass

  @see http://www.macromedia.com/cfusion/knowledgebase/index.cfm?id=tn_12701 for OBJECT/EMBED attributes
*/
if(typeof NOF == "undefined") {
  function NOF_NS() {
      this.__proto__ = NOF_NS.prototype;
  }
}

var NOF = new NOF_NS();

if(typeof NOF.ProgramVersion == "undefined")
{

  function NOF_ProgramVersion (majorNumber, minorNumber, revisionNumber) {
      this.__proto__ = NOF_ProgramVersion.prototype;

      if (arguments.length != 3) throw "Illegal arguments exception";

      this.majorNumber    = majorNumber;
      this.minorNumber    = minorNumber;
      this.revisionNumber = revisionNumber;
  }

  {
    var method = NOF_ProgramVersion.prototype;

    method.getMajorNumber = function () {
      return this.majorNumber;
    }

    method.getMinorNumber = function () {
      return this.minorNumber;
    }

    method.getRevisionNumber = function () {
      return this.revisionNumber;
    }

    method.eq = function (programVersion) {
      return  this.majorNumber == programVersion.getMajorNumber()
              && this.minorNumber == programVersion.getMinorNumber()
              && this.revisionNumber == programVersion.getRevisionNumber();
    }

    method.lt = function (programVersion) {
      var retValue = false;

      if (this.majorNumber < programVersion.getMajorNumber() ) {
          retValue = true;
      } else if (this.majorNumber == programVersion.getMajorNumber()) {
          if (this.minorNumber < programVersion.getMinorNumber()) {
            retValue = true;
          } else if (this.minorNumber == programVersion.getMinorNumber()) {
            if (this.revisionNumber < programVersion.getRevisionNumber()) {
              retValue = true;
            }
          }
      }

      return retValue;
    }

    method.lte = function (programVersion) {
      return this.lt(programVersion) && this.eq(programVersion);
    }

    method.gt = function (programVersion) {
      return !this.lte(programVersion);
    }

    method.gte = function (programVersion) {
      return !this.lt(programVersion);
    }

    method.toString = function () {
      return this.majorNumber + "." + this.minorNumber + "." + this.revisionNumber;
    }

  }

  NOF.__proto__.ProgramVersion = NOF_ProgramVersion;
}


if (typeof NOF.Util == "undefined") {

  function NOF_Util() {
    this.__proto__ = NOF_Util.prototype;
  }

  NOF.Util = new NOF_Util();

  function NOF_Util_FramesIterator (wnd) {
    this.__proto__ =  NOF_Util_FramesIterator.prototype;
    this.currentIndex = 0;
    this.array = wnd.frames;

    NOF_Util_FramesIterator.prototype.next = function () {
      return (this.currentIndex < this.array.length ) ? this.array[this.currentIndex++] : null;
    }
  }

  NOF.Util.__proto__.FramesIterator = NOF_Util_FramesIterator;

  NOF.Util.GetFrameWndByName = function GetFrameWndByName(name) {
    var stack = new Array();
    stack[0] = new NOF.Util.FramesIterator(window);
    var wnd = null;
    var found = false;
    while (stack.length > 0 && !found)
    {
      if ((wnd = stack[stack.length -1].next()) != null)
      {
        if (wnd.name == name)
        {
          found = true;
          break;
        }
        else if (wnd.frames.length > 0)
        {
          stack[stack.length] = new NOF.Util.FramesIterator(wnd);
        }
      }
      else
      {
        stack[stack.length-1] = null;
        stack.length--;
      }
    }

    return wnd;
  }
}

if(typeof NOF.Event == "undefined") {
  function NOF_Event(source, type, state) {
    this.__proto__ = NOF_Event.prototype;
    this.source = source;
    this.type = type;
    this.state = state;
  }

  var member = NOF_Event.prototype;

  member.MOUSEDOWN_EVENT   = 0x001;
  member.MOUSEUP_EVENT     = 0x002;
  member.MOUSEMOVE_EVENT   = 0x004;
  member.MOVIE_INITIALIZED_EVENT = 0x008;

  var method = NOF_Event.prototype;

  method.getSource = function() {
    return this.source;
  };

  method.getType = function() {
    return this.type;
  };

  method.getState = function() {
    return this.state;
  };

  NOF.Event = new NOF_Event();
  NOF.EventObject = NOF_Event;
}


if(typeof NOF.Flash == "undefined") {
  function NOF_Flash() {
      this.__proto__ = NOF_Flash.prototype;
  }

  NOF.Flash = new NOF_Flash();
}


if(typeof NOF.Flash.HtmlCtrl == "undefined")
{

  function NOF_Flash_HtmlCtrl_Base()
  {
    this.__proto__ = NOF_Flash_HtmlCtrl_Base.prototype;
  }

  {
    var member = NOF_Flash_HtmlCtrl_Base.prototype;
    //add static members here

    member.MOVIE_LISTENER             = 0x001;
    member.MOUSE_LISTENER             = 0x002;
    member.NETSCAPE_PLUGIN_NAME       = "Shockwave Flash";
    member.IE_PLUGIN_NAME             = "ShockwaveFlash.ShockwaveFlash";
    member.FOOTPRINT_SUFFIX           = "_footprint";
    member.CONTAINER_SUFFIX           = "_container";
    member.LAYER_SUFFIX               = "LYR";

    member.PARAM_ALLOWSCRIPTACCESS    = "allowScriptAccess";
    member.PARAM_QUALITY              = "quality";
    member.PARAM_WMODE                = "wmode";

    member.DEFAULT_QUALITY_VALUE      = "high";
    member.DEFAULT_WMODE_VALUE        = "transparent";
    member.cDELTA                     = 5; //compensantion delta for dimensions variations
    member.DEFAULT_HIGHEST_ZINDEX     = 2000;

    var method = NOF_Flash_HtmlCtrl_Base.prototype;

    method.ctr = function ( id, movieSrc, width, height, align, htmlDocument) {

      //verify preconditions in case this is not the default constructor call
      if (arguments.length > 0) {
        if (id == undefined || id.length <=0 ) {
        throw "IllegalArgumentException: id cannot be empty";
        }

        if (movieSrc == undefined || movieSrc.length <=0 ) {
          throw "IllegalArgumentException: movieSrc cannot be null";
        }
      }

    this.movieListeners= new Array();
      this.mouseListeners= new Array();
      this.params       = new Array();
      this.variables    = new Array();

      this.id           = id;
      this.movieSrc     = movieSrc;

      this.width        = (width    != null) ? width    : null;
      this.height       = (height   != null) ? height   : null;
      this.align        = (align    != null) ? align    : null;

      this.htmlDocument = (htmlDocument != undefined) ?  htmlDocument : document;

      this.position     = {left : -1, top: -1};


      this.isFSCEventsSupportEnabled = true;
      this.areFSCEventsEnabled       = true;

      //enable scripts access within the same domain by default so getURL and fsCommands succeed
      this.setParam(this.PARAM_ALLOWSCRIPTACCESS, "sameDomain");

      //set default params value
      this.setParam(this.PARAM_QUALITY, this.DEFAULT_QUALITY_VALUE);
      this.setParam(this.PARAM_WMODE, this.DEFAULT_WMODE_VALUE);

      this.requiredPlayerVersion = "7,0,0,0";

      this.closedMenuSize = {width : 0, height: 0};
      this.foHtmlInstance = null;
      this.foContainer = null;
      this.foFootprint = null;
      this.foParentLYR = null;

      this.isWritten = false;
      this.bReady   = false;

      this.capturedEventsMask = 0;
      this.owner = null;
    }

    /*
     * Gets the readiness state.
     *
     * @return true if PostInit event was received and processed succesfully. false otherwise
    */
    method.isReady = function () { return this.bReady;};


    /*
     *Gets/sets the movie owner
    */
    method.getOwner = function () { return this.owner;};
    method.setOwner = function (owner) { this.owner = owner;};


    /*
     *Gets/sets the movie width
    */
    method.getWidth = function () { return this.width;};
    method.setWidth = function (width) { this.width = width;};

    /*
     * Gets/sets the movie height
    */
    method.getHeight = function () { return this.height;};
    method.setHeight = function (height) { this.height = height;};

    /*
     * Gets/sets the movie Position
    */
    method.getPosition = function () { return this.position;};
    method.setPosition = function (position) { this.position = position;};


    /*
     * Gets/sets the movie source. URLs are expected
    */
    method.getMovieSrc = function () { return this.movieSrc;};
    method.setMovieSrc = function (movieSrc) { this.movieSrc = movieSrc;};


    /*
     * Gets/sets the html element alignment.
    */
    method.getAlign = function () { return this.align;};
    method.setAlign = function (align) { this.align = align;};

    method.getId = function () {return this.id;};

    /*
     * Player Parameters getter/setter
     *
     * @note: the names are case insensitive
    */
    method.getParam = function(name) { return this.params[name.toLowerCase()];};
    method.setParam = function(name, value) { this.params[name.toLowerCase()] = value;};
    method.getParams = function() { return this.params; };

    /*
     * Variables getter/setter
    */
    method.getVariable = function(name) {return this.variables[name];};
    method.setVariable = function(name, value) { this.variables[name] = value;};
    method.getVariables = function() { return this.variables;};

    /*
     * Footprint getter
    */
    method.getFootprint = function() {
      if (!this.foFootprint) {
        this.foFootprint = this.findObject(this.id + this.FOOTPRINT_SUFFIX);
      }

      return this.foFootprint;
    };

    /*
     * Searches the document's objects collection for a name match. Handles the
     * particular case for NN4 compat generation mode where a collection of two
     * is returned instead of the actual object due to duplicate IDs (<div><ilayer>).
     *
     * @return the parent layer reference if present, null otherwise
    */
    method.getParentLYR = function() {
      if (!this.foParentLYR) {
        this.foParentLYR = this.findObject(this.id + this.LAYER_SUFFIX);
        //if we run in NN4 compat mode (<div><ilayer>) grab the first collection element
        if (this.foParentLYR != null && typeof (this.foParentLYR.length) == 'number') {
          this.foParentLYR = this.foParentLYR[0];
        }
      }

      return this.foParentLYR;
    }

    /*
     * HtmlInstance getter
    */
    method.getHtmlInstance = function() {
      if (!this.foHtmlInstance) {
        this.foHtmlInstance =  this.findObject(this.id);
      }


      return this.foHtmlInstance;
    };


    /*
     * Container getter
    */
    method.getContainer = function() {
      if (!this.foContainer) {
        this.foContainer = this.findObject(this.id + this.CONTAINER_SUFFIX);
      }

      return this.foContainer;
    };

    /*
     * Sets the state for generating FSCommand support or not. Default is disabled
     *
     * @param enable true to enable it. false to disable support
    */
    method.enableFSCEventsSupport = function (enable) {
      this.isFSCEventsSupportEnabled = enable;
    };

    /*
     * Sets the state for processing the fsCommands or not. Default is disabled
     *
     * @param enable true to enable it. false to disable support
    */
    method.enableFSCEvents = function (enable) {
      this.areFSCEventsEnabled = enable;
    };

    /*
     * Restarts the movie
     *
    */
    method.restart = function () {
      try {
        this.getHtmlInstance().Rewind();
        this.getHtmlInstance().Play();
        this.log("restarting");
      } catch (e) {}
    };

    /*
     * Moves current Flash placeholder to its footprint position
     *
    */
    method.repaint = function () {
        var position = this.getObjectPosition(this.getFootprint());
        this.log("onRepaint -> " + position[0] + ", " + position[1]);
        this.onMove(position[0], position[1]);
    };

    /*
     * Moves current Flash placeholder to its footprint position
     *
    */
    method.onRepaint = function () {
      this.repaint();
    };

    /*
     * Moves current Flash placeholder on page
     *
     * @param left new absolute left offset
     * @param top new absolute top offset
    */
    method.onMove = function (left, top) {
      //this.log("onMove -> " + left + ", " + top);

      this.setStyle("left",left + "px");
      this.setStyle("top", top + "px");

      this.position.left = left;
      this.position.top = top;
    };

    /*
     *
    */
    method.setStyle = function (name, value, obj) {
      //this.log("setStyle -> " + (obj != null ? obj.id : "")  + ", " + name + ", " + value);

      if (!obj) { obj = this.getContainer()}

      if (obj != null && typeof(obj.style) == "object") {
        obj.style[name] = value;
      }
    };

    /*
     *
    */
    method.getStyle = function (name, obj) {
      if (!obj) { obj = this.getContainer()}

      return (obj != null && typeof(obj.style) == "object") ? obj.style[name] : null;
    };


    /*
     * Resizes current Flash placeholder on page by updating the html attribute
     *
     * @param width new width value
     * @param height new height value
    */
    method.onResize = function (width, height) {
      this.log("onResize -> " + width + ", " + height);

      if (width == this.width && height == this.height) return;

      this.adjustZIndexOnSizeChange(width, height);

      this.width  = width;
      this.height = height;

      var htmlInstance = this.getHtmlInstance();
      if (htmlInstance) {
        htmlInstance.width   = width;
        htmlInstance.height  = height;
      }
    };


    /*
     * Resizes this Flash's associated footprint to current movie dimensions.
     * Also calls the callback if any defined asynchronously via a timer to
     * allow current Flash call to JavaScript to finish.
     *
     * @param width new width value
     * @param height new height value
    */
    method.onPostInit = function (width, height) {
      this.log("PostInit");

      this.closedMenuSize.width = width;
      this.closedMenuSize.height = height;
      var parentLYR = this.getParentLYR();
      this.parentZIndex = this.getStyle("zIndex", parentLYR);

      if (this.getFootprint()) {
        this.doInitialPositioning(width, height);
        //run the callback async to allow previous play call to finish if any to notify the listener of initialization completion
        NOF.Flash.HtmlCtrl.instancePtr = this;
        setTimeout("if (NOF.Flash.HtmlCtrl.instancePtr && typeof NOF.Flash.HtmlCtrl.instancePtr.doPostInitCallBack == 'function' ) { NOF.Flash.HtmlCtrl.instancePtr.doPostInitCallBack(); };", 100);
      } else {
        this.onResize(width,height);
      }

      if (this.capturedEventsMask & NOF.Event.MOVIE_INITIALIZED_EVENT) {
        this.notifyMovieListeners(new NOF.EventObject(this, NOF.Event.MOVIE_INITIALIZED_EVENT, {w: width, h: height}));
      }

      this.log("/PostInit");
    };


    /*
     * Resizes this Flash's associated footprint to current movie dimensions.
     *
     * @param width new width value
     * @param height new height value
    */
    method.doInitialPositioning = function (width, height) {
      var footprint = this.getFootprint();
      if (footprint) {
        this.setStyle("width",width + "px", footprint);
        this.setStyle("height", height + "px", footprint);

        //@todo: save the footprint dimension here for later use. currently not needed.
        var position = this.getObjectPosition(footprint);
        this.onMove(position[0], position[1]);
        this.onResize(width,height);
        this.bReady = true;
      }
    };


    method.doPostInitCallBack = function ()
    {
      if ( typeof(this.postInitCallBack) == 'object'
          && this.postInitCallBack != null
          && typeof(this.postInitCallBack.callback_handler) == 'function' )
      {
        this.postInitCallBack.callback_handler('PostInit');
      };
    }

    /*
     * Instructs Flash to resume playing by calling Play method
     *
     * @param postInitCallBack object reference implementing callback_handler interface.
     *        Callback will be executed after PostInit event is completed
    */
    method.play = function (postInitCallBack) {
      this.postInitCallBack = postInitCallBack;
      try {
        this.getHtmlInstance().Play();
    } catch (e) {}
      this.log("playing");
    };

    /*
     * Returns an HTML string suitable for injecting in the host page
    */
    method.toHTML = function () {throw "Abstract method 'toHTML' cannot called!";};

    /*
     * Writes the HTML representation of this instance into current document position
    */

    method.write = function () {
        if (!this.isWritten) {
          this.htmlDocument.write(this.toHTML());
          this.isWritten = true;
        } else {
          throw "write method cannot be called twice!";
        }
    };

    /*
     *
    */
    method.findObject = function (objectID, doc) {
      var p, i, foundObj;

      if(!doc) {
        doc = this.htmlDocument;
      }

      if( (p = objectID.indexOf("?")) > 0 && parent.frames.length) {
        doc = parent.frames[objectID.substring(p+1)].document;
        objectID = objectID.substring(0,p);
      }

      if(!(foundObj = doc[objectID]) && doc.all) {
          foundObj = doc.all[objectID];
      }

      for (i=0; !foundObj && i < doc.forms.length; i++) {
        foundObj = doc.forms[i][objectID];
      }


      for(i=0; !foundObj && doc.layers && i < doc.layers.length; i++) {
        foundObj = this.findObject(objectID, doc.layers[i].document);
      }


      if(!foundObj && doc.getElementById) {
          foundObj = doc.getElementById(objectID);
      }

      return foundObj;
    };

    /*
     *
    */
    method.getObjectPosition = function (o) {
      var curLeft = 0;
      var curTop  = 0;

      if (o.offsetParent) {
        while (o.offsetParent) {
          curLeft += o.offsetLeft;
          curTop  += o.offsetTop;
          o = o.offsetParent;
        }
      } else if (o.x && o.y) {
        curLeft += o.x;
        curTop  += o.y;
      }

      return [curLeft, curTop];
    };

    method.getListenerByType = function (type) {
      var listeners;
      if (type == this.MOUSE_LISTENER)
        listeners = this.mouseListeners;
      else if (type == this.MOVIE_LISTENER)
        listeners = this.movieListeners;
      else {
        alert ("Listener not supported.");
        return null;
      }
      return listeners;
    };

    method.addListener = function ( type, listener) {
      var listeners = this.getListenerByType(type);
      if (listeners != null) {
        for (var i=0; i<listeners.length; i++)
          if ( listeners[i] == listener )
            return;

        listeners[listeners.length] = listener;
      }
    };

    method.removeListener = function ( type, listener ){
      var listeners = this.getListenerByType(type);
      if (listeners != null) {
        for (var i = 0; i < listeners.length; i++ )
          if ( listeners[i] == listener ) {
            listeners[i] = listeners[listeners.length -1];
            listeners.length--;
          }
      }
    };

    /*
     * Movie listeners management
    */
    method.addMovieListener = function ( listener ){
      this.addListener(this.MOVIE_LISTENER, listener);
    };

    method.removeMovieListener = function ( listener ){
      this.removeListener(this.MOVIE_LISTENER, listener);
    };

    method.notifyMovieListeners = function ( event ){
      for (var i = 0; i < this.movieListeners.length; i++ ) {
        switch  (event.getType()) {
          case NOF.Event.MOVIE_INITIALIZED_EVENT:
            this.movieListeners[i].onMovieInitialized( event );
            break;
        }
      }
    };

    /*
     * Mouse listeners management
    */
    method.addMouseListener = function ( listener ){
      this.addListener(this.MOUSE_LISTENER, listener);
    };

    method.removeMouseListener = function ( listener ){
      this.removeListener(this.MOUSE_LISTENER, listener);
    };

    method.notifyMouseListeners = function ( event ){
      for (var i = 0; i < this.mouseListeners.length; i++ ) {
        switch  (event.getType()) {
          case NOF.Event.MOUSEDOWN_EVENT:
            this.mouseListeners[i].onMouseDown( event );
            break;

          case NOF.Event.MOUSEUP_EVENT:
            this.mouseListeners[i].onMouseUp( event );
            break;

          case NOF.Event.MOUSEMOVE_EVENT:
            this.mouseListeners[i].onMouseMove( event );
            break;

        }
      }
    };

    method.captureEvents = function(eventsMask) {
      this.capturedEventsMask = eventsMask;
    };

    /*
     *
    */
    method.onMouseDown = function (_x, _y, _btn, _cnt) {
      if (this.capturedEventsMask & NOF.Event.MOUSEDOWN_EVENT) {
        this.notifyMouseListeners(new NOF.EventObject(this, NOF.Event.MOUSEDOWN_EVENT, {x: _x, y: _y, btn: _btn, cnt: _cnt}));
        this.log(["mouse down", _x, _y, _btn, _cnt]);
      }
    };

    /*
     *
    */
    method.onMouseUp = function (_x, _y) {
      if (this.capturedEventsMask & NOF.Event.MOUSEUP_EVENT) {
        this.notifyMouseListeners(new NOF.EventObject(this, NOF.Event.MOUSEUP_EVENT, {x: _x, y: _y}));
        this.log(["mouse up", _x, _y]);
      }
    };

    /*
     *
    */
    method.onMouseMove = function (_x, _y) {
      if (this.capturedEventsMask & NOF.Event.MOUSEMOVE_EVENT) {
        this.notifyMouseListeners(new NOF.EventObject(this, NOF.Event.MOUSEMOVE_EVENT, {x: _x, y: _y}));
        this.log(["mouse move", _x,_y]);
      }
    };

    /*
     *
    */
    method.onLog = function (msg, level) {
      this.log(msg, level);
    };

    /*
     *
    */
    method.log = function (msg, level) {
        if (this.htmlDocument.forms[0] && this.htmlDocument.forms[0]["log"]) {
          this.htmlDocument.forms[0]["log"].value += this.id + ": " + msg + "\n";
        }
    };

    /*
     *
    */
    method.setRequiredPlayerVersion = function (reqPlayerVersion) {
      this.requiredPlayerVersion = reqPlayerVersion;
    };

    /*
     * Dispatches the <code>eventName</code> to the on$EventName(<code>args</code>) handler
     *
     * @param command the event name
     * @param args the arguments event state
    */
    method.processFSCEvent = function (eventName, args) {
      this.log("processFSCEvent -> " +  eventName + "[" + args + "]");
      var auxStr = "";
      for (var i=0; i<args.length; i++) {
        auxStr += "args[" + i + "]" + (i != args.length -1 ? ", " : "");
      }

      return eval("this.on" + eventName + "( " + auxStr + " )");
    };

    /*
     * Calls the <code>methodName</code> method of the movie w/ the <code>arg</code> argument
     *
     * @param methodName
     * @param arg
    */
    method.callFlashMethod = function (methodName, arg) {
      try {
        this.getHtmlInstance().SetVariable("hostEventsMonitor", methodName + ":" + arg);
      } catch (e) {}
    };

    /*
     * Returns the highest index of all elements on current page + 1
     *
     * @return highestIndex + 1
     *
     * @note currently returns a constant high value considered safe to be the highest
    */
    method.getNextHighestIndex = function() {
      return this.DEFAULT_HIGHEST_ZINDEX;
    }

    method.adjustZIndexOnSizeChange = function (width, height) {
      if (Math.abs(this.closedMenuSize.width - width) > this.cDELTA
          || Math.abs(this.closedMenuSize.height - height) > this.cDELTA)
      {
        //find parent layer. set the zIndex to something really high
        var parentLYR = this.getParentLYR();
        if (parentLYR) {
          this.log("setting high Z-Index on flyouts");
          this.setStyle("zIndex", this.getNextHighestIndex(), parentLYR);
        }
      }
      else
      {
        //reset the z-index to normal value
        if (this.parentZIndex != null) {
          var parentLYR = this.getParentLYR();
          if (parentLYR) {
            this.log("setting Z-Index on original size to " + this.parentZIndex);
            this.setStyle("zIndex", this.parentZIndex, parentLYR);
          }
        }
      }
    }

  }

  function NOF_Flash_HtmlCtrl_IE(id, movieSrc, width, height, align, htmlDocument){
    this.__proto__  = NOF_Flash_HtmlCtrl_IE.prototype;
    this.ctr(id, movieSrc, width, height, align, htmlDocument);
  }
  NOF_Flash_HtmlCtrl_IE.prototype = new NOF_Flash_HtmlCtrl_Base;

  //@todo: define the generators for IE
  {
    var method = NOF_Flash_HtmlCtrl_IE.prototype;

    /*
      Returns an HTML string that has the FSCommand scripting hooks
    */
    method.getFSCommandHandlerDef = function() {
      var str = "";

      str += "<script>";
      str += " function " + this.id +"_DoFSCommand(command, argsStr) {";
      str += "var args;\n";
      str += "if (typeof argsStr == 'object') { args = argsStr;} else {eval ('args = ' + argsStr + ';');}\n";

      str += " NOF.Flash.MovieCollectionMgr.getCollection(" + this.owner.getId() + ").getMovieById('" + this.id + "').processFSCEvent(command, args);";
      str += "}";
      str += "\<\/script\>";

      str += "<script event=\"FSCommand\" for=" + "\"" + this.id + "\">";
      str += "var args;\n";
      str += "if (typeof arguments[1] == 'object') { args = arguments[1];} else {eval ('args = ' + arguments[1] + ';');}\n";

      str += this.id +"_DoFSCommand(arguments[0], args);";
      str += "\<\/script\>";

      return str;
    }

    /*
      Returns an HTML string suitable for injecting in the host page
    */
    method.toHTML = function () {
      var htmlStr = "";

      if (this.isFSCEventsSupportEnabled) {
        htmlStr = this.getFSCommandHandlerDef();
      }

      htmlStr += '<OBJECT CLASSID="CLSID:D27CDB6E-AE6D-11cf-96B8-444553540000"';
      htmlStr += ' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + this.requiredPlayerVersion + '"';
      htmlStr += ' WIDTH="' + this.width +'" HEIGHT="'+ this.height +'" ID="'+ this.id +'">'  + "\n";
        htmlStr += '<PARAM NAME="movie" VALUE="' + this.movieSrc + '" />'  + "\n";

        for(var key in this.params) {
            htmlStr += '<PARAM NAME="' + key + '" VALUE="' + this.params[key] + '" />' + "\n";
        }

        //default availability is assummed none on SWF side
        if (NOF.Flash.HtmlCtrl.getPlatform() == NOF.Flash.HtmlCtrl.PLATFORM_WINDOWS) {
          this.variables["nof_isFSCommandAvailable"] = true;
        }

        //pass in events capturing request if any
        if (this.capturedEventsMask) {
          this.variables["nof_capturedEventsMask"] = this.capturedEventsMask;
        }

        this.variables["nof_objectID"] = this.id;

        var flashVars = "";
        for(var key in this.variables) {
            flashVars = key + "=" + escape(this.variables[key]) + (flashVars.length == 0 ? "" : "&") + flashVars;
        }

        delete this.variables["nof_isFSCommandAvailable"];
        delete this.variables["nof_capturedEventsMask"];
        delete this.variables["nof_objectID"];

        if(flashVars.length > 0) {
          htmlStr += '<PARAM NAME="FlashVars" VALUE="'+ flashVars +'" />'  + "\n";
        }

      htmlStr += '</OBJECT>' + "\n";

      return htmlStr;
    };

  }

  function NOF_Flash_HtmlCtrl_NetscapeGeneric(id, movieSrc, width, height, align, htmlDocument){
    this.__proto__  = NOF_Flash_HtmlCtrl_NetscapeGeneric.prototype;
    this.ctr(id, movieSrc, width, height, align, htmlDocument);
  }
  NOF_Flash_HtmlCtrl_NetscapeGeneric.prototype = new NOF_Flash_HtmlCtrl_Base;
  {
    var method = NOF_Flash_HtmlCtrl_NetscapeGeneric.prototype;
    method.PARAM_SWLIVECONNECT        = "swliveconnect";

    /*
     * Resizes current Flash placeholder on page by updating the html attribute
     *
     * @param width new width value
     * @param height new height value
    */
    method.super_onResize = method.onResize;
    method.onResize = function (width, height) {
      this.super_onResize(width, height);

      var htmlInstance = this.getHtmlInstance();
      if (htmlInstance) {
        this.setStyle("width",width + "px", htmlInstance);
        this.setStyle("height", height + "px", htmlInstance);
      }
    };

    /*
      Returns an HTML string suitable for injecting in the host page
    */
    method.toHTML = function () {
      var htmlStr = "";

      if (this.isFSCEventsSupportEnabled) {
        htmlStr += "<script language=JavaScript>\n";
        htmlStr += " function " + this.id +"_DoFSCommand(command, strArgs) {\n";
        htmlStr += " NOF.Flash.MovieCollectionMgr.getCollection(" + this.owner.getId() + ").getMovieById('" + this.id + "').processFSCEvent(command, strArgs);";
        htmlStr += "}\n";
        htmlStr += "</script>\n";
      }

      //@todo: check for the current plugin version and replace w/ an upgrade text message
      htmlStr += '<EMBED TYPE="application/x-shockwave-flash"';
      htmlStr += ' pluginspage="http://www.macromedia.com/go/getflashplayer"';
      htmlStr += ' SRC="'+ this.movieSrc +'" WIDTH="'+ this.width +'" HEIGHT="'+ this.height +'" ID="'+ this.id + '" NAME="'+ this.id +'"';
        for(var key in this.params) {
          if (typeof this.params[key] != 'function') {
            htmlStr += " " + key + '=' + this.params[key];
          }
        }

        var flashVars = "";
        //pass in events capturing request if any
        if (this.capturedEventsMask) {
          this.variables["nof_capturedEventsMask"] = this.capturedEventsMask;
        }
        this.variables["nof_objectID"] = this.id;

        for(var key in this.variables) {
          if (typeof this.variables[key] != 'function') {
            flashVars = key + "=" + escape(this.variables[key]) + (flashVars.length == 0 ? "" : "&") + flashVars;
          }
        }

        delete this.variables["nof_capturedEventsMask"];
        delete this.variables["nof_objectID"];

        if(flashVars.length > 0) {
          htmlStr += ' FlashVars="'+ flashVars + '"';
        }

      htmlStr += '>';
      htmlStr += '</EMBED>';

      return htmlStr;
    };

  }

  function isHostNetscapeCompatible() {return navigator.mimeTypes.length ? true : false;};
  function isHostActiveXCompatible() { return window.ActiveXObject ? true : false; };


  if (isHostActiveXCompatible()) {
    NOF.Flash.HtmlCtrl = NOF_Flash_HtmlCtrl_IE;
  } else {
    NOF.Flash.HtmlCtrl = NOF_Flash_HtmlCtrl_NetscapeGeneric;
  }

  //Static methods go here

  NOF.Flash.HtmlCtrl.PLATFORM_WINDOWS = "Windows";
  NOF.Flash.HtmlCtrl.PLATFORM_MAC     = "Mac";
  NOF.Flash.HtmlCtrl.PLATFORM_UNKNOWN = "Unknown";

  /*
   * Not entirely reliable. Navigator.platform is not always populated. Need to guess it from appVersion or userAgent
  */
  NOF.Flash.HtmlCtrl.getPlatform = function () {
    if ((navigator.platform && navigator.platform.substring(0,3) == "Win")
        || navigator.appVersion.indexOf("Windows") != -1 ) {
      return NOF.Flash.HtmlCtrl.PLATFORM_WINDOWS;
    } else  if ((navigator.platform && navigator.platform.substring(0,3) == "Mac")
        || navigator.appVersion.indexOf("Macintosh") != -1 ) {
      return NOF.Flash.HtmlCtrl.PLATFORM_MAC;
    }

    return NOF.Flash.HtmlCtrl.PLATFORM_UNKNOWN;
  };

  /*
    Returns true if browser support Netscape Plugin Architecture
  */
  NOF.Flash.HtmlCtrl.isHostNetscapeCompatible = isHostNetscapeCompatible;

  /*
    Returns true if browser supports ActiveXObject method. Currently IE only
  */
  NOF.Flash.HtmlCtrl.isHostActiveXCompatible = isHostActiveXCompatible;

  /*
   * Queries the host browser for version information (major, minor, revision)
   *
   * @return a ProgramVersion reference
   * @see ProgramVersion
  */
  NOF.Flash.HtmlCtrl.getCurrentPlayerVersion = function () {
    if (NOF.Flash.HtmlCtrl.playerVersion == null) {
      var playerVer = new NOF.ProgramVersion(0,0,0);

      if(NOF.Flash.HtmlCtrl.isHostNetscapeCompatible() ) {
        var plugin = navigator.plugins[member.NETSCAPE_PLUGIN_NAME];
        if (plugin && plugin.description) {
          var parts = plugin.description.replace(/([a-z]|[A-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split(".")
          playerVer = new NOF.ProgramVersion(parts[0], parts[1], parts[2]);
        }
      } else if (NOF.Flash.HtmlCtrl.isHostActiveXCompatible()) {
         try {
            var player = new ActiveXObject(member.IE_PLUGIN_NAME);
            var parts = player.GetVariable("$version").split(" ")[1].split(",");
            playerVer = new NOF_ProgramVersion(parts[0], parts[1], parts[2]);
         } catch (e) {}
      }

      NOF.Flash.HtmlCtrl.playerVersion  = playerVer;
    }

    return NOF.Flash.HtmlCtrl.playerVersion;
  };

  /*
   * Takes current page to <code>url</code> if targetWindow is empty or _self
   * Otherwise opens a new window at <code>url</code>
   *
   * @param url
   * @param targetName
  */
  NOF.Flash.HtmlCtrl.launchURL = function (args) {
    var url = args[0];
    var targetName = args[1];

    var windowRef = null;
    if (targetName == undefined || targetName == null || targetName == "") {
          if ( document.getElementsByTagName )
          {
            var coll = document.getElementsByTagName('BASE');
            if ( coll && coll.length && coll.length > 0 )
              targetName = coll[0].target;

            if ( targetName == undefined || targetName == "" )
                windowRef = window;
          }
    }

    if (windowRef == null) {
      switch (targetName)
      {
        case undefined:
        case null:
        case "":
          if ( document.getElementsByTagName )
          {
          var coll = document.getElementsByTagName('BASE');
          if ( coll && coll.length && coll.length > 0 )
            targetName = coll[0].target;

          if ( targetName == undefined || targetName == "" )
            windowRef = window;
          }

          if (windowRef != null) //stop if we found our window. otherwise keep searching
          break;

        case "_self" :
          windowRef = window;
          break;

        case "_parent" :
          windowRef = parent;
          break;

        case "_top" :
          windowRef = top;
          break;

        case "_blank" :
          break;

        default:
          windowRef = NOF.Util.GetFrameWndByName(targetName);
          break;
      }
    }

    if (windowRef != null) {
        windowRef.location.href = url;
    } else {
        window.open(url, targetName);
    }
  };

}

if(typeof NOF.Flash.MovieCollectionMgr == "undefined")
{
  function NOF_Flash_MovieCollectionMgr() {
    this.__proto__ = NOF_Flash_MovieCollectionMgr.prototype;
    this.collections = new Array();
  }

  var method = NOF_Flash_MovieCollectionMgr.prototype;

  method.createCollection  = function() {
    var coll = new NOF.Flash.MovieCollection(this.collections.length);
    this.collections[this.collections.length] = coll;

    return coll;
  };

  method.getCollection = function(index) {
    return (index>=0 && index<this.collections.length) ? this.collections[index] : null;
  };

  NOF.Flash.__proto__.MovieCollectionMgr = new NOF_Flash_MovieCollectionMgr();
}

if(typeof NOF.Flash.MovieCollection == "undefined")
{
  function NOF_Flash_MovieCollection (id) {
    this.__proto__ = NOF_Flash_MovieCollection.prototype;

    this.id         = id;
    this.movies     = new Array();
    this.moviesHash = new Array();
    this.currentMovieIndex = 0;
  }

  var method = NOF_Flash_MovieCollection.prototype;

  method.createMovie  = function (id, src, width, height) {
    var movie = new NOF.Flash.HtmlCtrl(id, src, width, height);

    movie.setOwner(this);
    this.movies[this.movies.length] = movie;
    this.moviesHash[id] = movie;

    return movie;
  };

  method.getId = function () {
    return this.id;
  }

  method.getMovieById = function (id) {
    return this.moviesHash[id];
  }

  method.getMovieByIndex = function (index) {
    return (index>=0 && index<this.movies.length) ? this.movies[index] : null;
  }

  method.startAll  = function () {
    if (this.currentMovieIndex < this.movies.length) {
      this.movies[this.currentMovieIndex++].play(this);
    } else {
      this.setZIndex();
    }
  };

  method.resizeAll =   function () {
    var i=0;
    while (i < this.movies.length) {
      this.movies[i++].repaint();
    }
    this.setZIndex();
  }

  method.setZIndex  = function () {
    var maxTop = 0;
    for (var i=0; i<this.movies.length; i++) {
      var pos = this.movies[i].getPosition();
      if (maxTop < pos.top) {maxTop = pos.top}
    }

    for (i=0;i<this.movies.length; i++) {
      var pos = this.movies[i].getPosition();
      this.movies[i].log("setZIndex to " + (-1 * (pos.top - maxTop)));
      this.movies[i].setStyle("zIndex", -1 * (pos.top - maxTop));
    }
  };

  method.callback_handler  = function (eventName) {
    if (eventName == 'PostInit') {
      this.startAll();
    }
  };

  NOF.Flash.__proto__.MovieCollection = NOF_Flash_MovieCollection;
}