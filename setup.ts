import chalk from 'chalk';
import { readFileSync, writeFileSync } from 'fs-extra';
import inquirer from 'inquirer';
import terminalImage from 'terminal-image';

/**
 * Setup + types + helper functions
 */
const { log } = console;

const Challenges = {
  frontend: 'Frontend (React)',
  fullstack: 'Full-stack (React + Python)',
  fullstack_node: 'Full-stack (React + Node)',
  python: 'Backend (Python)',
  node: 'Backend (Node)',
  php: 'Backend (PHP)',
} as const;
type Challenge = typeof Challenges[keyof typeof Challenges];

// const BOOTSTRAP_PREFIX = '.uplift/bootstrap';
const CONTENT_PREFIX = '.uplift/content';

// read from a markdown file
function md(filename: string) {
  const buffer = readFileSync(`${CONTENT_PREFIX}/${filename}.md`);
  const text = buffer.toString();
  return text;
}

/**
 * Prompt for a challenge
 */
async function getChallenge(): Promise<Challenge> {
  // eslint-disable-next-line no-console
  console.clear();

  const image = await terminalImage.file(`${CONTENT_PREFIX}/image.png`, {
    width: 20,
    height: 8,
    preserveAspectRatio: false,
  });

  log(image);
  log(chalk.green(`Welcome to the ${chalk.bold('Uplift coding exercise!\n')}`));

  // use inquirer to prompt the user for one of three challenges
  const { challenge } = await inquirer.prompt([
    {
      type: 'list',
      name: 'challenge',
      message: chalk.blue('Please select a challenge from the following options:'),
      choices: [
        {
          name: Challenges.frontend,
        },
        {
          name: Challenges.fullstack,
        },
        {
          name: Challenges.fullstack_node,
        },
        {
          name: Challenges.python,
        },
        {
          name: Challenges.node,
        },
        {
          name: Challenges.php,
        },
      ],
    },
  ]);

  return challenge;
}

/**
 * Generate a readme from the candidate's choices
 */
function generateReadme(challenge: Challenge, useDocker: boolean): string {
  //  isolate common readme parts
  const combine = (...parts: (string | boolean)[]) => parts.filter((x) => !!x).join('\n\n');

  const commonIntro = combine(md('common/intro'), useDocker && md('common/docker'));
  const frontendInstructions = combine(
    md('frontend/intro'),
    md(`frontend/${useDocker ? 'docker' : 'local'}`),
    md('frontend/rest')
  );
  const pythonInstructions = combine(
    md('backend/python/intro'),
    md('backend/problem'),
    md(`backend/python/${useDocker ? 'docker' : 'local'}`),
    md('backend/python/rest')
  );

  const generateFrontendReadme = () => combine(commonIntro, frontendInstructions);

  const generateFullstackReadme = () =>
    combine(
      commonIntro,
      frontendInstructions,
      pythonInstructions,
      md('fullstack/intro'),
      useDocker && md('fullstack/docker'),
      md('fullstack/rest')
    );

  const generatePythonReadme = () => combine(commonIntro, pythonInstructions);

  const generateNodeReadme = () => combine(commonIntro, md('backend/node'), md('backend/problem'));

  const generatePhpReadme = () => combine(commonIntro, md('backend/php'), md('backend/problem'));

  const generateFullstackNodeReadme = () =>
    combine(commonIntro, frontendInstructions, md('backend/node'), md('backend/problem'));

  const readmeFunctions: Record<Challenge, () => string> = {
    [Challenges.frontend]: generateFrontendReadme,
    [Challenges.fullstack]: generateFullstackReadme,
    [Challenges.fullstack_node]: generateFullstackNodeReadme,
    [Challenges.python]: generatePythonReadme,
    [Challenges.node]: generateNodeReadme,
    [Challenges.php]: generatePhpReadme,
  };

  return combine(readmeFunctions[challenge](), md('common/license'));
}

/**
 * Entry point: prompt the user for a challenge and generate readme + boilerplate (eventually)
 */
async function main() {
  const challenge = await getChallenge();

  log(chalk.blue(`You selected the ${chalk.bold(challenge)} exercise.`));

  const { useDocker } =
    challenge === Challenges.node
      ? Promise.resolve({ useDocker: false })
      : await inquirer.prompt([
          {
            type: 'confirm',
            name: 'useDocker',
            message: 'Would you like to use Docker to set up and run your local environment?',
            default: true,
          },
        ]);

  const readme = generateReadme(challenge, useDocker);
  // write readme to a file

  writeFileSync('README.md', readme);

  log(chalk.green('README generated!'));

  // TODO: generate boilerplate (needs CI/CD work)
  // log(chalk.blue(`Generating ${challenge} boilerplate...`));
  // bootstrapProject(challenge, useDocker);
}
main();

/*
function bootstrapProject(challenge: Challenge, useDocker: boolean) {
  const projectPaths: Record<Challenge, string[]> = {
    [Challenges.frontend]: ['fe'],
    [Challenges.fullstack]: ['fe', 'python'],
    [Challenges.python]: ['python'],
    [Challenges.node]: ['node'],
    [Challenges.php]: ['php'],
  };

  if (useDocker) {
    mkdirpSync('docker');
    copySync(`${BOOTSTRAP_PREFIX}/docker_common`, '.');
  }

  const paths = projectPaths[challenge];

  paths.forEach((path) => {
    const prefix = `${BOOTSTRAP_PREFIX}/${path}`;
    const files = readdirSync(prefix);

    files.forEach((file) => {
      try {
        copySync(`${prefix}/${file}`, `./${file}`, { overwrite: true });
        // eslint-disable-next-line no-empty
      } catch {
        error(chalk.red(`Failed to copy ${prefix}/${file}`));
      }
    });
  });

  log(chalk.green('Boilerplate generated! See README for next steps.'));
} */
