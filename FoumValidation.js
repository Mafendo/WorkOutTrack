document.addEventListener('DOMContentLoaded', function () {
    let exercisesData = [];
    const doneButton = document.getElementById("doneBtn");
    const backButton= document.getElementById("backBtn")
    const mainbg = document.getElementById("Mainbg");
    function validateExerciseSets(numExercises) {
        let isValid = true;

        for (let i = 1; i <= numExercises; i++) {
            const exerciseSetsSelect = document.getElementById(`exerciseSets-${i}`);

            // Check if the user selected a valid number of sets (not the default option)
            if (exerciseSetsSelect.value === "Select number of sets") {
                isValid = false;
                // Provide feedback to the user
                exerciseSetsSelect.classList.add('is-invalid');
            } else {
                // If the selection is valid, ensure the invalid class is removed
                exerciseSetsSelect.classList.remove('is-invalid');
            }
        }

        // Return the overall validity status
        return isValid;
    }


    function validateExerciseName(numExercises) {
        let isValid = true;

        for (let i = 1; i <= numExercises; i++) {
            const exerciseSetsSelect = document.getElementById(`exerciseName-${i}`);

            // Check if the user selected a valid number of sets (not the default option)
            if (exerciseSetsSelect.value === "Select the name of exercise") {
                isValid = false;
                // Provide feedback to the user
                exerciseSetsSelect.classList.add('is-invalid');
            } else {
                // If the selection is valid, ensure the invalid class is removed
                exerciseSetsSelect.classList.remove('is-invalid');
            }
        }

        // Return the overall validity status
        return isValid;
    }
    function validateInputs() {
        let isValid = true;

        // Select all input fields within the numForum class
        const inputFields = document.querySelectorAll('.numForum:not(.hide) input');

        // Regular expression for positive numbers (including decimals)
        const positiveNumberRegex = /^\d*\.?\d+$/;

        inputFields.forEach(input => {
            // Check if the input value matches the regex for positive numbers
            if (!positiveNumberRegex.test(input.value) || input.value <= 0) {
                isValid = false;
                input.classList.add('is-invalid');  // Add invalid class for visual feedback
            } else {
                input.classList.remove('is-invalid'); // Remove invalid class if valid
            }
        });

        return isValid;
    }
    var selectedValue = null;
    const nextButton = document.getElementById("nextBtn");
    const exerciseSelect = document.getElementById('exerciseSelect');
    exerciseSelect.addEventListener('change', function () {
        // Get the selected value
        selectedValue = exerciseSelect.value;
    });

    function captureExerciseData(numExercises) {
        // Initialize or clear the array that will store all exercises data
        exercisesData = [];
    
        // Loop through each exercise, assuming exercises are numbered from 1 to numExercises
        for (let i = 1; i <= numExercises; i++) {
            // Initialize an object to store the current exercise's data
            let exerciseData = {};
    
            // Capture the selected exercise name
            const exerciseNameSelect = document.getElementById(`exerciseName-${i}`);
            exerciseData.name = exerciseNameSelect.value;
    
            // Capture the number of sets for this exercise
            const exerciseSetsSelect = document.getElementById(`exerciseSets-${i}`);
            exerciseData.sets = parseInt(exerciseSetsSelect.value, 10);
    
            // Initialize an array to store data for each set (kg and reps)
            let setsData = [];
    
            // Select all input groups for this exercise that are not hidden
            const inputGroups = document.querySelectorAll(`#exercise-${i} .numForum:not(.hide)`);
    
            // Iterate over the input groups in pairs (kg and reps)
            for (let j = 0; j < inputGroups.length; j += 2) {
                // Initialize an object to store data for the current set
                let setData = {};
    
                // Capture the kg input value
                const kgInput = inputGroups[j].querySelector('.kg-input');
                if (kgInput) {
                    setData.kg = kgInput.value;
                }
    
                // Capture the reps input value
                const repsInput = inputGroups[j + 1]?.querySelector('.reps-input'); // Safe navigation to avoid errors
                if (repsInput) {
                    setData.reps = repsInput.value;
                }
    
                // Add the set data (kg and reps) to the setsData array
                setsData.push(setData);
            }
    
            // Assign the array of sets data to the exerciseData object
            exerciseData.setsData = setsData;
    
            // Add the exerciseData object to the exercisesData array
            exercisesData.push(exerciseData);
        }
    }
    
    
    function formatExerciseDataForDisplay(exercisesData) {
        let formattedData = '';
    
        exercisesData.forEach((exercise, index) => {
            formattedData += `Exercise ${index + 1} - ${exercise.name}\n`;
            formattedData += `Sets: ${exercise.sets}\n`;
    
            exercise.setsData.forEach((set, setIndex) => {
                formattedData += `  Set ${setIndex + 1}: ${set.kg} kg, ${set.reps} reps\n`;
            });
    
            formattedData += '\n'; // Add a blank line between exercises
        });
    
        return formattedData;
    }
    function displayExerciseData(formattedData) {
        const outputElement = document.getElementById('exerciseDataOutput');
        outputElement.value = formattedData;
    }

    function selectAllExerciseCardsAndHide(maxExercises) {
        for (let i = 1; i <= maxExercises; i++) {
            // Construct the selector for the current exercise card
            let exerciseCard = document.querySelector(`#exercise-${i}`);
            
            // Check if the exerciseCard exists before logging or manipulating it
            if (exerciseCard) {
                exerciseCard.classList.add("hide")
                // You can also perform other operations on exerciseCard here
            } else {
                console.warn(`No card found for exercise-${i}`);
            }
        }
        //hide the buttons
  
        mainbg.classList.add("hide");
        
    }

   
    doneButton.addEventListener("click", function () {
        //validate when presseing done
        if (selectedValue && !isNaN(parseInt(selectedValue))) {
            if (validateExerciseName(selectedValue) && validateExerciseSets(selectedValue) && validateInputs()) {
                console.log("yay")
                selectAllExerciseCardsAndHide(exerciseSelect.value)
               
                captureExerciseData(exerciseSelect.value);
                console.log(exercisesData)
               


                const outputElement = document.getElementById('DataOutput');
                outputElement.classList.remove("hide")
                const formattedData = formatExerciseDataForDisplay(exercisesData);
                displayExerciseData(formattedData);

            }
            else {
                console.log("somthing went wrong");
            }
        }
     
    });

    document.getElementById('copyButton').addEventListener('click', function() {
        // Select the textarea
        const textarea = document.getElementById('exerciseDataOutput');
        
        // Select the text inside the textarea
        textarea.select();
        textarea.setSelectionRange(0, 99999); // For mobile devices
        
        // Copy the text to the clipboard
        document.execCommand('copy');
        
        // Provide feedback to the user
        alert('Workout details copied to clipboard!');
    });
    


});


