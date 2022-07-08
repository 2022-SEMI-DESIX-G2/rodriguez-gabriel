# Proyecto #2 - Pokemon API - Refactor del proyecto #1 usando mongo.

## **Objetivos**

- Integración con servicios de terceros.
- Implementación de base de datos.
- Implementar una solución con infraestructura de frontend y de backend, usando NodeJS, Express y Javascript vainilla y MongoDB.

## **I. Implementar wireframe (100pts)**

1. Refactorizar el código del proyecto #1, para cambiar la forma de almacenar los datos en lugar de en una variable, en una base de datos, en este caso, MongoDB.
    - La funcionalidad debe permanecer igual, solamente como recorderis:
        1. Almacenar cada petición que se realice al backend, con un timestamp.
        2. Verificar en cada petición, si la información del pokemon existe localmente y si existe, validar si aún está vigente.
            - Si está vigente, devolver la información del cache.
            - Si no, volver a buscar la información del 3ro y actualizar el cache para su reutilización en una próxima solicitud.
    - Estos cambios solamente deben afectar a el backend. Para la parte visual, no es necesario que hayan cambios con respecto al proyecto #1, pero el proyecto debe funcionar igual que antes el refactor.

2. Se evaluará la estructura del código de frontend, el backend no.
3. Se evaluará la creatividad para mostrar lo solicitado.
4. Puntuación de frontend: **70pts.**
5. Puntuación de backend: **30pts.**

### **Documentación necesaria:**

- [Explicación en video](https://drive.google.com/file/d/1WacIN6UYvvLCZifjGxVnwFSSyOmHx6vn/view?usp=sharing)
- Clases:
  - [G1](https://github.com/2022-SEMI-DESIX-G1/clases/tree/main/soluciones)
  - [G2](https://github.com/2022-SEMI-DESIX-G2/clases/tree/master/soluciones)
- [PokeAPI](https://pokeapi.co/)
- [Figma](https://www.figma.com/proto/0tgn9M2qZHkVKJj6Gpz04Z/2022-SEMI-DESIX-PROY1?node-id=3%3A2&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=3%3A2)
- [Documentación JS](https://github.com/peqadev/javascript-desde-cero)

### **Formato de entrega**

Enlace a la carpeta de github. Recordar que la carpeta de github debe llamarse: `primerapellido-primernombre`, por ejemplo: `agrazal-erick`.

### **Cantidad de estudiantes**: 1
