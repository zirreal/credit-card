import {el, setChildren} from 'redom';

const main = el('main');
const container = el('div', {class: 'container'});

const titleBlock = el('div', {class: 'title'}, [el('h1', 'SIMPLE PAY')]);

const form = el('form', {class: 'form'}, [
  el('.card-wrapper'),
  el('.form-container', [
    el('label', {class: 'form__label'}, [
      el('input', {class: 'card-input card-name',  type: 'text', name: 'first-name', placeholder: 'Ваше имя' }),
      el('span', {class: 'valid-span'})
    ]),
    el('label', {class: 'form__label'}, [
      el('input', {class: 'card-input card-lastname',  type: 'text', name: 'last-name', placeholder: 'Ваша фамилия' }),
      el('span', {class: 'valid-span'})
    ]),
    el('label', {class: 'form__label'}, [
      el('input', {class: 'card-input card-number',  type: 'text', name: 'number', placeholder: 'Номер карты' }),
      el('span', {class: 'valid-span'})
    ]),
    el('label', {class: 'form__label'}, [
      el('input', {class: 'card-input card-expiry',  type: 'text', name: 'expiry', placeholder: 'MM / ГГ' }),
      el('span', {class: 'valid-span'})
    ]),
    el('label', {class: 'form__label'}, [
      el('input', {class: 'card-input card-cvv',  type: 'text', name: 'cvc', placeholder: 'CVV' }),
      el('span', {class: 'valid-span'})
    ]),
    el('label', {class: 'form__label'}, [
      el('input', {class: 'card-input card-email',  type: 'email', name: 'email', placeholder: 'Email' }),
      el('span', {class: 'valid-span'})
    ]),
    el('button', {disabled: true, class: 'btn card-btn', type: 'submit'}, 'Оплатить')
  ])
]);

setChildren(window.document.body, main);
setChildren(main, container);
setChildren(container, [
  titleBlock,
  form
])



