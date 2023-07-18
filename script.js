document.getElementById("calorie-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const age = parseInt(document.getElementById("age").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const feet = parseFloat(document.getElementById("feet").value);
    const inches = parseFloat(document.getElementById("inches").value);
    const activityLevel = parseFloat(document.getElementById("activity-level").value);
    const weightGoal = parseFloat(document.getElementById("weight-goal").value);

    // Get the selected gender value
    const gender = document.querySelector('input[name="gender"]:checked');
    const genderValue = gender ? gender.value : "";

    // Convert height from feet and inches to total inches
    const heightInInches = feet * 12 + inches;

    // Perform the calorie calculation using the Mifflin-St. Jeor equation
    let bmr;
    if (genderValue === "male") {
        bmr = 10 * weight + 6.25 * heightInInches - 5 * age + 5;
    } else if (genderValue === "female") {
        bmr = 10 * weight + 6.25 * heightInInches - 5 * age - 161;
    } else {
        // If gender is not selected or invalid, use the average of male and female values
        bmr = (10 * weight + 6.25 * heightInInches - 5 * age + 5 - (10 * weight + 6.25 * heightInInches - 5 * age - 161)) / 2;
    }

    const calorieNeeds = bmr * activityLevel;

    // Adjust calorie needs based on the weight loss goal
    const adjustedCalories = calorieNeeds - (weightGoal * 7700 / 7); // 7700 calories ≈ 1 lb of body weight, dividing by 7 for weekly goal

    // Display the result
    const resultElement = document.getElementById("result");
    resultElement.textContent = `Your estimated daily calorie needs: ${adjustedCalories.toFixed(2)} calories`;
});