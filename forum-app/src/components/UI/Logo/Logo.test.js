import React from 'react';
import { render } from '@testing-library/react';
import Logo from './Logo';

const createComponent = (props = {}) => {
	const defaultProps = {
		...props,
	};
	return render(<Logo {...defaultProps} />);
};

describe('Render Logo',  ()=> {
	it('Shoud render QuestionBox without items', () =>{
		const { container } = createComponent();
		expect(container).toBeDefined();
	});
	it('should find by id Logo',  () => {
		const { getAllByTestId } = createComponent();
		expect(getAllByTestId('logoId').length).toBe(1);	
    });
    it('should find text', () => {
        const { getByTestId } = createComponent();
		const text = getByTestId('logoId').textContent;
		expect(text).toBe('Fórum');
    });
});