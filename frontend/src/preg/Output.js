import React, { Component } from 'react';

import Table from 'react-bootstrap/Table'

function mapObject(object, callback) {
  return Object.keys(object).map(key => {
    return callback(key, object[key])
  })
}

const DumpList = (props) => {
  const type = typeof props.dump

  if (type === "object") {
    if (Object.keys(props.dump).length === 0) {
      return <tt className="text-secondary">[]</tt>
    }

    const items = mapObject(props.dump, (key, value) => {
      if (['number', 'string'].includes(typeof value)) {
        // .replace(" ", '⎵')
        return (
            <tr key={key}>
                <td className="table-active text-end text-muted font-monospace">{key}</td>
                <td className="px-2">{value}</td>
            </tr>
        )
      } else {
        return (
            <tr key={key}>
                <td className="table-active text-end text-muted font-monospace">{key}</td>
                <td><DumpList dump={value} indent={props.indent + 1} /></td>
            </tr>
        )
      }
    })

    return (
      <Table borderless variant="light" size="sm">
        <tbody>
          {items}
        </tbody>
      </Table>
    )

  } else if (type === 'string') {
    return (<tt>{props.dump}</tt>)
  }

  return (<em>empty result</em>)
}

export default class Output extends Component {
  render() {
    const { response } = this.props;

    return (
<>
{'fatal' in response &&
    <div>
        <code>{response.fatal}</code>
    </div>
}
{'dump' in response &&
    <DumpList dump={response.dump} indent={0} />
}
</>
    )
  }
}
