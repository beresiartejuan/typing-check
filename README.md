# Typing-Check

Pon a prueba tu velocidad de escritura. Se muestra un fragmento aleatorio de literatura y tenés 60 segundos para tipearlo: el texto se colorea en verde (correcto) o rojo (incorrecto) a medida que escribís, y al terminar recibís tus resultados (caracteres por minuto, aciertos, errores y caracteres faltantes).

**Demo:** https://beresiartejuan.github.io/typing-check/

## Stack

- [React 19](https://react.dev)
- [Vite](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com)

Desplegado en GitHub Pages con [gh-pages](https://www.npmjs.com/package/gh-pages).

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run deploy` | Build + deploy a GitHub Pages |

## Estructura

```
src/
├── main.jsx              # Entrada de la app
├── App.jsx               # Composición de la UI
├── useEngine.js          # Hook orquestador (estado de la partida)
├── helpers/
│   ├── useText.js        # Fetch del fragmento aleatorio
│   ├── useTimer.js       # Cuenta regresiva
│   ├── useTyping.js      # Captura de teclas y cursor
│   ├── useChecker.js     # Compara texto original vs tipeado
│   └── useResults.js     # Cálculo de resultados (cpm, aciertos, errores)
└── components/           # Timer, GeneratedText, Results, Message, RestartButton
```

Los fragmentos de texto provienen de `public/phrases.txt`.