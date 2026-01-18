Ha valaki le akarja tesztelni a backendet:

terminálban:

composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh
php artisan serve