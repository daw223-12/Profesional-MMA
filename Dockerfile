FROM php:8.4-apache

RUN apt-get update \
    && apt-get install -y libzip-dev \
    && apt-get install -y zlib1g-dev \
    && apt-get install -y libpng-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install zip
    
# Nodejs y NPM
RUN curl -sL https://deb.nodesource.com/setup_24.x | bash -
RUN apt-get update
RUN apt-get install -y nodejs

# CONEXIÓN BBDD
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
RUN docker-php-ext-install pdo && docker-php-ext-enable pdo
RUN apt-get update \
    && apt-get install -y default-mysql-client libpq-dev \
    && docker-php-ext-install pdo_mysql

# Git clone
RUN apt-get install -y git
RUN git clone https://github.com/daw223-12/Profesional-MMA.git
RUN mv Profesional-MMA/* ./
RUN rm -fr Profesional-MMA

WORKDIR /var/www/html/Profesional-MMA_Frontend

# Build de la SPA
RUN npm install
RUN npm run build
RUN mkdir ../professionalmma-front

RUN mv ./dist/* ../professionalmma-front

# Elimina los archivos restantes
WORKDIR /var/www/html
RUN rm -fr docker-compose.yml && rm -fr DockerFile && rm -fr Profesional-MMA_Frontend && rm -fr README.md

WORKDIR /var/www/html/mma-api

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
    && php -r "copy('https://composer.github.io/installer.sig', 'composer.sig');" \
    && php -r "if (hash_file('sha384', 'composer-setup.php') === trim(file_get_contents('composer.sig'))) { echo 'Installer verified'.PHP_EOL; } else { echo 'Installer corrupt'.PHP_EOL; unlink('composer-setup.php'); exit(1); }" \
    && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
    && php -r "unlink('composer-setup.php'); unlink('composer.sig');"

RUN composer install

# RUN php artisan migrate
WORKDIR /var/www/html

# SITE CONF
RUN a2dissite 000-default.conf
RUN rm -r /etc/apache2/sites-available/000-default.conf
COPY sites-available/professionalmma.conf /etc/apache2/sites-available/
RUN a2ensite professionalmma.conf

# AÑADIMOS LOS CERTIFICADOS
RUN mkdir -p /etc/apache2/certs
COPY certs/*.pem /etc/apache2/certs

# AÑADIMOS LAS VARIABLES DE ENTORNO DE LA API
COPY lib/.env /var/www/html/mma-api

# AÑADIMOS EL HTACCESS PARA LA CONFIGURACIÓN DE LOS FICHEROS ESTÁTICOS DE REACT
COPY lib/.htaccess /var/www/html/professionalmma-front

USER root
RUN chown -R www-data:www-data /var/www/html
# IMPORTANTE
RUN a2enmod rewrite
RUN a2enmod ssl

EXPOSE 80 443
