import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

const createComponent = (props = {}) => {
	const defaultProps = {
		...props
	};
	return render(<App {...defaultProps} />);
};

test('should render App', () => {
  const { container } = createComponent();
  expect(container).toBeDefined();
});
