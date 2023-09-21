function calculateTMB(gender, age, weight, height, activityLevel) {
    let tmb;

    if (gender === 'male') {
        tmb = (66 + (13.7 * weight) + (5 * height) - (6.8 * age));
    } else {
        tmb = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    switch (activityLevel) {
        case 'sedentary':
            tmb *= 1.2;
            break;
        case 'lightlyActive':
            tmb *= 1.375;
            break;
        case 'moderatelyActive':
            tmb *= 1.55;
            break;
        case 'veryActive':
            tmb *= 1.725;
            break;
        case 'superActive':
            tmb *= 1.9;
            break;
        default:
            break;
    }

    return tmb;
}

function calculateWaterIntake(weight) {
    const waterInML = weight * 30;
    const waterInL = waterInML / 1000;
    return waterInL;
}


function calculateProteinIntake(weight, gender) {
    if (gender === 'male') {
        return weight * 1.2;
    } else {
        return weight * 1.0;
    }
}

function calculateCarbIntake(calories) {
    return (calories * 0.5) / 4;
}

function calculateFatIntake(calories) {
    return (calories * 0.3) / 9;
}


function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 
    `
    <h2>Resultados:</h2>
    <p>TMB: ${results.tmb} KCAL</p>
    <p>Superávit Calórico: ${results.surplus} KCAL</p>
    <p>Déficit Calórico: ${results.deficit} KCAL</p>
    <p>Água: ${results.water} L</p>
    <p>Proteínas: ${results.protein} G</p>
    <p>Carboidratos: ${results.carb} G</p>
    <p>Gorduras: ${results.fat} G</p>
    `;
}


document.getElementById('fitnessCalculator').addEventListener('submit', function (e) {
    e.preventDefault();
    const gender = document.getElementById('gender').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activityLevel = document.getElementById('activityLevel').value;
    const tmb = calculateTMB(gender, age, weight, height, activityLevel);
    const waterIntake = calculateWaterIntake(weight);
    const proteinIntake = calculateProteinIntake(weight, gender);
    const carbIntake = calculateCarbIntake(tmb);
    const fatIntake = calculateFatIntake(tmb);

    const surplusCalories = tmb + 500;
    const deficitCalories = tmb - 500;

    const results = {
        tmb: tmb.toFixed(0),
        water: waterIntake.toFixed(2),
        protein: proteinIntake.toFixed(2),
        carb: carbIntake.toFixed(2),
        fat: fatIntake.toFixed(2),
        surplus: surplusCalories.toFixed(0),
        deficit: deficitCalories.toFixed(0)
    };

    displayResults(results);
});

