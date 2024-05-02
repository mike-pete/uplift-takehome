# Uplift Interview

Welcome!

## Intro

This repository contains the Uplift coding challenge.
We believe in letting you work as freely as you want within the constraints of the project. Our goals are to assess:

- your ability to follow specs/requirement docs, making pragmatic decisions along the way
- your level of expertise (mid-level=good approach, expert level=teach us something we don't know)

## Evaluation criteria

- overall architecture and code quality (readability, decoupledness, etc)
- file structure
- naming (variables, files, etc)
- test coverage (see instructions for [running tests](#running-tests))
- communication: explain design decisions and tradeoffs
- proficiency at languages and libraries chosen for the task

If you wish to work full-stack, please attempt both frontend and backend in separate Pull Requests. Submit a PR first with your most comfortable or desired choice, so we can offer you feedback sooner.

## General instructions

- Please note there is a shared `.env` file for environment variables. This file is used by both the
  frontend and backend.
- Please lint and explain your code (even just briefly). CI runs checks, you can see them in `.github/workflows`
- After completing the challenge to a level that you're satisfied shows off your expertise,
  open a pull request against main (open two separate ones if you're doing frontend + backend)
- In your PR, add a description explaining your approach, design choices, how you would approach any unfinished items, and anything else you think is worthwhile. Screenshots and demo videos are encouraged!
- The repo uses CI to lint and run tests on your PR. We'd like to see those passing.
- This challenge is intended to take between 4 and 8 hours. When you reach this limit, please mention in your submission what you may have done with more time.

## Using make

To make the development flow easier, we've added a Makefile with many useful targets. Check [this guide](https://makefiletutorial.com/) for more information on how to use `make`.

- To list all available commands, either check the file or run `make help`.
- If you want to pass additional arguments, for commands that allow this, you'll have to do the following: `make target-name ARGS='<any arguments>'`. For example, if you want to detach a container when running it, you'll have to do: `make python-start ARGS='--detach'`.

## Docker setup

We think it's easier to complete the challenge using Docker. If you are familiar with Docker and already have it installed, you can skip to the specific challenge you are doing. Otherwise, below are some instructions on how to get Docker installed on your system.

<details>
<summary>Linux</summary>

1. Install

   ```console
   sudo apt-get update

   sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

2. Verify

   ```console
   sudo docker run hello-world
   ```

   This should pull the image, run the container, print the message and exit.

3. Add your user to the `docker` group

   ```console
   sudo groupadd docker

   sudo usermod -aG docker $USER

   newgrp docker

   docker run hello-world # now the test should run without sudo
   ```

For more information, check the [Docker docs](https://docs.docker.com/engine/install/ubuntu/).

</details>

<details>
<summary>MacOS</summary>

1. Install Docker with [brew](https://brew.sh/)

   ```console
   brew install --cask docker
   brew install docker-compose
   ```

2. Verify

   ```console
   docker --version
   ```

   If this does not display the Docker version, you should restart the Docker deamon. You can find it using Spotlight or under the Applications folder.

For more information, check the [Docker docs](https://docs.docker.com/desktop/mac/install/) and [this guide](https://www.cprime.com/resources/blog/docker-for-mac-with-homebrew-a-step-by-step-tutorial/).

</details>

<details>
<summary>Windows</summary>

Docker offers an installer for Windows. Please check the [Docker docs](https://docs.docker.com/desktop/windows/install/) and, if you need additional information, [this guide from Microsoft](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers). Both guides use WSL 2.

</details>

## Frontend challenge

Use React, TypeScript, and Tailwind.

Feel free to use any additional libraries, **except for out-of-the-box deck/card dealing.**

Please write tests.

The task is to build a simple card game. The designs are in Figma, you can see [desktop](https://www.figma.com/file/TQSDNvCd0WJFhYQuwtUS8c/Interview-Card-Game?node-id=0%3A1) and [mobile](https://www.figma.com/file/TQSDNvCd0WJFhYQuwtUS8c/Interview-Card-Game?node-id=2%3A352) pages. The fonts should be available in Google Fonts, but we also included them in assets if they ever take them down (has happened before). It doesn't have to be pixel perfect, but it should look nice.

**Requirements**

1. Assuming a standard deck (52 cards of 4 suits: ♣ Clubs, ♦ Diamonds, ♥ Hearts, ♠ Spades).
2. Press a "Deal" button to deal 5 random cards.
3. Pressing the button again should deal 5 unique, random cards. Within the same game, you should never get the same cards again that you got in the past (just like a physical deck).
4. Add a card counter which shows how many cards are left.
5. Add an ace counter which shows how many aces are left. (this is not present in the designs at the time of this writing, you can do it the way it makes most sense to you, consistent with the designs)
6. Add a button to reset the game.
7. When all the aces have been dealt, "Game Over" should be displayed.
8. If there is an ace in the last draw and there are no more cards left to deal, display "Winner", otherwise display "You Lose. Better luck next time!" Last draw means the last draw that is allowed, as there could be additional cards left to deal, but no aces.

**Bonus!**

1. Animations. Wow us!
2. Sounds
3. Deploy to the web for us to play

### Requirements

- Node 16+ (tested on 18.12.1)
- ~~Yarn 1+ (tested on 1.19.1)~~ the Docker build is using npm

### Getting Started with Docker

```console
make frontend-start
```

Your browser will automatically open to http://localhost:3000 by Create React App. Changes should be reflected automatically.

See [CRA documentation](https://facebook.github.io/create-react-app/).

You are welcome to use [Next.js](https://nextjs.org/) instead, we just set up CRA for convenience.

### Designs

- [desktop](https://www.figma.com/file/TQSDNvCd0WJFhYQuwtUS8c/Interview-Card-Game?node-id=2%3A352)

- [mobile](https://www.figma.com/file/TQSDNvCd0WJFhYQuwtUS8c/Interview-Card-Game?node-id=2%3A352)

### Example implementations

Here are some demos, to paint a picture of submissions for candidates we've hired. You don't have to match these exactly.

- [Older demo, missing ace counter, with animations/confetti](https://drive.google.com/file/d/1uIYhG-74wrWs7YZx6Zz9Bdn3WSEtaIWY/view)
- [Newer demo, with ace counter](https://drive.google.com/file/d/1_nZ_v7LhZwystrVZ7MW8vWRHV6U5Qq9k/view)

### Troubleshooting & Tips

If you have any issues with husky/commit hooks, you may remove the \*.py section of "lint-staged" in package.json

Additionally, if you're on Windows, check out this tip for [yarn with husky on Windows](https://typicode.github.io/husky/#/?id=yarn-on-windows).

### Linting

CI runs prettier and eslint. Configuring your editor/IDE appropriately will make it easier for you to ensure passing CI tests when you submit.

## License and sharing

This repository is intended to be private. You are not allowed to share any of the base template code without Uplift's express permission. Please reach out to us **before** you share any of the code in this repository with others.

That said, we understand you may want to show others your work. If you're proud of your work on this exercise and want to share it with future companies or add to your portfolio, we kindly request you help us keep the codebase as private as possible. If it's easy for other candidates to find a good coding exercise submission, they will, and then we have to invest a bunch of time to change the requirements so that old examples cannot be used. Unfortunately we've had cases of applicants copying examples they found.

Here are some ideas to share this more privately. We would really appreciate if you followed them:

- Host the code privately and only give access to others upon request. This is the best way to ensure it's not easy to find.

- Share only a few of the files, but not enough to tie everything together.

- Host it on your own server, or bitbucket instead of github.
