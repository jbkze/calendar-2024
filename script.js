function createAdventCalendar() {
    const calendar = document.getElementById("calendar");
  
    for (let day = 1; day <= 24; day++) {
      // Erstelle ein container-item
      const containerItem = document.createElement("div");
      containerItem.className = `container-item day${day}`;
  
      // Wähle zufällig rot oder grün für jede Kachel
      const isRedTile = day % 2 === 0;  // 50% Chance auf Rot
      

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
      
      if (isRedTile) {
        button.classList.add("green-button");
      } else {
        button.classList.add("red-button");
      }

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
  
    // Hole den Tag aus der Audio-ID (z. B. 'audio1' → 1)
    const day = parseInt(audioId.replace('audio', ''), 10);
  
    // Aktuelles Datum
    const today = new Date().getDate();
  
    if (day > today) {
      // Berechne die verbleibenden Tage
      const remainingDays = day - today;
      let message;
  
      // Zeige Toast an mit der verbleibenden Schlafanzahl
      if (remainingDays === 1) {
        message = "Noch 1 Mal schlafen...";
      } else {
        message = `Noch ${remainingDays} Mal schlafen...`;
      }
  
      showToast(message);
      //return; // Audio nicht abspielen
    }
  
  
    // Sicherstellen, dass das Icon immer korrekt ausgewählt wird
    let buttonIcon;
    if (event.target.tagName === "BUTTON") {
      buttonIcon = event.target.querySelector("i");
    } else if (event.target.tagName === "I") {
      buttonIcon = event.target; // Wenn direkt das Icon geklickt wird
    }
  
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
  
  // Toast anzeigen
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.remove("hidden");
    toast.classList.add("visible");
  
    // Toast nach 3 Sekunden ausblenden
    setTimeout(() => {
      toast.classList.remove("visible");
      toast.classList.add("hidden");
    }, 5000);
  }
  

  
