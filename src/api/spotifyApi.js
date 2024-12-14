// Module for interacting with Spotify API

const SpotifyWebApi = require('spotify-web-api-node');

// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

const authenticateSpotify = async () => {
  try {
    const { body } = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(body.access_token);
    console.log('Spotify authenticated successfully!');
  } catch (error) {
    console.error('Failed to authenticate Spotify:', error);
  }
};

const getPlaylists = async () => {
  try {
    const playlists = await spotifyApi.getUserPlaylists();
    return playlists.body.items.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      tracksUrl: playlist.tracks.href,
    }));
  } catch (error) {
    console.error('Error fetching playlists:', error);
    throw error;
  }
};

module.exports = { spotifyApi, authenticateSpotify, getPlaylists };