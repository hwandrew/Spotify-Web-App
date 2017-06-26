from flask import *
from config import *

main = Blueprint('main', __name__, template_folder='templates')


# https://developer.spotify.com/web-api/authorization-guide/
# Authorization Steps for Spotify Requests:
# 1) Application requests authorization
# 2) User is asked to authorize access with scopes
# 3) User is redirected back to specific redirect URI
# 4) Application requests refresh & access tokens
# 5) Tokens are returned to application
# 6) Use the access token to access the Spotify Web API
# 7) Requesting access token from refresh token


@main.route('/')
def main_route():
	# (1) -- request authorization
	urlArgs = "&".join(["{}={}".format(key, value) for (key, value) in AUTH_PARAMETERS.items()])
	requestURL = "{}?{}".format(SPOTIFY_AUTH_URL, urlArgs)
	print requestURL
	return render_template("index.html")
