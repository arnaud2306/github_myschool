#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#include "lib_sqlite.h"

int main(int argc, char *argv[])
{
int retour_L;
int userid_L;

	if(argc != 2)
   {
      printf("usage : create_xml <user>\n");
      return(0);
   }

   // SQLITE_MYSCHOOL_Init
   retour_L = SQLITE_MYSCHOOL_Init();
   if(retour_L != 0)
   {
      return(-1);
   }

   // SQLITE_MYSCHOOL_Open
   retour_L = SQLITE_MYSCHOOL_Open();
   if(retour_L != 0)
   {
      return(-1);
   }

   // SQLITE_MYSCHOOL_IsUserInDatabase
   userid_L = SQLITE_MYSCHOOL_IsUserInDatabase(argv[1]);
   if(userid_L)
   {
      // SQLITE_MYSCHOOL_InitXMLFile
      SQLITE_MYSCHOOL_InitXMLFile(argv[1]);

      // SQLITE_MYSCHOOL_ExtractAllItems
      SQLITE_MYSCHOOL_ExtractAllItems(userid_L);

      // SQLITE_MYSCHOOL_CloseXMLFile
      SQLITE_MYSCHOOL_CloseXMLFile();
   }
 
   // SQLITE_MYSCHOOL_Close
   retour_L = SQLITE_MYSCHOOL_Close();

   // SQLITE_MYSCHOOL_Stop
   retour_L = SQLITE_MYSCHOOL_Stop();

   return(0);
}
