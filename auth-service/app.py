from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({
        "service": "Auth Service",
        "status": "running"
    })

@app.route("/login", methods=["POST"])
def login():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    if username == "admin" and password == "admin123":
        return jsonify({
            "message": "Login successful",
            "token": "sample-jwt-token"
        })

    return jsonify({
        "message": "Invalid credentials"
    }), 401

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
