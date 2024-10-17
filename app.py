import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import stripe

app = Flask(__name__)
CORS(app)

# Set up Stripe with your secret key
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
print("Stripe API Key:", stripe.api_key)


@app.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    try:
        # Retrieve the items from the request
        data = request.json

        # Create a checkout session
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=data["line_items"],
            mode="subscription",  # Change this to "subscription" for recurring payments
            success_url=data["success_url"],
             cancel_url=data["cancel_url"] 
        )
        
        # Return the session ID to the client
        return jsonify({"id": session.id})
    except Exception as e:
        print("Error creating checkout session:", str(e))  # Log the error
        return jsonify(error=str(e)), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)
