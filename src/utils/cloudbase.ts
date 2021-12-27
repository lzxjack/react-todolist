import { env } from './constant';
import cloudbase from '@cloudbase/js-sdk/app';
import '@cloudbase/js-sdk/auth';
import '@cloudbase/js-sdk/storage';
import '@cloudbase/js-sdk/database';

export const app = cloudbase.init({
    env,
});

export const auth = app.auth({
    persistence: 'local',
});

export const user = auth.currentUser;

export const db = app.database();

export const _ = db.command;
