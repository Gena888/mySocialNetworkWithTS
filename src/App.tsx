import React, { Component } from 'react';
import './App.css';
import Settings from './components/Settings/Settings';
import { Route, withRouter, BrowserRouter, Redirect, Switch, HashRouter } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavContainer from './components/Nav/NavContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import { connect, Provider } from 'react-redux';
import Preloader from './components/Common/Preloader/Preloader';
import { initializeApp } from './redux/app-reducer';
import { compose } from 'redux';
import store, { AppStateType } from './redux/redux-store';
import { withSuspense } from './Hoc/withSuspense';

const News = React.lazy(() => import('./components/News/News'))
const Login = React.lazy(() => import('./Login/Login'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends Component<MapPropsType & DispatchPropsType> {
  //тут мы можем задиспатчить санку на отображение глобальной ошибки.
  catchAllUnhandledError = (e: PromiseRejectionEvent) => {
    console.log('some error.');
  }
  //метод жизненного цикла, который выполнится после вмонтирования компоненты 
  // window.addEventListener - садй эффект но в comp.DidMount допустим. 
  // это глобальный обработчик ошибок в противовес локальному в редюссоре
  // если в редюсоре перехвачена ошибка - тут её не будет.
  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledError);
  }
  // подчистил мусор. при умирании компоненты нужно отписать слушателя.
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledError);
  }

  render() {
    //пока не инициализированы(все данные в редюсор не пришли) - прелоадер. 
    if (!this.props.initialized) {
      return <Preloader />
    }
    //exact для отображения точный совпадений url. если /login/???? то не отобразит. 
    // swtich from react-render-dom. идёт по списку роутов до момента совпадения url. схоже с exact
    return (
      <div className="app-wrapper">

        <HeaderContainer />
        <NavContainer />
        <div className='app-wrapper-content'>
          <Switch>
            <Route exact path='/' render={() => <Redirect to={'/Profile'} />} />
            <Route path='/Profile/:userId?' render={withSuspense(ProfileContainer)} />
            <Route path='/Dialogs/:userId?' render={withSuspense(DialogsContainer)} />
            {/* <Route path='/Profile/:userId?' render={() => <ProfileContainer />} />
            <Route path='/Dialogs/:userId?' render={() => <DialogsContainer />} /> */}
            <Route path='/Users' render={() => <UsersContainer />} />
            <Route path='/News' render={withSuspense(News)} />
            <Route path='/Settings' render={() => <Settings />} />
            <Route path='/Login' render={() => { return <React.Suspense fallback={<Preloader />}> <Login /> </React.Suspense> }} />
            <Route exact path='*' render={() => <div>404 not found</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

// AppContainer результат функции compose.
// compose один за одним выполняет хоки. 
// connect передаёт данные в компаненту через MSTP и MDTP
// brouser router передаёт информацию о роутинге, url
// provider передаёт store в контекст всех дочерних компанент 
// в контект уместо положить тема(тёмная,светлая), локализация(en/ru)
let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const SamuraiJsApp: React.FC = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  )
}


export default SamuraiJsApp; 