import React from 'react'
const Select = (props) => {
    let options = ''
    if (props.options != null) {
        options = props.options.map((item, index) => {
            return (
                <React.Fragment key={index}>
                    <option value={item.value}>{item.option}</option>
                </React.Fragment>
            )
        })
    }
    return (
        <div className='form-group user-dropdown'>
            <label className='label mb-2' htmlFor={props.id}>
                {props.label}
            </label>
            <select
                // ref={ref}
                value={props.value}
                id={props.id}
                name={props.name}
                className='form-select'
                onChange={props.onChange}>
                {options}
            </select>
            {props.error && <small className='text-danger mt-2'>{props.error}</small>}
        </div>
    )
}

export default Select