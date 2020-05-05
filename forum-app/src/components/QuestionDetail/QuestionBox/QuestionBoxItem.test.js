import React from 'react';
import { render } from '@testing-library/react';
import QuestionBoxItem from './QuestionBox';

const createComponent = (props = {}) => {
	const defaultProps = {
		...props,
	};
	return render(<QuestionBoxItem {...defaultProps} />);
};

describe('Render QuestionBoxItem',  ()=> {
	it('Shoud render QuestionBox without items', () =>{
		const { container } = createComponent();
		expect(container).toBeDefined();
	});
	it('should find by id QuestionBoxItem',  () => {
		const mockProps = {};
		const { getAllByTestId } = createComponent({...mockProps});
		expect(getAllByTestId('questionBoxItemId').length).toBe(1);	
	});
});