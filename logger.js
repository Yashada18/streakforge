document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('problem-form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const problemData = {
            name: document.getElementById('problem-name').value,
            platform: document.getElementById('platform').value,
            topic: document.getElementById('topic').value,
            difficulty: document.getElementById('difficulty').value,
            notes: document.getElementById('notes').value,
            tags: Array.from(document.querySelectorAll('input[name="tags"]:checked')).map(tag => tag.value),
            confidence: document.getElementById('confidence').value
        };

        let logs = JSON.parse(localStorage.getItem('problemLogs')) || [];
        logs.push(problemData);
        localStorage.setItem('problemLogs', JSON.stringify(logs));

        console.log("✅ Problem logged successfully:", problemData);

        // Optionally show a subtle UI message instead of alert:
        const successMsg = document.getElementById('success-message');
        if (successMsg) {
            successMsg.style.display = 'block';
            setTimeout(() => successMsg.style.display = 'none', 3000);
        }

        form.reset();
    });
});
