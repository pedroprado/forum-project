import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import QuestionSummaryItem from './QuestionSummaryItem';

const createComponent = (props = {}) => {
	const defaultProps = {
		...props
	};
	return render(<QuestionSummaryItem {...defaultProps} />);
};

describe('Render QuestionSummaryItem', ()=>{
	const itemsMock = [{ 
        id: "5eaf02c5fe9628569be44100",
        itemId: "5eaef01e39d2404c2e7e245f",
        type: 1,
        user: "ooMary",
        liked: true,
        creationDate: "2020-05-03T17:43:33.631505"}];

	test('renders container', () => {
		const { container } = createComponent({likes: itemsMock});
		expect(container).toBeDefined();
	});
	test('click onQuestionSelected executed', () => {
		const mockFunc = jest.fn();
		const { getByTestId } = createComponent({onQuestionSelected: mockFunc});
		fireEvent.click(getByTestId('questionSummaryItemTextId'));
		expect(mockFunc).toHaveBeenCalled();
	});
});

afterEach(cleanup);