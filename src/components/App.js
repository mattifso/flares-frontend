import React from 'react'
import { connect } from 'react-redux'
import { initFlares } from '../reducers/flaresReducer'
import { Table } from 'react-bootstrap'

class App extends React.Component {

  componentDidMount() {
    this.props.initFlares()
  }

  render() {
    if (!this.props.flares) {
      return (
        <div className="container">
          Loading flare data
        </div>)
    }
    return (
      <div className="container">
        <h1>
          Solar flares of 2016
        </h1>

        <h3>
          Most common class of flare: {this.props.flares.mostCommonClass}
        </h3>

        <Table>
          <tbody>
            <tr>
              <th>The top 5 most active regions:</th>
            </tr>
            {this.props.flares.activityCounts.map(flare =>
              <tr key={flare.region}>
                <td>
                  {flare.region}
                </td>
                <td>
                  {flare.count}
                </td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    flares: state.flares
  }
}

const mapDispatchToProps = {
  initFlares
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp