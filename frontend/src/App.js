
import React, { Component } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Header from "./Header";
import Tabs from "./preg/Tabs";
import Opts from "./preg/Opts";
import Fields from "./preg/Fields";
import Return from "./preg/Return";
import Code from "./preg/Code";
import Output from "./preg/Output";
import Footer from "./Footer";
import Help from "./preg/Help";

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            method: 'preg_match',
            pattern: '',
            replacement: '',
            subject: '',
            offset: null,
            limit: null,
            delimiter: null,
            PREG_OFFSET_CAPTURE: false,
            PREG_UNMATCHED_AS_NULL: false,
            PREG_SET_ORDER: false,
            PREG_SPLIT_NO_EMPTY: false,
            PREG_SPLIT_DELIM_CAPTURE: false,
            PREG_SPLIT_OFFSET_CAPTURE: false,
            response: {},
            help: false
        }

        this.timer = null
        this.apiUrl = '/api/preg'
        //this.apiUrl = 'http://localhost:8086/api/preg'
        this.maps = {
            'preg_match': {
                'fields': ['pattern', 'subject'],
                'opts': ['PREG_OFFSET_CAPTURE', 'PREG_UNMATCHED_AS_NULL', 'offset']
            },
            'preg_match_all': {
                'fields': ['pattern', 'subject'],
                'opts': ['PREG_PATTERN_ORDER', 'PREG_SET_ORDER', 'PREG_OFFSET_CAPTURE', 'PREG_UNMATCHED_AS_NULL', 'offset']
            },
            'preg_split': {
                'fields': ['pattern', 'subject'],
                'opts': ['PREG_SPLIT_NO_EMPTY', 'PREG_SPLIT_DELIM_CAPTURE', 'PREG_SPLIT_OFFSET_CAPTURE', 'limit']
            },
            'preg_replace': {
                'fields': ['pattern', 'subject', 'replacement'],
                'opts': ['limit']
            },
            'preg_quote': {
                'fields': ['pattern'],
                'opts': ['delimeter']
            }
        }
    }

    componentDidMount() {
        window.addEventListener("hashchange", this.hashChange, false)
        this.hashChange()
    }

    hashChange = () => {
        const hash = window.location.hash.replace(/^#/, '')

        if (hash && hash !== 'close' && hash !== 'help' && hash !== this.state.response.hash) {
            axios.get(this.apiUrl, { params: { hash } }).then((res) => {
                this.setState({ ...res.data, response: {} }, () => {
                    this.api()
                })
            })
        }
    }

    methodSelect = (method) => {
        this.setState({method}, this.api)
    }

    handleInputChange = (event) => {
        const target = event.target
        const value = (target.type === 'checkbox')? 
            target.checked: 
            (target.type === 'number'? 
                parseInt(target.value): 
                target.value)
        const name = target.name

        this.setState({ [name]: value }, this.delay)
    }

    api = () => {
        const { response, help, ...state } = this.state

        axios.post(this.apiUrl, state).then((res) => {
            this.setState({ response: res.data }, () => {
                if ('hash' in res.data) {
                    window.location.hash = '#'+res.data.hash;
                }
            })
        }).catch((error) => {
            //console.log(error.response)
            this.setState({ response: {
                fatal: (error.response? error.response.data.fatal: error.message)
            } }, () => {
                window.history.replaceState(null, null, ' ');
            })
        });
    }

    delay = () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(this.api, 200)
    }

    showHelp = (show) => {
        this.setState({ help: show })
    }

    render() {
        const { method, pattern, replacement, subject, response, help, ...state } = this.state
        const maps = this.maps[method]

        return (
<>
    <Header method={method} hash={response.hash? window.location.origin+"/#"+response.hash: null} onClick={() => this.showHelp(true)} />

    <Container>
        <Row className="mt-3 mb-3">
            <Col>
                <Tabs method={method} functions={Object.keys(this.maps)} onChange={this.methodSelect} />
            </Col>
        </Row>

        <Fields method={method} fields={maps.fields} pattern={pattern} replacement={replacement} subject={subject} onChange={this.handleInputChange} />

        <div className="separator">options</div>
        <Opts method={method} opts={maps.opts} {...state} onChange={this.handleInputChange} />

        <Row className="mt-3">
            <Col xs="3" sm="2">
                <div className="separator">return</div>
                <Return response={response} />
            </Col>
            <Col>
                <div className="separator">snippet</div>
                <Code response={response} />
            </Col>
        </Row>

        <Row className="mt-3">
            <Col>
                <div className="separator">$matches or result</div>
                <Output response={response} />
            </Col>
        </Row>

        <Row className="mt-3 text-end">
            <Col>
                <Footer />
            </Col>
        </Row>
    </Container>

    <Help show={help} onHide={() => this.showHelp(false)} />
</>
        );
    }
}
