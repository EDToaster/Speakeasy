function getQuizLink(url) {
    var nums = url.match(/\d+/g);
    return 'https://quizlet.com/' + nums[0] + '/flashcard/embed'
}


function quizletChange(){
 let quiz = document.getElementById('quizCard');

 quiz.src = getQuizLink(document.getElementById('quizletForm').value);
 // document.getElementById('quizCard').src = document.getElementById('quizCard').src

}
document.getElementById('getQuiz').addEventListener("click", quizletChange);

