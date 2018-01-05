# React Selekt
> Ultra minimal multi-select component for React.
## Features
- Multi-select with predefined select options,
- Live searching through select options,
- 100% style control through adding your own classes,
- Optional headers for both selector and the selected options.
## Demo
Coming soon...
## Install
```
npm install react-selekt
```
## Usage (ES6)
```jsx
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
```

This generates the following HTML:

```html
<div>
  <div class="selector-wrapper">
    <h1>Select your favorite libraries.</h1>
    <input type="text" value="" class="selector-input">
    <ul class="selector-ul">
      <li data-vaöue="ReactJS" class="selector-li">ReactJS</li>
      <li data-vaöue="ReactJS" class="selector-li">NodeJS</li>
      <li data-vaöue="ReactJS" class="selector-li">Webpack</li>
    </ul>
  </div>
  <div class="selected-wrapper">
    <h2>Your favorite libraries</h2>
    <ul class="selected-ul">
      <li data-value="Express" class="selected-li">Express</li>
    </ul>
  </div>
</div>
```

## Styling
To style different parts of Selekt, just give the elements you want to style classes through the classes prop and then reference them in your stylesheet. You can use the following
