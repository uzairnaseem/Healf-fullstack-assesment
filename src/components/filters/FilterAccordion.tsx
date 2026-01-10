'use client';

import { useState, ReactNode } from 'react';

// Components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SxProps } from '@mui/material/styles';

interface FilterAccordionProps {
  id: string;
  title: string;
  defaultExpanded?: boolean;
  selectedCount?: number;
  children: ReactNode;
  sx?: SxProps;
}

export default function FilterAccordion({
  id,
  title,
  defaultExpanded = false,
  selectedCount = 0,
  children,
  sx
}: FilterAccordionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleChange = (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleChange}
      elevation={0}
      sx={{ '&:before': { display: 'none' }, ...sx }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-filter-content`}
        id={`${id}-filter-header`}>
        <Typography variant="subtitle2" fontWeight={600}>
          {title}
          {selectedCount > 0 && <Chip label={selectedCount} size="small" sx={{ ml: 1 }} />}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
}
