async function loadRegistry() {
  const res = await fetch("../registry.json");
  const registry = await res.json();
  return registry.entries;
}

function render(entries) {
  const container = document.getElementById("entries");
  container.innerHTML = "";
  entries.forEach(e => {
    const div = document.createElement("div");
    div.className = "entry";
    div.innerHTML = `<strong>${e.id}</strong> (${e.type}) – ${e.version}<br/><code>${e.path}</code>`;
    container.appendChild(div);
  });
}

(async () => {
  const entries = await loadRegistry();
  render(entries);

  document.querySelectorAll("#filters button").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      if (type === "all") render(entries);
      else render(entries.filter(e => e.type === type));
    });
  });
})();