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

const environment = 'local'; // This Variable Decides the environment of the app. 'production' or 'local'
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
import home from "./index.html";
import error_404 from "./404.html";

let app_base;
if (environment === 'production') {
	app_base = CDN_SRC;
} else if (environment === 'local') {
	app_base = 'http://127.0.0.1:5500';
}

async function handleRequest(request) {
	const url = new URL(request.url);
	const path = url.pathname;
	const fetchUrl = app_base + path;
	// Routing logic
	switch (true) {
		case path === '/':
			return new Response(home.replaceAll('{{app_base}}', app_base), {
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
					return new Response(error_404.replaceAll('{{app_base}}', app_base), {
						status: 200,
						headers: { 'Content-Type': 'text/html' },
					});
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
			return new Response(error_404.replaceAll('{{app_base}}', app_base), {
				status: 200,
				headers: { 'Content-Type': 'text/html' },
			});;
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
					const apiResponse = await fetch(`${BOT_API}/web/api/active/${uid}/${tid}`, {
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
