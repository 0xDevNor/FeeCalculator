function calculateCosts() {
    // Henter verdier fra inputfeltene
    let openPrice = parseFloat(document.getElementById('openPrice').value);
    let positionSize = parseFloat(document.getElementById('positionSize').value);

    // Setter standardverdier for gebyr og spread til de høyeste verdiene fra Binance
    let openingFeePercentage = 0.04;
    let openingSpreadPercentage = 0.024;

    // Gir brukeren mulighet til å oppdatere gebyr og spread
    let userFee = parseFloat(prompt("Enter your fee percentage (or leave blank to use the default of 0.04%):"));
    let userSpread = parseFloat(prompt("Enter your spread percentage (or leave blank to use the default of 0.024%):"));

    // Oppdaterer gebyr og spread hvis brukeren har angitt egne verdier
    if (!isNaN(userFee)) {
        openingFeePercentage = userFee / 10000;
    }
    if (!isNaN(userSpread)) {
        openingSpreadPercentage = userSpread / 10000;
    }

    // Beregner åpningskostnader
    let openingFee = openPrice * openingFeePercentage;
    let openingSpread = openPrice * openingSpreadPercentage;

    // Beregner lukkekostnader (samme som åpning i dette eksemplet)
    let closingFee = openPrice * openingFeePercentage; // Bruker åpningsprosentene siden de er de samme
    let closingSpread = openPrice * openingSpreadPercentage; // Bruker åpningsprosentene siden de er de samme

    // Beregner total kostnad
    let totalCosts = openingFee + openingSpread + closingFee + closingSpread;

    // Beregner den faktiske investeringen etter åpningskostnader
    let actualInvestment = positionSize - openingFee - openingSpread;

    // Beregner prisen som skal lukkes for å dekke inn- og utgangsgebyr + spread
    let breakEvenPrice = openPrice + (totalCosts / actualInvestment); // Oppdatert her

    // Viser resultatene i HTML
    document.getElementById('openingFee').innerText = openingFee.toFixed(2);
    document.getElementById('openingSpread').innerText = openingSpread.toFixed(2);
    document.getElementById('closingFee').innerText = closingFee.toFixed(2);
    document.getElementById('closingSpread').innerText = closingSpread.toFixed(2);
    document.getElementById('totalCosts').innerText = totalCosts.toFixed(2);
    document.getElementById('breakEvenPrice').innerText = breakEvenPrice.toFixed(5);
}