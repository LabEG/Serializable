import('reflect-metadata'); // polyfill
import {assert} from 'chai';

import {User} from "./models/User";

describe('Serializable', async function () {
    describe('json-generator', async function () {

        it('user from method fromJSON must be instance of User', async function () {

            const {User} = await import('./models/User');
            const json: any = await import('./jsons/json-generator.json');

            let user = new User().fromJSON(json[0]);

            assert.isTrue(user instanceof User);

        });

        it('user from static method fromJSON must be instance of User', async function () {

            const {User} = await import('./models/User');
            const json: any = await import('./jsons/json-generator.json');

            let user = User.fromJSON(json[0]) as User;

            assert.isTrue(user instanceof User);

        });

        it('user created from other instance of user must be equals', async function () {

            const {User} = await import('./models/User');
            const json: any = await import('./jsons/json-generator.json');

            let user1 = new User().fromJSON(json[0]);
            let user2 = new User().fromJSON(user1);

            assert.deepEqual(user1, user2);

        });

        it('user property marked as jsonIgnore must by dropped', async function () {

            const {User} = await import('./models/User');
            const json: any = await import('./jsons/json-generator.json');

            let user = new User().fromJSON(json[0]);
            user.isExpanded = true;
            const obj = JSON.parse(JSON.stringify(user)) as User;

            assert.isUndefined(obj.isExpanded);

        });

    });
});
