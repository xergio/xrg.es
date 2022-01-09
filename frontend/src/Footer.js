import React, { Component } from 'react';

import { BsFileEarmarkCodeFill, BsTwitter } from "react-icons/bs";

export default class Footer extends Component {
  render() {
    return (
<footer>
    <small>
        Coded by <a href="https://twitter.com/xergio">Sergio Álvarez <BsTwitter /></a>{' '}
        <span className="text-muted">¦</span>{' '}
        <a href="https://sergio.am/code/xrg.es"><BsFileEarmarkCodeFill /></a></small>
</footer>
    )
  }
}
