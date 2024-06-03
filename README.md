# Passkey Tutorial: Node.js (Express), JavaScript, MySQL & SimpleWebAuthn

## Introduction

Welcome to repository of the [Passkey Tutorial](https://www.corbado.com/blog/passkey-tutorial-how-to-implement-passkeys)! This [tutorial](https://www.corbado.com/blog/passkey-tutorial-how-to-implement-passkeys) showcases **how to implement passkeys in a simple web app**, thus offering a more secure alternative to traditional passwords. By the end of this tutorial, you will have implemented an **end-to-end passkey** authentication system **without relying on third-party passkey authentication providers**.

## Prerequisites
In the tutorial, we use the following tools and technologies, so having some basic knowledge in these areas is helpful:

- **Node.js (Express)**: Utilizes TypeScript for robust backend development with the Express framework.
- **Vanilla HTML & JavaScript/TypeScript**: Implements a straightforward and effective frontend.
- **MySQL**: Manages user data and passkey credentials securely.
- **SimpleWebAuthn**: Handles WebAuthn operations for registration and authentication.

## Features

In this passkey tutorial project, we implement the two basic WebAuthn / passkey cereomonies to sign-up / register and log in / authenticate with a passkey.

### Passkey Sign-Up
The passkey sign-up enables users to create new accounts and generate passkeys. Here is the corresponding passkey register flow chart:
![Passkey Sign-Up Flow Chart](https://github.com/corbado/passkey-tutorial/assets/18458907/01a471f5-59d3-4902-9e32-c5dc68695885)


### Passkey Login
The passkey login facilitates a secure login using the created passkeys. Here is the corresponding passkey login flow chart:
![Passkey Login Flow Chart](https://github.com/corbado/passkey-tutorial/assets/18458907/daa92c7c-b528-42b0-9912-8df1b3847a95)


## How to Use

### Step 1: Clone the Repository

Clone the repository to your local machine:

```sh
git clone https://github.com/corbado/passkeys-tutorial

```

### Step 2: Run the Project

Start the project using Docker:

```sh
docker compose up -d
```

## License

This project is licensed under the MIT License.

## Support & Feedback

### Report an issue

If you encounter any bugs or have suggestions, please [open an issue](https://github.com/corbado/passkey-tutorial/issues/new).

### Slack channel

Join our Slack channel to discuss questions or ideas with the Corbado team and other developers.

[![Slack](https://img.shields.io/badge/slack-join%20chat-brightgreen.svg)](https://join.slack.com/t/corbado/shared_invite/zt-2g4etyvxi-otKksMmhMHwWK19aCbhODQ)

### Email

You can also reach out to us via email at vincent.delitz@corbado.com.


