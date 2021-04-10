export default function rootEstilo(theme) { 
    return {
        root: {
            '& > *': {
                margin: theme.spacing(1),
                // width: '150ch',
            },
        },
    }
  } 