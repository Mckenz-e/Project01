export const showMessage = (el, message, type = 'danger', errors = []) => {
  let html = `<div><div>${message}</div>`;
  if (errors.length) {
    html += '<ul>' + errors.map((e) => `<li>${e}</li>`).join('') + '</ul>';
  }
  html += '</div>';
  el.innerHTML = html;
  el.className = `message ${type}`;
};

export const getInputValue = (name) =>
  document.querySelector(`input[name="${name}"]`)?.value ?? '';

export const getById = (id) => document.getElementById(id)?.value ?? '';

export const setById = (id, value) => {
  const el = document.getElementById(id);
  if (el) el.value = value;
};
