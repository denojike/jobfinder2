import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

import JobCount from './JobCount';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('JobCount Component', () => {
  it('renders job counts correctly', () => {
    act(() => {
      render(<JobCount count="2300" />, container);
    });
    expect(container.textContent).toMatch('2300 Jobs found');

    act(() => {
      render(<JobCount count="1300" />, container);
    });
    expect(container.textContent).toMatch('1300 Jobs found');
  });

  it('it renders singular form when job is 1 or 0', () => {
    act(() => {
      render(<JobCount count="1" />, container);
    });
    expect(container.textContent).toMatch('1 Job found');
    act(() => {
      render(<JobCount count="0" />, container);
    });
    expect(container.textContent).toMatch('0 Job found');
  });
});
