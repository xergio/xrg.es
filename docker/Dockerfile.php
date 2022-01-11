FROM php:8.1-fpm-buster

RUN apt update && apt install -y curl git

# https://github.com/mlocati/docker-php-extension-installer
# https://github.com/mlocati/docker-php-extension-installer#special-requirements
RUN curl -sSLf -o /usr/local/bin/install-php-extensions \
        https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions && \
    chmod +x /usr/local/bin/install-php-extensions

RUN install-php-extensions opcache redis timezonedb

RUN apt clean autoclean && \
    apt autoremove -y && \
    rm -rf /var/lib/apt/lists/*

RUN usermod -u 1000 www-data && groupmod -g 1000 www-data
RUN chown -R www-data:www-data /var/www

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY docker/zz-custom-php.ini "$PHP_INI_DIR/conf.d/"
COPY docker/zz-custom-phpfpm.conf /usr/local/etc/php-fpm.d/zz-docker.conf

COPY backend /var/www/backend
