### Linting

CI runs black, isort, flake8. Configuring your editor/IDE appropriately will make it easier for you to ensure passing CI tests when you submit.

### Installing packages

    poetry add <package name>  # this automatically adds it to pyproject.toml and poetry.lock

If you manually update `pyproject.toml`, make sure you run `poetry update` to update the lockfile.

If you run with docker, and your package is suddenly missing, you may need to rebuild the images using:

```console
make python-build
```

### Running tests

Please run the tests, and lint your backend code. This helps us review code, as it's already consistent with this project.

```console
make python-lint
make python-test
```

Or check out the `Makefile` for other options.

### Server architecture

- PostgreSQL 14+
- Python 3.11+
- Django 4
- [django-environ](https://github.com/joke2k/django-environ) for easy environment configuration via `.env` files

### Sample test user

The database is created with a sample test user:

| Name     | Value                   |
| -------- | ----------------------- |
| Username | interview               |
| Email    | interview@uplift.agency |
| Password | uplifty                 |

You can change these in the Django admin if you wish.
