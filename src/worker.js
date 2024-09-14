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

const environment = 'production'; // This Variable Decides the environment of the app. 'production' or 'development' or 'local'
const APP_NAME = 'CHIKA DONATION PANEL';
const CDN_SRC = 'https://cdn.jsdelivr.net/gh/tas33n/CHIKA-DONATION-PORTAL@main';
const BKS_URL = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized';
const BKS_USER = 'sandboxTokenizedUser02';
const BKS_PASS = 'sandboxTokenizedUser02@12345';
const BKS_KEY = '4f6o0cjiki2rfm34kfdadl1eqq';
const BKS_SEC = '2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b';
const APP_URL = 'https://chika.misfits.workers.dev'; //needed for callbacks of bks

const BOT_API = 'https://touka0x11-a0fc068a4b01.herokuapp.com';
const BOT_APIKEY = '8d8e8ca0d542ce666e816dbb0659dd067f72f213474ebfde73aea3b241e39f5a';

// 01619777283 12345 12121

/*****************************************************************************
 *
 * ___   ___  _  _ _____   _____ ___  _   _  ___ _  _   ___ ___ _    _____      __  _____ _  _ ___ ___   _    ___ _  _ ___
 *|   \ / _ \| \| |_   _| |_   _/ _ \| | | |/ __| || | | _ ) __| |  / _ \ \    / / |_   _| || |_ _/ __| | |  |_ _| \| | __|
 *| |) | (_) | .` | | |     | || (_) | |_| | (__| __ | | _ \ _|| |_| (_) \ \/\/ /    | | | __ || |\__ \ | |__ | || .` | _|
 *|___/ \___/|_|\_| |_|     |_| \___/ \___/ \___|_||_| |___/___|____\___/ \_/\_/     |_| |_||_|___|___/ |____|___|_|\_|___|
 *
 *
 *****************************************************************************/

let app_base;
if (environment === 'production') {
	app_base = CDN_SRC;
} else if (environment === 'local') {
	app_base = 'http://127.0.0.1:5500/';
}

async function handleRequest(request) {
	const url = new URL(request.url);
	const path = url.pathname;
	const fetchUrl = app_base + path;
	// Routing logic
	switch (true) {
		case path === '/':
			return new Response(app, {
				status: 200,
				headers: { 'Content-Type': 'text/html' },
			});

		// api
		case path.startsWith('/api'):
			return handleApiRequest(path);

		// assets raw api
		case path === '/manifest.json':
		case path === '/service-worker.js':
		case path.startsWith('/assets'):
			console.log(fetchUrl);
			try {
				const response = await fetch(fetchUrl);
				if (!response.ok) {
					return not_found;
				}
				const contentType = response.headers.get('Content-Type');
				const body = await response.arrayBuffer();
				return new Response(body, { status: 200, headers: { 'Content-Type': contentType } });
			} catch (err) {
				return new Response('Report this page when asked at the time of support... ==> ' + err.stack, {
					status: 500,
				});
			}
		case path.startsWith('/bkash'):
			if (request.method === 'POST' && url.pathname === '/bkash/create-payment') {
				return handleCreatePayment(request);
			} else if (url.pathname === '/bkash/execute-payment') {
				return handleExecutePayment(request);
			} else {
				return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
			}
		default:
			return await not_found();
	}
}

async function handleApiRequest(path) {
	let args2 = path.split('/').filter(Boolean);

	let api = args2[1];
	let id = args2.slice(2).join('/');

	if (!id) {
		return new Response(JSON.stringify({ error: 'ID is required' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	try {
		let apiUrl = null;

		switch (api) {
			case 'me':
				apiUrl = `${BOT_API}/web/api/me`;
				break;
			case 'user':
				apiUrl = `${BOT_API}/web/api/user/${id}`;
				break;
			case 'thread':
				apiUrl = `${BOT_API}/web/api/thread/${id}`;
				break;
			default:
				return new Response(JSON.stringify({ error: 'Invalid API endpoint' }), {
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				});
		}

		const response = await fetch(apiUrl, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${BOT_APIKEY}`,
			},
			timeout: 60000,
		});

		if (!response.ok) {
			return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
				status: response.status,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const data = await response.json();

		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		if (error.name === 'TimeoutError') {
			return new Response(JSON.stringify({ error: 'Request timed out' }), {
				status: 504,
				headers: { 'Content-Type': 'application/json' },
			});
		} else {
			console.error('Error fetching data:', error);
			return new Response(JSON.stringify({ error: 'Internal server error' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			});
		}
	}
}

const app = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>CHIKA - Your Favorite Waifu bot</title>
	<meta name="description"
		content="Meet CHIKA BOT, your charming messenger waifu assistant. Manage groups, find media, and add fun to your chats with our AI-powered companion!">

	<!-- Favicon -->
	<link rel="icon" type="image/png" href="assets/imgs/icon-192x192.png">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://chika.misfits.workers.dev/">
	<meta property="og:title" content="CHIKA BOT - Your Favorite Messenger Waifu Assistant">
	<meta property="og:description"
		content="Discover the charm of CHIKA BOT, your AI waifu companion for Messenger. Enhance your chats with fun, media management, and group moderation!">
	<meta property="og:image" content="${app_base}/assets/imgs/thumb.webp">

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content="https://chika.misfits.workers.dev/">
	<meta property="twitter:title" content="CHIKA BOT - Your Favorite Messenger Waifu Assistant">
	<meta property="twitter:description"
		content="Meet CHIKA BOT, your AI waifu companion for Messenger. Add fun, manage media, and moderate groups with our charming assistant!">
	<meta property="twitter:image" content="${app_base}/assets/imgs/thumb.webp">

	<!-- Additional SEO tags -->
	<meta name="keywords"
		content="CHIKA BOT, messenger bot, waifu assistant, AI companion, group management, media finder, chat fun">
	<meta name="author" content="Tas33n">
	<meta name="robots" content="index, follow">

	<!-- Canonical URL -->
	<link rel="canonical" href="https://chika.misfits.workers.dev/">

	<!-- Additional meta tags -->
	<meta name="theme-color" content="#f472b6">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
	<meta name="apple-mobile-web-app-title" content="CHIKA BOT">

	<!-- css cdns -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
		integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css" />
	<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
	<link rel="stylesheet" href="${app_base}/assets/css/app.css" />

	<script type="application/ld+json">
			{
			  "@context": "https://schema.org",
			  "@type": "WebApplication",
			  "name": "CHIKA BOT",
			  "description": "An AI-powered waifu assistant for Messenger, offering group management, media finding, and fun interactions.",
			  "url": "https://chika.misfits.workers.dev/",
			  "applicationCategory": "ChatBot",
			  "operatingSystem": "Web",
			  "offers": {
				"@type": "Offer",
				"price": "0",
				"priceCurrency": "BDT"
			  },
			  "author": {
				"@type": "Person",
				"name": "Tas33n"
			  }
			}
			</script>
</head>

	<body>
		<div class="video-bg">
			<video width="320" height="240" autoplay loop muted>
				<source src="${app_base}/assets/imgs/7btrrd.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>

		<div id="toast-container" style="position: fixed; top: 40px; right: 20px; z-index: 9999"></div>

		<div id="update-cache" class="update-icon">
			<svg
				fill="currentColor"
				version="1.1"
				id="Capa_1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 420.827 420.827"
				xml:space="preserve"
			>
				<g>
					<g>
						<path
							d="M210.29,0C156,0,104.43,20.693,65.077,58.269C25.859,95.715,2.794,146.022,0.134,199.921
			c-0.135,2.734,0.857,5.404,2.744,7.388c1.889,1.983,4.507,3.105,7.244,3.105h45.211c5.275,0,9.644-4.098,9.979-9.362
			c4.871-76.214,68.553-135.914,144.979-135.914c80.105,0,145.275,65.171,145.275,145.276c0,80.105-65.17,145.276-145.275,145.276
			c-18.109,0-35.772-3.287-52.501-9.771l17.366-15.425c2.686-2.354,3.912-5.964,3.217-9.468c-0.696-3.506-3.209-6.371-6.592-7.521
			l-113-32.552c-3.387-1.149-7.122-0.407-9.81,1.948c-2.686,2.354-3.913,5.963-3.218,9.467L69.71,403.157
			c0.696,3.505,3.209,6.372,6.591,7.521c3.383,1.147,7.122,0.408,9.81-1.946l18.599-16.298
			c31.946,18.574,68.456,28.394,105.581,28.394c116.021,0,210.414-94.392,210.414-210.414C420.705,94.391,326.312,0,210.29,0z"
						/>
						<path
							d="M195.112,237.9h118.5c2.757,0,5-2.242,5-5v-30c0-2.757-2.243-5-5-5h-83.5v-91c0-2.757-2.243-5-5-5h-30
			c-2.757,0-5,2.243-5,5v126C190.112,235.658,192.355,237.9,195.112,237.9z"
						/>
					</g>
				</g>
			</svg>
		</div>

		<div class="app">
			<div class="header">
				<div class="menu-circle"></div>
				<div class="menu-bars">
					<span></span>
					<span></span>
					<span></span>
				</div>
				<div class="header-profile">
				<svg
						class="dark-light"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
					</svg>

					<div class="notification ml-3">
						<span class="notification-number">0</span>
						<svg
							viewBox="0 0 24 24"
							fill="currentColor"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-bell"
						>
							<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
						</svg>
					</div>

					<img id="botdp" class="profile-img botavatar"
					src="data:image/png;base64,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"
					alt="" />

				</div>
			</div>

			<div class="wrapper">
				<div class="left-side">
					<div class="side-wrapper">
						<div class="side-title">Menu</div>
						<div class="side-menu">
							<a href="#home" class="nav-link" data-page="home">
								<svg viewBox="0 0 16 16">
									<path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" fill="currentColor"></path>
								</svg>
								Home
							</a>
							<a href="#about" class="nav-link" data-page="about">
								<svg viewBox="0 0 512 512" fill="currentColor">
									<path
										d="M213.333333,3.55271368e-14 C331.154987,3.55271368e-14 426.666667,95.51168 426.666667,213.333333 C426.666667,331.153707 331.154987,426.666667 213.333333,426.666667 C95.51296,426.666667 3.55271368e-14,331.153707 3.55271368e-14,213.333333 C3.55271368e-14,95.51168 95.51296,3.55271368e-14 213.333333,3.55271368e-14 Z M234.713387,192 L192.04672,192 L192.04672,320 L234.713387,320 L234.713387,192 Z M213.55008,101.333333 C197.99616,101.333333 186.713387,112.5536 186.713387,127.704107 C186.713387,143.46752 197.698773,154.666667 213.55008,154.666667 C228.785067,154.666667 240.04672,143.46752 240.04672,128 C240.04672,112.5536 228.785067,101.333333 213.55008,101.333333 Z"
										id="Shape"
									></path>
								</svg>
								About
							</a>

							<a href="#commands" class="nav-link" data-page="commands">
								<svg fill="currentColor" viewBox="0 0 30 30">
									<path
										d="M22.005 0c-.194-.002-.372.105-.458.276l-2.197 4.38-4.92.7c-.413.06-.578.56-.278.846l3.805 3.407-.953 4.81c-.07.406.363.715.733.523L22 12.67l4.286 2.273c.37.19.8-.118.732-.522l-.942-4.81 3.77-3.408c.3-.286.136-.787-.278-.846l-4.916-.7-2.2-4.38C22.368.11 22.195.002 22.005 0zM22 1.615l1.863 3.71c.073.148.216.25.38.273l4.168.595-3.227 2.89c-.12.112-.173.276-.145.436l.813 4.08-3.616-1.927c-.147-.076-.322-.076-.47 0l-3.59 1.926.823-4.08c.028-.16-.027-.325-.145-.438l-3.262-2.89 4.166-.594c.165-.023.307-.125.38-.272zM16.5 18c-.822 0-1.5.678-1.5 1.5v9c0 .822.678 1.5 1.5 1.5h9c.822 0 1.5-.678 1.5-1.5v-9c0-.822-.678-1.5-1.5-1.5zm0 1h9c.286 0 .5.214.5.5v9c0 .286-.214.5-.5.5h-9c-.286 0-.5-.214-.5-.5v-9c0-.286.214-.5.5-.5zM1.5 3C.678 3 0 3.678 0 4.5v9c0 .822.678 1.5 1.5 1.5h9c.822 0 1.5-.678 1.5-1.5v-9c0-.822-.678-1.5-1.5-1.5zm0 1h9c.286 0 .5.214.5.5v9c0 .286-.214.5-.5.5h-9c-.286 0-.5-.214-.5-.5v-9c0-.286.214-.5.5-.5zm0 14c-.822 0-1.5.678-1.5 1.5v9c0 .822.678 1.5 1.5 1.5h9c.822 0 1.5-.678 1.5-1.5v-9c0-.822-.678-1.5-1.5-1.5zm0 1h9c.286 0 .5.214.5.5v9c0 .286-.214.5-.5.5h-9c-.286 0-.5-.214-.5-.5v-9c0-.286.214-.5.5-.5z"
									></path>
								</svg>
								commands
							</a>

							<a href="#invite" class="nav-link" data-page="invite">
								<svg fill="currentColor" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
									<g id="SVGRepo_iconCarrier">
										<polygon
											points="209.5,23.3 314.2,128 128,314.2 23.3,209.5 0,512 302.5,488.7 197.8,384 384,197.8 488.7,302.5 512,0 "
										></polygon>
									</g>
								</svg>
								Invite
							</a>

							<a href="#donate" class="nav-link" data-page="donate">
								<svg viewBox="0 0 24 24" fill="currentColor">
									<path
										d="M16 6.27975C16 6.88118 15.7625 7.45883 15.3383 7.88611C14.3619 8.87007 13.415 9.89605 12.4021 10.8443C12.17 11.0585 11.8017 11.0507 11.5795 10.8268L8.6615 7.88611C7.7795 6.99725 7.7795 5.56225 8.6615 4.67339C9.55218 3.77579 11.0032 3.77579 11.8938 4.67339L11.9999 4.78027L12.1059 4.67345C12.533 4.24286 13.1146 4 13.7221 4C14.3297 4 14.9113 4.24284 15.3383 4.67339C15.7625 5.10073 16 5.67835 16 6.27975Z"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linejoin="round"
									/>
									<path
										d="M18 20L21.8243 16.1757C21.9368 16.0632 22 15.9106 22 15.7515V10.5C22 9.67157 21.3284 9 20.5 9V9C19.6716 9 19 9.67157 19 10.5V15"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M18 16L18.8581 15.1419C18.949 15.051 19 14.9278 19 14.7994V14.7994C19 14.6159 18.8963 14.4482 18.7322 14.3661L18.2893 14.1447C17.5194 13.7597 16.5894 13.9106 15.9807 14.5193L15.0858 15.4142C14.7107 15.7893 14.5 16.298 14.5 16.8284V20"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M6 20L2.17574 16.1757C2.06321 16.0632 2 15.9106 2 15.7515V10.5C2 9.67157 2.67157 9 3.5 9V9C4.32843 9 5 9.67157 5 10.5V15"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M6 16L5.14187 15.1419C5.05103 15.051 5 14.9278 5 14.7994V14.7994C5 14.6159 5.10366 14.4482 5.26776 14.3661L5.71067 14.1447C6.48064 13.7597 7.41059 13.9106 8.01931 14.5193L8.91421 15.4142C9.28929 15.7893 9.5 16.298 9.5 16.8284V20"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>

								donate
							</a>

							<a href="#supporter" class="nav-link" data-page="supporter">
								<svg viewBox="0 0 28 28" fill="currentColor">
									<path
										d="M17.7540247,11 C18.720523,11 19.5040247,11.7835017 19.5040247,12.75 L19.5040247,19.4989513 C19.5040247,22.5370966 17.0411213,25 14.002976,25 C10.9648308,25 8.50192738,22.5370966 8.50192738,19.4989513 L8.50192738,12.75 C8.50192738,11.7835017 9.28542907,11 10.2519274,11 L17.7540247,11 Z M3.75,11 L8.13210827,10.9980646 C7.78221386,11.420954 7.55643325,11.9502867 7.51057947,12.5302496 L7.50192738,12.75 L7.50192738,19.4989513 C7.50192738,20.6323434 7.79196393,21.6979939 8.30186513,22.6257307 C7.75085328,22.8662539 7.14166566,23 6.50123996,23 C4.01527377,23 2,20.9847262 2,18.49876 L2,12.75 C2,11.7835017 2.78350169,11 3.75,11 Z M19.8738438,10.9980646 L24.25,11 C25.2164983,11 26,11.7835017 26,12.75 L26,18.5 C26,20.9852814 23.9852814,23 21.5,23 C20.8609276,23 20.2529701,22.8667819 19.7023824,22.6266008 L19.7581025,22.5253735 C20.1867892,21.7118524 20.4480368,20.7963864 20.4959995,19.8248213 L20.5040247,19.4989513 L20.5040247,12.75 C20.5040247,12.084283 20.267475,11.4738152 19.8738438,10.9980646 Z M14,3 C15.9329966,3 17.5,4.56700338 17.5,6.5 C17.5,8.43299662 15.9329966,10 14,10 C12.0670034,10 10.5,8.43299662 10.5,6.5 C10.5,4.56700338 12.0670034,3 14,3 Z M22.0029842,4 C23.6598384,4 25.0029842,5.34314575 25.0029842,7 C25.0029842,8.65685425 23.6598384,10 22.0029842,10 C20.3461299,10 19.0029842,8.65685425 19.0029842,7 C19.0029842,5.34314575 20.3461299,4 22.0029842,4 Z M5.99701582,4 C7.65387007,4 8.99701582,5.34314575 8.99701582,7 C8.99701582,8.65685425 7.65387007,10 5.99701582,10 C4.34016157,10 2.99701582,8.65685425 2.99701582,7 C2.99701582,5.34314575 4.34016157,4 5.99701582,4 Z"
										id="🎨-Color"
									></path>
								</svg>
								Our Supporter
							</a>

							<a href="#admins" class="nav-link" data-page="admins">
								<svg fill="currentColor" viewBox="0 0 474.565 474.565" xml:space="preserve">
									<path d="M255.204,102.3c-0.606-11.321-12.176-9.395-23.465-9.395C240.078,95.126,247.967,98.216,255.204,102.3z"></path>
									<path
										d="M134.524,73.928c-43.825,0-63.997,55.471-28.963,83.37c11.943-31.89,35.718-54.788,66.886-63.826 C163.921,81.685,150.146,73.928,134.524,73.928z"
									></path>
									<path
										d="M43.987,148.617c1.786,5.731,4.1,11.229,6.849,16.438L36.44,179.459c-3.866,3.866-3.866,10.141,0,14.015l25.375,25.383 c1.848,1.848,4.38,2.888,7.019,2.888c2.61,0,5.125-1.04,7.005-2.888l14.38-14.404c2.158,1.142,4.55,1.842,6.785,2.827 c0-0.164-0.016-0.334-0.016-0.498c0-11.771,1.352-22.875,3.759-33.302c-17.362-11.174-28.947-30.57-28.947-52.715 c0-34.592,28.139-62.739,62.723-62.739c23.418,0,43.637,13.037,54.43,32.084c11.523-1.429,22.347-1.429,35.376,1.033 c-1.676-5.07-3.648-10.032-6.118-14.683l14.396-14.411c1.878-1.856,2.918-4.38,2.918-7.004c0-2.625-1.04-5.148-2.918-7.004 l-25.361-25.367c-1.94-1.941-4.472-2.904-7.003-2.904c-2.532,0-5.063,0.963-6.989,2.904l-14.442,14.411 c-5.217-2.764-10.699-5.078-16.444-6.825V9.9c0-5.466-4.411-9.9-9.893-9.9h-35.888c-5.451,0-9.909,4.434-9.909,9.9v20.359 c-5.73,1.747-11.213,4.061-16.446,6.825L75.839,22.689c-1.942-1.941-4.473-2.904-7.005-2.904c-2.531,0-5.077,0.963-7.003,2.896 L36.44,48.048c-1.848,1.864-2.888,4.379-2.888,7.012c0,2.632,1.04,5.148,2.888,7.004l14.396,14.403 c-2.75,5.218-5.063,10.708-6.817,16.438H23.675c-5.482,0-9.909,4.441-9.909,9.915v35.889c0,5.458,4.427,9.908,9.909,9.908H43.987z"
									></path>
									<path
										d="M354.871,340.654c15.872-8.705,26.773-25.367,26.773-44.703c0-28.217-22.967-51.168-51.184-51.168 c-9.923,0-19.118,2.966-26.975,7.873c-4.705,18.728-12.113,36.642-21.803,52.202C309.152,310.022,334.357,322.531,354.871,340.654z "
									></path>
									<path
										d="M460.782,276.588c0-5.909-4.799-10.693-10.685-10.693H428.14c-1.896-6.189-4.411-12.121-7.393-17.75l15.544-15.544 c2.02-2.004,3.137-4.721,3.137-7.555c0-2.835-1.118-5.553-3.137-7.563l-27.363-27.371c-2.08-2.09-4.829-3.138-7.561-3.138 c-2.734,0-5.467,1.048-7.547,3.138l-15.576,15.552c-5.623-2.982-11.539-5.481-17.751-7.369v-21.958 c0-5.901-4.768-10.685-10.669-10.685H311.11c-2.594,0-4.877,1.04-6.739,2.578c3.26,11.895,5.046,24.793,5.046,38.552 c0,8.735-0.682,17.604-1.956,26.423c7.205-2.656,14.876-4.324,22.999-4.324c36.99,0,67.086,30.089,67.086,67.07 c0,23.637-12.345,44.353-30.872,56.303c13.48,14.784,24.195,32.324,31.168,51.976c1.148,0.396,2.344,0.684,3.54,0.684 c2.733,0,5.467-1.04,7.563-3.13l27.379-27.371c2.004-2.004,3.106-4.721,3.106-7.555s-1.102-5.551-3.106-7.563l-15.576-15.552 c2.982-5.621,5.497-11.555,7.393-17.75h21.957c2.826,0,5.575-1.118,7.563-3.138c2.004-1.996,3.138-4.72,3.138-7.555 L460.782,276.588z"
									></path>
									<path
										d="M376.038,413.906c-16.602-48.848-60.471-82.445-111.113-87.018c-16.958,17.958-37.954,29.351-61.731,29.351 c-23.759,0-44.771-11.392-61.713-29.351c-50.672,4.573-94.543,38.17-111.145,87.026l-9.177,27.013 c-2.625,7.773-1.368,16.338,3.416,23.007c4.783,6.671,12.486,10.631,20.685,10.631h315.853c8.215,0,15.918-3.96,20.702-10.631 c4.767-6.669,6.041-15.234,3.4-23.007L376.038,413.906z"
									></path>
									<path
										d="M120.842,206.782c0,60.589,36.883,125.603,82.352,125.603c45.487,0,82.368-65.014,82.368-125.603 C285.563,81.188,120.842,80.939,120.842,206.782z"
									></path>
								</svg>
								Admins and Staff
							</a>

							<a href="#privacy" class="nav-link" data-page="privacy">
								<svg fill="currentColor" viewBox="0 0 32 32">
									<path
										d="M24,12V9A9,9,0,0,0,6,9v3a3,3,0,0,0-3,3v1.18A3,3,0,0,0,1,19v6a3,3,0,0,0,2,2.82V29a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V15A3,3,0,0,0,24,12ZM8,9A7,7,0,0,1,22,9v3H20V9A5,5,0,0,0,10,9v3H8Zm4,3V9a3,3,0,0,1,6,0v3ZM3,19a1,1,0,0,1,2,0v6a1,1,0,0,1-2,0ZM25,29a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V27.82A3,3,0,0,0,7,25V19a3,3,0,0,0-2-2.82V15a1,1,0,0,1,1-1H24a1,1,0,0,1,1,1Z"
									></path>
									<path
										d="M15,19h2a1,1,0,0,0,0-2H16a1,1,0,0,0-2,0v.18A3,3,0,0,0,15,23a1,1,0,0,1,0,2H13a1,1,0,0,0,0,2h1a1,1,0,0,0,2,0v-.18A3,3,0,0,0,15,21a1,1,0,0,1,0-2Z"
									></path>
									<path d="M30,9H28a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"></path>
									<path d="M27,7a.93.93,0,0,0,.45-.11l2-1a1,1,0,1,0-.9-1.78l-2,1a1,1,0,0,0-.44,1.34A1,1,0,0,0,27,7Z"></path>
								</svg>
								Privacy
							</a>
						</div>
					</div>
				</div>

				<div class="main-container">
					<div id="main-content" class="content-wrapper">
					<div class="text-center" style="
    width: 100%;
    text-align: center;
    margin: auto;
">
<div class="loader"></div>
</div>
						<!-- content area -->
					</div>
				</div>
			</div>
			<div class="overlay-app"></div>
		</div>

		<!-- scripts -->

		<script
			src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
			integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
			crossorigin="anonymous"
		></script>
		<script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
		<script src="https://cdn.jsdelivr.net/npm/axios@1.7.7/dist/axios.min.js"></script>
		<script src="${app_base}/assets/js/app.js"></script>
	</body>
</html>
`;

async function not_found() {
	try {
		const notFoundResponse = await fetch(`${CDN_SRC}/src/404.html`);
		const notFoundBody = await notFoundResponse.text();
		return new Response(notFoundBody, {
			status: 404,
			headers: { 'Content-Type': 'text/html' },
		});
	} catch (err) {
		return new Response('Error loading the not found page: ' + err.message, {
			status: 500,
		});
	}
}

addEventListener('fetch', (event) => {
	event.respondWith(
		handleRequest(event.request, event).catch(
			(err) => new Response('Report this page when asked at the time of support... ==> ' + err.stack, { status: 500 })
		)
	);
});

async function getAuthToken() {
	const response = await fetch(`${BKS_URL}/checkout/token/grant`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			username: BKS_USER,
			password: BKS_PASS,
		},
		body: JSON.stringify({ app_key: BKS_KEY, app_secret: BKS_SEC }),
	});

	const data = await response.json();
	return data.statusCode === '0000' ? data.id_token : null;
}

async function handleCreatePayment(request) {
	const formData = await request.formData();
	const amount = formData.get('amount');
	const uid = formData.get('uid');
	const tid = formData.get('tid');

	const authToken = await getAuthToken();
	if (!authToken) {
		return new Response(JSON.stringify({ error: 'Failed to get auth token' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}

	const response = await fetch(`${BKS_URL}/checkout/create`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: authToken,
			'X-APP-Key': BKS_KEY,
		},
		body: JSON.stringify({
			mode: '0011',
			amount: amount,
			payerReference: uid || 'donation',
			callbackURL: `${APP_URL}/bkash/execute-payment?uid=${uid}&tid=${tid}`,
			currency: 'BDT',
			intent: 'sale',
			merchantInvoiceNumber: `CHIKA${amount}-${Math.random().toString(36).substring(7)}`,
		}),
	});

	const data = await response.json();
	console.log(data);
	if (data.statusCode === '0000') {
		return new Response(JSON.stringify({ bkashURL: data.bkashURL }), {
			headers: { 'Content-Type': 'application/json' },
		});
	} else {
		return new Response(JSON.stringify({ error: 'Failed to create payment' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}

async function handleExecutePayment(request) {
	const url = new URL(request.url);
	const paymentID = url.searchParams.get('paymentID');
	const status = url.searchParams.get('status');
	const uid = url.searchParams.get('uid');
	const tid = url.searchParams.get('tid');

	let responsePayload = { status: 'error', error: 'Unexpected payment status' };

	if (status === 'success') {
		const authToken = await getAuthToken();
		if (!authToken) {
			responsePayload = { status: 'error', error: 'Failed to get auth token' };
		} else {
			const response = await fetch(`${BKS_URL}/checkout/execute`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authToken,
					'X-APP-Key': BKS_KEY,
				},
				body: JSON.stringify({ paymentID: paymentID }),
			});

			const data = await response.json();
			console.log('1', data);
			if (data.statusCode === '0000' && data.transactionStatus == 'Completed') {
				const postData = {
					trxid: data.trxID,
					amount: data.amount,
				};

				try {
					const apiResponse = await fetch(`${BOT_API}/web/api/active/${tid}/${uid}`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${BOT_APIKEY}`,
						},
						body: JSON.stringify(postData),
					});

					const apiResult = await apiResponse.json();
					console.log('API Result:', apiResult);
					if (apiResponse.status == 'success') {
						responsePayload = {
							status: 'success',
							trxID: data.trxID,
							paymentID: data.paymentID,
							message: apiResult?.message,
						};
					} else {
						responsePayload = { status: 'error', error: apiResponse.message };
					}
				} catch (error) {
					console.error('Error making API request:', error);
					responsePayload = { status: 'error', error: 'Failed to make API request' };
				}
			} else {
				responsePayload = { status: 'error', error: data.errorMessage };
			}
		}
	} else if (status === 'cancel') {
		responsePayload = { status: 'cancel' };
	}

	// Return a script to the popup window that posts the response back to the main window and closes the popup
	return new Response(
		`
        <script>
            window.opener.postMessage(${JSON.stringify(responsePayload)}, '*');
            window.close();
        </script>
    `,
		{
			headers: { 'Content-Type': 'text/html' },
		}
	);
}
