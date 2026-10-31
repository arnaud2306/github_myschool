# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

MySchool is a personal, multi-user bookmark manager: each user has a tree of folders ("Items") containing links ("Links"), stored in SQLite and shown in the browser as a collapsible tree, with a right-click menu for editing. The links open in an iframe. It runs on Apache + PHP with no framework, no package manager and no build step for the web part. Comments, identifiers and docs are mostly in French.

The repo also holds unrelated static pages served from the same DocumentRoot: `pba.html`, `html/`, `PBA/`, `img/` (basketball team match pages), `ecoles*.html`, `cours_terminale.html` (link lists), and `match.js` / `css/match*.css` (a video tree player that is still being built). These pages are hand-written HTML and share no code with MySchool.

## Running

- Apache vhost: `apache/myschool.conf`. The DocumentRoot must be the repo root, because paths such as `/myschool.js` and `/php/...` are absolute from the web root. The vhost paths still point at an old machine (`/home/g133036/...`), so change them to match this one.
- PHP needs the `sqlite3` extension, and `xsltproc` must be on the PATH (PHP calls it with `exec`).
- At runtime the PHP writes to `tmp/` and `debug/` at the repo root. Neither folder is in git: create them and make them writable by `www-data`. The SQLite file `sqlite/MySchool` and its directory must also be writable by `www-data`. Otherwise you get "attempt to write a readonly database" (see `readme.txt`).
- Inspect or change the DB: `cd sqlite && sqlite3 MySchool`. Recreate the schema with `.read create_tables.sql` (it DROPs the tables). `sqlite/readme.txt` has example queries.

## Request flow (web app)

1. `index.php` shows the login form → POST to `php/connexion.php`. That script looks up `Users`, stores `$_SESSION['user']` and `$_SESSION['userid']`, then redirects to `php/myschool.php`. Registration goes through `php/inscription.php` → `php/inscription_traitement.php`.
2. `php/myschool.php` queries the user's `Items`/`Links` recursively and writes `tmp/myschool.<user>.xml`. It then runs `xsltproc ../myschool.xsl` on that file to produce `tmp/myschool.<user>.html` and redirects to that file.
3. `myschool.xsl` builds the page. It pulls in `myschool.inc.html` (the context-menu and submenu markup) and `myschool.inc.js`. The latter loads `/myschool.js?v=<timestamp>` to get around the browser cache.
4. `myschool.js` handles the tree toggling and the context menus. Each edit is a JSON POST `{action, champ1, champ2, ...}` to `php/myschool_server.php` (`server_G`). There, a `switch` on `action` runs the SQL (`add_directory_root`, `add_directory`, `delete_directory`, `rename_directory`, `add_link_directory`, `add_link`, `delete_link`, `rename_link`), then redirects back to `myschool.php`, which regenerates the page.

To add an action, change three places: the menu markup in `myschool.inc.html`, a handler plus XHR in `myschool.js`, and a `case` in `myschool_server.php`.

Schema (`sqlite/create_tables.sql`): `Users(userid, pseudo, email, password, date_creation)`, `Items(itemid, parentid → Items ON DELETE CASCADE, item, userid)`, `Links(linkid, link, url, itemid)`. Folders form a tree through `parentid`; a NULL `parentid` marks a root folder.

Known issue: `myschool_server.php` builds its SQL by string interpolation, so quotes in folder or link names break the queries (examples in `readme.txt`). Use prepared statements when you touch it, as `connexion.php` already does.

## C tooling (`sqlite/`)

`lib_sqlite.c` / `lib_sqlite.h` contain a C version of the DB→XML export. `create_xml <user>` writes `./test.xml` from `./MySchool`. Build with CMake (VS Code points `cmake.sourceDirectory` at `sqlite/`):

```
cd sqlite && mkdir -p build && cd build && cmake .. && make
```

`CMakeLists.txt` links against `libsqlite.a` through a hard-coded absolute path from the old machine; change it before building. `create_database` is commented out. Needs `libsqlite3-dev`, plus `libxml2-dev` headers.

Render an XML file by hand: `xsltproc myschool.xsl ./sqlite/test.xml > test.html`.

## Documentation

`latex/myschool.tex` is the project report (architecture, DB, context menus, Apache), with screenshots in `latex/images/`. Build it with `cd latex && latex-mk --pdflatex myschool.tex` (or `pdflatex myschool.tex`).

## Other

- `readme.txt` holds the project's DONE / TODO / DEBUG lists. Check it for known bugs and planned features.
- `old/` and `php/old/` are earlier versions that are no longer used.
- There are no tests or linters. `readme.txt` mentions Criterion as the planned C test framework.
