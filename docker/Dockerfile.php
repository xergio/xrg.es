FROM php:8.1-fpm-alpine

RUN apk add --no-cache curl git

# https://github.com/mlocati/docker-php-extension-installer
# https://github.com/mlocati/docker-php-extension-installer#special-requirements
RUN curl -sSLf -o /usr/local/bin/install-php-extensions \
        https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions && \
    chmod +x /usr/local/bin/install-php-extensions

RUN install-php-extensions apcu intl opcache redis timezonedb

RUN rm -rf /var/cache/apk/*

RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"
COPY docker/zz-custom-php.ini "$PHP_INI_DIR/conf.d/"
COPY docker/zz-custom-phpfpm.conf /usr/local/etc/php-fpm.d/zz-docker.conf

COPY backend /var/www/backend

RUN chown -R www-data:www-data /var/www
