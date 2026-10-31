xsltproc myschool.xsl myschool.xml > myschool.html
xsltproc test.xsl test.xml > test.html
xsltproc myschool.xsl ./sqlite/test.xml > test.html
xsltproc myschool.xsl ./php/myschool.xml > myschool.html
xsltproc myschool.xsl ./php/myschool.debug > myschool.html

# npm
npm install sqlite3

"Space Team"
"MySchool"

######
# DONE
######
* gestion d'une liste déroulante	OK (style="overflow:scroll;")
* integrer les pages de connexion OK
* utiliser un fichier XML par utilisateur pour que l'application soit multi utilisateurs OK
* debug : action "add_directory". Elle doit prendre 3 parametres OK (attention au cache des fichier .js) (header("Cache-Control: no-cache");)
* afficher le liens hypertexte dans le container "main-container" OK
   <xsl:attribute name="target">
      <xsl:text>main-container</xsl:text>
   </xsl:attribute>
* ajout Item depuis la racine OK
* supprimer les liens symboliques OK
* generaliser myschool.php pour qu'il fonctionne avec n'importe quel userid (attention au cache des fichier .js) (passage du userid de myschool.js à .html) OK
* passer les paramètres entre fichier .php par variables SESSION plutot que par paramètres de l'URL OK
* [debug] Lorsque je fais un clic droit sur un lien, j'obtiens le menu "custom-menu-root" OK
* [debug] Quand on clique sur une URL, on ne se dirige pas vers le site correspondant OK (il manquait la gestion de l'évènement "click" sur la classe "nested"
* [debug] L'icone qui apparait lorsqu'on navigue au dessus d'un menu contextuel n'est pas le bon (modification de "myschool.css") OK
* ajouter une puce à chaque lien pour mieux identifier chacun des liens

######
# TODO
######
* gestion des cookies "SameSite"
* CORS Cross Origin Ressource Sharing
* sauvegarde des paramètres d'affichage
* gestion dynamique de traces applicatives
* gestion d'un fichier de logs (ajout utilisateur, ajout repertoire, ajout lien, suppression repertoire, suppression lien, ...)
* gestion des droits sur les fichiers temporaires
* gestion des groupes d'utilisateurs
* gestion des utilsateurs dans le MCD
* gestion des workspace dans le MCD
* hebergement du site
* outil pour créer la BDD à partir d'un fichier XML
* nettoyer les entrées de textes pour les actions "Add"
* gestion du drag & drop pour déplacer les Items ou des Links
* gerer les workspaces sous formes de tuiles
* integrer des diagrammes de gantt pour planifier la lecture des liens. Les liens seront intégrables aux diagrammes de gantt en drag & drop.
* bouton de déconnexion
* effacer les fichiers temporaires sur le serveur lors de la deconnexion
* gérer un fichier de paramètres (base de données, fichiers temporaires, ...)
* revoir les fichiers .css
* ajouter un champ de texte affichant l'URL actuellement affichée
* gerer le nombre de clics sur un lien, associé à l'utilisateur qui clique

#######
# DEBUG
#######
* [debug] l'URL suivante fait planter l'application :
https://go.teledynelecroy.com/l/48392/2022-11-22/8m3l56?utm_source=Email&utm_medium=Email&utm_term=Thread%2C+Zigbee%2C+CSA%2C+matter&utm_content=Webinar+On-Demand+Registration&utm_campaign=22-11-17+Threading+the+802.15.4+Stack+Webinar
* [debug] myschool..html myschool..xml
* [debug] En cliquant sur le bouton "Delete directory" on ne masque pas le menu "custom-menu-items"
* [debug] Des actions sur la BDD d'un utilisateur sont effectuées sur un autre utilisateur
* [debug] SQLite3::query(): Unable to execute statement: attempt to write a readonly database
  - PHP Warning:  SQLite3::query(): Unable to execute statement: attempt to write a readonly database in /home/g133036/Arnaud/PFE/git_myschool/php/myschool_server.php on line 149, referer: http://myschool.sagem/tmp/myschool.arnaud2306.html?userid=1
  sudo chown g133036:www-data MySchool
  chmod 774 MySchool
* [debug] Desactivation du cache css dans Apache
* [debug] insert into Links (link,url,itemid) values ('Tutoriel PHP : Gestion d'un espace membre','https://www.youtube.com/watch?v=YNbPMm08jcw&t=78s',12);
* [debug] insert into Links (link,url,itemid) values ('Tutoriel PHP : Connexion persistante "Se souvenir de moi"','https://www.youtube.com/watch?v=18KsxCgIiyQ&list=PLjwdMgw5TTLX9UU3k2-zX0cWNgO6K-Q02&index=28',12);
* [debug] insert into Links (link,url,itemid) values ('[GA4] About events','https://support.google.com/analytics/answer/9322688?hl=en&ref_topic=13367566&sjid=16367167308294113448-EU#zippy=%2Crealtime-report%2Cdebugview-report',122);

#######
# IDEES
#######
* implementer mon propre Frontend Kindle
* implementer mon propre Frontend Deezer
* implementer mon propre Frontend style Kindle avec mes documents pdf

###############
# PLAN DE TESTS
###############
* s'appuyer sur Criterion pour mettre en place des tests
