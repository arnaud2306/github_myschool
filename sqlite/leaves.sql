select items1.* from Items items1 where not exists (select 1 from Items where parentid = items1.itemid);

/*
select items1.itemid,items1.item from Items items1 left join Items items2 on items2.parentid = items1.itemid where items2.itemid is null order by items1.item;
*/
/*
.read test.sql
*/
