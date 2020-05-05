import React from 'react';
import { render } from '@testing-library/react';
import ApiError from './ApiError';

describe('Render ApiError', () => {
    const createComponent = (props = {}) => {
        const defaultProps = {
            ...props,
        };
        return render(<ApiError {...defaultProps} />);
    };
    test('should render component', () => {
        const component = createComponent({message: 'message'});
        
        expect(component).toBeDefined();
    });
    test('should render without error', () => {
        const mockMessage = 'mockMessage';
        const { getAllByTestId } = createComponent({error: false, message: mockMessage});
        
        expect(getAllByTestId('apiErrorNotErrorId').length).toBe(1);
    })
    test('should render with error', () => {
        const mockMessage = 'mockMessage';
        const { getAllByTestId, getByTestId } = createComponent({error: true, message: mockMessage});
        
        expect(getAllByTestId('apiErrorId').length).toBe(1);
        expect(getAllByTestId('messageSpanId').length).toBe(1);	
        const span_message = getByTestId('messageSpanId').textContent;
        expect(span_message).toBe(mockMessage);
    });
});