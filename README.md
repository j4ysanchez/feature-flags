# Hello World React + FastAPI

A simple full-stack application with a React frontend (using Vite) and a Python FastAPI backend.

## Project Structure

```
feature-flags/
├── backend/
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── main.jsx        # React entry point
│   │   └── components/
│   │       └── HelloWorld.jsx  # Hello World component
│   ├── package.json        # Node.js dependencies
│   └── vite.config.js      # Vite configuration
└── README.md
```

## Features

- **Backend**: FastAPI with CORS support
- **Frontend**: React with Vite for fast development
- **API Integration**: Axios for HTTP requests
- **Error Handling**: Proper error handling on both sides
- **Hot Reload**: Both frontend and backend support hot reload

## Prerequisites

### For Docker Setup:
- Docker
- Docker Compose

### For Local Development:
- Python 3.8+ 
- Node.js 18+
- npm or yarn

## Setup Instructions

### Option 1: Docker Compose (Recommended)

1. Make sure Docker and Docker Compose are installed on your system.

2. Clone the repository and navigate to the project directory:
   ```bash
   cd feature-flags
   ```

3. Build and start both services:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`
   - API Documentation: `http://localhost:8000/docs`

5. To stop the services:
   ```bash
   docker-compose down
   ```

### Option 2: Local Development

#### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   ```bash
   # On macOS/Linux
   source venv/bin/activate
   
   # On Windows
   venv\Scripts\activate
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the FastAPI server:
   ```bash
   python main.py
   ```

   The backend will be available at `http://localhost:8000`

#### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## API Endpoints

- `GET /` - Root endpoint
- `GET /hello` - Hello World message
- `GET /health` - Health check
- `GET /docs` - Interactive API documentation (Swagger UI)

## Usage

1. Start both the backend and frontend servers
2. Open `http://localhost:3000` in your browser
3. The React app will automatically fetch the "Hello World" message from the FastAPI backend
4. Click the "Refresh Message" button to fetch the message again

## Development

### Backend Development
- The FastAPI server runs with auto-reload enabled
- API documentation is available at `http://localhost:8000/docs`
- CORS is configured to allow requests from the React development server

### Frontend Development
- Vite provides fast hot module replacement
- The app automatically connects to the FastAPI backend
- Error handling displays user-friendly messages

## Technologies Used

- **Backend**: FastAPI, Uvicorn, Python
- **Frontend**: React, Vite, Axios
- **Development**: Hot reload, CORS support

## Docker Commands

### Basic Commands
```bash
# Build and start services
docker-compose up --build

# Start services in background
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend

# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Remove containers and volumes
docker-compose down -v
```

### Development Commands
```bash
# Start with live reload (development mode)
docker-compose up --build

# Access container shell
docker-compose exec backend bash
docker-compose exec frontend sh
```

## Troubleshooting

### Docker Issues
- Ensure Docker and Docker Compose are installed and running
- Check that ports 3000 and 8000 are not in use
- Try rebuilding containers: `docker-compose down && docker-compose up --build`
- Check container logs: `docker-compose logs`

### Backend Issues
- Ensure Python virtual environment is activated (local development)
- Check that port 8000 is not in use
- Verify all dependencies are installed
- For Docker: Check backend container logs

### Frontend Issues
- Ensure Node.js and npm are installed (local development)
- Check that port 3000 is not in use
- Verify backend is running on port 8000
- For Docker: Check frontend container logs

### CORS Issues
- Backend CORS is configured for multiple origins including Docker containers
- If using different ports, update CORS settings in `backend/main.py`
- For Docker: CORS is pre-configured for container networking

## Next Steps

This is a basic setup that can be extended with:
- Database integration
- Authentication
- More complex API endpoints
- State management (Redux, Zustand)
- Testing setup
- Docker containerization

