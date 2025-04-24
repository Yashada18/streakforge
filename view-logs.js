document.addEventListener("DOMContentLoaded", () => {
    const logList = document.getElementById("logList");
    const filter = document.getElementById("filter");
  
    let logs = JSON.parse(localStorage.getItem("problemLogs")) || [];
  
    function renderLogs(filterTag = "all") {
      logList.innerHTML = "";
  
      const filteredLogs = logs.filter(log => {
        return filterTag === "all" || log.tags.includes(filterTag);
      });
  
      if (filteredLogs.length === 0) {
        logList.innerHTML = `<p style="text-align:center;">No logs found for selected tag.</p>`;
        return;
      }
  
      filteredLogs.forEach((log, index) => {
        const card = document.createElement("div");
        card.className = "log-card";
        card.innerHTML = `
          <h3>${log.name} (${log.platform})</h3>
          <p><strong>Topic:</strong> ${log.topic}</p>
          <p><strong>Difficulty:</strong> ${log.difficulty}</p>
          <p><strong>Confidence:</strong> ${log.confidence}</p>
          <p><strong>Notes:</strong> ${log.notes}</p>
          <div class="tags">
            ${log.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <button class="btn-delete" data-index="${index}">🗑 Delete</button>
        `;
        logList.appendChild(card);
      });
  
      document.querySelectorAll(".btn-delete").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          logs.splice(index, 1);
          localStorage.setItem("problemLogs", JSON.stringify(logs));
          renderLogs(filter.value);
        });
      });
    }
  
    filter.addEventListener("change", () => {
      renderLogs(filter.value);
    });
  
    renderLogs();
  });
  