# PT-FORM

Aplicación donde un cliente envia un formulario de una reserva y se muestra un resumen de los datos.

## 🚀 Instalación y ejecución

Ejecuta los siguientes comandos en el terminal:

```bash
npm install         # Instala las dependencias
npm run dev         # Ejecuta la aplicación en modo desarrollo
npm run test        # Ejecuta los tests unitarios
```


## 🛠️ Tecnologías utilizadas

- **Typescript**
- **React**
- **SCSS, TaTailwindCSS**
- **Vitest** (testing)
- **@testing-library/react** (testing)

## 📦 Estructura del proyecto

```
src/
  components/
  hooks/
  pages/
  style/
  ...
```

## 📝 Funcionalidades implementadas

- 📄 Se han creado tres páginas diferentes: una para añadir los datos del apartamento, otra para añadir los datos del propietario y por último una página como resumen del registro completo del alojamiento.

- ⚡ Se ha utilizado un efecto de transición para el cambio de pantallas.

- 🎨 Para el diseño de la aplicación se ha utilizado tailwind.

- ⌨️ Se han exportado los componente a custom-form-result.html para que el componente sea los más plug and play posible.

- 🧪 Se han realizado pruebas unitarias de un componente y de un custom hook de ejemplo.
