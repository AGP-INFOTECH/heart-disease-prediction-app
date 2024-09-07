import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
import pickle

# Load the dataset
data = pd.read_csv('heart.csv')

# Features and target
X = data.drop('target', axis=1)  # Drop the target column
y = data['target']  # Target is whether heart disease is present (1) or not (0)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale the data
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train the model
model = LogisticRegression()
model.fit(X_train, y_train)

# Test the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy * 100:.2f}%")


# Specify the file names when saving
model_file_name = 'heart_disease_model.pkl'
scaler_file_name = 'scaler.pkl'

# Save the model and the scaler using pickle
with open('heart_disease_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

with open('scaler.pkl', 'wb') as scaler_file:
    pickle.dump(scaler, scaler_file)

    print("Model and scaler have been saved successfully.")
