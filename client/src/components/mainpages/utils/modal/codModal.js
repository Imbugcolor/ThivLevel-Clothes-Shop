import React, { useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import LocationForm from '../address/LocationForm';
import { toast } from 'react-toastify'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CodModal({ codSuccess, user }) {
  const [open, setOpen] = useState(false);

  const [detail, setDetail] = useState({
    name: user.username,
    phone: user.phone
  })

  const [address, setAddress] = useState(user.address || '')

  const addressRef = useRef()

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChangeAddress = () => {
    addressRef.current.classList.add('active')
  }

  const handleChangeInput = e => {
    const { name, value } = e.target
    setDetail({ ...detail, [name]: value })
  }

  const handleSuccess = (e) => {
    e.preventDefault()
    if (address === '')
      return toast.error('H??y nh???p ?????a ch??? c???a b???n', {
        position: "top-center",
        autoClose: 3000
      });
    codSuccess(detail, address)
    setOpen(false);
  }
  return (
    <div>
      <button className='cod-btn' onClick={handleClickOpen}>
        Cash On Delivery
      </button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Th??ng tin giao h??ng
        </DialogTitle>
        <DialogContent dividers>
          <form className='delivery-detail-form' onSubmit={handleSuccess}>
            <div className="row">
              <label htmlFor="name">T??n kh??ch h??ng</label>
              <input type="text" name="name" id="name"
                required
                value={detail.name}
                onChange={handleChangeInput}
              />
            </div>

            <div className="row">
              <label htmlFor="phone">??i???n tho???i</label>
              <input type="text" name="phone" id="phone"
                required
                value={detail.phone}
                onChange={handleChangeInput}
              />
            </div>

            <div className="row">
              <label htmlFor="address">?????a ch???</label>
              <input type="text"
                name='address'
                // value={user.address ? `${user.address.detailAddress ? user.address.detailAddress : ''}, ${user.address.ward?.label}, ${user.address.district?.label}, ${user.address.city?.label}` : ''}
                value={`${address.detailAddress ? address.detailAddress : ''}, ${address.ward?.label}, ${address.district?.label}, ${address.city?.label}` || ''}
                className=""
                onChange={handleChangeInput}
                disabled
              />
              <div id="user-address">
                <a href="#!" className="change-address"
                  onClick={handleChangeAddress}>
                  <FontAwesomeIcon icon={faEdit} />
                  Thay ?????i ?????a ch???
                </a>
                <div className="address-form" ref={addressRef}>
                  <LocationForm element={"address-form"} onSave={setAddress} initAddress={address || user.address} />
                </div>
              </div>
            </div>

            <button type="submit" className='delivery-confirm'>Thanh to??n</button>
          </form>
        </DialogContent>
        <DialogActions>

        </DialogActions>
      </Dialog>
    </div>
  );
}
