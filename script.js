// ============================================================
// DSA ALGORITHM VISUALIZER
// ============================================================


// ================= VARIABLES =================

let array = [];

let originalArray = [];

let isRunning = false;

let isPaused = false;

let comparisons = 0;

let swaps = 0;

let currentAlgorithm = "bubble";

let animationSpeed = 50;


// ================= DOM ELEMENTS =================

const arrayContainer =
    document.getElementById("arrayContainer");

const algorithmSelect =
    document.getElementById("algorithm");

const arraySize =
    document.getElementById("arraySize");

const arraySizeValue =
    document.getElementById("arraySizeValue");

const speedSlider =
    document.getElementById("speed");

const generateBtn =
    document.getElementById("generateBtn");

const startBtn =
    document.getElementById("startBtn");

const pauseBtn =
    document.getElementById("pauseBtn");

const resetBtn =
    document.getElementById("resetBtn");

const searchSection =
    document.getElementById("searchSection");

const searchValue =
    document.getElementById("searchValue");

const algorithmName =
    document.getElementById("algorithmName");

const complexity =
    document.getElementById("complexity");

const comparisonsDisplay =
    document.getElementById("comparisons");

const swapsDisplay =
    document.getElementById("swaps");

const statusText =
    document.getElementById("statusText");


// ================= ALGORITHM INFORMATION =================

const algorithmInfo = {

    bubble: {
        name: "Bubble Sort",
        complexity: "O(n²)"
    },

    selection: {
        name: "Selection Sort",
        complexity: "O(n²)"
    },

    insertion: {
        name: "Insertion Sort",
        complexity: "O(n²)"
    },

    linear: {
        name: "Linear Search",
        complexity: "O(n)"
    },

    binary: {
        name: "Binary Search",
        complexity: "O(log n)"
    }

};


// ================= GENERATE ARRAY =================

// function generateArray() {

//     stopAlgorithm();

//     array = [];

//     const size = Number(arraySize.value);

//     for (let i = 0; i < size; i++) {

//         const value =
//             Math.floor(Math.random() * 95) + 5;

//         array.push(value);
//     }

//     originalArray = [...array];

//     resetCounters();

//     renderArray();

//     statusText.textContent =
//         "New array generated.";

// }
function generateArray() {

    array = [];

    const size = Number(arraySize.value);

    for (let i = 0; i < size; i++) {

        const value = Math.floor(Math.random() * 95) + 5;

        array.push(value);
    }

    originalArray = [...array];

    resetCounters();

    renderArray();

    statusText.textContent = "New array generated.";
}


// ================= RENDER ARRAY =================

// function renderArray() {

//     arrayContainer.innerHTML = "";

//     array.forEach((value, index) => {

//         const bar = document.createElement("div");

//         bar.classList.add("bar");

//         bar.style.height = `${value}%`;

//         bar.dataset.index = index;

//         arrayContainer.appendChild(bar);

//     });

// }
// function renderArray() {

//     arrayContainer.innerHTML = "";

//     array.forEach((value, index) => {

//         const bar = document.createElement("div");

//         bar.className = "bar";

//         bar.style.height = `${value}%`;

//         bar.style.width = `${100 / array.length}%`;

//         bar.dataset.index = index;

//         arrayContainer.appendChild(bar);

//     });
// }
// function renderArray() {

//     arrayContainer.innerHTML = "";

//     array.forEach((value, index) => {

//         const bar = document.createElement("div");

//         bar.className = "bar";

//         bar.style.height = value + "%";
//         bar.style.backgroundColor = "red";

//         arrayContainer.appendChild(bar);

//     });
// }
function renderArray() {

    arrayContainer.innerHTML = "";

    array.forEach((value, index) => {

        const bar = document.createElement("div");

        bar.className = "bar";

        bar.style.height = `${value}%`;

        bar.style.width = `${100 / array.length}%`;

        bar.dataset.index = index;

        arrayContainer.appendChild(bar);

    });
}

// ================= GET BARS =================

function getBars() {

    return document.querySelectorAll(".bar");

}


// ================= DELAY =================

function delay(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


// ================= WAIT WHILE PAUSED =================

async function waitIfPaused() {

    while (isPaused) {

        await delay(100);

    }

}


// ================= SPEED =================

function getDelay() {

    return 505 - animationSpeed * 5;

}


// ================= UPDATE COUNTERS =================

function updateCounters() {

    comparisonsDisplay.textContent =
        comparisons;

    swapsDisplay.textContent =
        swaps;

}


// ================= RESET COUNTERS =================

function resetCounters() {

    comparisons = 0;

    swaps = 0;

    updateCounters();

}


// ================= STOP =================

function stopAlgorithm() {

    isRunning = false;

    isPaused = false;

}


// ================= UPDATE INFORMATION =================

function updateAlgorithmInfo() {

    currentAlgorithm =
        algorithmSelect.value;

    const info =
        algorithmInfo[currentAlgorithm];

    algorithmName.textContent =
        info.name;

    complexity.textContent =
        info.complexity;

    if (
        currentAlgorithm === "linear" ||
        currentAlgorithm === "binary"
    ) {

        searchSection.classList.remove("hidden");

    } else {

        searchSection.classList.add("hidden");

    }

}


// ============================================================
// BUBBLE SORT
// ============================================================

async function bubbleSort() {

    const bars = getBars();

    const n = array.length;

    for (let i = 0; i < n - 1; i++) {

        for (let j = 0; j < n - i - 1; j++) {

            await waitIfPaused();

            if (!isRunning) return;

            comparisons++;

            updateCounters();

            bars[j].classList.add("comparing");

            bars[j + 1].classList.add("comparing");

            await delay(getDelay());

            if (array[j] > array[j + 1]) {

                // Swap values

                let temp = array[j];

                array[j] = array[j + 1];

                array[j + 1] = temp;

                swaps++;

                // Update heights

                bars[j].style.height =
                    `${array[j]}%`;

                bars[j + 1].style.height =
                    `${array[j + 1]}%`;

                updateCounters();

                await delay(getDelay());

            }

            bars[j].classList.remove("comparing");

            bars[j + 1].classList.remove("comparing");

        }

        bars[n - i - 1].classList.add("sorted");

    }

    bars[0].classList.add("sorted");

    statusText.textContent =
        "Bubble Sort completed.";

}


// ============================================================
// SELECTION SORT
// ============================================================

async function selectionSort() {

    const bars = getBars();

    const n = array.length;

    for (let i = 0; i < n - 1; i++) {

        let minIndex = i;

        bars[minIndex].classList.add("minimum");

        for (let j = i + 1; j < n; j++) {

            await waitIfPaused();

            if (!isRunning) return;

            comparisons++;

            updateCounters();

            bars[j].classList.add("comparing");

            await delay(getDelay());

            if (array[j] < array[minIndex]) {

                bars[minIndex].classList.remove("minimum");

                minIndex = j;

                bars[minIndex].classList.add("minimum");

            }

            bars[j].classList.remove("comparing");

        }

        if (minIndex !== i) {

            let temp = array[i];

            array[i] = array[minIndex];

            array[minIndex] = temp;

            swaps++;

            bars[i].style.height =
                `${array[i]}%`;

            bars[minIndex].style.height =
                `${array[minIndex]}%`;

            updateCounters();

            await delay(getDelay());

        }

        bars[minIndex].classList.remove("minimum");

        bars[i].classList.add("sorted");

    }

    bars[n - 1].classList.add("sorted");

    statusText.textContent =
        "Selection Sort completed.";

}


// ============================================================
// INSERTION SORT
// ============================================================

async function insertionSort() {

    const bars = getBars();

    const n = array.length;

    bars[0].classList.add("sorted");

    for (let i = 1; i < n; i++) {

        await waitIfPaused();

        if (!isRunning) return;

        let key = array[i];

        let j = i - 1;

        bars[i].classList.add("comparing");

        await delay(getDelay());

        while (j >= 0) {

            await waitIfPaused();

            if (!isRunning) return;

            comparisons++;

            updateCounters();

            bars[j].classList.add("comparing");

            await delay(getDelay());

            if (array[j] > key) {

                array[j + 1] =
                    array[j];

                bars[j + 1].style.height =
                    `${array[j + 1]}%`;

                swaps++;

                updateCounters();

                bars[j].classList.remove("comparing");

                j--;

            } else {

                bars[j].classList.remove("comparing");

                break;

            }

        }

        array[j + 1] = key;

        bars[j + 1].style.height =
            `${key}%`;

        bars[i].classList.remove("comparing");

        for (let k = 0; k <= i; k++) {

            bars[k].classList.add("sorted");

        }

        await delay(getDelay());

    }

    statusText.textContent =
        "Insertion Sort completed.";

}


// ============================================================
// LINEAR SEARCH
// ============================================================

async function linearSearch() {

    const bars = getBars();

    const target =
        Number(searchValue.value);

    if (isNaN(target)) {

        statusText.textContent =
            "Please enter a search value.";

        return;

    }

    for (let i = 0; i < array.length; i++) {

        await waitIfPaused();

        if (!isRunning) return;

        comparisons++;

        updateCounters();

        bars[i].classList.add("comparing");

        statusText.textContent =
            `Checking index ${i}...`;

        await delay(getDelay());

        if (array[i] === target) {

            bars[i].classList.remove("comparing");

            bars[i].classList.add("found");

            statusText.textContent =
                `Value ${target} found at index ${i}.`;

            return;

        }

        bars[i].classList.remove("comparing");

    }

    statusText.textContent =
        `Value ${target} was not found.`;

}


// ============================================================
// BINARY SEARCH
// ============================================================

async function binarySearch() {

    const bars = getBars();

    const target =
        Number(searchValue.value);

    if (isNaN(target)) {

        statusText.textContent =
            "Please enter a search value.";

        return;

    }


    // Binary search requires sorted data

    array.sort((a, b) => a - b);

    renderArray();

    const newBars = getBars();

    let left = 0;

    let right = array.length - 1;


    while (left <= right) {

        await waitIfPaused();

        if (!isRunning) return;

        const mid =
            Math.floor((left + right) / 2);

        comparisons++;

        updateCounters();

        newBars[mid].classList.add("comparing");

        statusText.textContent =
            `Checking index ${mid}...`;

        await delay(getDelay());


        if (array[mid] === target) {

            newBars[mid].classList.remove("comparing");

            newBars[mid].classList.add("found");

            statusText.textContent =
                `Value ${target} found at index ${mid}.`;

            return;

        }


        newBars[mid].classList.remove("comparing");


        if (array[mid] < target) {

            left = mid + 1;

        } else {

            right = mid - 1;

        }

    }

    statusText.textContent =
        `Value ${target} was not found.`;

}


// ============================================================
// START ALGORITHM
// ============================================================

async function startAlgorithm() {

    if (isRunning) return;

    isRunning = true;

    isPaused = false;

    resetCounters();

    statusText.textContent =
        `Running ${algorithmInfo[currentAlgorithm].name}...`;


    if (currentAlgorithm === "bubble") {

        await bubbleSort();

    }

    else if (currentAlgorithm === "selection") {

        await selectionSort();

    }

    else if (currentAlgorithm === "insertion") {

        await insertionSort();

    }

    else if (currentAlgorithm === "linear") {

        await linearSearch();

    }

    else if (currentAlgorithm === "binary") {

        await binarySearch();

    }


    isRunning = false;

}


// ================= PAUSE =================

function togglePause() {

    if (!isRunning) return;

    isPaused = !isPaused;

    if (isPaused) {

        pauseBtn.textContent =
            "▶ Resume";

        statusText.textContent =
            "Algorithm paused.";

    } else {

        pauseBtn.textContent =
            "⏸ Pause";

        statusText.textContent =
            "Algorithm resumed.";

    }

}


// ================= RESET =================

function resetArray() {

    stopAlgorithm();

    array = [...originalArray];

    resetCounters();

    renderArray();

    pauseBtn.textContent =
        "⏸ Pause";

    statusText.textContent =
        "Array reset.";

}


// ================= EVENTS =================


// Algorithm changed

algorithmSelect.addEventListener(
    "change",
    () => {

        updateAlgorithmInfo();

        resetArray();

    }
);


// Array size changed

arraySize.addEventListener(
    "input",
    () => {

        arraySizeValue.textContent =
            arraySize.value;

        generateArray();

    }
);


// Speed changed

speedSlider.addEventListener(
    "input",
    () => {

        animationSpeed =
            Number(speedSlider.value);

    }
);


// Generate

generateBtn.addEventListener(
    "click",
    generateArray
);


// Start

startBtn.addEventListener(
    "click",
    startAlgorithm
);


// Pause

pauseBtn.addEventListener(
    "click",
    togglePause
);


// Reset

resetBtn.addEventListener(
    "click",
    resetArray
);


// ================= INITIALIZE =================

updateAlgorithmInfo();

generateArray();
