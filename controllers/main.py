from flask import *
from config import *
import base64
import json
import requests
import urllib

main = Blueprint('main', __name__, template_folder='templates')

@main.route('/')
def auth_route():
	# (1) -- request authorization
	urlArgs = "&".join(["{}={}".format(key, urllib.quote(val)) for key, val in authQueryParams.items()])
	authURL = "{}/?{}".format(SPOTIFY_AUTH_URL, urlArgs)
	return redirect(authURL)


@main.route('/callback')
def callback():
	global tokenInfo
	# (4) -- request refresh & access tokens
	auth_token = request.args['code']
	params = {
		"grant_type": "authorization_code",
		"code": str(auth_token),
		"redirect_uri": CALLBACK_URI
	}
	base64encoded = base64.b64encode("{}:{}".format(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET))
	header = {"Authorization": "Basic {}".format(base64encoded)}
	tokenPostReq = requests.post(SPOTIFY_TOKEN_URL, data=params, headers=header)

	# (5) -- token returned to application
	responseData = json.loads(tokenPostReq.text)
	tokenInfo = responseData
	# accessToken = responseData["access_token"]
	# refreshToken = responseData["refresh_token"]
	# tokenType = responseData["token_type"]
	# expiresIn = responseData["expires_in"]

	return redirect(url_for('main.home'))


@main.route('/home')
def home():
	authHeader = "Bearer {}".format(tokenInfo["access_token"])
	return render_template('index.html', baseURL=SPOTIFY_BASE_URL, authHeader=authHeader)
