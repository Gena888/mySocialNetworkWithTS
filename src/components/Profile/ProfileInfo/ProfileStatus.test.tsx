import React, { ReactInstance } from 'react';
import { create, ReactTestInstance } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus'


describe('ProfileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status='GENA STATUS' />);
        const instance = component.getInstance() as any;
        expect(instance.state.status).toBe('GENA STATUS');
    })

    test('after create Input shouldnt be', () => {
        const component = create(<ProfileStatus status='GENA STATUS' />);
        const root = component.root;
        expect(() => {
            let input = root.findByType('input');
        }).toThrow();
    })

    test('After creation <span> should be displayed', () => {
        const component = create(<ProfileStatus status='GENA STATUS' />);
        const root = component.root as any;
        let span = root.findByType('span');
        expect(span.length).not.toBeNull();
    })

    test('After creation <span> should contains correct status', () => {
        const component = create(<ProfileStatus status='GENA STATUS' />);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.children[0]).toBe('GENA STATUS');
    })

    test('input should be displayed in editMode instead of span', () => {
        const component = create(<ProfileStatus status='GENA STATUS' />);
        const root = component.root;
        let span = root.findByType('span');
        span.props.onClick();
        let input = root.findByType('input');
        input.props.value
        expect(input.props.value).toBe('GENA STATUS');
    })

    test('status from props should be in the state', () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status='GENA STATUS' updateStatusThunk={mockCallback} />);
        const instance = component.getInstance() as any;
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    })

})