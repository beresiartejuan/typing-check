# ⌨️ Typing-Check

Pon a prueba tu velocidad de escritura. Al abrir la app se muestra un fragmento aleatorio de literatura (Don Quijote, El Hobbit, Rayuela...) y tenés 60 segundos para tipearlo: el texto se colorea en verde o rojo a medida que escribís, y al terminar recibís tus estadísticas.

**[🎮 Jugar ahora](https://beresiartejuan.github.io/typing-check/)**

## Características

- Feedback en tiempo real: errores en rojo, aciertos en verde, con cursor sobre el texto.
- Cuenta regresiva de 60 segundos con indicador de color según el tiempo restante.
- Resultados finales: caracteres por minuto (cpm), aciertos, errores y caracteres faltantes.
- Fragmentos aleatorios de literatura tomados de [`public/phrases.txt`](public/phrases.txt).

## Stack

| Herramienta | Uso |
|---|---|
| [React 19](https://react.dev) | UI y hooks |
| [Vite 7](https://vite.dev) | Bundler y dev server |
| [Tailwind CSS 4](https://tailwindcss.com) | Estilos (config CSS-first) |
| [GitHub Actions](.github/workflows/deploy.yml) | Build y deploy a GitHub Pages |

## Uso

Requisito previo: **Node.js 20.19+** (se recomienda la versión LTS).

```bash
# instalar dependencias
npm install

# servidor de desarrollo con hot reload → http://localhost:5173
npm run dev

# build de producción en dist/
npm run build

# servir el build de producción localmente
npm run preview
```

## Deploy

El deploy es automático: cada push a `main` dispara [el workflow de GitHub Actions](.github/workflows/deploy.yml), que instala dependencias, buildea la app y publica `dist/` en GitHub Pages. También se puede re-desplegar manual desde la pestaña **Actions** del repositorio (botón *Run workflow*).

La URL base (`/typing-check/`) está configurada en [`vite.config.js`](vite.config.js).

## Cómo funciona

`useEngine` es el hook orquestador: maneja la máquina de estados de la partida y compone los hooks especializados.

```
              cualquier tecla
  ready ─────────────────────► running
                                  │
              tipeaste todo       │        se acabó el tiempo
           ┌──────────────────────┼──────────────────────┐
           ▼                      │                      ▼
       overclock                  │                  finished
           │                      │                      │
           └───────────┐          │          ┌───────────┘
                       ▼          ▼
                     Results (mismo flujo para ambos)
```

| Hook | Responsabilidad |
|---|---|
| [`useEngine`](src/useEngine.js) | Estado global de la partida, tecla de inicio, fin de partida |
| [`useText`](src/helpers/useText.js) | Fetch de `phrases.txt` y selección de un fragmento al azar |
| [`useTyping`](src/helpers/useTyping.js) | Captura de teclas (keydown), mantiene el texto tipeado y el cursor |
| [`useTimer`](src/helpers/useTimer.js) | Cuenta regresiva con `setInterval` |
| [`useChecker`](src/helpers/useChecker.js) | Compara el texto original con lo tipeado, carácter por carácter |
| [`useResults`](src/helpers/useResults.js) | Agrega estadísticas y calcula el cpm al terminar |

## Estructura

```
src/
├── main.jsx               # Entrada: crea el root de React y monta App
├── App.jsx                # Composición de la UI
├── useEngine.js           # Hook orquestador (máquina de estados)
├── index.css              # Tailwind 4 + estilos base
├── components/            # Componentes de UI
│   ├── GeneratedText.jsx  # Texto coloreado + cursor
│   ├── Timer.jsx          # Cuenta regresiva con color de urgencia
│   ├── Message.jsx        # "Presione cualquier tecla..."
│   ├── RestartButton.jsx  # Botón de reinicio
│   └── Results.jsx        # Estadísticas finales de la partida
└── helpers/               # Hooks especializados (ver tabla de arriba)
    ├── useText.js
    ├── useTimer.js
    ├── useTyping.js
    ├── useChecker.js
    └── useResults.js
```