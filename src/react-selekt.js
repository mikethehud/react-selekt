import React from "react";

class Selekt extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      options: [],
      selected: [],
      focused: false,
      search: ''
    }

    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleSelect = this._handleSelect.bind(this);
    this._handleRemove = this._handleRemove.bind(this);
    this._handleSearchChange = this._handleSearchChange.bind(this);
    this._clearInput = this._clearInput.bind(this);

    this.updateProps = this.updateProps.bind(this);
  }

  componentWillMount() {
    this.updateProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateProps(nextProps);
  }

  updateProps (props) {
    const { options, selected } = props;

    this.setState({
      options: options ? options : [],
      selected: selected ? selected : []
    })
  }

  _handleFocus = () => {
    this.setState({ focused: true })
  }

  _handleBlur = () => {
    this.setState({ focused: false })
  }

  _handleSelect = (e) => {
    let value = e.target.dataset.value;

    let selected = this.state.selected.concat(value);
    // Send update to onChange method
    this.props.onChange(selected);
  }

  _handleRemove = (e) => {
    let value = e.target.dataset.value;

    let selected = this.state.selected.filter((item) => item != value);
    // Send update to onChange method
    this.props.onChange(selected);
    this._clearInput();
  }

  _handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  }

  _clearInput = () => {
    this.setState({ search: '' })
  }

  render() {

    const { options, selected, focused, search } = this.state;
    const { headings, classes } = this.props;

    return (

      <div>

        {
          /*
          *
          *     SELECTOR
          *
          */
        }

        <div className={(classes && classes.selector && classes.selector.wrapper) ? classes.selector.wrapper : ''}>
          {
            headings &&
            headings.selector
          }
          <input
            type="text"
            onFocus={this._handleFocus}
            onBlur={this._handleBlur}
            onChange={this._handleSearchChange}
            value={search}
            className={(classes && classes.selector && classes.selector.input) ? classes.selector.input : ''}
          />
          {
            /*
            * Render options window only if input is focused
            */
            focused &&
            <ul className={(classes && classes.selector && classes.selector.ul) ? classes.selector.ul : ''}>
              {
                options
                  // Filter the options, remove already selected and check search text
                  .filter((item) => {

                    let rgx = /[^A-Za-z0-9\s!?]/g;

                    let compare = {
                      item: item.toUpperCase(),
                      search: search.replace(rgx,'').toUpperCase()
                    }

                    return selected.indexOf(item) == -1 && compare.item.includes(compare.search);
                  })
                  .map((item, i) => {
                    return (
                      <li
                        key={i}
                        data-value={item}
                        onMouseDown={this._handleSelect}
                        className={(classes && classes.selector && classes.selector.li) ? classes.selector.li : ''}
                      >
                        {item}
                      </li>
                    )
                  })
              }
            </ul>
          }
        </div>

        {
          /*
          *
          *     SELECTED
          *
          */
        }

        <div className={(classes && classes.selected && classes.selected.wrapper) ? classes.selected.wrapper : ''}>
          {
            headings && headings.selected &&
            headings.selected
          }
          {

            selected.length > 0 &&
            <ul className={(classes && classes.selected && classes.selected.ul) ? classes.selected.ul : ''}>
              {
                selected
                  .map((item, i) => {
                    return (
                      <li
                        key={i}
                        data-value={item}
                        onClick={this._handleRemove}
                        className={(classes && classes.selected && classes.selected.li) ? classes.selected.li : ''}
                      >
                        {item}
                      </li>
                    )
                  })
              }
            </ul>
          }
        </div>

      </div>
    )
  }


}

export default Selekt;
