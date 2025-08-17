# Project Documentation

## System Architecture Overview

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Angular UI    │────│   Express API   │────│   MongoDB       │
│  (Port 4200)    │    │  (Port 5000)    │    │   Database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       
         │                       │                       
         │              ┌─────────────────┐              
         │              │   Socket.io     │              
         └──────────────│   WebSocket     │              
                        └─────────────────┘              
                                 │                       
                        ┌─────────────────┐              
                        │   GTFS Feed     │              
                        │   (NYC MTA)     │              
                        └─────────────────┘              
```

### Data Flow

1. **GTFS Integration**: Backend fetches real-time vehicle positions from NYC MTA GTFS feed every 30 seconds
2. **Database Updates**: Vehicle positions are stored/updated in MongoDB with geospatial indexing
3. **Real-time Broadcasting**: Socket.io broadcasts location updates to all connected clients
4. **Map Visualization**: Angular frontend displays buses on Leaflet maps with real-time updates

## Core Components

### Backend Services

#### GTFS Service (`gtfsService.js`)
- Fetches real-time vehicle positions from GTFS feeds
- Processes and normalizes location data
- Updates bus locations in database
- Broadcasts updates via WebSocket

#### Bus Controller (`bus.controller.js`)
- CRUD operations for bus entities
- Location update handling
- Route association management

#### Route Controller (`route.controller.js`)
- Transit route management
- Route-bus relationship handling

### Frontend Components

#### Transport Service (`transport.service.ts`)
- HTTP client for API communication
- Bus and route data management
- Observable-based data streams

#### Map Integration
- Leaflet-based interactive maps
- Real-time bus marker updates
- Route visualization

## Data Models

### Bus Entity
- **busId**: Unique identifier from GTFS feed
- **routeId**: Reference to associated route
- **location**: GeoJSON Point with coordinates
- **lastUpdated**: Timestamp of last position update

### Route Entity
- **routeId**: GTFS route identifier
- **routeShortName**: Display name (e.g., "M15")
- **routeLongName**: Full route description
- **routeType**: Transit mode (bus, subway, etc.)
- **agencyId**: Operating agency identifier

### User Entity
- **firstName/lastName**: User identification
- **userName**: Unique username
- **email**: Email address with validation
- **password**: Bcrypt hashed password

## API Design

### RESTful Endpoints

All endpoints follow REST conventions with proper HTTP status codes:

- **200**: Success
- **201**: Created
- **404**: Not Found
- **500**: Server Error

### Real-time Communication

WebSocket events:
- `connection`: Client connects to server
- `busLocationUpdate`: Broadcast bus position changes
- `disconnect`: Client disconnects

## Security Features

### Authentication
- JWT token-based authentication
- Password hashing with bcrypt
- Input validation and sanitization

### API Protection
- CORS configuration for frontend access
- Rate limiting middleware
- Error handling middleware

## Performance Optimizations

### Database
- Geospatial indexing (2dsphere) for location queries
- Connection pooling with Mongoose
- Efficient query patterns

### Real-time Updates
- Bulk position updates from GTFS feed
- Optimized WebSocket broadcasting
- Client-side caching strategies

### Frontend
- Lazy loading of map components
- Observable-based reactive updates
- Efficient change detection

## Development Workflow

### Code Structure
- Modular Express.js architecture
- Angular component-based design
- Separation of concerns
- Clean API interfaces

### Environment Configuration
- Environment-specific settings
- Secure credential management
- Configurable GTFS endpoints

## Deployment Considerations

### Production Setup
- Process management (PM2)
- Database clustering
- Load balancing
- SSL/HTTPS configuration

### Monitoring
- Application logging
- Performance metrics
- Error tracking
- Health check endpoints

## Future Enhancements

### Planned Features
- Multi-agency GTFS support
- Historical tracking data
- Route planning capabilities
- Mobile application
- Real-time alerts and notifications
- Analytics dashboard

### Scalability
- Microservices architecture
- Message queue integration
- Horizontal scaling support
- CDN integration for static assets