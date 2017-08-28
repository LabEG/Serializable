import { assert } from 'chai';

describe('Serializable', async function () {
    describe('json-generator', async function () {

        it('user from method fromJSON must be instance of User', async function () {

            await import('reflect-metadata'); // polyfill

            const { User } = await import('./models/User');
            const json: any = await import('./jsons/json-generator.json');

            let user = new User().fromJSON(json[0]);

            assert.isTrue(user instanceof User);

        });

        it('user from static method fromJSON must be instance of User', async function () {

            await import('reflect-metadata'); // polyfill

            const { User } = await import('./models/User');
            const json: any = await import('./jsons/json-generator.json');

            let user = User.fromJSON(json[0]);

            assert.isTrue(user instanceof User);

        });

    });
});