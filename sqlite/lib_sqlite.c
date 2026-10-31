#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "sqlite3.h"

#include "lib_sqlite.h"

#define DEBUG 1

static sqlite3 *db_G;

static int SQLITE_MYSCHOOL_callback(void *param, int argc, char **argv, char **azColName);

/*******************************/
/* SQLITE_MYSCHOOL_Init        */
/*******************************/
int SQLITE_MYSCHOOL_Init()
{
int retour_L;

   // sqlite3_initialize
   retour_L = sqlite3_initialize();
   if(retour_L != SQLITE_OK)
   {
      printf("sqlite3_initialize KO\n");
      return(-1);
   }

   return(0);
}

/*******************************/
/* SQLITE_MYSCHOOL_Stop        */
/*******************************/
int SQLITE_MYSCHOOL_Stop()
{
int retour_L;

   // sqlite3_shutdown
   retour_L = sqlite3_shutdown();
   if(retour_L != SQLITE_OK)
   {
      printf("sqlite3_shutdown KO\n");
      return(-1);
   }

   return(0);
}

/*******************************/
/* SQLITE_MYSCHOOL_Open        */
/*******************************/
int SQLITE_MYSCHOOL_Open()
{
int retour_L;

   // sqlite3_open
   retour_L = sqlite3_open(DATABASE, &db_G);
   if(retour_L != SQLITE_OK)
   {
      printf("sqlite3_open KO\n");
      return(-1);
   }

   return(0);
}

/*******************************/
/* SQLITE_MYSCHOOL_Close       */
/*******************************/
int SQLITE_MYSCHOOL_Close()
{
int retour_L;

   // sqlite3_close
   retour_L = sqlite3_close(db_G);
   if(retour_L != SQLITE_OK)
   {
      printf("sqlite3_close KO\n");
      return(-1);
   }

   return(0);
}

/*******************************/
/* SQLITE_MYSCHOOL_callback    */
/*******************************/
static int SQLITE_MYSCHOOL_callback(void *param, int argc, char **argv, char **azColName)
{
int *p_valeur_L;

   p_valeur_L = (int *)param;

   if(argv[0] == NULL)
   {
      *p_valeur_L = 0;
   }
   else
   {
      *p_valeur_L = atoi(argv[0]);
   }

   return 0;
}

/*****************************************/
/* SQLITE_MYSCHOOL_IsUserInDatabase      */
/*****************************************/
int SQLITE_MYSCHOOL_IsUserInDatabase(char user_P[TAILLE_USER])
{
int retour_L;
char sql_L[TAILLE_BUFFER];
char *ErrMsg_L = 0;
int numero_L = 0;

   snprintf(sql_L,TAILLE_BUFFER, "select userid from Users where pseudo='%s'",user_P);

#if 0
   printf("Requete : %s\n",sql_L);
#endif

   // sqlite3_exec
   retour_L = sqlite3_exec(db_G, sql_L, SQLITE_MYSCHOOL_callback, (void *)&numero_L, &ErrMsg_L);
   if(retour_L != SQLITE_OK)
   {
      printf("sqlite3_exec KO %s\n",ErrMsg_L);
      sqlite3_free(ErrMsg_L);
      return(0);
   }

   return(numero_L);
}

/*************************************/
/* SQLITE_MYSCHOOL_AddItemInDatabase */
/*************************************/
int SQLITE_MYSCHOOL_AddItemInDatabase(int UserId_P,int ItemId_P,char Item_P[TAILLE_ITEM])
{
int retour_L;
char sql_L[TAILLE_BUFFER];
char *ErrMsg_L = 0;

   snprintf(sql_L,TAILLE_BUFFER, "insert into Items (userid,itemid,item) values ('%d','%d','%s');",UserId_P,ItemId_P,Item_P);

#if 0
   printf("Requete : %s\n",sql_L);
#endif

   // sqlite3_exec
   retour_L = sqlite3_exec(db_G, sql_L, SQLITE_MYSCHOOL_callback, 0, &ErrMsg_L);
   if(retour_L != SQLITE_OK)
   {
      printf("sqlite3_exec KO %s\n",ErrMsg_L);
      sqlite3_free(ErrMsg_L);
      return(-1);
   }

   return(0);
}

/*************************************/
/* SQLITE_MYSCHOOL_AddLinkInDatabase */
/*************************************/
int SQLITE_MYSCHOOL_AddLinkInDatabase(int ItemId_P,char Link_P[TAILLE_LINK],char Url_P[TAILLE_URL])
{
int retour_L;
char sql_L[TAILLE_BUFFER];
char *ErrMsg_L = 0;

   snprintf(sql_L,TAILLE_BUFFER, "insert into Links (itemid,link,url) values ('%d','%s','%s');",ItemId_P,Link_P,Url_P);

#if 0
   printf("Requete : %s\n",sql_L);
#endif

   // sqlite3_exec
   retour_L = sqlite3_exec(db_G, sql_L, SQLITE_MYSCHOOL_callback, 0, &ErrMsg_L);
   if(retour_L != SQLITE_OK)
   {
      printf("sqlite3_exec KO %s\n",ErrMsg_L);
      sqlite3_free(ErrMsg_L);
      return(-1);
   }

   return(0);
}

/*******************************/
/* SQLITE_MYSCHOOL_InitXMLFile */
/*******************************/
int SQLITE_MYSCHOOL_InitXMLFile(char user_P[TAILLE_USER])
{
FILE *fp_L;

   // fopen
   fp_L = fopen(FILENAME,"w");

   // fprintf
   fprintf(fp_L,"<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n");
   fprintf(fp_L,"<?xml-stylesheet type=\"text/css\" href=\"css/myschool_tree.css\"?>\n");
   fprintf(fp_L,"<?xml-stylesheet type=\"text/css\" href=\"css/myschool.css\"?>\n");
   fprintf(fp_L,"<?xml-stylesheet type=\"text/xsl\" href=\"myschool.xsl\"?>\n");
   fprintf(fp_L,"\n");
   fprintf(fp_L,"<document>\n");
   fprintf(fp_L,"\t<user>");
   fprintf(fp_L,"%s",user_P);
   fprintf(fp_L,"</user>\n");

   // fclose
   fclose(fp_L);

   return(0);
}

/********************************/
/* SQLITE_MYSCHOOL_CloseXMLFile */
/********************************/
int SQLITE_MYSCHOOL_CloseXMLFile()
{
FILE *fp_L;

   // fopen
   fp_L = fopen(FILENAME,"a");

   fprintf(fp_L,"</document>\n");

   // fclose
   fclose(fp_L);

   return(0);
}

/***********************************/
/* SQLITE_MYSCHOOL_ExtractAllItems */
/***********************************/
int SQLITE_MYSCHOOL_ExtractAllItems(int userid_P)
{
int retour_L;
char sql_L[TAILLE_BUFFER];
sqlite3_stmt *stmt_L;
FILE *fp_L;
int itemid_L;
char item_L[TAILLE_ITEM];

   snprintf(sql_L,TAILLE_BUFFER, "select distinct itemid,item from Items where parentid is null and userid = %d order by item;",userid_P);

#if DEBUG
   printf("[SQLITE_MYSCHOOL_ExtractAllItems] Requete : %s\n",sql_L);
#endif

   // sqlite3_prepare_v2
   retour_L = sqlite3_prepare_v2(db_G, sql_L, -1, &stmt_L, NULL);
   if(retour_L != SQLITE_OK)
   {
      printf("sqlite3_prepare_v2 KO\n");
      return(0);
   }
   else
   {
      // sqlite3_step
      while(sqlite3_step(stmt_L) != SQLITE_DONE)
      {
         // sqlite3_column_count
         int num_cols_L = sqlite3_column_count(stmt_L);

         // itemid
         // sqlite3_column_int
         itemid_L = sqlite3_column_int(stmt_L, 0);

         // item
         // sqlite3_column_text
         snprintf(item_L,TAILLE_ITEM,"%s",sqlite3_column_text(stmt_L, 1));

         // SQLITE_MYSCHOOL_ExtractItem
         SQLITE_MYSCHOOL_ExtractItem(itemid_L,item_L);
      }

      // sqlite3_finalize
      sqlite3_finalize(stmt_L);
   }

   return(0);
}

/*******************************/
/* SQLITE_MYSCHOOL_ExtractItem */
/*******************************/
int SQLITE_MYSCHOOL_ExtractItem(int itemid_P,char item_P[TAILLE_ITEM])
{
int retour_L;
char sql_L[TAILLE_BUFFER];
sqlite3_stmt *stmt_L;
FILE *fp_L;
int itemid_L;
char item_L[TAILLE_ITEM];

   // fopen
   fp_L = fopen(FILENAME,"a");

   fprintf(fp_L,"\t<item itemid=\"%d\">%s\n",itemid_P,item_P);

   // fclose
   fclose(fp_L);

   // SQLITE_MYSCHOOL_ExtractLinks
   SQLITE_MYSCHOOL_ExtractLinks(itemid_P);

   snprintf(sql_L,TAILLE_BUFFER, "select itemid,item from Items where parentid = %d;",itemid_P);

#if DEBUG
   printf("[SQLITE_MYSCHOOL_ExtractItem] Requete : %s\n",sql_L);
#endif

   // sqlite3_prepare_v2
   retour_L = sqlite3_prepare_v2(db_G, sql_L, -1, &stmt_L, NULL);
   if(retour_L != SQLITE_OK)
   {
      printf("sqlite3_prepare_v2 KO\n");
      return(0);
   }
   else
   {
      // sqlite3_step
      while(sqlite3_step(stmt_L) != SQLITE_DONE)
      {
         // sqlite3_column_count
         int num_cols_L = sqlite3_column_count(stmt_L);

         // itemid
         // sqlite3_column_int
         itemid_L = sqlite3_column_int(stmt_L, 0);

         // item
         // sqlite3_column_text
         snprintf(item_L,TAILLE_ITEM,"%s",sqlite3_column_text(stmt_L, 1));

         // SQLITE_MYSCHOOL_ExtractItem
         SQLITE_MYSCHOOL_ExtractItem(itemid_L,item_L);
      }

      // fopen
      fp_L = fopen(FILENAME,"a");

      fprintf(fp_L,"\t</item>\n");

      // fclose
      fclose(fp_L);

      // sqlite3_finalize
      sqlite3_finalize(stmt_L);
   }

   return(0);
}

/********************************/
/* SQLITE_MYSCHOOL_ExtractLinks */
/********************************/
int SQLITE_MYSCHOOL_ExtractLinks(int itemid_P)
{
int retour_L;
char sql_L[TAILLE_BUFFER];
sqlite3_stmt *stmt_L;
FILE *fp_L;
int linkid_L;
char link_L[TAILLE_LINK];
char url_L[TAILLE_URL];
int itemid_L;

   snprintf(sql_L,TAILLE_BUFFER, "select * from Links where itemid = %d;",itemid_P);

#if DEBUG
   printf("[SQLITE_MYSCHOOL_ExtractLinks] Requete : %s\n",sql_L);
#endif

   // sqlite3_prepare_v2
   retour_L = sqlite3_prepare_v2(db_G, sql_L, -1, &stmt_L, NULL);
   if(retour_L != SQLITE_OK)
   {
      printf("sqlite3_prepare_v2 KO\n");
      return(0);
   }
   else
   {
      // sqlite3_step
      while(sqlite3_step(stmt_L) != SQLITE_DONE)
      {
         // sqlite3_column_count
         int num_cols_L = sqlite3_column_count(stmt_L);

         // linkid
         // sqlite3_column_int
         linkid_L = sqlite3_column_int(stmt_L, 0);

         // link
         // sqlite3_column_text
         snprintf(link_L,TAILLE_LINK,"%s",sqlite3_column_text(stmt_L, 1));

         // url
         // sqlite3_column_text
         snprintf(url_L,TAILLE_URL,"%s",sqlite3_column_text(stmt_L, 2));

         // itemid
         // sqlite3_column_int
         itemid_L = sqlite3_column_int(stmt_L, 3);

         // fopen
         fp_L = fopen(FILENAME,"a");

         fprintf(fp_L,"\t<name linkid=\"%d\" itemid=\"%d\">%s</name>\n",linkid_L,itemid_P,link_L);
         fprintf(fp_L,"\t<url>%s</url>\n",url_L);
   
         // fclose
         fclose(fp_L);
      }

      // sqlite3_finalize
      sqlite3_finalize(stmt_L);
   }

   return(0);
}
