import React from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ParticlesBg from 'particles-bg';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'login',
  isLoggedIn: false,
  userProfile: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - clarifaiFace.right_col * width,
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  updateProfile = (user) => {
    this.setState({
      userProfile: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = 'ba7a7543d94744c28a3c51b1af4c7bf8';
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = 'emmawxy';
    const APP_ID = 'face-detection';
    const MODEL_ID = 'face-detection';

    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.input
            }
          }
        }
      ]
    });

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.userProfile.id
            })
          })
            .then(response => response.json())
            .then(userEntries => this.setState(Object.assign(this.state.userProfile, { entries: userEntries.entries })))
        }
        this.displayFaceBox(this.calculateFaceLocation(result))
      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === 'home') {
      this.setState({ isLoggedIn: true });
    }
    if (route === 'login') {
      this.setState(initialState);
    }
    this.setState({ route: route });
  }

  routeSwitch = (route) => {
    const { imageUrl, box } = this.state;
    switch (route) {
      case 'login':
        return <LogIn updateProfile={this.updateProfile} onRouteChange={this.onRouteChange} />
      case 'home':
        return (
          <>
            <Logo />
            <Rank name={this.state.userProfile.name} entries={this.state.userProfile.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </>
        );
      case 'register':
        return <Register updateProfile={this.updateProfile} onRouteChange={this.onRouteChange} />
      default:
        throw new Error(route + ' is not a valid route');
    }

  }

  render() {
    const { route, isLoggedIn } = this.state;
    return (
      <div className="App">
        <ParticlesBg color="#FFFFFF" num={200} type="cobweb" bg={true} />
        <Navigation onRouteChange={this.onRouteChange} isLoggedIn={isLoggedIn} />
        {
          this.routeSwitch(route)
        }
      </div>
    );
  }
}

export default App;
