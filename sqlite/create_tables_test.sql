DROP TABLE IF EXISTS Users;

CREATE TABLE Users
( userid        INTEGER not null,
  pseudo        VARCHAR(100),
  email         VARCHAR(100),
  password      TEXT,
  date_creation DATE,		
			
  PRIMARY KEY(userid)
);

insert into Users (pseudo) values ('arnaud2306');
insert into Users (pseudo) values ('alexis1607');
insert into Users (pseudo) values ('nathan0207');

DROP TABLE IF EXISTS Items;

CREATE TABLE Items
( itemid       INTEGER,
  parentid		INTEGER default null,
  item         VARCHAR(100),
  userid       INTEGER,

  PRIMARY KEY(itemid),
  FOREIGN KEY(parentid) REFERENCES Items(itemid) ON DELETE CASCADE ON UPDATE CASCADE,
/*
With the contraints we make sure that deleting a node would delete all its children and grandchildren.
*/
  FOREIGN KEY(userid) REFERENCES Users(userid)
);

insert into Items (item,userid) values ('ANDROID',1);
insert into Items (parentid,item,userid) values (1,'CTS',1);
insert into Items (item,userid) values ('BUILDROOT',1);
insert into Items (item,userid) values ('CEC',1);
insert into Items (item,userid) values ('CERTIFICATIONS',1);
insert into Items (parentid,item,userid) values (5,'BLUETOOTH',1);
insert into Items (parentid,item,userid) values (5,'HDMI',1);
insert into Items (parentid,item,userid) values (5,'WIFI',1);
insert into Items (item,userid) values ('CRITERION',1);
insert into Items (item,userid) values ('GSTREAMER',1);
insert into Items (item,userid) values ('MATTER',1);
insert into Items (item,userid) values ('MYSCHOOL',1);
insert into Items (parentid,item,userid) values (12,'Adjacency list model',1);
insert into Items (parentid,item,userid) values (12,'Sqlite',1);
insert into Items (item,userid) values ('OMNIORB',1);
insert into Items (item,userid) values ('OPENCV',1);
insert into Items (item,userid) values ('OPENGL',1);
insert into Items (item,userid) values ('STBTESTER',1);
insert into Items (item,userid) values ('YOCTOPUCE',1);
insert into Items (item,userid) values ('WEB',1);
insert into Items (parentid,item,userid) values (20,'APACHE',1);
insert into Items (parentid,item,userid) values (20,'CSS',1);
insert into Items (parentid,item,userid) values (20,'DOM',1);
insert into Items (parentid,item,userid) values (20,'FORMATIONS',1);
insert into Items (parentid,item,userid) values (20,'GOJS',1);
insert into Items (parentid,item,userid) values (20,'HTML',1);
insert into Items (parentid,item,userid) values (20,'HTML5',1);
insert into Items (parentid,item,userid) values (20,'JAVASCRIPT',1);
insert into Items (parentid,item,userid) values (20,'LIBXML',1);
insert into Items (parentid,item,userid) values (20,'MDN',1);
insert into Items (parentid,item,userid) values (20,'PHP',1);
insert into Items (parentid,item,userid) values (20,'XSLT',1);
insert into Items (parentid,item,userid) values (20,'W3C',1);
insert into Items (parentid,item,userid) values (20,'W3SCHOOLS',1);

DROP TABLE IF EXISTS Links;

CREATE TABLE Links
( linkid       INTEGER,
  link         VARCHAR(200),
  url          VARCHAR(200),
  itemid       INTEGER,
   
  PRIMARY KEY(linkid),
  FOREIGN KEY(itemid) REFERENCES Items
);

/*
insert into Links (link,url,itemid) values ('','',);
*/

/* ANDROID */
insert into Links (link,url,itemid) values ('Architecture Android','https://source.android.com/devices/architecture',1);
insert into Links (link,url,itemid) values ('Android for developers','https://developer.android.com',1);
insert into Links (link,url,itemid) values ('Assistant Readiness Testing (ART) user guide','https://developers.google.com/assistant-partners',1);
insert into Links (link,url,itemid) values ('Suite de tests de compatibilité','https://source.android.com/compatibility/cts',1);
insert into Links (link,url,itemid) values ('Téléchargement de la suite de tests de compatibilité','https://source.android.com/compatibility/cts/downloads',1);
/* CTS */
insert into Links (link,url,itemid) values ('Setting up CTS','https://source.android.com/compatibility/cts/setup',2);
insert into Links (link,url,itemid) values ('Tests for EDID based capabilities','https://docs.partner.android.com/tv/test/tvts/edid-tests',2);
/* BUILDROOT */
insert into Links (link,url,itemid) values ('Buildroot','https://buildroot.org',3);
insert into Links (link,url,itemid) values ('Créer un systéme complet avec Buildroot','https://www.blaess.fr/christophe/buildroot-lab/index.html',3);
/* CEC */
insert into Links (link,url,itemid) values ('Using cec-client to control HDMI devices','https://www.endpointdev.com/blog/2012/11/using-cec-client-to-control-hdmi-devices',4);
/* CERTIFICATIONS */
/* BLUETOOTH */
/* HDMI */
/* WIFI */
/* CRITERION */
insert into Links (link,url,itemid) values ('Criterion','https://criterion.readthedocs.io/en/master',9);
insert into Links (link,url,itemid) values ('Criterion - Introduction','https://criterion.readthedocs.io/en/master/intro.html',9);
/* GSTREAMER */
insert into Links (link,url,itemid) values ('Gstreamer','https://gstreamer.freedesktop.org',10);
/* MATTER */
insert into Links (link,url,itemid) values ('Matter','https://csa-iot.org/all-solutions/matter',11);
/* MYSCHOOL */
/* Adjacency list model */
insert into Links (link,url,itemid) values ('Managing hierarchical data in Mysql using the adjacency list model','https://www.mysqltutorial.org/mysql-adjacency-list-tree',13);
insert into Links (link,url,itemid) values ('Adjacency list','https://en.wikipedia.org/wiki/Adjacency_list',13);
insert into Links (link,url,itemid) values ('Managing trees in Mysql using the adjacency list model','https://rolandgeng.de/managing-trees-in-mysql-using-the-adjacency-list-model',13);
insert into Links (link,url,itemid) values ('Recursive Queries Using Common Table Expressions','https://gist.github.com/jbrown123/b65004fd4e8327748b650c77383bf553',13);
insert into Links (link,url,itemid) values ('Transform XML with XSLT in PHP','https://stackoverflow.com/questions/13742972/transform-xml-with-xslt-in-php',13);
/* Sqlite */
insert into Links (link,url,itemid) values ('Sqlite foreign key support','https://www.sqlite.org/foreignkeys.html',14);
insert into Links (link,url,itemid) values ('The WITH clause','https://www.sqlite.org/lang_with.html',14);
insert into Links (link,url,itemid) values ('C-language Interface Specification for SQLite','https://www.sqlite.org/capi3ref.html',14);
/* OMNIORB */
insert into Links (link,url,itemid) values ('OmniORB','https://omniorb.sourceforge.io',15);
/* OPENCV */
insert into Links (link,url,itemid) values ('Opencv','https://opencv.org',16);
insert into Links (link,url,itemid) values ('Object tracking with OpenCV','https://livecodestream.dev/post/object-tracking-with-opencv',16);
insert into Links (link,url,itemid) values ('Getting started with object tracking using OpenCV','https://www.analyticsvidhya.com/blog/2021/08/getting-started-with-object-tracking-using-opencv',16);
/* OPENGL */
insert into Links (link,url,itemid) values ('OpenGL','https://www.opengl.org',17);
insert into Links (link,url,itemid) values ('GLFW','https://www.glfw.org',17);
insert into Links (link,url,itemid) values ('GLEW','http://glew.sourceforge.net',17);
/* STBTESTER */
insert into Links (link,url,itemid) values ('Automated testing for Set Top Boxes and Smart TVs','https://stb-tester.com',18);
insert into Links (link,url,itemid) values ('STB Tester videos and tutorials','https://stb-tester.com/manual/tutorials',18);
insert into Links (link,url,itemid) values ('STBT Python API','https://stb-tester.com/manual/python-api',18);
insert into Links (link,url,itemid) values ('Configuration Reference','https://stb-tester.com/manual/configuration#',18);
insert into Links (link,url,itemid) values ('IRTrans','https://www.irtrans.de/en',18);
/* YOCTOPUCE */
insert into Links (link,url,itemid) values ('Introduction aux modules Yoctopuce','https://www.yoctopuce.com/FR/article/introduction-aux-modules-yoctopuce',19);
insert into Links (link,url,itemid) values ('Yocto-Visualization mode d emploi','https://www.yoctopuce.com/FR/article/yocto-visualization-user-s-guide',19);
/* WEB */
/* APACHE */
/* CSS */
/* DOM */
insert into Links (link,url,itemid) values ('Document Object Model - Wikipedia','https://fr.wikipedia.org/wiki/Document_Object_Model',23);
insert into Links (link,url,itemid) values ('Document Object Model - W3C','https://dom.spec.whatwg.org/review-drafts/2020-06',23);
insert into Links (link,url,itemid) values ('Document Object Model - Tutorial','https://www.tutorialspoint.com/dom/xml_dom_tutorial.pdf',23);
insert into Links (link,url,itemid) values ('JavaScript HTML DOM','https://www.w3schools.com/js/js_htmldom.asp',23);
insert into Links (link,url,itemid) values ('Document Object Model (DOM) Level 2 core specification','https://www.w3.org/TR/DOM-Level-2-Core',23);
insert into Links (link,url,itemid) values ('Document Object Model (DOM) Level 3 core specification','https://www.w3.org/TR/2004/REC-DOM-Level-3-Core-20040407/Overview.html#contents',23);
insert into Links (link,url,itemid) values ('Document Object Model (DOM) Level 4','https://dom.spec.whatwg.org',23);
/* FORMATIONS */
insert into Links (link,url,itemid) values ('Grafikart','https://grafikart.fr/formations',24);
insert into Links (link,url,itemid) values ('MDN Web Docs','https://developer.mozilla.org/fr',24);
insert into Links (link,url,itemid) values ('Ecole du Web','https://www.ecole-du-web.net',24);
insert into Links (link,url,itemid) values ('W3School','https://www.w3schools.com',24);
insert into Links (link,url,itemid) values ('Custom Context Menu','https://www.youtube.com/watch?v=-R8_MswrzD8',24);
/* GOJS */
insert into Links (link,url,itemid) values ('GoJS','https://gojs.net/latest/index.html',25);
insert into Links (link,url,itemid) values ('GoJS API','https://gojs.net/latest/api',25);
insert into Links (link,url,itemid) values ('GoJS Class Diagram','https://gojs.net/latest/api/symbols/Diagram.html',25);
insert into Links (link,url,itemid) values ('GoJS Class Node','https://gojs.net/latest/api/symbols/Node.html',25);
insert into Links (link,url,itemid) values ('GoJS Timeline','https://gojs.net/latest/samples/timeline.html',25);
insert into Links (link,url,itemid) values ('GoJS Sparkline graphs','https://gojs.net/latest/samples/sparklineGraphs.html',25);
/* HTML */
insert into Links (link,url,itemid) values ('Mémento des balises HTML','https://openclassrooms.com/fr/courses/1603881-apprenez-a-creer-votre-site-web-avec-html5-et-css3/1608357-memento-des-balises-html',26);
/* HTML5 */
insert into Links (link,url,itemid) values ('HTML5','https://dev.w3.org/html5/spec-LC',27);
/* JAVASCRIPT */
/* LIBXML */
insert into Links (link,url,itemid) values ('Utilisation de la bibliotheque libxml2 en C','https://www.julp.fr/articles/1-utilisation-de-la-bibliotheque-libxml2-en-c.html',29);
insert into Links (link,url,itemid) values ('libxml2','https://gitlab.gnome.org/GNOME/libxml2',29);
insert into Links (link,url,itemid) values ('Extensible Markup Language (XML) 1.1 (Second Edition)','https://www.w3.org/TR/2006/REC-xml11-20060816',29);
insert into Links (link,url,itemid) values ('libxml2 API Modules','https://gnome.pages.gitlab.gnome.org/libxml2/devhelp/general.html',29);
insert into Links (link,url,itemid) values ('libxml2 parser','https://gnome.pages.gitlab.gnome.org/libxml2/devhelp/libxml2-parser.html',29);
insert into Links (link,url,itemid) values ('libxml2 tree','https://gnome.pages.gitlab.gnome.org/libxml2/devhelp/libxml2-tree.html',29);
insert into Links (link,url,itemid) values ('libxml2 string','https://gnome.pages.gitlab.gnome.org/libxml2/devhelp/libxml2-xmlstring.html',29);
/* MDN */
insert into Links (link,url,itemid) values ('Resources for developers','https://developer.mozilla.org/en-US',30);
insert into Links (link,url,itemid) values ('Event reference','https://developer.mozilla.org/en-US/docs/Web/Events',30);
insert into Links (link,url,itemid) values ('Click event','https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event',30);
/* PHP */
insert into Links (link,url,itemid) values ('How to install PHP on Debian 10/Debian 11','https://computingforgeeks.com/install-php-on-debian-linux-systen',31);
insert into Links (link,url,itemid) values ('SQLite3','https://www.php.net/manual/en/book.sqlite3.php',31);
/* XSLT */
/* W3C */
insert into Links (link,url,itemid) values ('World Wide Web Consortium','https://www.w3.org',33);
/* W3SCHOOLS */
insert into Links (link,url,itemid) values ('w3schools','https://www.w3schools.com',34);

/*
select  * from Items where parentid not null;
select * from Items where Itemid = 44;
insert into Links (link,url,itemid) values ('APACHE','https://httpd.apache.org',1);
delete from Links where url is NULL;
select disctinct * from Items where parentid is NULL;
select Items.itemid,Items.parentid,Items.item,Links.linkid,Links.link from Items,Links where Items.parentid is NULL and Items.itemid = Links.itemid;
*/
