// Adapted from: https://github.com/lukeautry/tsoa/issues/413

import * as tsoa from '@/tsoa';
import * as fs from 'fs';
import * as path from 'path';

function createDirRegardless(dirPath: string): void {
  console.log('dirPath', dirPath);

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    // tslint:disable-next-line: no-console
    console.log(`Created directory: ${dirPath}`);
  } else {
    // tslint:disable-next-line: no-console
    console.log(
      `This directory already existed so we'll keep moving: ${dirPath}`
    );
  }
}

async function main(): Promise<'done'> {
  // tslint:disable-next-line: no-console
  console.log('Started the tsoa generation');

  const buildPath = path.resolve(
    __dirname,
    '../../../../../../../build/domains/Community/Discussion'
  );
  createDirRegardless(buildPath);

  //   const buildDirectory = path.join(__dirname, 'build');
  //   const staticFileServingDir = path.join(
  //     buildDirectory,
  //     'staticFilesToBeServed'
  //   );
  //   createDirRegardless(buildDirectory);
  //   createDirRegardless(staticFileServingDir);

  const baseConfig: tsoa.Config = {
    entryFile: 'src/app.ts',
    noImplicitAdditionalProperties: 'throw-on-extras',
    controllerPathGlobs: [
      'src/core/driving-adapters/api/controllers/*-controller.ts',
    ],
    spec: {
      //   host: 'localhost:3000',
      //   basePath: '/api/v1',
      //   outputDirectory: './../../../build/domains/Community/Discussion',
      outputDirectory: buildPath,
      specVersion: 3,
    },

    routes: {
      //   routesDir: './../../../build/domains/Community/Discussion',
      routesDir: buildPath,
      iocModule: 'src/di/driving-adapters/api/api',
    },

    compilerOptions: {
      baseUrl: '.',
      paths: {
        '@/ts-extension/*': ['./../../../ts-extension/*'],
        '@/shared-kernel/*': ['./../../SharedKernel/src/*'],
        '@/core/*': ['./src/core/*'],
        '@/di/*': ['./src/di/*'],
      },
    },
    ignore: ['**/node_modules/@types/**'],
  };

  await buildSwaggerAndRoutes(baseConfig);

  //   const configsPerMicroService: tsoa.Config[] = [
  //     createConfigForAMicroService({
  //       baseConfig,
  //       partialConfig: {
  //         spec: {
  //           outputDirectory: buildPath,
  //         },
  //         entryFile: path.resolve(
  //           path.join(__dirname, './src/services/microService1/index.ts')
  //         ),
  //       },
  //     }),
  //     createConfigForAMicroService({
  //       baseConfig,
  //       partialConfig: {
  //         spec: {
  //           outputDirectory: buildPath,
  //         },
  //         entryFile: path.resolve(
  //           path.join(__dirname, './src/services/microService2/index.ts')
  //         ),
  //       },
  //     }),
  //     createConfigForAMicroService({
  //       baseConfig,
  //       partialConfig: {
  //         spec: {
  //           outputDirectory: buildPath,
  //         },
  //         entryFile: path.resolve(
  //           path.join(__dirname, './src/services/microService3/index.ts')
  //         ),
  //       },
  //     }),
  //   ];

  //   for (const aConfig of configsPerMicroService) {
  //     await buildSwaggerAndRoutes(aConfig);
  //   }

  return 'done';
}

// function createConfigForAMicroService(input: {
//   baseConfig: tsoa.Config;
//   partialConfig: Partial<tsoa.Config>;
// }): tsoa.Config {
//   return Object.assign({}, input.baseConfig, input.partialConfig);
// }

async function buildSwaggerAndRoutes(swaggerConfig: tsoa.Config) {
  const swaggerGenerationResult = await tsoa.generateSpecAndRoutes({
    configuration: swaggerConfig,
  });

  console.log(
    `Generated swagger doc at: ${swaggerConfig.spec.outputDirectory}`
  );
  console.log(
    `Generated automatic routes at: ${swaggerConfig.routes.routesDir}`
  );

  return swaggerGenerationResult;

  //   const swaggerGenerationResult = await tsoa.generateSwaggerSpec(swaggerConfig);
  //   const swaggerGenerationResult = await tsoa.generateSpec(swaggerConfig);
  //   // tslint:disable-next-line: no-console
  //   console.log(
  //     `Generated swagger doc at: ${swaggerConfig.spec.outputDirectory}`
  //   );

  //   const routeGenArgs: Parameters<typeof tsoa.generateRoutes> = [
  //     {
  //       basePath: '/api/v1',
  //       entryFile: './src/index.ts',
  //       middleware: 'koa',
  //       routesDir: './src',
  //       controllerPathGlobs: ['./src/controllers/**/*.ts'],
  //       noImplicitAdditionalProperties: 'throw-on-extras',
  //     },
  //     swaggerConfig,
  //   ];

  //   const routesGenerationResult = await tsoa.generateRoutes(...routeGenArgs);
  //   // tslint:disable-next-line: no-console
  //   console.log(`Generated automatic routes at: ${routeGenArgs[0].routesDir}`);

  //   return {
  //     swaggerGenerationResult,
  //     routesGenerationResult,
  //   };
}

main()
  .then(() => {
    // tslint:disable-next-line: no-console
    console.log('Finished the tsoa generation');
  })
  .catch((err) => {
    throw err;
  });
