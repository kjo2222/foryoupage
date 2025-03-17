let messages = [];
let interval = 1000; // Time interval in milliseconds (1 second)
let fastInterval = 500; // Faster interval for third screen
let lastSpawnTime = 0;
let bgImage;
let bgImage2;
let bgImage3;
let bgImage4;
let bgImage5; // New background (white)
let bgImage6; // New background (for the gif page)
let bgImage7; // New background for the moneycat page
let bgImage8; // New background for shrugging page
let bgImage9; // New background for the celebrate page
let bgImage10; // New background for thumbsup page
let bgImage11; // New background for writing page
let bgImage12; // New background for ok page
let planeImage;
let runGif; // For the gif
let moneyCatImage; // Image of moneycat
let runningImage; // Image for running
let runningX = -200; // Starting position of the running image (off-screen to the left)
let runningSpeed = 5; // Speed of the running image
let currentPage = 1;
let isGifVisible = false; // Flag to control the visibility of the GIF
let planeX = -200; // Starting position of the plane
let planeSpeed = 4; // Speed of the plane

function preload() {
  bgImage = loadImage("sademoji.jpg"); // Load the first background
  bgImage2 = loadImage("shyemoji.jpg"); // Load the second background
  bgImage3 = loadImage("aaaaemoji.jpg"); // Load the third background
  bgImage4 = loadImage("thinkingemoji.jpg"); // Load the fourth background
  bgImage5 = color(255); // Set the background to white for the next page
  bgImage6 = color(255); // Set background to white for the gif page
  bgImage7 = color(255); // Set background to white for the moneycat page
  bgImage8 = loadImage("shrugging.jpg"); // Load shrugging image for the new page
  bgImage9 = loadImage("celebrate.jpg"); // Load celebrate background for Page 9
  bgImage10 = loadImage("thumbsup.jpg"); // Load thumbsup image for the new page
  bgImage11 = loadImage("writing.jpg"); // Load writing image for Page 11
  bgImage12 = loadImage("ok.jpg"); // Load ok image for Page 12
  planeImage = loadImage("plane.jpg"); // Load the plane image
  runGif = createImg("run.gif"); // Load the gif
  runGif.hide(); // Hide it initially (we'll control it via position)
  moneyCatImage = loadImage("moneycat.jpg"); // Load the moneycat image
  runningImage = loadImage("running.png"); // Load the running image (replace with running.png)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(0); // Black text
}

function draw() {
  if (currentPage === 1) {
    background(bgImage); // First page background
    displayMessages(["I don't know"]);
  } else if (currentPage === 2) {
    background(bgImage2); // Second page background
    displayMessages(["I really like you"]);
  } else if (currentPage === 3) {
    background(bgImage3); // Third page background
    displayMessages(["You're really cool", "You're so nice to be around", "I wish I had more time with you last week", "You're really handsome", "I love speaking to you"]);
  } else if (currentPage === 4) {
    background(bgImage4); // Fourth page background
    displayMessages(["How can we go about this"]);
  } else if (currentPage === 5) {
    background(bgImage5); // Fifth page background (white)
    image(runningImage, runningX, height / 2 - runningImage.height / 2); // Display running image
    runningX += runningSpeed;
    if (runningX > width) {
      runningX = -runningImage.width; // Reset position to the left side
    }
    displayRedText("I can come to spend time with you in my time off soon");
  } else if (currentPage === 6) {
    background(bgImage6); // Sixth page background (white for the plane animation)
    image(planeImage, planeX, height / 2 - planeImage.height / 2);
    planeX += planeSpeed;
    if (planeX > width) {
      planeX = -planeImage.width;
    }
    displayPlaneText("me omw to the dam");
  } else if (currentPage === 7) {
    background(bgImage7); // Seventh page background (white for moneycat page)
    image(moneyCatImage, width / 4, height / 2 - moneyCatImage.height / 2);
    displayMoneyCatText("means you can save some pennies/kroner");
  } else if (currentPage === 8) {
    background(bgImage8); // Page 8 background (shrugging image)
    displayShruggingText("It would be a cool time, you can show me around and do fun things");
  } else if (currentPage === 9) {
    background(bgImage9); // Page 9 background (celebrate image)
    displayCelebrateText("It would be a cool way to spend my time off");
  } else if (currentPage === 10) {
    background(bgImage10); // Page 10 background (thumbsup image)
    displayThumbsupText("but i understand if you are too busy, or if you are unable to house me");
  } else if (currentPage === 11) {
    background(bgImage11); // Page 11 background (writing image)
    displayWritingText("we could always arrange for a later date! or for when you're here :)");
  } else if (currentPage === 12) {
    background(bgImage12); // Page 12 background (ok image)
    displayOkText("but anyways... this is my website, these are my thoughts. farvel ;)");
  }
}

function displayMessages(messagesArray) {
  let currentTime = millis();
  let spawnRate = currentPage === 3 ? fastInterval : interval; // Slightly faster pop-up speed for page 3

  if (currentTime - lastSpawnTime > spawnRate) {
    for (let msg of messagesArray) {
      let x = random(width);
      let y = random(height);
      messages.push(new Message(x, y, msg));
    }
    lastSpawnTime = currentTime;
  }

  for (let i = messages.length - 1; i >= 0; i--) {
    messages[i].update();
    messages[i].display();
    if (messages[i].isFadedOut()) {
      messages.splice(i, 1);
    }
  }
}

function mousePressed() {
  if (currentPage === 5) {
    currentPage = 6; // Move to Page 6 after clicking
  } else if (currentPage === 8) {
    currentPage = 9; // Move to Page 9 after Page 8
  } else if (currentPage === 9) {
    currentPage = 10; // Move to Page 10 after Page 9
  } else if (currentPage === 10) {
    currentPage = 11; // Move to Page 11 after Page 10
  } else if (currentPage === 11) {
    currentPage = 12; // Move to Page 12 after Page 11
  } else {
    currentPage = (currentPage % 12) + 1; // Cycle through pages, including Page 12
  }
  messages = [];
  lastSpawnTime = millis();
}

function displayRedText(message) {
  fill(255, 0, 0); // Red color for the text
  textStyle(BOLD);
  textSize(36);
  text(message, width / 2, height / 2 + 150); // Display red text below the running image
}

function displayPlaneText(message) {
  fill(0); // Black text for plane page
  textStyle(BOLD);
  textSize(36);
  text(message, width / 2, height / 2 - 100);
}

function displayMoneyCatText(message) {
  fill(0);
  textStyle(BOLD);
  textSize(36);
  text(message, width / 2 + 150, height / 2);
}

function displayShruggingText(message) {
  fill(0); // Black text for Page 8
  textStyle(BOLD);
  textSize(36);
  text(message, width / 2, height / 2 + 150); // Display the text centered
}

function displayCelebrateText(message) {
  fill(0); // Black text for Page 9
  textStyle(BOLD);
  textSize(36);
  text(message, width / 2, height / 2 + 150); // Display the text centered
}

function displayThumbsupText(message) {
  fill(0); // Black text for Page 10
  textStyle(BOLD);
  textSize(36);
  text(message, width / 2, height / 2 + 150); // Display the text centered
}

function displayWritingText(message) {
  fill(0); // Black text for Page 11
  textStyle(BOLD);
  textSize(36);
  text(message, width / 2, height / 2 + 150); // Display the text centered
}

function displayOkText(message) {
  fill(0); // Black text for Page 12
  textStyle(BOLD);
  textSize(36);
  text(message, width / 2, height / 2 + 150); // Display the text centered
}

class Message {
  constructor(x, y, message) {
    this.message = message;
    this.x = x;
    this.y = y;
    this.alpha = 0;
    this.fadeSpeed = 3;
    this.fadingIn = true;
  }

  update() {
    if (this.fadingIn) {
      this.alpha += this.fadeSpeed;
      if (this.alpha >= 255) {
        this.fadingIn = false;
      }
    } else {
      this.alpha -= this.fadeSpeed;
    }
  }

  display() {
    fill(0, this.alpha);
    text(this.message, this.x, this.y);
  }

  isFadedOut() {
    return this.alpha <= 0;
  }
}
