// script.js

let group1 = [];
let group2 = [];
let group3 = [];
let group4 = [];

// Load example data into the input fields
function loadExampleData () {
    group1 = ['Funk', 'Punk', 'Retrowave', 'Americana', 'Rock', 'Dance/EDM', 'Jazzy', 'Salsa'];
    group2 = ['Uptempo (110-120)', 'Chill (70-90)', 'Workout (120-130)', 'Mid tempo (90-110)'];
    group3 = ['Trippy', 'Depressing', 'Uplifting', 'Pissed off'];
    group4 = ['Acoustic Guitar', 'Electric Guitar', 'Roland  JV-1080', 'DR-Rhythm Drum Machine', 'Banjo', 'Mando', 'BFD grooves'];

    // Unhide the csvData div to display the input data for the user
    document.getElementById('csvData').style.display = 'block';

    // Display the random words in the div group1_list, group2_list, group3_list, group4_list, nicely formatted
    document.getElementById('group1_list').textContent = group1.join('\n');
    document.getElementById('group2_list').textContent = group2.join('\n');
    document.getElementById('group3_list').textContent = group3.join('\n');
    document.getElementById('group4_list').textContent = group4.join('\n');
}



document.getElementById('csvFileInput').addEventListener('change', handleFileUpload);

// When the user chooses a file, read in the data as text and pass it to handleFileRead()
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Clear the previous data
        group1 = [];
        group2 = [];
        group3 = [];
        group4 = [];
        
        const reader = new FileReader();
        reader.onload = handleFileRead;
        reader.readAsText(file);
    }
}

// This function gets the words from the CSV file columns, and puts them in group1, 2, 3, 4
// It also displays them in the div group1_list, group2_list, group3_list, group4_list
function handleFileRead(event) {
    const csvContent = event.target.result;
    const data = parseCSV(csvContent);
    console.log('Data:', data)

    // Get the words from column 1 into array group1,2,3,4
    for (let i = 0; i < data.length; i++) {
        group1.push(data[i].split(',')[0]);
        group2.push(data[i].split(',')[1]);
        group3.push(data[i].split(',')[2]);
        group4.push(data[i].split(',')[3]);
    }

    // Unhide the csvData div to display the input data for the user
    document.getElementById('csvData').style.display = 'block';

    // Display the random words in the div group1_list, group2_list, group3_list, group4_list, nicely formatted
    document.getElementById('group1_list').textContent = group1.join('\n');
    document.getElementById('group2_list').textContent = group2.join('\n');
    document.getElementById('group3_list').textContent = group3.join('\n');
    document.getElementById('group4_list').textContent = group4.join('\n');
}

function parseCSV(csvContent) {
    // Parse the CSV content into an array of words    
    return csvContent.split('\n').map(word => word.trim());
}

// This function calls getRandomWord() on each of the arrays group1,2,3,4 and displays a result in the result div
function randomizeWords() {
    console.log('Picking a word from each group...')

    const randomWord1 = getRandomWord(group1);
    const randomWord2 = getRandomWord(group2);
    const randomWord3 = getRandomWord(group3);
    const randomWord4 = getRandomWord(group4);

    // const result = `${randomWord1} ${randomWord2} ${randomWord3} ${randomWord4}`;
    // document.getElementById('result').textContent = result;
    document.getElementById('result1').textContent = randomWord1;
    document.getElementById('result2').textContent = randomWord2;
    document.getElementById('result3').textContent = randomWord3;
    document.getElementById('result4').textContent = randomWord4;

}

function getRandomWord(words) {
    console.log ('getRandomWord() got words:', words)
    const randomIndex = Math.floor(Math.random() * words.length);
    console.log(words[randomIndex])

    // Don't return a blank word

    // Define a limit on recursion
    let recursion_limit = 4;
    if (words[randomIndex] === '') {
        if (recursion_limit > 0) {
            recursion_limit--;
            return getRandomWord(words);
        }        
    }
    else {
        return words[randomIndex];
    }    
}
