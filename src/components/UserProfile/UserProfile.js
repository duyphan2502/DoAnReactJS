import React, { Component } from 'react'
import MainNav from '../MainNav/MainNav'
import Loader from '../Loader/Loader'
import "../UserProfile/UserProfile.scss";
import "../UserLogin/UserLogin.scss";
import UserLogin from "../UserLogin/UserLogin";
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';


import getSession from '../../actions/authenticationActions/getSession';
import deleteSession from '../../actions/authenticationActions/deleteSession';
import toggleLogInStatus from '../../actions/authenticationActions/toggleLogInStatus';
import getUserDetails from '../../actions/authenticationActions/getUserDetails';
import firebase from 'firebase'
import firebaseConfig from "../../firestore"
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: this.props.logInStatus,
            photo: null,
            displayName: null
        }
    }

    // componentDidMount() {
    //     if (this.props.match.params.status === 'approved' && !this.props.logInStatus) {
    //         this.props.getSession("https://api.themoviedb.org/3/authentication/session/new?api_key=f4718f386ee605decefebc673ce3bc9c", this.parseRequestToken(this.props.location.search));
    //         this.props.toggleLogInStatus({ status: 'APPROVED' });
    //     }
    // }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler(user)
            }
        });
    }
    // parseRequestToken = token => token.split('?request_token=')[1].split('&')[0];

    // handleDeleteSession = sessionId => {
    //     this.props.deleteSession("https://api.themoviedb.org/3/authentication/session?api_key=f4718f386ee605decefebc673ce3bc9c", sessionId);
    //     this.props.toggleLogInStatus({ status: false });
    // }
    authenticate = provider => {
        console.log(provider);
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseConfig
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    };

    authHandler =  authData => {
        const user =  authData.user;
        this.setState({
            isLogin: true,
            photo: user.photoURL,
            displayName: user.displayName
        }, console.log(user));
    };

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ isLogin: false }, this.props.history.push('/'));
    };
    render() {
        if (!this.state.isLogin)
            return <UserLogin authenticate={this.authenticate} authHandler={this.authHandler} logout={this.logout} />
        else
            return (

                <div className="user-profile">
                    <MainNav />
                    <div className="user-profile-container">
                        <aside className="user-profile-container-aside">
                            <nav className="user-profile-container-aside-nav">
                                <div className="user-profile-container-aside-nav-profile wow swing" data-wow-delay=".5s" data-wow-duration="5s">
                                    <img className="user-profile-container-aside-nav-profile-image" src={this.state.photo} alt="user" />
                                    <div className="user-profile-container-aside-nav-profile-info">
                                        <h2 className="user-profile-container-aside-nav-profile-info__user-name">Welcome</h2>
                                        <p className="user-profile-container-aside-nav-profile-info__user-type">{this.state.displayName}</p>
                                    </div>
                                </div>

                                <a to='/'>
                                    <button onClick={this.logout} className="user-profile-container-aside-nav-log-out wow fadeInUp" data-wow-delay=".5s" data-wow-duration="5s">Log Out</button>
                                </a>

                            </nav>
                        </aside>
                        <main className="user-profile-container-main">
                            <div className="user-profile-container-main-info">

                                <div className="user-profile-container-main-info-item">
                                    <svg className="user-profile-container-main-info-item__image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M360 64H152c-22.002 0-40 17.998-40 40v344l144-64 144 64V104c0-22.002-17.998-40-40-40z" /></svg>
                                    <p className="user-profile-container-main-info-item-content"><span className="user-profile-container-main-info-item-content__number">{}</span> Favorite Movies</p>
                                </div>

                                <div className="user-profile-container-main-info-item">
                                    <svg className="user-profile-container-main-info-item__image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M360 64H152c-22.002 0-40 17.998-40 40v344l144-64 144 64V104c0-22.002-17.998-40-40-40z" /></svg>
                                    <p className="user-profile-container-main-info-item-content"><span className="user-profile-container-main-info-item-content__number">{}</span> Favorite TV Shows</p>
                                </div>

                                <div className="user-profile-container-main-info-item">
                                    <svg className="user-profile-container-main-info-item__image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z" /></svg>
                                    <p className="user-profile-container-main-info-item-content"><span className="user-profile-container-main-info-item-content__number">{}</span> Rated Movies</p>
                                </div>

                                <div className="user-profile-container-main-info-item">
                                    <svg className="user-profile-container-main-info-item__image" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 372.686L380.83 448l-33.021-142.066L458 210.409l-145.267-12.475L256 64l-56.743 133.934L54 210.409l110.192 95.525L131.161 448z" /></svg>
                                    <p className="user-profile-container-main-info-item-content"><span className="user-profile-container-main-info-item-content__number">{}</span> Rated TV Shows</p>
                                </div>

                            </div>
                            <div className="user-profile-container-main-content">
                                <div className="user-profile-container-main-container">
                                    <header className="user-profile-container-main-container-header">
                                        <h3
                                            className="user-profile-container-main-container-header__title wow fadeIn"
                                            data-wow-duration="3s"
                                            style={{
                                                visibility: "visible",
                                                animationDuration: "3s",
                                                animationName: "fadeIn"
                                            }}
                                        >
                                            Favorite Movies
        </h3>
                                        <hr className="user-profile-container-main-container-header__separator" />
                                    </header>
                                    <div className="user-profile-container-main-container-item">
                                        <h3 className="user-profile-container-main-container-item-warning">
                                            No favorite movies found
        </h3>
                                    </div>
                                </div>
                                <div className="user-profile-container-main-container">
                                    <header className="user-profile-container-main-container-header">
                                        <h3
                                            className="user-profile-container-main-container-header__title wow fadeIn"
                                            data-wow-duration="3s"
                                            style={{
                                                visibility: "visible",
                                                animationDuration: "3s",
                                                animationName: "fadeIn"
                                            }}
                                        >
                                            TV Shows
        </h3>
                                        <hr className="user-profile-container-main-container-header__separator" />
                                    </header>
                                    <div className="user-profile-container-main-container-item">
                                        <h3 className="user-profile-container-main-container-item-warning">
                                            No favorite tv shows found
        </h3>
                                    </div>
                                </div>
                                <div className="user-profile-container-main-container">
                                    <header className="user-profile-container-main-container-header">
                                        <h3
                                            className="user-profile-container-main-container-header__title wow fadeIn"
                                            data-wow-duration="3s"
                                            style={{
                                                visibility: "visible",
                                                animationDuration: "3s",
                                                animationName: "fadeIn"
                                            }}
                                        >
                                            Movies Rated
        </h3>
                                        <hr className="user-profile-container-main-container-header__separator" />
                                    </header>
                                    <div className="user-profile-container-main-container-item">
                                        <h3 className="user-profile-container-main-container-item-warning">
                                            No rated movies found
        </h3>
                                    </div>
                                </div>
                                <div className="user-profile-container-main-container">
                                    <header className="user-profile-container-main-container-header">
                                        <h3
                                            className="user-profile-container-main-container-header__title wow fadeIn"
                                            data-wow-duration="3s"
                                            style={{
                                                visibility: "visible",
                                                animationDuration: "3s",
                                                animationName: "fadeIn"
                                            }}
                                        >
                                            TV Shows Rated
        </h3>
                                        <hr className="user-profile-container-main-container-header__separator" />
                                    </header>
                                    <div className="user-profile-container-main-container-item">
                                        <h3 className="user-profile-container-main-container-item-warning">
                                            No rated tv shows found
        </h3>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    <Loader />
                </div >
            )
    }
}
const mapStateToProps = state => ({
    session: state.getSession,
    requestToken: state.getRequestToken,
    logInStatus: state.toggleLogInStatus.status,
    userDetails: state.getUserDetails,
});

const mapDispatchToProps = dispatch => ({
    getSession: (url, token) => dispatch(getSession(url, token)),
    deleteSession: (url, sessionId) => dispatch(deleteSession(url, sessionId)),
    toggleLogInStatus: status => dispatch(toggleLogInStatus(status)),
    getUserDetails: url => dispatch(getUserDetails(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
