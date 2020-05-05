import React from 'react';
import { render } from '@testing-library/react';
import AnswerItem from './AnswerItem';
import { formatLocalDateTime } from './fn';

jest.mock('./fn');

const createComponent = (props = {}) => {
	const defaultProps = {
		...props,
	};
	return render(<AnswerItem {...defaultProps} />);
};

describe('Render AnswerItem',  ()=> {
	it('Shoud render AnswerItem without items', () =>{
		const { container } = createComponent();
		expect(container).toBeDefined();
	});
	it('should find by id AnswerItem',  () => {
        const mockProps = {};
		const { getAllByTestId } = createComponent({...mockProps});
        expect(getAllByTestId('answerItemId').length).toBe(1);
    });
    it('should render props', () => {
        formatLocalDateTime.mockImplementation(() => { return 'someDate'; });

        const mockProps = {text:'someText', user:'someUser', creationDate:'someDate'};
		const { getByTestId } = createComponent({...mockProps});

        const text_result = getByTestId('answerItemTextId').textContent;
        const user_result = getByTestId('answerItemUserId').textContent;
        const date_result = getByTestId('answerItemCreationDateId').textContent;

        expect(text_result).toBe('someText');
        expect(user_result).toBe('Usuário: someUser');
        expect(date_result).toBe('Data: someDate')	
    });
});