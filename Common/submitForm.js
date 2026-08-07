async function submitForm(formId, apiEndpoint) {
   
    const form = document.getElementById(formId);

    form.onsubmit = async function (e) {

        e.preventDefault();

        let ok = true;

        document.querySelectorAll("input").forEach(input =>
            input.classList.remove("error")
        );

        // Name Validation
        document.querySelectorAll(".name").forEach(input => {
            if (input.value.trim().length < 2) {
                input.classList.add("error");
                ok = false;
            }
        });

        // Phone Validation
        document.querySelectorAll(".phone").forEach(input => {
            if (input.value !== "" && !/^\d{10}$/.test(input.value)) {
                input.classList.add("error");
                ok = false;
            }
        });

        // Email Validation
        document.querySelectorAll(".email").forEach(input => {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                input.classList.add("error");
                ok = false;
            }
        });

        // Checkbox
        const agree = document.getElementById("agree");

        if (agree && !agree.checked) {
            alert("Please accept the rules.");
            return;
        }

        if (!ok) {
            alert("Please correct the highlighted fields.");
            return;
        }

        const formData = new FormData(form);

        try {

            const response = await fetch(
                `http://127.0.0.1:8000${apiEndpoint}`,
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (response.ok) {

                alert(result.message);

                form.reset();

            } else {

                alert(result.message);

            }

        }
        catch (err) {

            console.error(err);

            alert("Could not connect to server.");

        }

    }

}