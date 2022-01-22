// home page
let homePage = () =>{ 
    // 1. Logo
        // create element and class of elemen of logo
    let container = document.createElement('div')
    container.className = 'container-home'
    let logo = document.createElement('div')
    logo.className = 'logo'
    let img = document.createElement('img')
        // To append element to the container and append container to body
    document.body.appendChild(container)
    container.appendChild(logo)
    logo.appendChild(img)
    img.src = 'images/logo.png'
    //2 Title of app
    let h1 = document.createElement('h1')
    h1.className = 'page-title'
    h1.textContent = '2022-QUEZ-APP-G14'
    container.appendChild(h1)
    // 3. Button click to continue quiz and create quiz
        // creat button and class
    let groupBtn = document.createElement('div')
    groupBtn.className = 'group-btn'
    let btnQuiz = document.createElement('button')
    btnQuiz.id = "btnQuiz"
    btnQuiz.className = 'btn-click'
    btnQuiz.textContent = 'QUIZ'
    let btnCreate = document.createElement('button')
    btnCreate.id = 'btnCreate'
    btnCreate.className = 'btn-click'
    btnCreate.textContent = 'CREATE'
        // Append it to container
    groupBtn.appendChild(btnQuiz)
    groupBtn.appendChild(btnCreate)
    container.appendChild(groupBtn)

    // 3. Create element ul and li to descript about button
        // create elemen
    let ul = document.createElement('ul')
    ul.className = 'item-center'
    let li1 = document.createElement('li')
    li1.textContent = 'Click "CREATE" to create quiz that you want'
    let li2 = document.createElement('li')
    li2.textContent= 'Click "QUIZ" to start to do the exercise in this website'
        // append it to container
    ul.appendChild(li1)
    ul.appendChild(li2)
    container.appendChild(ul)
    
}

homePage()
