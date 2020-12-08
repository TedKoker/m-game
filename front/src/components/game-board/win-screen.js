import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field, Form, formValues} from 'redux-form'
import { compose } from 'redux'
import BeatLoader from "react-spinners/BeatLoader"


import * as action from "../../actions"
import {require} from "../../shared-js/field-validation"


function WinScreen({score, ...props}) {

    const setLevel = () => {
        props.setLevel({...props.level})
    }

    useEffect(() => {
        console.log(props.valid)
    })

    const onSubmit = (formProps) => {
        return new Promise(async (resolve) => {
            formProps.score = score
            await props.addScore(formProps)
            resolve(formProps)
        })
    }

    return (
        <div className={"win-screen " + props.theme.cssClassName} >
            <div className={"win-screen__heading heading-big"}>Your score is: {score} </div>
            <div className="win-screen__button"><a className="button" onClick={setLevel}>Reset</a></div>
            <Form onSubmit={props.handleSubmit(onSubmit)} className="win-screen__form">
                <fieldset className="open-field">
                    <Field
                        name="firstName"
                        type="text"
                        component="input"
                        autoComplete="none"
                        placeholder="  "
                        className={props.array.firstName ? props.array : "no"}
                        validate={[require]}
                    />
                    <label>First Name</label>
                </fieldset>
                <fieldset className="open-field">
                    <Field
                        name="lastName"
                        type="text"
                        component="input"
                        autoComplete="none"
                        placeholder="  "
                        validate={[require]}
                    />
                    <label>Last Name</label>
                </fieldset>
                <div className="win-screen__form-botton">
                    <button type="submit" className="button button--small" disabled={!props.valid}>
                        {props.submitting ? "" : "submit"}
                        <BeatLoader
                            size={20}
                            color={"currentColor"}
                            loading={props.submitting}
                        />
                    </button>
                </div>
            </Form>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        level: state.userOptions.level,
        game: state.game,
        theme: state.userOptions.colorTheme
    }
}

export default compose(
    connect(mapStateToProps, action),
    reduxForm( {form: 'submit-score'} ),
    formValues("firstName", "lastName")
    )(WinScreen)