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
