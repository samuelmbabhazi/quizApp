let forme = document.querySelector(".forme");
let myName = document.querySelector(".name");
let myEmail = document.querySelector(".email");
let myError = document.querySelector("#erreur");
let myError2 = document.querySelector("#erreur2");
let identite = document.querySelector("#identite");
let emailsid = document.querySelector("#emailsid");

// validation de formulaire
// ----------------------------------------------------------------------
forme.addEventListener("submit", function (event) {
  event.preventDefault();

  let nom = myName.value;
  let email = myEmail.value;
  identite.innerText = nom;
  emailsid.innerText = email;
  startGame();
  // Au cas ou l'utilisateur n'entre pas d'ientifiant

  if (myName.value.trim() != "" && myEmail.value.trim() != "") {
    document.querySelector(".pageAccueil").classList.add("displayerN");
    document.querySelector(".pageQuest").classList.add("displayer");
  }
  if (myName.value.trim() == "") {
    myError.innerHTML =
      "N'oubliez de renseigner votre nom avant de commencer le Quiz";

    myError.style.color = "red";
    myName.style.border = "1px solid red";
  }
  if (myEmail.value.trim() == "") {
    myError2.innerHTML =
      "N'oubliez de renseigner votre email avant de commencer le Quiz";
    myError2.style.color = "red";
    myEmail.style.border = "1px solid red";
  }
});

// Au cas ou l'utilisateur entrer de nouveau ses identifiant

forme.addEventListener("keyup", function (f) {
  if (myName.value.trim() != "") {
    myError.innerHTML = "N'oubliez de renseigner votre nom commencer le Quiz";
    myError.style.visibility = "hidden";
    myName.style.border = "0.1px solid gray";
  }
  if (myEmail.value.trim() != "") {
    myError2.innerHTML =
      "N'oublier de renseigner votre email commencer le Quiz";
    myError2.style.visibility = "hidden";
    myEmail.style.border = "0.1px solid gray";
  }
});
// --------------------------------------------------------------------
// retour a la page d'accueil
accueil.addEventListener("click", () => {
  document.querySelector(".pageEnd").classList.add("displayerN");
  return document.querySelector(".pageAccueil").classList.add("displayer");
});
// -------------------------------------------------------------------------

//Game ---------------------------------------------------------

let question = document.querySelector("#question");
let choix = Array.from(document.querySelectorAll(".choix-text"));
let suivant = document.querySelector(".suivant");
let counter = document.querySelector("#questioncounter");
let elts = Array.from(document.querySelectorAll("input[type='radio']"));

let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let availableQUestion = [];
let finalscore = document.querySelector("#score");
let image = document.querySelector("#image");

// fonction quitter
function quit() {
  document.querySelector(".pageQuest").classList.add("displayerN");
  return document.querySelector(".pageEnd").classList.add("displayer");
}

// -----------------------------------------------------------------------------------

// creation des questions et reponses
//---------------------------------------------------------------------------------
let questions = [
  {
    question: "Dans quel balise HTML est place le code javascript",
    choix1: "La balise js",
    choix2: "La balise javascript",
    choix3: "La balise script",
    choix4: "La balise rel",
    answer: 3,
  },
  {
    question: "comment faire appelle a une fonction nommee <<sum>>",
    choix1: "sum()",
    choix2: "call function sum()",
    choix3: "call sum()",
    choix4: "fonction sum()",
    answer: 1,
  },
  {
    question: "Quel est le bon endroit pour inserer un code javascript",
    choix1: "La section <head>",
    choix2: "La section <head> et <body>",
    choix3: "La section <body>",
    choix4: "La balise link",
    answer: 3,
  },
  {
    question: "Comment ecrire <<Hello World>> dans une boite d'alerte ?",
    choix1: "msg('Hello World')",
    choix2: "alert('Hello World')",
    choix3: "msgBox('Hello World')",
    choix4: "alertBox('Hello World')",
    answer: 2,
  },
  {
    question: "Comment creer une fonction en javascript ?",
    choix1: "function f()",
    choix2: "function=f()",
    choix3: "function:f()",
    choix4: "f()",
    answer: 1,
  },
  {
    question: "Comment ecrire une condition IF en javascript ?",
    choix1: "if a = 2 then",
    choix2: "if a = 2",
    choix3: "if a == 2 else",
    choix4: "if (a == 2 )",
    answer: 4,
  },
  {
    question: "lequel n'est pas une maniere de definir une variable",
    choix1: "var",
    choix2: "const",
    choix3: "let",
    choix4: "variable",
    answer: 4,
  },
  {
    question: "Comment verifier si <<a>> n'est pas egal a 2",
    choix1: "if a <> 2",
    choix2: "if (a != 2)",
    choix3: "if a =! 2 then",
    choix4: "if(a <> 2)",
    answer: 2,
  },
  {
    question: "Que vaut une variable qui n'a jamais ete assignee",
    choix1: "false",
    choix2: "Null",
    choix3: "undefined",
    choix4: "Error",

    answer: 3,
  },
  {
    question: "En javascript quel est le resultat du test 5==='5'",
    choix1: "True",
    choix2: "False",
    choix3: "Exception",
    choix4: "Null",
    answer: 2,
  },
  {
    question:
      "var Num = 12 ; Num %=2; a la suite de cette expression, combien vaut Num",
    choix1: "6",
    choix2: "14",
    choix3: "0.12",
    choix4: "0",
    answer: 4,
  },
  {
    question: "Lequel de ces types d'evenements n'existe pas ?",
    choix1: "blur",
    choix2: "load",
    choix3: "mouseclick",
    choix4: "mouseout",
    answer: 3,
  },
  {
    question:
      "Quel attribut des noeuds de l'arbre DOM correspond a l'attribut HTML class",
    choix1: "class",
    choix2: "CLASS",
    choix3: "className",
    choix4: "listName",
    answer: 3,
  },
  {
    question: "javascript a ete developpe par quelle company",
    choix1: "Netscape",
    choix2: "Java",
    choix3: "Apple",
    choix4: "Microsoft",
    answer: 1,
  },
  {
    question: "Lequel n'est pas un type de donne en javascript",
    choix1: "String",
    choix2: "Number",
    choix3: "Bigint",
    choix4: "aucune bonne reponse",
    answer: 4,
  },
];
// --------------------------------------------------------------------------------

// fonction de pour commencer le Jeux
// ---------------------------------------------------------------
// initialisation du time
let timeleft = 60;

startGame = () => {
  let downloadTime = setInterval(function () {
    document.querySelector("#progressBar").value = timeleft--;
    document.querySelector("#textCount").innerText = timeleft;
    if (timeleft === 0) {
      getNewQuestion();
    }
  }, 1000);

  questionCounter = 0;
  score = 0;
  availableQUestion = [...questions];
  getNewQuestion();
};
// ----------------------------------------------------------------

// passage a une nouvelle question
// --------------------------------------------------------------------
getNewQuestion = () => {
  timeleft = 60;
  suivant.disabled = true;
  if (availableQUestion.length === 0 || questionCounter >= 15) {
    document.querySelector(".pageQuest").classList.add("displayerN");
    return document.querySelector(".pageEnd").classList.add("displayer");
  }

  questionCounter++;

  var questionIndex = Math.floor(Math.random() * availableQUestion.length);
  currentQuestion = availableQUestion[questionIndex];
  question.innerText = currentQuestion.question;

  choix.forEach((choix) => {
    const number = choix.dataset["number"];
    choix.innerText = currentQuestion["choix" + number];
  });
  availableQUestion.splice(questionIndex, 1);

  counter.innerText = questionCounter + "/" + "15";
  elts.forEach((element) => {
    element.addEventListener("click", () => {
      suivant.disabled = false;
      element.parentNode.style.border = "0.1rem solid #028a3d";
    });
    element.parentNode.style.border = "0.1rem solid hsl(0, 0%, 83%)";
  });
};
// -----------------------------------------------------------------------

//fonction de verification du checking
// -----------------------------------------------------------------------

suivant.addEventListener("click", () => {
  const ischecked = (element) => element.checked == true;

  let reponse = 0;
  reponse += elts.findIndex(ischecked) + 1;

  let vraireponse = currentQuestion.answer;

  if (reponse == vraireponse) {
    score++;
  }
  let totalScore = score;
  finalscore.innerText = totalScore + "/15";
  if (totalScore <= 8) {
    image.classList.add("failed");
  } else {
    image.classList.remove("failed");
    image.classList.add("success");
  }

  elts.forEach((element) => (element.checked = false));

  getNewQuestion();
});
// ---------------------------------------------------------------------------
