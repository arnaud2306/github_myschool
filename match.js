var toggler_caret = document.getElementsByClassName("caret");
var toggler_nested = document.getElementsByClassName("nested");
var main_container = document.getElementsByClassName('main-container');
var video_container = document.getElementById('video-container');
var i;
var video;

// caret
for (i = 0; i < toggler_caret.length; i++)
{
   toggler_caret[i].onclick = handler_caret;
}

// nested
for (i = 0; i < toggler_nested.length; i++)
{
   toggler_nested[i].onclick = handler_nested;
}

// -------------
// handler_caret
// -------------
function handler_caret(e)
{
   console.log("[handler_caret]");

   e = e || window.event;

   const children=this.parentElement.querySelectorAll('.nested');
   children.forEach(function(child)
   {
      child.classList.toggle("active");
   });

   this.classList.toggle("caret-down");

   video = path + e.srcElement.firstChild.data;
   video_container.src = video;
   console.log(video);

   // play
   video_container.play();

   return false;
};

// --------------
// handler_nested
// --------------
function handler_nested(e)
{
   console.log("[handler_nested]");

   // debug event
// console.log(e);

   // quand on clique sur une action, il faut extraire de nouveau le nom du fichier video
   // en le recuperant dans l'item parent
   const parent = e.target.closest('ul');;
   if(parent)
   {
      const neighbor = parent.previousElementSibling;
      if(neighbor)
      {
         video = path + neighbor.textContent;
         video_container.src = video;
         console.log(video);
      }
   }

   e = e || window.event;

// ************************
// extraction champs "time"
// ************************
   const time = e.target.outerHTML.split('=');
// console.log(time[2]);

   const extract = time[2].split(' ');
// console.log(extract[0]);

   const last = extract[0].replace(/^"|"$/g,'');
// console.log(last);

   const match = last.match(/^(\d+)mn(\d+)$/);
   if(match)
   {
      const minutes = parseInt(match[1],10);
      const secondes = parseInt(match[2],10);
//    console.log(minutes);
//    console.log(secondes);

      let location = (Number(minutes) * 60) + Number(secondes) - 5;
//    console.log(location);

      video_container.currentTime = location;

      // play
      video_container.play();
   }

// *************************
// extraction champs "count"
// *************************
   const count = e.srcElement.getAttribute("count");
// console.log(count);

// **************************
// extraction champs "player"
// **************************
   const player = e.srcElement.textContent;
// console.log(player);

// gtag event
   gtag('event', 'nested_click', {
        'event_category': 'Video Marker',
        'time': last,
        'player': player,
        'count': count,
        'debug_mode': true
   });

   console.log("GA Event sent:", last, player, count);

   return false;
};
