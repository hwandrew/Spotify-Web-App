env = dict(
	host = 'localhost',
	port = 8888
)

# Client Keys
SPOTIFY_CLIENT_ID = '63e63727c47a470595f713f5d7854f0f'
SPOTIFY_CLIENT_SECRET = '51cc2358f47d4cefbd2726be498a8163'

# Spotify URLs
SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize/'
SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token/'
SPOTIFY_API_BASE_URL = 'https://api.spotify.com/'
API_VERSION = 'v1'
SPOTIFY_API_URL = '{}/{}'.format(SPOTIFY_API_BASE_URL, API_VERSION)

# Spotify API Parameters
CLIENT_SIDE_URL = 'http://localhost'
PORT = 8888
SPOTIFY_REDIRECT_URI = '{}:{}/callback'.format(CLIENT_SIDE_URL, PORT)
SCOPE = 'user-library-read'
STATE = ""
SHOW_DIALOG_bool = True
SHOW_DIALOG_str = str(SHOW_DIALOG_bool).lower()

AUTH_PARAMETERS = {
	"response_type": "code",
	"redirect_uri": SPOTIFY_REDIRECT_URI,
	"scope": SCOPE,
	# "state": STATE,
	# "show_dialog": SHOW_DIALOG_str,
	"client_id": SPOTIFY_CLIENT_ID
}
