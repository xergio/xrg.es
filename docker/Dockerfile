# syntax=docker/dockerfile:1

FROM php:8.1-fpm-buster

RUN apt update && apt install -y git wget

# https://github.com/mlocati/docker-php-extension-installer
# https://github.com/mlocati/docker-php-extension-installer#special-requirements
RUN curl -sSLf -o /usr/local/bin/install-php-extensions \
        https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions && \
    chmod +x /usr/local/bin/install-php-extensions

RUN wget https://raw.githubusercontent.com/composer/getcomposer.org/main/web/installer -O - | php -- && \
    chmod +x composer.phar && \
    mv composer.phar /usr/local/bin/composer

RUN wget https://get.symfony.com/cli/installer -O - | bash && \
    mv /root/.symfony/bin/symfony /usr/local/bin/symfony

RUN install-php-extensions apcu intl opcache redis timezonedb

RUN apt clean autoclean && \
    apt autoremove -y && \
    rm -rf /var/lib/apt/lists/*

RUN usermod -u 1000 www-data && groupmod -g 1000 www-data
RUN chown -R www-data:www-data /var/www

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY zz-custom-php.ini "$PHP_INI_DIR/conf.d/"
COPY zz-custom-phpfpm.conf /usr/local/etc/php-fpm.d/zz-docker.conf