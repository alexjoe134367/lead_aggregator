<html><head><title>{{ $title ? $title : "" }}</title><meta name="description" content="{{ $description ? $description : "" }}"></meta><style>* { box-sizing: border-box; } body {margin: 0;}.gjs-row{display:table;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;width:100%;}.gjs-cell{width:8%;display:table-cell;height:75px;}#ind7{height:580px;}.navbar{background-color:#4430c1;color:rgb(221, 221, 221);min-height:50px;width:100%;}.navbar-container{max-width:950px;margin-top:0px;margin-right:auto;margin-bottom:0px;margin-left:auto;width:95%;}.navbar-items-c{display:inline-block;float:right;}.navbar-container::after{content:"";clear:both;display:block;}.navbar-brand{vertical-align:top;display:inline-block;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;min-height:50px;min-width:50px;color:inherit;text-decoration-line:none;text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial;}.navbar-menu{padding-top:10px;padding-right:0px;padding-bottom:10px;padding-left:0px;display:block;float:right;margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}.navbar-menu-link{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;color:inherit;text-decoration-line:none;text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial;display:inline-block;padding-top:10px;padding-right:15px;padding-bottom:10px;padding-left:15px;}.navbar-burger{margin-top:10px;margin-right:0px;margin-bottom:10px;margin-left:0px;width:45px;padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:10px;display:none;float:right;cursor:pointer;}.navbar-burger-line{padding-top:1px;padding-right:1px;padding-bottom:1px;padding-left:1px;background-color:white;margin-top:5px;margin-right:0px;margin-bottom:5px;margin-left:0px;}@media (max-width: 768px){.gjs-cell{width:100%;display:block;}.navbar-items-c{display:none;width:100%;}.navbar-burger{display:block;}.navbar-menu{width:100%;}.navbar-menu-link{display:block;}}</style></head><body><body><div class="gjs-row"><div class="gjs-cell"></div><div class="gjs-cell"></div><div class="gjs-cell"></div></div><div class="navbar"><div class="navbar-container" data-gjs="navbar"><a href="/" class="navbar-brand"></a><div class="navbar-burger" id="i7k2"><div class="navbar-burger-line"></div><div class="navbar-burger-line"></div><div class="navbar-burger-line"></div></div><div data-gjs="navbar-items" class="navbar-items-c"><nav class="navbar-menu"><a class="navbar-menu-link">Home</a><a class="navbar-menu-link">About</a><a class="navbar-menu-link">Contact</a></nav></div></div></div><div id="ind7" class="gjs-row"></div></body><script>var items = document.querySelectorAll('#i7k2');
          for (var i = 0, len = items.length; i < len; i++) {
            (function(){
var n,
                  t = this,
                  e = 'gjs-collapse',
                  a = 'max-height',
                  o = 0,
                  i = function () {
                var n = document.createElement('void'),
                    t = {
                  transition: 'transitionend',
                  OTransition: 'oTransitionEnd',
                  MozTransition: 'transitionend',
                  WebkitTransition: 'webkitTransitionEnd'
                };

                for (var e in t) {
                  if (void 0 !== n.style[e]) return t[e];
                }
              }(),
                  r = function r(n) {
                o = 1;

                var t = function (n) {
                  var t = window.getComputedStyle(n),
                      e = t.display,
                      o = parseInt(t[a]);
                  if ('none' !== e && 0 !== o) return n.offsetHeight;
                  n.style.height = 'auto', n.style.display = 'block', n.style.position = 'absolute', n.style.visibility = 'hidden';
                  var i = n.offsetHeight;
                  return n.style.height = '', n.style.display = '', n.style.position = '', n.style.visibility = '', i;
                }(n),
                    e = n.style;

                e.display = 'block', e.transition = "".concat(a, " 0.25s ease-in-out"), e.overflowY = 'hidden', '' == e[a] && (e[a] = 0), 0 == parseInt(e[a]) ? (e[a] = '0', setTimeout(function () {
                  e[a] = t + 'px';
                }, 10)) : e[a] = '0';
              };

              e in t || t.addEventListener('click', function (e) {
                if (e.preventDefault(), !o) {
                  var l = t.closest("[data-gjs=navbar]"),
                      c = null == l ? void 0 : l.querySelector("[data-gjs=navbar-items]");
                  c && r(c), n || (null == c || c.addEventListener(i, function () {
                    o = 0;
                    var n = c.style;
                    0 == parseInt(n[a]) && (n.display = '', n[a] = '');
                  }), n = 1);
                }
              }), t[e] = 1;
}.bind(items[i]))();
          }</script></body></html>