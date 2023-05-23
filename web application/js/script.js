const elements = {
  startBtn: document.getElementById("startButton"),
  restartBtn: document.getElementById("restartButton"),
  firstRunway: document.getElementById("runway1"),
  secondRunway: document.getElementById("runway2"),
  thirdRunway: document.getElementById("runway3"),
  runner: document.getElementById("runner"),
  runnerImg: document.getElementById("runner-img"),
  welcomeScreen: document.getElementById("start"),
  endScreen: document.getElementById("end"),
  errorScreen: document.querySelector(".error"),
  successScreen: document.querySelector(".success"),
  amazonPlace: document.getElementById("amazon"),
  bahiaPlace: document.getElementById("bahia"),
  paranaPlace: document.getElementById("parana"),
  saoPauloPlace: document.getElementById("saopaulo"),
  rioPlace: document.getElementById("rio"),
  amazonPanel: document.getElementById("amazonPanel"),
  bahiaPanel: document.getElementById("bahiaPanel"),
  paranaPanel: document.getElementById("paranaPanel"),
  saoPauloPanel: document.getElementById("saopauloPanel"),
  rioPanel: document.getElementById("rioPanel"),
  gameScreen: document.getElementById("gameScreen")
};

let currentRunway = 2;
let isJumping = false;
let isGameOver = false;
let obstacles = [];

function startGame() {
  elements.welcomeScreen.classList.add("hide");
  elements.runner.classList.add("animate");
  elements.runnerImg.style.opacity = "0";
  generateObstacles();
  moveRunner();
  console.log(obstacles);
  document.addEventListener("keydown", changeRunway);
  document.addEventListener("keydown", jump);
}

function restartGame() {
  location.reload();
}

function moveRunner() {
  const initialPosition = 0;
  const finalPosition = 5100;
  let currentPosition = initialPosition;
  const screenWidth = window.innerWidth;

  function updateGameScreen() {
    const runnerPosition = elements.runner.getBoundingClientRect();
    const runnerRight = runnerPosition.right;

    if (runnerRight > screenWidth) {
      const offset = runnerRight - screenWidth;
      elements.gameScreen.style.transform = `translateX(-${offset}px)`;
    }
  }

  const interval = setInterval(() => {
    if (currentPosition >= finalPosition) {
      clearInterval(interval);
      elements.endScreen.classList.remove("hide");
      elements.successScreen.classList.remove("hide");
      elements.errorScreen.classList.add("hide");
      isGameOver = true;
      return;
    }
    currentPosition += 2;
    elements.runner.style.left = currentPosition + "px";
    climb(currentPosition);
    animatePlaces(currentPosition);
    checkCollision(currentPosition);
    updateGameScreen();
  }, 1);
}

function generateObstacles() {
  obstacles = [];
  const runways = [
    elements.firstRunway,
    elements.secondRunway,
    elements.thirdRunway
  ];

  if (!isGameOver) {
    for (let i = 1; i <= 3; i++) {
      const randomDistance = Math.ceil(Math.random() * (4400 - 500)) + 500;
      const newObstacle = { runway: i, distance: randomDistance };
      obstacles.push(newObstacle);
    }

    while (obstacles.length < 5) {
      const randomDistance = Math.ceil(Math.random() * (4400 - 500)) + 500;
      const randomRunway = Math.ceil(Math.random() * 3);
      const newObstacle = { runway: randomRunway, distance: randomDistance };
      obstacles.push(newObstacle);
    }
  }

  obstacles.forEach((obstacle) => {
    const obstacleElement = document.createElement("span");
    obstacleElement.classList.add("obstacle");
    obstacleElement.style.transform = `translateX(${obstacle.distance}px)`;
    runways[obstacle.runway - 1].append(obstacleElement);
  });
}

function changeRunway(event) {
  if (event.key === "ArrowDown") {
    if (currentRunway < 3) {
      currentRunway++;
    }
  } else if (event.key === "ArrowUp") {
    if (currentRunway > 1) {
      currentRunway--;
    }
  }
  if (currentRunway === 2) {
    elements.runner.style.bottom = "90px";
  } else if (currentRunway === 3) {
    elements.runner.style.bottom = "50px";
  } else if (currentRunway === 1) {
    elements.runner.style.bottom = "120px";
  }
  console.log(currentRunway);
}

function jump(event) {
  if (event.key === " " && !isJumping && !isGameOver) {
    isJumping = true;
    elements.runner.classList.add("jump");
    elements.runner.classList.remove("animate");
    setTimeout(() => {
      isJumping = false;
      elements.runner.classList.remove("jump");
      elements.runner.classList.add("animate");
    }, 500);
  }
}

function checkCollision(currentPosition) {
  obstacles.forEach((obstacle) => {
    if (
      obstacle.distance === currentPosition &&
      obstacle.runway === currentRunway &&
      !isGameOver &&
      !isJumping
    ) {
      isGameOver = true;
      elements.runner.classList.remove("animate");
      elements.endScreen.classList.remove("hide");
      elements.errorScreen.classList.remove("hide");
      elements.successScreen.classList.add("hide");
      console.log("Game Over");
    }
  });
}

function climb(distance) {
  if (distance >= 4700) {
    elements.runner.style.transform = "translateY(-50px)";
  }
  if (distance >= 4800) {
    elements.runner.style.transform = "translateY(-90px)";
  }
  if (distance >= 4900) {
    elements.runner.style.transform = "translateY(-135px)";
  }
}

function animatePlaces(distance) {
  if (distance >= 1000) {
    elements.amazonPlace.classList.add("appear");
    elements.amazonPanel.classList.add("appear-panel");
    elements.amazonPanel.style.opacity = "1";
    elements.amazonPlace.style.opacity = "1";
  }
  if (distance >= 1800) {
    elements.bahiaPlace.classList.add("appear");
    elements.bahiaPanel.classList.add("appear-panel");
    elements.bahiaPanel.style.opacity = "1";
    elements.bahiaPlace.style.opacity = "1";
  }
  if (distance >= 2500) {
    elements.paranaPlace.classList.add("appear");
    elements.paranaPanel.classList.add("appear-panel");
    elements.paranaPanel.style.opacity = "1";
    elements.paranaPlace.style.opacity = "1";
  }
  if (distance >= 3400) {
    elements.saoPauloPlace.classList.add("appear");
    elements.saoPauloPanel.classList.add("appear-panel");
    elements.saoPauloPanel.style.opacity = "1";
    elements.saoPauloPlace.style.opacity = "1";
  }
  if (distance >= 4400) {
    elements.rioPlace.classList.add("appear");
    elements.rioPanel.classList.add("appear-panel");
    elements.rioPanel.style.opacity = "1";
    elements.rioPlace.style.opacity = "1";
  }
}

elements.restartBtn.addEventListener("click", restartGame);
elements.startBtn.addEventListener("click", startGame);
