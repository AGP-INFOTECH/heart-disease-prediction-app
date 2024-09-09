from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
import pickle
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This enables CORS for all routes

# Specify the full file names or paths
model_file_name = 'heart_disease_model.pkl'
scaler_file_name = 'scaler.pkl'

# Load the trained model and scaler
with open(model_file_name, 'rb') as model_file:
    model = pickle.load(model_file)

with open(scaler_file_name, 'rb') as scaler_file:
    scaler = pickle.load(scaler_file)
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Expecting JSON input

    try:
        # Check if all required fields are present
        required_fields = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing field: {field}'}), 400

        # Extract feature values from the JSON request
        input_data = [
            data['age'], data['sex'], data['cp'], data['trestbps'],
            data['chol'], data['fbs'], data['restecg'], data['thalach'],
            data['exang'], data['oldpeak'], data['slope'], data['ca'], data['thal']
        ]
        
        # Convert to DataFrame for compatibility with scaler
        columns = ['age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal']
        input_df = pd.DataFrame([input_data], columns=columns)

        # Scale and predict using the trained model
        input_data_scaled = scaler.transform(input_df)  # Scale input
        prediction = model.predict(input_data_scaled)

        # Return the prediction (1 = heart disease, 0 = no heart disease)
        result = 'Heart Disease Detected' if prediction[0] == 1 else 'No Heart Disease Detected'
        return jsonify({'prediction': result})
    except Exception as e:
        return jsonify({'error': f'Error processing request: {str(e)}'}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
