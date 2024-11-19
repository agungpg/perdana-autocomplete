import './styles/main.css';

var SC_OBJ = {};
var SEARCH_EL_OBJ = {};
var LIST = {};

function onClickItem(e, id){
  console.log("onClickItem is clicked")
  SC_OBJ[id].innerHTML = ''
  SEARCH_EL_OBJ[id].value = e.innerText.trim();
} 

var timeout;
function search(event, id){
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    SC_OBJ[id].classList.remove("hidden")
    const filterred = LIST[id]
                      .filter((item) => item.name.includes(event.target.value))
                      .reduce((res, item) => {
                        return res += `<li onclick="PerdanaAutoComplete.onClickItem(this, '${id}')" class="pg-suggestion-item">
                                         ${item.name}
                                       </li>`
                       }, ``)
     SC_OBJ[id].innerHTML = filterred
  }, 1000)
}

function hideList(id) {
    setTimeout(() => {
      SC_OBJ[id].classList.add("hidden")
    },10)
}

function createElement(tag, id, className) {
  const el = document.createElement(tag)
  if(className) el.classList.add(className);
  if(id) el.id = id;

  return el
}

function init({
  list,
  id
}) {
  console.log("===== PerdanaAutoComplete =====")
  const suggestContId = "pg-suggestion-cont"+id
  LIST[id] = list;

  //create container
  const containerEl = PerdanaAutoComplete.createElement('div', `pg-cont-${id}`, 'pg-cont')
  document.getElementById(id).insertAdjacentElement('afterend', containerEl);
  
  // remove default text input element
  document.getElementById(id).remove()

  // create text input auto-complete
  const textInput = PerdanaAutoComplete.createElement('input', id, 'pg-inp-auto-comp')
  SEARCH_EL_OBJ[id] = textInput;
  containerEl.append(SEARCH_EL_OBJ[id])


  const suggestionEl = PerdanaAutoComplete.createElement('li', suggestContId, "pg-suggest-cont")
  
  // Insert the new element after the target
  SEARCH_EL_OBJ[id].insertAdjacentElement('afterend', suggestionEl);
  SC_OBJ[id] = document.getElementById(suggestContId);
  
  //event
  SEARCH_EL_OBJ[id].addEventListener("keyup", (event) => PerdanaAutoComplete.search(event, id));
  SEARCH_EL_OBJ[id].addEventListener('blur', () => PerdanaAutoComplete.hideList(id))
}
export {
  init,
  onClickItem,
  search,
  hideList,
  createElement,
}