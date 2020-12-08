import React from 'react'
import {connect} from 'react-redux'
import * as action from "../../actions"

function WinTable(props) {

    return (
        <div className="win-table">
            <div className="win-table__table">
                <table>
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    {props.table.map((item, index) =>
                        <tbody key={index}>
                            <tr>
                                <td>{index+1}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.score}</td>
                            </tr>
                        </tbody>)}
                </table>
            </div>
            <div className="win-table__button">
                <a href="#" className={"button "+props.theme.cssClassName} onClick={() =>  props.setLevel({...props.level})}>Reset</a>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        table: state.game.scoreTable,
        level: state.userOptions.level,
        theme: state.userOptions.colorTheme
    }
}

export default connect(mapStateToProps, action)(WinTable)