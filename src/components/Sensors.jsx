import React from 'react'
import ReactTable from "react-table"
import {ProgressBar} from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import {get as getSensors} from "../services/sensor"
import {easyFuse} from "../helpers/fuse"

export default class Sensors extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sensors: [],
    }

    getSensors(props.authToken)
      .then(res => {
        this.setState({
          sensors: Object.values(res.body.sensorreadinglist),
        })
      })
  }

  getScaledRow = (row, key) => {
    let min = undefined
    let max = undefined
    row.value = parseFloat(row.value)

    for (const object of this.state.sensors) {
      const value = parseFloat(object[key])
      if (min === undefined || value < min) min = value
      if (max === undefined || value > max) max = value
    }

    const bsStyle = (row.value - min) / (max - min) > 0.8 ? 'danger' : 'success'

    const margin = (max - min) * 0.5
    min = min - min * margin
    max = max + max * margin

    const percentage = Math.floor(
      (row.value - min) / (max - min) * 100,
    )

    return (
      <span>
        <ProgressBar
          now={percentage}
          label={row.value}
          bsStyle={bsStyle}
          data-tip={row.value}
        />
        <ReactTooltip />
      </span>
    )
  }

  render() {
    return (
      <div>
        <h1>Sensors</h1>
        {
          this.state.sensors.length ?
            <ReactTable
              filterable
              defaultFilterMethod={(filter, row) =>
                easyFuse(String(row[filter.id]), filter.value)
              }
              data={this.state.sensors}
              columns={[
                {
                  Header: "xbee ID",
                  accessor: "xbeeid",
                },
                {
                  Header: "mote ID",
                  accessor: "moteid",
                },
                {
                  Header: "Location",
                  accessor: "motelocation",
                },
                {
                  Header: "Hub",
                  accessor: "hubname",
                },
                {
                  Header: "Temperature",
                  accessor: "temperature",
                  Cell: row => this.getScaledRow(row, 'temperature'),
                },
                {
                  Header: "Air pressure",
                  accessor: "airpressure",
                  Cell: row => this.getScaledRow(row, 'airpressure'),
                },
                {
                  Header: "Humidity",
                  accessor: "humidity",
                  Cell: row => this.getScaledRow(row, 'humidity'),
                },
                {
                  Header: "Light",
                  accessor: "light",
                  Cell: row => this.getScaledRow(row, 'light'),
                },
                {
                  Header: "altitude",
                  accessor: "altitude",
                  Cell: row => this.getScaledRow(row, 'altitude'),
                },
                {
                  Header: "mic",
                  accessor: "mic",
                  Cell: row => this.getScaledRow(row, 'mic'),
                },
                {
                  Header: "gas",
                  accessor: "gas",
                  Cell: row => this.getScaledRow(row, 'gas'),
                },
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
            : undefined
        }
      </div>
    )
  }
}