
## Horse Transport Tracker (Expo + TypeScript)

Koden i `mobile/` er skrevet i TypeScript i stedet for ren JavaScript.

Hvorfor TypeScript?
- Typer hjælper mig med at fange fejl tidligt (fx forkerte feltnavne eller null/undefined).
- Bedre editor-hints og autocompletion gør det hurtigere at arbejde i komponenterne.
- Nem refaktorering: ændrer jeg en type, kan jeg se alle steder der skal opdateres.

### Kør appen

Forudsætning: Node.js (LTS) installeret.

1. Åbn terminal i projektet
2. Kør nedenstående to trin:

```sh
cd mobile
npm install
npx expo start
```


Bemærk:
- Appen er in-memory (ingen persistent storage endnu).
- Skærme: Home (oversigt), New (formular), History (liste).
  
