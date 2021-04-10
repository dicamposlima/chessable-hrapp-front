export default function buttonsEstilo(theme, green=null, grey=null) { 
    return {
        actions_buttons: {
            color: theme.palette.common.white,
        },
        btnSave: {
            color: theme.palette.common.white,
            backgroundColor: green[500],
        },
        details: {
            marginRight: theme.spacing(1),
        },
        info: {
            backgroundColor: grey[900],
            color: theme.palette.common.white,
        }
    }
  } 