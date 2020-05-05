import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuestionForm from './QuestionForm';

const createComponent = (props = {}) => {
	const defaultProps = {
		...props,
	};
	return render(<QuestionForm {...defaultProps} />);
};

describe('Render QuestionForm',  ()=> {
	it('Shoud render QuestionForm without items', () =>{
		const { container } = createComponent();
		expect(container).toBeDefined();
	});
	it('should find by id QuestionForm',  () => {
		const { getAllByTestId } = createComponent();
		expect(getAllByTestId('questionFormId').length).toBe(1);	
    });
    it('should process submit', () => {
        const mockFunc = jest.fn();;
        const { getByTestId } = createComponent({onNewQuestionSubmit: mockFunc});
		fireEvent.submit(getByTestId('questionFormId'));
		expect(mockFunc).toHaveBeenCalled();
    });
    it('should process changeQuestion', () => {
        const mockFunc = jest.fn();
        const { getByTestId } = createComponent({onNewQuestionChange: mockFunc});
        const textArea = getByTestId('questionChangeId');
		fireEvent.change(textArea, { target: { value: 'changed' } });
        expect(textArea.value).toBe('changed');
        expect(mockFunc).toHaveBeenCalled();
    });
});

