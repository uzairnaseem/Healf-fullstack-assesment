'use client';

// Packages
import { useState } from 'react';

// Components
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import FilterPanel from './FilterPanel';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

// Others
import { FiltersMobileViewButton, FiltersMobileViewCloseButton } from '../common/StyledComponents';

interface FilterModalProps {
  vendors: string[];
  productTypes: string[];
  priceRange: { min: number; max: number };
}

export default function FilterPanelWrapper({
  vendors,
  productTypes,
  priceRange
}: FilterModalProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filterContent = (
    <FilterPanel vendors={vendors} productTypes={productTypes} priceRange={priceRange} />
  );

  return (
    <>
      {/* Desktop: Show as sidebar */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>{filterContent}</Box>

      {/* Mobile: Show button and drawer */}
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <FiltersMobileViewButton color="primary" aria-label="Open filters" onClick={handleOpen}>
          <MenuIcon />
        </FiltersMobileViewButton>

        <Drawer
          anchor="bottom"
          open={open}
          onClose={handleClose}
          slotProps={{
            paper: {
              sx: {
                maxHeight: '85vh',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                p: 2
              }
            }
          }}>
          <FiltersMobileViewCloseButton aria-label="Close filters" onClick={handleClose}>
            <CloseIcon sx={{ fontSize: '1.5rem' }} />
          </FiltersMobileViewCloseButton>

          {filterContent}
        </Drawer>
      </Box>
    </>
  );
}
