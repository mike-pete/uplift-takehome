### Getting Started locally

On MacOS, use [brew](https://brew.sh/) to manage installation of supporting programs, as it keeps things tidy.

On Windows, use WSL with Ubuntu 20.04 or later. You can also install pyenv (check out [pyenv-win](https://github.com/pyenv-win/pyenv-win)) and postgres natively. Docker is not officially supported.

For backend, the recommended way is to use poetry and pyenv. All of the commands in this section are from the `server` folder.

Install [poetry](https://python-poetry.org/). To manage python versions, we recommend installing [`pyenv`](https://github.com/pyenv/pyenv). See [the `poetry` documentation](https://python-poetry.org/docs/managing-environments/) for details.

Then install Python dependencies:

```console
cd server/

# try one of these

pyenv install 3.11  # or pyenv local 3.11
poetry env use ~/.pyenv/versions/3.11.7/bin/python
poetry install
# or
poetry install --python `which python3`
```

If you don't have it already, you'll also want to install Postgres. Version 10 or later should be fine.

If you have issues:

- Check which pyenv version homebrew installs https://github.com/Homebrew/homebrew-core/blob/master/Formula/pyenv.rb#L4
- See what versions of python that pyenv version supports: https://github.com/pyenv/pyenv/tree/master/plugins/python-build/share/python-build
- On MacOS using M1 chip, `poetry install` may fail with an error for `pyscopg2-binary` (`ld: library not found for -lssl`). Check out [this article](https://rogulski.it/blog/install-psycopg2-on-apple-m1/) to install psycopg2.

Copy example env vars to `.env`. You might need to change `DATABASE_URL` based on your environment.

```console
cp ../.env.example ../.env
```

Create the `uplifty` database:

```console
createdb uplifty
```

Load the sample user data:

```console
poetry run python ./manage.py migrate
poetry run python ./manage.py loaddata uplifty/fixtures/users.json
poetry run python ./manage.py runserver
```

Now you can go to http://localhost:8000, http://localhost:8000/graphql/, or http://localhost:8000/admin/ for the Django admin.

Log in to the admin with the [sample test user](#sample-test-user) from below and try the sample query from the challenge.
