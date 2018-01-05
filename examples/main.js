import React from 'react';
import ReactDOM from 'react-dom';
import Selekt from '../src/react-selekt';

class App extends React.Component {

  constructor(props) {
    super(props);
		this.state = {
			selected: ['Express']
		}
	}

  _handleChange = (selected) => {
    this.setState({ selected: selected });
  }

  render() {
    return (
      <div>
        <Selekt
          options={['ReactJS', 'NodeJS', 'Express', 'Webpack']}
          selected={this.state.selected}
          headings={{
            selector: <h1>Select your favorite libraries.</h1>,
            selected: <h2>Your favorite libraries</h2>
          }}
          onChange={this._handleChange.bind(this)}
          classes={{
            selector: {
              wrapper: 'selector-wrapper',
              input: 'selector-input',
              ul: 'selector-ul',
              li: 'selector-li'
            },
            selected: {
              wrapper: 'selected-wrapper',
              ul: 'selected-ul',
              li: 'selected-li'
            },
          }}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
