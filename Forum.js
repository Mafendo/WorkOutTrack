var disableEvent = false;
document.addEventListener('DOMContentLoaded', function () {
    // Get the select element
    const exerciseSelect = document.getElementById('exerciseSelect');
    const mainCard = document.getElementById("MainforumCard");
    //buttons
    const nextButton = document.getElementById("nextBtn");
    const backButton = document.getElementById('backBtn');
    const doneButton = document.getElementById("doneBtn");
    let currentCard = 0;


    var selectedValue = null;
    let flag = false;


    // Add an event listener to the select element
    exerciseSelect.addEventListener('change', function () {
        // Get the selected value
        selectedValue = exerciseSelect.value;
        if (selectedValue && !isNaN(parseInt(selectedValue))) {
            flag = true;
        }


    });

    // For the button

    nextButton.addEventListener('click', function () {
        if (flag == true && disableEvent == false && selectedValue && !isNaN(parseInt(selectedValue))) {
            mainCard.classList.add("hide");
            console.log('Selected number of exercises:', selectedValue);

            // Set disableEvent to true to prevent further clicks


            // Call your function to create divs here
            createExerciseDivs(selectedValue);
            disableEvent = true;
        } else {
            // console.log('No value selected or already submitted.');

        }
    });
    nextButton.addEventListener('click', function () {

        if (disableEvent == true) {
            //-----
            if (currentCard < selectedValue) {




                if (currentCard != 0) {
                    document.getElementById(`exercise-${currentCard}`).classList.add('hide');
                }
                else {

                }


                currentCard++;
                document.getElementById(`exercise-${currentCard}`).classList.remove('hide');


                if (currentCard == selectedValue) {
                    nextButton.classList.add('disabled');
                    doneButton.classList.remove('disabled');

                }
                if (currentCard > 1) {
                    backButton.classList.remove('disabled');

                }
            }
            //-----
        }


    });

    backButton.addEventListener('click', function () {
        if (currentCard > 1) {
            document.getElementById(`exercise-${currentCard}`).classList.add('hide');
            currentCard--;
            document.getElementById(`exercise-${currentCard}`).classList.remove('hide');
            if (currentCard === 1) {
                backButton.classList.add('disabled');
            }
            if (currentCard < selectedValue) {
                nextButton.classList.remove('disabled');
            }
        }
    });
    // Function to create exercise divs inside Mainbg
    function createExerciseDivs(numExercises) {
        // Get the Mainbg element
        const mainBg = document.getElementById('Mainbg');

        // Clear any existing content in Mainbg


        // Loop to create the specified number of divs
        for (let i = 1; i <= numExercises; i++) {
            // Create a new div
            const exerciseDiv = document.createElement('div');

            // Set an ID or class if necessary
            exerciseDiv.id = `exercise-${i}`;
            exerciseDiv.classList.add('forumCards', 'hide');

            // Add content or other elements to the div
            exerciseDiv.innerHTML = `<p class="m-3">Exercise ${i}</p>`;
            // Add content, including the select menu, to the div
            exerciseDiv.innerHTML = `
             <p class="m-2">Exercise ${i}</p>
             <div class="d-flex flex-column align-items-center">
             
                <select id="exerciseName-${i}" class="form-select mb-2" aria-label="Default select example">
                <option selected>Select the name of exercise</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </select>

            <select id="exerciseSets-${i}" class="form-select mb-2" aria-label="Select number of reps">
            <option selected>Select number of sets</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
         </div>

            <div class="d-flex"> 
        <div class="input-group mb-2 mx-1 numForum hide">
        <span class="input-group-text" id="inputGroup-sizing-default ">Kg</span>
         <input type="text" class="form-control kg-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            <div class="input-group mb-2 mx-1 numForum hide ">
            <span class="input-group-text" id="inputGroup-sizing-default">Rep</span>
          <input type="text" class="form-control reps-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
            </div>
            </div>

            <div class="d-flex"> 
            <div class="input-group mb-2 mx-1 numForum hide">
            <span class="input-group-text" id="inputGroup-sizing-default">Kg</span>
             <input type="text" class="form-control kg-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
                <div class="input-group mb-2 mx-1 numForum hide">
                <span class="input-group-text" id="inputGroup-sizing-default">Rep</span>
              <input type="text" class="form-control reps-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                </div>
                </div>

                <div class="d-flex"> 
                <div class="input-group mb-2 mx-1 numForum hide">
                <span class="input-group-text" id="inputGroup-sizing-default">Kg</span>
                 <input type="text" class="form-control kg-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                    <div class="input-group mb-2 mx-1 numForum hide">
                    <span class="input-group-text" id="inputGroup-sizing-default">Rep</span>
                  <input type="text" class="form-control reps-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                    </div>
                    </div>

                    <div class="d-flex"> 
                    <div class="input-group mb-2 mx-1 numForum hide">
                    <span class="input-group-text" id="inputGroup-sizing-default">Kg</span>
                     <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                        </div>
                        <div class="input-group mb-2 mx-1 numForum hide">
                        <span class="input-group-text" id="inputGroup-sizing-default">Rep</span>
                      <input type="text" class="form-control reps-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                        </div>
                        </div>

                        <div class="d-flex"> 
                        <div class="input-group mb-2 mx-1 numForum hide">
                        <span class="input-group-text" id="inputGroup-sizing-default">Kg</span>
                         <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                            </div>
                            <div class="input-group mb-2 mx-1 numForum hide">
                            <span class="input-group-text " id="inputGroup-sizing-default">Rep</span>
                          <input type="text" class="form-control reps-input" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                            </div>
                            </div>

                
             `;
            // Append the new div to Mainbg
            mainBg.appendChild(exerciseDiv);
            if (numExercises > 0) {
                document.getElementById('exercise-1').classList.remove('hide');
            }


            const exerciseSetsSelect = document.getElementById(`exerciseSets-${i}`)

            exerciseSetsSelect.addEventListener("change", function () {
                const numSets = parseInt(exerciseSetsSelect.value, 10);


                const inputGroups = exerciseDiv.querySelectorAll('.numForum');
                // Hide all input groups first
                inputGroups.forEach(group => group.classList.add('hide'));
                for (let j = 0; j < numSets * 2; j++) {
                    inputGroups[j].classList.remove('hide');
                }
            });
        }
    }



});
