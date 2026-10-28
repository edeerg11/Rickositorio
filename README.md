# Ricksplorador

Ricksplorador es una aplicación web estática para explorar personajes, localizaciones y episodios de *Rick y Morty*. Es un proyecto de equipo desarrollado con HTML, CSS y JavaScript.

## Funcionalidades

- Consulta personajes, localizaciones y episodios de la serie.
- Busca personajes por nombre y estado (Vivos o muertos), y navega los resultados por páginas.
- Guarda personajes, localizaciones y episodios favoritos en el navegador.
- Consulta páginas con información detallada de personajes, localizaciones y episodios.

## Cómo ejecutarlo

No se necesita instalar dependencias ni compilar el proyecto. Como la aplicación utiliza módulos JavaScript, ejecútala desde un servidor HTTP local:

1. Abre una terminal en la carpeta raíz del proyecto.
2. Inicia un servidor estático con Python:

	```bash
	python3 -m http.server 8000
	```

3. Abre [http://localhost:8000/html/index.html](http://localhost:8000/html/index.html) en un navegador moderno.

Los listados obtienen sus datos de la [Rick and Morty API](https://rickandmortyapi.com/), por lo que necesitan conexión a Internet. Los favoritos se guardan en el almacenamiento local del navegador.

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
