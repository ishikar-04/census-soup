# World Census Data Explorer

## Overview

This is an interactive web application for exploring global census data. Users can view an interactive world map, click on countries to see detailed census information including population statistics, survey questions, and data collection methodologies. The application displays census data for the world's most populous nations with a modern, visually appealing dark-themed UI.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state caching and synchronization
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library (New York style) with Radix UI primitives
- **Map Visualization**: react-simple-maps with d3-scale for color scaling
- **Animations**: Framer Motion for smooth transitions and dialog animations
- **Build Tool**: Vite with path aliases (@/ for client/src, @shared/ for shared)

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Pattern**: REST endpoints defined in shared/routes.ts with Zod schema validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: PostgreSQL (connection via DATABASE_URL environment variable)

### Project Structure
```
client/           # Frontend React application
  src/
    components/   # React components including UI primitives
    hooks/        # Custom React hooks (use-countries, use-toast, etc.)
    lib/          # Utility functions and query client
    pages/        # Page components (Home, not-found)
server/           # Backend Express application
  db.ts           # Database connection setup
  routes.ts       # API route definitions
  storage.ts      # Data access layer (DatabaseStorage class)
  static.ts       # Static file serving for production
  vite.ts         # Vite dev server integration
shared/           # Shared code between frontend and backend
  schema.ts       # Drizzle database schema definitions
  routes.ts       # API route contracts with Zod validation
```

### Data Model
The core entity is `countries` with fields:
- `id`: Primary key
- `name`: Country display name
- `code`: ISO 3166-1 alpha-3 code (for map matching)
- `population`: Formatted population string
- `censusFrequency`: How often census is conducted
- `surveyQuestions`: JSONB array of question/format pairs
- `description`: Brief overview of census practices
- `sourceUrl`: Reference URL for data source

### API Design
Routes are defined declaratively in `shared/routes.ts` with type-safe request/response schemas:
- `GET /api/countries` - List all countries with census data
- `GET /api/countries/:code` - Get single country by ISO code

### Development vs Production
- **Development**: Vite dev server with HMR, runs via `npm run dev`
- **Production**: Vite builds static assets to `dist/public`, esbuild bundles server to `dist/index.cjs`
- **Database migrations**: Use `npm run db:push` with Drizzle Kit

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connected via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries with automatic schema inference
- **connect-pg-simple**: PostgreSQL session store (available for future auth needs)

### External APIs/Services
- **World Atlas GeoJSON**: Map data loaded from `cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json`
- **Google Fonts**: Outfit (display) and Plus Jakarta Sans (body) fonts

### Key Frontend Libraries
- **react-simple-maps**: SVG map rendering with TopoJSON support
- **d3-scale**: Color scale utilities for map visualization
- **framer-motion**: Animation library for UI transitions
- **@tanstack/react-query**: Server state management and caching
- **Radix UI**: Accessible component primitives (dialog, tooltip, scroll-area, etc.)

### Build/Dev Tools
- **Vite**: Frontend bundler with React plugin
- **esbuild**: Server bundler for production builds
- **Drizzle Kit**: Database migration and schema push tool
- **TypeScript**: Static type checking across entire codebase