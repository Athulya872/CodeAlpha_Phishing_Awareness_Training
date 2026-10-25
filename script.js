
/* =========================================
   CodeAlpha - Phishing Awareness Training
   JavaScript functionality
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Fake phishing email demonstration
    const demoButton = document.getElementById("demo-button");
    const demoResult = document.getElementById("demo-result");

    if (demoButton && demoResult) {
        demoButton.addEventListener("click", function () {
            demoResult.innerHTML = `
                <strong>Phishing Warning!</strong><br><br>
                This sample email contains common phishing warning signs:
                <ul>
                    <li>Urgent language that pressures you to act quickly.</li>
                    <li>A suspicious or unexpected link.</li>
                    <li>A request to verify sensitive account information.</li>
                </ul>
                <p><strong>Safety tip:</strong> Do not click suspicious links
                or share your password. Verify the sender through an
                official website or contact channel.</p>
            `;

            demoResult.style.backgroundColor = "#fff4e5";
            demoResult.style.color = "#8a4b08";
            demoResult.style.border = "1px solid #e5a000";
        });
    }

    // 2. Suspicious domain checker
    const domainButton = document.getElementById("domain-button");
    const domainInput = document.getElementById("domain-input");
    const domainResult = document.getElementById("domain-result");

    if (domainButton && domainInput && domainResult) {
        domainButton.addEventListener("click", function () {
            const domain = domainInput.value.trim().toLowerCase();

            if (domain === "") {
                showDomainResult(
                    "Please enter a website domain to check.",
                    "#fff4e5",
                    "#8a4b08"
                );
                return;
            }

            // Basic format validation
            const cleanedDomain = domain
                .replace(/^https?:\/\//, "")
                .split("/")[0]
                .split(":")[0];

            const validDomain =
                /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/
                    .test(cleanedDomain);

            if (!validDomain) {
                showDomainResult(
                    "Please enter a valid domain, such as example.com.",
                    "#fff4e5",
                    "#8a4b08"
                );
                return;
            }

            // Basic warning patterns, not a security verdict
            const suspiciousPatterns = [
                /@/,
                /login.*verify/,
                /secure.*account/,
                /account.*suspend/,
                /free.*gift/,
                /password.*reset/,
                /xn--/,
                /paypa[l1].*secure/,
                /amaz[o0]n.*verify/
            ];

            const suspicious = suspiciousPatterns.some(function (pattern) {
                return pattern.test(cleanedDomain);
            });

            if (suspicious) {
                showDomainResult(
                    "Warning: this domain matches a suspicious pattern. " +
                    "Do not enter personal information until you verify it.",
                    "#fdecea",
                    "#b42318"
                );
            } else {
                showDomainResult(
                    "No listed warning pattern was detected. This does NOT " +
                    "prove the website is safe. Check the exact domain and " +
                    "verify it through an official source.",
                    "#e8f5e9",
                    "#216e39"
                );
            }
        });
    }

    function showDomainResult(message, backgroundColor, textColor) {
        domainResult.textContent = message;
        domainResult.style.backgroundColor = backgroundColor;
        domainResult.style.color = textColor;
        domainResult.style.padding = "15px";
        domainResult.style.borderRadius = "7px";
        domainResult.style.marginTop = "15px";
    }

    // 3. Phishing awareness quiz
    const quizForm = document.getElementById("quiz-form");
    const quizResult = document.getElementById("quiz-result");

    if (quizForm && quizResult) {
        quizForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const answers = {
                q1: "b",
                q2: "c",
                q3: "a",
                q4: "b"
            };

            let score = 0;
            const totalQuestions = Object.keys(answers).length;
            const unanswered = [];

            for (const question in answers) {
                const selected = quizForm.querySelector(
                    `input[name="${question}"]:checked`
                );

                if (!selected) {
                    unanswered.push(question);
                } else if (selected.value === answers[question]) {
                    score++;
                }
            }

            if (unanswered.length > 0) {
                quizResult.textContent =
                    "Please answer all " + totalQuestions +
                    " questions before submitting the quiz.";
                quizResult.style.backgroundColor = "#fff4e5";
                quizResult.style.color = "#8a4b08";
                return;
            }

            const percentage = Math.round(
                (score / totalQuestions) * 100
            );

            let message;

            if (score === totalQuestions) {
                message = "Excellent! You answered every question correctly.";
            } else if (score >= 3) {
                message = "Good job! Review the missed topics to improve.";
            } else {
                message = "Keep learning! Review the phishing awareness tips and try again.";
            }

            quizResult.textContent =
                "Your score: " + score + "/" + totalQuestions +
                " (" + percentage + "%). " + message;

            if (score >= 3) {
                quizResult.style.backgroundColor = "#e8f5e9";
                quizResult.style.color = "#216e39";
            } else {
                quizResult.style.backgroundColor = "#fff4e5";
                quizResult.style.color = "#8a4b08";
            }

            quizResult.style.padding = "15px";
            quizResult.style.borderRadius = "7px";
            quizResult.style.marginTop = "15px";
        });
    }

    // 4. Smooth scrolling for internal navigation links
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (targetId && targetId.length > 1) {
                const target = document.querySelector(targetId);

                if (target) {
                    event.preventDefault();
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

});
