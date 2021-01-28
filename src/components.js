import React from 'react'

const map = [
  'view',
  'text',
]

const events = {
  'onClick': 'bindtap'
}

const eventKeys = Object.keys(events)

let components = {}

const upperCase = (str) => {
  const temp = str.split('')
  temp[0] = temp[0].toUpperCase()
  return temp.join('')
}

for (const item of map) {
  components[upperCase(item)] = (props) => {
    const { children } = props
    let newProps = {
      ...props
    }
    for (const eventKey of eventKeys) {
      if (props[eventKey]) {
        newProps[events[eventKey]] = props[eventKey]
      }
    }
    return React.createElement(item, newProps, children)
  }
}

export default  components
