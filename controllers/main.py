from flask import *

main = Blueprint('main', __name__, template_folder='templates')

@main.route('/')
def main_route():
	print("hello")
	return render_template("index.html")