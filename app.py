import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import stripe
from dotenv import load_dotenv
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Set the Stripe secret key
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    try:
        data = request.json
        logging.info("Received checkout session data: %s", data)

        # Create a checkout session
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=data["line_items"],
            mode="subscription",
            success_url=data["success_url"],
            cancel_url=data["cancel_url"]
        )
        
        return jsonify({"id": session.id})
    except Exception as e:
        logging.error("Error creating checkout session: %s", str(e))
        return jsonify(error=str(e)), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
