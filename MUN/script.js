const members = document.getElementById("members");
const teamSize = document.getElementById("teamSize");
const form = document.getElementById("form");

function render() {

    members.innerHTML = "";

    for (let i = 1; i <= +teamSize.value; i++) {

        members.innerHTML += `
        <div class="member">

            <h3>${i === 1 ? "Head Delegate" : "Delegate " + i}</h3>

            <label>Name
                <input class="name" id="member_${i}_name">
            </label>

            <label>Phone
                <input class="phone" id="member_${i}_phone">
            </label>

            <label>Alternate Phone
                <input class="phone" id="member_${i}_alt_phone">
            </label>

            <label>Email
                <input class="email" id="member_${i}_email">
            </label>

            <label>School
                <input id="member_${i}_school">
            </label>

            <label>City
                <input id="member_${i}_city">
            </label>

            <label>Class
                <input id="member_${i}_class">
            </label>

        </div>
        `;
    }

}

render();

teamSize.onchange = render;

form.onsubmit = async function (e) {

    e.preventDefault();

    let ok = true;

    document.querySelectorAll("input").forEach(i =>
        i.classList.remove("error")
    );

    document.querySelectorAll(".name").forEach(i => {
        if (i.value.trim().length < 2) {
            i.classList.add("error");
            ok = false;
        }
    });

    document.querySelectorAll(".phone").forEach(i => {
        if (!/^\d{10}$/.test(i.value)) {
            i.classList.add("error");
            ok = false;
        }
    });

    document.querySelectorAll(".email").forEach(i => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value)) {
            i.classList.add("error");
            ok = false;
        }
    });

    const agree = document.getElementById("agree");

    if (!agree.checked) {
        alert("Please accept the rules.");
        return;
    }

    if (!ok) {
        alert("Please correct highlighted fields.");
        return;
    }

    const formData = new FormData();

    formData.append(
        "team_name",
        document.getElementById("teamName").value
    );

    formData.append(
        "team_size",
        teamSize.value
    );

    for (let i = 1; i <= +teamSize.value; i++) {

        formData.append(`member_${i}_name`, document.getElementById(`member_${i}_name`).value);
        formData.append(`member_${i}_phone`, document.getElementById(`member_${i}_phone`).value);
        formData.append(`member_${i}_alt_phone`, document.getElementById(`member_${i}_alt_phone`).value);
        formData.append(`member_${i}_email`, document.getElementById(`member_${i}_email`).value);
        formData.append(`member_${i}_school`, document.getElementById(`member_${i}_school`).value);
        formData.append(`member_${i}_city`, document.getElementById(`member_${i}_city`).value);
        formData.append(`member_${i}_class`, document.getElementById(`member_${i}_class`).value);

    }

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/mun/register",
            {
                method: "POST",
                body: formData
            }
        );

        if (response.ok) {

            alert("Registration Successful!");

            form.reset();

            render();

        } else {

            const result = await response.json();

            alert(result.message || "Registration Failed.");

        }

    } catch (err) {

        console.error(err);

        alert("Could not connect to the server.");

    }

};