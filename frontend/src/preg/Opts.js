import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';

function Checkbox(props) {
    return props.opts.includes(props.id)? (
    <Form.Group className="mb-3" controlId={props.id}>
        <Form.Check type="checkbox" name={props.id} label={props.id} checked={props[props.id]} onChange={props.onChange} />
    </Form.Group>
    ): '';
}

export default class Opts extends Component {
    render() {
        return (
<>
{this.props.opts.includes('PREG_SET_ORDER') &&
    <p className="text-muted"><tt>PREG_PATTERN_ORDER</tt> is the default order method.</p>
}
    <Checkbox id="PREG_SET_ORDER" {...this.props} />
    <Checkbox id="PREG_OFFSET_CAPTURE" {...this.props} />
    <Checkbox id="PREG_UNMATCHED_AS_NULL" {...this.props} />
    <Checkbox id="PREG_SPLIT_NO_EMPTY" {...this.props} />
    <Checkbox id="PREG_SPLIT_DELIM_CAPTURE" {...this.props} />
    <Checkbox id="PREG_SPLIT_OFFSET_CAPTURE" {...this.props} />

{this.props.opts.includes('offset') &&
    <Col xl="2" md="3" sm="4" xs="6">
        <InputGroup className="mb-3">
            <InputGroup.Text id="offset">offset</InputGroup.Text>
            <Form.Control type="number" name="offset" placeholder="0" aria-label="offset" aria-describedby="offset" value={this.props.offset ?? ''} onChange={this.props.onChange} min="0" />
        </InputGroup>
    </Col>
}
{this.props.opts.includes('limit') &&
    <Col xl="2" md="3" sm="4" xs="6">
        <InputGroup className="mb-3">
            <InputGroup.Text id="limit">limit</InputGroup.Text>
            <Form.Control type="number" name="limit" placeholder="-1" aria-label="limit" aria-describedby="limit" value={this.props.limit ?? ''} onChange={this.props.onChange} min="-1" />
        </InputGroup>
    </Col>
}
{this.props.opts.includes('delimeter') &&
    <Col xl="2" md="3" sm="4" xs="6">
        <InputGroup className="mb-3">
        <InputGroup.Text id="delimiter">delimiter</InputGroup.Text>
        <Form.Control name="delimiter" aria-label="delimiter" aria-describedby="delimiter" value={this.props.delimiter ?? ''} onChange={this.props.onChange} />
        </InputGroup>
    </Col>
}
</>
        );
    }
}
