import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';




import MainView from './views/MainView';
import Nav from './components/shared/Nav';
import Login from './components/admin/Login';
import Register from './components/admin/Register';
import NewItem from './components/public/NewItem';

export interface AppProps { }

const App: React.SFC<AppProps> = () => {

    return (
        <BrowserRouter>
            <main className="container px-0">
                <Nav />
                <NewItem />
                <Switch>
                    <Route exact path='/' component={MainView} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;