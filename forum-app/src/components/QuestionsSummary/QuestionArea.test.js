import React from 'react';
import { render } from '@testing-library/react';
import QuestionArea from './QuestionArea';

const createComponent = (props = {}) => {
	const defaultProps = {
		...props
	};
	return render(<QuestionArea {...defaultProps} />);
};

describe('Render <QuestionArea/>', () => {
    it('Should render the component', () => {
        const { container } = createComponent();
        expect(container).toBeDefined();
    }); 
    it('Should render the div', () => {
        const { getByTestId } = createComponent();
        const div = getByTestId('DivQuestionForm');
        expect(div).toBeDefined();
    });
});
