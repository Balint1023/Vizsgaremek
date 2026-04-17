***Fontos!:***

**A frontend (react) és a backend projektet ne egyben, hanem külön-külön nyissa meg.**

**Mindkét projektet külön Visual Studio Code ablakban indítsa el, és a parancsokat is külön terminálban futtassa.**





***Backend:***



Visual Studio Code-ban nyissa meg Backend mappát (laravel mappán belül).



A Laravel projekt elindításához hajtsa végre az alábbi lépéseket a terminálban:



1\. Telepítse a szükséges függőségeket:

&#x20;  composer install



2\. A .env.example fájl (Backend mappa) nevét módosítsa .env-re.



3\. Generálja le az alkalmazás kulcsát:

&#x20;  php artisan key:generate



4\. Importálja a backend.sql fájlt a localhost-on futó adatbázis-szerverbe.



5\. Indítsa el a fejlesztői szervert:

&#x20;  php artisan serve





***Frontend:***



Visual Studio Code-ban nyissa meg a react mappát (react mappán belül).



A React projekt elindításához hajtsa végre az alábbi lépéseket a terminálban:



1\. Telepítse a szükséges függőségeket:

&#x20;  npm install



2\. Indítsa el a fejlesztői szervert:

&#x20;  npm run dev

