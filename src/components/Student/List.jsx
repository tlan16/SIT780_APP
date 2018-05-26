import React from 'react'
import ReactTable from "react-table"
import {Button, Col, PageHeader, Row} from "react-bootstrap"
import {LinkContainer} from "react-router-bootstrap"
import {get as getStudent} from "../../services/student"
import {easyFuse} from "../../helpers/fuse"
import GoogleMapLink from "../GoogleMapLink"
import EmailLink from "../EmailLink"

export default class List extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      students: [],
    }

    getStudent(props.authToken)
      .then(res => {
        this.setState({
          students: Object.values(res.body),
        })
      })
  }

  render() {
    return (
      <Row>
        <Col sm={12}>
          <PageHeader>Students
            <LinkContainer to="/new_student" className="pull-right">
              <Button bsSize="large">New Student</Button>
            </LinkContainer>
          </PageHeader>
        </Col>
        <hr />
        {
          this.state.students.length ?
            <Col sm={12}>
              <ReactTable
                filterable
                defaultFilterMethod={(filter, row) =>
                  easyFuse(String(row[filter.id]), filter.value)
                }
                data={this.state.students}
                columns={[
                  {
                    Header: "Student ID",
                    accessor: "student_id",
                  },
                  {
                    Header: "First Name",
                    accessor: "firstname",
                  },
                  {
                    Header: "Last Name",
                    accessor: "lastname",
                  },
                  {
                    Header: "Email",
                    accessor: "email",
                    Cell: row => (
                      <EmailLink email={row.value} />
                    ),
                  },
                  {
                    Header: "Address",
                    accessor: "address",
                    Cell: row => (
                      <GoogleMapLink target="_blank" address={row.value} />
                    ),
                  },
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </Col>
            : undefined
        }
        <br />
      </Row>
    )
  }
}