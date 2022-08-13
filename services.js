var ratings = [1, 2, 3, 4, 5];

let feedbackbutton = document.querySelector('.btnFeedback');

for (let i = 0; i < ratings.length; i++) {
    var previous = 'ratingId1';
    let rating = document.createElement('p');

    rating.innerHTML = ratings[i];

    document.body.querySelector('.ratingCard').append(rating, feedbackbutton);

    rating.className = 'rating';
    rating.id = `ratingId${i}`;

    document.querySelector(`#ratingId${i}`).addEventListener('click', function () {
        document.querySelector('#' + previous).style.backgroundColor = "hsl(213, 19%, 25%)";
        document.querySelector(`#ratingId${i}`).style.backgroundColor = "hsl(25, 97%, 53%)";
        document.querySelector(`#ratingId${i}`).removeEventListener('mouseover', mouseoverNumbers);
        document.querySelector(`#ratingId${i}`).removeEventListener('mouseout', mouseoutNumbers);
        previous = `ratingId${i}`;
        //targetedFeedbackResult puts a number in html that will be used later by afterClickFeedback & finalFeedbackResult.
        let targetedFeedbackResult = i + 1;
        document.body.querySelector('.hiddenFeedbackResult').innerHTML = targetedFeedbackResult;
    })

    document.querySelector(`#ratingId${i}`).addEventListener('mouseover', mouseoverNumbers);

    function mouseoverNumbers() {
        document.querySelector(`#ratingId${i}`).style.backgroundColor = 'hsl(217, 12%, 63%)';
        document.querySelector(`#ratingId${i}`).style.color = 'black';
        let k = document.querySelector(`#ratingId${i}`);
        let individualFeedback = document.querySelector('#feedbackCardText');
        switch (k) {
            case document.getElementById('ratingId0'):
                individualFeedback.innerHTML = 'We feel very sorry! There is a lot for us to improve';
                break;
            case document.getElementById('ratingId1'):
                individualFeedback.innerHTML = 'Not good news for us!We will do our best:)';
                break;
            case document.getElementById('ratingId2'):
                individualFeedback.innerHTML = 'Well! We admit that we could do better!We will not regret you next time:)';
                break;
            case document.getElementById('ratingId3'):
                individualFeedback.innerHTML = 'Good news! That is awesome that you are happy with our service. ';
                break;
            case document.getElementById('ratingId4'):
                individualFeedback.innerHTML = 'Hurray!! We will keep doing as it was so far!';
        }
    }

    document.querySelector(`#ratingId${i}`).addEventListener('mouseout', mouseoutNumbers);
    function mouseoutNumbers() {
        document.querySelector(`#ratingId${i}`).style.backgroundColor = 'hsl(213, 19%, 25%)';
        document.querySelector(`#ratingId${i}`).style.color = 'hsl(217, 12%, 63%)';
        document.querySelector('#feedbackCardText').innerHTML = 'Please let us know how we did with your support request.'
    }

    feedbackbutton.addEventListener('mouseover', mouseoverFeedbackBtn);
    function mouseoverFeedbackBtn() {
        feedbackbutton.style.backgroundColor = 'white';
        feedbackbutton.style.color = 'hsl(25, 97%, 53%)';
    }

    feedbackbutton.addEventListener('mouseout', mouseoutFeedbackBtn);
    function mouseoutFeedbackBtn() {
        feedbackbutton.style.backgroundColor = 'hsl(25, 97%, 53%)';
        feedbackbutton.style.color = 'white';
    }

    feedbackbutton.addEventListener('click', feedbackThanks);
    function feedbackThanks() {
        document.querySelector('.feedbackTitle').innerHTML = 'Thank you!';
        document.querySelector('.btnFeedback').style.display = 'none';
        document.querySelector('.svgFeedback').style.display = 'none';
        document.querySelector('.finalFeedbackResult').style.display = 'block';
        document.querySelector('.feedbackTitle').className = 'feedbackTitleAfterSubmit';
        document.querySelector('.thanksImg').style.display = 'block';
        document.querySelector('#feedbackCardText').innerHTML = 'We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!';

        if (document.body.querySelector('.hiddenFeedbackResult').innerHTML) {
            afterClickFeedback = document.body.querySelector('.hiddenFeedbackResult').innerHTML;
            document.querySelector('.finalFeedbackResult').innerHTML =
                ` You gave us ${afterClickFeedback} out of 5`;
        } else {
            document.querySelector('.finalFeedbackResult').innerHTML =
                'oops! You did not give any feedback';
        }

        document.querySelector('.finalFeedbackResult').className = 'finalFeedbackResult2';
        document.querySelector('#feedbackCardText').id = 'feedbackCardText2';

        let toHideNumbers = document.querySelectorAll('.rating');
        for (let j = 0; j < toHideNumbers.length; j++) {
            toHideNumbers[j].style.display = 'none';
        }
    }
}