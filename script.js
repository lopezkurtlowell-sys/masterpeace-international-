const CHURCH_NAME = "MasterPeace International";

//CEO accounts and specific services assigned 
let accounts = [
    { email: "a", pass: "1", role: "editor", ceoId: null },
    { email: "admin@masterpeace.org", pass: "admin123", role: "admin", ceoId: null },
    { email: "aldred@gmail.com", pass: "12345", role: "ceo", ceoId: "1" },
    { email: "gian@gmail.com", pass: "12345", role: "ceo", ceoId: "2" },
    { email: "james@gmail.com", pass: "12345", role: "ceo", ceoId: "3" },
    { email: "kaeya@gmail.com", pass: "12345", role: "ceo", ceoId: "4" },
    { email: "kurt@gmail.com", pass: "12345", role: "ceo", ceoId: "5" },
    { email: "michael@gmail.com", pass: "12345", role: "ceo", ceoId: "6" },
    { email: "david@gmail.com", pass: "12345", role: "ceo", ceoId: "7" },
    { email: "hannah@gmail.com", pass: "12345", role: "ceo", ceoId: "8" },
    { email: "chris@gmail.com", pass: "12345", role: "ceo", ceoId: "9" },
    { email: "patricia@gmail.com", pass: "12345", role: "ceo", ceoId: "10" }
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

// Businesses assigned to services  and portfolio section 
let businesses = {
    1: {
        ceoName: "Aldred",
        service: "Bookkeeping/qbo",
        name: "Fruitful Vine",
        banner: "https://cdn.dribbble.com/userupload/5531801/file/original-c266db75c4a3f4f603a5800f18093c38.jpg",
        desc: "Expert QuickBooks Online bookkeeping services.",
        contact: "john@gracebooks.com | (555) 123-4567",
        portfolioSection: {
            visible: true,
            resumes: "https://example.com/aldred-resume.pdf",
            portfolios: "https://example.com/aldred-portfolio",
            website: "https://fruitfulvine.com"
        },
        hoStatus: {
            clientCount: 12,
            grossAmount: 45000,
            partners: [
                { name: "John Doe", tithes: 2500, offering: 250 },
                { name: "Jane Smith", tithes: 2500, offering: 250 }
            ]
        }
    },
    2: {
        ceoName: "Gian",
        service: "Lead generation",
        name: "Verdant Trust Media",
        banner: "https://cdn.dribbble.com/userupload/5531801/file/original-c266db75c4a3f4f603a5800f18093c38.jpg",
        desc: "High quality B2B lead generation.",
        contact: "mary@faithmedia.com | (555) 987-6543",
        portfolioSection: {
            visible: true,
            resumes: "https://example.com/gian-resume.pdf",
            portfolios: "",
            website: "https://verdanttrust.com"
        },
        hoStatus: {
            clientCount: 85,
            grossAmount: 32000,
            partners: [
                { name: "Mark Wilson", tithes: 4000, offering: 400 }
            ]
        }
    },
    3: {
        ceoName: "James",
        service: "Smm",
        name: "FavorWorks",
        banner: "https://cdn.dribbble.com/userupload/5531801/file/original-c266db75c4a3f4f603a5800f18093c38.jpg",
        desc: "Social Media Management & Strategy.",
        contact: "james@hopecommunity.org | (555) 555-5555",
        portfolioSection: { visible: false, resumes: "", portfolios: "", website: "" },
        hoStatus: {
            clientCount: 40,
            grossAmount: 18000,
            partners: [
                { name: "Sarah Lee", tithes: 3000, offering: 300 }
            ]
        }
    },
    4: {
        ceoName: "Kaeya",
        service: "Graphics designer",
        name: "Radiant Victory",
        banner: "https://cdn.dribbble.com/userupload/5531801/file/original-c266db75c4a3f4f603a5800f18093c38.jpg",
        desc: "Branding and digital graphics solutions.",
        contact: "kaeya@ebonnytech.com | (555) 555-5555",
        portfolioSection: { visible: true, resumes: "", portfolios: "https://behance.net/kaeya", website: "" },
        hoStatus: {
            clientCount: 210,
            grossAmount: 95000,
            partners: [
                { name: "David Kim", tithes: 4000, offering: 500 },
                { name: "Emily Davis", tithes: 4000, offering: 500 }
            ]
        }
    },
    5: {
        ceoName: "Kurt",
        service: "Video editing",
        name: "CineVision",
        banner: "https://cdn.dribbble.com/userupload/5531801/file/original-c266db75c4a3f4f603a5800f18093c38.jpg",
        desc: "Professional post-production & cinematic editing.",
        contact: "sarah@cinevision.com | (555) 111-2222",
        portfolioSection: { visible: true, resumes: "", portfolios: "https://vimeo.com/sarah", website: "" },
        hoStatus: { clientCount: 15, grossAmount: 25000, partners: [] }
    },
    6: {
        ceoName: "Michael",
        service: "Short form",
        name: "ViralClips Studio",
        banner: "https://cdn.dribbble.com/userupload/5531801/file/original-c266db75c4a3f4f603a5800f18093c38.jpg",
        desc: "Short-form video content creation (TikTok/Reels/Shorts).",
        contact: "mike@viralclips.com | (555) 222-3333",
        portfolioSection: { visible: false, resumes: "", portfolios: "", website: "" },
        hoStatus: { clientCount: 30, grossAmount: 40000, partners: [] }
    },
    7: {
        ceoName: "David",
        service: "VA",
        name: "Apex Virtual Assistants",
        banner: "https://cdn.dribbble.com/userupload/5531801/file/original-c266db75c4a3f4f603a5800f18093c38.jpg",
        desc: "Dedicated administrative and executive assistance.",
        contact: "david@apexva.com | (555) 333-4444",
        portfolioSection: { visible: false, resumes: "", portfolios: "", website: "" },
        hoStatus: { clientCount: 50, grossAmount: 35000, partners: [] }
    },
    8: {
        ceoName: "Hannah",
        service: "Copywriter",
        name: "Ink & Impact",
        banner: "https://cdn.dribbble.com/userupload/5531801/file/original-c266db75c4a3f4f603a5800f18093c38.jpg",
        desc: "Persuasive sales copywriting and content.",
        contact: "hannah@inkandimpact.com | (555) 444-5555",
        portfolioSection: { visible: false, resumes: "", portfolios: "", website: "" },
        hoStatus: { clientCount: 22, grossAmount: 28000, partners: [] }
    },
    9: {
        ceoName: "Chris",
        service: "Data Entry",
        name: "Precise Analytics",
        banner: "https://cdn.dribbble.com/userupload/5531801/file/original-c266db75c4a3f4f603a5800f18093c38.jpg",
        desc: "Fast and reliable data management.",
        contact: "chris@preciseanalytics.com | (555) 666-7777",
        portfolioSection: { visible: false, resumes: "", portfolios: "", website: "" },
        hoStatus: { clientCount: 60, grossAmount: 20000, partners: [] }
    },
    10: {
        ceoName: "Patricia",
        service: "SEO Specialist",
        name: "RankTop Marketing",
        banner: "https://cdn.dribbble.com/userupload/5531801/file/original-c266db75c4a3f4f603a5800f18093c38.jpg",
        desc: "Organic search optimization & web rankings.",
        contact: "patricia@ranktop.com | (555) 888-9999",
        portfolioSection: { visible: false, resumes: "", portfolios: "", website: "" },
        hoStatus: { clientCount: 18, grossAmount: 52000, partners: [] }
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

// AUTHENTICATION LOGIC & PERMISSION MODES
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const errorDiv = document.getElementById('login-error');

    const foundUser = accounts.find(a => a.email === email && a.pass === pass);

    if (foundUser) {
        currentUser = foundUser;
        errorDiv.innerText = "";
        
        document.body.className = `${currentUser.role.toLowerCase()}-mode`;

        document.getElementById('user-mode-badge').innerText = `${currentUser.role.toUpperCase()} Mode`;
        document.getElementById('user-mode-badge').className = "badge badge-admin";
        
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";

        renderCeoList();
        renderFeed();
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
    renderFeed();
}

// NAVIGATION BUTTONS
document.getElementById('nav-settings-btn').addEventListener('click', () => {
    renderAccountsList();
    navigateTo(settingsScreen);
});
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

        // Check permission to delete posts (Editor, Admin, CEO)
        let deleteBtn = '';
        if (currentUser && (currentUser.role === 'editor' || currentUser.role === 'admin' || currentUser.role === 'ceo')) {
            deleteBtn = `<button class="btn-sm-danger" style="float:right;" onclick="deletePost(${post.id})">Delete</button>`;
        }

        const imgTag = post.image ? `<img class="post-image" src="${post.image}" alt="Post image">` : '';

        article.innerHTML = `
            <div class="post-header">
                <span>${post.author}</span>
                ${deleteBtn}
            </div>
            ${imgTag}
            <div class="post-caption"><p>${post.caption}</p></div>
        `;
        container.appendChild(article);
    });

    // Check permission to post announcements (Editor, Admin, CEO)
    const postFormBox = document.getElementById('announcement-post-box');
    if (currentUser && (currentUser.role === 'editor' || currentUser.role === 'admin' || currentUser.role === 'ceo')) {
        postFormBox.style.display = 'block';
    } else {
        postFormBox.style.display = 'none';
    }
}

// Image not required para sa announcements
document.getElementById('create-post-form').addEventListener('submit', (e) => {
    e.preventDefault();
    posts.unshift({
        id: Date.now(),
        author: currentUser ? `${CHURCH_NAME} (${currentUser.role.toUpperCase()})` : CHURCH_NAME,
        image: document.getElementById('post-image-url').value.trim(),
        caption: document.getElementById('post-caption-input').value.trim()
    });
    renderFeed();
    document.getElementById('create-post-form').reset();
});

function deletePost(postId) {
    if (confirm("Are you sure you want to delete this announcement?")) {
        posts = posts.filter(p => p.id !== postId);
        renderFeed();
    }
}

// CEO & HO STATUS (KD wag mo galawin thx)
function renderCeoList() {
    const container = document.getElementById('ceo-list-container');
    container.innerHTML = "";

    for (let id in businesses) {
        const li = document.createElement('li');
        li.className = 'ceo-item';
        
        let hoBtnHTML = '';
        if (currentUser) {
            const isEditor = currentUser.role === 'editor';
            const isAdmin = currentUser.role === 'admin';
            const isOwnFolder = currentUser.role === 'ceo' && currentUser.ceoId === id;
            
            // All roles (Editor, Admin, CEO [for own folder]) can view/edit HO Status
            if (isEditor || isAdmin || isOwnFolder) {
                hoBtnHTML = `<button class="btn-ho" onclick="event.stopPropagation(); openHoStatus('${id}')">HO Status</button>`;
            }
        }

        // Delete CEO button accessible only to Editor (Requirement 3.f)
        let deleteCeoBtn = '';
        if (currentUser && currentUser.role === 'editor') {
            deleteCeoBtn = `<button class="btn-sm-danger" style="margin-left:5px;" onclick="event.stopPropagation(); deleteCeoAccount('${id}')">Delete</button>`;
        }

        li.innerHTML = `
            <div onclick="openBusinessScreen('${id}')" style="flex:1;">
                <span>${businesses[id].ceoName}</span> 
                <small style="color:#777;">(${businesses[id].service} - ${businesses[id].name})</small>
            </div>
            <div>
                ${hoBtnHTML}
                ${deleteCeoBtn}
            </div>
        `;
        container.appendChild(li);
    }
}

function deleteCeoAccount(ceoId) {
    if (confirm(`Delete CEO ${businesses[ceoId].ceoName} and their business screen?`)) {
        delete businesses[ceoId];
        accounts = accounts.filter(a => a.ceoId !== ceoId);
        renderCeoList();
        renderAccountsList();
        navigateTo(mainScreen);
    }
}

function openBusinessScreen(id) {
    selectedCeoId = id;
    const data = businesses[id];
    document.getElementById('biz-banner').src = data.banner;
    document.getElementById('biz-name').innerText = data.name;
    document.getElementById('biz-ceo').innerText = `CEO: ${data.ceoName} (${data.service})`;
    document.getElementById('biz-desc').innerText = data.desc;
    document.getElementById('biz-contact').innerText = data.contact;

    // View Portfolio Section 
    const viewPortfolioDiv = document.getElementById('view-portfolio-section');
    const port = data.portfolioSection || {};
    if (port.visible) {
        viewPortfolioDiv.style.display = 'block';
        let linksHTML = '';
        if (port.resumes) linksHTML += `<p><strong>Resume:</strong> <a href="${port.resumes}" target="_blank">${port.resumes}</a></p>`;
        if (port.portfolios) linksHTML += `<p><strong>Portfolio:</strong> <a href="${port.portfolios}" target="_blank">${port.portfolios}</a></p>`;
        if (port.website) linksHTML += `<p><strong>Website:</strong> <a href="${port.website}" target="_blank">${port.website}</a></p>`;
        document.getElementById('portfolio-links-display').innerHTML = linksHTML || '<p>No links specified.</p>';
    } else {
        viewPortfolioDiv.style.display = 'none';
    }

    // Controls for Editing Business Screen
    const editBizPanel = document.getElementById('edit-business-panel');
    const isEditor = currentUser && currentUser.role === 'editor';
    const isOwnCeo = currentUser && currentUser.role === 'ceo' && currentUser.ceoId === id;

    if (isEditor || isOwnCeo) {
        editBizPanel.style.display = 'block';
        document.getElementById('edit-biz-name').value = data.name;
        document.getElementById('edit-biz-banner').value = data.banner;
        document.getElementById('edit-biz-desc').value = data.desc;
        document.getElementById('edit-biz-contact').value = data.contact;

        // Populate Portfolio Controls
        document.getElementById('edit-show-portfolio').checked = !!port.visible;
        document.getElementById('edit-biz-resume').value = port.resumes || '';
        document.getElementById('edit-biz-portfolio').value = port.portfolios || '';
        document.getElementById('edit-biz-website').value = port.website || '';
    } else {
        editBizPanel.style.display = 'none';
    }

    navigateTo(businessScreen);
}

// HO STATUS TAB IMPLEMENTATION (Requirement 1 & 2: PHP / Pesos and separated Tithes/Offerings)
function openHoStatus(id) {
    const data = businesses[id];
    const ho = data.hoStatus;
    const body = document.getElementById('ho-modal-body');
    
    // Editor and CEO (for own screen) can edit HO status
    const isEditable = currentUser && (currentUser.role === 'editor' || (currentUser.role === 'ceo' && currentUser.ceoId === id));

    document.getElementById('ho-modal-title').innerText = `${data.ceoName}'s HO Status Tab (${data.service})`;

    // Calculate Totals in Pesos
    const totalPartners = ho.partners.length;
    const totalTithes = ho.partners.reduce((sum, p) => sum + Number(p.tithes || 0), 0);
    const totalOffering = ho.partners.reduce((sum, p) => sum + Number(p.offering || 0), 0);

    let html = `
        <div class="summary-box">
            <div class="summary-item">
                <strong>Client Count</strong>
                ${isEditable ? `<input type="number" id="ho-clients-input" value="${ho.clientCount}">` : `<span>${ho.clientCount}</span>`}
            </div>
            <div class="summary-item">
                <strong>Gross Amount</strong>
                ${isEditable ? `<input type="number" id="ho-gross-input" value="${ho.grossAmount}">` : `<span>₱${ho.grossAmount.toLocaleString()} PHP</span>`}
            </div>
            <div class="summary-item">
                <strong>Total Partners</strong>
                <span>${totalPartners}</span>
            </div>
            <div class="summary-item">
                <strong>Total Tithes</strong>
                <span>₱${totalTithes.toLocaleString()} PHP</span>
            </div>
            <div class="summary-item">
                <strong>Total Offerings</strong>
                <span>₱${totalOffering.toLocaleString()} PHP</span>
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
                    <th>Tithes (₱ PHP)</th>
                    <th>Offerings (₱ PHP)</th>
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
                        ${isEditable ? `<input type="number" value="${partner.tithes || 0}" onchange="updatePartnerField('${id}', ${index}, 'tithes', this.value)">` : `₱${Number(partner.tithes || 0).toLocaleString()} PHP`}
                    </td>
                    <td>
                        ${isEditable ? `<input type="number" value="${partner.offering || 0}" onchange="updatePartnerField('${id}', ${index}, 'offering', this.value)">` : `₱${Number(partner.offering || 0).toLocaleString()} PHP`}
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
    if (field === 'tithes' || field === 'offering') {
        businesses[ceoId].hoStatus.partners[index][field] = Number(value);
    } else {
        businesses[ceoId].hoStatus.partners[index][field] = value;
    }
}

function addPartnerRow(ceoId) {
    businesses[ceoId].hoStatus.partners.push({ name: "New Partner", tithes: 0, offering: 0 });
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

    // Portfolio Section Update
    businesses[selectedCeoId].portfolioSection = {
        visible: document.getElementById('edit-show-portfolio').checked,
        resumes: document.getElementById('edit-biz-resume').value.trim(),
        portfolios: document.getElementById('edit-biz-portfolio').value.trim(),
        website: document.getElementById('edit-biz-website').value.trim()
    };

    openBusinessScreen(selectedCeoId);
    renderCeoList();
    alert("Business Information Updated!");
});

// SETTINGS: ACCOUNT CREATION (Requirement 3.a - Editor Access)
document.getElementById('add-editor-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('new-editor-email').value.trim();
    const pass = document.getElementById('new-editor-pass').value.trim();
    const role = document.getElementById('new-editor-role').value;
    const service = document.getElementById('new-ceo-service').value;

    const newCeoId = String(Date.now());

    accounts.push({ email, pass, role, ceoId: role === 'ceo' ? newCeoId : null });

    if (role === 'ceo') {
        const ceoName = email.split('@')[0];
        businesses[newCeoId] = {
            ceoName: ceoName.charAt(0).toUpperCase() + ceoName.slice(1),
            service: service,
            name: `${ceoName.toUpperCase()} Business`,
            banner: "example",
            desc: "New Business Description.",
            contact: `${email} | (555) 000-0000`,
            portfolioSection: { visible: false, resumes: "", portfolios: "", website: "" },
            hoStatus: { clientCount: 0, grossAmount: 0, partners: [] }
        };
    }

    renderAccountsList();
    renderCeoList();
    document.getElementById('add-editor-form').reset();
    alert("Account successfully created!");
});

function renderAccountsList() {
    const list = document.getElementById('account-list-display');
    const settingsPanel = document.getElementById('create-account-settings-panel');
    
    // Only Editor can create new accounts (Requirement 3.a)
    if (currentUser && currentUser.role === 'editor') {
        settingsPanel.style.display = 'block';
    } else {
        settingsPanel.style.display = 'none';
    }

    list.innerHTML = "";
    accounts.forEach(acc => {
        const li = document.createElement('li');
        li.className = 'account-item';
        li.innerText = `${acc.email} (${acc.role.toUpperCase()})`;
        list.appendChild(li);
    });
}