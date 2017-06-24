from flask import Flask, render_template
import controllers
import config

# Initialize Flask app with the template folder address
app = Flask(__name__, template_folder='templates', static_folder='static')

# Register the controllers
app.register_blueprint(controllers.main)

#Listen on external IPs
if __name__ == '__main__':
	app.run(host=config.env['host'], port=config.env['port'], debug=True)