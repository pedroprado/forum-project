import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AnswerForm from './AnswerForm';

const createComponent = (props = {}) => {
	const defaultProps = {
		...props,
	};
	return render(<AnswerForm {...defaultProps} />);
};

describe('Render AnswerForm',  ()=> {
	it('Shoud render AnswerForm without items', () =>{
		const { container } = createComponent();
		expect(container).toBeDefined();
	});
	it('should find by id AnswerForm',  () => {
		const { getAllByTestId } = createComponent();
		expect(getAllByTestId('answerFormId').length).toBe(1);	
    });
    it('should process submit', () => {
        const mockFunc = jest.fn();;
        const { getByTestId } = createComponent({onNewAnswerSubmit: mockFunc});
		fireEvent.submit(getByTestId('answerFormId'));
		expect(mockFunc).toHaveBeenCalled();
	});
    it('should process changeAnswer', () => {
        const mockFunc = jest.fn();
        const { getByTestId } = createComponent({onNewAnswerChange: mockFunc});
        const textArea = getByTestId('answerChangeId');
		fireEvent.change(textArea, { target: { value: 'changed' } });
        expect(textArea.value).toBe('changed');
        expect(mockFunc).toHaveBeenCalled();
	});
});

