import { dialogsApi } from 'utils/api'

const actions = {
    setDialogs: dialogs => ({
        type: 'DIALOGS:SET_DIALOGS',
        payload: dialogs
    }),
    setCurrentDialogId: id => ({
        type: 'DIALOGS:SET_CURRENT_DIALOG_ID',
        payload: id
    }),
    fetchDialogs: () => dispatch => {
        dialogsApi.getAll().then(({ data }) => {
            dispatch(actions.setDialogs(data))
        })
    }
}

export default actions