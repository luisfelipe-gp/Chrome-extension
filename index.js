let myLeads = []
const inputBtn = document.getElementById("input-btn")
const inputEl = document.getElementById("input-el")
const ulEL = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")



if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})



deleteBtn.addEventListener("click", function(){
    console.log("dblclick")
    localStorage.clear()
    myLeads = []
    render(myLeads)

})


inputBtn.addEventListener("click", function(){

    myLeads.push(inputEl.value)
    //console.log(myLeads)
    inputEl.value = ""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
    //console.log( localStorage.getItem("myLeads") )
})




function render(leads){

    let listItems = ""

    for ( let i = 0; i < myLeads.length; i++){
        //ulEL.innerHTML += "<li>" + myLeads[i] + "</li>"
    
        //let li = document.createElement("li")
        //li.innerHTML = myLeads[i]
        //ulEL.append(li)
    
        //listItems += "<li>" + myLeads[i] + "</li>"


        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    
    }
    ulEL.innerHTML = listItems
}
