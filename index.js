// DOM elements
const buttons = document.querySelectorAll('button');
const form = document.querySelector('form');
const formActivity = document.querySelector('form span');
const input = document.querySelector('input');
const error = document.querySelector('.error');

var activity = 'cycling';

buttons.forEach(btn => {
    btn.addEventListener('click', e => {
        // get activity
        activity = e.target.dataset.activity;
        // remove and add active class
        buttons.forEach(btn => btn.classList.remove('active')); 
        e.target.classList.add('active');
        // set ID of input field
        input.setAttribute('id', activity);
        // set text of form span
        formActivity.textContent = activity;
        // call update function
        update(data);
    });
});

// form submit
form.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();
    const distance = parseInt(input.value);
    if(distance){
        db.collection('activities').add({
            distance,
            activity,
            date: new Date().toString()
        }).then(() => {
            error.textContent = "";
            input.value = "";
        }).catch(err => console.log(err));
    } else {
        error.textContent = 'Please enter a valid number.'
    }
});