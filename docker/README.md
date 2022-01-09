```
docker build -t php_symfony --progress=plain .
docker run --rm --name phptest -v $(pwd):/var/www/html --user 1000:1000 php_symfony
docker exec -it phptest bash
```