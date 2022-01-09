import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';

export default class Tabs extends Component {
    render() {
        const tabs = this.props.functions.map((func) =>  {
            return (
                <Nav.Item key={func} className="bg-light font-monospace"><Nav.Link eventKey={func}>{func}</Nav.Link></Nav.Item>
            )
        })

        return (
            <Nav fill variant="pills" defaultActiveKey={this.props.functions[0]} activeKey={this.props.method} onSelect={this.props.onChange}>
                {tabs}
            </Nav>
        );
    }
}


