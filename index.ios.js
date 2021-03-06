/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import {
    AppRegistry
} from 'react-native';

import { Provider, connect } from 'react-redux'
import {
    createStore,
    applyMiddleware,
    compose } from 'redux';

import createLogger from 'redux-logger';

import EnterMaxLiftView from './shared/views/enter_max_lift.view';
import ShowPercentagesForLiftView from './shared/views/show_percentages_for_lift.view';
import ShowPlatesForWeight from './shared/views/show_plates_for_weight.view';


import { StackNavigator } from 'react-navigation';

import liftReducer from './shared/reducers/lift_reducer';

const INITIAL = {
    maxBench: null,
    maxSquat: null,
    maxDeadLift: null,
    benchPercentages: [],
    squatPercentages: [],
    deadLiftPercentages: [],
    activePercentages: []
};

const loggerMiddleware = createLogger(
    { predicate: (getState, action) => __DEV__ }
);

function configureStore(initialState) {
    const enhancer = compose(
        applyMiddleware(
            loggerMiddleware
        )
    );
    return createStore(liftReducer, initialState, enhancer);
}

const store = configureStore(INITIAL);

const LiftCalculator = StackNavigator({
    EnterMaxLift: { screen: EnterMaxLiftView },
    ShowPercentagesForLiftView: { screen: ShowPercentagesForLiftView },
    ShowPlatesForWeight: { screen: ShowPlatesForWeight }
});


const App = () => (
    <Provider store={store}>
        <LiftCalculator/>
    </Provider>
);

AppRegistry.registerComponent('LiftCalculator', () => App);
