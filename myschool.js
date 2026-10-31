// ******
// global
// ******
var itemid_G;
var linkid_G;
var server_G = "../php/myschool_server.php";

// *******************************************************
// MENU CONTAINER
// *******************************************************

var menu_container = document.querySelector('.menu-container');

menu_container.onclick = handler_menu_container_click;
menu_container.oncontextmenu = handler_menu_container_contextmenu;

// ----------------------------
// handler_menu_container_click
// ----------------------------
function handler_menu_container_click(e)
{
   console.log("[handler_menu_container_click]");

   e = e || window.event;

   // stopPropagation
   e.stopPropagation();

   // preventDefault
   e.preventDefault();

   e.cancelBubble = true;

   // hideAllContextmenus
	hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   return false;
}

// ----------------------------------
// handler_menu_container_contextmenu
// ----------------------------------
function handler_menu_container_contextmenu(e)
{
   console.log("[handler_menu_container_contextmenu]");

   e = e || window.event;

   // stopPropagation
   e.stopPropagation();

   // preventDefault
   e.preventDefault();

   e.cancelBubble = true;

   switch(e.button)
   {
      // clic droit
      case 2:
         console.log("clic menu container !");

         // hideAllContextmenus
      	hideAllContextmenus(e);

         // showContextMenuRoot
         showContextMenuRoot(e,true);

         // hideAllSubmenus
         hideAllSubmenus(e);
         break;
   };

   return false;
}

// *******************************************************
// FONCTIONS
// *******************************************************

// hideAllContextmenus
function hideAllContextmenus(e)
{
   showContextMenuRoot(e,false);
   showContextMenuItems(e,false);
   showContextMenuLinks(e,false);
}

// hideAllSubmenus
function hideAllSubmenus(e)
{
   showSubMenuAddDirectoryRoot(e,false);

   showSubMenuAddDirectory(e,false);
   showSubMenuDeleteDirectory(e,false);
   showSubMenuRenameDirectory(e,false);
   showSubMenuAddLinkDirectory(e,false);

   showSubMenuAddLink(e,false);
   showSubMenuDeleteLink(e,false);
   showSubMenuRenameLink(e,false);
}

// *******************************************************
// ROOT
// *******************************************************

const cm_menu_root = document.querySelector('.custom-menu-root');

// init
cm_menu_root.style.display = 'none';
cm_menu_root.style.position = 'absolute';
cm_menu_root.style.backgroundColor = 'white';

// -------------------
// showContextMenuRoot
// -------------------
function showContextMenuRoot(e,show=true)
{
   cm_menu_root.style.display = show ? 'block' : 'none';
   cm_menu_root.style.top = e.clientY + cm_menu_root.offsetHeight > window.innerHeight ? window.innerHeight - cm_menu_root.offsetHeight : e.clientY;
   cm_menu_root.style.left = e.clientX; + cm_menu_root.offsetWidth >  window.innerWidth ?  window.innerWidth - cm_menu_root.offsetWidth : e.clientX;
}

// -----------------------------
// menu_add_directory_root_click
// -----------------------------
const menu_add_directory_root = document.querySelector('#menu-add-directory-root');

menu_add_directory_root.onclick = handler_menu_add_directory_root_click;

function handler_menu_add_directory_root_click(e)
{
   console.log("[handler_menu_add_directory_root_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
	hideAllSubmenus(e);

   // showSubMenuAddDirectoryRoot
	showSubMenuAddDirectoryRoot(e,true);
};

// -------------------------------
// submenu_add_directory_root_text
// -------------------------------
const submenu_add_directory_root_text = document.querySelector('#submenu-add-directory-root-text');

submenu_add_directory_root_text.onclick = handler_submenu_add_directory_root_text_click;

function handler_submenu_add_directory_root_text_click(e)
{
   console.log("[handler_submenu_add_directory_root_text_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;
}

// ------------------------------------
// submenu_add_directory_root_button_ok
// ------------------------------------
const submenu_add_directory_root_button_ok = document.querySelector('#submenu-add-directory-root-button-ok');

submenu_add_directory_root_button_ok.onclick = handler_submenu_add_directory_root_button_ok_click;

function handler_submenu_add_directory_root_button_ok_click(e)
{
   console.log("[handler_submenu_add_directory_root_button_ok_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   // XMLHttpRequest
   var request = new XMLHttpRequest();
   request.open("POST",server_G);
   request.onreadystatechange = function()
   {
      if(request.readyState == 4 && request.status === 200)
      {
         console.log("OK answer !");
      }
   };
   request.setRequestHeader("Content-Type","application/json");

   // action : add_directory
   // champ1 : item
   var data = {"action":"add_directory_root","champ1":submenu_add_directory_root_text.value};
   request.send(JSON.stringify(data));
};

// ----------------------------------------
// submenu_add_directory_root_button_cancel
// ----------------------------------------
const submenu_add_directory_root_button_cancel = document.querySelector('#submenu-add-directory-root-button-cancel');

submenu_add_directory_root_button_cancel.onclick = handler_submenu_add_directory_root_button_cancel_click;

function handler_submenu_add_directory_root_button_cancel_click(e)
{
   console.log("[submenu_add_directory_root_button_cancel]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);
};

// --------------------------
// submenu add directory root
// --------------------------
const submenu_add_directory_root = document.querySelector('.submenu-add-directory-root');

// init
submenu_add_directory_root.style.display = 'none';
submenu_add_directory_root.style.position = 'absolute';
submenu_add_directory_root.style.backgroundColor = 'white';

function showSubMenuAddDirectoryRoot(e,show=true)
{
   submenu_add_directory_root.style.display = show ? 'block' : 'none';
   submenu_add_directory_root.style.top = e.clientY + submenu_add_directory_root.offsetHeight > window.innerHeight ? window.innerHeight - submenu_add_directory_root.offsetHeight : e.clientY;
   submenu_add_directory_root.style.left = e.clientX; + submenu_add_directory_root.offsetWidth >  window.innerWidth ?  window.innerWidth - submenu_add_directory_root.offsetWidth : e.clientX;
}

// *******************************************************
// ITEMS
// *******************************************************

var toggler = document.getElementsByClassName("caret");
var i;

for (i = 0; i < toggler.length; i++)
{
   toggler[i].onclick = handler_caret;
   toggler[i].onmousedown = handler_caret;
   toggler[i].onmouseup = handler_caret;
   toggler[i].oncontextmenu = handler_caret_contextmenu;
}

// -------------
// handler_caret
// -------------
function handler_caret(e)
{
   console.log("[handler_caret]");

   e = e || window.event;
	
   // stopPropagation
   e.stopPropagation();

   // preventDefault
   e.preventDefault();

   e.cancelBubble = true;
	
   this.parentElement.querySelector(".nested").classList.toggle("active");
   this.classList.toggle("caret-down");
/*
   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);
*/
   return false;
};

// -------------------------
// handler_caret_contextmenu
// -------------------------
function handler_caret_contextmenu(e)
{
   e = e || window.event;

   // stopPropagation
   e.stopPropagation();

   // preventDefault
   e.preventDefault();

   e.cancelBubble = true;

   switch(e.button)
   {
      // clic droit
      case 2:
/*
         console.log(e);
*/
         itemid_G = e.srcElement.attributes.getNamedItem("itemid").value;
         console.log("[handler_caret_contextmenu] : " + itemid_G);

         // hideAllContextmenus
         hideAllContextmenus(e);

         // showContextMenuItems
         showContextMenuItems(e,true);

         // hideAllSubmenus
         hideAllSubmenus(e);
         break;
   };

   return false;
};

const cm_menu_items = document.querySelector('.custom-menu-items');

// init
cm_menu_items.style.display = 'none';
cm_menu_items.style.position = 'absolute';
cm_menu_items.style.backgroundColor = 'white';

// --------------------
// showContextMenuItems
// --------------------
function showContextMenuItems(e,show=true)
{
   cm_menu_items.style.display = show ? 'block' : 'none';
   cm_menu_items.style.top = e.clientY + cm_menu_items.offsetHeight > window.innerHeight ? window.innerHeight - cm_menu_items.offsetHeight : e.clientY;
   cm_menu_items.style.left = e.clientX; + cm_menu_items.offsetWidth >  window.innerWidth ?  window.innerWidth - cm_menu_items.offsetWidth : e.clientX;
}

// ------------------
// menu add directory
// ------------------
const menu_add_directory = document.querySelector('#menu-add-directory');

menu_add_directory.onclick = handler_menu_add_directory_click;

function handler_menu_add_directory_click(e)
{
   console.log("[handler_menu_add_directory_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // showSubMenuAddDirectory
   showSubMenuAddDirectory(e,true);
};

// ---------------------
// menu delete directory
// ---------------------
const menu_delete_directory = document.querySelector('#menu-delete-directory');

menu_delete_directory.onclick = handler_menu_delete_directory_click;

function handler_menu_delete_directory_click(e)
{
   console.log("[handler_menu_delete_directory_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   // showSubMenuDeleteDirectory
   showSubMenuDeleteDirectory(e,true);
}

// ---------------------
// menu rename directory
// ---------------------
const menu_rename_directory = document.querySelector('#menu-rename-directory');

menu_rename_directory.onclick = handler_menu_rename_directory_click;

function handler_menu_rename_directory_click(e)
{
   console.log("[handler_menu_rename_directory_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   // showSubMenuRenameDirectory
   showSubMenuRenameDirectory(e,true);
};

// -----------------------
// menu add link directory
// -----------------------
const menu_add_link_directory = document.querySelector('#menu-add-link-directory');

menu_add_link_directory.onclick = handler_menu_add_link_directory_click;

function handler_menu_add_link_directory_click(e)
{
   console.log("[handler_menu_add_link_directory_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   // showSubMenuAddLinkDirectory
   showSubMenuAddLinkDirectory(e,true);
};

// ---------------------
// submenu add directory
// ---------------------
const submenu_add_directory = document.querySelector('.submenu-add-directory');

// init
submenu_add_directory.style.display = 'none';
submenu_add_directory.style.position = 'absolute';
submenu_add_directory.style.backgroundColor = 'white';

function showSubMenuAddDirectory(e,show=true)
{
   submenu_add_directory.style.display = show ? 'block' : 'none';
   submenu_add_directory.style.top = e.clientY + submenu_add_directory.offsetHeight > window.innerHeight ? window.innerHeight - submenu_add_directory.offsetHeight : e.clientY;
   submenu_add_directory.style.left = e.clientX; + submenu_add_directory.offsetWidth >  window.innerWidth ?  window.innerWidth - submenu_add_directory.offsetWidth : e.clientX;
}

// --------------------------
// submenu_add_directory_text
// --------------------------
const submenu_add_directory_text = document.querySelector('#submenu-add-directory-text');

submenu_add_directory_text.onclick = handler_submenu_add_directory_text_click;

function handler_submenu_add_directory_text_click(e)
{
   console.log("[handler_submenu_add_directory_text_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;
};

// -------------------------------
// submenu_add_directory_button_ok
// -------------------------------
const submenu_add_directory_button_ok = document.querySelector('#submenu-add-directory-button-ok');

submenu_add_directory_button_ok.onclick = hanlder_submenu_add_directory_button_ok_click;

function hanlder_submenu_add_directory_button_ok_click(e)
{
   console.log("[hanlder_submenu_add_directory_button_ok_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   // XMLHttpRequest
   var request = new XMLHttpRequest();
   request.open("POST",server_G);
   request.onreadystatechange = function()
   {
      if(request.readyState == 4 && request.status === 200)
      {
         console.log("OK answer !");
      }
   };
   request.setRequestHeader("Content-Type","application/json");

   // action : add_directory
   // champ1 : parentid
   // champ2 : item
   var data = {"action":"add_directory","champ1":itemid_G,"champ2":submenu_add_directory_text.value};
   request.send(JSON.stringify(data));
};

// -----------------------------------
// submenu_add_directory_button_cancel
// -----------------------------------
const submenu_add_directory_button_cancel = document.querySelector('#submenu-add-directory-button-cancel');

submenu_add_directory_button_cancel.onclick = handler_submenu_add_directory_button_cancel_click;

function handler_submenu_add_directory_button_cancel_click(e)
{
   console.log("[handler_submenu_add_directory_button_cancel_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);
};

// ------------------------
// submenu delete directory
// ------------------------
const submenu_delete_directory = document.querySelector('.submenu-delete-directory');

// init
submenu_delete_directory.style.display = 'none';
submenu_delete_directory.style.position = 'absolute';
submenu_delete_directory.style.backgroundColor = 'white';

function showSubMenuDeleteDirectory(e,show=true)
{
   submenu_delete_directory.style.display = show ? 'block' : 'none';
   submenu_delete_directory.style.top = e.clientY + submenu_delete_directory.offsetHeight > window.innerHeight ? window.innerHeight - submenu_delete_directory.offsetHeight : e.clientY;
   submenu_delete_directory.style.left = e.clientX; + submenu_delete_directory.offsetWidth >  window.innerWidth ?  window.innerWidth - submenu_delete_directory.offsetWidth : e.clientX;
}

// ----------------------------------
// submenu_delete_directory_button_ok
// ----------------------------------
const submenu_delete_directory_button_ok = document.querySelector('#submenu-delete-directory-button-ok');

submenu_delete_directory_button_ok.onclick = handler_submenu_delete_directory_button_ok_click;

function handler_submenu_delete_directory_button_ok_click(e)
{
   console.log("[handler_submenu_delete_directory_button_ok_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   // XMLHttpRequest
   var request = new XMLHttpRequest();
   request.open("POST",server_G);
   request.onreadystatechange = function()
   {
      if(request.readyState == 4 && request.status === 200)
      {
         console.log("OK answer !");
      }
   };

   request.setRequestHeader("Content-Type","application/json");

   // action : delete_directory
   // champ1 : itemid
   var data = {"action":"delete_directory","champ1":itemid_G};
   request.send(JSON.stringify(data));
};

// --------------------------------------
// submenu_delete_directory_button_cancel
// --------------------------------------
const submenu_delete_directory_button_cancel = document.querySelector('#submenu-delete-directory-button-cancel');

submenu_delete_directory_button_cancel.onclick = handler_submenu_delete_directory_button_cancel_click;

function handler_submenu_delete_directory_button_cancel_click(e)
{
   console.log("[handler_submenu_delete_directory_button_cancel_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);
};

// ------------------------
// submenu rename directory
// ------------------------
const submenu_rename_directory = document.querySelector('.submenu-rename-directory');

// init
submenu_rename_directory.style.display = 'none';
submenu_rename_directory.style.position = 'absolute';
submenu_rename_directory.style.backgroundColor = 'white';

function showSubMenuRenameDirectory(e,show=true)
{
   submenu_rename_directory.style.display = show ? 'block' : 'none';
   submenu_rename_directory.style.top = e.clientY + submenu_rename_directory.offsetHeight > window.innerHeight ? window.innerHeight - submenu_rename_directory.offsetHeight : e.clientY;
   submenu_rename_directory.style.left = e.clientX; + submenu_rename_directory.offsetWidth >  window.innerWidth ?  window.innerWidth - submenu_rename_directory.offsetWidth : e.clientX;
}

// -----------------------------
// submenu_rename_directory_text
// -----------------------------
const submenu_rename_directory_text = document.querySelector('#submenu-rename-directory-text');

submenu_rename_directory_text.onclick = handler_submenu_rename_directory_text_click;

function handler_submenu_rename_directory_text_click(e)
{
   console.log("[handler_submenu_rename_directory_text_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;
};

// ----------------------------------
// submenu_rename_directory_button_ok
// ----------------------------------
const submenu_rename_directory_button_ok = document.querySelector('#submenu-rename-directory-button-ok');

submenu_rename_directory_button_ok.onclick = handler_submenu_rename_directory_button_ok_click;

function handler_submenu_rename_directory_button_ok_click(e)
{
   console.log("[submenu_rename_directory_button_ok]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   // XMLHttpRequest
   var request = new XMLHttpRequest();
   request.open("POST",server_G);
   request.onreadystatechange = function()
   {
      if(request.readyState == 4 && request.status === 200)
      {
         console.log("OK answer !");
      }
   };
   request.setRequestHeader("Content-Type","application/json");

   // action : rename_directory
   // champ1 : itemid
   // champ2 : item
   var data = {"action":"rename_directory","champ1":itemid_G,"champ2":submenu_rename_directory_text.value};
   request.send(JSON.stringify(data));
};

// --------------------------------------
// submenu_rename_directory_button_cancel
// --------------------------------------
const submenu_rename_directory_button_cancel = document.querySelector('#submenu-rename-directory-button-cancel');

submenu_rename_directory_button_cancel.onclick = handler_submenu_rename_directory_button_cancel_click;

function handler_submenu_rename_directory_button_cancel_click(e)
{
   console.log("[handler_submenu_rename_directory_button_cancel_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);
};

// --------------------------
// submenu add link directory
// --------------------------
const submenu_add_link_directory = document.querySelector('.submenu-add-link-directory');

// init
submenu_add_link_directory.style.display = 'none';
submenu_add_link_directory.style.position = 'absolute';
submenu_add_link_directory.style.backgroundColor = 'white';

function showSubMenuAddLinkDirectory(e,show=true)
{
   submenu_add_link_directory.style.display = show ? 'block' : 'none';
   submenu_add_link_directory.style.top = e.clientY + submenu_add_link_directory.offsetHeight > window.innerHeight ? window.innerHeight - submenu_add_link_directory.offsetHeight : e.clientY;
   submenu_add_link_directory.style.left = e.clientX; + submenu_add_link_directory.offsetWidth >  window.innerWidth ?  window.innerWidth - submenu_add_link_directory.offsetWidth : e.clientX;
}

// ------------------------------------
// submenu_add_link_directory_text_link
// ------------------------------------
const submenu_add_link_directory_text_link = document.querySelector('#submenu-add-link-directory-text-link');

submenu_add_link_directory_text_link.onclick = handler_submenu_add_link_directory_text_link_click;

function handler_submenu_add_link_directory_text_link_click(e)
{
   console.log("[handler_submenu_add_link_directory_text_link_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;
};

// -----------------------------------
// submenu_add_link_directory_text_url
// -----------------------------------
const submenu_add_link_directory_text_url = document.querySelector('#submenu-add-link-directory-text-url');

submenu_add_link_directory_text_url.onclick = handler_submenu_add_link_directory_text_url_click;

function handler_submenu_add_link_directory_text_url_click(e)
{
   console.log("[handler_submenu_add_link_directory_text_url_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;
};

// ------------------------------------
// submenu_add_link_directory_button_ok
// ------------------------------------
const submenu_add_link_directory_button_ok = document.querySelector('#submenu-add-link-directory-button-ok');

submenu_add_link_directory_button_ok.onclick = handler_submenu_add_link_directory_button_ok_click;

function handler_submenu_add_link_directory_button_ok_click(e)
{
   console.log("[handler_submenu_add_link_directory_button_ok_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   // XMLHttpRequest
   var request = new XMLHttpRequest();
   request.open("POST",server_G);
   request.onreadystatechange = function()
   {
      if(request.readyState == 4 && request.status === 200)
      {
         console.log("OK answer !");
      }
   };
   request.setRequestHeader("Content-Type","application/json");

   // action : add_link_directory
   // champ1 : itemid
   // champ2 : link
   // champ3 : url
   var data = {"action":"add_link_directory","champ1":itemid_G,"champ2":submenu_add_link_directory_text_link.value,"champ3":submenu_add_link_directory_text_url.value};
   request.send(JSON.stringify(data));
};

// ----------------------------------------
// submenu_add_link_directory_button_cancel
// ----------------------------------------
const submenu_add_link_directory_button_cancel = document.querySelector('#submenu-add-link-directory-button-cancel');

submenu_add_link_directory_button_cancel.onclick = handler_submenu_add_link_directory_button_cancel_click;

function handler_submenu_add_link_directory_button_cancel_click(e)
{
   console.log("handler_submenu_add_link_directory_button_cancel_click");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;
	
   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);
};

// *******************************************************
// LINKS
// *******************************************************

var nest = document.getElementsByClassName("nested");
var i;

for (i = 0; i < nest.length; i++)
{
   nest[i].onclick = handler_nested_click;
   nest[i].oncontextmenu = handler_nested_contextmenu;
}

// --------------------------
// handler_nested_click
// --------------------------
function handler_nested_click(e)
{
   console.log("[handler_nested_click]");

   e = e || window.event;

   // stopPropagation
   e.stopPropagation();

   // preventDefault
//   e.preventDefault();

   e.cancelBubble = true;
}

// --------------------------
// handler_nested_contextmenu
// --------------------------
function handler_nested_contextmenu(e)
{
   e = e || window.event;

   // stopPropagation
   e.stopPropagation();

   // preventDefault
   e.preventDefault();

   e.cancelBubble = true;

   switch(e.button)
   {
      // clic droit
      case 2:
/*
         console.log(e);
*/
         itemid_G = e.srcElement.parentElement.attributes.getNamedItem("itemid").value;
         linkid_G = e.srcElement.parentElement.attributes.getNamedItem("linkid").value;
         console.log("[handler_nested_contextmenu] : " + linkid_G + " " + itemid_G);
   
         // hideAllContextmenus
      	hideAllContextmenus(e);

         // showContextMenuLinks
         showContextMenuLinks(e,true);
   
	      // hideAllSubmenus
         hideAllSubmenus(e);
         break;
   };

   return false;
};

const cm_links = document.querySelector('.custom-menu-links');

// init
cm_links.style.display = 'none';
cm_links.style.position = 'absolute';
cm_links.style.backgroundColor = 'white';

// --------------------
// showContextMenuLinks
// --------------------
function showContextMenuLinks(e,show=true)
{
   cm_links.style.display = show ? 'block' : 'none';
   cm_links.style.top = e.clientY + cm_links.offsetHeight > window.innerHeight ? window.innerHeight - cm_links.offsetHeight : e.clientY;
   cm_links.style.left = e.clientX; + cm_links.offsetWidth >  window.innerWidth ?  window.innerWidth - cm_links.offsetWidth : e.clientX;
}

// -------------
// menu add link
// -------------
const menu_add_link = document.querySelector('#menu-add-link');

menu_add_link.onclick = handler_menu_add_link_click;

function handler_menu_add_link_click(e)
{
   console.log("[handler_menu_add_link_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   // showSubMenuAddLink
	showSubMenuAddLink(e,true);
};

// ----------------
// menu delete link
// ----------------
const menu_delete_link = document.querySelector('#menu-delete-link');

menu_delete_link.onclick = handler_menu_delete_link_click;

function handler_menu_delete_link_click(e)
{
   console.log("[handler_menu_delete_link_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   // showSubMenuDeleteLink
	showSubMenuDeleteLink(e,true);
};

// ----------------
// menu rename link
// ----------------
const menu_rename_link = document.querySelector('#menu-rename-link');

menu_rename_link.onclick = handler_menu_rename_link_click;

function handler_menu_rename_link_click(e)
{
   console.log("[handler_menu_rename_link_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   // showSubMenuRenameLink
//	showSubMenuRenameLink(e,true);
};

// ----------------
// submenu add link
// ----------------
const submenu_add_link = document.querySelector('.submenu-add-link');

// init
submenu_add_link.style.display = 'none';
submenu_add_link.style.position = 'absolute';
submenu_add_link.style.backgroundColor = 'white';

function showSubMenuAddLink(e,show=true)
{
   submenu_add_link.style.display = show ? 'block' : 'none';
   submenu_add_link.style.top = e.clientY + submenu_add_link.offsetHeight > window.innerHeight ? window.innerHeight - submenu_add_link.offsetHeight : e.clientY;
   submenu_add_link.style.left = e.clientX; + submenu_add_link.offsetWidth >  window.innerWidth ?  window.innerWidth - submenu_add_link.offsetWidth : e.clientX;
}

// --------------------------
// submenu_add_link_text_link
// --------------------------
const submenu_add_link_text_link = document.querySelector('#submenu-add-link-text-link');

submenu_add_link_text_link.onclick = handler_submenu_add_link_text_link_onclick;

function handler_submenu_add_link_text_link_onclick(e)
{
   console.log("[handler_submenu_add_link_text_link_onclick]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;
};

// -------------------------
// submenu_add_link_text_url
// -------------------------
const submenu_add_link_text_url = document.querySelector('#submenu-add-link-text-url');

submenu_add_link_text_url.onclick = handler_submenu_add_link_text_url_onclick;

function handler_submenu_add_link_text_url_onclick(e)
{
   console.log("[handler_submenu_add_link_text_url_onclick]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;
};

// --------------------------
// submenu_add_link_button_ok
// --------------------------
const submenu_add_link_button_ok = document.querySelector('#submenu-add-link-button-ok');

submenu_add_link_button_ok.onclick = handler_submenu_add_link_button_ok_click;

function handler_submenu_add_link_button_ok_click(e)
{
   console.log("[handler_submenu_add_link_button_ok_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;
	
   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   // XMLHttpRequest
   var request = new XMLHttpRequest();
   request.open("POST",server_G);
   request.onreadystatechange = function()
   {
      if(request.readyState == 4 && request.status === 200)
      {
         console.log("OK answer !");
      }
   };
   request.setRequestHeader("Content-Type","application/json");

   // action : add_link
   // champ1 : itemid
   // champ2 : link
   // champ3 : url
   var data = {"action":"add_link","champ1":itemid_G,"champ2":submenu_add_link_text_link.value,"champ3":submenu_add_link_text_url.value};
   request.send(JSON.stringify(data));
};

// ------------------------------
// submenu_add_link_button_cancel
// ------------------------------
const submenu_add_link_button_cancel = document.querySelector('#submenu-add-link-button-cancel');

submenu_add_link_button_cancel.onclick = handler_submenu_add_link_button_cancel_click;

function handler_submenu_add_link_button_cancel_click(e)
{
   console.log("[handler_submenu_add_link_button_cancel_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;
	
   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);
};

// -------------------
// submenu delete link
// -------------------
const submenu_delete_link = document.querySelector('.submenu-delete-link');

// init
submenu_delete_link.style.display = 'none';
submenu_delete_link.style.position = 'absolute';
submenu_delete_link.style.backgroundColor = 'white';

function showSubMenuDeleteLink(e,show=true)
{
   submenu_delete_link.style.display = show ? 'block' : 'none';
   submenu_delete_link.style.top = e.clientY + submenu_delete_link.offsetHeight > window.innerHeight ? window.innerHeight - submenu_delete_link.offsetHeight : e.clientY;
   submenu_delete_link.style.left = e.clientX; + submenu_delete_link.offsetWidth >  window.innerWidth ?  window.innerWidth - submenu_delete_link.offsetWidth : e.clientX;
}

// -----------------------------
// submenu_delete_link_button_ok
// -----------------------------
const submenu_delete_link_button_ok = document.querySelector('#submenu-delete-link-button-ok');

submenu_delete_link_button_ok.onclick = handler_submenu_delete_link_button_ok_click;

function handler_submenu_delete_link_button_ok_click(e)
{
   console.log("[handler_submenu_delete_link_button_ok_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;
	
   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   // XMLHttpRequest
   var request = new XMLHttpRequest();
   request.open("POST",server_G);
   request.onreadystatechange = function()
   {
      if(request.readyState == 4 && request.status === 200)
      {
         console.log("OK answer !");
      }
   };
   request.setRequestHeader("Content-Type","application/json");

   // action : delete_link
   // champ1 : itemid
   var data = {"action":"delete_link","champ1":linkid_G};
   request.send(JSON.stringify(data));
};

// ---------------------------------
// submenu_delete_link_button_cancel
// ---------------------------------
const submenu_delete_link_button_cancel = document.querySelector('#submenu-delete-link-button-cancel');

submenu_delete_link_button_cancel.onclick = handler_submenu_delete_link_button_cancel_click;

function handler_submenu_delete_link_button_cancel_click(e)
{
   console.log("[handler_submenu_delete_link_button_cancel_click]");

   e = e || window.event;

   // stopPropagation
//   e.stopPropagation();

   // preventDefault
   e.preventDefault();

//   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);
};

// -------------------
// submenu rename link
// -------------------
const submenu_rename_link = document.querySelector('.submenu-rename-link');

// init
submenu_rename_link.style.display = 'none';
submenu_rename_link.style.position = 'absolute';
submenu_rename_link.style.backgroundColor = 'white';

function showSubMenuRenameLink(e,show=true)
{
   submenu_rename_link.style.display = show ? 'block' : 'none';
   submenu_rename_link.style.top = e.clientY + submenu_rename_link.offsetHeight > window.innerHeight ? window.innerHeight - submenu_rename_link.offsetHeight : e.clientY;
   submenu_rename_link.style.left = e.clientX; + submenu_rename_link.offsetWidth >  window.innerWidth ?  window.innerWidth - submenu_rename_link.offsetWidth : e.clientX;
}

// ------------------------
// submenu_rename_link_text
// ------------------------
const submenu_rename_link_text = document.querySelector('#submenu-rename-link-text');

submenu_rename_link_text.onclick = handler_submenu_rename_link_text_click;

function handler_submenu_rename_link_text_click(e)
{
   console.log("[handler_submenu_rename_link_text_click]");

   e = e || window.event;

   // stopPropagation
   e.stopPropagation();

   // preventDefault
   e.preventDefault();

   e.cancelBubble = true;
};

// -----------------------------
// submenu_rename_link_button_ok
// -----------------------------
const submenu_rename_link_button_ok = document.querySelector('#submenu-rename-link-button-ok');

submenu_rename_link_button_ok.onclick = handler_submenu_rename_link_button_ok_click;

function handler_submenu_rename_link_button_ok_click(e)
{
   console.log("[handler_submenu_rename_link_button_ok_click]");

   e = e || window.event;

   // stopPropagation
   e.stopPropagation();

   // preventDefault
   e.preventDefault();

   e.cancelBubble = true;

   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);

   // XMLHttpRequest
   var request = new XMLHttpRequest();
   request.open("POST",server_G);
   request.onreadystatechange = function()
   {
      if(request.readyState == 4 && request.status === 200)
      {
         console.log("OK answer !");
      }
   };
   request.setRequestHeader("Content-Type","application/json");

   // action : rename_link
   // champ1 : linkid
   // champ2 : link
   var data = {"action":"rename_link","champ1":linkid_G,"champ2":submenu_rename_link_text.value};
   request.send(JSON.stringify(data));
};

// ---------------------------------
// submenu_rename_link_button_cancel
// ---------------------------------
const submenu_rename_link_button_cancel = document.querySelector('#submenu-rename-link-button-cancel');

submenu_rename_link_button_cancel.onclick = handler_submenu_rename_link_button_cancel_click;

function handler_submenu_rename_link_button_cancel_click(e)
{
   console.log("[handler_submenu_rename_link_button_cancel_click]");

   e = e || window.event;

   // stopPropagation
   e.stopPropagation();

   // preventDefault
   e.preventDefault();

   e.cancelBubble = true;
	
   // hideAllContextmenus
   hideAllContextmenus(e);

   // hideAllSubmenus
   hideAllSubmenus(e);
};
