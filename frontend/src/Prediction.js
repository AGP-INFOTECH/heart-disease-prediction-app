import React, { useState } from 'react';
import axios from 'axios';
import './Prediction.css'; // Import the CSS file for the creative styling

function Prediction() {
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
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowOverlay(true); // Show the overlay

    try {
      console.log("Submitting data:", formData);  // Debugging line
      const response = await axios.post('http://localhost:5000/predict', formData);
      
      setTimeout(() => {
        setPrediction(response.data.prediction);
        setLoading(false);
      }, 2000); // 2-second delay
    } catch (error) {
      console.error('Error making prediction:', error.response?.data || error.message);
      setLoading(false);
    }
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setPrediction(null);
  };

  return (
    <div className="prediction-container">
      <div className="glass-box">
        <h1 className="title">Heart Disease Prediction</h1>
        <form onSubmit={handleSubmit} className="form">
          {Object.keys(formData).map((key) => (
            <div className="form-group" key={key}>
              <label htmlFor={key} className="form-label">
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:
              </label>
              <input
                id={key}
                type="number"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          ))}
          <button type="submit" className="cta-button">Predict Now</button>
        </form>

        {showOverlay && (
          <div className="overlay">
            <div className="overlay-content glass-box">
              {loading ? (
                <h2>Compiling data...</h2>
              ) : (
                <div>
                  <h2>Prediction Result</h2>
                  <p>{prediction}</p>
                  <button className="close-button" onClick={handleCloseOverlay}></button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Prediction;
