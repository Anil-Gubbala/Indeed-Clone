import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  applyButton: {
    color: 'white',
    width: '200px',
    height: '40px',
    borderRadius: '50px',
    backgroundColor: '#0145E3',
    marginRight: '2%',
    '&:hover': {
      color: 'white',

      borderRadius: '50px',
      backgroundColor: '#0145E3',
      marginRight: '2%',
    },
  },
  updateButton: {
    color: '#0145E3',
    width: '200px',
    height: '40px',
    border: '2px solid #909090',
    borderRadius: '50px',
  },
}));

export default useStyles;
