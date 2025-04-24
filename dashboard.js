document.addEventListener('DOMContentLoaded', () => {
    const summary = document.getElementById('weekly-summary');
    const progressBar = document.querySelector('.progress-bar');
    const heatmap = document.getElementById('heatmap');

    let logs = JSON.parse(localStorage.getItem('problemLogs')) || [];

    // Count problems from the current week
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Sunday
    let weeklyCount = 0;

    logs.forEach(log => {
        const logDate = new Date(log.timestamp || new Date());
        if (logDate >= startOfWeek) {
            weeklyCount++;
        }
    });

    // Update summary text
    summary.textContent = `You solved ${weeklyCount} problem${weeklyCount !== 1 ? 's' : ''} this week 👏`;

    // Update progress bar (assume goal of 20 problems/week)
    const maxGoal = 20;
    const progress = Math.min((weeklyCount / maxGoal) * 100, 100);
    progressBar.style.width = `${progress}%`;

    // Generate simple streak heatmap (7-day)
    heatmap.innerHTML = '';
    for (let i = 0; i < 7; i++) {
        const dayBox = document.createElement('div');
        dayBox.classList.add('day-box');

        const date = new Date();
        date.setDate(date.getDate() - (6 - i));

        const dayCount = logs.filter(log => {
            const logDate = new Date(log.timestamp || new Date());
            return logDate.toDateString() === date.toDateString();
        }).length;

        if (dayCount > 0) {
            dayBox.classList.add('active');
        }

        heatmap.appendChild(dayBox);
    }
});
