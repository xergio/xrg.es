import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';

export default class Fields extends Component {
    render() {
        return (
<>
{this.props.fields.includes('pattern') &&
    <Form.Group className="mb-3" controlId="pattern">
        <Form.Label>Regular Expression / Pattern</Form.Label>
        <Form.Control type="text" onChange={this.props.onChange} name="pattern" value={this.props.pattern}  placeholder="#...#" className="font-monospace" />
    </Form.Group>
}
{this.props.fields.includes('replacement') &&
    <Form.Group className="mb-3" controlId="replacement">
        <Form.Label>Replacement</Form.Label>
        <Form.Control type="text" onChange={this.props.onChange} name="replacement" value={this.props.replacement}  />
    </Form.Group>
}
{this.props.fields.includes('subject') &&
    <Form.Group className="mb-3" controlId="subject">
        <Form.Label>String / Subject</Form.Label>
        <Form.Control as="textarea" onChange={this.props.onChange} name="subject" value={this.props.subject} rows={3} />
    </Form.Group>
}
</>
        );
    }
}
