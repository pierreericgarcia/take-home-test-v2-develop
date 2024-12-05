# Here are the critics

## Types

- Types could be automatically generated from the API using TypeORM
- These types could then be shared between frontend and backend through a shared `types.ts` file
- Additionally, DTO types could be created and shared to ensure a clear interface between frontend and backend

## Tests

- Complete absence of tests
- Should start with unit tests for pure data transformation functions
- Then add API route integration tests

## Errors

- API only returns HTTP status codes, which is not very useful for the frontend
- Should add more explicit error messages
- Error handling code is duplicated in each controller

## Validations

- No input validation on the backend
- No input validation on the frontend
- Validation schemas could be shared between frontend and backend

## Makefile

Two issues with the Makefile:

- The clean-db command wasn't working because it referenced `db` instead of `db-dev`
- The migration-generate command created migrations in the wrong location (`src` instead of `src/migration`)
