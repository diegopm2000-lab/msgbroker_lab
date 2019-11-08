# POC NodeJS-STOMP y ActiveMQ Artemis

La prueba de concepto consiste en usando NodeJS, envío y recepción de mensajes STOMP contra el broker de mensajería ActiveMQ Artemis.

### Un poco de protocolos de mensajería:

#### AMQP

- AMQP (Advanced Message Queuing Protocol) fue diseñado como una alternativa abierta para middleware de mensajería propietarios:

- AMQP es un protocolo binario que destaca por su interoperabilidad y fiabilidad

- Ofrece un amplio conjunto de funcionalidades como colas fiables basadas en mensajería P/S, enrutamiento flexible, seguridad, además de permitir un control en profundidad de colas, cabeceras,…

- Hay brokers comerciales y open source y clientes interoperables para prácticamente todos los lenguajes

- AMQP se usa en empresas como JP Morgan para procesar 1 billón de mensajes al día, la NASA lo utiliza para Nebula Cloud Computing, Google lo utiliza para el procesamiento de eventos complejos entre otros ejemplos


#### MQTT

- MQTT (Message Queue Telemetry Transport) fue desarrollo inicialmente por IBM:

- En los dos últimos años se ha movido a la comunidad opensource, creciendo en popularidad en aplicaciones móviles.

- Se diseñó como protocolo simple diseñado para dispositivos con pocos recursos (como un Arduino), bajo ancho de banda y redes de alta latencia.

- Es un protocol binario que usa mensajería Publish-Suscribe

- Como ventajas sobre mensajerías empresariales es bajo footprint lo que lo hace ideal para aplicaciones estilo IoT

- Los brokers MQTT soportan varios miles de conexiones concurrentes de dispositivos

- Ofrece 3 calidades de servicio: 1) fire-and-forget (no confinable) ,2) “at least once” que asegura que mensaje se envoi al menos 1 vez y 3) “exactly once”.

#### STOMP

- STOMP (Simple/Streaming Text Oriented Messaging Protocol):

- Es un protocol textual, análogo a HTTP.

- Provee cabeceras y body en el mensaje

- Se diseñó para ser un protocolo simple y ligero, además ofrece bindings para un amplio rango de lenguajes

#### JMS

- La API Java Message Service (en español servicio de mensajes Java), también conocida por sus siglas JMS, es la solución creada por Sun Microsystems para el uso de colas de mensajes.

- Este es un estándar de mensajería que permite a los componentes de aplicaciones basados en la plataforma Java2 crear, enviar, recibir y leer mensajes. También hace posible la comunicación confiable de manera asíncrona.

- El servicio de mensajería instantánea también es conocido como Middleware Orientado a Mensajes (MOM por sus siglas en inglés) y es una herramienta universalmente reconocida para la construcción de aplicaciones empresariales.

- Dicha API es parte integral de la versión 2 de Java.

- Existen dos modelos de la API JMS, los cuales son:

- Modelo Punto a Punto (point to point): Este modelo cuenta con solo dos clientes, uno que envía el mensaje y otro que lo recibe. Este modelo asegura la llegada del mensaje ya que si el receptor no está disponible para aceptar el mensaje o atenderlo, de cualquier forma se le envía el mensaje y este se agrega en una cola del tipo FIFO para luego ser recibido según haya entrado

- Modelo Publicador/Suscriptor (Publish/subscribe): Este modelo cuenta con varios clientes, unos que publican temas o eventos, y los que ven estos temas, a diferencia del modelo punto a punto este modelo tiende a tener más de un consumidor.

- Ambos modelos pueden ser síncronos mediante el método receive y asíncronos por medio de un MessageListener.


### Estructura de la PoC

- nodeJS: Contiene el código en javascript para el entorno de ejecución de NodeJS 6.
- armenis_mq: Contiene todo lo necesario para levantar un contenedor docker con el producto ActiveMQ Artemis que incluye consola web para administración (hawtio) y permite también la posibilidad de atacarlo a través de jmx usando jconsole.

### Conectividad

- La consola de administración hawtio de ActiveMQ Artemis escucha por el puerto 8161
- ActiveMQ Artemis usa para el protocolo STOMP el puerto 61613

### Ejecución

1. Arrancar el contendor docker del ActiveMQ Artemis

Nos vamos al directorio artemis_mq y ejecutamos:

```shell
$ compose up -d
```

2. Visualización de la consola de administración

Una vez levantado el contenedor, ponemos en el navegador la siguiente url:

http://localhost:8161

- usuario: artemis
- password: password

2. Probar el envío y recepción de los mensajes en NodeJS

Nos vamos al directorio __nodeJS__

Y ejecutamos:

```
$ node index.js
connected to Stomp
sending a message
mensaje enviado!
received message Hello, node.js with Stomp <--> ActiveMQ Artemis !
```

Si nos fijamos en la consola de administración de hawtio, veremos que se crea la cola con nombre __jms.queue.myPOCQueue__

__Importante__: Se ha comentado en el index.js la línea que cierra la conexión, si la descomentamos y volvemos a ejecutar el programa, no veremos nada en la consola de administración, pese a que la prueba a funcionado con éxito. Esto se debe a que al desconectar del broker, la cola queda sin consumidores ni productores de mensajes conectados y desaparece.
