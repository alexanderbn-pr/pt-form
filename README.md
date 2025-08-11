# PT-FORM

Custom component donde un cliente envía un formulario de una reserva y se muestra un resumen de los datos.

## 🚀 Instalación y ejecución

Ejecuta los siguientes comandos en el terminal:

```bash
npm install         # Instala las dependencias
npm run dev         # Ejecuta la aplicación en modo desarrollo
npm run test        # Ejecuta los tests unitarios
```

- Abre `http://localhost:{puerto}/` para ver la app SPA.
- Abre `http://localhost:{puerto}/custom-form-result.html` para ver el custom element embebible.

## 🛠️ Tecnologías utilizadas

- **Typescript**
- **React**
- **TailwindCSS**
- **Vitest** (testing)
- **@testing-library/react** (testing)

## 📦 Estructura del proyecto

```
src/
  assets/
  components/
  hooks/
  styles/
  validation/
  wrapper/
  ...
```

## 📝 Funcionalidades implementadas

- 📄 Se han creado tres páginas diferentes: una para añadir los datos del apartamento, otra para añadir los datos del propietario y por último una página como resumen del registro completo del alojamiento.

- ⚡ Se ha utilizado un efecto de transición para el cambio de pantallas.

- 🎨 Para el diseño de la aplicación se ha utilizado tailwind. En el archivo global.css de la carpeta syles se han creado algunas clases para reutilizar los css

- Se ha implementado la funcionalidad correspondiente para la gestión de errores de todos los inputs y para que los datos necesarios y obligatorios sean añadidos.

- Se ha creado una carpeta para añadir los metodos que comprueban la validación de los diferentes formularios

- ⌨️ Se han exportado el componente principal a un custom-form-result.html para que el componente sea los más plug and play posible.

- 🧪 Se han realizado pruebas unitarias de un componente (accommodation.tsx) y de un custom hook de ejemplo (useOwner.ts).
