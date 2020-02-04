import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


import MainView from './views/MainView';
import Nav from './components/shared/Nav';
import Login from './components/admin/Login';
import Register from './components/admin/Register';
import SingleList from './components/admin/SingleList';
import AdminView from './views/AdminView';
import StoreLists from './components/shared/StoreLists';
import NewStore from './components/admin/NewStore';
import AdminNav from './components/admin/AdminNav';
import Image from './components/admin/Image';
import GuestEditUser from './components/public/GuestEditUser';
import UserNav from './components/shared/UserNav';

export interface AppProps { }

const App: React.SFC<AppProps> = () => {

    return (
        <BrowserRouter>
            <main className="container px-0">
                <Nav />
                <AdminNav />
                <UserNav />
                <Switch>
                    <Route exact path='/' component={MainView} />
                    <Route exact path='/admin' component={AdminView} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/singleList' component={SingleList} />
                    <Route exact path='/storelist' component={StoreLists} />
                    <Route exact path='/newstore' component={NewStore} />
                    <Route exact path='/image/:id' component={Image} />
                    <Route exact path='/guestEdit/:id' component={GuestEditUser} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;