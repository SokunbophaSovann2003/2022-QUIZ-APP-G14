
// Call main class of any pages
var home_page = document.querySelector("#home-page")
var add_question_page = document.querySelector('#add-question-page')

// Call the button for click
var btnCreateQuestion = document.querySelector("#btnCreate")
var btnBack = document.querySelector("#btnBack")
let addQuestion = () =>{
    // Hide the page don't need
    home_page.style.display = 'none'
    // Show the page add question
    add_question_page.style.display = 'block'
    // get element to input answer and choose the correct answer and add to data
    let choose = document.querySelector(".choice");
    let create = document.querySelector('.create')
    // Add the listener 
    choose.addEventListener('click',changOption);
    create.addEventListener('click', getQuestion)
    btnBack.addEventListener('click', homePage)
}

// Function to change the type of the question(multiple choice or )
function changOption(){
    let inputAnswer = document.querySelectorAll('.type-of-input');
    if (document.querySelector(".choice").value == 'checkbox'){
        for (i=0; i<inputAnswer.length; i++){
            document.getElementsByClassName('type-of-input')[i].type = 'checkbox';
        }
    }else{
        for (i=0; i<inputAnswer.length; i++){
            document.getElementsByClassName('type-of-input')[i].type = 'radio';
        }
    }
}
// Get value from the input question====================
let getQuestion = () =>{
    // To the call the class of the question and aswers
    let titleQuestion = document.querySelector('.add-question');
    let answers = document.querySelectorAll('.answer')
    let selects = document.getElementsByName('answer')
    let choice = document.querySelector('.choice')
    let dataList = {}
    dataList.type_of_question = choice.value
    for (let i = 0; i < answers.length; i++){
        if (answers[i].value){
            dataList['answer'+'_'+ (i+1)]= answers[i].value
        }
    }
    let corrected_answer = 1
    let choose_answer = false
    for (let i = 0; i < selects.length; i++){
        if (selects[i].checked){
            dataList['crection'+"_" + corrected_answer] = answers[i].value
            choose_answer = true
            corrected_answer += 1
        }
    }
    // Alert to tell user when the user don't complete all the condition 
    if (titleQuestion.value !== "" && answers[0].value !== "" && answers[1].value !== ""&& answers[1].value !== ""&& answers[3].value !== "" && choose_answer){
        dataList.title_question = titleQuestion.value
        data.push(dataList)
        // reset the value to empty
        titleQuestion.value = ""
        for (input of answers){
            input.value = ""
        }
        // To alert when user don't create the question and click start
    }else if (titleQuestion.value == ""){
        window.alert("Please input your question!")
        // To alert when user don't input the answers and click start
    }else if(answers[0].value == "" || answers[1].value == ""|| answers[1].value == ""|| answers[3].value == ""){
        window.alert("You have to input your answer all places!")
    }else{
        window.alert("Please choose the correct answer!")
    }
}
function homePage(){
    // To hide the pages that don't need
    add_question_page.style.display = 'none'
    btnCreateQuestion.addEventListener('click', addQuestion)
    // Show the page that we need
    home_page.style.display = "block"
}
homePage()

// Variable to store data
let data = []