import * as React from 'react';
import {
  Button,
  ButtonGroup,
  MenuItem,
  Menu,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function SplitButton({ options, handleDecision }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isdisable = options[selectedIndex] === 'false_positive';

  const open = Boolean(anchorEl);
  const selectedOption = options[selectedIndex];

  const handleClick = () => {
    handleDecision(selectedOption.value);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonGroup
        variant="outlined"
        size={isMobile ? 'small' : 'small'}
        sx={{
          width: isMobile ? '100%' : 'auto',
          borderRadius: 2,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          backgroundColor: '#fff',
          borderColor: '#ccc',
        }}
      >
        <Button
          onClick={handleClick}
          sx={{
            flexGrow: 1,
            textTransform: 'capitalize',
            fontSize: '0.875rem',
            padding: '6px 12px',
            color: '#333',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          {selectedOption.label}
        </Button>
        <Button
          size="small"
          aria-label="select option"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleMenuOpen}
          sx={{
            minWidth: '32px',
            color: '#333',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
          }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          sx: {
            minWidth: 150,
          },
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={isdisable ? [1, 2, 3] : ''}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(index)}
            sx={{
              textTransform: 'capitalize',
              fontSize: '0.875rem',
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
