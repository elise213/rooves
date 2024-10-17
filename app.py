import os
from flask import Flask, jsonify, request, redirect
from flask_cors import CORS
import stripe
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

app = Flask(__name__)
CORS(app)

# Set Stripe API key from environment variable
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

# Ensure YOUR_DOMAIN is publicly accessible (replace with your Netlify deployment URL)
YOUR_DOMAIN = 'https://rooves.netlify.app'

@app.route('/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        data = request.json
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=data['line_items'],  # Use line_items sent in request
            mode='subscription',  # For recurring payments, ensure this is set to 'subscription'
            success_url=f"{YOUR_DOMAIN}/success",
            cancel_url=f"{YOUR_DOMAIN}/checkout"  # Redirects back to checkout on cancel
        )
        # Redirect the client to the Stripe checkout session URL
        return jsonify({"url": checkout_session.url})
    except Exception as e:
        # Log the error and send an error response
        print(f"Error creating checkout session: {str(e)}")
        return jsonify(error=str(e)), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
