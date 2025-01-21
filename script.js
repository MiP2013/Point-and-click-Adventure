// Game Data
const gameData = {
    scene: 0,
    inventory: [],
    dialogue: [
        {
            scene: "Salims Werkstatt",
            background: "url('images/workshop.jpg')",
            text: [
                "Salim: „Willkommen in meiner Werkstatt. Ein weiterer Tag, um an Schrott zu basteln.“",
                "Salim: „Oh, was ist das? Eine alte Karte... vielleicht zur Müllkrone!“",
                "Hinweis: Drücke auf 'Weiter', um die Karte ins Inventar zu legen."
            ],
            items: ["Verstaubte Karte"]
        },
        {
            scene: "Basar",
            background: "url('images/bazaar.jpg')",
            text: [
                "Salim: „Der Basar... Zeit, ein paar Teile zu finden.“",
                "Elizabeth: „Du da, Mechaniker! Hilf mir mit diesem Energie-Kern!“",
                "Hinweis: Suche den Magnetisator, um Elizabeth zu helfen."
            ],
            items: []
        }
    ]
};

// Game Elements
const sceneElement = document.getElementById("scene");
const dialogueBox = document.getElementById("dialogue-box");
const dialogueText = document.getElementById("dialogue-text");
const inventoryList = document.getElementById("inventory-list");
const nextButton = document.getElementById("next-button");

let dialogueIndex = 0;

// Update Scene Function
function updateScene() {
    const currentScene = gameData.dialogue[gameData.scene];
    sceneElement.style.backgroundImage = currentScene.background;
    dialogueText.textContent = currentScene.text[dialogueIndex];
}

// Add Item to Inventory
function addItemToInventory(item) {
    gameData.inventory.push(item);
    const li = document.createElement("li");
    li.textContent = item;
    inventoryList.appendChild(li);
}

// Next Button Click
nextButton.addEventListener("click", () => {
    const currentScene = gameData.dialogue[gameData.scene];

    if (dialogueIndex < currentScene.text.length - 1) {
        dialogueIndex++;
        dialogueText.textContent = currentScene.text[dialogueIndex];
    } else {
        if (currentScene.items.length > 0) {
            currentScene.items.forEach(item => addItemToInventory(item));
        }
        if (gameData.scene < gameData.dialogue.length - 1) {
            gameData.scene++;
            dialogueIndex = 0;
            updateScene();
        } else {
            dialogueText.textContent = "Spiel abgeschlossen! Danke fürs Spielen!";
            nextButton.disabled = true;
        }
    }
});

// Initialize Game
updateScene();

