import profileReducer, { profileReducerActions } from './profile-reducer';
import React from 'react';
import { postDataType } from '../types/types';

type InitialStateType = typeof state 

let state = {
    postsData: [
        { id: 1, likes: 121, message: 'hallow it.s me' },
        { id: 2, likes: 231, message: 'it is my firs post' },
        { id: 3, likes: 321, message: 'second post hear' }
    ] as Array<postDataType>
};


test('length of postsData should be incremented', () => {
    let action = profileReducerActions.addNewPostAC('test text');
    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(4);

});

test('message of new post is correct', () => {
    let action = profileReducerActions.addNewPostAC('test text');
    let newState = profileReducer(state, action);

    expect(newState.postsData[3].message).toBe('test text');

});

test('length afted deliting should be decrement', () => {
    let action = profileReducerActions.deletePostAC(1);
    let newState = profileReducer(state, action);

    expect(newState.postsData.length).toBe(2);

});



