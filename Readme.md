# Instalacion

La app está basada en Expo, por lo que requerirás instalarlo globalmente

Instale todas las dependencias
```sh
npm install
```
Si no te permite registrar las dependencias puedes probar con el siguiente comando
```sh
npm install --legacy-peer-deps
```

Una vez instaladas las dependencias podrás ejecutar la app con el siguiente comando
```sh
npx expo start
```
> Nota: Si tienes un error en consola con un mensaje parecido a `node: --openssl-legacy-provider is not allowed in NODE_OPTIONS`, se debe a una configuración de nodejs y las variables de entorno del SO, esto se puede solucionar fácilmente ejecutando el siguiente comando:
```sh
$env:NODE_OPTIONS = "--openssl-legacy-provider"
```
> Luego puedes volver a ejecutar npx expo start

Listo, ahora solo falta probarlo en un dispositivo movil o emulador.

#### Para uso en emuladores
Necesitas tener un emulador en listo con ADB y expo ejecutandose correctamente en consola, presiona la tecla "A".
Expo se encargará de abrir el simulador e instalar la app de ser necesario.
#### Para uso en smartphone
Necesitas tener un smartphone (Android o iphone) conectado a la misma red Wifi y expo ejecutandose correctamente en consola.
##### Para android:
Instale la app de Expo dede play store:
https://play.google.com/store/apps/details?id=host.exp.exponent&hl=es&gl=US
Abra la aplicación y escanee el codigo QR que aparece en consola de la pc.
##### Para iphone:
Abra la cámara y escanee el codigo QR que aparece en consola de la pc.

> Nota: Si en algún momento se pierde la conexión de expo, presione la tecla "R" en la consola de expo de la pc, esto obligará a la app a actualizarse

## _Es todo, espero que te guste la UI, está hecho con ❤️_

# Principales características

| Plugin | URL |
| ------ | ------ |
| Async storage | [plugins/dropbox/README.md][PlDb] |
| Redux toolkit | [plugins/github/README.md][PlGh] |
| Expo | [plugins/googledrive/README.md][PlGd] |
| Native base | [plugins/onedrive/README.md][PlOd] |
| React hook form | [plugins/medium/README.md][PlMe] |
| Redux persist | [plugins/googleanalytics/README.md][PlGa] |
