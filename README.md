# WEB103 Project 3 - UnityGrid Plaza

Submitted by: **Yugant Nagralawala**

About this web app: **UnityGrid Plaza is a virtual community space for finding live events around Dallas. Users click a venue on an interactive skyline map to see every event there, or browse all events on one page and filter them by location. Each event shows a live countdown, and events that have already happened are styled differently.**

Time spent: **X** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->

- [x] **The web app uses React to display data from the API**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured Events table**
  - [ ]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [ ]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **The web app displays a title.**
- [x] **Website includes a visual interface that allows users to select a location they would like to view.**
  - [x] *Note: A non-visual list of links to different locations is insufficient.* 
- [x] **Each location has a detail page with its own unique URL.**
- [x] **Clicking on a location navigates to its corresponding detail page and displays list of all events from the `events` table associated with that location.**

The following **optional** features are implemented:

- [x] An additional page shows all possible events
  - [x] Users can sort *or* filter events by location.
- [x] Events display a countdown showing the time remaining before that event
  - [x] Events appear with different formatting when the event has passed (ex. negative time, indication the event has passed, crossed out, etc.).

The following **additional** features are implemented:

- [x] Interactive SVG map: the background image and the clickable venue regions share one coordinate system (`preserveAspectRatio="slice"`), so regions stay on their buildings at any window size, with hover highlight and a venue label
- [x] Live countdown that ticks every second (`setInterval` with cleanup in `useEffect`)
- [x] Responsive layout for phones and tablets, with a venue button list on narrow screens where the map can't show every venue
- [x] `npm run reset` script that drops, recreates and seeds the `locations` and `events` tables (12 sample events across 4 venues)
- [x] REST API with parameterized SQL queries: `GET /api/locations`, `/api/locations/:id`, `/api/locations/:id/events`, `/api/events`, `/api/events/:id`

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  GIF tool here
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Running locally

```bash
npm install
# add your Render Postgres values to server/.env (PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE)
npm run reset   # creates and seeds the tables
npm run dev     # client on :5173, API on :3000
```

## Notes

- The starter's invisible venue buttons (`opacity: 0`, `z-index: 10`) sat on top of the map and swallowed the mouse, so hovering and clicking a venue did nothing. I tracked it down by checking which element was under the pointer, then replaced the overlays with labels drawn inside the SVG.
- `import` statements are hoisted, so the database pool was created before `dotenv.config()` ran and every `PG*` variable was `undefined`. Importing `dotenv/config` at the top of `database.js` fixed it.
- Event times are stored as a single `TIMESTAMPTZ` column, so the displayed date, time and countdown all come from one value and are correct in any timezone.
- Placeholder photos come from picsum.photos and are random, so they don't match the venues.

## License

Copyright 2026 Yugant Nagralawala

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
