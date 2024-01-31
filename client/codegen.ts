import { CodegenConfig } from '@graphql-codegen/cli';

const endpointURL = 'http://localhost:9000/graphql';

const config: CodegenConfig = {
	schema: endpointURL,
	// this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
	documents: ['src/**/*.{ts,tsx}'],
	generates: {
		'./src/__generated__/': {
			preset: 'client',
			plugins: [],
			presetConfig: {
				gqlTagName: 'gql',
			},
		},
	},
	ignoreNoDocuments: true,
};

export default config;
