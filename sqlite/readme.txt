sqlite3 MySchool

.help
.databases
.tables
.schema
.exit
.quit
.read create_tables.sql

select * from Users;
select * from Items where userid=1;						// "arnaud2306"
select * from Items where userid=1 order by item;
select * from Links where itemid=122;					// "GOOGLE ANALYTICS"

insert into Items (item,userid) values ('TEST',2);

insert into Links (link,url,itemid) values ('test','http://test.html',76);
insert into Links (link,url,itemid) values ('Ecole directe','https://www.ecoledirecte.com/Famille',76);
insert into Links (link,url,itemid) values ('Criterion documentation','https://buildmedia.readthedocs.org/media/pdf/criterion/latest/criterion.pdf',9);

insert into Items (parentid,item,userid) values (null,'AUTOTOOLS',1);
insert into Items (parentid,item,userid) values (null,'CMAKE',1);
insert into Items (parentid,item,userid) values (null,'DIVERS',1);
insert into Items (parentid,item,userid) values (null,'FREELANCE',1);
insert into Items (parentid,item,userid) values (null,'FORMATS AUDIO/VIDEO',1);
insert into Items (parentid,item,userid) values (null,'LIBRAIRIES',1);
insert into Items (parentid,item,userid) values (null,'MYSCHOOL',1);
insert into Items (parentid,item,userid) values (null,'Open Broadcaster System (OBS)',1);
insert into Items (parentid,item,userid) values (null,'OUTILS',1);
insert into Items (parentid,item,userid) values (null,'PROJETS GIT',1);
insert into Items (parentid,item,userid) values (null,'PYTHON',1);
insert into Items (parentid,item,userid) values (null,'SQL',1);
insert into Items (parentid,item,userid) values (null,'SAGEMCOM',1);
insert into Items (parentid,item,userid) values (null,'TELEDYNE',1);
insert into Items (parentid,item,userid) values (null,'UPNP',1);
insert into Items (parentid,item,userid) values (null,'VLC',1);
insert into Items (parentid,item,userid) values (null,'YOCTOPUCE',1);

delete from Items where itemid = 39;
delete from Items where userid = 2;

update Users set password="arnaud2306" where pseudo="arnaud2306";
update Users set password="alexis1607" where pseudo="alexis1607";
update Users set password="nathan0207" where pseudo="nathan0207";
