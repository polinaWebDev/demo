import { defineConfig } from '@hey-api/openapi-ts'

console.log('Config loaded')

export default defineConfig({
  input: './openapi.json',
  output: {
    path: 'src/shared/api/generated',
  },
  plugins: [
    {
      name: '@hey-api/client-fetch',
      runtimeConfigPath: './heyapi.config.ts',
    },
    '@hey-api/typescript',
    {
      asClass: false,
      name: '@hey-api/sdk',
    },
    {
      name: '@tanstack/react-query',
      queryKeys: true,
    },
    {
      name: 'zod',
    },
  ],
})
