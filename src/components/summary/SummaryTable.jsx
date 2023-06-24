import React from "react";
import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
const SummaryTable = ({ metrics, includeTotal }) => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Metric</TableCell>
              {Object.entries(metrics).map(([metric, value]) => (
                <TableCell key={metric} align="center">
                  {value.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {includeTotal ? (
              <TableRow>
                <TableCell align="center">Total</TableCell>
                {Object.entries(metrics).map(([metric, value]) => (
                  <TableCell key={metric} align="center">
                    {value.sum ? value.sum : null}
                  </TableCell>
                ))}
              </TableRow>
            ) : null}

            <TableRow>
              <TableCell align="center">Avg</TableCell>
              {Object.entries(metrics).map(([metric, value]) => (
                <TableCell key={metric} align="center">
                  {value.avg ? value.avg : null}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell align="center">Max</TableCell>
              {Object.entries(metrics).map(([metric, value]) => (
                <TableCell key={metric} align="center">
                  {value.max ? value.max : null}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell align="center">Min</TableCell>
              {Object.entries(metrics).map(([metric, value]) => (
                <TableCell key={metric} align="center">
                  {value.min ? value.min : null}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SummaryTable;
