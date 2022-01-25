
let homePage = () =>{ 

    let container = document.createElement('div');
    container.className = 'container';
    container.className = 'container_home';
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
    console.log(container)
}
// homePage()


let createQuestion = document.querySelector("#btnCreate")
// let addQuestion = () =>{
//     let container = document.querySelector('.create-question');

//     console.log(container)

// }
// Function to change the type of the question when the user want 
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
    console.log(data)
}
let data = []
// get element to input answer and choose the correct answer
let choose = document.querySelector(".choice");
let create = document.querySelector('.create')
choose.addEventListener('click',changOption);
create.addEventListener('click', getQuestion)

