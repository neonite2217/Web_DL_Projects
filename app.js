document.addEventListener('DOMContentLoaded', (event) => {
    const dateInput = document.getElementById('date');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const form = document.getElementById('ageForm');

    form.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            if (document.activeElement === dateInput) {
                monthInput.focus();
            } else if (document.activeElement === monthInput) {
                yearInput.focus();
            }
        } else if (e.key === 'ArrowLeft') {
            if (document.activeElement === yearInput) {
                monthInput.focus();
            } else if (document.activeElement === monthInput) {
                dateInput.focus();
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            age();
        }
    });
});

function age() {
    const day = document.getElementById('date').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    document.getElementById('age').innerHTML = `You are ${ageYears} years, ${ageMonths} months, and ${ageDays} days old.`;
}
