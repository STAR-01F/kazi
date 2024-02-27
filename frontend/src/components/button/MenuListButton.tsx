import {
  Button,
  ClickAwayListener,
  Container,
  Divider,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  SvgIcon,
  SxProps,
  Typography,
  useTheme,
} from '@mui/material';
import {ReactNode, useEffect, useRef, useState} from 'react';
import CheckIcon from '@mui/icons-material/Check';

type MenuActionList = {
  name: ReactNode;
  action: () => void;
};
/**
 * Represents a job status action.
 * @typedef {Object} JobStatusAction
 * @property {ReactNode} name - The name of the action.
 * @property {Function} action - The function to execute when the action is triggered.
 */
type MenuListButtonProps = {
  children: ReactNode; // The content of the button.
  endIcon?: ReactNode; // The icon displayed at the end of the button.
  startIcon?: ReactNode; // The icon displayed at the start of the button.
  variant?: 'text' | 'outlined' | 'contained'; // The variant of the button.
  size?: 'small' | 'medium' | 'large'; // The size of the button.
  title?: ReactNode; // The title of the Popper
  select?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  /**
   * The list of actions for the menu.
   * Each action has a name and a function to execute when the action is triggered.
   */
  menuActionList: MenuActionList[];
};
/**
 * A button component that displays a menu list when clicked.
 *
 * @component
 * @example
 * // Usage:
 * <MenuListButton
 *   menuActionList={[
 *     { name: 'Action 1', action: () => console.log('Action 1 clicked') },
 *     { name: 'Action 2', action: () => console.log('Action 2 clicked') },
 *   ]}
 * >
 *   Open Menu
 * </MenuListButton>
 *
 * @param {MenuListButtonProps} props - The props for the MenuListButton component.
 * @returns {React.JSX} The rendered MenuListButton component.
 */
const MenuListButton = ({
  children,
  menuActionList,
  variant,
  size,
  endIcon,
  startIcon,
  title,
  select = false,
  fullWidth = false,
  sx,
}: MenuListButtonProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <Button
        size={size}
        variant={variant}
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        endIcon={endIcon}
        startIcon={startIcon}
        fullWidth={fullWidth}
        sx={sx}
      >
        {children}
      </Button>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        style={{marginTop: theme.spacing(1)}}
      >
        {({TransitionProps}) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: 'right bottom',
              border: '1px solid ' + theme.palette.divider,
              marginTop: theme.spacing(0.5),
            }}
          >
            <Paper sx={{minWidth: '200px'}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {title && (
                    <>
                      <Typography
                        component={Container}
                        // variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {title}
                      </Typography>
                      <Divider />
                    </>
                  )}
                  {menuActionList.map(({name, action}, i) => (
                    <MenuItem
                      key={i}
                      onClick={(e) => {
                        action();
                        setSelectedItem(i);
                        handleClose(e);
                      }}
                      sx={{display: 'flex', alignItems: 'center'}}
                    >
                      {select && (
                        <SvgIcon
                          component={CheckIcon}
                          sx={{mb: 0.35, opacity: selectedItem === i ? 1 : 0}}
                        />
                      )}
                      <Typography
                        component={Container}
                        display="block"
                        gutterBottom
                      >
                        {name}
                      </Typography>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default MenuListButton;
