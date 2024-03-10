# CodeLabsAPI

## Introduction

This repository contains the source code for the CodeLabsAPI project. CodeLabsAPI is a RESTful API designed to provide various functionalities for managing coding tutorials, labs, and related resources.

## Branch Information

This README corresponds to the `Andrew` branch of the repository.

## Features

- **User Authentication**: Allows users to sign up, log in, and manage their accounts securely.
- **Spotify Integration**: Allows users to search Spotify's API and add songs to playlists and favorites.

## Installation

To run this API locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/aledure/CodeLabsAPI.git
   ```
2. Navigate to project directory:

```bash
cd CodeLabsAPI
```

3. Install dependencies

```bash
npm install
```

4. Configure environment variables: Create an .env file in the root directory and set the required variables. Refer to this example:

```bash
# Server configuration
PORT=3000

# Spotify API configuration
CLIENT_ID=<id>
CLIENT_SECRET=<secret>
REDIRECT_URL=<http://localhost:3000/callback>

# MongoDB configuration
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@playlistapi.lcxj8lv.mongodb.net/?retryWrites=true&w=majority
#secret key
SECRET_KEY=mySecretKey
```

5. Start the server:

```bash
npm start
```

## Usage

Once the server is up and running, you can interact with the API using HTTP requests at the following endpoints:

#### Register Endpoint

- **URL**: `/register`
- **Method**: `POST`
- **Data Parameters**:
  - `username`: The username of the new user.
  - `email`: The email address of the new user.
  - `password`: The password of the new user.

Example:

```json
{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "password123"
}
```

### Login Endpoint

- **URL**: `/login`
- **Method**: `POST`
- **Data Parameters**:
  - `username`: The username of the existing user.
  - `password`: The password of the existing user.

Example:

```json
{
  "username": "exampleUser",
  "password": "password123"
}
```

### Spotify Login Endpoint

- **URL**: `/spotify/login`
- **Method**: `GET`
- **Description**: Initiates the login process with Spotify by redirecting the user to Spotify's authorization page.
- **Returns**: Redirects the user to Spotify's authorization page.

### Callback Endpoint

- **URL**: `/spotify/callback`
- **Method**: `GET`
- **Description**: Handles the callback from Spotify after the user has authenticated. Retrieves access and refresh tokens from Spotify.
- **Query Parameters**:
  - `error`: If present, indicates an error occurred during the authentication process.
  - `code`: The authorization code provided by Spotify.
- **Returns**:
  - If successful: Displays a success message and sets up token refreshing.
  - If error: Displays an error message.

### Spotify Search Endpoint

- **URL**: `/spotify/search`
- **Method**: `GET`
- **Description**: Searches for artists or tracks on Spotify based on the provided query.
- **Query Parameters**:
  - `q`: The search query.
  - `type`: The type of search (either "artist" or "track").
- **Returns**:
  - If successful and type is "artist": Information about the artist, including albums and top tracks.
  - If successful and type is "track": List of tracks matching the query.
  - If error: Displays an error message.

### Play Endpoint

- **URL**: `/spotify/play`
- **Method**: `GET`
- **Description**: Initiates playback of a specific track on Spotify.
- **Query Parameters**:
  - `uri`: The URI of the track to play.
- **Returns**:
  - If successful: Indicates that playback has started.
  - If error: Displays an error message.

### Create Playlist Endpoint

- **URL**: `/`
- **Method**: `POST`
- **Description**: Creates a new playlist.
- **Request Body**:
  - `userId`: ID of the user creating the playlist.
  - `name`: Name of the playlist.
  - `tracks`: Array of tracks in the playlist.
- **Returns**:
  - If successful: Returns the created playlist with status code 201.
  - If error: Returns an error message with status code 500.

### Get All Playlists Endpoint

- **URL**: `/`
- **Method**: `GET`
- **Description**: Retrieves all playlists.
- **Returns**:
  - If successful: Returns an array of all playlists.
  - If error: Returns an error message with status code 500.

### Get Playlist by ID Endpoint

- **URL**: `/:id`
- **Method**: `GET`
- **Description**: Retrieves a single playlist by its ID.
- **Path Parameters**:
  - `id`: ID of the playlist to retrieve.
- **Returns**:
  - If playlist found: Returns the playlist.
  - If playlist not found: Returns an error message with status code 404.
  - If error: Returns an error message with status code 500.

### Update Playlist by ID Endpoint

- **URL**: `/:id`
- **Method**: `PUT`
- **Description**: Updates a playlist by its ID.
- **Path Parameters**:
  - `id`: ID of the playlist to update.
- **Request Body**:
  - `name`: Updated name of the playlist.
  - `tracks`: Updated array of tracks in the playlist.
- **Returns**:
  - If successful: Returns the updated playlist.
  - If playlist not found: Returns an error message with status code 404.
  - If error: Returns an error message with status code 500.

### Delete Playlist by ID Endpoint

- **URL**: `/:id`
- **Method**: `DELETE`
- **Description**: Deletes a playlist by its ID.
- **Path Parameters**:
  - `id`: ID of the playlist to delete.
- **Returns**:
  - If successful: Returns a success message.
  - If playlist not found: Returns an error message with status code 404.
  - If error: Returns an error message with status code 500.
