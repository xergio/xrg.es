import React, { Component } from 'react';

function createMarkup(html) {
    return {__html: html}
}

export default class Code extends Component {
  render() {
    const { response } = this.props;

    return (
<>
{'code' in response &&
    <code dangerouslySetInnerHTML={createMarkup(response.code)} />
}
</>
    )
  }
}
