/// <reference path="./Typings.d.ts" />

/**
 * Run in ts-node
 * https://www.npmjs.com/package/ts-node
 * 
 * Example: ts-node --no-cache ./samples/UserSample.ts
 */

(async () => {

    await import('reflect-metadata'); // polyfill
    console.log('Reflect: \n', Reflect);

    const { User } = await import('./models/User');
    const json: any = await import('./jsons/json-generator.json');

    console.log('User: \n', new User().fromJSON(json[0]));

})()