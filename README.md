# Ricksplorador

Ricksplorador es una aplicación web estática para explorar personajes, localizaciones y episodios de *Rick y Morty*. Es un proyecto de equipo desarrollado con HTML, CSS y JavaScript.

## Funcionalidades

- Consulta personajes, localizaciones y episodios de la serie.
- Busca personajes por nombre y estado (Vivos o muertos), y navega los resultados por páginas.
- Guarda personajes, localizaciones y episodios favoritos en el navegador.
- Consulta páginas con información detallada de personajes, localizaciones y episodios.

## Cómo ejecutarlo

No se necesita instalar dependencias ni compilar el proyecto. Para servir la aplicación se utiliza la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) de Visual Studio Code:

1. Abre la carpeta del proyecto en Visual Studio Code.
2. Abre `html/index.html` en el editor.
3. Pulsa **Go Live** en la barra de estado de Visual Studio Code. Live Server abrirá la aplicación en el navegador.

Los listados obtienen sus datos de la [Rick and Morty API](https://rickandmortyapi.com/), por lo que necesitan conexión a Internet. Los favoritos se guardan en el almacenamiento local del navegador.

## Guía rápida de uso de la aplicación.
  
La landing page dispone de botones de acceso a las siguientes páginas secundarias:

- Personajes.
- Localizaciones.
- Episodios.
- Favoritos.

En los dispositivos móviles los botones estarán ocultos y se accederán clicando el botón de la hamburguesa.
  
La página de personajes incluye un interfaz de búsqueda de personajes.

La de localizaciones está ordenada por temporada y episodio.

La de favoritos está ordenada por personajes, episodios, localizaciones.

Cada personaje, localización y episodio tendrá su enlace a su propia página individual. Cada personaje incluye una lista de los episodios en que sale y cada episodio su lista de personajes que aparecen.

## Estructura

```text
clases/             Modelos de personajes, localizaciones y episodios
css/                Hojas de estilo
data.json           Datos JSON de personajes
dataEpisodes.json   Datos JSON de episodios
fuentes/            Recursos tipográficos
html/               Páginas de la aplicación
img/                Imágenes e iconos
js/                 Módulos de interacción, API y tarjetas
```

La página de inicio está en `html/index.html`. Desde el menú se accede a personajes, localizaciones, episodios y favoritos.

## Equipo

Eder, Eneko, Guillermo, Markel y Ruth.
