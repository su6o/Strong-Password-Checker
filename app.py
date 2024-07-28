from flask import Flask, render_template, request, jsonify
import re

app = Flask(__name__)

def check_password_strength(password):
    length_error = len(password) < 8
    digit_error = re.search(r"\d", password) is None
    uppercase_error = re.search(r"[A-Z]", password) is None
    lowercase_error = re.search(r"[a-z]", password) is None
    symbol_error = re.search(r"[!@#$%^&*(),.?\":{}|<>]", password) is None

    errors = {
        'length_error': length_error,
        'digit_error': digit_error,
        'uppercase_error': uppercase_error,
        'lowercase_error': lowercase_error,
        'symbol_error': symbol_error,
    }

    strong = not (length_error or digit_error or uppercase_error or lowercase_error or symbol_error)
    return strong, errors

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check_password', methods=['POST'])
def check_password():
    password = request.form['password']
    strong, errors = check_password_strength(password)
    return jsonify({'strong': strong, 'errors': errors})

if __name__ == '__main__':
    app.run(debug=True)
