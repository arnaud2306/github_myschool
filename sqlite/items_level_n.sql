/*
select items1.itemid,items1.item from Items items1 left join Items items2 on items2.parentid = items1.itemid where items2.itemid is NULL;
select items1.itemid,items1.item from Items items1 left join Items items2 on items2.parentid = items1.itemid where items2.itemid = 1;

*/
/*
.read test.sql
*/
