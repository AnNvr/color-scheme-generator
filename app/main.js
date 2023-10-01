const btnEl = document.getElementById("btn");
const selectorEl = document.getElementById("selector");
const colorInput = document.getElementById("color-input");
let randomColor = Math.floor(Math.random()*16777215).toString(16); // code snippet: css-tricks.com
let defaultMode = "monochrome";
let colorsArray = [];

// Set the default mode in the selector
selectorEl.value = defaultMode;
// Set the default color for the input type="color"
colorInput.value = `#${randomColor}`;
// listen for events
btnEl.addEventListener("click", () => {
    // When the selector value changes, we get the selected option's value
    const selectedOption = selectorEl.value;
    // We also update the randomColor variable by extracting the color value from the colorInput element. We remove the '#' from the color input value using .substr(1).
    const colorSeed = colorInput.value.substr(1);
    fetchColorScheme(selectedOption, colorSeed);
})

// a function to fetch the color API as default monochrome
fetch(`https://www.thecolorapi.com/scheme?hex=${randomColor}&mode=monochrome&count=5&format=json`)
    .then(res => res.json())
    .then(data => {
        colorsArray = data.colors.map(color => color.hex.value);
        render(colorsArray);
});

// we need to update the fetchColorScheme function to accept the selected option and the color seed as parameters and use them to construct the API URL:
function fetchColorScheme(mode, colorSeed) {
    const API_URL = `https://www.thecolorapi.com/scheme?hex=${colorSeed}&mode=${mode}&count=5&format=json`;

    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            colorsArray = data.colors.map(color => color.hex.value);
            render(colorsArray);
    })
}

// a function to render the template literal with the colours
function render(colorsArray) {
    let html = "";
    colorsArray.forEach(color => {
        html += `
        <div class="color-item">
            <div class="color" style="background-color: ${color};"></div>
            <div class="hex-code">${color}</div>
        </div>       
        `;
    });
    document.querySelector(".color-list").innerHTML = html;
    
    // Attach click event listeners to each color item
    const colorItems = document.querySelectorAll('.color-item');
    // iteration over the array to get the hexCode from the colorsArray based on the current index
    colorItems.forEach((item, index) => {
        const hexCode = colorsArray[index];
        item.addEventListener('click', () => {
            copyColor(hexCode);
        });
    });
}

// copy on click function
function copyColor(hexCode) {
    navigator.clipboard.writeText(hexCode).then(() => {
        alert("Hex " + hexCode + " has been copied successfully");
    })
}