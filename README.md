# CHIKA DONATION PORTAL

<p align="center">
  <img src="./assets/previews/preview-1.png" alt="CHIKA DONATION PORTAL Preview" width="500"/>
</p>
<p align="center">
  <img src="./assets/previews/preview-2.png" alt="CHIKA DONATION PORTAL Preview" width="200"/>
  <img src="./assets/previews/preview-3.png" alt="CHIKA DONATION PORTAL Preview" width="200"/>
</p>

CHIKA DONATION PORTAL is a single-page web application designed to facilitate donations for the CHIKA Discord bot project. This portal provides an easy-to-use interface for supporters to contribute to the bot's development and maintenance.

## Features

- 🌟 Single-page application built with HTML, CSS, and JavaScript
- 💼 Cloudflare Workers integration for serverless deployment
- 💰 bKash payment gateway integration for secure transactions
- 📊 Dynamic package selection and user information display
- 👥 Admin and supporter showcase sections
- 🌙 Dark mode toggle for user preference
- 📱 Responsive design for various device sizes

## Technologies Used

- HTML5
- CSS3 (with Bootstrap for styling)
- JavaScript (ES6+)
- jQuery for DOM manipulation
- Cloudflare Workers for serverless functions
- bKash Payment Gateway API

## Setup and Installation

1. Clone the repository: 
```
git clone https://github.com/tas33n/chika-donation-portal.git
```
2. Navigate to the project directory:
```
cd chika-donation-portal
```
3. Install dependencies (if any):
```
npm install
```


4. Configure your Cloudflare Worker:
- Copy the contents of `worker.js` to your Cloudflare Worker
- Set up the necessary environment variables in your Cloudflare Worker settings

5. Set up bKash Payment Gateway:
- Obtain API credentials from bKash
- Update the bKash configuration in the worker script

6. Deploy the worker to Cloudflare

7. Update the `CDN_BASE` variable in `app.js` to point to your deployed assets

## Usage

After deployment, users can access the donation portal through the Cloudflare Worker's URL. They can:

1. Browse donation packages
2. Select a package and enter their user and thread IDs
3. Complete the donation process using bKash
4. View a thank you message and transaction details upon successful donation

## Contributing

We welcome contributions to the CHIKA DONATION PORTAL project! If you'd like to contribute, please:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to your branch
5. Create a pull request

Please ensure your code adheres to the existing style and includes appropriate comments.

## License

This project is open-source and available under the [MIT License](LICENSE).

## Acknowledgements

- Thanks to the bKash team for providing the payment gateway integration
- Cloudflare for their excellent Workers platform
- All contributors and supporters of the CHIKA bot project

## Contact

For any queries or support, please contact:
- GitHub: [@tas33n](https://github.com/tas33n)
- Email: [farhanisteak84@gmail.com](mailto:farhanisteak84@gmail.com)

---

Made with ❤️ by [@Tas33n](https://github.com/tas33n)