import React, { Component } from 'react';

import { BsTwitter } from "react-icons/bs";

export default class Footer extends Component {
  render() {
    return (
<footer>
    <small>
        Coded by <a href="https://twitter.com/xergio">Sergio Álvarez <BsTwitter /></a>{' '}
        <span className="text-muted">¦</span>{' '}
        Build <a href="https://sergio.am/code/xrg.es"><tt>{process.env.REACT_APP_GIT_SHA}</tt></a> Tag: <a href={'https://sergio.am/code/xrg.es/src/tag/'+process.env.REACT_APP_GIT_TAG}>{process.env.REACT_APP_GIT_TAG}</a>.</small>
</footer>
    )
  }
}
