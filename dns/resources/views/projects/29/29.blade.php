<html><head><title>{{ $title ? $title : "" }}</title><meta name="description" content="{{ $description ? $description : "" }}"></meta><style>* { box-sizing: border-box; } body {margin: 0;}.gjs-row{display:table;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;width:100%;}.gjs-cell{width:8%;display:table-cell;height:75px;}#ind7{height:580px;}.countdown{text-align:center;background-color:#c11717;}.countdown-block{display:inline-block;margin-top:0px;margin-right:10px;margin-bottom:0px;margin-left:10px;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;}.countdown-digit{font-size:5rem;}.countdown-endtext{font-size:5rem;}.countdown-cont{display:inline-block;}@media (max-width: 768px){.gjs-cell{width:100%;display:block;}}</style></head><body><body><div class="gjs-row"><div class="gjs-cell"></div><div class="gjs-cell"></div><div class="gjs-cell"></div></div><div id="i6tr" class="countdown"><span data-js="countdown" class="countdown-cont"><div class="countdown-block"><div data-js="countdown-day" class="countdown-digit"></div><div class="countdown-label">days</div></div><div class="countdown-block"><div data-js="countdown-hour" class="countdown-digit"></div><div class="countdown-label">hours</div></div><div class="countdown-block"><div data-js="countdown-minute" class="countdown-digit"></div><div class="countdown-label">minutes</div></div><div class="countdown-block"><div data-js="countdown-second" class="countdown-digit"></div><div class="countdown-label">seconds</div></div></span><span data-js="countdown-endtext" class="countdown-endtext"></span></div><div id="ind7" class="gjs-row"></div></body><script>var props = {"i6tr":{"startfrom":"","endText":"EXPIRED"}};
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