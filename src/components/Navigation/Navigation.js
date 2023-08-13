function Navigation({ onRouteChange, isLoggedIn }) {
    if (isLoggedIn){
        return (
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('login')}>Log Out</p>
            </nav>
        );
    }
    else{
        return(
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('login')}>Log In</p>
                <p className="f3 link dim black underline pa3 pointer" onClick={() => onRouteChange('register')}>Register</p>
            </nav>
        );
    }
}

export default Navigation;