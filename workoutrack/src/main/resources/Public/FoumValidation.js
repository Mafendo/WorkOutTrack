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
        exercisesData = [];
        const targetReps = 10; // Example target reps for all sets
    
        for (let i = 1; i <= numExercises; i++) {
            let exerciseData = {};
            const exerciseNameSelect = document.getElementById(`exerciseName-${i}`);
            exerciseData.name = exerciseNameSelect.value;
            const exerciseSetsSelect = document.getElementById(`exerciseSets-${i}`);
            exerciseData.sets = parseInt(exerciseSetsSelect.value, 10);
    
            let setsData = [];
            const inputGroups = document.querySelectorAll(`#exercise-${i} .numForum:not(.hide)`);
    
            for (let j = 0; j < inputGroups.length; j += 2) {
                let setData = {};
                const kgInput = inputGroups[j].querySelector('.kg-input');
                const repsInput = inputGroups[j + 1]?.querySelector('.reps-input');
    
                if (kgInput && repsInput) {
                    const currentWeight = parseFloat(kgInput.value);
                    const reps = parseInt(repsInput.value, 10);
    
                    setData.kg = currentWeight;
                    setData.reps = reps;
    
                    // Calculate the next goal
                    const nextGoal = suggestNextWorkout(currentWeight, reps, targetReps);
                    setData.nextGoal = nextGoal;
                }
    
                setsData.push(setData);
            }
    
            exerciseData.setsData = setsData;
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
                if (set.nextGoal) {
                    formattedData += `    Next Goal: ${set.nextGoal.suggestedWeight} kg, ${set.nextGoal.suggestedReps} reps\n`;
                }
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
                //console.log("yay")
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
                if (!validateExerciseName(selectedValue)){
                    alert("Please select the name of the exercise before proceeding.");
                    
                }
                else if(!validateExerciseSets(selectedValue)){
                    alert("Please specify the number of sets.");
                }
                else if(!validateInputs()){
                    alert("Please input a valid number in Kg/Rep")
                }

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
    
    function suggestNextWorkout(currentWeight, reps, targetReps) {
        const weightIncrementFactor = 1.05; // 5% weight increment
        let suggestedWeight = currentWeight;
        let suggestedReps = reps;
    
        if (reps >= targetReps) {
            // If the user reaches or exceeds the target reps, increase the weight
            suggestedWeight = Math.round((currentWeight * weightIncrementFactor) * 10) / 10; // Round to 1 decimal
            suggestedReps = targetReps; // Maintain target reps
        } else {
            // Otherwise, increase reps towards the target
            suggestedReps = Math.min(reps + 1, targetReps);
        }
    
        return {
            suggestedWeight: suggestedWeight,
            suggestedReps: suggestedReps
        };
    }
    

});


