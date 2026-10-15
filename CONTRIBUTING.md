Contributing Guide
==================

Getting Started
---------------
- Fork the repository and create a feature branch named feature/<short-description>
- Keep commits small and focused with clear messages
- Follow the project style: Python with explicit typing and modular functions, React functional components with hooks and Tailwind utility classes

Development Workflow
--------------------
- Open issues for proposed features and bug reports with reproducible steps
- Link pull requests to issues where applicable
- Implement changes on a feature branch and open a pull request against the main branch
- Add tests for backend logic and key components; unit tests are required for core detectors and API endpoints

Testing
-------
- Backend tests: pytest under backend/tests
- Frontend checks: run the Vite dev server and manual UI validation
- Include test data or demo input files in a demo/ directory for reproducible test runs

Code Quality
------------
- Use clear and descriptive names for functions, classes, and variables
- Avoid inline comments in code; prefer self-documenting function and variable names
- Ensure secrets are read from environment variables
- Add migrations and database schema changes through SQLAlchemy migration tools if applicable

Pull Request Expectations
-------------------------
- Provide a descriptive title and summary of changes
- Include screenshots or demo steps for frontend changes
- Ensure all automated checks and tests pass before requesting review
- Respect review feedback and update the PR promptly

License and Contribution License
--------------------------------
Contributions are accepted under the same MIT license as this project. By submitting a pull request, you agree to license your contributions under MIT.

Communication
-------------
- Use the issue tracker for public discussion about features and bugs
- For sensitive topics, contact maintainers via the addresses listed in README

Hackathon Notes
---------------
- Prioritize clarity and reproducibility for judging
- Include a short demo script with any CI or demo artifacts for the judges
- Focus on end-to-end scenarios that showcase detection, alerting, and verification
