import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AboutMe from './AboutMe';
import Finished from './Finished';
import LongTerm from './LongTerm';
import ShortTerm from './ShortTerm';
import './index.css';

export default class Content extends PureComponent {
    render() {
        return (
            <div className="contentBox">
                {/* {renderRoutes(homeRouters)} */}
                <Switch>
                    <Route path="/home/short" component={ShortTerm} />
                    <Route path="/home/long" component={LongTerm} />
                    <Route path="/home/done" component={Finished} />
                    <Route path="/home/me" component={AboutMe} />
                    <Redirect to="/home/short" />
                </Switch>
            </div>
        );
    }
}
