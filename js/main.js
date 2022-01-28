
// Call main class of any pages
var home_page = document.querySelector("#home-page")
var add_question_page = document.querySelector('#add-question-page')

// Call the button for click
var btnCreateQuestion = document.querySelector("#btnCreate")
var btnBack = document.querySelector("#btnBack")
let addQuestion = () =>{
    // Hide the page don't need(home page)
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
    // showTask()
}

// Function to change the type of the question(multiple choice or )===========================================
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


// Get value from the input question=======================================================================
let getQuestion = () =>{
    // To the call the class of the question and aswers
    let titleQuestion = document.querySelector('.add-question');
    let answers = document.querySelectorAll('.answer')
    let selects = document.getElementsByName('answer')
    let choice = document.querySelector('.choice')
    var dataList = {}
    dataList.type_of_question = choice.value
    for (let i = 0; i < answers.length; i++){
        if (answers[i].value){
            dataList['answer_'+ (i+1)]= answers[i].value
        }
    }
    let corrected_answer = 1
    let choose_answer = false
    for (let i = 0; i < selects.length; i++){
        if (selects[i].checked){
            dataList[corrected_answer] = i;
            choose_answer = true
            corrected_answer += 1
            selects[i].checked=false
        }
    }
    // validation input=========================================================================
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
    showTask();
    console.log(data)
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

// To add data to local storage
let saveData = document.querySelector(".btn-save")
function addDataToLocalStorage(){
    let quizTitle = document.querySelector(".quiz-title").value
    if (data.length >0 && quizTitle !== "") {
        let title_quiz = {}
        title_quiz["title_quiz"] = quizTitle
        data.push(title_quiz)
        let data_dictionary = JSON.stringify(data)
        localStorage.setItem('data'+localStorage.length, data_dictionary)
        data = []
        location.reload();
    }else if(quizTitle == ""){
        window.alert("Please put your title of your quiz")
    }else{
        window.alert("Please Ceate Your Quiz")
    }
}
saveData.addEventListener('click', addDataToLocalStorage)

// ========================Function for random question================================
function shuffle(array) {
    for (let i = array.length-2; i > 0; i--) {
      let index = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[index];
      array[index] = temp;
    }
    return array;
  }
// show the task that user create
function showTask(){
    // Create element to contain the show task
    let removeObj = document.querySelector('#add-question-page');
    let ObjToRemove = document.getElementsByClassName('show-task');
    let comp = ObjToRemove.length;
    let comNum = 0;
    // Check to remove the previous answers
    if (data.length>=0){
        while(comNum<comp){
            removeObj.removeChild(ObjToRemove[0]);
            comNum += 1;
        }
    }
    // Check to Create all the value from data
    for (Index=0; Index<data.length; Index++){
        // create to contain all the element of showing the task user created
        let show_task = document.createElement('div');
        show_task.className='show-task';

        // create to add the question
        let show_question = document.createElement('div');
        show_question.className='show-question';
        show_question.textContent=data[Index]["title_question"];
        show_task.appendChild(show_question);
        

        // check to create and add the answer
        for (i=0; i<4; i++){
            let contain_answer = document.createElement('div');
            contain_answer.className='contain-answer';
    
            let answer_type = document.createElement('li');
            // if (data[Index]['type_of_question']=='radio'){     
            //     answer_type.className='radio';
            // } else{
            //     answer_type.className='checkbox'
            // }
            
            let answer_value = document.createElement('p');
            answer_value.className='answer-value';
            answer_value.textContent=data[Index]['answer'+'_' + (i+1)];

            // check to find the correct answers
            for (index=0; index<5; index++){
                if (i==data[Index][index]){
                    answer_type.className = 'correct';
                }
            }
            contain_answer.appendChild(answer_type);
            contain_answer.appendChild(answer_value);
            show_task.appendChild(contain_answer);
        }

        // create to contain the button delete and button edit
        let button_group = document.createElement('div');
        button_group.className='button-group';
        button_group.id=Index;
        // create for button edit
        let button_edit = document.createElement('button');
        button_edit.className='button-edit';
        button_edit.type='button';
        button_edit.textContent='Edit';
        button_edit.addEventListener('click', editeTask);
        button_group.appendChild(button_edit);

        // create for button delet
        let button_delete = document.createElement('button');
        button_delete.className='button-delete';
        button_delete.type='button';
        button_delete.textContent='Delete';
        button_group.appendChild(button_delete);
        show_task.appendChild(button_group);
        button_delete.addEventListener('click', deleteTask);
        document.querySelector('#add-question-page').appendChild(show_task);
    }
}

// delete the task when user click on button delete
function deleteTask(event){
    let pare = event.target;
    let deleteTask = pare.parentNode.id;
    // console.log(deleteTask);
    data.splice(deleteTask, 1);
    showTask();
}

// Edite task when user click on button Edite
function editeTask(event){
    let editQuestion = document.querySelector('.add-question');
    let editAnswers = document.querySelectorAll('.answer')
    // let selects = document.getElementsByName('answer')
    // let choice = document.querySelector('.choice')
    if (editQuestion.value == "" && editAnswers[0].value == "" && editAnswers[1].value == ""&& editAnswers[1].value == ""&& editAnswers[3].value == ""){
        let edits = event.target.parentNode.id;
        let dataTask = data[edits];
        deleteTask(event);

        let editeQuestion = document.querySelector('.add-question');
        editeQuestion.value= dataTask['title_question'];
        for (i=0; i<4; i++){
            // for display the same answers that user want to edit
            let answerEdit = document.getElementsByClassName('answer')[i];
            answerEdit.value=dataTask['answer_'+(i+1)];
            
            // check for the correct answer that user had been check
            let check_answer_edit = document.getElementsByClassName('type-of-input');
            for (index=1; index<5; index++){
                if (i==dataTask[index]){
                    check_answer_edit[i].checked=true;
                }
            }
            
        }
    }else{
        window.alert('You need to make you create task Empty First')
    }
}

// ===========================Dispay Quiz========================VeangLy code---
// ------------------Data structure storage--------------------------------------
let dat_test= [
    {1: 1, 2: 3,
    an: "I lvoe cambodia1111.",
    answer_1:"Love", answer_2: "Hate", 
    answer_3: "Fall in", answer_4: "Want date",
     title_question: "What do you mean?"
   },
    {   1: 0, 2: 2, 3:3,
        title_question: "What do you like?",
        answer_1: "apple",
        answer_2: "ice cream",
        answer_3: "orange",
        answer_4: "mango",
    },
    {   1:3,
        title_question: "Where do Bopha live?",
        answer_1: "BTB",
        answer_2: "RTK",
        answer_3: "KPC",
        answer_4: "BMC",
    },
    {   1:0,
        title_question: "Who is Key crush Today?",
        answer_1: "Liza",
        answer_2: "Pisey",
        answer_3: "Yu Ry",
        answer_4: "Raby",
        corrected: "Liza",
    },
    {   1:2,
        title_question: "What ...... you do for him?",
        answer_1: "Would",
        answer_2: "Will",
        answer_3: "Will be",
        answer_4: "Would be",
        
    },
    {   1:0,
        title_question: "He've......(be) to Cambodia about three time.",
        answer_1: "been",
        answer_2: "being",
        answer_3: "had been",
        answer_4: "have been",
    },
    {   1:3,
        title_question: "I live ...........Cambodia.",
        answer_1: "at",
        answer_2: "on",
        answer_3: "in",
        answer_4: "of",
    },
    {   1:0,
        title_question: "Ronal do is the ..... footbaler in the world.",
        answer_1: "best",
        answer_2: "good",
        answer_3: "Well",
        answer_4: "Exerlenct",
    },
    {   1:3,
        title_question: "Car is ......... than bike.",
        answer_1: "fastest",
        answer_2: "fastest than",
        answer_3: "faster than",
        answer_4: "faster",
    },
    {   1:1,
        title_question: "What does IP stand for?",
        answer_1: "Internet Parking",
        answer_2: "Internet Protocol",
        answer_3: "Internet Price",
        answer_4: "Internet Push",
    },
    {   1:3,
        title_question: "Where is the Ankor Wat tample?",
        answer_1: "Prey Veng",
        answer_2: "Kep",
        answer_3: "Siem Reap",
        answer_4: "Koh Kong",
    },
    {title_quiz: "General knowledge"}
];

let randomQuiz = shuffle(dat_test)
//------------------------------Create The template------------------------------
let global_Index = 0;
let total_Score = 0;
let number_Of_Click = 0;
document.querySelector("#move")
function create_Quiz(parater) {   // Create the quiz by data structur to html...
    if(global_Index < parater.length-1){       
        let start = parater[global_Index];
        document.getElementById("question_Add").textContent = start.title_question;
        document.getElementById("btn-1").textContent = start.answer_1;
        document.getElementById("btn-2").textContent = start.answer_2;
        document.getElementById("btn-3").textContent = start.answer_3;
        document.getElementById("btn-4").textContent = start.answer_4;
        document.getElementById("question_Number").textContent = global_Index+1 + "/"+ (parater.length-1);

        if(global_Index == 0){
        let div = document.createElement("div");     //Create button move question...
        div.className="btn_Move";
        document.body.appendChild(div);
        let move_btn=document.createElement("button");
        move_btn.id="move";
        move_btn.className="blue";
        move_btn.textContent="Next >";
        div.appendChild(move_btn);                    // Move the question
        document.getElementById("move").onclick = function (){create_Quiz(randomQuiz)}
        }
        document.querySelector("#move").style.background="";
    }
    global_Index += 1;
    number_Of_Click = global_Index;
}
// -----------Create button Click---------------------------------------
let button_Click = document.getElementsByClassName("btn"); // Get button for click...
for(let click of button_Click){click.addEventListener("click",getClick);}
function getClick(event) {   // Click function...........
    let start = dat_test[global_Index-1];
    let targets = event.target;
    for(let i = 0;i<button_Click.length;i++){
        if(targets.textContent == button_Click[i].textContent){
            if(i==start[1]){
                total_Score += 30;
            }else if(i==start[2]){
                total_Score += 30;
            }else if(i==start[3]){
                total_Score += 30;
            }
        }
    }
    document.querySelector("#move").style.background="blue";
}
function start_Quiz() {
    document.getElementsByClassName("btn_Start")[0].style.display = "none";
    document.getElementsByClassName("quiz_Container")[0].style.display = "block";
    create_Quiz(dat_test);
}
function get_Into_Quiz(){
    document.getElementsByClassName("container")[0].style.display="none";
    let div = document.createElement("div");
    div.className="btn_Start";
    document.body.appendChild(div);
    let start_btn=document.createElement("button");
    start_btn.id="start";
    start_btn.textContent="START >";
    div.appendChild(start_btn);
    document.getElementById("start").style.display="block";
    document.getElementById("start").onclick = function (){start_Quiz()} //<!--Get start------->
}
// -----------Group Button Click-----------------------------------
var btn_get_Quiz= document.getElementById("btnQuiz");    //Get into the Quiz....
btn_get_Quiz.addEventListener("click",get_Into_Quiz)