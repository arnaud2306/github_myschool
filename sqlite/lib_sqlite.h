#ifndef SQLITE_MYSCHOOL_H
#define SQLITE_MYSCHOOL_H

#define TAILLE_USER 100
#define TAILLE_ITEM 100
#define TAILLE_LINK 200
#define TAILLE_URL 200

#define TAILLE_BUFFER 400

#define DATABASE "./MySchool"
#define FILENAME "./test.xml"

int SQLITE_MYSCHOOL_Init();
int SQLITE_MYSCHOOL_Stop();
int SQLITE_MYSCHOOL_Open();
int SQLITE_MYSCHOOL_Close();

int SQLITE_MYSCHOOL_IsUserInDatabase(char user_P[TAILLE_USER]);

int SQLITE_MYSCHOOL_AddItemInDatabase(int UserId_P,int ItemId_P,char Item_P[TAILLE_ITEM]);
int SQLITE_MYSCHOOL_AddLinkInDatabase(int ItemId_P,char Link_P[TAILLE_LINK],char Url_P[TAILLE_URL]);
int SQLITE_MYSCHOOL_InitXMLFile(char user_P[TAILLE_USER]);
int SQLITE_MYSCHOOL_CloseXMLFile();
int SQLITE_MYSCHOOL_ExtractAllItems(int userid_P);
int SQLITE_MYSCHOOL_ExtractItem(int itemid_P,char item_P[TAILLE_ITEM]);
int SQLITE_MYSCHOOL_ExtractLinks(int itemid_P);

#endif
