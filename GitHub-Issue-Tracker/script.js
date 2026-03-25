// --- DUMMY DATA ---
const issuesData = [
    { id: 1, title: "Auth system bug", desc: "User cannot login with valid credentials.", status: "open", author: "Shahidul", priority: "High", label: "Bug", createdAt: "2024-03-20" },
    { id: 2, title: "UI Layout issue", desc: "Sidebar overlapping on mobile screens.", status: "closed", author: "Rahat", priority: "Medium", label: "UI", createdAt: "2024-03-18" },
    { id: 3, title: "API Integration", desc: "Fetch issues data from local storage.", status: "open", author: "Karim", priority: "Low", label: "Feature", createdAt: "2024-03-22" },
    { id: 4, title: "Performance Lag", desc: "Dashboard loading taking too much time.", status: "open", author: "Zaman", priority: "High", label: "Performance", createdAt: "2024-03-25" },
];

let currentFilter = 'all';

// --- LOGIN LOGIC ---
function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin123') {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('main-page').classList.remove('hidden');
        renderIssues(issuesData);
    } else {
        alert("Invalid credentials! Hint: admin / admin123");
    }
}

// --- RENDER FUNCTION (The Core) ---
function renderIssues(data) {
    const grid = document.getElementById('issuesGrid');
    const countText = document.getElementById('issueCount');
    grid.innerHTML = ''; // Clear old data

    countText.innerText = `${data.length} Issues Found`;

    data.forEach(issue => {
        const card = document.createElement('div');
        card.className = "bg-gray-800 border border-gray-700 p-4 rounded-lg hover:border-blue-500 cursor-pointer transition-all duration-300";
        card.onclick = () => showModal(issue);

        const statusIcon = issue.status === 'open' ? 'Open-Status.png' : 'Closed- Status .png';

        card.innerHTML = `
            <div class="flex items-start justify-between mb-2">
                <h4 class="font-semibold text-blue-400 truncate w-4/5">${issue.title}</h4>
                <img src="${statusIcon}" class="w-4 mt-1">
            </div>
            <p class="text-xs text-gray-400 line-clamp-2 mb-3">${issue.desc}</p>
            <div class="flex flex-wrap gap-2 text-[10px] mb-4">
                <span class="bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded border border-blue-800">${issue.label}</span>
                <span class="bg-gray-700 px-2 py-0.5 rounded">${issue.priority}</span>
            </div>
            <div class="flex justify-between items-center text-[11px] text-gray-500 border-t border-gray-700 pt-3">
                <span>By ${issue.author}</span>
                <span>${issue.createdAt}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// --- FILTERING ---
function filterIssues(status) {
    currentFilter = status;
    
    // UI Update for Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('text-blue-400', 'font-bold');
        if(btn.innerText.toLowerCase() === status) {
            btn.classList.add('text-blue-400', 'font-bold');
        }
    });

    if (status === 'all') {
        renderIssues(issuesData);
    } else {
        const filtered = issuesData.filter(i => i.status === status);
        renderIssues(filtered);
    }
}

// --- SEARCH ---
function searchIssues() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const searched = issuesData.filter(i => 
        i.title.toLowerCase().includes(query) || 
        i.desc.toLowerCase().includes(query)
    );
    renderIssues(searched);
}

// --- MODAL ---
function showModal(issue) {
    const modal = document.getElementById('issue_modal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');

    title.innerText = issue.title;
    content.innerHTML = `
        <p><strong>Status:</strong> <span class="uppercase">${issue.status}</span></p>
        <p><strong>Description:</strong> ${issue.desc}</p>
        <p><strong>Author:</strong> ${issue.author}</p>
        <p><strong>Priority:</strong> ${issue.priority}</p>
        <p><strong>Label:</strong> ${issue.label}</p>
        <p><strong>Created At:</strong> ${issue.createdAt}</p>
    `;
    modal.showModal();
}