with recursive Link (parentid,itemid,linkid,item,link,url) as
(
   select parentid,Items.itemid,linkid,item,link,url from Items,Links
   where Items.itemid = Links.itemid
   union all
   select t.parentid,t.itemid,link.linkid,t.item,link.link,link.url
   from Link as link join Items as t
   on link.itemid = t.parentid
)
select distinct * from Link;

/*
with recursive Link (parentid,itemid,linkid,item,link) as
(
   select parentid,Items.itemid,linkid,item,link from Items,Links
   where Items.itemid = Links.itemid
   union all
   select t.parentid,t.itemid,link.linkid,t.item,link.link
   from Link as link join Items as t
   on link.itemid = t.parentid
)
select distinct * from Link;
*/
/*
.read test.sql
*/
