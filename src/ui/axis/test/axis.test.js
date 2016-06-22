import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import d3Scale from 'd3-scale';

import Axis, { XAxis, YAxis } from '../';

chai.use(chaiEnzyme());

const dummyScale = d3Scale.scaleLinear();

describe('<Axis />', () => {
  it('renders a g that wraps axis', () => {
    const wrapper = shallow(
      <Axis
        scale={dummyScale}
        orientation="bottom"
      />);
    expect(wrapper)
      .to.have.tagName('g');
  });

  it('renders ticks', () => {
    const wrapper = shallow(
      <Axis
        scale={dummyScale}
        orientation="bottom"
      />);
    expect(wrapper)
      .to.have.descendants('.tick');

    expect(wrapper.find('.tick').first())
      .to.have.tagName('g');
  });

  it('modifies the output of d3-axis based on configuration', () => {
    const wrapper = shallow(
      <Axis
        scale={dummyScale.range([0, 800])}
        orientation="bottom"
        ticks={6}
        tickValues={[1, 2, 3, 4, 5, 6]}
      />
    );
    expect(wrapper.find('.tick')).to.have.length(6);
    expect(wrapper.find('.tick').first().find('text')).to.have.text('1.0');
    expect(wrapper.find('.tick').last().find('text')).to.have.text('6.0');
  });

  it('applies style to the g element', () => {
    const wrapper = shallow(
      <Axis
        scale={dummyScale}
        orientation="bottom"
        style={{ stroke: 'red' }}
      />
    );
    expect(wrapper.children().first()).to.have.attr('style', 'stroke:red;');
  });

  it('renders a label when specified', () => {
    const props = {
      translate: { x: 0, y: 0 },
      padding: { top: 0, bottom: 0, left: 0, right: 0 },
    };
    const wrapper = shallow(
      <Axis
        scale={dummyScale}
        orientation="bottom"
        label="Label"
        {...props}
      />
    );
    chai.expect(wrapper.children().find('text').last()).to.have.text('Label');
  });
});

describe('<XAxis />', () => {
  it('contains an <Axis />', () => {
    const wrapper = shallow(
      <XAxis
        scale={dummyScale}
      />
    );
    const expected = <Axis orientation="bottom" scale={dummyScale} translate={{ x: 0, y: 0 }} />;

    expect(wrapper).to.contain(expected);
  });
});

describe('<YAxis />', () => {
  it('contains an <Axis />', () => {
    const wrapper = shallow(
      <YAxis
        scale={dummyScale}
      />
    );
    const expected = <Axis orientation="left" scale={dummyScale} translate={{ x: 0, y: 0 }} />;

    expect(wrapper).to.contain(expected);
  });
});
