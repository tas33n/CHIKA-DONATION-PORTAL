/******************************************************************************
 *
 *  __  __ _____  _____ ______ _____ _______ _____ _____  ________      __
 * |  \/  |_   _|/ ____|  ____|_   _|__   __/ ____|  __ \|  ____\ \    / /
 * | \  / | | | | (___ | |__    | |    | | | (___ | |  | | |__   \ \  / /
 * | |\/| | | |  \___ \|  __|   | |    | |  \___ \| |  | |  __|   \ \/ /
 * | |  | |_| |_ ____) | |     _| |_   | |  ____) | |__| | |____   \  /
 * |_|  |_|_____|_____/|_|    |_____|  |_| |_____/|_____/|______|   \/
 *
 *
 * Project: CHIKA DONATION PORTAL
 * Description: A simple web panel to collect and manage donation for messenger bot projects.
 *
 * Author	: Tas33n (https://github.com/tas33n)
 * Website	: https://tas33n.is-a.dev
 *
 * Copyright © 2024 MISFITSDEV. All rights reserved.
 *
 * This code is the property of MISFITSDEV and is protected by copyright law.
 * Unauthorized copying, modification, distribution, or use of this code,
 * via any medium, is strictly prohibited without express written permission.
 *
 *****************************************************************************/

// cdn src
const CDN_BASE =
    " https://cdn.jsdelivr.net/gh/meroitachi/chika-donation-portal@main"; //'https://cdn.sadmananik.pro'; // 'https://cdn.jsdelivr.net/gh/tas33n/CHIKA-DONATION-PORTAL@main';
const HTML_BASE = `${CDN_BASE}/pages`;
const DATA_BASE = `${CDN_BASE}/data`;

// array placholder
let packages = [];
let selectedPackage = null;
let commandsData = {};

// Utility Functions
const fetchHtml = async pageName => {
    const cachedHtml = localStorage.getItem(`html_${pageName}`);
    if (cachedHtml) return cachedHtml;

    const response = await fetch(`${HTML_BASE}/${pageName}.html`);
    const html = await response.text();
    localStorage.setItem(`html_${pageName}`, html);
    return html;
};

const fetchJson = async jsonName => {
    const cachedData = localStorage.getItem(`json_${jsonName}`);
    const cachedTimestamp = localStorage.getItem(`json_${jsonName}_timestamp`);
    const currentTime = Date.now();

    if (cachedData && cachedTimestamp) {
        const age = currentTime - cachedTimestamp;
        if (age < 86400000) {
            try {
                return JSON.parse(cachedData);
            } catch (error) {
                console.error("Failed to parse cached JSON:", error);
                localStorage.removeItem(`json_${jsonName}`);
                localStorage.removeItem(`json_${jsonName}_timestamp`);
            }
        } else {
            // If the cached data is older than 24 hours, remove it
            localStorage.removeItem(`json_${jsonName}`);
            localStorage.removeItem(`json_${jsonName}_timestamp`);
        }
    }

    const response = await fetch(`${DATA_BASE}/${jsonName}.json`);
    const json = await response.json();
    localStorage.setItem(`json_${jsonName}`, JSON.stringify(json));
    localStorage.setItem(`json_${jsonName}_timestamp`, currentTime.toString());

    return json;
};

const renderPage = async pageName => {
    const content = await fetchHtml(pageName);
    $("#main-content").html(content.replaceAll("{{CDN_BASE}}", CDN_BASE));
};

const showToast = message => {
    const toast = $(`<div class="toast-message">${message}</div>`);
    $("#toast-container").append(toast);
    toast.css({
        padding: "10px 20px",
        background: "#333",
        color: "#fff",
        borderRadius: "5px",
        marginBottom: "10px",
        opacity: 0,
        transition: "opacity 0.5s"
    });
    setTimeout(() => toast.css("opacity", 1), 10);
    setTimeout(() => {
        toast.css("opacity", 0);
        setTimeout(() => toast.remove(), 500);
    }, 5000);
};

const showLoading = message => {
    const loadingOverlay = document.createElement("div");
    loadingOverlay.id = "loadingOverlay";
    loadingOverlay.innerHTML = `
        <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-3 text-light">${message}</p>
    `;
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    document.body.appendChild(loadingOverlay);
};

const hideLoading = () => {
    $("#loadingOverlay").remove();
};

// Page Loading and Navigation
const loadPage = async page => {
    try {
        console.log("loading ", page);
        await renderPage(page);

        switch (page) {
            case "home":
                checkBotStatus();
            case "packages":
                renderPackages();
                break;
            case "admins":
                renderAdmins();
                break;
            case "supporters":
                renderSupporters();
                break;
            case "commands":
                initializeCommandsPage();
                break;
            case "invite":
                renderInvitePage();
                break;
        }

        attachEventListeners();
        localStorage.setItem("lastLoadedPage", page);
        updateActiveNavLink(page);
    } catch (error) {
        console.error(`Error loading page ${page}:`, error);
        $("#main-content").html(
            "<p>Error loading page. Please try again later.</p>"
        );
    }
};

const setupPageLoader = () => {
    $(document).on("click", "[data-page]", function (event) {
        event.preventDefault();
        const page = $(this).data("page");
        loadPage(page);
        history.pushState({ page: page }, "", `#${page}`);
    });
};

const loadInitialPage = () => {
    const initialHash = window.location.hash.substring(1);
    const lastLoadedPage = localStorage.getItem("lastLoadedPage");
    const initialPage = initialHash || lastLoadedPage || "home";
    loadPage(initialPage);
    checkBotStatus();
    history.replaceState({ page: initialPage }, "", `#${initialPage}`);
};

const updateActiveNavLink = page => {
    $(".nav-link").removeClass("is-active");
    $(`.nav-link[data-page="${page}"]`).addClass("is-active");
};

// Event Listeners
const attachEventListeners = () => {
    $("#proceed-donation").on("click", handleProceedDonation);
    $("#donationForm").on("submit", handleDonationSubmit);
};

// Main Execution
$(document).ready(async () => {
    // Theme handling
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        $("body").addClass("light-mode");
    }

    $(".dark-light").click(() => {
        $("body").toggleClass("light-mode");
        localStorage.setItem(
            "theme",
            $("body").hasClass("light-mode") ? "light" : "dark"
        );
    });

    // Bot status check
    checkBotStatus();
    setInterval(checkBotStatus, 60000);

    // Page loading setup
    setupPageLoader();
    loadInitialPage();

    // Popstate event handling
    $(window).on("popstate", event => {
        if (event.originalEvent.state && event.originalEvent.state.page) {
            loadPage(event.originalEvent.state.page);
        }
    });

    // Menu handling
    $(".menu-bars").click(function (e) {
        e.stopPropagation();
        $("body").toggleClass("menu-shown");
        $(".left-side").toggleClass("shown");
    });

    $(document).click(function (e) {
        if (!$(e.target).closest(".left-side, .menu-bars").length) {
            $("body").removeClass("menu-shown");
            $(".left-side").removeClass("shown");
        }
    });

    // Package selection
    $(document).on("click", ".select-package", function () {
        const tier = parseInt($(this).closest(".card").data("tier"));
        selectedPackage = packages.find(pkg => pkg.tier === tier);
        updateSelectedPackage();
    });

    // Service Worker registration
    if ("serviceWorker" in navigator) {
        try {
            const registration =
                await navigator.serviceWorker.register("/service-worker.js");
            console.log("Service Worker registered:", registration);
        } catch (error) {
            console.error("Service Worker registration failed:", error);
        }
    }

    // Cache update handling
    $("#update-cache").click(async () => {
        // Clear all data from localStorage
        localStorage.clear();
        console.log("Local storage data cleared.");

        if ("serviceWorker" in navigator) {
            try {
                const registration = await navigator.serviceWorker.ready;
                if (registration.active) {
                    registration.active.postMessage({ action: "updateCache" });
                    showToast("Cache updated successfully!");
                    setTimeout(() => location.reload(), 3000);
                } else {
                    console.error("No active Service Worker found.");
                }
            } catch (error) {
                console.error("Failed to get Service Worker ready:", error);
            }
        } else {
            console.error("Service Worker not supported.");
        }
    });

    // Preload HTML content
    const pages = [
        "home",
        "about",
        "packages",
        "supporters",
        "commands",
        "privacy",
        "admins",
        "invite"
    ];
    pages.forEach(fetchHtml);
});

//raw functions

function checkBotStatus() {
    try {
        if (true) {
            $(".botavatar").attr("src", "https://i.imgur.com/EIyOdfA.jpeg");
            $(".botname").text("XBot");
            // $('.botid').text(botID);
        } else {
            showToast("Bot server api is dead. please contact admin.");
        }
    } catch (err) {
        showToast("Bot server api is dead. please contact admin.");
    }
}

async function renderPackages() {
    try {
        packages = await fetchJson("packages");
        const packageContainer = document.getElementById("packageContainer");
        if (!packageContainer) {
            console.error("Package container not found");
            return;
        }
        packageContainer.innerHTML = "";

        packages.forEach(pkg => {
            const packageCard = document.createElement("div");
            packageCard.className = "col";
            let badgeClass = "badge bg-secondary";
            let iconClass = "package-icon";
            let cardClass = "card h-100 glass-card";

            if (pkg.tier >= 4) {
                badgeClass = "badge bg-warning text-dark";
                iconClass += " vip-icon";
                cardClass += " vip-card";
            }

            packageCard.innerHTML = `
		  <div class="${cardClass}" data-tier="${pkg.tier}">
			<div class="card-body">
			  <div class="d-flex justify-content-between align-items-center mb-3">
				<span class="${badgeClass}">${pkg.tier >= 4 ? "VIP " : ""}Tier ${
                    pkg.tier
                }</span>
				<span class="${iconClass}">${pkg.icon}</span>
			  </div>
			  <h5 class="card-title">${pkg.name}</h5>
			  <h6 class="card-subtitle mb-2 text-warning">৳${pkg.price}</h6>
			  <p class="card-text">${pkg.description}</p>
			  <ul class="list-unstyled">
				${pkg.benefits
                    .map(
                        benefit => `
				  <li class="mb-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16">
					  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
					</svg>
					${benefit}
				  </li>
				`
                    )
                    .join("")}
			  </ul>
			</div>
			<div class="card-footer">
			  <button class="btn btn-outline-light w-100 select-package">Select Package</button>
			</div>
		  </div>
		`;
            packageContainer.appendChild(packageCard);
        });
    } catch (error) {
        console.error("Error fetching packages data:", error);
        $("#packageContainer").html(
            '<p class="text-danger">Failed to load package data. Please try again later.</p>'
        );
    }
}

async function renderAdmins() {
    try {
        const teamMembers = await fetchJson("admins");

        const teamMembersContainer = $("#team-members");

        teamMembers.forEach(member => {
            const memberCard = `
            <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div class="team-member-card h-100">
                    <div class="member-image">
                        <img src="${member.image}" alt="${
                            member.name
                        }" class="img-fluid">
                        <div class="member-info">
                            <h5 class="mb-0">${member.name}</h5>
                            <p class="mb-0">${member.designation}</p>
                        </div>
                    </div>
                    <div class="p-3 d-flex flex-column justify-content-between">
                        <div>
                            ${
                                member.bio
                                    ? `<p class="member-bio mb-3">${member.bio}</p>`
                                    : ""
                            }
                            <div class="social-links text-center mb-3">
                                ${
                                    member.socialLinks.facebook
                                        ? `<a href="${member.socialLinks.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>`
                                        : ""
                                }
                                ${
                                    member.socialLinks.github
                                        ? `<a href="${member.socialLinks.github}" target="_blank"><i class="fab fa-github"></i></a>`
                                        : ""
                                }
                                ${
                                    member.socialLinks.email
                                        ? `<a href="mailto:${member.socialLinks.email}"><i class="fas fa-envelope"></i></a>`
                                        : ""
                                }
                                ${
                                    member.socialLinks.telegram
                                        ? `<a href="${member.socialLinks.telegram}" target="_blank"><i class="fab fa-telegram-plane"></i></a>`
                                        : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
            teamMembersContainer.append(memberCard);
        });
    } catch (error) {
        console.error("Error fetching admin data:", error);
        $("#team-members").html(
            '<p class="text-danger">Failed to load team members. Please try again later.</p>'
        );
    }
}

async function renderSupporters() {
    try {
        let supporters = await fetchJson("supporters");

        // Sort supporters by tier (highest to lowest)
        supporters.sort((a, b) => b.tier - a.tier);

        const supportersContainer = $("#supporters-container");
        supportersContainer.empty();

        supporters.forEach(supporter => {
            const isVIP = supporter.tier >= 4;
            const tierClass = `tier-${supporter.tier}`;
            const vipClass = isVIP ? "vip-supporter" : "";

            const supporterCard = `
		  <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
			<div class="team-member-card h-100 ${tierClass} ${vipClass}">
			  <div class="member-image">
				<img src="${supporter.image}" alt="${supporter.name}" class="img-fluid">
				<div class="member-info">
				  <h5 class="mb-0">${supporter.name}</h5>
				  <p class="mb-0">${supporter.packageName}</p>
				</div>
			  </div>
			  <div class="p-3 d-flex flex-column justify-content-between">
				<div>
				  <div class="d-flex justify-content-between align-items-center mb-3">
					<span class="badge ${isVIP ? "bg-warning text-dark" : "bg-primary"}">
					  ${isVIP ? "VIP " : ""}Tier ${supporter.tier}
					</span>
					<a href="${
                        supporter.fblink
                    }" target="_blank" class="btn btn-outline-primary btn-sm">
					  <i class="fab fa-facebook-f me-2"></i>Facebook
					</a>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		`;
            supportersContainer.append(supporterCard);
        });
    } catch (error) {
        console.error("Error fetching supporters data:", error);
        $("#supporters-container").html(
            '<p class="text-danger">Failed to load supporters data. Please try again later.</p>'
        );
    }
}

async function fetchCommands() {
    try {
        const response = await fetch(`${CDN_BASE}/data/commands.json`);
        if (!response.ok) {
            throw new Error("Failed to fetch commands data");
        }
        commandsData = await response.json();
        renderCommands();
    } catch (error) {
        console.error("Error fetching commands:", error);
        $("#commands-container").html(
            '<p class="text-danger">Failed to load commands. Please try again later.</p>'
        );
    }
}

function groupCommandsByCategory(commands) {
    const categories = {};
    for (const [cmdName, cmdData] of Object.entries(commands)) {
        const category = cmdData.category || "Uncategorized";
        if (!categories[category]) {
            categories[category] = [];
        }
        categories[category].push({ name: cmdName, ...cmdData });
    }
    return categories;
}

function replacePlaceholders(guide, commandName) {
    if (typeof guide !== "string") return "No guide available.";
    return guide
        .replace(/\{pn\}/g, `/${commandName}`)
        .replace(/\{p\}n/g, `/${commandName}`)
        .replace(/\{p\}/g, "/")
        .replace(/\{n\}/g, commandName);
}

function renderCommands() {
    const container = document.getElementById("commands-container");
    if (!container) {
        console.error("Commands container not found");
        return;
    }
    container.innerHTML = ""; // Clear existing content

    const groupedCommands = groupCommandsByCategory(commandsData);

    for (const [category, commands] of Object.entries(groupedCommands)) {
        const categoryCard = document.createElement("div");
        categoryCard.className = "card mb-3";
        categoryCard.innerHTML = `
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">${category}</h5>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="card-body" style="display: none;">
                ${commands
                    .map(
                        cmd => `
                    <div class="command-item mb-3">
                        <div class="command-name">/${cmd.name}</div>
                        <div class="command-description">${
                            cmd.shortDescription?.en ||
                            cmd.description?.en ||
                            "No description available."
                        }</div>
                        <div class="command-aliases">Aliases: ${
                            cmd.aliases
                                ? cmd.aliases
                                      .map(alias => `/${alias}`)
                                      .join(", ")
                                : "None"
                        }</div>
                        <div class="command-guide">${replacePlaceholders(
                            cmd.guide?.en,
                            cmd.name
                        )}</div>
                    </div>
                `
                    )
                    .join("")}
            </div>
        `;
        container.appendChild(categoryCard);
    }

    // Add click event listeners to category headers
    document.querySelectorAll(".card-header").forEach(header => {
        header.addEventListener("click", function () {
            const body = this.nextElementSibling;
            const icon = this.querySelector(".fa-chevron-down");
            body.style.display =
                body.style.display === "none" ? "block" : "none";
            icon.classList.toggle("rotate");
        });
    });
}

function filterCommands() {
    const searchTerm = document
        .getElementById("searchInput")
        .value.toLowerCase();
    document.querySelectorAll(".command-item").forEach(item => {
        const commandName = item
            .querySelector(".command-name")
            .textContent.toLowerCase();
        const commandDescription = item
            .querySelector(".command-description")
            .textContent.toLowerCase();
        if (
            commandName.includes(searchTerm) ||
            commandDescription.includes(searchTerm)
        ) {
            item.style.display = "block";
            item.closest(".card").style.display = "block";
        } else {
            item.style.display = "none";
        }
    });

    document.querySelectorAll(".card").forEach(card => {
        const visibleItems = card.querySelectorAll(
            '.command-item[style="display: block;"]'
        );
        if (visibleItems.length === 0) {
            card.style.display = "none";
        } else {
            card.style.display = "block";
        }
    });
}

// Call this function when the commands page is loaded
function initializeCommandsPage() {
    fetchCommands();
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", filterCommands);
    }
}

function updateSelectedPackage() {
    const nameElement = document.getElementById("selectedPackageName");
    const priceElement = document.getElementById("selectedPackagePrice");
    if (!nameElement || !priceElement) {
        console.error("Selected package elements not found");
        return;
    }

    // Update package details
    nameElement.textContent = selectedPackage.name;
    priceElement.textContent = selectedPackage.price;

    document
        .querySelectorAll(".card")
        .forEach(card => card.classList.remove("selected"));

    const selectedCard = document.querySelector(
        `.card[data-tier="${selectedPackage.tier}"]`
    );
    if (selectedCard) {
        selectedCard.classList.add("selected");
    }

    // Scroll to the subscription form on mobile devices (screen width < 768px)
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
        const formElement = $("#subscriptionForm");
        if (formElement.length) {
            $("#main-content").animate(
                {
                    scrollTop: formElement.offset().top
                },
                1000
            );
        }
    }
}

const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

const getFromLocalStorage = key => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

// Donation Submission Handler
const handleDonationSubmit = async e => {
    e.preventDefault();
    const uid = document.getElementById("uid").value.trim();
    const tid = document.getElementById("tid").value.trim();
    const amount = document
        .getElementById("selectedPackagePrice")
        .textContent.trim();

    if (!amount) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please select a package bfore proceeding."
        });
        return;
    }

    if (!uid || !tid) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter both User ID and Thread ID."
        });
        return;
    }

    // try {
    showLoading("Fetching user and thread data...");
    if (1 != 2) {
        saveToLocalStorage("userData", "ExampleObj");
        saveToLocalStorage("threadData", "ExampleObj");
        renderUserThreadInfo();

        // hide the form if its mobile screen
        if ($(window).width() < 768) {
            $("#subscriptionForm").hide();
        }
    } else {
        throw new Error("User or Thread not found");
    }
    //     } catch (error) {
    //         alert(
    //             "An error occurred while fetching data. Please check your User ID and Thread ID."
    //         );
    //         console.error("Error:", error);

    hideLoading();
};

const renderUserThreadInfo = (userData, threadData) => {
    const packageContainer = document.getElementById("packageContainer");
    if (!packageContainer) {
        console.error("Package container not found");
        return;
    }

    packageContainer.innerHTML = `
        <div class="col-12">
            <div class="card mb-3">
                <div class="card-header bg-primary text-white">User Information</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="https://i.imgur.com/EIyOdfA.jpeg" class="rounded-circle mb-3" alt="Xperson" width="130px">
                        </div>
                        <div class="col-md-8">
                            <h5 class="card-title">Xperson</h5>
                            <p class="card-text">Username: XUsername</p>
                            <p class="card-text">User ID: Xid83743</p>
                            <p class="card-text">Exp: XExp150</p>
                            <p class="card-text">Money: XMoney500</p>
                            <p class="card-text">Last Active GC: XTime</p>
                            <p class="card-text">Token Time: XTime</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-header bg-success text-white">Thread Information</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="https://i.imgur.com/EIyOdfA.jpeg" class="rounded-circle mb-3" alt="Xthread" width="130px">
                        </div>
                        <div class="col-md-8">
                            <h5 class="card-title">Xthread</h5>
                            <p class="card-text">Thread ID: XTID-1633</p>
                            <p class="card-text">Approval Mode: Enabled</p>
                            <p class="card-text">Admins: Xlistad-5</p>
                            <p class="card-text">Members: Xmemnumb-78</p>
                            <p class="card-text">Updated At: Xdate</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <button id="confirmProceed" class="btn btn-success btn-lg">Confirm and Proceed</button>
            </div>
        </div>
    `;

    const confirmProceedButton = document.getElementById("confirmProceed");
    if (confirmProceedButton) {
        confirmProceedButton.addEventListener("click", handleProceedDonation);
    }
};

const fetchInviteGroupData = async groupId => {
    const storageKey = `inviteGroupData_${groupId}`;
    const cachedData = localStorage.getItem(storageKey);

    if (cachedData) {
        try {
            return JSON.parse(cachedData);
        } catch (error) {
            console.error("Error parsing stored data:", error);
        }
    }

    const response = await fetch(`/api/thread/raw/${groupId}`);
    const data = await response.json();

    localStorage.setItem(storageKey, JSON.stringify(data.data));

    return data.data;
};

const renderInviteGroupInfo = groupData => {
    const groupInfoHtml = `
                <div class="text-center">
                    <img src="${groupData.imageSrc}" alt="${
                        groupData.threadName
                    }" class="rounded-circle group-image">
                    <h2>${groupData.threadName}</h2>
                    <p>Thread ID: ${groupData.threadID}</p>
                    <button class="btn ${
                        groupData.inviteLink.enable
                            ? "btn-primary"
                            : "btn-secondary"
                    }" 
                            ${!groupData.inviteLink.enable ? "disabled" : ""}>
                        ${
                            groupData.inviteLink.enable
                                ? "Join Support Group"
                                : "Invite Link Disabled"
                        }
                    </button>
                </div>
            `;
    $("#groupInfo").html(groupInfoHtml);
};

const renderInviteGroupStats = groupData => {
    const maleCount = groupData.userInfo.filter(
        user => user.gender === "MALE"
    ).length;
    const femaleCount = groupData.userInfo.filter(
        user => user.gender === "FEMALE"
    ).length;
    const pendingCount = groupData.approvalQueue
        ? groupData.approvalQueue.length
        : 0;

    const statsHtml = `
                <div class="stat-card">
                    <h5>Total Members</h5>
                    <p class="h3">${groupData.participantIDs.length}</p>
                    <p class="gender-count">
                        (Male: ${maleCount}, Female: ${femaleCount})
                    </p>
                </div>
                <div class="stat-card">
                    <h5>Total Messages</h5>
                    <p class="h3">${groupData.messageCount}</p>
                </div>
                <div class="stat-card">
                    <h5>Admins</h5>
                    <p class="h3">${groupData.adminIDs.length}</p>
                </div>
                <div class="stat-card">
                    <h5>Pending Members</h5>
                    <p class="h3">${pendingCount}</p>
                </div>
            `;
    $("#groupStats").html(statsHtml);
};

const renderInviteUserList = groupData => {
    const adminIds = new Set(groupData.adminIDs.map(admin => admin.id));
    const users = groupData.userInfo.sort((a, b) => {
        if (adminIds.has(a.id) && !adminIds.has(b.id)) return -1;
        if (!adminIds.has(a.id) && adminIds.has(b.id)) return 1;
        return 0;
    });

    const userListHtml = users
        .map(
            user => `
                <div class="user-item ${
                    user.gender === "MALE" ? "male-user" : "female-user"
                }" 
                     onclick="window.open('${user.url}', '_blank')">
                    <div class="d-flex align-items-center">
                        <img src="${user.thumbSrc}" alt="${
                            user.name
                        }" class="user-avatar me-3">
                        <div>
                            <h5 class="mb-0">
                                ${user.name}
                                ${
                                    adminIds.has(user.id)
                                        ? '<span class="admin-badge">ADMIN</span>'
                                        : ""
                                }
                            </h5>
                            <small>UID: ${user.id}</small>
                        </div>
                    </div>
                </div>
            `
        )
        .join("");

    $("#userList").html(userListHtml);
};

const renderInvitePage = async () => {
    try {
        showLoading("Fetching Bot official group data...");
        const groupData = await fetchInviteGroupData("5473736752744010");
        renderInviteGroupInfo(groupData);
        renderInviteGroupStats(groupData);
        renderInviteUserList(groupData);
        hideLoading();
    } catch (error) {
        console.error("Error loading group data:", error);
        $("#groupInfo").html(
            '<p class="text-danger">Error loading group data. Please try again later.</p>'
        );
    }
};

const handleProceedDonation = () => {
    showLoading(
        "Payment is processing, please complete the payment in the opened window."
    );
    $.ajax({
        url: "/submit/payment-info",
        method: "get",
        data: {
            amount: $("#selectedPackagePrice").text(),
            uid: $("#uid").val(),
            tid: $("#tid").val()
        },
        success: function (response) {
            if (response.bkashURL) {
                const paymentPopup = window.open(
                    response.bkashURL,
                    "bKash Payment",
                    "width=500,height=600"
                );
                // Listen for messages from the popup window
                window.addEventListener(
                    "message",
                    function (event) {
                        if (event.origin === window.location.origin) {
                            const paymentStatus = event.data;
                            handlePaymentResponse(paymentStatus);
                            if (paymentPopup) paymentPopup.close();
                        }
                    },
                    false
                );
            } else {
                hideLoading();
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong while creating the payment!"
                });
            }
        },
        error: function () {
            hideLoading();
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Failed to initiate payment. Please try again."
            });
        }
    });
};

const handlePaymentMessage = event => {
    if (event.origin === window.location.origin) {
        const paymentStatus = event.data;
        handlePaymentResponse(paymentStatus);
        if (event.source) event.source.close();
    }
};

const handlePaymentResponse = paymentStatus => {
    hideLoading();
    if (paymentStatus.status === "success") {
        const userData = getFromLocalStorage("userData");
        const threadData = getFromLocalStorage("threadData");
        if (userData && threadData) {
            const paymentInfo = {
                transactionId: paymentStatus.trxID,
                amount: selectedPackage.price,
                packageName: selectedPackage.name,
                date: new Date()
            };
            renderThankYouMessage(userData, threadData, paymentInfo);
        } else {
            Swal.fire({
                icon: "error",
                title: "Data Error",
                text: "User or Thread data not found. Please try again."
            });
        }
    } else if (paymentStatus.status === "cancel") {
        Swal.fire({
            icon: "info",
            title: "Payment Cancelled",
            text: "Payment was cancelled by the user."
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Payment Failed",
            text: paymentStatus?.message
        });
    }
};

const renderThankYouMessage = (userData, threadData, paymentInfo) => {
    const packageContainer = document.getElementById("packageContainer");
    if (!packageContainer) {
        console.error("Package container not found");
        return;
    }

    packageContainer.innerHTML = `
        <div class="col-12">
            <div class="card mb-4 border-0 shadow-lg">
                <div class="card-body text-center">
                    <img src="https://64.media.tumblr.com/f112992d6f5fdfc598619d78b701c105/e0e5408e2bd0e970-12/s540x810/73addda07b419e86e22ef92cfc155a12d16a5ccd.gifv" alt="Chika Thank You" class="img-fluid mb-4" style="max-width: 200px;">
                    <h2 class="card-title mb-4 text-primary">Thank You for Your Support!</h2>
                    <p class="card-text lead mb-4">Your subscription has been successfully processed. Chika is excited to join your group!</p>
                    <div class="alert alert-success" role="alert">
                        You can now use Chika Bot in your group. Thank you for helping keep the Chika Bot project alive!
                    </div>
                </div>
            </div>

            <div class="row g-4">
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow">
                        <div class="card-header bg-primary text-white">
                            <h5 class="mb-0">User Information</h5>
                        </div>
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <img src="https://i.imgur.com/EIyOdfA.jpeg" class="rounded-circle" alt="XName" width="100px">
                            </div>
                            <h6 class="card-title">XName</h6>
                            <p class="card-text">Username: XuserName</p>
                            <p class="card-text">User ID: Xuid1343</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow">
                        <div class="card-header bg-success text-white">
                            <h5 class="mb-0">Thread Information</h5>
                        </div>
                        <div class="card-body">
                            <div class="text-center mb-3">
                                <img src="https://i.imgur.com/EIyOdfA.jpeg" class="rounded-circle" alt="Xthread" width="100px">
                            </div>
                            <h6 class="card-title">Xthread</h6>
                            <p class="card-text">Thread ID: Xtid</p>
                            <p class="card-text">Members: Xtlength</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow">
                        <div class="card-header bg-info text-white">
                            <h5 class="mb-0">Payment Information</h5>
                        </div>
                        <div class="card-body">
                            <h6 class="card-title">Transaction ID: ${
                                paymentInfo.trxID
                            }</h6>
                            <p class="card-text">Amount: ৳${
                                paymentInfo.amount
                            }</p>
                            <p class="card-text">Package: ${
                                paymentInfo.packageName
                            }</p>
                            <p class="card-text">Date: ${paymentInfo.date.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="text-center mt-4">
                <button class="btn btn-lg btn-primary" onclick="window.location.href='/'">Return to Home</button>
            </div>
        </div>
    `;
};
