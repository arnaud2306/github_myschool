#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <libxml/parser.h>
#include <libxml/tree.h>

#include "lib_sqlite.h"

int ParseUser(xmlNodePtr current_node_P,char user_P[TAILLE_USER]);
int ParseItem(xmlNodePtr current_node_P,int UserId_P,unsigned int *indice_item_ptr_P);

int main(void)
{
int retour_L;
xmlParserCtxtPtr context_L;
xmlDocPtr document_L;
xmlNodePtr node_L;
xmlNodePtr current_node_L;
xmlNodePtr element_node_L;
char user_L[TAILLE_USER];
unsigned int indice_item_L;

   /*
    * this initialize the library and check potential ABI mismatches
    * between the version it was compiled for and the actual shared
    * library used.
    */
   LIBXML_TEST_VERSION

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
   
   // xmlNewParserCtxt
   context_L = xmlNewParserCtxt();
   if(context_L == NULL)
   {
      printf("xmlNewParserCtxt KO\n");
      return(-1);
   }
   else
   {
      printf("xmlNewParserCtxt OK\n");
   }

   // xmlCtxtReadFile
   document_L = xmlCtxtReadFile(context_L, "myschool.xml", NULL, XML_PARSE_RECOVER);
   if(document_L == NULL)
   {
      printf("xmlCtxtReadFile KO\n");
   }
   else
   {
      printf("xmlCtxtReadFile OK\n");

      if (context_L->valid == 0)
      {
         printf("Failed to validate %s\n", "myschool.xml");
         xmlFreeDoc(document_L);
      }
      else
      {
         // xmlDocGetRootElement
         node_L = xmlDocGetRootElement(document_L);
         if (node_L == NULL)
         {
            printf("xmlDocGetRootElement KO\n");
            xmlFreeDoc(document_L);
	      }
	      else
         {
	         printf("xmlDocGetRootElement OK : %s\n",node_L->name);

            indice_item_L = 0;

            // ParseUser
            retour_L = ParseUser(node_L,user_L);
            if(!retour_L)
            {
               printf("User non trouvé\n");
            }
            else
            {
               printf("User trouvé : %s\n",user_L);

               // SQLITE_MYSCHOOL_IsUserInDatabase
               retour_L = SQLITE_MYSCHOOL_IsUserInDatabase(user_L);
               printf("SQLITE_MYSCHOOL_IsUserInDatabase : %d\n",retour_L);

               if(retour_L != 0)
               {
                  // ParseItem
                  ParseItem(node_L,retour_L,&indice_item_L);
               }
            }
            
            // xmlFreeDoc
            xmlFreeDoc(document_L);
         }
      }
   }

   // xmlFreeParserCtxt
   xmlFreeParserCtxt(context_L);

   // SQLITE_MYSCHOOL_Close
   retour_L = SQLITE_MYSCHOOL_Close();

   // SQLITE_MYSCHOOL_Stop
   retour_L = SQLITE_MYSCHOOL_Stop();

   return(0);
}

/**************************************/
/* ParseUser                          */
/**************************************/
int ParseUser(xmlNodePtr current_node_P,char user_P[TAILLE_USER])
{
xmlNodePtr node_L;
xmlChar *user_L;
int retour_L;

   retour_L = 0;

   for(node_L=current_node_P;node_L!=NULL;node_L=node_L->next)
   {
      // traitement noeud
      if(!xmlStrcmp(node_L->name,(const xmlChar *)"user"))
      {
         retour_L = 1;

         // xmlNodeGetContent
         user_L = xmlNodeGetContent(node_L->xmlChildrenNode);
         printf("[ParseUser] %s\t%s\n",node_L->name,user_L);

         strncpy(user_P,(char *)user_L,TAILLE_USER);

         return(retour_L);
      }

      if((node_L->type == XML_ELEMENT_NODE) && (node_L->children != NULL))
      {
         // ParseUser
         retour_L = ParseUser(node_L->children,user_P);
         if(retour_L)
         {
            return(retour_L);
         }
      }
   }

   return(retour_L);
}

/**************************************/
/* ParseItem                          */
/**************************************/
int ParseItem(xmlNodePtr current_node_P,int UserId_P,unsigned int *indice_item_ptr_P)
{
xmlNodePtr node_L;
xmlChar *item_L;
xmlChar *name_L;
xmlChar *url_L;

   for(node_L=current_node_P;node_L!=NULL;node_L=node_L->next)
   {
      // traitement noeud
      if(!xmlStrcmp(node_L->name,(const xmlChar *)"item"))
      {
   		*indice_item_ptr_P=(*indice_item_ptr_P)+1;

         // xmlNodeGetContent
         item_L = xmlNodeGetContent(node_L->xmlChildrenNode);
         printf("[ParseItem] %s\t%s\n",node_L->name,item_L);

         // SQLITE_MYSCHOOL_AddItemInDatabase
         SQLITE_MYSCHOOL_AddItemInDatabase(UserId_P,*indice_item_ptr_P,item_L);

         // xmlFree
         xmlFree(item_L);
      }
      else if(!xmlStrcmp(node_L->name,(const xmlChar *)"name"))
      {
         // xmlNodeGetContent
         name_L = xmlNodeGetContent(node_L->xmlChildrenNode);

         // extraction du champs "url"
         node_L=node_L->next;
         node_L=node_L->next;

         if(!xmlStrcmp(node_L->name,(const xmlChar *)"url"))
         {
            // xmlNodeGetContent
            url_L = xmlNodeGetContent(node_L->xmlChildrenNode);
         
            // SQLITE_MYSCHOOL_AddLinkInDatabase
            SQLITE_MYSCHOOL_AddLinkInDatabase(*indice_item_ptr_P,name_L,url_L);

            // xmlFree
            xmlFree(url_L);
         }
         else
         {
            printf("[ParseItem][WARNING] %s\n",node_L->name);
         }

         // xmlFree
         xmlFree(name_L);
      }

      if((node_L->type == XML_ELEMENT_NODE) && (node_L->children != NULL))
      {
         // ParseItem
         ParseItem(node_L->children,UserId_P,indice_item_ptr_P);
      }
   }
}
