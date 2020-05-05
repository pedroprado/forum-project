import React from 'react';
import { render } from '@testing-library/react';
import AnswerList from './AnswerList';

const createComponent = (props = {}) => {
	const defaultProps = {
		...props,
	};
	return render(<AnswerList {...defaultProps} />);
};

describe('Render AnswerList',  ()=> {
	it('Shoud render AnswerList without items', () =>{
		const { container } = createComponent();
		expect(container).toBeDefined();
	});
	it('should render AnswerList with one item',  () => {
        const mockAnswer = [{text:"someText", user:"someUser", creationDate:"someDate", id:"111"}];
		const { getAllByTestId } = createComponent({answerList : [...mockAnswer]});
		expect(getAllByTestId('answerItemId').length).toBe(1);	
	});
});


