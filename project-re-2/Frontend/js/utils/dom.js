/**
 * Show a success or error message in a DOM element.
 * @param {HTMLElement} el
 * @param {string} message
 * @param {'success'|'danger'} type
 * @param {string[]} errors
 */
export const showMessage = (el, message, type = 'danger', errors = []) => {
  let html = `<div><div>${message}</div>`;
  if (errors.length) {
    html += '<ul>' + errors.map((e) => `<li>${e}</li>`).join('') + '</ul>';
  }
  html += '</div>';
  el.innerHTML = html;
  el.className = `message ${type}`;
};

/**
 * Get value of an input by name selector.
 * @param {string} name
 */
export const getInputValue = (name) =>
  document.querySelector(`input[name="${name}"]`)?.value ?? '';

/**
 * Get value of element by id.
 * @param {string} id
 */
export const getById = (id) => document.getElementById(id)?.value ?? '';

/**
 * Set value of element by id.
 * @param {string} id
 * @param {*} value
 */
export const setById = (id, value) => {
  const el = document.getElementById(id);
  if (el) el.value = value;
};
