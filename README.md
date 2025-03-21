# Proyecto Final: Gestor de Tareas

¡Bienvenido al repositorio del **Gestor de Tareas**! Este proyecto es una aplicación web diseñada para ayudarte a organizar y gestionar tus tareas de manera eficiente. Utiliza el patrón de diseño **Facade** y sigue la arquitectura **MVC** para garantizar un código limpio, modular y fácil de mantener.

---

## Características Principales

- **Agregar tareas**: Crea nuevas tareas con un título y una descripción.
- **Clasificar tareas**: Marca las tareas como **pendientes**, **en progreso** o **hechas**.
- **Eliminar tareas**: Elimina tareas que ya no necesites.
- **Interfaz intuitiva**: Diseño moderno y fácil de usar.

---

## Patrones de Diseño y Arquitectura

### 1. **Patrón de Diseño: Facade**
El patrón **Facade** se utiliza para simplificar la interacción con los servicios de la aplicación. En este proyecto, la clase `TaskService` actúa como una fachada que oculta la complejidad de las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) detrás de una interfaz sencilla.

- **Ventajas**:
  - Simplifica el uso de los servicios.
  - Reduce el acoplamiento entre los componentes.
  - Facilita el mantenimiento y la escalabilidad.

### 2. **Arquitectura: MVC (Modelo-Vista-Controlador)**
El proyecto sigue la arquitectura **MVC** para separar las responsabilidades y organizar el código de manera eficiente.

- **Modelo**: Representa los datos y la lógica de negocio (por ejemplo, la clase `Task`).
- **Vista**: Se encarga de la interfaz de usuario (por ejemplo, los componentes de React como `TaskForm` y `TaskList`).
- **Controlador**: Gestiona la interacción entre el modelo y la vista (por ejemplo, la lógica en los componentes de React que manejan eventos y actualizan el estado).

---

## Tecnologías Utilizadas

- **Frontend**:
  - React.js
  - CSS para estilos
- **Backend**:
  - Node.js (opcional, si se implementa un backend)
  - Express.js (opcional, si se implementa un backend)
- **Base de Datos**:
  - JSON o una base de datos como MongoDB (opcional, si se implementa un backend).

---

## Instalación y Configuración

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### Requisitos Previos

- Node.js instalado (v16 o superior).
- NPM o Yarn instalado.

### Pasos para Configurar el Proyecto

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/ProyectoFinalPDD.git
   cd ProyectoFinalPDD
Instala las dependencias:

bash
Copy
npm install
Ejecuta la aplicación:

bash
Copy
npm start
Abre la aplicación:

Abre tu navegador y visita http://localhost:3000.

Estructura del Proyecto
Copy
ProyectoFinalPDD/
├── public/                  # Archivos estáticos (HTML, imágenes)
├── src/                     # Código fuente de la aplicación
│   ├── components/          # Componentes de React
│   │   ├── TaskForm.jsx     # Formulario para agregar tareas
│   │   └── TaskList.jsx     # Lista de tareas
│   ├── servicesFacade/      # Servicios (Patrón Facade)
│   │   └── TaskService.js   # Servicio para gestionar tareas
│   ├── App.js               # Componente principal
│   └── index.js             # Punto de entrada de la aplicación
├── package.json             # Dependencias y scripts
└── README.md                # Este archivo
