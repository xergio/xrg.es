import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

export default class Help extends Component {
    render() {
        return (
<Modal {...this.props} size="xl">
    <Modal.Header closeButton>
        <Modal.Title>Regexp spreadsheet (<a href="http://php.net/manual/en/pcre.pattern.php">full documentation</a>)</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Container>
            <Row>
                <Col>
                    <h4>Pattern Modifiers</h4>
                    <div><code>i</code> PCRE_CASELESS</div>
                    <div><code>m</code> PCRE_MULTILINE</div>
                    <div><code>s</code> PCRE_DOTALL</div>
                    <div><code>x</code> PCRE_EXTENDED</div>
                    <div><code>A</code> PCRE_ANCHORED</div>
                    <div><code>D</code> PCRE_DOLLAR_ENDONLY</div>
                    <div><code>S</code> Extra analysis</div>
                    <div><code>U</code> PCRE_UNGREEDY</div>
                    <div><code>X</code> PCRE_EXTRA</div>
                    <div><code>J</code> PCRE_INFO_JCHANGED</div>
                    <div><code>u</code> PCRE_UTF8</div>
                </Col>

                <Col>
                    <h4>Meta-characters outside <code>[ ]</code></h4>
                    <div><code>\</code> general escape character</div>
                    <div><code>^</code> assert start of subject (or line, in multiline mode)</div>
                    <div><code>$</code> assert end of subject (or line, in multiline mode)</div>
                    <div><code>.</code> match any character except newline (by default)</div>
                    <div><code>[ ]</code> character class definition</div>
                    <div><code>|</code> start of alternative branch</div>
                    <div><code>( )</code> subpattern</div>
                    <div><code>?</code> extends the meaning of '(', also 0 or 1 quantifier</div>
                    <div><code>*</code> 0 or more quantifier</div>
                    <div><code>+</code> 1 or more quantifier</div>
                    <div><code>{'{ }'}</code> min/max quantifier, {'{n[,n]}'}</div>

                    <h4 className="mt-4">Meta-characters inside <code>[ ]</code></h4>
                    <div><code>\</code> general escape character</div>
                    <div><code>^</code> negate the class, but only if the first character</div>
                    <div><code>-</code> indicates character range</div>

                    <h4 className="mt-4">Others</h4>
                    <div><code>{'\\1-9'}</code> in-group back references</div>
                    <div><code>(?P&lt;lbl&gt;...)</code> labelize subpatterns</div>
                    <div><code>(?:...)</code> non-capture group</div>
                    <div><code>(?&gt;...)</code> Atomic group</div>
                    <div><code>(?=...)</code> Positive lookahead</div>
                    <div><code>(?!...)</code> Negative lookahead</div>
                    <div><code>(?&lt;=..)</code> Positive lookbehind</div>
                    <div><code>(?&lt;!..)</code> Negative lookbehind</div>
                    <div><code>(?(?=.).|.)</code> if . then . else .</div>
                    <div><code>(?#...)</code> Comment</div>
                </Col>

                <Col>
                    <h4>Scape sequences</h4>
                    <div><code>\a</code> alarm, that is, the BEL character (hex 07)</div>
                    <div><code>\cx</code> "control-x", where x is any character</div>
                    <div><code>\e</code> escape (hex 1B)</div>
                    <div><code>\f</code> formfeed (hex 0C)</div>
                    <div><code>\n</code> newline (hex 0A)</div>
                    <div><code>\r</code> carriage return (hex 0D)</div>
                    <div><code>\R</code> line break: matches \n, \r and \r\n</div>
                    <div><code>\t</code> tab (hex 09)</div>
                    <div><code>\p{'{xx}'}</code> a character with the xx <a href="http://www.php.net/manual/en/regexp.reference.unicode.php">property</a></div>
                    <div><code>\P{'{xx}'}</code> a character without the xx <a href="http://www.php.net/manual/en/regexp.reference.unicode.php">property</a></div>
                    <div><code>\xhh</code> character with hex code hh</div>
                    <div><code>\ddd</code> character with octal code ddd, or backreference</div>
                    <div><code>\d</code> any decimal digit</div>
                    <div><code>\D</code> any character that is not a decimal digit</div>
                    <div><code>\s</code> any whitespace character</div>
                    <div><code>\S</code> any character that is not a whitespace character</div>
                    <div><code>\h</code> any horizontal whitespace character</div>
                    <div><code>\H</code> any character that is not a horizontal whitespace</div>
                    <div><code>\v</code> any vertical whitespace character</div>
                    <div><code>\V</code> any character that is not a vertical whitespace character</div>
                    <div><code>\w</code> any "word" character</div>
                    <div><code>\W</code> any "non-word" character</div>
                    <div><code>\b</code> word boundary</div>
                    <div><code>\B</code> not a word boundary</div>
                    <div><code>\A</code> start of subject (independent of multiline mode)</div>
                    <div><code>\Z</code> end of subject or newline at end (independent of multiline mode)</div>
                    <div><code>\z</code> end of subject (independent of multiline mode)</div>
                    <div><code>\G</code> first matching position in subject</div>
                </Col>
            </Row>
        </Container>
    </Modal.Body>
</Modal>
        )
    }
}
