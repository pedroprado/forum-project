import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BackButton from './BackButton';

const createComponent = (props = {}) => {
	const defaultProps = {
		...props,
	};
	return render(<BackButton {...defaultProps} />);
};

describe('Render BackButton',  ()=> {
	it('Shoud render QuestionBox without items', () =>{
		const { container } = createComponent();
		expect(container).toBeDefined();
	});
	it('should find by id BackButton',  () => {
		const { getAllByTestId } = createComponent();
		expect(getAllByTestId('backButtonId').length).toBe(1);	
    });
    it('should process clicked', () => {
		const mockFunc = jest.fn();
        const { getByTestId } = createComponent({clicked: mockFunc});
		fireEvent.click(getByTestId('backButtonId'));
		expect(mockFunc).toHaveBeenCalled();
	});

});