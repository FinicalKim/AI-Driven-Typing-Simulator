document.addEventListener("DOMContentLoaded", () => {
    let sampleText = "This is a typing simulator. Type the text displayed.";
    const sampleTextElement = document.getElementById("sampleText");
    const userInputElement = document.getElementById("userInput");
    const timeElement = document.getElementById("time");
    const accuracyElement = document.getElementById("accuracy");
    const wpmElement = document.getElementById("wpm");
    const wordCountElement = document.getElementById("wordCount");
    const generateButton = document.getElementById("generateButton");
    const customPromptElement = document.getElementById("customPrompt");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const autoGenerateToggle = document.getElementById("autoGenerateToggle");

    let startTime;
    let timerInterval;
    let autoGenerate = false;

    // Set the initial sample text content
    updateSampleText(sampleText);

    // Event listener for user input
    userInputElement.addEventListener("input", () => {
        // Record the start time on the first input
        if (!startTime) {
            startTime = new Date().getTime();
            timerInterval = setInterval(updateTime, 100);
        }

        const userInput = userInputElement.value;
        // Highlight the text as the user types
        highlightText(userInput, sampleText);

        // Update accuracy
        const correctChars = countCorrectChars(userInput, sampleText);
        const accuracy = (correctChars / sampleText.length) * 100;
        accuracyElement.textContent = accuracy.toFixed(2);

        // Stop timer and calculate WPM when user finishes typing
        if (userInput.length === sampleText.length) {
            clearInterval(timerInterval);
            const endTime = new Date().getTime();
            const totalTime = (endTime - startTime) / 1000;
            const words = sampleText.split(" ").length;
            const wpm = (words / totalTime) * 60;
            wpmElement.textContent = wpm.toFixed(2);
            wordCountElement.textContent = words;

            // Auto generate new text if toggle is on
            if (autoGenerate) {
                generateNewText();
            }
        }
    });

    // Event listener for the generate button
    generateButton.addEventListener("click", generateNewText);

    // Event listener for pressing Enter in the custom prompt input
    customPromptElement.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            generateNewText();
        }
    });

    // Dark mode toggle event listener
    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("light-mode");
        document.querySelector("header").classList.toggle("light-mode");
        document.querySelector(".container").classList.toggle("light-mode");
        document.querySelectorAll("input[type='text'], textarea").forEach(element => {
            element.classList.toggle("light-mode");
        });
        document.querySelectorAll("#sampleText, #results").forEach(element => {
            element.classList.toggle("light-mode");
        });
    });

    // Event listener for login button
    loginButton.addEventListener("click", () => {
        window.location.href = "/login";
    });

    // Event listener for register button
    registerButton.addEventListener("click", () => {
        window.location.href = "/register";
    });

    // Event listener for auto generate toggle
    autoGenerateToggle.addEventListener("change", () => {
        autoGenerate = autoGenerateToggle.checked;
    });

    // Function to generate new text
    function generateNewText() {
        const prompt = customPromptElement.value;
        fetch('/generate-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: prompt })
        })
        .then(response => response.json())
        .then(data => {
            if (data.generated_text) {
                sampleText = data.generated_text; // Update the sample text
                updateSampleText(sampleText); // Display the new sample text
                userInputElement.value = ""; // Clear user input
                startTime = null; // Reset start time
                clearInterval(timerInterval); // Clear the timer
                timeElement.textContent = "0.00"; // Reset time display
                accuracyElement.textContent = "0.00"; // Reset accuracy display
                wpmElement.textContent = "0.00"; // Reset WPM display
                wordCountElement.textContent = "0"; // Reset word count display
            } else {
                console.error('Error generating text:', data.error);
            }
        });
    }

    // Function to highlight text as user types
    function highlightText(input, text) {
        let highlightedText = "";
        for (let i = 0; i < text.length; i++) {
            if (i < input.length) {
                if (input[i] === text[i]) {
                    highlightedText += `<span class="correct">${text[i]}</span>`;
                } else {
                    highlightedText += `<span class="incorrect">${text[i]}</span>`;
                }
            } else {
                highlightedText += `<span>${text[i]}</span>`;
            }
        }
        sampleTextElement.innerHTML = highlightedText;
    }

    // Function to count correct characters
    function countCorrectChars(input, text) {
        let correctChars = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i] === text[i]) {
                correctChars++;
            }
        }
        return correctChars;
    }

    // Function to update the elapsed time
    function updateTime() {
        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - startTime) / 1000;
        timeElement.textContent = elapsedTime.toFixed(2);
    }

    // Function to update the sample text
    function updateSampleText(text) {
        sampleTextElement.innerHTML = text;
    }
});
