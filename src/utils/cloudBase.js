// 腾讯云开发的一些API
import cloudbase from '@cloudbase/js-sdk';
import tcb from '@cloudbase/js-sdk';

export const appTcb = tcb.init({
    env: 'todolist-3gayiz0cb9b8b263',
});
export const app = cloudbase.init({
    env: 'todolist-3gayiz0cb9b8b263',
});
export const auth = app.auth({
    persistence: 'local',
});
export const db = app.database();
