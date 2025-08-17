# Quick Setup Guide

## Prerequisites

Before setting up the Transport Tracking System, ensure you have:

- **Node.js** (version 14.x or higher)
- **MongoDB** (local installation or cloud service like MongoDB Atlas)
- **Angular CLI** (install globally: `npm install -g @angular/cli`)
- **Git** for version control
- **GTFS API Key** (for real-time transit data)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/abdelrahmann22/transport-tracking.git
cd transport-tracking
```

### 2. Backend Setup

```bash
# Navigate to API directory
cd transportTrackingAPI

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/transport-tracking
GTFS_API_KEY=your_gtfs_api_key_here
JWT_SECRET=your_secure_jwt_secret
PORT=5000
NODE_ENV=development
```

```bash
# Start the backend server
npm run run:dev
```

The API will be running at `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal and run:

```bash
# Navigate to frontend directory
cd transportTracking

# Install dependencies
npm install

# Start the Angular development server
ng serve
```

The application will be available at `http://localhost:4200`

### 4. Database Setup

If using local MongoDB:
```bash
# Start MongoDB service
mongod

# The application will automatically create the database and collections
```

If using MongoDB Atlas:
- Create a cluster on MongoDB Atlas
- Get your connection string
- Update the `MONGODB_URI` in your `.env` file

### 5. GTFS API Configuration

To get real-time transit data:
1. Register for a GTFS API key from your transit agency (e.g., NYC MTA)
2. Add the API key to your `.env` file
3. The system will automatically start fetching real-time vehicle positions

## Verification

### Backend Health Check
Visit `http://localhost:5000/buses` - you should see an empty array or bus data

### Frontend Health Check
Visit `http://localhost:4200` - you should see the Angular application

### Real-time Updates
- Open the browser developer console
- Look for WebSocket connection messages
- Bus positions should update every 30 seconds

## Common Issues

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string format
- Verify network access for cloud databases

### CORS Issues
- Ensure frontend URL is in CORS whitelist
- Check that both servers are running on correct ports

### GTFS API Issues
- Verify API key is valid
- Check API endpoint availability
- Review API rate limits

## Next Steps

1. **Explore the API**: Use tools like Postman to test endpoints
2. **Add Routes**: Import route data or create routes manually
3. **Monitor Logs**: Check console output for real-time data updates
4. **Customize Maps**: Modify map settings in the Angular components

## Development Tips

- Use `nodemon` for automatic backend restarts during development
- Use Angular's hot reload for frontend development
- Check browser console for WebSocket connection status
- Monitor MongoDB logs for database operations

## Getting Help

If you encounter issues:
1. Check the logs in both frontend and backend consoles
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that all required services (MongoDB, etc.) are running

For additional support, please refer to the main README.md or open an issue on GitHub.