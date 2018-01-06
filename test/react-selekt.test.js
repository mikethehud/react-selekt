import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';

import Selekt from '../src/react-selekt';

describe('<Selekt />', () => {

  let minProps = {
    options: ['one', 'two'],
    selected: [],
    onChange: () => null
  }

  it('renders without dying 💀', () => {
    const wrapper = shallow(<Selekt {...minProps} />);
    expect(wrapper).to.have.length(1);
  });

  it('renders one selector-wrapper', () => {
    const wrapper = shallow(<Selekt {...minProps} />);
    expect(wrapper.find('.selekt-selector-wrapper')).to.have.length(1);
  });

  it('renders one selector-input', () => {
    const wrapper = shallow(<Selekt {...minProps} />);
    expect(wrapper.find('.selekt-selector-input')).to.have.length(1);
  });

  it('toggles the render of selector-ul if selector-input is focused / unfocused', () => {
    const wrapper = shallow(<Selekt {...minProps} />);
    const input = wrapper.find('.selekt-selector-input');
    input.simulate('focus');
    expect(wrapper.find('.selekt-selector-ul')).to.have.length(1);
    input.simulate('blur');
    expect(wrapper.find('.selekt-selector-ul')).to.have.length(0);
  });

  it('renders two selector li for two values in options when selector-input is focused and selected is empty', () => {
    const wrapper = shallow(<Selekt {...minProps} />);
    wrapper.find('.selekt-selector-input').simulate('focus');
    expect(wrapper.find('.selekt-selector-li')).to.have.length(2);
  });

  it('renders one selector li for two values in options when selector-input is focused and selected has one element', () => {
    const wrapper = shallow(<Selekt {...minProps} selected={['one']} />);
    wrapper.find('.selekt-selector-input').simulate('focus');
    expect(wrapper.find('.selekt-selector-li')).to.have.length(1);
  });

  it('renders one selected wrapper', () => {
    const wrapper = shallow(<Selekt {...minProps} />);
    expect(wrapper.find('.selekt-selected-wrapper')).to.have.length(1);
  });

  it('renders no selected ul when select is empty', () => {
    const wrapper = shallow(<Selekt {...minProps} />);
    expect(wrapper.find('.selekt-selected-ul')).to.have.length(0);
  });

  it('renders two selected ul when select is empty', () => {
    const wrapper = shallow(<Selekt {...minProps} />);
    expect(wrapper.find('.selekt-selected-ul')).to.have.length(0);
  });

  it('renders two selected li for two values in selected', () => {
    const wrapper = shallow(<Selekt {...minProps} selected={['one', 'two']} />);
    expect(wrapper.find('.selekt-selected-li')).to.have.length(2);
  });

  it('renders all set classes', () => {
    const classes = {
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
      }
    }

    const wrapper = shallow(<Selekt {...minProps} classes={classes} selected={['one']} />);

    expect(wrapper.find('div.selector-wrapper').exists()).to.equal(true);
    expect(wrapper.find('input.selector-input').exists()).to.equal(true);

    // need to focus input to render selector
    wrapper.find('input.selector-input').simulate('focus');

    expect(wrapper.find('ul.selector-ul').exists()).to.equal(true);
    expect(wrapper.find('li.selector-li').exists()).to.equal(true);

    expect(wrapper.find('div.selected-wrapper').exists()).to.equal(true);
    expect(wrapper.find('ul.selected-ul').exists()).to.equal(true);
    expect(wrapper.find('li.selected-li').exists()).to.equal(true);
  })

  it('renders all set headings', () => {
    const headings = {
      selector: <h1>Testheader 1</h1>,
      selected: <h2>Testheader 2</h2>
    }

    const wrapper = shallow(<Selekt {...minProps} headings={headings} />);

    expect(wrapper.find('h1').text()).to.equal('Testheader 1');
    expect(wrapper.find('h2').text()).to.equal('Testheader 2');
  })

  it('renders one less selected-li when select is updated', () => {
    const wrapper = shallow(<Selekt {...minProps} selected={['one', 'two']} />);
    expect(wrapper.find('.selekt-selected-li')).to.have.length(2);
    wrapper.setProps({ selected: ['one'] });
    expect(wrapper.find('.selekt-selected-li')).to.have.length(1);
  })

  it('adds one selected-li when a selector-li is selected and clears the input field', () => {
    const onChange = sinon.spy();
    const wrapper = mount(<Selekt {...minProps} onChange={onChange} />);
    const input = wrapper.find('.selekt-selector-input');
    input.simulate('focus');
    input.instance().value = 'o';
    input.simulate('change', input);


    // expected to be false since we never changed anything
    expect(onChange.calledOnce).to.equal(false);

    const initialSelectedLength = wrapper.find('.selekt-selected-li').length;

    expect(input.instance().value).to.equal('o');
    wrapper.find('.selekt-selector-li').first().simulate('mousedown');

    // expected to be true since we now changed something
    expect(onChange.calledOnce).to.equal(true);

    // returning selected arg should be one more
    let selectedArgs = onChange.getCall(0).args;
    expect(selectedArgs[0].length).to.equal(initialSelectedLength + 1);

    // cleared input field
    expect(input.instance().value).to.equal('');
  })

  it('removes one selected-li when it is clicked', () => {
    const onChange = sinon.spy();
    const wrapper = mount(<Selekt {...minProps} onChange={onChange} selected={['one']} />);
    wrapper.find('.selekt-selected-li').first().simulate('click');

    const initialSelectedLength = wrapper.find('.selekt-selected-li').length;

    let selectedArgs = onChange.getCall(0).args;
    expect(selectedArgs[0].length).to.equal(initialSelectedLength - 1);
  })

  it('updates the search after text input', () => {
    const wrapper = mount(<Selekt {...minProps} />);
    const input = wrapper.find('.selekt-selector-input');
    input.simulate('focus');
    input.instance().value = 'testsearch';
    input.simulate('change', input)

    expect(wrapper.state('search')).to.equal('testsearch');
  })

  it('removes unfitting selector-li after text input', () => {
    const wrapper = mount(<Selekt {...minProps} />);
    const input = wrapper.find('.selekt-selector-input');
    input.simulate('focus');

    expect(wrapper.find('.selekt-selector-li')).to.have.length(2);

    input.simulate('change', { target: { value: 'one' } });

    expect(wrapper.state('search')).to.equal('one');

    expect(wrapper.find('.selekt-selector-li')).to.have.length(1);
  })

  it('renders a placeholder if one is given', () => {
    const wrapper = mount(<Selekt {...minProps} placeholder="Testplaceholder" />);
    expect(wrapper.find('.selekt-selector-input').prop('placeholder')).to.equal('Testplaceholder');
  })

})
