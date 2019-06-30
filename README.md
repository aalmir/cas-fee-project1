# Blue Notes App

Projektarbeit im Rahmen des CAS FEE 2019 an der HSR. 

## Installieren

```bash
npm install
```

Auf Windows erscheint eine Warnung von fsevents zu einer optionalen Dependency. Diese kann ignoriert werden.

## Starten

```bash
npm start
```

Oder um mit nodemon zu starten:

```bash
npm run dev
```

Einige Tests ausführen:

```bash
npm test
```

## Kompatibilität UI

- Getestet auf Chrome und Safari
- Läuft nicht auf IE oder Edge

## Funktionsumfang

Vorgegebene Anforderungen:
- Anzeigen, editieren und erfassen von Notizen
- Sortieren von Notizen
- Filtern von „abgeschlossenen" Notizen
- Abspeichern der Daten auf dem Server
- Wechseln des Styles

## Weitere Features

- Responsive
- Anzeigezustand (Theme, Sortierung, Filter) wird in LocalStorage gehalten
- Konfigurierbare Storage für die Notizen-Daten (LocalStorage oder Remote)

## Technologieplattform

- Node.js
- Express
- NeDB
- Handlebars.js
