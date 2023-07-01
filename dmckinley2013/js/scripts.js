document.addEventListener("DOMContentLoaded", function(){
    var navItems = document.querySelectorAll('.nav-item');

    window.showSection = function(id) {
        var sections = document.querySelectorAll('.section');
        sections.forEach(function(section) {
            section.style.display = 'none';
        });

        navItems.forEach(function(navItem) {
            navItem.querySelector('.nav-link').classList.remove('active');
        });

        document.getElementById(id).style.display = 'block';
        document.querySelector(`[onclick="showSection('${id}')"]`).classList.add('active');
    }

    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');

    quizForm.addEventListener('submit', function(event) {
        event.preventDefault();
        calculateResult();
    });


    function calculateResult() {
        const results = {
            dog: 0,
            cat: 0,
            fish: 0
        };

        //needed weights for questions as they arent balanced that well without it. still needs a bit of work.
        const weights = [3, 2, 3, 3, 1];

        const questions = document.querySelectorAll('.quiz-question');

        questions.forEach((question, index) => {
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            if (selectedOption) {
                results[selectedOption.value] += weights[index];
            }
        });

        let finalResult = 'dog';
        let finalImage = 'assets/dog.jpg';
        if (results.cat > results.dog && results.cat > results.fish) {
            finalResult = 'cat';
            finalImage = 'assets/cat.jpg';
        } else if (results.fish > results.dog && results.fish > results.cat) {
            finalResult = 'fish';
            finalImage = 'assets/fish.jpg';
        }

        quizResult.textContent = `You should adopt a ${finalResult}!`;
        document.getElementById('quiz-image').innerHTML = `<img src="${finalImage}" alt="${finalResult} Image">`;
    }

    showSection('profile');
});



