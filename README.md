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

- Python 3.8+ 
- Node.js 18+
- npm or yarn

## Setup Instructions

### Backend Setup

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

### Frontend Setup

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

## Troubleshooting

### Backend Issues
- Ensure Python virtual environment is activated
- Check that port 8000 is not in use
- Verify all dependencies are installed

### Frontend Issues
- Ensure Node.js and npm are installed
- Check that port 3000 is not in use
- Verify backend is running on port 8000

### CORS Issues
- Backend CORS is configured for `localhost:3000`
- If using a different port, update CORS settings in `backend/main.py`

## Next Steps

This is a basic setup that can be extended with:
- Database integration
- Authentication
- More complex API endpoints
- State management (Redux, Zustand)
- Testing setup
- Docker containerization

