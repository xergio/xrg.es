import React, { Component } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { BsFillQuestionCircleFill, BsFillInfoCircleFill } from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class Header extends Component {
    state = {
        copied: false,
    };

    render() {
        return (
<Navbar bg="light" expand="sm">
    <Container>
        <Navbar.Brand href="/">
            <img
                alt=""
                src="/img/safari-pinned-tab.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
            <strong>XRG</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="/">RegExp</Nav.Link>
                <Nav.Link href="/dencode">D/Encode</Nav.Link>
            </Nav>
            <Nav>
            {this.props.hash && 
                <Nav.Link href={this.props.hash} title="Permalink" className="text-success">
                    <CopyToClipboard text={this.props.hash} onCopy={() => this.setState({copied: true})}>
                        <FiPaperclip />
                    </CopyToClipboard>
                </Nav.Link>
            }
                <Nav.Link href={'https://php.net/'+this.props.method} title="PHP.net documentation"><BsFillInfoCircleFill /></Nav.Link>
                <Nav.Link href="#help" title="Help" onClick={this.props.onClick}><BsFillQuestionCircleFill /></Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>
        )
    }
}
