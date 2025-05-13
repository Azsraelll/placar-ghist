const teams = [
  {
    id: 1,
    name: "Duque de Caxias",
    points: 0,
    image: "../../src/img/duque.jpg" // Caminho corrigido
  },
  {
    id: 2,
    name: "Ricardo Coração de Leão",
    points: 0,
    image: "../../src/img/richard-the-lionheart-8730.jpg"
  },
  {
    id: 3,
    name: "Belisarius",
    points: 0,
    image: "../../src/img/Belisarius_mosaic.jpg"
  },
  {
    id: 4,
    name: "Raposo Tavares",
    points: 0,
    image: "../../src/img/raposo-tavares.jpg"
  },
  {
    id: 5,
    name: "Equipe Roxa",
    points: 0,
    image: "https://placehold.co/100x100/6F42C1/ffffff?text=Roxa"
  },
  {
    id: 6,
    name: "Equipe Laranja",
    points: 0,
    image: "https://placehold.co/100x100/FD7E14/ffffff?text=Laranja"
  }
];

const container = document.getElementById("teamsContainer");
const rankingList = document.getElementById("rankingList");

// Mapeamento de ID -> DOM Element
const teamMap = new Map();

function createTeamElement(team) {
  const div = document.createElement("div");
  div.className = "team";
  div.dataset.id = team.id;

  div.innerHTML = `
    <img src="${team.image}" alt="${team.name}">
    <h2>${team.name}</h2>
    <input type="number" value="${team.points}" />
  `;

  const input = div.querySelector("input");

  // Salva valor temporário até pressionar Enter
  let tempValue = team.points;

  input.addEventListener("input", (e) => {
    tempValue = parseInt(e.target.value) || 0;
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      team.points = tempValue;
      animateReorder();
      input.blur(); // tira o foco ao confirmar
    }
  });

  return div;
}

function renderTeams() {
  teams.forEach(team => {
    const el = createTeamElement(team);
    teamMap.set(team.id, el);
    container.appendChild(el);
  });
}

function renderRanking() {
  rankingList.innerHTML = '';
  const sorted = [...teams].sort((a, b) => b.points - a.points);
  sorted.forEach((team, i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}º - ${team.name} (${team.points} pts)`;
    rankingList.appendChild(li);
  });
}

function animateReorder() {
  const sorted = [...teams].sort((a, b) => b.points - a.points);

  // Posições antes da ordenação
  const positions = new Map();
  sorted.forEach(team => {
    const el = teamMap.get(team.id);
    positions.set(team.id, el.getBoundingClientRect().top);
  });

  // Reordena visualmente
  sorted.forEach(team => {
    container.appendChild(teamMap.get(team.id));
  });

  // Aplica transições
  sorted.forEach(team => {
    const el = teamMap.get(team.id);
    const oldTop = positions.get(team.id);
    const newTop = el.getBoundingClientRect().top;
    const deltaY = oldTop - newTop;

    el.style.transition = 'none';
    el.style.transform = `translateY(${deltaY}px)`;

    requestAnimationFrame(() => {
      el.style.transition = 'transform 0.4s ease';
      el.style.transform = 'translateY(0)';
    });
  });

  renderRanking();
}

// Inicializa
renderTeams();
renderRanking();

