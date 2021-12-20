# syntax=docker/dockerfile:1

FROM php:8.1-fpm

RUN apt update && apt install -y git wget

# https://github.com/mlocati/docker-php-extension-installer
RUN curl -sSLf -o /usr/local/bin/install-php-extensions \
        https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions && \
    chmod +x /usr/local/bin/install-php-extensions

RUN wget https://raw.githubusercontent.com/composer/getcomposer.org/main/web/installer -O - | php -- && \
    chmod +x composer.phar && \
    mv composer.phar /usr/local/bin/composer

RUN wget https://github.com/FriendsOfPHP/pickle/releases/latest/download/pickle.phar && \
    chmod +x pickle.phar && \
    mv pickle.phar /usr/local/bin/pickle

RUN wget https://get.symfony.com/cli/installer -O - | bash && \
    mv /root/.symfony/bin/symfony /usr/local/bin/symfony

RUN install-php-extensions apcu intl opcache redis timezonedb

#RUN apt-get update && apt-get install -y \
#        libfreetype6-dev \
#        libjpeg62-turbo-dev \
#        libpng-dev \
#    && docker-php-ext-configure gd --with-freetype --with-jpeg \
#    && docker-php-ext-install -j$(nproc) gd

RUN apt clean autoclean && \
    apt autoremove -y && \
    rm -rf /var/lib/apt/lists/*

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY zz-custom.ini "$PHP_INI_DIR/conf.d/"