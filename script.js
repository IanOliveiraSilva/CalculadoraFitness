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

function calculateImc(weight, height) {
    const heightInM = height / 100;
    const imc = weight / (heightInM * heightInM);
    return imc;
}

function calculateImcLevel(imc){
    let imcLevel = '';

    if (imc <= 18.5) {
        imcLevel = 'Magreza';
    } else if (imc >= 18.5 && imc <= 24.9) {
        imcLevel = 'Normal';
    } else if (imc >= 25 && imc <= 29.9) {
        imcLevel = 'Sobrepeso';
    } else if (imc >= 30 && imc <= 34.9) {
        imcLevel = 'Obesidade grau I';
    } else if (imc >= 35 && imc <= 39.9) {
        imcLevel = 'Obesidade grau II';
    } else if (imc >= 40) {
        imcLevel = 'Obesidade grau III';
    }

    return imcLevel;
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML =
        `
    <h2>Resultados:</h2>
    <h3> Calorias </h3>
    <p>Você gasta ${results.tmb} KCAL diariamente.</p>
    <p>Se você desejar ganhar massa, deve consumir: ${results.surplus} KCAL.</p>
    <p>Se você desejar emagrecer, deve consumir: ${results.deficit} KCAL.</p>
    <h3> Macronutrientes</h3>
    <p>Você deve ingerir: ${results.protein} G de proteinas diarias.</p>
    <p>Você deve ingerir: ${results.carb} G de carboidratos diarios.</p>
    <p>Você deve ingerir: ${results.fat} G de gorduras diarias.</p>
    <p>Você deve ingerir: ${results.water} L de água diarios.</p>
    <h3> IMC</h3>
    <p>Nível do IMC: ${results.imc} KG/M2.</p>
    <p>Seu IMC está em: <p class="text navbar-brand">${results.imcLevel}</p></p>
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
    const imc = calculateImc(weight, height);
    const imcLevel = calculateImcLevel(imc);
    const fatIntake = calculateFatIntake(tmb);

    const surplusCalories = tmb + 300;
    const deficitCalories = tmb - 300;

    const results = {
        tmb: tmb.toFixed(0),
        water: waterIntake.toFixed(2),
        protein: proteinIntake.toFixed(2),
        carb: carbIntake.toFixed(2),
        fat: fatIntake.toFixed(2),
        surplus: surplusCalories.toFixed(0),
        deficit: deficitCalories.toFixed(0),
        imc: imc.toFixed(2),
        imcLevel: imcLevel
    };

    displayResults(results);
});

