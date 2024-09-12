// This script was previously used to fully deploy the application from the backend. 
// However, it significantly impacted performance and increased server load. 
// To optimize speed and reduce server overhead, we transitioned to deploying the HTML page directly within the App JS, 
// allowing it to render swiftly on the frontend and enhance overall performance.

export const app = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <title>Chika Donation Portals</title>

  <link rel="icon" href="/assets/imgs/icon-192x192.png" type="image/png" />

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/assets/css/app.css" />
</head>

<body>
  <div class="video-bg">
    <video width="320" height="240" autoplay loop muted>
      <source src="./assets/imgs/7btrrd.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>

  <div id="toast-container" style="position: fixed; top: 20px; right: 20px; z-index: 9999;"></div>

  <div id="update-cache" class="update-icon">
    <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 420.827 420.827" xml:space="preserve">
      <g>
        <g>
          <path
            d="M210.29,0C156,0,104.43,20.693,65.077,58.269C25.859,95.715,2.794,146.022,0.134,199.921
			c-0.135,2.734,0.857,5.404,2.744,7.388c1.889,1.983,4.507,3.105,7.244,3.105h45.211c5.275,0,9.644-4.098,9.979-9.362
			c4.871-76.214,68.553-135.914,144.979-135.914c80.105,0,145.275,65.171,145.275,145.276c0,80.105-65.17,145.276-145.275,145.276
			c-18.109,0-35.772-3.287-52.501-9.771l17.366-15.425c2.686-2.354,3.912-5.964,3.217-9.468c-0.696-3.506-3.209-6.371-6.592-7.521
			l-113-32.552c-3.387-1.149-7.122-0.407-9.81,1.948c-2.686,2.354-3.913,5.963-3.218,9.467L69.71,403.157
			c0.696,3.505,3.209,6.372,6.591,7.521c3.383,1.147,7.122,0.408,9.81-1.946l18.599-16.298
			c31.946,18.574,68.456,28.394,105.581,28.394c116.021,0,210.414-94.392,210.414-210.414C420.705,94.391,326.312,0,210.29,0z" />
          <path d="M195.112,237.9h118.5c2.757,0,5-2.242,5-5v-30c0-2.757-2.243-5-5-5h-83.5v-91c0-2.757-2.243-5-5-5h-30
			c-2.757,0-5,2.243-5,5v126C190.112,235.658,192.355,237.9,195.112,237.9z" />
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
          <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" class="feather feather-bell">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
        </div> 

        <svg class="dark-light" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" fill="none"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>

        <img class="profile-img"
          src="https://images.unsplash.com/photo-1600353068440-6361ef3a86e8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
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
                <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
                  fill="currentColor"></path>
              </svg>
              Home
            </a>
            <a href="#about" class="nav-link" data-page="about">
              <svg viewBox="0 0 512 512" fill="currentColor">
                <path
                  d="M213.333333,3.55271368e-14 C331.154987,3.55271368e-14 426.666667,95.51168 426.666667,213.333333 C426.666667,331.153707 331.154987,426.666667 213.333333,426.666667 C95.51296,426.666667 3.55271368e-14,331.153707 3.55271368e-14,213.333333 C3.55271368e-14,95.51168 95.51296,3.55271368e-14 213.333333,3.55271368e-14 Z M234.713387,192 L192.04672,192 L192.04672,320 L234.713387,320 L234.713387,192 Z M213.55008,101.333333 C197.99616,101.333333 186.713387,112.5536 186.713387,127.704107 C186.713387,143.46752 197.698773,154.666667 213.55008,154.666667 C228.785067,154.666667 240.04672,143.46752 240.04672,128 C240.04672,112.5536 228.785067,101.333333 213.55008,101.333333 Z"
                  id="Shape"></path>
              </svg>
              About
            </a>

            <a href="#commands" class="nav-link" data-page="commands">
              <svg fill="currentColor" viewBox="0 0 30 30">
                <path
                  d="M22.005 0c-.194-.002-.372.105-.458.276l-2.197 4.38-4.92.7c-.413.06-.578.56-.278.846l3.805 3.407-.953 4.81c-.07.406.363.715.733.523L22 12.67l4.286 2.273c.37.19.8-.118.732-.522l-.942-4.81 3.77-3.408c.3-.286.136-.787-.278-.846l-4.916-.7-2.2-4.38C22.368.11 22.195.002 22.005 0zM22 1.615l1.863 3.71c.073.148.216.25.38.273l4.168.595-3.227 2.89c-.12.112-.173.276-.145.436l.813 4.08-3.616-1.927c-.147-.076-.322-.076-.47 0l-3.59 1.926.823-4.08c.028-.16-.027-.325-.145-.438l-3.262-2.89 4.166-.594c.165-.023.307-.125.38-.272zM16.5 18c-.822 0-1.5.678-1.5 1.5v9c0 .822.678 1.5 1.5 1.5h9c.822 0 1.5-.678 1.5-1.5v-9c0-.822-.678-1.5-1.5-1.5zm0 1h9c.286 0 .5.214.5.5v9c0 .286-.214.5-.5.5h-9c-.286 0-.5-.214-.5-.5v-9c0-.286.214-.5.5-.5zM1.5 3C.678 3 0 3.678 0 4.5v9c0 .822.678 1.5 1.5 1.5h9c.822 0 1.5-.678 1.5-1.5v-9c0-.822-.678-1.5-1.5-1.5zm0 1h9c.286 0 .5.214.5.5v9c0 .286-.214.5-.5.5h-9c-.286 0-.5-.214-.5-.5v-9c0-.286.214-.5.5-.5zm0 14c-.822 0-1.5.678-1.5 1.5v9c0 .822.678 1.5 1.5 1.5h9c.822 0 1.5-.678 1.5-1.5v-9c0-.822-.678-1.5-1.5-1.5zm0 1h9c.286 0 .5.214.5.5v9c0 .286-.214.5-.5.5h-9c-.286 0-.5-.214-.5-.5v-9c0-.286.214-.5.5-.5z">
                </path>
              </svg>
              commands
            </a>

            <a href="#invite" class="nav-link" data-page="invite">
              <svg fill="currentColor" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
                <g id="SVGRepo_iconCarrier">
                  <polygon
                    points="209.5,23.3 314.2,128 128,314.2 23.3,209.5 0,512 302.5,488.7 197.8,384 384,197.8 488.7,302.5 512,0 ">
                  </polygon>
                </g>
              </svg>
              Invite
            </a>

            <a href="#donate" class="nav-link" data-page="donate">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M16 6.27975C16 6.88118 15.7625 7.45883 15.3383 7.88611C14.3619 8.87007 13.415 9.89605 12.4021 10.8443C12.17 11.0585 11.8017 11.0507 11.5795 10.8268L8.6615 7.88611C7.7795 6.99725 7.7795 5.56225 8.6615 4.67339C9.55218 3.77579 11.0032 3.77579 11.8938 4.67339L11.9999 4.78027L12.1059 4.67345C12.533 4.24286 13.1146 4 13.7221 4C14.3297 4 14.9113 4.24284 15.3383 4.67339C15.7625 5.10073 16 5.67835 16 6.27975Z"
                  stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                <path
                  d="M18 20L21.8243 16.1757C21.9368 16.0632 22 15.9106 22 15.7515V10.5C22 9.67157 21.3284 9 20.5 9V9C19.6716 9 19 9.67157 19 10.5V15"
                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M18 16L18.8581 15.1419C18.949 15.051 19 14.9278 19 14.7994V14.7994C19 14.6159 18.8963 14.4482 18.7322 14.3661L18.2893 14.1447C17.5194 13.7597 16.5894 13.9106 15.9807 14.5193L15.0858 15.4142C14.7107 15.7893 14.5 16.298 14.5 16.8284V20"
                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M6 20L2.17574 16.1757C2.06321 16.0632 2 15.9106 2 15.7515V10.5C2 9.67157 2.67157 9 3.5 9V9C4.32843 9 5 9.67157 5 10.5V15"
                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                  d="M6 16L5.14187 15.1419C5.05103 15.051 5 14.9278 5 14.7994V14.7994C5 14.6159 5.10366 14.4482 5.26776 14.3661L5.71067 14.1447C6.48064 13.7597 7.41059 13.9106 8.01931 14.5193L8.91421 15.4142C9.28929 15.7893 9.5 16.298 9.5 16.8284V20"
                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              donate
            </a>

            <a href="#supporter" class="nav-link" data-page="supporter">
              <svg viewBox="0 0 28 28" fill="currentColor">
                <path
                  d="M17.7540247,11 C18.720523,11 19.5040247,11.7835017 19.5040247,12.75 L19.5040247,19.4989513 C19.5040247,22.5370966 17.0411213,25 14.002976,25 C10.9648308,25 8.50192738,22.5370966 8.50192738,19.4989513 L8.50192738,12.75 C8.50192738,11.7835017 9.28542907,11 10.2519274,11 L17.7540247,11 Z M3.75,11 L8.13210827,10.9980646 C7.78221386,11.420954 7.55643325,11.9502867 7.51057947,12.5302496 L7.50192738,12.75 L7.50192738,19.4989513 C7.50192738,20.6323434 7.79196393,21.6979939 8.30186513,22.6257307 C7.75085328,22.8662539 7.14166566,23 6.50123996,23 C4.01527377,23 2,20.9847262 2,18.49876 L2,12.75 C2,11.7835017 2.78350169,11 3.75,11 Z M19.8738438,10.9980646 L24.25,11 C25.2164983,11 26,11.7835017 26,12.75 L26,18.5 C26,20.9852814 23.9852814,23 21.5,23 C20.8609276,23 20.2529701,22.8667819 19.7023824,22.6266008 L19.7581025,22.5253735 C20.1867892,21.7118524 20.4480368,20.7963864 20.4959995,19.8248213 L20.5040247,19.4989513 L20.5040247,12.75 C20.5040247,12.084283 20.267475,11.4738152 19.8738438,10.9980646 Z M14,3 C15.9329966,3 17.5,4.56700338 17.5,6.5 C17.5,8.43299662 15.9329966,10 14,10 C12.0670034,10 10.5,8.43299662 10.5,6.5 C10.5,4.56700338 12.0670034,3 14,3 Z M22.0029842,4 C23.6598384,4 25.0029842,5.34314575 25.0029842,7 C25.0029842,8.65685425 23.6598384,10 22.0029842,10 C20.3461299,10 19.0029842,8.65685425 19.0029842,7 C19.0029842,5.34314575 20.3461299,4 22.0029842,4 Z M5.99701582,4 C7.65387007,4 8.99701582,5.34314575 8.99701582,7 C8.99701582,8.65685425 7.65387007,10 5.99701582,10 C4.34016157,10 2.99701582,8.65685425 2.99701582,7 C2.99701582,5.34314575 4.34016157,4 5.99701582,4 Z"
                  id="🎨-Color"></path>
              </svg>
              Our Supporter
            </a>

            <a href="#admins" class="nav-link" data-page="admins">
              <svg fill="currentColor" viewBox="0 0 474.565 474.565" xml:space="preserve">
                <path
                  d="M255.204,102.3c-0.606-11.321-12.176-9.395-23.465-9.395C240.078,95.126,247.967,98.216,255.204,102.3z">
                </path>
                <path
                  d="M134.524,73.928c-43.825,0-63.997,55.471-28.963,83.37c11.943-31.89,35.718-54.788,66.886-63.826 C163.921,81.685,150.146,73.928,134.524,73.928z">
                </path>
                <path
                  d="M43.987,148.617c1.786,5.731,4.1,11.229,6.849,16.438L36.44,179.459c-3.866,3.866-3.866,10.141,0,14.015l25.375,25.383 c1.848,1.848,4.38,2.888,7.019,2.888c2.61,0,5.125-1.04,7.005-2.888l14.38-14.404c2.158,1.142,4.55,1.842,6.785,2.827 c0-0.164-0.016-0.334-0.016-0.498c0-11.771,1.352-22.875,3.759-33.302c-17.362-11.174-28.947-30.57-28.947-52.715 c0-34.592,28.139-62.739,62.723-62.739c23.418,0,43.637,13.037,54.43,32.084c11.523-1.429,22.347-1.429,35.376,1.033 c-1.676-5.07-3.648-10.032-6.118-14.683l14.396-14.411c1.878-1.856,2.918-4.38,2.918-7.004c0-2.625-1.04-5.148-2.918-7.004 l-25.361-25.367c-1.94-1.941-4.472-2.904-7.003-2.904c-2.532,0-5.063,0.963-6.989,2.904l-14.442,14.411 c-5.217-2.764-10.699-5.078-16.444-6.825V9.9c0-5.466-4.411-9.9-9.893-9.9h-35.888c-5.451,0-9.909,4.434-9.909,9.9v20.359 c-5.73,1.747-11.213,4.061-16.446,6.825L75.839,22.689c-1.942-1.941-4.473-2.904-7.005-2.904c-2.531,0-5.077,0.963-7.003,2.896 L36.44,48.048c-1.848,1.864-2.888,4.379-2.888,7.012c0,2.632,1.04,5.148,2.888,7.004l14.396,14.403 c-2.75,5.218-5.063,10.708-6.817,16.438H23.675c-5.482,0-9.909,4.441-9.909,9.915v35.889c0,5.458,4.427,9.908,9.909,9.908H43.987z">
                </path>
                <path
                  d="M354.871,340.654c15.872-8.705,26.773-25.367,26.773-44.703c0-28.217-22.967-51.168-51.184-51.168 c-9.923,0-19.118,2.966-26.975,7.873c-4.705,18.728-12.113,36.642-21.803,52.202C309.152,310.022,334.357,322.531,354.871,340.654z ">
                </path>
                <path
                  d="M460.782,276.588c0-5.909-4.799-10.693-10.685-10.693H428.14c-1.896-6.189-4.411-12.121-7.393-17.75l15.544-15.544 c2.02-2.004,3.137-4.721,3.137-7.555c0-2.835-1.118-5.553-3.137-7.563l-27.363-27.371c-2.08-2.09-4.829-3.138-7.561-3.138 c-2.734,0-5.467,1.048-7.547,3.138l-15.576,15.552c-5.623-2.982-11.539-5.481-17.751-7.369v-21.958 c0-5.901-4.768-10.685-10.669-10.685H311.11c-2.594,0-4.877,1.04-6.739,2.578c3.26,11.895,5.046,24.793,5.046,38.552 c0,8.735-0.682,17.604-1.956,26.423c7.205-2.656,14.876-4.324,22.999-4.324c36.99,0,67.086,30.089,67.086,67.07 c0,23.637-12.345,44.353-30.872,56.303c13.48,14.784,24.195,32.324,31.168,51.976c1.148,0.396,2.344,0.684,3.54,0.684 c2.733,0,5.467-1.04,7.563-3.13l27.379-27.371c2.004-2.004,3.106-4.721,3.106-7.555s-1.102-5.551-3.106-7.563l-15.576-15.552 c2.982-5.621,5.497-11.555,7.393-17.75h21.957c2.826,0,5.575-1.118,7.563-3.138c2.004-1.996,3.138-4.72,3.138-7.555 L460.782,276.588z">
                </path>
                <path
                  d="M376.038,413.906c-16.602-48.848-60.471-82.445-111.113-87.018c-16.958,17.958-37.954,29.351-61.731,29.351 c-23.759,0-44.771-11.392-61.713-29.351c-50.672,4.573-94.543,38.17-111.145,87.026l-9.177,27.013 c-2.625,7.773-1.368,16.338,3.416,23.007c4.783,6.671,12.486,10.631,20.685,10.631h315.853c8.215,0,15.918-3.96,20.702-10.631 c4.767-6.669,6.041-15.234,3.4-23.007L376.038,413.906z">
                </path>
                <path
                  d="M120.842,206.782c0,60.589,36.883,125.603,82.352,125.603c45.487,0,82.368-65.014,82.368-125.603 C285.563,81.188,120.842,80.939,120.842,206.782z">
                </path>
              </svg>
              Admins and Staff
            </a>

            <a href="#privacy" class="nav-link" data-page="privacy">
              <svg fill="currentColor" viewBox="0 0 32 32">
                <path
                  d="M24,12V9A9,9,0,0,0,6,9v3a3,3,0,0,0-3,3v1.18A3,3,0,0,0,1,19v6a3,3,0,0,0,2,2.82V29a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V15A3,3,0,0,0,24,12ZM8,9A7,7,0,0,1,22,9v3H20V9A5,5,0,0,0,10,9v3H8Zm4,3V9a3,3,0,0,1,6,0v3ZM3,19a1,1,0,0,1,2,0v6a1,1,0,0,1-2,0ZM25,29a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V27.82A3,3,0,0,0,7,25V19a3,3,0,0,0-2-2.82V15a1,1,0,0,1,1-1H24a1,1,0,0,1,1,1Z">
                </path>
                <path
                  d="M15,19h2a1,1,0,0,0,0-2H16a1,1,0,0,0-2,0v.18A3,3,0,0,0,15,23a1,1,0,0,1,0,2H13a1,1,0,0,0,0,2h1a1,1,0,0,0,2,0v-.18A3,3,0,0,0,15,21a1,1,0,0,1,0-2Z">
                </path>
                <path d="M30,9H28a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"></path>
                <path d="M27,7a.93.93,0,0,0,.45-.11l2-1a1,1,0,1,0-.9-1.78l-2,1a1,1,0,0,0-.44,1.34A1,1,0,0,0,27,7Z">
                </path>
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

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios@1.7.7/dist/axios.min.js"></script>
  <script src="/assets/js/app.js"></script>
  
</body>

</html>
`;

export const not_found = `404`;

export const home = `
  <div class="container pb-9 mt-5">
  <div class="card mb-5">
    <div
      class="card-header hover-actions-trigger d-flex justify-content-center align-items-end position-relative mb-7"
      style="min-height: 250px; background-image: url(/assets/imgs/chika-c.jpg)"
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
              src="/assets/imgs/chika.jpg"
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
            <h2 class="me-2">Chika Fujiwara</h2>
            <span class="m-2">Your favorite Waifu bot</span>
          </div>
          <hr />
          <br />
          <p class="text-center">
            ✨ Konichiwa, Masters of the Digital Manor! ✨
          </p>
          <p class="text-center">
            🌸 I am Chika Fujiwara, your delightful waifu maid at your service!
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

export const about = `
  <div class="content-section">
  <div class="content-section-title">Apps in your plan</div>
  <div class="apps-card">
    <div class="app-card">
      <span>
        <svg viewBox="0 0 512 512" style="border: 1px solid #a059a9">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M480 0H32C14.368 0 0 14.368 0 32v448c0 17.664 14.368 32 32 32h448c17.664 0 32-14.336 32-32V32c0-17.632-14.336-32-32-32z"
            fill="#210027"
            data-original="#7b1fa2"
          />
          <g xmlns="http://www.w3.org/2000/svg">
            <path
              d="M192 64h-80c-8.832 0-16 7.168-16 16v352c0 8.832 7.168 16 16 16s16-7.168 16-16V256h64c52.928 0 96-43.072 96-96s-43.072-96-96-96zm0 160h-64V96h64c35.296 0 64 28.704 64 64s-28.704 64-64 64zM400 256h-32c-18.08 0-34.592 6.24-48 16.384V272c0-8.864-7.168-16-16-16s-16 7.136-16 16v160c0 8.832 7.168 16 16 16s16-7.168 16-16v-96c0-26.464 21.536-48 48-48h32c8.832 0 16-7.168 16-16s-7.168-16-16-16z"
              fill="#f6e7fa"
              data-original="#e1bee7"
            />
          </g>
        </svg>
        Premiere Pro
      </span>
      <div class="app-card__subtext">
        Edit, master and create fully proffesional videos
      </div>
      <div class="app-card-buttons">
        <button class="content-button status-button">Update</button>
        <div class="menu"></div>
      </div>
    </div>

    <div class="app-card">
      <span>
        <svg viewBox="0 0 512 512" style="border: 1px solid #a059a9">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M480 0H32C14.368 0 0 14.368 0 32v448c0 17.664 14.368 32 32 32h448c17.664 0 32-14.336 32-32V32c0-17.632-14.336-32-32-32z"
            fill="#210027"
            data-original="#7b1fa2"
          />
          <g xmlns="http://www.w3.org/2000/svg">
            <path
              d="M192 64h-80c-8.832 0-16 7.168-16 16v352c0 8.832 7.168 16 16 16s16-7.168 16-16V256h64c52.928 0 96-43.072 96-96s-43.072-96-96-96zm0 160h-64V96h64c35.296 0 64 28.704 64 64s-28.704 64-64 64zM400 256h-32c-18.08 0-34.592 6.24-48 16.384V272c0-8.864-7.168-16-16-16s-16 7.136-16 16v160c0 8.832 7.168 16 16 16s16-7.168 16-16v-96c0-26.464 21.536-48 48-48h32c8.832 0 16-7.168 16-16s-7.168-16-16-16z"
              fill="#f6e7fa"
              data-original="#e1bee7"
            />
          </g>
        </svg>
        Premiere Pro
      </span>
      <div class="app-card__subtext">
        Edit, master and create fully proffesional videos
      </div>
      <div class="app-card-buttons">
        <button class="content-button status-button">Update</button>
        <div class="menu"></div>
      </div>
    </div>

    <div class="app-card">
      <span>
        <svg viewBox="0 0 512 512" style="border: 1px solid #a059a9">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M480 0H32C14.368 0 0 14.368 0 32v448c0 17.664 14.368 32 32 32h448c17.664 0 32-14.336 32-32V32c0-17.632-14.336-32-32-32z"
            fill="#210027"
            data-original="#7b1fa2"
          />
          <g xmlns="http://www.w3.org/2000/svg">
            <path
              d="M192 64h-80c-8.832 0-16 7.168-16 16v352c0 8.832 7.168 16 16 16s16-7.168 16-16V256h64c52.928 0 96-43.072 96-96s-43.072-96-96-96zm0 160h-64V96h64c35.296 0 64 28.704 64 64s-28.704 64-64 64zM400 256h-32c-18.08 0-34.592 6.24-48 16.384V272c0-8.864-7.168-16-16-16s-16 7.136-16 16v160c0 8.832 7.168 16 16 16s16-7.168 16-16v-96c0-26.464 21.536-48 48-48h32c8.832 0 16-7.168 16-16s-7.168-16-16-16z"
              fill="#f6e7fa"
              data-original="#e1bee7"
            />
          </g>
        </svg>
        Premiere Pro
      </span>
      <div class="app-card__subtext">
        Edit, master and create fully proffesional videos
      </div>
      <div class="app-card-buttons">
        <button class="content-button status-button">Update</button>
        <div class="menu"></div>
      </div>
    </div>

    <div class="app-card">
      <span>
        <svg viewBox="0 0 512 512" style="border: 1px solid #a059a9">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M480 0H32C14.368 0 0 14.368 0 32v448c0 17.664 14.368 32 32 32h448c17.664 0 32-14.336 32-32V32c0-17.632-14.336-32-32-32z"
            fill="#210027"
            data-original="#7b1fa2"
          />
          <g xmlns="http://www.w3.org/2000/svg">
            <path
              d="M192 64h-80c-8.832 0-16 7.168-16 16v352c0 8.832 7.168 16 16 16s16-7.168 16-16V256h64c52.928 0 96-43.072 96-96s-43.072-96-96-96zm0 160h-64V96h64c35.296 0 64 28.704 64 64s-28.704 64-64 64zM400 256h-32c-18.08 0-34.592 6.24-48 16.384V272c0-8.864-7.168-16-16-16s-16 7.136-16 16v160c0 8.832 7.168 16 16 16s16-7.168 16-16v-96c0-26.464 21.536-48 48-48h32c8.832 0 16-7.168 16-16s-7.168-16-16-16z"
              fill="#f6e7fa"
              data-original="#e1bee7"
            />
          </g>
        </svg>
        Premiere Pro
      </span>
      <div class="app-card__subtext">
        Edit, master and create fully proffesional videos
      </div>
      <div class="app-card-buttons">
        <button class="content-button status-button">Update</button>
        <div class="menu"></div>
      </div>
    </div>

    <div class="app-card">
      <span>
        <svg viewBox="0 0 512 512" style="border: 1px solid #a059a9">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M480 0H32C14.368 0 0 14.368 0 32v448c0 17.664 14.368 32 32 32h448c17.664 0 32-14.336 32-32V32c0-17.632-14.336-32-32-32z"
            fill="#210027"
            data-original="#7b1fa2"
          />
          <g xmlns="http://www.w3.org/2000/svg">
            <path
              d="M192 64h-80c-8.832 0-16 7.168-16 16v352c0 8.832 7.168 16 16 16s16-7.168 16-16V256h64c52.928 0 96-43.072 96-96s-43.072-96-96-96zm0 160h-64V96h64c35.296 0 64 28.704 64 64s-28.704 64-64 64zM400 256h-32c-18.08 0-34.592 6.24-48 16.384V272c0-8.864-7.168-16-16-16s-16 7.136-16 16v160c0 8.832 7.168 16 16 16s16-7.168 16-16v-96c0-26.464 21.536-48 48-48h32c8.832 0 16-7.168 16-16s-7.168-16-16-16z"
              fill="#f6e7fa"
              data-original="#e1bee7"
            />
          </g>
        </svg>
        Premiere Pro
      </span>
      <div class="app-card__subtext">
        Edit, master and create fully proffesional videos
      </div>
      <div class="app-card-buttons">
        <button class="content-button status-button">Update</button>
        <div class="menu"></div>
      </div>
    </div>

    <div class="app-card">
      <span>
        <svg viewBox="0 0 512 512" style="border: 1px solid #a059a9">
          <path
            xmlns="http://www.w3.org/2000/svg"
            d="M480 0H32C14.368 0 0 14.368 0 32v448c0 17.664 14.368 32 32 32h448c17.664 0 32-14.336 32-32V32c0-17.632-14.336-32-32-32z"
            fill="#210027"
            data-original="#7b1fa2"
          />
          <g xmlns="http://www.w3.org/2000/svg">
            <path
              d="M192 64h-80c-8.832 0-16 7.168-16 16v352c0 8.832 7.168 16 16 16s16-7.168 16-16V256h64c52.928 0 96-43.072 96-96s-43.072-96-96-96zm0 160h-64V96h64c35.296 0 64 28.704 64 64s-28.704 64-64 64zM400 256h-32c-18.08 0-34.592 6.24-48 16.384V272c0-8.864-7.168-16-16-16s-16 7.136-16 16v160c0 8.832 7.168 16 16 16s16-7.168 16-16v-96c0-26.464 21.536-48 48-48h32c8.832 0 16-7.168 16-16s-7.168-16-16-16z"
              fill="#f6e7fa"
              data-original="#e1bee7"
            />
          </g>
        </svg>
        Premiere Pro
      </span>
      <div class="app-card__subtext">
        Edit, master and create fully proffesional videos
      </div>
      <div class="app-card-buttons">
        <button class="content-button status-button">Update</button>
        <div class="menu"></div>
      </div>
    </div>
  </div>
</div>
  `;

// export const donate = `
//   <div class="loader"></div>

// <div class="content-section">
//   <h2 class="text-center mb-4">Donation Packages and Benefits</h2>
//   <h4 class="text-center mb-4">please choose one that you preper.</h4>

//   <div class="apps-card">
//     <div class="app-card">
//       <div class="package-card">
//         <div class="d-flex align-items-center text-end position-relative">
//           <span class="badge badge-tier">Tier 1</span>
//           <br />
//           <span class="mt-3">
//             <span class="package-icon mr-3">🌟</span>
//             <div class="">Chika's Cheerful Support <br />- $50</div>
//           </span>
//         </div>
//         <div class="app-card__subtext">
//           Support Chika’s adventures with a cheerful donation! Every
//           contribution helps keep the fun going. Thank you for being part of
//           Chika’s fan club!
//         </div>
//         <ul class="package-benefits">
//           <li>✅ A special thank-you message from Chika.</li>
//           <li>✅ Your name featured in a supporter list.</li>
//           <li>
//             ✅ No feature unlocks, but your support is greatly appreciated!
//           </li>
//         </ul>
//         <div class="app-card-buttons">
//           <button class="content-button status-button">Donate</button>
//         </div>
//       </div>
//     </div>

//     <div class="app-card">
//       <div class="package-card">
//         <div class="d-flex align-items-center text-end position-relative">
//           <span class="badge badge-tier">Tier 2</span>
//           <br />
//           <span class="mt-3">
//             <span class="package-icon mr-3">🎯</span>
//             <div class="">Chika's Secret Plan <br />- $100</div>
//           </span>
//         </div>
//         <div class="app-card__subtext">
//           Unlock Chika's secret plan and enjoy exclusive perks! Your support
//           keeps Chika's antics alive and kicking!
//         </div>
//         <ul class="package-benefits">
//           <li>
//             ✅ Activate a single group chat (GC) with the bot for 1 month.
//           </li>
//           <li>✅ Priority access to bot updates and announcements.</li>
//           <li>
//             ✅ Special badge in the bot's friend list indicating your support
//             level.
//           </li>
//         </ul>
//         <div class="app-card-buttons">
//           <button class="content-button status-button">Donate</button>
//         </div>
//       </div>
//     </div>

//     <div class="app-card">
//       <div class="package-card">
//         <div class="d-flex align-items-center text-end position-relative">
//           <span class="badge badge-tier">Tier 3</span>
//           <br />
//           <span class="mt-3">
//             <span class="package-icon mr-3">🎯</span>
//             <div class="">Chika's Supreme Strategy <br />- $200</div>
//           </span>
//         </div>
//         <div class="app-card__subtext">
//           Boost Chika's supreme strategy and double the fun! Your generosity
//           keeps Chika charming groups everywhere!
//         </div>
//         <ul class="package-benefits">
//           <li>✅ Activate a group chat with the bot for 2 months.</li>
//           <li>✅ Priority access to new features as they roll out.</li>
//           <li>✅ Special supporter badge in the bot's friend list.</li>
//           <li>✅ Personalized thank-you video message from Chika.</li>
//         </ul>
//         <div class="app-card-buttons">
//           <button class="content-button status-button">Donate</button>
//         </div>
//       </div>
//     </div>

//     <div class="app-card">
//       <div class="package-card">
//         <div class="d-flex align-items-center text-end position-relative">
//           <span class="badge badge-tier">Tier 4</span>
//           <br />
//           <span class="mt-3">
//             <span class="package-icon mr-3">👑</span>
//             <div class="">VIP: Chika's Elite Fan <br />- $500</div>
//           </span>
//         </div>
//         <div class="app-card__subtext">
//           You’ve reached the VIP Three Star level! Enjoy exclusive access and
//           perks reserved for Chika's most dedicated fans.
//         </div>
//         <ul class="package-benefits">
//           <li>✅ Activate a group chat with the bot for 6 months.</li>
//           <li>✅ VIP status: Access to private chats with the bot.</li>
//           <li>✅ Live support and priority responses to queries.</li>
//           <li>
//             ✅ Ability to submit feature requests and influence bot updates.
//           </li>
//           <li>✅ 2x EXP boost and faster level-ups (2x speed).</li>
//           <li>
//             ✅ Use the bot in any group or place, even if not currently active.
//           </li>
//           <li>
//             ✅ Special recognition in bot communications as a VIP supporter.
//           </li>
//         </ul>
//         <div class="app-card-buttons">
//           <button class="content-button status-button">Donate</button>
//         </div>
//       </div>
//     </div>

//     <div class="app-card">
//       <div class="package-card">
//         <div class="d-flex align-items-center text-end position-relative">
//           <span class="badge badge-tier">Tier 4</span>
//           <br />
//           <span class="mt-3">
//             <span class="package-icon mr-3">🏆</span>
//             <div class="">Legendary: Chika's Ultimate Patron <br />- $1000</div>
//           </span>
//         </div>
//         <div class="app-card__subtext">
//           Become a Legendary Tier VIP Five Star supporter and join Chika’s inner
//           circle! Your unparalleled support makes you a true hero of the waifu
//           world!
//         </div>
//         <ul class="package-benefits">
//           <li>✅ All benefits from the VIP Three Star package.</li>
//           <li>✅ 3x EXP boost and even faster level-ups (3x speed).</li>
//           <li>
//             ✅ Exclusive “Legendary Patron” badge in the bot's friend list.
//           </li>
//           <li>✅ Access to a private friends list feature with Chika.</li>
//           <li>
//             ✅ Direct influence on bot features and priority in feature
//             rollouts.
//           </li>
//           <li>✅ Personalized video shoutout from Chika, tailored to you.</li>
//           <li>
//             ✅ Extra perks such as early access to new bot capabilities, special
//             event invites, and more customizable bot interactions.
//           </li>
//           <li>
//             ✅ Option to have Chika bot join and assist in your group events as
//             a guest.
//           </li>
//         </ul>
//         <div class="app-card-buttons">
//           <button class="content-button status-button">Donate</button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
//   `;

export const donate = `
<div class="container-fluid">
	<div class="loader"></div>
	<div class="row">
		<div class="col-lg-8 col-md-7">
			<!-- <h1 class="text-center  mb-4">Donation Packages and Benefits</h1> -->
			<!-- <p class="text-center mb-4">Please choose the package you prefer.</p> -->
			<div id="packageContainer" class="row row-cols-1 row-cols-sm-2 g-3 pe-3">
				<!-- Packages will be dynamically inserted here -->
			</div>
		</div>
		<div class="col-lg-4 col-md-5">
			<div id="subscriptionForm" class="p-4 mt-3">
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

export const privacy = `
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

export const supporter = `
 <div class="container py-5">
    <h2 class="text-center mb-4">Our Awesome Supporters</h2>
    <p class="text-center mb-4">
      A heartfelt thank you from the admin team to all our amazing supporters. Your contributions and support keep this project alive and thriving. We couldn't do it without you!
    </p>
    <div id="supporters-container" class="row">
        <!-- Supporter cards will be dynamically inserted here -->
    </div>
</div>
  `;

export const test = `
  <div class="centered-form">
    <!-- User Input Step -->
    <div id="user-input-step" class="text-center">
        <input id="uid-input" type="text" class="form-control mb-3" placeholder="Enter user ID"
            style="max-width: 300px; margin: 0 auto;">
        <button id="uid-submit" class="btn btn-primary">Submit</button>
        <div id="user-error" class="text-danger mt-2" style="display: none;">User not found or invalid UID.</div>
    </div>

    <!-- Group Input Step -->
    <div id="group-input-step" class="text-center" style="display: none;">
        <input id="tid-input" type="text" class="form-control mb-3" placeholder="Enter group ID"
            style="max-width: 300px; margin: 0 auto;">
        <button id="tid-submit" class="btn btn-primary">Submit</button>
        <div id="group-error" class="text-danger mt-2" style="display: none;">Group not found or invalid TID.</div>
    </div>

    <!-- Display User and Group Data -->
    <div id="fetched-data" style="display: none;"></div>

    <!-- Proceed with Donation -->
    <button id="proceed-donation" class="btn btn-success mt-4" style="display: none;">Proceed with Donation</button>

    <!-- Loader -->
    <div class="loader"></div>
</div>
`;

export const admins = `
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