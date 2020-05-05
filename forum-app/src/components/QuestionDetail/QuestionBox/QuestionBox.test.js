import React from 'react';
import { render } from '@testing-library/react';
import QuestionBox from './QuestionBox';

const createComponent = (props = {}) => {
	const defaultProps = {
		...props,
	};
	return render(<QuestionBox {...defaultProps} />);
};

describe('Render QuestionBox',  ()=> {
	it('Shoud render QuestionBox without items', () =>{
		const { container } = createComponent();
		expect(container).toBeDefined();
	});
	it('should render QuestionBox find by id',  () => {
		const { getAllByTestId } = createComponent();
		expect(getAllByTestId('questionBoxItemId').length).toBe(1);	
	});
});


