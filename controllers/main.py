from flask import *
from config import *
import base64
import json
import requests
import urllib.parse

main = Blueprint('main', __name__, template_folder='templates')

@main.route('/')
def auth_route():
	# (1) -- request authorization
	urlArgs = "&".join(["{}={}".format(key, urllib.parse.quote(val)) for key, val in authQueryParams.items()])
	authURL = "{}/?{}".format(SPOTIFY_AUTH_URL, urlArgs)
	return redirect(authURL)


@main.route('/callback')
def callback():
	global tokenInfo
	# (4) -- request refresh & access tokens
	auth_token = request.args['code']
	# print ("---------- auth: " + str(auth_token))
	params = {
		"grant_type": "authorization_code",
		"code": str(auth_token),
		"redirect_uri": CALLBACK_URI
	}
	args = "{}:{}".format(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET).encode('ascii')
	base64encoded = str(base64.b64encode(args))
	base64encoded = base64encoded[2:len(base64encoded) - 1]
	# print ("---------- b64: ", base64encoded)
	header = {"Authorization": "Basic {}".format(base64encoded)}
	tokenPostReq = requests.post(SPOTIFY_TOKEN_URL, data=params, headers=header)

	# (5) -- token returned to application
	responseData = json.loads(tokenPostReq.text)
	tokenInfo = responseData
	# print ("---------- token: ", tokenInfo)
	# accessToken = responseData["access_token"]
	# refreshToken = responseData["refresh_token"]
	# tokenType = responseData["token_type"]
	# expiresIn = responseData["expires_in"]

	return redirect(url_for('main.home'))


@main.route('/home')
def home():
	authHeader = "Bearer {}".format(tokenInfo["access_token"])
	return render_template('index.html', baseURL=SPOTIFY_BASE_URL, authHeader=authHeader)
