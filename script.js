document.addEventListener('DOMContentLoaded', function () {
    let buttons = document.querySelectorAll('#choose-buttons button');

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            buttons.forEach(function(btn) {
                btn.classList.remove('active');
            });

            button.classList.add('active');
        });
    });
});