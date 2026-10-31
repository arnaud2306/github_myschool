project(create_database)

cmake_policy(SET CMP0003 NEW)
cmake_minimum_required(VERSION 2.8)
SET(CMAKE_C_FLAGS "-O0 -ggdb")

###########
# sources #
###########
SET(sources)
SET(sources lib_sqlite.c)

##############
# librairies #
##############
add_library(sqlite STATIC ${sources})

###############
# executables #
###############
#add_executable(create_database create_database.c)
add_executable(create_xml create_xml.c)

##########################
# repertoires inclusions #
##########################
include_directories(/usr/include/libxml2)

#########################
# inclusions librairies #
#########################
#target_link_libraries(create_database /home/g133036/Arnaud/PFE/git_myschool/sqlite/libsqlite.a)
#target_link_libraries(create_database sqlite3)
#target_link_libraries(create_database xml2)
#target_link_libraries(create_database pthread)
#target_link_libraries(create_database dl)
#target_link_libraries(create_database m)

target_link_libraries(create_xml /home/g133036/Arnaud/PFE/git_myschool/sqlite/libsqlite.a)
target_link_libraries(create_xml sqlite3)
