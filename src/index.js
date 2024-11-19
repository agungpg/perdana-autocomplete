import './styles/main.css';

var SC_OBJ = {};
var SEARCH_EL_OBJ = {};
var LIST = {};
var CONTAINERS = {}

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


/**
 * Initializes a autocomplete text field.
 *
* @param {Array<Object>} items - The array of item objects.
 * @param {string} items[].id - The ID of the item.
 * @param {string} items[].name - The name of the item.
 * @param {string} [id='auto-complete-1'] - The id of input element that want to be changed to autocomplete.
 * @param {Object} withButton - The withButton object.
 * @param {string} withButton.id - The id of the button.
 * @param {string} withButton.className - The className of the button.
 * @param {string} withButton.text - The text of the button.
 * @param {string} withButton.textColor - The textColor of the button.
 * @param {string} withButton.backgroundColor - The backgroundColor of the button.
 * @param {string} withButton.iconSrc - The iconSrc of the button.
 * @param {string} withButton.iconAlt - The iconAlt of the button.
 * @param {string} withButton.onClick - The onClick of the button.
 */

function init({
  list,
  id,
  withButton
}) {
  const suggestContId = "pg-suggestion-cont"+id
  LIST[id] = list;

  //create container
  CONTAINERS[id] = PerdanaAutoComplete.createElement('div', `pg-cont-${id}`, 'pg-cont')
  document.getElementById(id).insertAdjacentElement('afterend', CONTAINERS[id]);
  
  // remove default text input element
  document.getElementById(id).remove()

  // create text input auto-complete
  const textInput = PerdanaAutoComplete.createElement('input', id, 'pg-inp-auto-comp')
  SEARCH_EL_OBJ[id] = textInput;
  CONTAINERS[id].append(SEARCH_EL_OBJ[id])

  if(withButton) addButton(id, withButton)

  // const {offsetHeight} =textInput.offsetHeight
  const suggestionEl = PerdanaAutoComplete.createElement('ul', suggestContId, "pg-suggest-cont")
  suggestionEl.style.top = `${textInput.offsetHeight+12}px`
  
  // Insert the new element after the target
  SEARCH_EL_OBJ[id].insertAdjacentElement('afterend', suggestionEl);
  SC_OBJ[id] = document.getElementById(suggestContId);
  
  //event
  SEARCH_EL_OBJ[id].addEventListener("keyup", (event) => PerdanaAutoComplete.search(event, id));
  SEARCH_EL_OBJ[id].addEventListener('blur', () => PerdanaAutoComplete.hideList(id))
}

function addButton(id, props) {
    const btn = PerdanaAutoComplete.createElement('button', props.id ?? '', props.className ?? '')
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    btn.style.borderRadius = '4px';
    btn.style.backgroundColor = props.backgroundColor ?? 'transparent'
    btn.style.color = props.textColor ?? "#000"
    btn.style.height = '46px';
    btn.style.padding = '0 8px';

    let icon = undefined;
    if(props.iconSrc) {
      icon = PerdanaAutoComplete.createElement('img','', '')
      icon.src = props.iconSrc
      icon.height =28
      icon.width = 28
      if(props.iconAlt) icon.alt = props.iconAlt;
    } else {
      btn.style.fontWeight=  '600'
    }
    if(props.onClick) {
      btn.onclick = () => props.onClick(id, SEARCH_EL_OBJ[id].value);
    }

    btn.append(icon ?? props.text)
    
    if(props?.position == 'left') {
      // Append the new element before the reference element
      CONTAINERS[id].insertBefore(btn, SEARCH_EL_OBJ[id]);
    } else {
      SEARCH_EL_OBJ[id].insertAdjacentElement('afterend', btn)
    }

    CONTAINERS[id].style.display = 'flex';
    CONTAINERS[id].style.alignItems = 'center';
    CONTAINERS[id].style.gap = '4px';
}

export {
  init,
  onClickItem,
  search,
  hideList,
  createElement,
}