# Exógena Organizer App

## Descripción

La Exógena Organizer App es una herramienta diseñada para ayudar a los contadores en Colombia a manejar la información de la exógena generada por la DIAN. La aplicación permite subir archivos de tipo Excel, organizar todas las transacciones por diferentes categorías y, finalmente, generar un nuevo documento XLSX con la información ordenada y coloreada para facilitar su manejo.

## Características

- **Carga de archivos**: Permite a los usuarios subir archivos Excel generados por la DIAN.
- **Organización de datos**: Procesa y organiza la información en diferentes categorías.
- **Generación de archivos**: Crea un nuevo archivo XLSX con los datos organizados y coloreados según las categorías.

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/usuario/exogena-organizer-app.git
    cd exogena-organizer-app
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Inicia la aplicación:
    ```bash
    npm run dev
    ```

## Uso

1. Abre la aplicación en tu navegador en `http://localhost:3000`.
2. Sube el archivo Excel generado por la DIAN.
3. La aplicación procesará y organizará la información.
4. Descarga el nuevo archivo XLSX con los datos organizados y coloreados.

## Dependencias

- `react-dropzone`: Para la carga de archivos.
- `xlsx`: Para la manipulación de archivos Excel.
- `file-saver`: Para la descarga de archivos.

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para mejorar esta aplicación.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).

---

¡Gracias por usar Exógena Organizer App!