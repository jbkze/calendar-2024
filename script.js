function createAdventCalendar() {
    const calendar = document.getElementById("calendar");
  
    for (let day = 1; day <= 24; day++) {
      // Erstelle ein container-item
      const containerItem = document.createElement("div");
      containerItem.className = `container-item day${day}`;
  
      // Wähle zufällig rot oder grün für jede Kachel
      const isRedTile = Math.random() < 0.5;  // 50% Chance auf Rot
    
      // Füge die Farbe zur Kachel hinzu
      if (isRedTile) {
        containerItem.classList.add("red-tile");
      } else {
        containerItem.classList.add("green-tile");
      }
  
      // Erstelle die Tile
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
  
      // Audio-Element
      const audio = document.createElement("audio");
      audio.id = `audio${day}`;
      audio.src = `audio${day}.mp3`;
  
      // Play/Pause-Button
      const button = document.createElement("button");
      button.setAttribute("onclick", `toggleAudio(event, 'audio${day}')`);
  
      const icon = document.createElement("i");
      icon.className = "fas fa-play";
      button.appendChild(icon);
  
      // Zusammenfügen der Elemente
      back.appendChild(audio);
      back.appendChild(button);
      tile.appendChild(front);
      tile.appendChild(back);
      containerItem.appendChild(tile);
  
      // Füge die Kachel dem Kalender hinzu
      calendar.appendChild(containerItem);
    }
  }
  
  // Funktion aufrufen, um die Kacheln zu erstellen
  createAdventCalendar();
  
  // Funktion, um die Fliese zu drehen
function flipTile(tile) {
    const containerItem = tile.closest(".container-item");
    containerItem.classList.toggle("flipped");
  }
  
  // Funktion, um Audio abzuspielen oder zu pausieren
  function toggleAudio(event, audioId) {
    event.stopPropagation(); // Verhindert, dass der Flip ausgelöst wird
    const audio = document.getElementById(audioId);
    const buttonIcon = event.target.querySelector("i");
  
    if (audio.paused) {
      audio.play();
      buttonIcon.classList.remove("fa-play");
      buttonIcon.classList.add("fa-pause");
    } else {
      audio.pause();
      buttonIcon.classList.remove("fa-pause");
      buttonIcon.classList.add("fa-play");
    }
  }
  