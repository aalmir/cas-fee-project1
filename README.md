# Blue Notes App

Projektarbeit im Rahmen des CAS FEE 2019 an der HSR. 

## Installation

```bash
npm install
```

## Launch

```bash
npm start
```
or
```bash
npm run dev
```
(using nodemon)

To run some tests:
```bash
npm test
```

## Funktionsumfang

Vorgabe der Schule:
- Anzeigen, editieren und erfassen von Notizen
- Sortieren von Notizen
- Filtern von „abgeschlossenen" Notizen
- Abspeichern der Daten auf dem Server
- Wechseln des Styles

## Spezielle Funktionen

- Anzeigezustand (Theme, Sortierung, Filter) wird in LocalStorage gehalten
- Konfigurierbare Storage für die Notizen-Daten (LocalStorage oder Remote)

## Plattform

- Node.js
- Express
- NeDB
- Handlebars.js
