docker build -t php_symfony --progress=plain .
docker run --rm --name phptest php_symfony
docker exec -it phptest bash