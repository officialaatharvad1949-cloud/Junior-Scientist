const box = document.getElementById('members');
const sel = document.getElementById('teamSize');
const regForm = document.getElementById('regForm');

function render() {
    box.innerHTML = '';
    for (let i = 1; i <= +sel.value; i++) {
        // Added unique IDs to every input so we can easily fetch them later
        box.innerHTML += `<div class="member">
            <h3>${i === 1 ? 'Leader' : 'Member ' + i}</h3>
            <label>Name<input class="name" id="member_${i}_name"></label>
            <label>Phone<input class="phone" id="member_${i}_phone"></label>
            <label>Alternate Phone<input class="phone" id="member_${i}_alt_phone"></label>
            <label>Email<input class="email" id="member_${i}_email"></label>
            <label>School<input id="member_${i}_school"></label>
            <label>City<input id="member_${i}_city"></label>
            <label>Class<input id="member_${i}_class"></label>
        </div>`;
    }
}

render();
sel.onchange = render;

// Changed to async to support the await fetch call
regForm.onsubmit = async e => {
    e.preventDefault(); 
    let ok = true;
    
    // Validation
    document.querySelectorAll('input').forEach(i => i.classList.remove('error'));
    document.querySelectorAll('.name').forEach(i => { if (i.value.trim().length < 2) { i.classList.add('error'); ok = false; } });
    document.querySelectorAll('.phone').forEach(i => { if (!/^\d{10}$/.test(i.value)) { i.classList.add('error'); ok = false; } });
    document.querySelectorAll('.email').forEach(i => { if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value)) { i.classList.add('error'); ok = false; } });
    
    const agree = document.getElementById('agree');
    if (!agree.checked) { alert('Please accept the rules.'); return; }
    if (!ok) { alert('Please correct highlighted fields.'); return; }

    // Collect all data from the input fields
    const formData = new FormData();
    formData.append('team_name', document.getElementById('teamName').value);
    formData.append('team_size', sel.value);

    // Loop through the selected team size to dynamically append all member data
    for (let i = 1; i <= +sel.value; i++) {
        formData.append(`member_${i}_name`, document.getElementById(`member_${i}_name`).value);
        formData.append(`member_${i}_phone`, document.getElementById(`member_${i}_phone`).value);
        formData.append(`member_${i}_alt_phone`, document.getElementById(`member_${i}_alt_phone`).value);
        formData.append(`member_${i}_email`, document.getElementById(`member_${i}_email`).value);
        formData.append(`member_${i}_school`, document.getElementById(`member_${i}_school`).value);
        formData.append(`member_${i}_city`, document.getElementById(`member_${i}_city`).value);
        formData.append(`member_${i}_class`, document.getElementById(`member_${i}_class`).value);
    }

    try {
        // Send data to the Python backend
        let response = await fetch('http://127.0.0.1:8000/register', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("Registration Successful! Data saved to Excel.");
            regForm.reset();
            render(); // Reset the dynamic fields back to the default state (Team size 3)
        } else {
            alert("Submission failed. Check backend connection.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Could not connect to the server.");
    }
};