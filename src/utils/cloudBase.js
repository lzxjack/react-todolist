import cloudbase from '@cloudbase/js-sdk';

const app = cloudbase.init({
    env: 'todolist-3gayiz0cb9b8b263',
});

export const auth = app.auth();
export let db = app.database();
