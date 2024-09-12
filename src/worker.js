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
const APP_URL = 'http://127.0.0.1:8787'; //needed for callbacks of bks

const BOT_API = 'http://localhost:3001';
const BOT_APIKEY = '123456789';
// https://touka0x11-a0fc068a4b01.herokuapp.com

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
} else if (environment === 'development') {
	app_base = '/';
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
					return new Response(not_found, { status: 404, headers: { 'Content-Type': 'text/html' } });
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
			return new Response(not_found, {
				status: 200,
				headers: { 'Content-Type': 'text/html' },
			});
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
				'Authorization': `Bearer ${BOT_APIKEY}`
			},
			timeout: 60000
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
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />

		<title>Chika Donation Portals</title>

		<link rel="icon" href="/assets/imgs/icon-192x192.png" type="image/png" />

		<link
			rel="stylesheet"
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
			integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
			crossorigin="anonymous"
		/>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css" />
		<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="/assets/css/app.css" />
	</head>

	<body>
		<div class="video-bg">
			<video width="320" height="240" autoplay loop muted>
				<source src="./assets/imgs/7btrrd.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>

		<div id="toast-container" style="position: fixed; top: 20px; right: 20px; z-index: 9999"></div>

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
					<div class="notification">
						<span class="notification-number">3</span>
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

					<img
						class="profile-img"
						src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
						alt=""
					/>
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
		<script src="/assets/js/app.js"></script>
	</body>
</html>
`;

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
			console.log(data);
			if (data.statusCode === '0000') {
				let chekPayment = await verifyPayment(paymentID);
				console.log(chekPayment);
				if (!chekPayment.statusCode === '0000') {
					return (responsePayload = { status: 'error', error: 'Failed to verify payment' });
				}

				const { payerReference, trxID, transactionStatus, amount, merchantInvoiceNumber } = chekPayment;

				const postData = {
					trxid: trxID,
					amount: amount,
				};

				try {
					const apiResponse = await fetch(`${BOT_API}/web/api/active/${tid}/${uid}`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${BOT_APIKEY}`
						},
						body: JSON.stringify(postData),
					});

					const apiResult = await apiResponse.json();
					console.log('API Result:', apiResult);

					responsePayload = {
						status: 'success',
						trxID: trxID,
						paymentID: data.paymentID,
						message: apiResult?.message,
					};
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

async function verifyPayment(paymentID) {
	const authToken = await getAuthToken();
	if (!authToken) {
		responsePayload = { status: 'error', error: 'Failed to get auth token' };
	} else {
		const response = await fetch(`${BKS_URL}/checkout/payment/status`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authToken,
				'X-APP-Key': BKS_KEY,
			},
			body: JSON.stringify({ paymentID: paymentID }),
		});

		const data = await response.json();
		return data;
	}
}
