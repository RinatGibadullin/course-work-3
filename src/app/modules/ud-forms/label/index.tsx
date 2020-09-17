import React from 'react';

type Props = {
  htmlFor?: string
  children?: any
}
const UDFormsLabel = (props: Props) => {
  return (
    <label htmlFor={props.htmlFor}>
      <p className="regular-text disabled-text fs14 m-0">{props.children}</p>
    </label>
  )
};

export default UDFormsLabel;