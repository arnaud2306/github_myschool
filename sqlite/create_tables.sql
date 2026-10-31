DROP TABLE IF EXISTS Users;

CREATE TABLE Users
( userid        INTEGER not null,
  pseudo        VARCHAR(100),
  email         VARCHAR(100),
  password      TEXT,
  date_creation DATE,		
			
  PRIMARY KEY(userid)
);

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

DROP TABLE IF EXISTS Links;

CREATE TABLE Links
( linkid       INTEGER,
  link         VARCHAR(200),
  url          VARCHAR(200),
  itemid       INTEGER,
   
  PRIMARY KEY(linkid),
  FOREIGN KEY(itemid) REFERENCES Items
);
