/* PLNT Earth · Campus Embed — drop this on any PLNT site to show a Campus launcher.
   Usage:
   <script src="https://campus.plnt.earth/embed.js" defer></script>
*/
(function(){
  var cfg = {
    accent:"#b7a7ff",
    bg:"rgba(10,12,16,.75)",
    border:"rgba(255,255,255,.15)"
  };

  function dayOfCycle(date){
    var cycles=[
      {s:"2025-11-05",e:"2025-12-17"},
      {s:"2026-01-03",e:"2026-02-14"},
      {s:"2026-03-03",e:"2026-04-14"},
      {s:"2026-05-01",e:"2026-06-12"},
      {s:"2026-06-30",e:"2026-08-11"},
      {s:"2026-08-29",e:"2026-10-10"},
      {s:"2026-10-28",e:"2026-12-09"}
    ];
    function P(d){var a=d.split("-");return new Date(+a[0],+a[1]-1,+a[2]);}
    for(var i=0;i<cycles.length;i++){
      var A=P(cycles[i].s), B=P(cycles[i].e);
      if(date>=A && date<=B){
        var diff=Math.floor((date-A)/86400000)+1;
        if(diff<1) diff=1; if(diff>42) diff=42;
        return diff;
      }
    }
    return 1;
  }

  function createStyles(){
    var css = ".plnt-campus-launch{position:fixed;right:14px;bottom:14px;z-index:999999;display:flex;gap:8px;align-items:center}"+
              ".plnt-campus-btn{appearance:none;border:1px solid "+cfg.border+";background:"+cfg.bg+";backdrop-filter:saturate(130%) blur(8px);color:#e9ecf5;padding:10px 12px;border-radius:12px;font:700 13px/1 ui-sans-serif,system-ui;letter-spacing:.3px}"+
              ".plnt-campus-dot{width:10px;height:10px;border-radius:50%;background:"+cfg.accent+";box-shadow:0 0 16px "+cfg.accent+"80}"+
              ".plnt-campus-modal{position:fixed;inset:0;z-index:999998;background:rgba(5,7,10,.6);backdrop-filter:blur(10px);display:none;align-items:center;justify-content:center}"+
              ".plnt-campus-card{min-width:280px;max-width:420px;background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03));border:1px solid "+cfg.border+";border-radius:16px;padding:14px;box-shadow:0 10px 30px rgba(0,0,0,.45)}"+
              ".plnt-campus-row{display:flex;gap:8px;margin-top:10px;flex-wrap:wrap}"+
              ".plnt-campus-a{flex:1;text-align:center;padding:10px 12px;border-radius:10px;border:1px solid "+cfg.border+";background:rgba(255,255,255,.05);color:#e9ecf5;text-decoration:none;font-weight:700}";
    var tag = document.createElement("style"); tag.textContent = css; document.head.appendChild(tag);
  }

  function mount(){
    createStyles();
    var root = document.createElement("div");
    root.className = "plnt-campus-launch";
    root.innerHTML = '<div class="plnt-campus-dot" aria-hidden="true"></div>'+
                     '<button class="plnt-campus-btn" id="plntOpen">Campus</button>'+
                     '<button class="plnt-campus-btn" id="plntToday">Today</button>';
    document.documentElement.appendChild(root);

    var modal = document.createElement("div");
    modal.className = "plnt-campus-modal";
    modal.innerHTML = '<div class="plnt-campus-card">'+
      '<div style="display:flex;align-items:center;gap:10px"><div class="plnt-campus-dot"></div><b>PLNT Earth · Campus</b><span style="margin-left:auto;color:#aeb6c9;font-size:12px">Ground · Flow · Rest</span></div>'+
      '<div class="plnt-campus-row">'+
        '<a class="plnt-campus-a" href="https://campus.plnt.earth" target="_blank" rel="noopener">Open Map</a>'+
        '<a class="plnt-campus-a" href="#" id="plntJump">Jump to Today</a>'+
      '</div>'+
      '<div class="plnt-campus-row" style="margin-top:6px">'+
        '<a class="plnt-campus-a" href="https://alter.fire.plnt.earth" target="_blank" rel="noopener">Alter Fire</a>'+
        '<a class="plnt-campus-a" href="https://froot.plnt.earth" target="_blank" rel="noopener">Froot</a>'+
      '</div>'+
      '<div style="margin-top:8px;color:#aeb6c9;font-size:12px">Press <kbd>T</kbd> anywhere to jump to Today.</div>'+
    '</div>';
    document.documentElement.appendChild(modal);

    function show(){ modal.style.display="flex"; }
    function hide(){ modal.style.display="none"; }

    document.getElementById("plntOpen").addEventListener("click", show);
    modal.addEventListener("click", function(e){ if(e.target===modal) hide(); });

    document.getElementById("plntToday").addEventListener("click", function(){
      var d = dayOfCycle(new Date());
      window.location.href = "https://campus.plnt.earth/map#room="+d;
    });

    var jump = document.getElementById("plntJump");
    jump.addEventListener("click", function(e){
      e.preventDefault();
      var d = dayOfCycle(new Date());
      window.location.href = "https://campus.plnt.earth/map#room="+d;
    });

    document.addEventListener("keydown", function(e){
      if(e.key==="t"||e.key==="T"){
        var d = dayOfCycle(new Date());
        window.location.href = "https://campus.plnt.earth/map#room="+d;
      }
    }, {passive:true});
  }

  if(document.readyState==="complete"||document.readyState==="interactive"){ mount(); }
  else{ document.addEventListener("DOMContentLoaded", mount); }
})();
