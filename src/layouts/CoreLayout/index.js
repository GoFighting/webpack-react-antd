import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'

export const CoreLayout = ({ children }) => {
	class Main extends Component {
        render() {
            return (
                <div className="Main-Component">
                    {children}
                </div>
            )
        }
    }
    return <Main />
}

CoreLayout.propTypes = {
    children: React.PropTypes.element.isRequired
}

export default CoreLayout
