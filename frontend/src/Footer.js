import React, { Component } from 'react';

import { BsTwitter } from "react-icons/bs";

export default class Footer extends Component {
  render() {
    return (
<footer>
    <small>
        Coded by <a href="https://sergio.am">Sergio Álvarez</a>{' '}
        <span className="text-muted">¦</span>{' '}
        Build <a href="https://sergio.am/code/xrg.es"><tt>{process.env.REACT_APP_GIT_SHA}</tt></a>.</small>
</footer>
    )
  }
}
//Tag: <a href={'https://sergio.am/code/xrg.es/src/tag/'+process.env.REACT_APP_GIT_TAG}>{process.env.REACT_APP_GIT_TAG}</a>