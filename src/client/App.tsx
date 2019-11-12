import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import MainView from './views/MainView';
import Nav from './components/shared/Nav';
import Login from './components/admin/Login';
import Register from './components/admin/Register';
import NewItem from './components/public/NewItem';
import SingleList from './components/admin/SingleList';
import AdminView from './views/AdminView';

export interface AppProps { }

const App: React.SFC<AppProps> = () => {

    return (
        <BrowserRouter>
            <main className="container px-0">
                <Nav />
                {/* <NewItem /> */}
                <Switch>
                    <Route exact path='/' component={MainView} />
                    <Route exact path='/admin' component={AdminView} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/singleList/:id' component={SingleList} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;