# Todo List

Jednoduchá webová aplikace na správu úkolů s architekturou **klient – server – databáze**.
Uživatel přidá úkol s prioritou a ten se uloží do databáze MongoDB. Seznam se aktualizuje bez znovunačtení stránky.

## Funkce

- přidání úkolu s prioritou (`low`, `medium`, `high`)
- výpis uložených úkolů, nejnovější nahoře
- validace vstupu na serveru (prázdný text nebo neplatná priorita vrací chybu 400)
- asynchronní komunikace přes `fetch` a `async/await` bez reloadu stránky
- indikátor „Načítám data…“ během načítání
- data se trvale ukládají do MongoDB a zůstanou i po restartu serveru

## Technologie

- **Backend:** Node.js, Express.js
- **Databáze:** MongoDB, Mongoose
- **Frontend:** HTML, JavaScript (bez frameworku)
- **Konfigurace:** dotenv

## Struktura projektu

```
todoList/
├── models/
│   └── Todo.js        # Mongoose schéma a model úkolu
├── public/
│   ├── index.html     # formulář a seznam úkolů
│   └── script.js      # komunikace s API (fetch)
├── server.js          # Express server a API endpointy
├── package.json
└── .env               # proměnné prostředí (není v repozitáři)
```

## Požadavky

- [Node.js](https://nodejs.org/) verze 18 nebo novější
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) spuštěný lokálně

## Instalace a spuštění

1. **Naklonujte repozitář**

   ```bash
   git clone https://github.com/MertakMA/ToDoList.git
   cd ToDoList
   ```

2. **Nainstalujte závislosti** (vytvoří složku `node_modules`)

   ```bash
   npm install
   ```

3. **Vytvořte soubor `.env`** v kořeni projektu s tímto obsahem:

   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/todolist
   PORT=3000
   ```

   | Proměnná | Povinná | Popis |
   |---|---|---|
   | `MONGODB_URI` | ano | adresa MongoDB databáze |
   | `PORT` | ne | port serveru, výchozí je `3000` |

   > Použijte `127.0.0.1` místo `localhost`. Novější verze Node.js překládají `localhost` na IPv6 adresu, na které MongoDB ve výchozím nastavení neposlouchá.

4. **Ujistěte se, že běží MongoDB.** Na Windows se při instalaci obvykle spustí jako služba `MongoDB`.

5. **Spusťte server**

   ```bash
   npm start
   ```

   Pro vývoj s automatickým restartem po změně souborů:

   ```bash
   npm run dev
   ```

6. Otevřete v prohlížeči **http://localhost:3000**.

## API

| Metoda | URL | Popis | Tělo požadavku |
|---|---|---|---|
| `GET` | `/api/todos` | vrátí všechny úkoly | – |
| `POST` | `/api/todos` | vytvoří nový úkol | `{ "text": "Koupit mléko", "priority": "high" }` |

Odpovědi serveru:

- `200`: úspěšné načtení úkolů
- `201`: úkol byl vytvořen, odpověď obsahuje uložený úkol včetně `_id`
- `400`: neplatný vstup (prázdný text nebo neplatná priorita)
- `500`: chyba serveru nebo databáze

Příklad uloženého úkolu:

```json
{
  "_id": "6729fa1c2b3e4d5f6a7b8c9d",
  "text": "Koupit mléko",
  "priority": "high",
  "done": false
}
```
