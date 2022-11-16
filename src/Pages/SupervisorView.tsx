import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import axios from "axios";
import {Button, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import ButtonUnstyled, {
    ButtonUnstyledProps,
    buttonUnstyledClasses,
} from '@mui/base/ButtonUnstyled';
import {useForm} from "@mantine/form";
import {useEffect} from "react";
import PopUp from "../Components/popUp";
import PopupState, {bindPopper, bindToggle} from "material-ui-popup-state";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";



interface Data {
    id: number,
    dateTime: string,
    location: string,
    incidentType: string,
    harm: string,
    individualsInvolved: string,
    eventType: string,

}

function createData(
    id: number,
    dateTime: string,
    location: string,
    incidentType: string,
    harm: string,
    individualsInvolved: string,
    eventType: string,

): Data {
    return {
        id,
        dateTime,
        location,
        incidentType,
        harm,
        individualsInvolved,
        eventType,

    };
}



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: true,
        label: 'id',
    },
    {
        id: 'dateTime',
        numeric: false,
        disablePadding: true,
        label: 'Event Date',
    },
    {
        id: 'location',
        numeric: false,
        disablePadding: false,
        label: 'Location',
    },
    {
        id: 'incidentType',
        numeric: false,
        disablePadding: false,
        label: 'Incident Type',
    },
    {
        id: 'harm',
        numeric: false,
        disablePadding: false,
        label: 'Harm',
    },
    {
        id: 'individualsInvolved',
        numeric: false,
        disablePadding: false,
        label: 'IndividualInvolved',
    },
    {
        id: 'eventType',
        numeric: false,
        disablePadding: false,
        label: 'EventType',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}


function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {


    const { numSelected } = props;
    function handleSubmitToCommand()
    {
        return (
            <PopupState variant="popper" popupId="demo-popup-popper">
                {(popupState) => (
                    <div>
                        <Button variant="contained" {...bindToggle(popupState)}>
                            Toggle Popper
                        </Button>
                        <Popper {...bindPopper(popupState)} transition>
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <Paper>
                                        <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
                                    </Paper>
                                </Fade>
                            )}
                        </Popper>
                    </div>
                )}
            </PopupState>
        );
    }



    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected


                    <PopupState variant="popper" popupId="demo-popup-popper">
                        {(popupState) => (
                            <div>
                                <Button style={{float: "right", backgroundColor: "black", color: "yellow", padding: 10}} variant="contained" {...bindToggle(popupState)} >
                                    Send Up To Command
                                </Button>
                                <Popper {...bindPopper(popupState)} transition>
                                    {({ TransitionProps }) => (
                                        <Fade {...TransitionProps} timeout={350}>
                                            <Paper>
                                                <Typography sx={{ p: 2 }}>
                                                    <h1>Send Up To Command</h1>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select-label">Command</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={["Air Force"]}
                                                            label="Age"

                                                        >
                                                            <MenuItem value={"Air Force"}>Air Force</MenuItem>
                                                            <MenuItem value={"Army"}>Army</MenuItem>
                                                            <MenuItem value={"SWF"}>SWF</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                </Typography>
                                            </Paper>
                                        </Fade>
                                    )}
                                </Popper>
                            </div>
                        )}
                    </PopupState>




                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >

                    Incident Reports

                    <h5>Reports</h5>
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

export default function EnhancedTable() {

    const URL: string = "http://localhost:8080/Report"
    const [id, setId] = React.useState<string>("")
    const [sirList, setSirList] = React.useState<Array<any>>([]);



    async function GetAllRecommendations()
    {

            try{
                const response = await
                axios.get(URL)
                console.log(response.data)
                setSirList(response.data)
            }catch (e)
            {
               console.log("Error In Get All Response")
            }

    }    useEffect(() =>{
        GetAllRecommendations()
    },[])





    // const rows = [
    //     createData(sirList[0].id,sirList[0].dateTime, sirList[0].location, sirList[0].eventType.toString(), sirList[0].harm.toString(), "Family Memeber, +2","Operative/Invasive Procedure",),
    //     createData("2",'11-13-23', "Fort Sill", "Actual Event/Incident", "Yes", "Patient, Visitor, +1","Assult, Fall, +5"),
    //
    // ];
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('location');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = sirList[0].map((n: { EventDate: any; }) => n.EventDate);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };



    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sirList[0].length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={sirList.length}
                        />
                        <TableBody>
                            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
                            {stableSort(sirList, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((sirList, index) => {
                                    const isItemSelected = isSelected(sirList.id.toString());
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, sirList.id.toString())}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={sirList.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {sirList.id}
                                            </TableCell>
                                            <TableCell align="left">{sirList.dateTime}</TableCell>
                                            <TableCell align="left">{sirList.location}</TableCell>
                                            <TableCell align="left">{sirList.eventType.toString()}</TableCell>
                                            <TableCell align="left">{sirList.harm.toString()}</TableCell>
                                            <TableCell align="left">{sirList.individualsInvolved + " "}</TableCell>
                                            <TableCell align="left">{sirList.eventType.toString()}</TableCell>



                                            <TableCell onClick={(e) => e.stopPropagation()}>         <Button variant={"text"} style={{float: "right"}}>View

                                                </Button>

                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: (dense ? 33 : 53) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={sirList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />

        </Box>)






}
