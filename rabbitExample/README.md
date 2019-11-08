# Ejemplo de envío y consumo de mensajes de una cola Rabbit MQ

# 1. Levantar el Rabbit MQ dockerizado de la carpeta docker

```shell
$ docker-compose up -d
```

# 2. Levantar el proceso que escucha de la cola

```shell
$ node receive.js
```

# 3. Enviar un mensaje a la cola

```shell
$ node send.js
```

Enviará un mensaje a la cola Rabbit MQ, que será inmediatamente consumido por el receiver
que hemos levantado con anterioridad.
