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
    if (!student.secondary_gpa || !student.high_gpa || !student.semester || !student.last_gpa || !student.overall_gpa || !student.english_level || !student.extra || !student.live || !student.computer_skills || !student.prepare || !student.game || !skills){
        showError("please fill all case");
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
            const resultDiv = document.querySelector(".result");
            resultDiv.innerHTML = `
            <h2>Your Career Path Prediction</h2>
            <div class="prediction-result">
                <p><strong>Recommended Career Path:</strong> ${data["path"]}</p>
                <p><strong>Prediction Confidence:</strong> ${data["prob"]}</p>
            </div>
            `;
            resultDiv.style.display = "block";
            hide(".success-message");
        } catch (error) {
            console.error('Error:', error);
            showError("An error occurred while processing your request. Please try again.");
        }
    }
    send(student,skills);
    


})
