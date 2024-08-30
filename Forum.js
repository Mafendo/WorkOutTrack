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
        // Takes the day
        const nav = document.getElementById("navBar");
        const day = nav.querySelector(".active").innerHTML.toString();
        console.log(day);

        // Initialize variables for each day
      
        let exerciseName = ``;




 

        // Loop to create the specified number of divs
        for (let i = 1; i <= numExercises; i++) {
                  // Determine the current day and set the appropriate variable to true
                  if (day === "Monday") {
                    exerciseName = `
                        <select id="exerciseName-${i}" class="form-select mb-2" aria-label="Default select example">
                            <option selected>Select the name of exercise</option>
                            <option value="Barbell bench press">Barbell bench press</option>
                            <option value="Dumbbell chest press">Dumbbell chest press</option>
                            <option value="Incline dumbbell press">Incline dumbbell press</option>
                            <option value="Cable crossover">Cable crossover</option>
                            <option value="Tricep pushdown">Tricep pushdown</option>
                            <option value="Tricep overhead pushdown">Tricep overhead pushdown</option>
                            <option value="Chest fly machine">Chest fly machine</option>
                        </select>`;
                } else if (day === "Tuesday") {
                    exerciseName = `
                        <select id="exerciseName-${i}" class="form-select mb-2" aria-label="Default select example">
                            <option selected>Select the name of exercise</option>
                            <option value="Barbell rows">Barbell rows</option>
                            <option value="Cable rows">Cable rows</option>
                            <option value="Lat pulldowns">Lat pulldowns</option>
                            <option value="Cable face pulls">Cable face pulls</option>
                            <option value="Plate Loaded Single Arm Row">Plate Loaded Single Arm Row</option>
                        </select>`;
                } else if (day === "Wednesday") {
                    exerciseName = `
                        <select id="exerciseName-${i}" class="form-select mb-2" aria-label="Default select example">
                            <option selected>Select the name of exercise</option>
                            <option value="Dumbbell Shoulder Press">Dumbbell Shoulder Press</option>
                            <option value="Cable Side lateral raise">Cable Side lateral raise</option>
                            <option value="Rear delt">Rear delt</option>
                            <option value="reverse pec deck">reverse pec deck</option>
                            <option value="Super-rom reverse cable flye">Super-rom reverse cable flye</option>
                        </select>`;
                } else if (day === "Thursday") {
                    exerciseName = `
                        <select id="exerciseName-${i}" class="form-select mb-2" aria-label="Default select example">
                            <option selected>Select the name of exercise</option>
                            <option value="barbell squats">barbell squats</option>
                            <option value="Leg curl machine">Leg curl machine</option>
                            <option value="leg extension machine">leg extension machine</option>
                            <option value="Calf Raises">Calf Raises</option>
                        </select>`;
                }
          
          
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
             
                   ${exerciseName}

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
