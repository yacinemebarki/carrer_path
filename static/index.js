function hide(name){
    const el = document.querySelector(name);
    el.textContent = "";
    el.style.display = "none";
}

function showError(msg){
    const sentence = document.querySelector(".error-message");
    if (sentence){
        hide(".error-message");
    }
    sentence.textContent = msg;
    sentence.style.display = "block";
    setTimeout(function(){
        hide(".error-message");
    }, 3000);
}

function showSuccess(msg){
    const sentence = document.querySelector(".success-message");
    if (sentence){
        hide(".success-message");
    }
    sentence.textContent = msg;
    sentence.style.display = "block";
    setTimeout(function(){
        hide(".success-message");
    }, 3000);
}

class user{
    constructor(secondary_gpa,high_gpa,semester,last_gpa,overall_gpa,english_level,extra,live,computer_skills,prepare,game){
        this.secondary_gpa = secondary_gpa;
        this.high_gpa = high_gpa;
        this.semester = semester;
        this.last_gpa = last_gpa
        this.overall_gpa = overall_gpa;
        this.english_level = english_level;
        this.extra = extra;
        this.live = live;
        this.computer_skills = computer_skills;
        this.prepare = prepare;
        this.game = game;
    }
}

document.getElementById("submit-btn").addEventListener("click",function(){
    let student=new user(document.getElementById("secondary-gpa").value,document.getElementById("H_gpa").value,document.getElementById("semester").value,document.getElementById("last_gpa").value,document.getElementById("overall").value,document.getElementById("english").value,document.getElementById("Extra").value,document.getElementById("live").value,document.getElementById("computer").value,document.getElementById("preparation").value,document.getElementById("game").value);
    let skills=document.getElementById("skills").value;
    if (student.secondary_gpa>5 || student.high_gpa>5 || student.last_gpa>5 || student.overall_gpa>5 ||  student.english_level>5 ||  !student.computer_skills>5 || !student.secondary_gpa || !student.high_gpa || !student.semester || student.semester>10 || !student.last_gpa || !student.overall_gpa || !student.english_level || !student.extra || !student.live || !student.computer_skills || !student.prepare || !student.game || !skills){
        showError("please fill all case and the gpa must be under then 5 and max semester is 10");
        return;
    }
    showSuccess("wait for the result")
    
    async function send(student, skills) {
        try {
            const res = await fetch('/user_info', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user: student,
                    skills: skills
                })
            });
            const data = await res.json();
            let course = data["course"];
            
            const resultDiv = document.querySelector(".result");
            resultDiv.innerHTML = `
                <h2>Your Career Path Prediction</h2>
                <div class="prediction-result">
                    <p><strong>Recommended Career Path:</strong> ${data["path"]}</p>
                    <p><strong>Prediction Confidence:</strong> ${data["prob"]}</p>
                </div>
            `;
            resultDiv.style.display = "block";
            
            
            const coursesDiv = document.querySelector(".cources");
            if (!course || course.length === 0) {
                coursesDiv.innerHTML = `
                    <h2>Recommended Courses</h2>
                    <div class="no-courses">
                        No courses available at the moment. Please try again later.
                    </div>
                `;
            } else {
                let tableHTML = `
                    <h2>Recommended Courses for Your Career Path</h2>
                    <table class="courses-table">
                        <thead>
                            <tr>
                                <th>Course Title</th>
                                <th>Duration</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                
                course.forEach((courseItem, index) => {
                    tableHTML += `
                        <tr>
                            <td data-label="Course Title" class="course-title">${courseItem.title || 'N/A'}</td>
                            <td data-label="Duration">
                                <span class="course-duration">${courseItem.duration || 'N/A'}</span>
                            </td>
                            <td data-label="Action">
                                ${courseItem.link ? 
                                    `<a href="${courseItem.link}" target="_blank" class="course-link">View Course</a>` : 
                                    '<span style="color: #6b7280; font-style: italic;">No link available</span>'
                                }
                            </td>
                        </tr>
                    `;
                });
        
                tableHTML += `
                        </tbody>
                    </table>
                `;
        
                coursesDiv.innerHTML = tableHTML;
            }
            
            coursesDiv.classList.add("show");
            hide(".success-message");
            
        } catch (error) {
            console.error('Error:', error);
            showError("An error occurred while processing your request. Please try again.");
            hide(".success-message");
        }
    }
    
    send(student,skills);
});