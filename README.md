# AI-Powered Career Guidance System

## Introduction

Many Computer Science students struggle to choose the right specialization after their degree. This web app uses **machine learning** to guide students toward the field that best matches their skills. It provides a **percentage fit** for each path (e.g., AI, Data Science, Cybersecurity, Software Engineering) and suggests videos to improve their skills.
🔗 **Live Demo:** [Career Path Recommender](https://carrer-path-8.onrender.com/)

## Problem Statement

Many Computer Science students face confusion after completing their degree because the field is very broad (AI, Data Science, Cybersecurity, Software Engineering, etc.).  
Without clear guidance, they often choose paths that do not match their skills or interests, which can lead to wasted time, effort, and missed opportunities.  
This project aims to solve that problem by providing **data-driven career recommendations** tailored to each student’s profile.


## Proposed Methods

### 🔹 Frontend Development
- Built with **HTML, CSS, and JavaScript**  
- Responsive design for both desktop and mobile users  
- Clean and simple user interface to ensure easy navigation  

### 🔹 User Interaction Flow
1. **Input Form**: Students enter their GPA and skills through a user-friendly form.  
2. **Data Submission**: The form sends the user data to the backend via HTTP requests.  
3. **Results Display**: The app dynamically displays the predicted career path, percentage match, and recommended videos.  
  


### 🔹 Data Preprocessing
- Removing duplicates and null values  
 - Encoding categorical data
### 🔹 Tow-Step Prediction Pipeline

1. **	Attendance prediction**: using student information (gpa and skills (language computer skill)) and regression model we predict the attendance probability.  
2. **field recommender**:Based on student data and skills, our system predicts the most suitable career field by finding the closest match between the user’s profile and existing data.

## Methodology

### 📊 Data Exploration and Preprocessing
- **Data Cleaning**: Removed duplicate rows and null values.  
- **Feature Engineering**: encoded categorical data, and performed exploratory data analysis.  
### 🤖 Model Training and Evaluation

- **Job Probability Model**:  
  - Implemented using a **RandomForestRegressor** inside a Scikit-Learn Pipeline with data scaling:  
    ```python
    model1 = Pipeline([
        ("scaler", StandardScaler()),
        ("regressor", RandomForestRegressor(
            n_estimators=200,
            random_state=42
        ))
    ])
    ```  
  - Predicted the **probability of getting a job** with an accuracy of **0.55**.  

- **Career Field Recommender**:  
  - Implemented with a **Logistic Regression** classifier using **TF-IDF Vectorization**:  
    ```python
    pipe = Pipeline([
        ("tfidf", TfidfVectorizer(stop_words="english")),
        ("clf", LogisticRegression(max_iter=1000))
    ])
    ```  
  - Predicted the **most suitable career field** with an **F1-score of 0.90**.  

### 📈 Performance Metrics
- **Job Probability Model (Random Forest)**: Accuracy = **0.55**  
- **Career Field Recommender (Logistic Regression)**: F1-score = **0.90**
### 🌐 Frontend & Flask Integration  

- **Flask Backend**:  
  - Built with **Flask** to serve the machine learning models.  
  - Handles user input (student info + skills) via `POST` requests.  
  - Predicts:  
    - **Job probability** using `my_model.pkl`.  
    - **Career field recommendation** using `career.pkl`.  
  - Fetches **YouTube video suggestions** for skill improvement using `youtubesearchpython`.  

  ```python
  @app.route('/user_info', methods=['POST'])
  def answer():
      student = request.json['user']
      skills = request.json['skills']
      
      # Job probability prediction
      result = model.predict([[ ... student features ... ]])
      
      # Career field recommendation
      path = pip.predict([skills])
      
      # Fetch related courses from YouTube
      search_query = f"{path[0]} course"
      video = VideosSearch(search_query, limit=5)
      course = video.result()
      
      return jsonify({
          "prob": float(result[0]),
          "path": path[0],
          "course": course
      })
  
### 🔮 Future Work

- **Expand dataset**: Include more diverse student backgrounds (different universities, countries, and skills).  
- **Improve accuracy**: Experiment with advanced ML models (e.g., XGBoost, Neural Networks) to boost prediction performance.  
- **Dynamic learning**: Continuously update recommendations as students improve their skills over time.  
- **Personalized content**: Suggest not only YouTube videos but also articles, courses (Coursera, Udemy), and project ideas.  
- **Interactive dashboard**: Build a modern frontend with frameworks like React or Vue for better user experience.  
- **Deployment scalability**: Move from Render to cloud platforms (AWS, GCP, Azure) for higher traffic and real-time inference.  
- **Gamification**: Add badges, progress tracking, and learning goals to keep students motivated.
    
### ✅ Conclusion 

This project provides a practical solution for Computer Science students struggling to choose their career path after graduation.  
By combining machine learning with a simple web interface, it predicts the most suitable field for each student and suggests learning resources to improve their skills.  
Although still in its early stage, the system demonstrates how data-driven guidance can support students in making informed career decisions and lays the foundation for future improvements.  




