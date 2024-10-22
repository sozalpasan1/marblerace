let selectedCharacters = [];
let selectedSong = '';
let raceStarted = false;

function selectCharacter(card, imgSrc) {
    if (selectedCharacters.length >= 2 && !card.classList.contains('selected')) {
        return;
    }

    if (card.classList.contains('selected')) {
        card.classList.remove('selected');
        selectedCharacters = selectedCharacters.filter(char => char !== imgSrc);
    } else {
        card.classList.add('selected');
        selectedCharacters.push(imgSrc);
    }

    if (selectedCharacters.length === 2) {
        setTimeout(() => {
            document.getElementById('characterSelect').classList.remove('active');
            document.getElementById('songSelect').classList.add('active');
        }, 500);
    }
}

function selectSong(songFile) {
    selectedSong = songFile;
    document.getElementById('songSelect').classList.remove('active');
    document.getElementById('raceScreen').classList.add('active');
    setupRace();
}

function setupRace() {
    const raceTrack = document.getElementById('raceTrack');
    
    // Create marbles with images inside
    selectedCharacters.forEach((char, index) => {
        const marble = document.createElement('div');
        marble.className = 'marble';
        marble.id = `marble${index}`;
        
        const img = document.createElement('img');
        img.src = char;
        img.alt = `Character ${index + 1}`;
        
        marble.appendChild(img);
        marble.style.left = `${25 + (index * 50)}%`;
        marble.style.top = '0px';
        
        raceTrack.appendChild(marble);
    });
}

function startRace() {
    if (raceStarted) return;
    raceStarted = true;
    document.getElementById('startButton').style.display = 'none';

    const marble1 = document.getElementById('marble0');
    const marble2 = document.getElementById('marble1');
    
    let pos1 = 0;
    let pos2 = 0;
    const trackHeight = document.getElementById('raceTrack').offsetHeight - 50;
    
    // Add initial delay before start
    setTimeout(() => {
        function animate() {
            if (pos1 >= trackHeight && pos2 >= trackHeight) return;

            // Increased speed and added randomness
            pos1 += Math.random() * 10 + 5; // Minimum speed of 5, max of 15
            pos2 += Math.random() * 10 + 5;

            // Add gravity acceleration
            pos1 *= 1.02;
            pos2 *= 1.02;

            marble1.style.top = `${Math.min(pos1, trackHeight)}px`;
            marble2.style.top = `${Math.min(pos2, trackHeight)}px`;

            if (pos1 < trackHeight || pos2 < trackHeight) {
                requestAnimationFrame(animate);
            } else {
                // Race finished
                const winner = pos1 > pos2 ? 0 : 1;
                setTimeout(() => {
                    alert(`Character ${winner + 1} wins and will sing the song!`);
                    // Here you would play the selected song
                }, 500);
            }
        }

        animate();
    }, 1000); // 1 second delay before race starts
}