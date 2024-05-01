Also, you'll need to set up the Apollo client for the API:

1. [Here](https://www.apollographql.com/docs/react/get-started/) you can find resources on how to setup Apollo. If you install packages locally, make sure to also `make fullstack-python-build` after you finish the setup to have everything working in Docker. Otherwise, if you have the containers running, you can `make frontend-bash` and `npm install` / `yarn add` any package there.

2. [Here](https://www.graphql-code-generator.com/docs/getting-started/installation) you can find resources on GraphQL code generation.

3. Run `make python-schema` to update `schema.graphql` on the backend.

4. Uncomment the server volume in `docker-compose.frontend.yml`. You need this so that `../server/schema.graphql` is visible in the frontend container.

5. Create `frontend/codegen.yml` and add the following:

   ```yml
   overwrite: true
   schema: '../server/schema.graphql'
   documents:
     - 'src/**/*.{gql,graphql}'
   generates:
     ./src/generated/graphql-types.ts:
       plugins:
         - 'typescript'
         - 'typescript-operations'
         - 'typed-document-node'
   ```

6. Add `"gql-codegen": "graphql-codegen --config codegen.yml"` in `frontend/package.json` and run it.

   ```console
   make frontend-bash
   npm run gql-codegen
   ```

   If you see the following the configuration was successful:

   ```
   ✔ Parse configuration
   ✔ Generate outputs
   Done in 2.45s.
   ```
