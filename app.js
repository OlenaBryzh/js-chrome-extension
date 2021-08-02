let myLeads = []
const inputEl = document.getElementById("input-el")
const saveInputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const saveTabBtn = document.getElementById("tab-btn")

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}
// the piece of the logic which allows to render input's/ tab's values on the screen
function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
  }
    ulEl.innerHTML = listItems  
}
// save input value into the localStorage and render it on the screen
saveInputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value)
  inputEl.value = ""
  localStorage.setItem("myLeads", JSON.stringify(myLeads) )
  render(myLeads)
})
// save the current tab into the localStorage and render its value on the screen
saveTabBtn.addEventListener("click", function(){    
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      myLeads.push(tabs[0].url)
      localStorage.setItem("myLeads", JSON.stringify(myLeads) )
      render(myLeads)
  })
})
// clear the localStorage and delete items that were rendered on the screen before
deleteBtn.addEventListener("click", function() {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

