export function insertElement (tag, innerText, parentNode) {
  parentNode.innerHTML = parentNode.innerHTML + `<${tag}>${innerText}</${tag}`
}
