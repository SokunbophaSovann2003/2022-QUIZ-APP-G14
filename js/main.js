
let homePage = () =>{ 

    // addLogo()
    let container = document.createElement('div');
    container.className = 'container';
    // 1. Logo
        // create element and class of elemen of logo
    let logo = document.createElement('div');
    logo.className = 'logo';
    let img = document.createElement('img');
        // To append element to the container and append container to body
    document.body.appendChild(container);
    container.appendChild(logo);
    logo.appendChild(img);
    img.src = 'images/logo.png';
    // 2 Title of app
    let h1 = document.createElement('h1');
    h1.className = 'page-title';
    h1.textContent = '2022-QUEZ-APP-G14';
    container.appendChild(h1);
    // 3. Button click to continue quiz and create quiz
        // creat button and class
    let groupBtn = document.createElement('div');
    groupBtn.className = 'group-btn';
    let btnQuiz = document.createElement('button');
    btnQuiz.id = "btnQuiz";
    btnQuiz.className = 'btn-click';
    btnQuiz.textContent = 'QUIZ';
    let btnCreate = document.createElement('button');
    btnCreate.id = 'btnCreate';
    btnCreate.className = 'btn-click';
    btnCreate.textContent = 'CREATE';
        // Append it to container
    groupBtn.appendChild(btnQuiz);
    groupBtn.appendChild(btnCreate);
    container.appendChild(groupBtn);

    // 3. Create element ul and li to descript about button
        // create elemen
    let ul = document.createElement('ul');
    ul.className = 'item-center';
    let li1 = document.createElement('li');
    li1.textContent = 'Click "CREATE" to create quiz that you want';
    let li2 = document.createElement('li');
    li2.textContent= 'Click "QUIZ" to start to do the exercise in this website';
        // append it to container
    ul.appendChild(li1);
    ul.appendChild(li2);
    container.appendChild(ul);
    
}
// homePage()





let createQuestion = document.querySelector("#btnCreate")
let addQuestion = () =>{
    let container = document.createElement('div');
    container.className = 'container';
    document.body.appendChild(container);

    // 1. Title of the questions
    // create title of question
    let titleQuestion = document.createElement('div');
    titleQuestion.className = 'create-question';
    let title = document.createElement('div');
    title.className = 'title';
    let btnBack = document.createElement('button');
    btnBack.className = 'btn-back';
    btnBack.innerHTML = '&#x21E6;';
    btnBack.id="btnBack"
    let h1 = document.createElement('h1');
    h1.className = 'title-create'
    h1.textContent = 'CREATE QUESTION'
    let question = document.createElement('input');
    question.className = 'add-question';
    question.type = 'text';
    question.placeholder = "Add your question...";
        // Append it to container
    container.appendChild(titleQuestion);
    titleQuestion.appendChild(title);
    title.appendChild(btnBack);
    title.appendChild(h1);
    titleQuestion.appendChild(question);
    // Select type of the question 
    selectChoice()
    // Write your choice of the question
    writeAnswers()
    // get element to input answer and choose the correct answer
    let choose = document.querySelector(".choice");
    let create = document.querySelector('.create')
    choose.addEventListener('click',changOption);
    create.addEventListener('click', getQuestion)
}
let selectChoice = () =>{
    let container = document.querySelector('.container')
    // 2. Type of the questions 
        // create elements
    let select = document.createElement('select');
    select.className ="choice"
    let option1 = document.createElement('option')
    option1.className = 'type-of-question';
    option1.id = 'option1';
    option1.value = 'radio';
    option1.textContent = 'Option Answer';
    let option2 = document.createElement('option')
    option2.className = 'type-of-question'
    option2.id = 'option2'
    option2.value = 'checkbox';
    option2.textContent = 'Multiple Choice';
    // To append it to the container
    select.appendChild(option1);
    select.appendChild(option2);
    container.appendChild(select);
    
}
let writeAnswers = () =>{
    let container = document.querySelector('.container')
    let form = document.createElement('form');
    form.className = 'type-answer';
    let typeOfQuestion = document.querySelector('.choice')
    //3. Add form answer
    for (i= 0; i <4; i++){
        // create tag for input and answer
        let inputGroup = document.createElement('div');
        inputGroup.className ='input-group';
        
        // Create element input for select type radio or checkbox
        let input_to_select = document.createElement('input');
        let br = document.createElement("br");
        input_to_select.type = typeOfQuestion.value;
        input_to_select.name = 'answer';
        input_to_select.className = 'type-of-input';

        // input text that is the answer for the question
        let input_text = document.createElement('input');
        input_text.type = 'text';
        input_text.className = 'answer'; 
        input_text.placeholder = 'answer' + (i+1);
        
        // Append it to container
        inputGroup.appendChild(input_to_select);
        inputGroup.appendChild(input_text);
        form.appendChild(inputGroup);
        form.appendChild(br);
        container.appendChild(form);
    }
    // 4. Create button create the question and append it to container
    let btnCreate = document.createElement('button');
    btnCreate.className = 'create';
    btnCreate.id = 'create';
    btnCreate.textContent = 'CREATE';
    container.appendChild(btnCreate);
}

// Change the type of the question when the user want 
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
    let dataList = {}
    for (let i = 0; i < answers.length; i++){
        if (answers[i].value){
            dataList['answer'+'_'+ (i+1)]= answers[i].value
        }
    }
    let corrected_answer = 1
    for (let i = 0; i < selects.length; i++){
        if (selects[i].checked){
            dataList['crection'+"_" + corrected_answer] = answers[i].value
            corrected_answer += 1
        }
    }
    // Alert to tell user when the user don't complete all the condition 
    if (titleQuestion.value !== "" && answers[0].value !== "" && answers[1].value !== ""&& answers[1].value !== ""&& answers[3].value !== ""){
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
    }
}
let data = []
// createQuestion.addEventListener('click', addQuestion)
addQuestion();


