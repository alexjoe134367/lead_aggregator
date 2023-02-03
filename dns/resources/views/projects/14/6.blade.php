<html><head><title>{{ $title ? $title : "" }}</title><meta name="description" content="{{ $description ? $description : "" }}"></meta><style>* { box-sizing: border-box; } body {margin: 0;}.navbar{background-color:rgb(34, 34, 34);color:rgb(221, 221, 221);min-height:50px;width:100%;}.navbar-container{max-width:950px;margin-top:0px;margin-right:auto;margin-bottom:0px;margin-left:auto;width:95%;}.navbar-items-c{display:inline-block;float:right;}.navbar-container::after{content:"";clear:both;display:block;}.navbar-brand{vertical-align:top;display:inline-block;padding-top:5px;padding-right:5px;padding-bottom:5px;padding-left:5px;min-height:50px;min-width:50px;color:inherit;text-decoration-line:none;text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial;}.navbar-menu{padding-top:10px;padding-right:0px;padding-bottom:10px;padding-left:0px;display:block;float:right;margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}.navbar-menu-link{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;color:inherit;text-decoration-line:none;text-decoration-thickness:initial;text-decoration-style:initial;text-decoration-color:initial;display:inline-block;padding-top:10px;padding-right:15px;padding-bottom:10px;padding-left:15px;}.navbar-burger{margin-top:10px;margin-right:0px;margin-bottom:10px;margin-left:0px;width:45px;padding-top:5px;padding-right:10px;padding-bottom:5px;padding-left:10px;display:none;float:right;cursor:pointer;}.navbar-burger-line{padding-top:1px;padding-right:1px;padding-bottom:1px;padding-left:1px;background-color:white;margin-top:5px;margin-right:0px;margin-bottom:5px;margin-left:0px;}.countdown{text-align:center;}.countdown-block{display:inline-block;margin-top:0px;margin-right:10px;margin-bottom:0px;margin-left:10px;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}.countdown-digit{font-size:5rem;}.countdown-endtext{font-size:5rem;}.countdown-cont{display:inline-block;}@media (max-width: 768px){.navbar-items-c{display:none;width:100%;}.navbar-burger{display:block;}.navbar-menu{width:100%;}.navbar-menu-link{display:block;}}</style></head><body><body><div class="navbar"><div class="navbar-container" data-gjs="navbar"><a class="navbar-brand" href="/"></a><div class="navbar-burger" id="i16n"><div class="navbar-burger-line"></div><div class="navbar-burger-line"></div><div class="navbar-burger-line"></div></div><div class="navbar-items-c" data-gjs="navbar-items"><nav class="navbar-menu"><a class="navbar-menu-link">Home</a><a class="navbar-menu-link">About</a><a class="navbar-menu-link">Contact</a></nav></div></div></div><div id="i38wk" class="countdown"><span data-js="countdown" class="countdown-cont"><div class="countdown-block"><div data-js="countdown-day" class="countdown-digit"></div><div class="countdown-label">days</div></div><div class="countdown-block"><div data-js="countdown-hour" class="countdown-digit"></div><div class="countdown-label">hours</div></div><div class="countdown-block"><div data-js="countdown-minute" class="countdown-digit"></div><div class="countdown-label">minutes</div></div><div class="countdown-block"><div data-js="countdown-second" class="countdown-digit"></div><div class="countdown-label">seconds</div></div></span><span data-js="countdown-endtext" class="countdown-endtext"></span></div></body><script>var items = document.querySelectorAll('#i16n');
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
          }
          var props = {"i38wk":{"startfrom":"","endText":"EXPIRED"}};
          var ids = Object.keys(props).map(function(id) { return '#'+id }).join(',');
          var els = document.querySelectorAll(ids);
          for (var i = 0, len = els.length; i < len; i++) {
            var el = els[i];
            (function script(n) {
              var t = n.startfrom,
                  e = n.endText,
                  o = this,
                  a = new Date(t).getTime(),
                  c = o.querySelector('[data-js=countdown]'),
                  d = o.querySelector('[data-js=countdown-endtext]'),
                  s = o.querySelector('[data-js=countdown-day]'),
                  l = o.querySelector('[data-js=countdown-hour]'),
                  i = o.querySelector('[data-js=countdown-minute]'),
                  r = o.querySelector('[data-js=countdown-second]'),
                  u = o.__gjsCountdownInterval;
              u && clearInterval(u);
              var p = window.__gjsCountdownIntervals || [],
                  v = [];
              p.forEach(function (n) {
                n.isConnected || (clearInterval(n.__gjsCountdownInterval), v.push(n));
              }), p.indexOf(o) < 0 && p.push(o), window.__gjsCountdownIntervals = p.filter(function (n) {
                return v.indexOf(n) < 0;
              });

              var y = function y(n, t, e, o) {
                s.innerHTML = "".concat(n < 10 ? '0' + n : n), l.innerHTML = "".concat(t < 10 ? '0' + t : t), i.innerHTML = "".concat(e < 10 ? '0' + e : e), r.innerHTML = "".concat(o < 10 ? '0' + o : o);
              },
                  f = function f() {
                var n = new Date().getTime(),
                    t = a - n,
                    s = Math.floor(t / 864e5),
                    l = Math.floor(t % 864e5 / 36e5),
                    i = Math.floor(t % 36e5 / 6e4),
                    r = Math.floor(t % 6e4 / 1e3);
                y(s, l, i, r), t < 0 && (clearInterval(o.__gjsCountdownInterval), d.innerHTML = e, c.style.display = 'none', d.style.display = '');
              };

              a ? (o.__gjsCountdownInterval = setInterval(f, 1e3), d.style.display = 'none', c.style.display = '', f()) : y(0, 0, 0, 0);
            }.bind(el))(props[el.id]);
          }</script></body></html>