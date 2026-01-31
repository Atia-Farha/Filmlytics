# Filmlytics

A movie analytics and discovery platform providing rich movie data, trending tracking and real-time search powered by TMDB.

## Features

- **Effortless Movie Search**: Simply type in a movie title or keyword, and instantly get a curated list of matching films without any delays or hassle.
- **Movie Details and Ratings**: Explore movie details, cast, crew, genres, and ratings with a comprehensive overview, making it easy to find the perfect movie for your taste.
- **Trending Movies Spotlight**: See what's hot right now with a dedicated section showing the top-searched movies by other users, updated in real-time.
- **User-Friendly Interface**: A clean, modern design with a eye-catching UI that's easy to navigate and make browsing feel like flipping through a digital cinema catalog.
- **Fast and Reliable Loading**: Smooth performance with quick results and helpful loading indicators, so you never wait longer than necessary.

### Technologies and Tools Used

- React.js 19
- TailwindCSS 4
- React-use
- TMDB API
- Appwrite
- Vite
- ESLint
- Git
- GitHub
- Vercel

### Concepts and Skills Used

- **State Management and Reactivity**: Managed multiple states in a React app, synchronized them (e.g., debouncing search input to update movie lists) and trigger re-renders efficiently.
- **Debouncing Techniques**: Debounced user inputs to optimize performance, reduced API rate limiting risks and improved user experience in search-heavy applications.
- **Asynchronous Programming**: Used async/await for handling promises in API fetches, including try-catch blocks for error handling, setting loading states and displaying error messages.
- **Conditional Rendering**: Implemented JSX patterns for conditionally showing UI elements based on states (e.g., Spinner during loading, error messages, or movie lists when data is available).
- **API Endpoint Management**: Built dynamic API URLs (e.g., switching between search and discover endpoints), encoded query parameters and authenticated requests with bearer tokens.
- **Database CRUD Operations**: Used serverless database interactions with Appwrite, including querying for existing documents, updating counts, creating new entries with unique IDs and sorting results.
- **Metrics Tracking**: Implemented a system to track and update search counts associating them with movie data and fetching trending items based on aggregated data.
- **Error Handling and User Feedback**: Developed robust error handling (e.g., console logging, user-facing messages) and loading indicators to create a resilient and user-friendly app.
- **Performance Optimization**: Handled data fetching in effects to avoid unnecessary re-fetches, limited query results (e.g., top 5 trending), and used efficient mapping for rendering lists without performance bottlenecks.
- **Full-Stack Integration**: Connect React frontend with external API *(TMDB)* and backend service *(Appwrite)* managing data flow from user input to persistent storage and back to the UI.
- **Security Practices**: Used environment variables to avoid hardcoding sensitive keys and handled potential null/undefined values (e.g., poster_path checks) to prevent runtime errors.
- **UI/UX Best Practices**: Built an intuitive interface with a hero banner, search bar, trending section and movie grid, focusing on accessibility (e.g., alt texts for images) and visual appeal.