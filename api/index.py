from flask import Flask, jsonify, request
from flask_cors import CORS
import stripe
import os

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes by default

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    try:
        data = request.json
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=data["line_items"],
            mode="subscription",
            success_url=data["success_url"],
            cancel_url=data["cancel_url"]
        )
        return jsonify({"id": session.id})
    except Exception as e:
        return jsonify(error=str(e)), 500
