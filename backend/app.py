from flask import Flask, request, jsonify
import numpy as np
import pickle
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Specify the full file names or paths
model_file_name = 'heart_disease_model.pkl'
scaler_file_name = 'scaler.pkl'
# Load the trained model and scaler
with open('heart_disease_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('scaler.pkl', 'rb') as scaler_file:
    scaler = pickle.load(scaler_file)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Expecting JSON input

    try:
        # Extract feature values from the JSON request
        input_data = [
            data['age'], data['sex'], data['cp'], data['trestbps'],
            data['chol'], data['fbs'], data['restecg'], data['thalach'],
            data['exang'], data['oldpeak'], data['slope'], data['ca'], data['thal']
        ]
        input_data = np.array(input_data).reshape(1, -1)

        # Scale and predict using the trained model
        input_data = scaler.transform(input_data)  # Scale input
        prediction = model.predict(input_data)

        # Return the prediction (1 = heart disease, 0 = no heart disease)
        result = 'Heart Disease Detected' if prediction[0] == 1 else 'No Heart Disease Detected'
        return jsonify({'prediction': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
