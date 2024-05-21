function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const annualInterestRate = parseFloat(document.getElementById('annual-interest-rate').value);
    const loanTermYears = parseFloat(document.getElementById('loan-term').value);

    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const loanTermMonths = loanTermYears * 12;

    let monthlyPayment;

    if (monthlyInterestRate === 0) {
        monthlyPayment = loanAmount / loanTermMonths;
    } else {
        monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow((1 + monthlyInterestRate), loanTermMonths)) / (Math.pow((1 + monthlyInterestRate), loanTermMonths) - 1);
    }

    document.getElementById('monthly-payment').innerText = monthlyPayment.toFixed(2);
}
