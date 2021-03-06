import React, { Component } from 'react';
import logo from './logo.svg';
import 'whatwg-fetch';
import './App.css';
import Image from './Components/Image';
import IndexButton from './Components/IndexButton';
import Surprise from './Components/Surprise';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      images: [],
      currentIndex: 0,
      surprise: false
    };

    this.setImages = this.setImages.bind(this);
    this.transformImageData = this.transformImageData.bind(this);
    this.handlerLeft = this.handlerLeft.bind(this);
    this.handlerRight = this.handlerRight.bind(this);
    this.handlerRandomize = this.handlerRandomize.bind(this);
    this.handlerSurprise = this.handlerSurprise.bind(this);
  }

  componentDidMount() {
    this.fetchImages();
  }

  setImages(imgs) {
    this.setState({ images: imgs });
  }

  transformImageData(response) {
    return response.data.images.map((el) => {
      return el.link;
    });
  }

  fetchImages() {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Client-ID 9f9611ea36d5134'
      }
    };

    fetch('https://api.imgur.com/3/album/1UOb8', options)
      .then((res) => res.json())
      .then((json) => this.transformImageData(json))
      .then((urls) => this.setImages(urls))
      .catch((e) => console.log(e));

  }

  changeIndex(delta) {

    const maxArrRange = this.state.images.length - 1;
    let newIndex = this.state.currentIndex + delta;

    newIndex < 0 ? newIndex = maxArrRange : '';
    newIndex > maxArrRange ? newIndex = 0 : '';

    this.setState({
      currentIndex: newIndex
    });

  }

  handlerLeft() {
    this.changeIndex(-1);
  }

  handlerRight() {
    this.changeIndex(1);
  }

  handlerRandomize() {
    
    const maxArrRange = this.state.images.length - 1;
    const randomIndex = Math.floor(Math.random() * maxArrRange) + 0;

    this.changeIndex(randomIndex);
  }

  handlerSurprise() { 
    this.setState({
      surprise: !this.state.surprise
    });
  }

  render() {
    const images = this.state.images.map((url) => <Image url={url} />);
    
    const currentIndex = this.state.currentIndex;
    const elementToShow = this.state.surprise ? <Surprise images={images} currentIndex={currentIndex} /> : images[currentIndex]; 
    
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to (un)Naked Image Girl Slider</h2>
        </div>
        <p>
          <IndexButton handler={this.handlerRight} text="+++" />
          <IndexButton handler={this.handlerLeft} text="---" />
          <IndexButton handler={this.handlerRandomize} text="RANDOMIZE!!" />
          <IndexButton handler={this.handlerSurprise} text="Surprise :) !!" />
        </p>

      {elementToShow}

      </div>
    );
  }
}

export default App;
