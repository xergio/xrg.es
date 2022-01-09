import React, { Component } from 'react';

export default class Return extends Component {
    render() {
        const { response } = this.props;

        return (
<>
{'returnType' in response && 'returnValue' in response &&
    <span>
        <code>{response.returnType}</code>:{' '}<code>{response.returnValue}</code>
    </span>
}
</>
        )
    }
}

