# MBTI Personality Test Application

## Overview

This is a full-stack web application for conducting MBTI (Myers-Briggs Type Indicator) personality tests. The application provides a comprehensive personality assessment tool that allows users to take a structured test and receive detailed results about their personality type. Built with React and Express, it features a modern UI with shadcn/ui components and uses Drizzle ORM for database operations.

## System Architecture

The application follows a monorepo structure with separate client and server directories, using a shared schema for type safety across the full stack.

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query for server state and local React state
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: In-memory storage with fallback to database
- **API Design**: RESTful API with JSON responses

## Key Components

### Database Schema
The application uses two main tables:
- `mbti_questions`: Stores test questions with categories and multiple choice options
- `mbti_results`: Stores user test results with session tracking and personality analysis

### Frontend Pages
- **Home Page**: Landing page with test introduction and personality type information
- **Test Page**: Interactive questionnaire with progress tracking
- **Results Page**: Detailed personality analysis with type descriptions and compatibility

### API Endpoints
- `GET /api/mbti/questions`: Retrieves all test questions
- `POST /api/mbti/submit`: Processes test answers and returns personality type
- Session-based result retrieval for displaying completed assessments

### UI Components
- Custom personality card component for result display
- Progress bar for test completion tracking
- Question card with radio button selections
- Responsive design optimized for mobile and desktop

## Data Flow

1. **Test Initialization**: User starts test, receives questions from API
2. **Answer Collection**: User selects answers, stored in local state
3. **Submission**: Answers sent to server with session ID
4. **Processing**: Server calculates MBTI scores and determines personality type
5. **Results**: User redirected to results page with detailed analysis

## External Dependencies

### Core Dependencies
- **Database**: @neondatabase/serverless for PostgreSQL connectivity
- **ORM**: drizzle-orm with drizzle-kit for migrations
- **UI**: Comprehensive shadcn/ui component library
- **Query Management**: @tanstack/react-query for API state
- **Validation**: Zod for schema validation with drizzle-zod integration

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **Vite**: Development server with HMR and build optimization
- **ESBuild**: Server-side bundling for production
- **PostCSS**: CSS processing with Tailwind CSS

## Deployment Strategy

The application is configured for deployment on Replit with:
- **Development**: `npm run dev` - Concurrent client and server development
- **Build**: `npm run build` - Vite client build + ESBuild server bundle
- **Production**: `npm run start` - Serves built application
- **Database**: Automatic PostgreSQL provisioning with environment variables
- **Port Configuration**: Server runs on port 5000 with proxy to port 80

The deployment uses Replit's autoscale infrastructure with automatic environment detection and development tooling integration.

## Changelog

```
Changelog:
- June 16, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```