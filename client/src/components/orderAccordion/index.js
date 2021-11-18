import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "firebase-folder";
import SplitButton from "components/splitbutton";
import { TableContainer, Accordion, ActionsContainer } from "./styles.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,

  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Typography,
  colors
} from "@material-ui/core";

import {
  ExpandMore as ExpandMoreIcon,
  Details as DetailIcon
} from "@material-ui/icons";

import { ToastContext } from "contexts/toastContext.js";
import helpers from "services/helpers";
import { ORDER_STATUS } from "services/constants";

function Order({ id, email, items, total, status: statusId = 'opened', date, showActions = false }) {
  const status = ORDER_STATUS[statusId] || ORDER_STATUS['opened'];
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const usr = await db.refOrder().where("email", "==", email).where("status", "==", ORDER_STATUS["closed"].id).limit(1).get();
      if (usr.empty)
        setIsNew(true);
    }

    if (email)
      getData();
  }, [email])

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`painel-content-${id}`}
        id={`painel-header-${id}`}
        className="order-summary"
      >
        <Typography>{date}</Typography>
        <div>
          <Chip label={status.label} style={{ color: status.color, border: `${status.color} solid 1px`, backgroundColor: '#fff', minWidth: 100, fontWeight: 'bold' }} />
          {
            Boolean(showActions && isNew) &&
            <Chip label={"Cliente Novo"} style={{ color: colors.red[400], marginLeft: 8, border: `${colors.red[400]} solid 1px`, backgroundColor: '#fff', minWidth: 100, fontWeight: 'bold' }} />
          }
        </div>
        <Typography color="primary" variant="h6">{helpers.maskedMoney(total)}</Typography>
      </AccordionSummary>
      <AccordionDetails >
        <Actions id={id} status={status} showActions={showActions} />
        <TableItem items={items} total={total} />
      </AccordionDetails>
    </Accordion>
  )
}

export default Order;

const Actions = ({ id, status, showActions }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState(null);
  const toast = useContext(ToastContext);

  const handleOpenDialog = newStatus => {
    setIsOpen(true);
    setNextStatus(newStatus)
  }

  const handleAgreeDialog = async () => {
    try {
      setIsOpen(false);
      if (nextStatus) {
        await db.updateOrder({ id, status: nextStatus.id });
        toast.success("Status do pedido alterado com sucesso!");
      }
      else {
        toast.error("Não foi possível alterar status do Pedido. (Não existe próximo status)");
      }
    }
    catch (err) {
      toast.error("Falha ao alterar status do Pedido");
    }
  }

  const handleCloseDialog = () => {
    setIsOpen(false);
    setNextStatus(null);
  }

  return (
    <ActionsContainer>
      {
        Boolean(showActions && status && status.next && status.next.length) &&
        <>
          <SplitButton
            options={status.next.map(nId => ORDER_STATUS[nId])}
            onClick={handleOpenDialog}
          />
          <ConfirmDialog
            open={isOpen}
            handleClose={handleCloseDialog}
            handleAgree={handleAgreeDialog}
          />
        </>
      }
      <Link to={`/orders/${id}`}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<DetailIcon />}
        >
          Detalhes
        </Button>
      </Link>
    </ActionsContainer>
  )
}

export const TableItem = ({ items, total }) => {

  return (
    <TableContainer>
      <thead>
        <tr>
          <Typography component="th" colSpan={2}>Produto</Typography>
          <Typography component="th" align="right">Quantidade</Typography>
          <Typography component="th" align="right">Preço</Typography>
          <Typography component="th" align="right">Total</Typography>
        </tr>
      </thead>
      <tbody>
        {
          Object.values(items).map(itm => (
            <tr key={itm.plu}>
              <td><img alt={itm.description} src={itm.imageUrl} /></td>
              <Typography component="td" variant="body2">{itm.description}</Typography>
              <Typography component="td" variant="body2" align="right">{itm.quantity}</Typography>
              <Typography component="td" variant="body2" align="right">{helpers.maskedMoney(itm.price)}</Typography>
              <Typography component="td" variant="body2" align="right">{helpers.maskedMoney(itm.total)}</Typography>
            </tr>
          ))
        }
      </tbody>
      <tfoot>
        <tr>
          <Typography component="td" variant="subtitle2" colSpan={4}>Total</Typography>
          <Typography component="td" variant="subtitle2" align="right">{helpers.maskedMoney(total)}</Typography>
        </tr>
      </tfoot>
    </TableContainer>
  )
}

const ConfirmDialog = ({ open, handleClose, handleAgree }) => {

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Alteração de status</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          A alteração do status do pedido é irreversível, deseja continuar com a operação?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleAgree} color="primary" autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}