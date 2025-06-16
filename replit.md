# BA Intelligence Dashboard

## Overview

This is a Business Analysis Intelligence Dashboard built as a full-stack web application that provides comprehensive project insights for business analysts. The application features a modern React frontend with TypeScript, an Express.js backend, and PostgreSQL database integration using Drizzle ORM. The dashboard focuses on delivery risk assessment, sprint forecasting, OKR alignment, and project traceability.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design
- **Development**: Hot reload with Vite integration in development mode
- **Error Handling**: Centralized error handling middleware

### Database Architecture
- **Database**: PostgreSQL 16
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database migrations
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`

## Key Components

### Dashboard Widgets
1. **Delivery Risk Score** - Predictive risk assessment with visual indicators
2. **Sprint Forecast** - Success probability and velocity tracking
3. **OKR Alignment** - Progress tracking against objectives and key results
4. **Epic Health Radar** - Multi-dimensional epic status visualization
5. **AI Summary Feed** - Intelligent insights and recommendations
6. **Traceability Map** - End-to-end story tracking through development lifecycle
7. **Change Log** - Historical record of project changes and updates

### Data Models
- **Users**: Authentication and user management
- **Epics**: High-level feature containers with health metrics
- **Stories**: Individual work items with status tracking
- **OKRs**: Objectives and Key Results with progress indicators
- **Summaries**: AI-generated insights and recommendations
- **Change Logs**: Audit trail of project modifications
- **Traceability**: Development lifecycle tracking
- **Sprint Metrics**: Performance and forecasting data
- **Risk Metrics**: Delivery risk assessment data

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data
2. **API Layer**: Express.js routes handle HTTP requests and responses
3. **Storage Interface**: Abstract storage interface allows for flexible data persistence
4. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
5. **Real-time Updates**: Query invalidation triggers UI updates
6. **Error Boundaries**: Graceful error handling throughout the application

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives for accessible components
- **Data Fetching**: TanStack React Query for server state
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React icon library
- **Date Handling**: date-fns for date formatting and manipulation
- **Charts**: Recharts for data visualization

### Backend Dependencies
- **Database**: Neon serverless PostgreSQL adapter
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Schema Validation**: Drizzle Zod for type-safe schema validation
- **Development**: tsx for TypeScript execution and hot reload

### Build Tools
- **Bundler**: Vite with React plugin
- **TypeScript**: Full TypeScript support with strict configuration
- **Linting/Formatting**: ESBuild for production builds
- **CSS Processing**: PostCSS with Tailwind CSS

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with automatic restarts
- **Database**: PostgreSQL 16 with development seeding
- **Port Configuration**: Frontend on 5000, proxied through Vite
- **Hot Reload**: Full-stack hot reload with Vite integration

### Production Build
- **Frontend**: Static assets built to `dist/public`
- **Backend**: Bundled with ESBuild to `dist/index.js`
- **Database**: Migrations applied via Drizzle Kit
- **Deployment**: Replit autoscale deployment target

### Environment Configuration
- **Database URL**: Required environment variable for database connection
- **Session Storage**: PostgreSQL-backed session management
- **Static Assets**: Served from `dist/public` in production

## Changelog

Changelog:
- June 16, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.