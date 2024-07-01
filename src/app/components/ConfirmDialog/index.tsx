import { Close } from '@mui/icons-material';
import { Button, Divider, IconButton, Modal, Paper, Stack, Typography } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import isString from 'lodash/isString';
import React, { createRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

type Message = React.ReactNode | string;

export type Item = {
  id: string;
  title: string | React.ReactNode;
  message: string | React.ReactNode;
  cancelText?: string | React.ReactNode;
  confirmText?: string | React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  disableConfirm?: boolean;
};

export type DataShowMessage = {
  title: Message;
  message: Message;
  cancelText?: Message;
  confirmText?: Message;
  onConfirm?: () => void;
  onCancel?: () => void;
  disableConfirm?: boolean;
};

const getMessage = (message?: Message, defaultMessage = '') => {
  if (!message) return defaultMessage;
  let _msg: React.ReactNode = defaultMessage;
  if (React.isValidElement(message)) {
    _msg = message;
  } else if (isString(message)) {
    _msg = message;
  }
  return _msg;
};

const ConfirmDialogComponent = forwardRef(function Component(_, ref) {
  useImperativeHandle(
    ref,
    () => ({
      show: ({ message, title, cancelText, confirmText, onCancel, onConfirm, disableConfirm }: DataShowMessage) => {
        setQueueData((d) =>
          d.concat([
            {
              id: nanoid(),
              message: getMessage(message),
              title: getMessage(title),
              cancelText: getMessage(cancelText, 'Cancel'),
              confirmText: getMessage(confirmText, 'OK'),
              onCancel,
              onConfirm,
              disableConfirm,
            },
          ]),
        );
      },
    }),
    [],
  );

  const [queueData, setQueueData] = useState<Array<Item>>([]);
  const [data, setData] = useState<Item[]>([]);

  const onPop = useCallback((item: Item) => {
    setQueueData((d) => {
      const _queueData = d.filter((x) => x.id !== item.id);
      setData(_queueData);
      return _queueData;
    });
  }, []);

  const onConfirm = useCallback(
    (item: Item) => () => {
      onPop(item);
      item?.onConfirm?.();
    },
    [onPop],
  );

  const onCancel = useCallback(
    (item: Item) => () => {
      onPop(item);
      item?.onCancel?.();
    },
    [onPop],
  );

  const _renderItem = (item: Item) => {
    const disableConfirm = item?.disableConfirm;
    return (
      <Modal open onClose={onCancel(item)}>
        <Stack width={1} height={1} className="center" p={1}>
          <Paper component={Stack} p={1} position="relative" maxWidth={500} width={1}>
            <Stack direction="row" justifyContent="flex-end" p={1}>
              <IconButton size="small" onClick={onCancel(item)}>
                <Close />
              </IconButton>
            </Stack>
            <Stack spacing={2} p={1} pb={3}>
              <Typography variant="h5" textAlign="center">
                {item.title}
              </Typography>
              <Typography minHeight={60} textAlign="center">
                {item.message}
              </Typography>
            </Stack>
            {disableConfirm && <Divider sx={{ mt: -1, mb: 1 }} />}
            <Stack direction="row" justifyContent={disableConfirm ? 'center' : undefined} spacing={1} p={1}>
              <Button
                sx={{ minWidth: 120, width: !disableConfirm ? 1 : undefined }}
                color="inherit"
                onClick={onCancel(item)}
              >
                {item.cancelText}
              </Button>
              {!disableConfirm && (
                <Button sx={{ minWidth: 120 }} fullWidth onClick={onConfirm(item)}>
                  {item.confirmText}
                </Button>
              )}
            </Stack>
          </Paper>
        </Stack>
      </Modal>
    );
  };

  useEffect(() => {
    if (queueData.length > 0) {
      setData([queueData[0]]);
    }
  }, [queueData]);

  return data.map(_renderItem);
});
type ConfirmDialog = {
  show: (data: DataShowMessage) => void;
};
export const confirmDialogRef = createRef<ConfirmDialog>();
export const ConfirmDialog = () => <ConfirmDialogComponent ref={confirmDialogRef} />;

export const showConfirmDialog = (props: DataShowMessage) => {
  confirmDialogRef.current?.show(props);
};
