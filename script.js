// Funktion zum Erstellen des Adventskalenders
function createAdventCalendar() {
  const calendar = document.getElementById("calendar");

  for (let day = 1; day <= 24; day++) {
    // Container erstellen
    const containerItem = document.createElement("div");
    containerItem.className = `container-item day${day}`;

    // Kachel-Design (rot/grün)
    const isRedTile = Math.random() < 0.5;
    containerItem.classList.add(isRedTile ? "red-tile" : "green-tile");

    // Kachel erstellen
    const tile = document.createElement("div");
    tile.className = "tile";
    tile.setAttribute("onclick", "flipTile(this)");

    // Vorderseite
    const front = document.createElement("div");
    front.className = "front";
    front.textContent = day;

    // Rückseite
    const back = document.createElement("div");
    back.className = "back";

    // Fake-Player erstellen
    const fakePlayer = document.createElement("div");
    fakePlayer.className = "fake-player";
    fakePlayer.addEventListener("click", togglePlayer);

    const playButton = document.createElement("button");
    playButton.className = "play";
    playButton.setAttribute("role", "play");

    const pauseButton = document.createElement("button");
    pauseButton.className = "pause hidden";
    pauseButton.setAttribute("role", "pause");

    fakePlayer.appendChild(playButton);
    fakePlayer.appendChild(pauseButton);

    // Audio-Element hinzufügen
    const audio = document.createElement("audio");
    audio.id = `audio${day}`;
    audio.src = `audio${day}.mp3`;
    back.appendChild(audio);

    // Zusammenfügen
    back.appendChild(fakePlayer);
    tile.appendChild(front);
    tile.appendChild(back);
    containerItem.appendChild(tile);
    calendar.appendChild(containerItem);
  }
}

// Funktion für die Kachelrotation
function flipTile(tile) {
  const containerItem = tile.closest(".container-item");
  containerItem.classList.toggle("flipped");
}

// Funktion für das Umschalten von Play/Pause
function togglePlayer(event) {
  event.stopPropagation(); // Verhindert das Drehen der Kachel
  const player = event.currentTarget;
  const buttons = Array.from(player.children);
  const audio = player.nextElementSibling;

  // Buttons umschalten
  buttons.forEach((button) => button.classList.toggle("hidden"));

  // Audio steuern
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

// Adventskalender initialisieren
createAdventCalendar();
