# Transport Tracking System

A real-time public transportation tracking system that provides live bus location updates using GTFS (General Transit Feed Specification) real-time data. The system consists of a Node.js backend API and an Angular frontend with interactive map visualization.

## 🚌 Overview

This system tracks public transit vehicles (buses) in real-time by consuming GTFS real-time feeds from transit agencies. It provides a web-based interface for users to view live bus positions on an interactive map, along with route information and schedules.

## 🏗️ Architecture

The system is built with a microservices architecture consisting of:

### Backend API (`transportTrackingAPI`)
- **Node.js/Express** REST API server
- **MongoDB** database with geospatial indexing
- **Socket.io** for real-time WebSocket connections
- **GTFS Real-time** integration for live vehicle positions
- **JWT Authentication** for user management

### Frontend (`transportTracking`)
- **Angular 18** single-page application
- **Leaflet** interactive mapping library
- **Angular Material** UI components
- **Real-time updates** via WebSocket connections

## 🛠️ Technologies Used

### Backend
- Node.js & Express.js
- MongoDB with Mongoose ODM
- Socket.io for real-time communication
- GTFS Real-time Bindings
- JWT for authentication
- Axios for HTTP requests
- Bcrypt for password hashing

### Frontend
- Angular 18
- TypeScript
- Leaflet & ngx-leaflet for maps
- Angular Material for UI
- RxJS for reactive programming
- Bootstrap for styling

## ✨ Features

- **Real-time Bus Tracking**: Live vehicle positions updated every 30 seconds
- **Interactive Maps**: Leaflet-based maps with bus markers and route visualization
- **Route Management**: CRUD operations for transit routes
- **Bus Management**: Track individual buses and their assignments to routes
- **WebSocket Updates**: Real-time position updates without page refresh
- **User Authentication**: Secure login system with JWT tokens
- **Geospatial Queries**: MongoDB 2dsphere indexing for location-based searches
- **GTFS Integration**: Automatic data ingestion from transit agency feeds

## 📁 Project Structure

```
transport-tracking/
├── transportTrackingAPI/          # Backend API
│   ├── controllers/               # Route controllers
│   ├── models/                    # MongoDB schemas
│   ├── routes/                    # Express routes
│   ├── services/                  # Business logic
│   ├── config/                    # Database configuration
│   ├── middlewares/               # Custom middleware
│   └── app.js                     # Main server file
├── transportTracking/             # Angular Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/        # Angular components
│   │   │   ├── services/          # API services
│   │   │   └── models/            # TypeScript interfaces
│   │   └── assets/                # Static assets
│   └── angular.json               # Angular configuration
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Angular CLI (`npm install -g @angular/cli`)
- GTFS API key (for real-time data)

### Backend Setup

1. Navigate to the API directory:
```bash
cd transportTrackingAPI
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/transport-tracking
GTFS_API_KEY=your_gtfs_api_key_here
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd transportTracking
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

The application will be available at `http://localhost:4200`

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Buses
- `GET /buses` - Get all buses
- `GET /buses/:id` - Get bus by ID
- `POST /buses` - Create new bus
- `PUT /buses/:id` - Update bus location
- `DELETE /buses/:id` - Delete bus

### Routes
- `GET /routes` - Get all routes
- `GET /routes/:id` - Get route by ID
- `POST /routes` - Create new route
- `PUT /routes/:id` - Update route
- `DELETE /routes/:id` - Delete route

### GTFS
- `GET /gtfs/vehicle-positions` - Get current vehicle positions
- `POST /gtfs/update` - Manually trigger position update

## 🔄 Real-time Updates

The system uses Socket.io to provide real-time updates:

- **Connection**: Frontend connects to WebSocket on page load
- **Bus Updates**: Location changes broadcast to all connected clients
- **Auto-refresh**: Vehicle positions updated every 30 seconds from GTFS feed

## 🗃️ Database Schema

### Bus Model
```javascript
{
  busId: String (unique),
  routeId: ObjectId (ref: Route),
  location: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  lastUpdated: Date
}
```

### Route Model
```javascript
{
  routeId: String (unique),
  routeShortName: String,
  routeLongName: String,
  routeType: Number,
  agencyId: String
}
```

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  userName: String (unique),
  email: String (unique),
  password: String (hashed)
}
```

## 🧪 Testing

### Backend Tests
```bash
cd transportTrackingAPI
npm test
```

### Frontend Tests
```bash
cd transportTracking
ng test
```

## 📦 Deployment

### Production Build

#### Backend
```bash
cd transportTrackingAPI
npm install --production
```

#### Frontend
```bash
cd transportTracking
ng build --configuration production
```

### Environment Variables (Production)
- `NODE_ENV=production`
- `MONGODB_URI=mongodb://your-production-db`
- `GTFS_API_KEY=your-production-api-key`
- `JWT_SECRET=strong-production-secret`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License. See the `LICENSE` file for details.

## 📧 Contact

For questions or support, please open an issue on GitHub.

## 🙏 Acknowledgments

- [GTFS Real-time](https://developers.google.com/transit/gtfs-realtime/) for transit data specifications
- [Leaflet](https://leafletjs.com/) for mapping functionality
- [Angular](https://angular.io/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework