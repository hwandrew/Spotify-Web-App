env = dict(
	host = 'localhost',
	port = 8888
)

# Client Keys
SPOTIFY_CLIENT_ID = '63e63727c47a470595f713f5d7854f0f'
SPOTIFY_CLIENT_SECRET = '51cc2358f47d4cefbd2726be498a8163'

# Important URLs
SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize'
SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
SPOTIFY_BASE_URL = 'https://api.spotify.com/v1'

# Server-side parameters
CLIENT_SIDE_URL = 'http://' + env['host']
PORT = env['port']
CALLBACK_URI = '{}:{}/callback'.format(CLIENT_SIDE_URL, PORT)
SCOPE = 'streaming'
STATE = ''
SHOW_DIALOG = 'true'

authQueryParams = dict(
	response_type = 'code',
	redirect_uri = CALLBACK_URI,
	scope = SCOPE,
	# state = STATE,
	# showDialog = SHOW_DIALOG,
	client_id = SPOTIFY_CLIENT_ID
)

AUTHORIZATION_HEADER = {}
