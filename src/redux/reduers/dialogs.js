const initialState = {
    dialogs: [],
    currentDialog: null
}

export default ((state = initialState, {type, payload}) => {
    switch (type) {
        case 'DIALOGS:SET_DIALOGS':
            return {
                ...state,
                dialogs: payload
            }
        case 'DIALOGS:SET_CURRENT_DIALOG_BY_ID':
            return {
                ...state,
                currentDialog: state.dialogs.find(dialog => dialog._id === payload)
            }
        case 'DIALOGS:SET_DIALOGS_IS_TYPING':
            return {
                ...state,
                dialogs: state.dialogs.map(dialog => {
                    if ( payload.typingDialogs.indexOf(dialog._id) >= 0) {
                        dialog.isTyping = true
                    }
                        
                    else dialog.isTyping = false
                    return dialog
                })
            }        
        default:
            return state
    }
})