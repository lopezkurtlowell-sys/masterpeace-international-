const CHURCH_NAME = "MasterPeace International";
        
let accounts = [
    { email: "lopezkurtlowell@gmail.com", pass: "1234510", role: "owner", ceoId: null },
    { email: "admin@masterpeace.org", pass: "admin123", role: "admin", ceoId: null },
    { email: "aldred@gmail.com", pass: "12345", role: "ceo", ceoId: "1" },
    { email: "gian@gmail.com", pass: "12345", role: "ceo", ceoId: "2" },
    { email: "james@gmail.com", pass: "12345", role: "ceo", ceoId: "3" },
    { email: "kaeya@gmail.com", pass: "12345", role: "ceo", ceoId: "4" }
];

let currentUser = null;
let selectedCeoId = null;

let posts = [
    {
        id: 1,
        author: CHURCH_NAME,
        image: "CTA.jpg",
        caption: "Sunday Worship Service Every Sunday starting at 8:30am & 3:30pm. Everyone is welcome."
    }
];

let businesses = {
    1: {
        ceoName: "Aldred",
        name: "Fruitful Vine",
        banner: "example",
        desc: "omgosh",
        contact: "john@gracebooks.com | (555) 123-4567",
        hoStatus: {
            clientCount: 120,
            grossAmount: 45000,
            partners: [
                { name: "John Doe", make: 2500, offer: 250 },
                { name: "Jane Smith", make: 2500, offer: 250 }
            ]
        }
    },
    2: {
        ceoName: "Gian",
        name: "Verdant Trust Media",
        banner: "example",
        desc: "araw ko po",
        contact: "mary@faithmedia.com | (555) 987-6543",
        hoStatus: {
            clientCount: 85,
            grossAmount: 32000,
            partners: [
                { name: "Mark Wilson", make: 4000, offer: 400 }
            ]
        }
    },
    3: {
        ceoName: "james",
        name: "FavorWorks",
        banner: "example",
        desc: "Providing support and resources to those in need.",
        contact: "james@hopecommunity.org | (555) 555-5555",
        hoStatus: {
            clientCount: 40,
            grossAmount: 18000,
            partners: [
                { name: "Sarah Lee", make: 3000, offer: 300 }
            ]
        }
    },
    4: {
        ceoName: "Kaeya",
        name: "EbonnyTech",
        banner: "example",
        desc: "Providing support and resources to those in need.",
        contact: "james@hopecommunity.org | (555) 555-5555",
        hoStatus: {
            clientCount: 210,
            grossAmount: 95000,
            partners: [
                { name: "David Kim", make: 4000, offer: 500 },
                { name: "Emily Davis", make: 4000, offer: 500 }
            ]
        }
    }
};

const loadingScreen = document.getElementById('loading-screen');
const loginScreen = document.getElementById('login-screen');
const mainScreen = document.getElementById('main-screen');
const businessScreen = document.getElementById('business-screen');
const settingsScreen = document.getElementById('settings-screen');
const hoModal = document.getElementById('ho-modal');

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.display-church-name').forEach(el => el.innerText = CHURCH_NAME);
    document.getElementById('login-church-title').innerText = CHURCH_NAME;
    
    renderFeed();
    renderCeoList();
    renderAccountsList();
});

function navigateTo(targetScreen) {
    loadingScreen.classList.add('active');
    setTimeout(() => {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        targetScreen.classList.add('active');
        loadingScreen.classList.remove('active');
    }, 400);
}

// AUTHENTICATION LOGIC
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('login-error');

    const foundUser = accounts.find(a => a.email === email && a.pass === pass);

    if (foundUser) {
        currentUser = foundUser;
        errorDiv.innerText = "";
        
        if (currentUser.role === 'owner' || currentUser.role === 'admin') {
            document.body.className = "owner-mode";
        } else {
            document.body.className = "user-mode";
        }

        document.getElementById('user-mode-badge').innerText = `${currentUser.role.toUpperCase()} Mode`;
        document.getElementById('user-mode-badge').className = "badge badge-admin";
        
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";

        renderCeoList();
        navigateTo(mainScreen);
    } else {
        errorDiv.innerText = "Invalid Email or Password.";
    }
});

document.getElementById('guest-btn').addEventListener('click', () => {
    setViewingMode();
    navigateTo(mainScreen);
});

function setViewingMode() {
    currentUser = null;
    document.body.className = "viewer-mode";
    document.getElementById('user-mode-badge').innerText = "Viewing Mode";
    document.getElementById('user-mode-badge').className = "badge badge-viewer";
    renderCeoList();
}

// NAVIGATION BUTTONS
document.getElementById('nav-settings-btn').addEventListener('click', () => navigateTo(settingsScreen));
document.getElementById('settings-back-btn').addEventListener('click', () => navigateTo(mainScreen));
document.getElementById('back-to-main-btn').addEventListener('click', () => navigateTo(mainScreen));
document.getElementById('logout-btn').addEventListener('click', () => { setViewingMode(); alert("Switched to Viewing Mode."); });
document.getElementById('return-login-btn').addEventListener('click', () => { setViewingMode(); navigateTo(loginScreen); });
document.getElementById('close-ho-modal').addEventListener('click', () => hoModal.classList.remove('active'));

// FEED LOGIC
function renderFeed() {
    const container = document.getElementById('feed-container');
    container.innerHTML = "";

    posts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'post-card';
        article.innerHTML = `
            <div class="post-header">${post.author}</div>
            <img class="post-image" src="${post.image}" alt="Post image">
            <div class="post-caption"><p>${post.caption}</p></div>
        `;
        container.appendChild(article);
    });
}

document.getElementById('create-post-form').addEventListener('submit', (e) => {
    e.preventDefault();
    posts.unshift({
        id: Date.now(),
        author: CHURCH_NAME,
        image: document.getElementById('post-image-url').value,
        caption: document.getElementById('post-caption-input').value
    });
    renderFeed();
    document.getElementById('create-post-form').reset();
});

// CEO & HO STATUS LOGIC
function renderCeoList() {
    const container = document.getElementById('ceo-list-container');
    container.innerHTML = "";

    for (let id in businesses) {
        const li = document.createElement('li');
        li.className = 'ceo-item';
        
        let hoBtnHTML = '';
        if (currentUser) {
            const isAdmin = currentUser.role === 'admin' || currentUser.role === 'owner';
            const isOwnFolder = currentUser.role === 'ceo' && currentUser.ceoId === id;
            
            if (isAdmin || isOwnFolder) {
                hoBtnHTML = `<button class="btn-ho" onclick="event.stopPropagation(); openHoStatus('${id}')">HO Status</button>`;
            }
        }

        li.innerHTML = `
            <div onclick="openBusinessScreen('${id}')">
                <span>${businesses[id].ceoName}</span> 
                <small style="color:#777;">(${businesses[id].name})</small>
            </div>
            ${hoBtnHTML}
        `;
        container.appendChild(li);
    }
}

function openBusinessScreen(id) {
    selectedCeoId = id;
    const data = businesses[id];
    document.getElementById('biz-banner').src = data.banner;
    document.getElementById('biz-name').innerText = data.name;
    document.getElementById('biz-ceo').innerText = "CEO: " + data.ceoName;
    document.getElementById('biz-desc').innerText = data.desc;
    document.getElementById('biz-contact').innerText = data.contact;

    document.getElementById('edit-biz-name').value = data.name;
    document.getElementById('edit-biz-banner').value = data.banner;
    document.getElementById('edit-biz-desc').value = data.desc;
    document.getElementById('edit-biz-contact').value = data.contact;

    navigateTo(businessScreen);
}

// HO STATUS TAB IMPLEMENTATION
function openHoStatus(id) {
    const data = businesses[id];
    const ho = data.hoStatus;
    const body = document.getElementById('ho-modal-body');
    const isEditable = currentUser.role === 'ceo' && currentUser.ceoId === id;

    document.getElementById('ho-modal-title').innerText = `${data.ceoName}'s HO Status Tab`;

    // Calculate Totals
    const totalPartners = ho.partners.length;
    const totalEarnings = ho.partners.reduce((sum, p) => sum + Number(p.make || 0), 0);
    const totalOffering = ho.partners.reduce((sum, p) => sum + Number(p.offer || 0), 0);

    let html = `
        <div class="summary-box">
            <div class="summary-item">
                <strong>Client Count</strong>
                ${isEditable ? `<input type="number" id="ho-clients-input" value="${ho.clientCount}" style="padding:4px; margin-top:4px;">` : `<span>${ho.clientCount}</span>`}
            </div>
            <div class="summary-item">
                <strong>Gross Amount</strong>
                ${isEditable ? `<input type="number" id="ho-gross-input" value="${ho.grossAmount}" style="padding:4px; margin-top:4px;">` : `<span>$${ho.grossAmount.toLocaleString()}</span>`}
            </div>
            <div class="summary-item">
                <strong>Total Partners</strong>
                <span>${totalPartners}</span>
            </div>
            <div class="summary-item">
                <strong>Total Partner Earnings</strong>
                <span>$${totalEarnings.toLocaleString()}</span>
            </div>
            <div class="summary-item">
                <strong>Total Church Offerings</strong>
                <span>$${totalOffering.toLocaleString()}</span>
            </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
            <h4>Partner Directory</h4>
            ${isEditable ? `<button class="btn" style="width: auto; padding: 5px 12px; margin: 0;" onclick="addPartnerRow('${id}')">+ Add Partner</button>` : ''}
        </div>

        <table class="ho-table">
            <thead>
                <tr>
                    <th>Partner Name</th>
                    <th>Amount Made</th>
                    <th>Theist  Offering</th>
                    ${isEditable ? `<th style="width: 70px; text-align: center;">Action</th>` : ''}
                </tr>
            </thead>
            <tbody id="partner-table-body">
    `;

    if (ho.partners.length === 0) {
        html += `<tr><td colspan="${isEditable ? 4 : 3}" style="text-align:center; color:#888;">No partners listed.</td></tr>`;
    } else {
        ho.partners.forEach((partner, index) => {
            html += `
                <tr>
                    <td>
                        ${isEditable ? `<input type="text" value="${partner.name}" onchange="updatePartnerField('${id}', ${index}, 'name', this.value)">` : partner.name}
                    </td>
                    <td>
                        ${isEditable ? `<input type="number" value="${partner.make}" onchange="updatePartnerField('${id}', ${index}, 'make', this.value)">` : `$${Number(partner.make).toLocaleString()}`}
                    </td>
                    <td>
                        ${isEditable ? `<input type="number" value="${partner.offer}" onchange="updatePartnerField('${id}', ${index}, 'offer', this.value)">` : `$${Number(partner.offer).toLocaleString()}`}
                    </td>
                    ${isEditable ? `<td style="text-align: center;"><button class="btn-sm-danger" onclick="removePartnerRow('${id}', ${index})">Remove</button></td>` : ''}
                </tr>
            `;
        });
    }

    html += `
            </tbody>
        </table>
    `;

    if (isEditable) {
        html += `
            <div style="margin-top: 20px; text-align: right;">
                <button class="btn" style="width: auto; padding: 8px 20px;" onclick="saveHoSummary('${id}')">Save Changes</button>
            </div>
        `;
    }

    body.innerHTML = html;
    hoModal.classList.add('active');
}

function updatePartnerField(ceoId, index, field, value) {
    if (field === 'make' || field === 'offer') {
        businesses[ceoId].hoStatus.partners[index][field] = Number(value);
    } else {
        businesses[ceoId].hoStatus.partners[index][field] = value;
    }
}

function addPartnerRow(ceoId) {
    businesses[ceoId].hoStatus.partners.push({ name: "New Partner", make: 0, offer: 0 });
    openHoStatus(ceoId);
}

function removePartnerRow(ceoId, index) {
    businesses[ceoId].hoStatus.partners.splice(index, 1);
    openHoStatus(ceoId);
}

function saveHoSummary(ceoId) {
    const clientInput = document.getElementById('ho-clients-input');
    const grossInput = document.getElementById('ho-gross-input');

    if (clientInput) businesses[ceoId].hoStatus.clientCount = Number(clientInput.value);
    if (grossInput) businesses[ceoId].hoStatus.grossAmount = Number(grossInput.value);

    alert("HO Status tab saved successfully!");
    openHoStatus(ceoId);
}

// EDIT BUSINESS LOGIC
document.getElementById('edit-business-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selectedCeoId) return;

    businesses[selectedCeoId].name = document.getElementById('edit-biz-name').value;
    businesses[selectedCeoId].banner = document.getElementById('edit-biz-banner').value;
    businesses[selectedCeoId].desc = document.getElementById('edit-biz-desc').value;
    businesses[selectedCeoId].contact = document.getElementById('edit-biz-contact').value;

    openBusinessScreen(selectedCeoId);
    renderCeoList();
    alert("Business Information Updated!");
});

// SETTINGS: ACCOUNT CREATION
document.getElementById('add-editor-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('new-editor-email').value;
    const pass = document.getElementById('new-editor-pass').value;
    const role = document.getElementById('new-editor-role').value;

    accounts.push({ email, pass, role, ceoId: null });
    renderAccountsList();
    document.getElementById('add-editor-form').reset();
    alert("New account successfully added!");
});

function renderAccountsList() {
    const list = document.getElementById('account-list-display');
    list.innerHTML = "";
    accounts.forEach(acc => {
        const li = document.createElement('li');
        li.className = 'account-item';
        li.innerText = `${acc.email} (${acc.role.toUpperCase()})`;
        list.appendChild(li);
    });
}