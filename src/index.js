import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

    state = { lat: null, errorMessage: '' };

    // componentDidMount: Good place to do data loading
    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );
    }

    // componentDidUpdate: Good place to do more data loading when state/props change
    componentDidUpdate(){
        console.log('component was updated');
    }

    // componentWillUnmount: Good place to do cleanup (especially for non-React stuff)
    componentWillUnmount(){

    }

    //helper function
    renderContent() {
        if(this.state.errorMessage && !this.state.lat){
            return <div>Error: {this.state.errorMessage}</div>
        }

        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat={this.state.lat} />;
        }

        return <Spinner message='Please accept location request'/>;
    }

    render () {
        return (
            <div classname="border red">
                {this.renderContent()}
            </div>
        );

    }
}

ReactDOM.render(<App/>, document.querySelector('#root'));