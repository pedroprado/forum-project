import React from 'react';
import { render, fireEvent, findAllByTestId } from '@testing-library/react';
import LikeButton from './LikeButton';

const createComponent = (props = {}) => {
	const defaultProps = {
		...props,
	};
	return render(<LikeButton {...defaultProps} />);
};

describe('LikeButton', () => {

    const itemsMock = [{ 
        id: "5eaf02c5fe9628569be44100",
        itemId: "5eaef01e39d2404c2e7e245f",
        type: 1,
        user: "ooMary",
        liked: true,
        creationDate: "2020-05-03T17:43:33.631505"}];

    describe('Render', () =>{
        test('should exist', ()=>{
            const {container} = createComponent();
            expect(container).toBeDefined();
        });
        test('should render img filled', () => {
            const {getByTestId} = createComponent({username: "ooMary", items:itemsMock});

            const img = getByTestId('likeButtonImgId');
            expect(img.src).toMatch(/likeiconfilled.png/);
        });
        test('should render img not filled', () => {
            const {getByTestId} = createComponent({username: "ooMary", items:[]});

            const img = getByTestId('likeButtonImgId');
            expect(img.src).toMatch(/likeicon.png/);
        });
        test('clicked', () => {
            const mockFunc = jest.fn();
            const {getByTestId} = createComponent({clicked:mockFunc});
            fireEvent.click(getByTestId('likeButtonId'));
            expect(mockFunc).toHaveBeenCalled();
        });
    });
});