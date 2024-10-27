document.getElementById('addRow').addEventListener('click', addRow);
document.getElementById('calculate').addEventListener('click', calculateGPA);
document.getElementById('reset').addEventListener('click', resetTable);

function addRow() {
    const table = document.getElementById('courseRows');
    const newRow = table.rows[0].cloneNode(true);
    
    newRow.querySelectorAll('input, select').forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = true;
        } else {
            input.value = '';
        }
    });
    
    newRow.querySelector('.deleteRow').addEventListener('click', () => newRow.remove());
    table.appendChild(newRow);
}

function calculateGPA() {
    const rows = document.querySelectorAll('#courseRows tr');
    let totalPoints = 0;
    let totalCredits = 0;
    
    rows.forEach(row => {
        const checkbox = row.cells[0].querySelector('input[type="checkbox"]');
        const grade = row.cells[2].querySelector('select').value;
        const credits = parseFloat(row.cells[3].querySelector('input[type="number"]').value);
        
        if (checkbox.checked && grade && credits) {
            totalPoints += parseFloat(grade) * credits;
            totalCredits += credits;
        }
    });
    
    const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : 0;
    document.getElementById('gpaResult').value = gpa;
}

function resetTable() {
    const rows = document.querySelectorAll('#courseRows tr');
    rows.forEach((row, index) => {
        row.querySelectorAll('input, select').forEach(input => {
            if (input.type === 'checkbox') {
                input.checked = index === 0;
            } else {
                input.value = '';
            }
        });
        if (index > 0) row.remove();
    });
    document.getElementById('gpaResult').value = '';
}