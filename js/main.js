
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
    let data_dictionary = JSON.stringify(data)
    if (data.length >0){
        localStorage.setItem('data'+localStorage.length, data_dictionary)
        data = []
        location.reload();
    }else{
        window.alert("Please Ceate Your Quiz")
    }
}
saveData.addEventListener('click', addDataToLocalStorage)
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
