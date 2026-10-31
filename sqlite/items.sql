with recursive Tree (parentid,itemid,item) as
(
   select parentid,itemid,item from Items
   union all
   select t.parentid,t.itemid,t.item
   from Tree as tree join Items as t
   on tree.itemid = t.parentid
)
select distinct * from Tree;

/*
select * from Items where parentid is NULL;
*/
/*
.read test.sql
*/
