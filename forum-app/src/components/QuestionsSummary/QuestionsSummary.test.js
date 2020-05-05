import React from 'react';
import { render } from '@testing-library/react';
import QuestionsSummary from './QuestionsSummary';

const createComponent = (props = {}) => {
	const defaultProps = {
		...props,
	};
	return render(<QuestionsSummary {...defaultProps} />);
};

describe('Render QuestionsSummary',  ()=> {
	it('Shoud render QuestionsSummary without items', () =>{
		const { container } = createComponent({});
		expect(container).toBeDefined();
	});
	it('should render QuestionsSummary with 1 item',  () => {
		const { getAllByTestId  } = createComponent({
			questions:[{text: 'Aqui', answers: [{}], id: '111'}]
		});
		expect(getAllByTestId('questionSummaryItemId').length).toBe(1);	
	});
});


