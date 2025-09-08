from flask import Flask,render_template,request,jsonify
import pandas as pd   
import numpy as np
from youtubesearchpython import VideosSearch

import joblib
model=joblib.load('my_model.pkl')
pip=joblib.load('career.pkl')
app=Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')
import re
def clean_string(s):
    if isinstance(s, str):
        s=re.sub(r'[^\w\s]', ' ', s)
        s=re.sub(r'\s+', ' ', s).strip()
        return s
    return s
@app.route('/user_info',methods=['POST'])
def answer():
    student=request.json['user']
    skills=request.json['skills']
    print(skills,student)
    result=model.predict([[student["high_gpa"],student["secondary_gpa"],student["live"],student["computer_skills"],student["prepare"],student["game"],student["english_level"],student["extra"],student["semester"],student["last_gpa"],student["overall_gpa"]]])
    print(result)
    path=pip.predict([skills])
    print(path)
    search_query = f"{path[0]} course"
    video=VideosSearch(search_query,limit=5)
    course=video.result()
    if course.get('result') and len(course['result']) > 0:
        print(course['result'][0]['link'])
    else:
        print("No results found for:", path[0])
    courses=[]
    for i in course['result']:
        courses.append({
            'title':i['title'],
            'duration':i['duration'],
            'link':i['link']
        })
    print(courses)        

    return jsonify({
        "prob":float(result[0]),
        "path":path[0],
        "course":courses
    })
if __name__=='__main__':
    app.run(debug=True)

    
    







