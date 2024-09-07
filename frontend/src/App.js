import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: ''
  });
  
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div className="App">
      <h1>Heart Disease Prediction</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        </label>
        <label>
          Sex (1 = male, 0 = female):
          <input type="number" name="sex" value={formData.sex} onChange={handleChange} required />
        </label>
        <label>
          Chest Pain Type (0-3):
          <input type="number" name="cp" value={formData.cp} onChange={handleChange} required />
        </label>
        <label>
          Resting Blood Pressure:
          <input type="number" name="trestbps" value={formData.trestbps} onChange={handleChange} required />
        </label>
        <label>
          Cholesterol:
          <input type="number" name="chol" value={formData.chol} onChange={handleChange} required />
        </label>
        <label>
          Fasting Blood Sugar (1 = true, 0 = false):
          <input type="number" name="fbs" value={formData.fbs} onChange={handleChange} required />
        </label>
        <label>
          Resting ECG (0-2):
          <input type="number" name="restecg" value={formData.restecg} onChange={handleChange} required />
        </label>
        <label>
          Max Heart Rate Achieved:
          <input type="number" name="thalach" value={formData.thalach} onChange={handleChange} required />
        </label>
        <label>
          Exercise Induced Angina (1 = yes, 0 = no):
          <input type="number" name="exang" value={formData.exang} onChange={handleChange} required />
        </label>
        <label>
          ST Depression:
          <input type="number" name="oldpeak" value={formData.oldpeak} onChange={handleChange} required />
        </label>
        <label>
          Slope (0-2):
          <input type="number" name="slope" value={formData.slope} onChange={handleChange} required />
        </label>
        <label>
          Major Vessels (0-3):
          <input type="number" name="ca" value={formData.ca} onChange={handleChange} required />
        </label>
        <label>
          Thalassemia (3 = normal, 6 = fixed defect, 7 = reversible defect):
          <input type="number" name="thal" value={formData.thal} onChange={handleChange} required />
        </label>
        <button type="submit">Predict</button>
      </form>

      {prediction !== null && (
        <div className="prediction-result">
          <h2>Prediction Result:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
}

export default App;
