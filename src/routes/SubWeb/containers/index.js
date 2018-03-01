import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { is, fromJS } from 'immutable'
import { setTime } from '../actions'
import { browserHistory } from 'react-router'

import '../styles/index.scss'

class SubWeb extends Component {
    constructor(props) {
        super(props)
        this._setTime = this._setTime.bind(this)
    }
    state = {

    }
    _setTime(time) {
        this.props.setTime(time)
    }
    componentWillMount() {

    }
    componentDidMount() {
        let { timeReducer } = this.props
        this.timer = setInterval(() => {
            if(timeReducer > 0) {
                this._setTime(timeReducer--)
            } else {
                this._setTime(10)
                browserHistory.push('/')
            }
        }, 1000)
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
        const { timeReducer } = this.props
        return (
            <div className="SubWeb_Wrap">
                <h1>即将回到首页</h1>
                <p>{timeReducer}</p>
            </div>
        )
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
}

const mapStateToProps = (state, ownProps) => {
    return state.subWeb
}
const mapDispatchToProps = (dispatch, ownProps) => ({
    setTime: (time) => {
        dispatch(setTime(time))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(SubWeb)
