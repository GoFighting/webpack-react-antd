import React, { Component, PropTypes } from 'react'
import { is, fromJS } from 'immutable'
import { browserHistory } from 'react-router'

import '../styles/index.scss'

export default class Home extends Component {
    constructor(props) {
        super(props)
    }
    state = {

    }
    componentWillMount() {

    }
    componentDidMount() {

    }
    componentWillReceivePorps(nextProps) {

    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state),fromJS(nextState))
    }
    componentWillUpdate(nextProps, nextState) {

    }
    componentDidUpdate() {

    }
    render() {
        return (
            <div className="Home_Wrap">
                <h1>Hello World!!!</h1>
                <p onClick={e => browserHistory.push('/subWeb')}>快点我</p>
            </div>
        )
    }
    componentWillUnmount() {

    }
}
