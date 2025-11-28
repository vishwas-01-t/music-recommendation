# Music Recommendation UI (React + Vite + Tailwind)

Premium, dark-mode single-page interface for a Music Recommendation System. Enter a song name and fetch similar tracks from the backend endpoint `POST /recommend`.

## Features

- Modern dark gradient background & glassmorphism panels
- Responsive layout (mobile → desktop grid)
- Song input with loading state & spinner
- Error handling banner
- Animated recommendation cards with subtle hover & entrance transitions
- Accessible (labels, disabled states, focus rings)
- Tailwind CSS v4 utility-based styling

## Tech Stack

- React 19 + Hooks (functional components)
- Vite for fast dev/build
- Tailwind CSS (via `@tailwindcss/vite`)

## Project Structure

```
src/
	App.jsx                # Main UI / state orchestration
	index.css              # Tailwind import + custom utilities
	components/
		SongInput.jsx        # Controlled input + submit button
		RecommendationList.jsx # Grid wrapper for song results
		SongCard.jsx         # Individual song display card
```

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 (default Vite port). Ensure your backend exposes `POST /recommend` on the same origin or configure a proxy.

## Production Build

```bash
npm run build
npm run preview
```

## Backend Contract

Request:
```json
POST /recommend
{ "song": "Song Name" }
```

Response:
```json
{ "recommendations": ["Song A", "Song B", "Song C"] }
```

## Customization Tips

- Adjust gradient colors in `App.jsx` root container.
- Modify glass effect in `.glass` class within `index.css`.
- Extend animations by adding more `@keyframes` in `index.css`.

## License

Internal / proprietary (update as needed).
