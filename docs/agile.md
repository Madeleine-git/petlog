# Metodologías de Desarrollo de Software: Agile, Scrum y Kanban

## ¿Qué es Agile?
    Es un enfoque de mejora continua, una filosofía de trabajo para desarrollar software de forma flexible, colaborativa e iterativa en el que los participantes del proyecto planifican, ejecutan, revisan y ejecutan acciones de mejora en ciclos cortos. 
    Agile surgió en 2001 con la publicación del Manifiesto Ágil, firmado por un grupo de desarrolladores que buscaban una alternativa a los métodos tradicionales rígidos (como el modelo en cascada o Waterfall).
    La idea central es trabajar en ciclos cortos llamados iteraciones o sprints (normalmente de 1 a 4 semanas), donde en cada ciclo el equipo: 
        - Planifica un pequeño conjunto de funcionalidades
        - Desarrolla y prueba esas funcionalidades
        - Entrega algo funcional al cliente
        - Recibe feedback y ajusta el rumbo
    En lugar de entregar todo al final, se entregan pequeñas porciones de valor continuamente.

    Objetivo principal:
        El objetivo de Agile es entregar valor real al cliente lo antes posible, adaptándose a los cambios en lugar de resistirlos.
        En vez de planificar todo al principio y entregar al final, los equipos ágiles trabajan en ciclos cortos y entregan partes funcionales del producto con frecuencia, recogiendo retroalimentación real en cada paso.

## ¿Qué es Scrum?
    Scrum es un marco de trabajo (framework) que impleemneta los principios de la filosofía Agile en la práctica, atraves de una estructura de roles, eventos y artefactos para que un equipo pueda desarrollar software de forma organizada, en ciclos cortos (llamados springs), que al final de los cuales se entregan con u n incremento funcional del producto.

    * Los Roles:
        - Product Owner (Dueño del producto)
        - Scrum Master (Facilitador del equipo)
        - Development Team (Equipo de desarrollo)
    
        Los Sprints (Los ciclos de trabajo): Es un período de tiempo fijo (normalmente 1 a 4 semanas) durante el cual el equipo trabaja para entregar un incremento de producto funcional.

    * El Backlog (La lista de tareas): 
        - El Product Backlog: es una lista ordenada de todo lo que se quiere construir en el producto. La gestiona el Product Owner y evoluciona constantemente.
        - Sprint Backlog: Subconjunto del Product Backlog que el equipo selecciona para trabajar durante el Sprint en curso.

        Dentro de cada Sprint también existe un Sprint Backlog: el subconjunto de tareas del Product Backlog que el equipo se compromete a completar en ese ciclo concreto.

    * La Sprint Review (La demostración)
        La Sprint Review es la reunión al final del Sprint donde el equipo muestra al Product Owner y stakeholders (interesados) lo que se ha construido. No es una presentación formal, es una conversación: El equipo demuestra las funcionalidades completadas, el Product Owner valida si cumple lo esperado, Se recoge feedback para ajustar prioridades en el siguiente Sprint.

        Es el momento donde el cliente ve progreso real y puede redirigir el rumbo si algo ha cambiado.
        Eventos clave


## Kanban y su uso para organziar tareas
    
    Kanban es un método de gestión visual que nació en Japón dentro del sistema de producción de Toyota y que los equipos de software adoptaron por su sencillez y efectividad.
    
    Su herramienta principal es el tablero, dividido en columnas que representan las etapas del trabajo: "por hacer", "en progreso" y "terminado". Cada tarea se representa como una tarjeta que avanza de columna en columna, lo que permite que el equipo vea el estado del trabajo de un solo vistazo, sin necesidad de reuniones ni reportes constantes.

    Un principio clave es el límite de tareas en curso (WIP): cada etapa solo puede tener un número máximo de tareas activas a la vez, lo que evita la dispersión y ayuda a detectar cuellos de botella.
    
    A diferencia de Scrum, Kanban no trabaja con ciclos fijos, sino con un flujo continuo que se adapta según la capacidad del equipo. Esto lo hace ideal para contextos donde el trabajo es impredecible, como el soporte técnico o el mantenimiento de sistemas, Kanban convierte el trabajo en algo visible y manejable, mejora la colaboración dentro del equipo y fomenta una cultura de mejora constante del proceso.

## Diferencias entre Scrum y Kanban

    Aunque los dos son métodos ágiles, funcionan de forma bastante diferente. Scrum trabaja en ciclos fijos llamados sprints, tiene roles definidos y reuniones establecidas, lo que le da mucha estructura al equipo. Kanban, en cambio, es más flexible: no tiene ciclos ni roles obligatorios, y las tareas fluyen de forma continua según la capacidad del equipo.

    En pocas palabras, Scrum organiza el trabajo en bloques de tiempo, mientras que Kanban organiza el trabajo por capacidad y flujo.

## ¿Cuándo usar cada metodología?

    Scrum funciona bien cuando el proyecto tiene un objetivo claro y se puede planificar en etapas, como desarrollar una aplicación nueva o lanzar un producto. Es ideal para equipos que necesitan estructura y entregas organizadas.

    Ejemplo Típico: 
        - Un equipo desarrollando una app móvil desde cero, donde cada sprint entrega una nueva funcionalidad como el login, el perfil de usuario o el sistema de pagos.
        - Una empresa creando un sitio web para un cliente, organizando el trabajo en ciclos de dos semanas con entregas parciales.

    Kanban, en cambio, es más útil cuando el trabajo llega de forma continua e impredecible, como atender solicitudes de soporte técnico o hacer mantenimiento de un sistema. No necesitas planificar por ciclos, simplemente gestionas las tareas a medida que van llegando. La prioridad es reducir tiempos de entrega y eliminar cuellos de botella en el flujo.

    Ejemplo típico:
        - Un equipo de soporte técnico que atiende tickets de usuarios: cada solicitud es una tarjeta que avanza por el tablero hasta resolverse.
        - Un desarrollador que mantiene un sistema ya lanzado y va corrigiendo errores o haciendo mejoras pequeñas según van surgiendo.

### Conclusión

    Agile, Scrum y Kanban son herramientas que comparten el mismo objetivo: hacer el trabajo más eficiente, transparente y adaptable. Cada una aporta algo distinto; Agile da la filosofía, Scrum la estructura y Kanban la flexibilidad.
    No existe una metodología mejor que otra, sino la más adecuada según el contexto. Si el proyecto requiere planificación y entregas organizadas, Scrum es la opción natural. Si el trabajo es continuo e impredecible, Kanban se adapta mejor. Lo importante es entender los principios detrás de cada una y aplicarlos de forma consciente para que el equipo pueda trabajar mejor y entregar más valor al cliente. 
    Lo importante es entender los principios detrás de cada metodología y aplicarlos con sentido crítico, adaptándolos a la realidad del equipo en lugar de seguirlos de forma dogmática.