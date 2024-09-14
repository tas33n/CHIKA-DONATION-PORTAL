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

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/tas33n/CHIKA-DONATION-PORTAL@main';

// HTML content for pages
const home = `
<div class="container pb-9 mt-5">
<div class="card mb-5">
  <div
	class="card-header hover-actions-trigger d-flex justify-content-center align-items-end position-relative mb-7"
	style="min-height: 250px; background-image: url('${CDN_BASE}/assets/imgs/chika-c.webp')"
  >
	<input class="d-none" id="upload-cover-image" type="file" />
	<div class="hover-actions end-0 bottom-0 pe-1 pb-2 text-white"></div>

	<div class="hoverbox feed-profile" style="width: 150px; height: 150px">
	  <div
		class="bg-black rounded-circle d-flex flex-center z-index-1"
		style="--phoenix-bg-opacity: 0.56"
	  ></div>
	  <div
		class="position-relative bg-400 rounded-circle cursor-pointer d-flex flex-center mb-xxl-7"
	  >
		<div class="avatar avatar-5xl">
		  <img
			class="rounded-circle bg-white img-thumbnail shadow-sm"
			src="${CDN_BASE}/assets/imgs/chika.webp"
			alt="Chika Avatar"
		  />
		</div>
	  </div>
	</div>
  </div>
  <div class="card-body">
	<div class="row justify-content-center">
	  <div class="col-lg-8 col-auto" style="z-index: 11">
		<div class="text-center">
		  <h2 class="me-2">Chika Shirogane</h2>
		  <span class="m-2">Your favorite Waifu bot</span>
		</div>
		<hr />
		<br />
		<p class="text-center">
		  ✨ Konichiwa, Masters of the Digital Manor! ✨
		</p>
		<p class="text-center">
		  🌸 I am Chika Shirogane, your delightful waifu maid at your service!
		  💖 Whether it's managing your groups, finding the perfect media, or
		  adding a sprinkle of mischief to your day, I'm here to serve with a
		  smile! Inspired by the whimsical and energetic Chika from
		  *Kaguya-sama: Love is War*, I bring my charm and skills right to
		  your screen.
		</p>
		<p class="text-center">
		  And I'm not alone! Meet my lovely sisters in this waifu maid family:
		  Touka Kirishima, the ever mysterious and graceful assistant; Himiko
		  Midoria, the energetic and quirky helper; Rose, the elegant and
		  supportive hand; and Mis Dipty Chowdhury, our brilliant and diligent
		  overseer. Together, we form the ultimate waifu maid team, ready to
		  make your digital experience as pleasant and fun as possible!
		</p>
		<p class="text-center">
		  But just like any grand manor, our little world needs upkeep! To
		  keep us serving at our best, maintaining our digital mansion and
		  delightful services requires a touch of support. Your donations will
		  help us continue bringing joy, assistance, and a touch of waifu
		  magic to your daily adventures.
		</p>
		<p class="text-center">
		  Every contribution helps us keep our aprons neat, our teacups full,
		  and our hearts ready to serve. So, if you enjoy our company and wish
		  to keep this charming household running, click the <b>Donate</b>
		  button and join us in our endless fun!
		</p>
		<p class="text-center">
		  💕 Ready to support your favorite waifu maid family? Tap that
		  donation button and let’s keep the maid café of your dreams alive!
		  Arigatou gozaimasu, beloved Master. Your generosity keeps our smiles
		  shining bright! 🌸✨
		</p>
		<p class="text-center">
		  With a curtsy and a wink, Chika, Your Waifu Maid 🎀💖
		</p>
	  </div>
	  <a href="#donate" data-page="donate"
		class="nav-link content-button status-button ms-sm-2 mt-2 col-lg-8 text-center "
	  >
		Donate to Keep Us Running!
	  </a>
	</div>
  </div>
  <div
	class="col-lg-8 col-sm-12 mx-auto p-2 pb-5 collapse"
	id="collapseExample"
	style="z-index: 11"
  >
	<div class="card">
	  <div class="card-body">
		<h4 class="card-title mb-4">Donation Amount</h4>
		<input
		  class="form-control mb-4"
		  id="damount"
		  type="number"
		  placeholder="Amount"
		  min="60"
		/>
		<h4 class="card-title mb-4">Your Name</h4>
		<input
		  class="form-control mb-4"
		  id="dname"
		  type="text"
		  placeholder="Name"
		/>
		<h4 class="card-title mb-4">Your Group ID</h4>
		<input
		  class="form-control mb-4"
		  id="tid"
		  type="number"
		  placeholder="( optional )"
		/>
		<button class="content-button status-button w-100 bkash">
		  Donate with BKash
		</button>
		<br />
		<p class="text-center">or</p>
		<a
		  href="https://www.buymeacoffee.com/tas33n"
		  class="btn btn-soft-secondary w-100"
		  >Buy Me a Coffee!</a
		>
		<hr />
	  </div>
	</div>
  </div>
</div>
</div>
`;

const about = `
<div class="about container py-5">
        <div class="row mb-5">
            <div class="col-lg-8 mx-auto text-center">
                <h2 class="fw-light">About Our Bot</h2>
                <p class="lead">ChikaBot is a versatile Messenger bot designed to bring fun, utility, and AI-powered features to your chats and groups. From entertainment to productivity, ChikaBot has got you covered!</p>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-md-4">
                <div class="card h-100 text-white">
                    <div class="card-body text-center">
                        <i class="fas fa-laugh-beam feature-icon"></i>
                        <h5 class="card-title">Entertainment</h5>
                        <p class="card-text">Enjoy a wide range of fun activities, games, and jokes to keep your chats lively and entertaining.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100 text-white">
                    <div class="card-body text-center">
                        <i class="fas fa-tools feature-icon"></i>
                        <h5 class="card-title">Utility Tools</h5>
                        <p class="card-text">Access powerful tools for downloading multimedia, editing photos, and performing various file conversions.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100 text-white">
                    <div class="card-body text-center">
                        <i class="fas fa-robot feature-icon"></i>
                        <h5 class="card-title">AI Features</h5>
                        <p class="card-text">Harness the power of ChatGPT and Gemini for intelligent conversations and creative content generation.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100 text-white">
                    <div class="card-body text-center">
                        <i class="fas fa-image feature-icon"></i>
                        <h5 class="card-title">Photo Manipulation</h5>
                        <p class="card-text">Transform your images with AI-powered editing tools and fun filters.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100 text-white">
                    <div class="card-body text-center">
                        <i class="fas fa-video feature-icon"></i>
                        <h5 class="card-title">Video Utilities</h5>
                        <p class="card-text">Extract audio from videos, perform format conversions, and access various FFmpeg-related tasks.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card h-100 text-white">
                    <div class="card-body text-center">
                        <i class="fas fa-users feature-icon"></i>
                        <h5 class="card-title">Community Management</h5>
                        <p class="card-text">Efficiently manage your Messenger groups with moderation tools and engagement features.</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="row mt-5">
            <div class="col-lg-8 mx-auto text-center">
                <h3 class="fw-light mb-4">Ready to enhance your Messenger experience?</h3>
                <a href="#" class="btn btn-primary btn-lg">Add ChikaBot to Messenger</a>
            </div>
        </div>
    </div>
`;

const donate = `
<div class="container-fluid">
	<div class="row">
		<div class="col-lg-8 col-md-7">
			<!-- <h1 class="text-center  mb-4">Donation Packages and Benefits</h1> -->
			<!-- <p class="text-center mb-4">Please choose the package you prefer.</p> -->
			<div id="packageContainer" class="row g-3 pe-3">
				<!-- Packages will be dynamically inserted here -->
			</div>
		</div>
		<div class="col-lg-4 col-md-5">
			<div id="subscriptionForm" class="app-card p-4 mt-3">
				<h4 class="mb-3">Subscribe to <span id="selectedPackageName"></span></h4>
				<p class="mb-4">Complete your subscription for ৳<span id="selectedPackagePrice"></span></p>
				<form id="donationForm">
					<div class="mb-3">
						<label for="uid" class="form-label">User ID (UID)</label>
						<input type="text" class="form-control" id="uid" placeholder="Enter your User ID" required />
					</div>
					<div class="mb-3">
						<label for="tid" class="form-label">Thread ID (TID)</label>
						<input type="text" class="form-control" id="tid" placeholder="Enter Thread ID" required />
					</div>
					<button type="submit" class="btn btn-primary w-100 fw-bold">Fetch Information</button>
				</form>
			</div>
		</div>
	</div>
</div>
`;

const supporter = `
<div class="container py-2">
   <h2 class="text-center mb-4">Our Awesome Supporters</h2>
   <p class="text-center mb-4">
	 A heartfelt thank you from the admin team to all our amazing supporters. Your contributions and support keep this project alive and thriving. We couldn't do it without you!
   </p>
   <div id="supporters-container" class="row">
	   <!-- Supporter cards will be dynamically inserted here -->
   </div>
</div>
 `;

const commands = `
<div class="container py-1">
  <h1 class="text-center mb-4">Chika Bot Commands</h1>
			<div class="row mb-4">
				<div class="col-md-6 mx-auto">
					<input type="text" id="searchInput" class="form-control" placeholder="Search commands..." />
				</div>
			</div>
	<div id="commands-container"></div>
</div>
 `;

const privacy = `
<div class="container mt-5">
<h1 class="text-center">Privacy Policy</h1>
<p class="text-center text-muted">Effective Date: 01/01/2023</p>

<section class="mt-4">
  <h2>1. Introduction</h2>
  <p>
	Welcome to <strong>CHIKA BOT</strong>, a Facebook Messenger bot created to
	provide fun, media, and group management services. We prioritize your
	privacy and are committed to protecting your personal data. This Privacy
	Policy explains how we collect, use, and safeguard information when you
	interact with our bot. By using our bot, you agree to the practices
	described in this policy.
  </p>
</section>

<section class="mt-4">
  <h2>2. Information We Collect</h2>
  <p>
	Our bot collects minimal data to function effectively. The types of data
	we collect include:
  </p>
  <ul>
	<li>
	  <strong>User ID:</strong> To identify you uniquely on Facebook
	  Messenger.
	</li>
	<li>
	  <strong>User Name:</strong> Used to personalize your interactions with
	  the bot.
	</li>
	<li>
	  <strong>Messages Sent to the Bot:</strong> The content of your messages
	  is processed to provide responses and execute commands.
	</li>
	<li>
	  <strong>Group Information:</strong> For group management, we may collect
	  group names, member IDs, and roles within the group, which are only used
	  to manage group tasks.
	</li>
	<li>
	  <strong>Media Shared with the Bot:</strong> Media files, such as images,
	  videos, and links, shared with the bot to provide appropriate responses
	  or actions.
	</li>
  </ul>
</section>

<section class="mt-4">
  <h2>3. How We Use Your Information</h2>
  <p>The information collected is used to:</p>
  <ul>
	<li>Respond to your commands and queries.</li>
	<li>Provide personalized and relevant information.</li>
	<li>
	  Assist in group management tasks, such as moderation, announcements, and
	  group statistics.
	</li>
	<li>Improve bot functionality and user experience.</li>
  </ul>
</section>

<section class="mt-4">
  <h2>4. Data Security</h2>
  <p>
	We are committed to ensuring the security of your data. We employ
	reasonable security measures to protect your information from unauthorized
	access, disclosure, or misuse. However, please note that no method of
	transmission over the internet or electronic storage is 100% secure.
  </p>
</section>

<section class="mt-4">
  <h2>5. Data Sharing</h2>
  <p>
	We do not sell, trade, or share your personal information with third
	parties, except as required by law or to comply with Facebook and Meta's
	guidelines. Your data is only used within the scope of the bot's
	functionalities and is never disclosed for marketing or advertising
	purposes.
  </p>
</section>

<section class="mt-4">
  <h2>6. Compliance with Facebook and Meta Policies</h2>
  <p>
	Our bot strictly adheres to Facebook and Meta’s policies and community
	guidelines. We do not engage in activities that violate these guidelines,
	and we strive to ensure that all user data is handled responsibly and
	securely.
  </p>
</section>

<section class="mt-4">
  <h2>7. User Control and Rights</h2>
  <p>
	You have the right to control the data shared with the bot. You may
	request the deletion of your information or stop interacting with the bot
	at any time. If you wish to make any changes or have concerns about your
	data, please contact us at [Contact Email].
  </p>
</section>

<section class="mt-4">
  <h2>8. Changes to This Privacy Policy</h2>
  <p>
	We may update this Privacy Policy from time to time to reflect changes in
	our practices or legal requirements. Any changes will be posted on this
	page with the updated effective date.
  </p>
</section>

<section class="mt-4">
  <h2>9. Contact Us</h2>
  <p>
	If you have any questions or concerns about this Privacy Policy or your
	data, please contact us at
	<a href="mailto://farhanisteak84@gmail.com">farhanisteak84@gmail.com</a>.
  </p>
</section>
</div>
`;

const admins = `
<div class="container py-5">
  <div class="team-header text-center">
    <h1 class="display-4 text-purple mb-4">Our Amazing Team</h1>
    <p class="lead">
      Meet the amazing team of admins and staff behind our waifu bot. Their dedication, passion, and hard work ensure an enjoyable experience for our community! 
    </p>
  </div>

  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4" id="team-members">
    <!-- Team members will be dynamically inserted here -->
  </div>
</div>
`;

// Page Loading and Navigation
const loadPage = (page) => {
	let content;
	switch (page) {
		case 'home':
			$('#main-content').html(home);
			break;
		case 'about':
			$('#main-content').html(about);
			break;
		case 'donate':
			$('#main-content').html(donate);
			renderPackages();
			updateSelectedPackage();
			break;
		case 'admins':
			$('#main-content').html(admins);
			renderAdmins();
			break;
		case 'supporter':
			$('#main-content').html(supporter);
			renderSupporters();
			break;
		case 'commands':
			$('#main-content').html(commands);
			initializeCommandsPage();
			break;
		case 'privacy':
			$('#main-content').html(privacy);
			break;
		case 'test':
			content = '<p>test.</p>';
			$('#main-content').html(content);
			break;
		default:
			content = `<div class="text-center" style="
    width: 100%;
    text-align: center;
    margin: auto;
">
<div class="loader"></div>
<br> <p>Page not found.</p>
</div>
`;
			$('#main-content').html(content);
	}

	attachEventListeners();

	localStorage.setItem('lastLoadedPage', page);

	updateActiveNavLink(page);
};

const setupPageLoader = () => {
	$(document).on('click', '[data-page]', function (event) {
		event.preventDefault();
		const page = $(this).data('page');
		loadPage(page);
		history.pushState({ page: page }, '', `#${page}`);
	});
};

const loadInitialPage = () => {
	const initialHash = window.location.hash.substring(1);
	const lastLoadedPage = localStorage.getItem('lastLoadedPage');
	const initialPage = initialHash || lastLoadedPage || 'home';
	loadPage(initialPage);
	history.replaceState({ page: initialPage }, '', `#${initialPage}`);
};

const updateActiveNavLink = (page) => {
	$('.nav-link').removeClass('is-active');
	$(`.nav-link[data-page="${page}"]`).addClass('is-active');
};

// Event Listeners
const attachEventListeners = () => {
	$('#proceed-donation').on('click', handleProceedDonation);
	$('#donationForm').on('submit', handleDonationSubmit);
};

// Main Execution
$(document).ready(() => {
	const savedTheme = localStorage.getItem('theme');
	if (savedTheme === 'light') {
		$('body').addClass('light-mode');
	}

	$('.dark-light').click(() => {
		$('body').toggleClass('light-mode');

		// Save the current theme to localStorage
		if ($('body').hasClass('light-mode')) {
			localStorage.setItem('theme', 'light');
		} else {
			localStorage.setItem('theme', 'dark');
		}
	});

	setupPageLoader();
	loadInitialPage();

	$(window).on('popstate', (event) => {
		if (event.originalEvent.state && event.originalEvent.state.page) {
			loadPage(event.originalEvent.state.page);
		}
	});

	$('.menu-bars').click(function (e) {
		e.stopPropagation();
		$('body').toggleClass('menu-shown');
		$('.left-side').toggleClass('shown');
	});

	$(document).click(function (e) {
		if (!$(e.target).closest('.left-side, .menu-bars').length) {
			$('body').removeClass('menu-shown');
			$('.left-side').removeClass('shown');
		}
	});

	$(document).on('click', '.select-package', function () {
		const tier = parseInt($(this).closest('.card').data('tier'));
		selectedPackage = packages.find((pkg) => pkg.tier === tier);
		updateSelectedPackage();
	});

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('/service-worker.js')
			.then((registration) => console.log('Service Worker registered:', registration))
			.catch((error) => console.error('Service Worker registration failed:', error));
	}

	$('#update-cache').click(async () => {
		console.log('Update Cache button clicked');
		if ('serviceWorker' in navigator) {
			try {
				const registration = await navigator.serviceWorker.ready;
				if (registration.active) {
					registration.active.postMessage({ action: 'updateCache' });
					showToast('Cache updated successfully!');
					setTimeout(() => location.reload(), 3000);
				} else {
					console.error('No active Service Worker found.');
				}
			} catch (error) {
				console.error('Failed to get Service Worker ready:', error);
			}
		} else {
			console.error('Service Worker not supported.');
		}
	});
});

// raw functions

const packages = [
	{
		tier: 1,
		name: "Chika's Cheerful Support",
		price: 50,
		icon: '🌟',
		description: "Support Chika's adventures with a cheerful donation!",
		benefits: [
			'Activate a single group chat (GC) with the bot for 1 week.',
			'Your name featured in a supporter list.',
			'No feature unlocks, but your support is greatly appreciated!',
		],
	},
	{
		tier: 2,
		name: "Chika's Secret Plan",
		price: 100,
		icon: '🎯',
		description: "Unlock Chika's secret plan and enjoy exclusive perks!",
		benefits: [
			'Activate a single group chat (GC) with the bot for 1 month.',
			'Priority access to bot updates and announcements.',
			'All Tier 1 benefits.',
		],
	},
	{
		tier: 3,
		name: "Chika's Supreme Strategy",
		price: 200,
		icon: '🎯',
		description: "Boost Chika's supreme strategy and double the fun!",
		benefits: [
			'Activate a group chat with the bot for 2 months.',
			'Priority access to new features as they roll out.',
			'Personalized thank-you video message from Chika.',
			'All Tier 1 and Tier 2 benefits.',
		],
	},
	{
		tier: 4,
		name: "VIP: Chika's Elite Fan",
		price: 500,
		icon: '👑',
		description: "Enjoy exclusive access reserved for Chika's most dedicated fans.",
		benefits: [
			'Activate a group chat with the bot for 6 months.',
			'VIP status: Access to private chats with the bot.',
			'Live support and priority responses to queries.',
			'Ability to submit feature requests and influence bot updates.',
			'2x EXP boost and faster level-ups (2x speed).',
			'Use the bot in any group or place, even if not currently active.',
			'Special recognition in bot communications as a VIP supporter.',
			'All Tier 1, Tier 2, and Tier 3 benefits.',
		],
	},
	{
		tier: 5,
		name: "Legendary: Chika's Ultimate Patron",
		price: 1000,
		icon: '🏆',
		description: "Join Chika's inner circle as a true hero of the waifu world!",
		benefits: [
			'Activate a group chat with the bot for 1 year.',
			'3x EXP boost and even faster level-ups (3x speed).',
			'Access to a private friends list feature with Chika.',
			'Direct influence on bot features and priority in feature rollouts.',
			'Personalized video shoutout from Chika, tailored to you.',
			'Extra perks such as early access to new bot capabilities, special event invites, and customizable bot interactions.',
			'Option to have Chika bot join and assist in your group events as a guest.',
			'All Tier 1, Tier 2, Tier 3, and Tier 4 benefits.',
		],
	},
];

let selectedPackage = packages[0];
function renderPackages() {
	const packageContainer = document.getElementById('packageContainer');
	if (!packageContainer) {
		console.error('Package container not found');
		return;
	}
	packageContainer.innerHTML = '';

	packages.forEach((pkg) => {
		const packageCard = document.createElement('div');
		packageCard.className = 'col';
		packageCard.innerHTML = `
		<div class="card h-100 glass-card" data-tier="${pkg.tier}">
			<div class="card-body">
				<div class="d-flex justify-content-between align-items-center mb-3">
					<span class="badge bg-secondary">Tier ${pkg.tier}</span>
					<span class="package-icon">${pkg.icon}</span>
				</div>
				<h5 class="card-title">${pkg.name}</h5>
				<h6 class="card-subtitle mb-2 text-warning">৳${pkg.price}</h6>
				<p class="card-text">${pkg.description}</p>
				<ul class="list-unstyled">
					${pkg.benefits
						.map(
							(benefit) => `
						<li class=" mb-2">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill text-success me-2" viewBox="0 0 16 16">
								<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
			</svg>
							${benefit}
						</li>
					`
						)
						.join('')}
				</ul>
			</div>
			<div class="card-footer">
				<button class="btn btn-outline-light w-100 select-package">Select Package</button>
			</div>
		</div>
	`;
		packageContainer.appendChild(packageCard);
	});
}

async function renderAdmins() {
	try {
		const response = await fetch(`${CDN_BASE}/data/admins.json`);
		if (!response.ok) {
			throw new Error('Failed to fetch admin data');
		}
		const teamMembers = await response.json();

		const teamMembersContainer = $('#team-members');

		teamMembers.forEach((member) => {
			const memberCard = `
            <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div class="team-member-card h-100">
                    <div class="member-image">
                        <img src="${member.image}" alt="${member.name}" class="img-fluid">
                        <div class="member-info">
                            <h5 class="mb-0">${member.name}</h5>
                            <p class="mb-0">${member.designation}</p>
                        </div>
                    </div>
                    <div class="p-3 d-flex flex-column justify-content-between">
                        <div>
                            ${member.bio ? `<p class="member-bio mb-3">${member.bio}</p>` : ''}
                            <div class="social-links text-center mb-3">
                                ${
																	member.socialLinks.facebook
																		? `<a href="${member.socialLinks.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>`
																		: ''
																}
                                ${
																	member.socialLinks.github
																		? `<a href="${member.socialLinks.github}" target="_blank"><i class="fab fa-github"></i></a>`
																		: ''
																}
                                ${
																	member.socialLinks.email
																		? `<a href="mailto:${member.socialLinks.email}"><i class="fas fa-envelope"></i></a>`
																		: ''
																}
                                ${
																	member.socialLinks.telegram
																		? `<a href="${member.socialLinks.telegram}" target="_blank"><i class="fab fa-telegram-plane"></i></a>`
																		: ''
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
		console.error('Error fetching admin data:', error);
		$('#team-members').html('<p class="text-danger">Failed to load team members. Please try again later.</p>');
	}
}

async function renderSupporters() {
	try {
		const response = await fetch(`${CDN_BASE}/data/supporters.json`);
		if (!response.ok) {
			throw new Error('Failed to fetch admin data');
		}
		const supporters = await response.json();

		// Sort supporters by tier (highest to lowest)
		supporters.sort((a, b) => b.tier - a.tier);

		const supportersContainer = $('#supporters-container');

		supporters.forEach((supporter) => {
			const supporterCard = `
            <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div class="team-member-card h-100">
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
                                <span class="badge bg-primary">Tier ${supporter.tier}</span>
                                <a href="${supporter.fblink}" target="_blank" class="btn btn-outline-primary btn-sm">
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
		console.error('Error fetching admin data:', error);
		$('#supporters-container').html('<p class="text-danger">Failed to load supporters data. Please try again later.</p>');
	}
}

let commandsData = {};

async function fetchCommands() {
	try {
		const response = await fetch(`${CDN_BASE}/data/commands.json`);
		if (!response.ok) {
			throw new Error('Failed to fetch commands data');
		}
		commandsData = await response.json();
		renderCommands();
	} catch (error) {
		console.error('Error fetching commands:', error);
		$('#commands-container').html('<p class="text-danger">Failed to load commands. Please try again later.</p>');
	}
}

function groupCommandsByCategory(commands) {
	const categories = {};
	for (const [cmdName, cmdData] of Object.entries(commands)) {
		const category = cmdData.category || 'Uncategorized';
		if (!categories[category]) {
			categories[category] = [];
		}
		categories[category].push({ name: cmdName, ...cmdData });
	}
	return categories;
}

function replacePlaceholders(guide, commandName) {
	if (typeof guide !== 'string') return 'No guide available.';
	return guide
		.replace(/\{pn\}/g, `/${commandName}`)
		.replace(/\{p\}n/g, `/${commandName}`)
		.replace(/\{p\}/g, '/')
		.replace(/\{n\}/g, commandName);
}

function renderCommands() {
	const container = document.getElementById('commands-container');
	if (!container) {
		console.error('Commands container not found');
		return;
	}
	container.innerHTML = ''; // Clear existing content

	const groupedCommands = groupCommandsByCategory(commandsData);

	for (const [category, commands] of Object.entries(groupedCommands)) {
		const categoryCard = document.createElement('div');
		categoryCard.className = 'card mb-3';
		categoryCard.innerHTML = `
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">${category}</h5>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="card-body" style="display: none;">
                ${commands
									.map(
										(cmd) => `
                    <div class="command-item mb-3">
                        <div class="command-name">/${cmd.name}</div>
                        <div class="command-description">${
													cmd.shortDescription?.en || cmd.description?.en || 'No description available.'
												}</div>
                        <div class="command-aliases">Aliases: ${
													cmd.aliases ? cmd.aliases.map((alias) => `/${alias}`).join(', ') : 'None'
												}</div>
                        <div class="command-guide">${replacePlaceholders(cmd.guide?.en, cmd.name)}</div>
                    </div>
                `
									)
									.join('')}
            </div>
        `;
		container.appendChild(categoryCard);
	}

	// Add click event listeners to category headers
	document.querySelectorAll('.card-header').forEach((header) => {
		header.addEventListener('click', function () {
			const body = this.nextElementSibling;
			const icon = this.querySelector('.fa-chevron-down');
			body.style.display = body.style.display === 'none' ? 'block' : 'none';
			icon.classList.toggle('rotate');
		});
	});
}

function filterCommands() {
	const searchTerm = document.getElementById('searchInput').value.toLowerCase();
	document.querySelectorAll('.command-item').forEach((item) => {
		const commandName = item.querySelector('.command-name').textContent.toLowerCase();
		const commandDescription = item.querySelector('.command-description').textContent.toLowerCase();
		if (commandName.includes(searchTerm) || commandDescription.includes(searchTerm)) {
			item.style.display = 'block';
			item.closest('.card').style.display = 'block';
		} else {
			item.style.display = 'none';
		}
	});

	document.querySelectorAll('.card').forEach((card) => {
		const visibleItems = card.querySelectorAll('.command-item[style="display: block;"]');
		if (visibleItems.length === 0) {
			card.style.display = 'none';
		} else {
			card.style.display = 'block';
		}
	});
}

// Call this function when the commands page is loaded
function initializeCommandsPage() {
	fetchCommands();
	const searchInput = document.getElementById('searchInput');
	if (searchInput) {
		searchInput.addEventListener('input', filterCommands);
	}
}

function updateSelectedPackage() {
	const nameElement = document.getElementById('selectedPackageName');
	const priceElement = document.getElementById('selectedPackagePrice');
	if (!nameElement || !priceElement) {
		console.error('Selected package elements not found');
		return;
	}

	// Update package details
	nameElement.textContent = selectedPackage.name;
	priceElement.textContent = selectedPackage.price;

	document.querySelectorAll('.card').forEach((card) => card.classList.remove('selected'));

	const selectedCard = document.querySelector(`.card[data-tier="${selectedPackage.tier}"]`);
	if (selectedCard) {
		selectedCard.classList.add('selected');
	}

	// Scroll to the subscription form on mobile devices (screen width < 768px)
	const isMobile = window.innerWidth < 768;
	if (isMobile) {
		const formElement = $('#subscriptionForm');
		if (formElement.length) {
			$('#main-content').animate(
				{
					scrollTop: formElement.offset().top,
				},
				1000
			);
		}
	}
}

const saveToLocalStorage = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

const getFromLocalStorage = (key) => {
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : null;
};

// Donation Submission Handler
const handleDonationSubmit = async (e) => {
	e.preventDefault();
	const uid = document.getElementById('uid').value.trim();
	const tid = document.getElementById('tid').value.trim();

	if (!uid || !tid) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Please enter both User ID and Thread ID.',
		});
		return;
	}

	try {
		showLoading('Fetching user and thread data...');
		const userResponse = await axios.get(`/api/user/${uid}`);
		const threadResponse = await axios.get(`/api/thread/${tid}`);

		if (!threadResponse.data.data.isGroup) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'TID is not a valid group!',
			});
			return;
		}

		if (!threadResponse.data.isSubscribed) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Please add me in your group before proceeding!',
			});
			return;
		}

		if (userResponse.data.status === 'success' && threadResponse.data.status === 'success') {
			const userData = userResponse.data.data;
			const threadData = threadResponse.data.data;
			saveToLocalStorage('userData', userData);
			saveToLocalStorage('threadData', threadData);
			renderUserThreadInfo(userData, threadData);
		} else {
			throw new Error('User or Thread not found');
		}
	} catch (error) {
		alert('An error occurred while fetching data. Please check your User ID and Thread ID.');
		console.error('Error:', error);
	} finally {
		hideLoading();
	}
};

const renderUserThreadInfo = (userData, threadData) => {
	const packageContainer = document.getElementById('packageContainer');
	if (!packageContainer) {
		console.error('Package container not found');
		return;
	}

	packageContainer.innerHTML = `
        <div class="col-12">
            <div class="card mb-3">
                <div class="card-header bg-primary text-white">User Information</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="${userData.avatar}" class="rounded-circle mb-3" alt="${userData.name}" width="130px">
                        </div>
                        <div class="col-md-8">
                            <h5 class="card-title">${userData.name}</h5>
                            <p class="card-text">Username: ${userData.vanity}</p>
                            <p class="card-text">User ID: ${userData.userID}</p>
                            <p class="card-text">Exp: ${userData.exp}</p>
                            <p class="card-text">Money: ${userData.money}</p>
                            <p class="card-text">Last Active GC: ${userData.settings.last_active_gc}</p>
                            <p class="card-text">Token Time: ${new Date(userData.settings.token_time).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-header bg-success text-white">Thread Information</div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 text-center">
                            <img src="${threadData.imageSrc}" class="rounded-circle mb-3" alt="${threadData.threadName}" width="130px">
                        </div>
                        <div class="col-md-8">
                            <h5 class="card-title">${threadData.threadName}</h5>
                            <p class="card-text">Thread ID: ${threadData.threadID}</p>
                            <p class="card-text">Approval Mode: ${threadData.approvalMode ? 'Enabled' : 'Disabled'}</p>
                            <p class="card-text">Admins: ${threadData.adminIDs.length}</p>
                            <p class="card-text">Members: ${threadData.members.length}</p>
                            <p class="card-text">Updated At: ${new Date(threadData.updatedAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <button id="confirmProceed" class="btn btn-success btn-lg">Confirm and Proceed</button>
            </div>
        </div>
    `;

	const confirmProceedButton = document.getElementById('confirmProceed');
	if (confirmProceedButton) {
		confirmProceedButton.addEventListener('click', handleProceedDonation);
	}
};

const handleProceedDonation = () => {
	showLoading('Payment is processing, please complete the payment in the opened window.');
	$.ajax({
		url: '/bkash/create-payment',
		method: 'POST',
		data: {
			amount: $('#selectedPackagePrice').text(),
			uid: $('#uid').val(),
			tid: $('#tid').val(),
		},
		success: function (response) {
			if (response.bkashURL) {
				const paymentPopup = window.open(response.bkashURL, 'bKash Payment', 'width=500,height=600');
				// Listen for messages from the popup window
				window.addEventListener(
					'message',
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
					icon: 'error',
					title: 'Oops...',
					text: 'Something went wrong while creating the payment!',
				});
			}
		},
		error: function () {
			hideLoading();
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Failed to initiate payment. Please try again.',
			});
		},
	});
};

const handlePaymentMessage = (event) => {
	if (event.origin === window.location.origin) {
		const paymentStatus = event.data;
		handlePaymentResponse(paymentStatus);
		if (event.source) event.source.close();
	}
};

const handlePaymentResponse = (paymentStatus) => {
	hideLoading();
	if (paymentStatus.status === 'success') {
		const userData = getFromLocalStorage('userData');
		const threadData = getFromLocalStorage('threadData');
		if (userData && threadData) {
			const paymentInfo = {
				transactionId: paymentStatus.trxID,
				amount: selectedPackage.price,
				packageName: selectedPackage.name,
				date: new Date(),
			};
			renderThankYouMessage(userData, threadData, paymentInfo);
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Data Error',
				text: 'User or Thread data not found. Please try again.',
			});
		}
	} else if (paymentStatus.status === 'cancel') {
		Swal.fire({
			icon: 'info',
			title: 'Payment Cancelled',
			text: 'Payment was cancelled by the user.',
		});
	} else {
		Swal.fire({
			icon: 'error',
			title: 'Payment Failed',
			text: paymentStatus?.message,
		});
	}
};

const renderThankYouMessage = (userData, threadData, paymentInfo) => {
	const packageContainer = document.getElementById('packageContainer');
	if (!packageContainer) {
		console.error('Package container not found');
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
                                <img src="${userData.avatar}" class="rounded-circle" alt="${userData.name}" width="100px">
                            </div>
                            <h6 class="card-title">${userData.name}</h6>
                            <p class="card-text">Username: ${userData.vanity}</p>
                            <p class="card-text">User ID: ${userData.userID}</p>
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
                                <img src="${threadData.imageSrc}" class="rounded-circle" alt="${threadData.threadName}" width="100px">
                            </div>
                            <h6 class="card-title">${threadData.threadName}</h6>
                            <p class="card-text">Thread ID: ${threadData.threadID}</p>
                            <p class="card-text">Members: ${threadData.members.length}</p>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow">
                        <div class="card-header bg-info text-white">
                            <h5 class="mb-0">Payment Information</h5>
                        </div>
                        <div class="card-body">
                            <h6 class="card-title">Transaction ID: ${paymentInfo.trxID}</h6>
                            <p class="card-text">Amount: ৳${paymentInfo.amount}</p>
                            <p class="card-text">Package: ${paymentInfo.packageName}</p>
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

const showLoading = (message) => {
	const loadingOverlay = document.createElement('div');
	loadingOverlay.id = 'loadingOverlay';
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
	const loadingOverlay = document.getElementById('loadingOverlay');
	if (loadingOverlay) {
		loadingOverlay.remove();
	}
};

// Utility Functions
const showToast = (message) => {
	const toast = $(`<div class="toast-message">${message}</div>`);
	$('#toast-container').append(toast);
	toast.css({
		padding: '10px 20px',
		background: '#333',
		color: '#fff',
		borderRadius: '5px',
		marginBottom: '10px',
		opacity: 0,
		transition: 'opacity 0.5s',
	});
	setTimeout(() => toast.css('opacity', 1), 10);
	setTimeout(() => {
		toast.css('opacity', 0);
		setTimeout(() => toast.remove(), 500);
	}, 3000);
};
