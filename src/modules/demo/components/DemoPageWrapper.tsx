import React, { useEffect, useState }  from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { 
  CampaignData,
} from "../utils/types";

import "../assets/demo.scss";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

interface Data {
  id: number;
  name: string;
  quantity: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Tên quảng cáo*',
  },
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: 'Số lượng*',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCreateNewAds: () => void;
  onRemoveMultiAds: () => void;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, onCreateNewAds, onRemoveMultiAds, numSelected, rowCount } =
    props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" style={{ width: '60px', padding: '0px 0px 0px 4px'}}>
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
        {
          numSelected > 0 ? (
            <>
            <TableCell>
              <IconButton color="secondary" aria-label="add new sub campaign"  onClick={() => onRemoveMultiAds()} >
                <DeleteIcon />
              </IconButton>
            </TableCell>
            <TableCell></TableCell>
            </>
          ) : headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              // align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
            >
              {headCell.label}
            </TableCell>
          ))
        }
        {/* {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))} */}
        <TableCell style={{ padding: '0px 16px', width: '120px', textAlign: 'right'}}><Button variant="outlined" onClick={onCreateNewAds} startIcon={<AddIcon />}>Thêm</Button></TableCell>
      </TableRow>
    </TableHead>
  );
}


function DemoPageWrapper() {
  const dispatch = useDispatch();
  const [value, setValue] = useState<number>(0);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [listSubCampaignIndexError, setListSubCampaignIndexError] = useState<readonly number[]>([]);
  const [subCampaignIndexActive, setSubCampaignIndexActive] = useState<number>(0);
  const [campaignName, setCampaignName] = useState<string>('');
  const [campaignNameError, setCampaignNameError] = useState<boolean>(false);
  const [campaignNameHelperText, setCampaignNameHelperText] = useState<string>('');
  const [subCampaignNameError, setSubCampaignNameError] = useState<boolean>(false);
  const [subCampaignNameHelperText, setSubCampaignNameHelperText] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    campaign: {
      information: {
        name: '',
        describe: ''
      },
      subCampaigns: [
        {
          name: 'Chiến dịch con 1',
          status: true,
          ads: [
            {
              name: 'Quảng cáo 1',
              quantity: 0
            }
          ]
        }
      ]
    }
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCampaignNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCampaignName((event.target as HTMLInputElement).value);
    setCampaignNameHelperText('');
    setCampaignNameError(false);
  };

  const handleSubCampaignNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newCampaignData = {...campaignData};
    newCampaignData.campaign.subCampaigns[subCampaignIndexActive].name = (event.target as HTMLInputElement).value;
    setCampaignData(newCampaignData);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let isValidateCampaignData = true;
    let isValidateSubCampaignData = true;
    setIsSubmitted(true);
    if (!campaignName) {
      setCampaignNameHelperText('Dữ liệu không hợp lệ');
      setCampaignNameError(true);
      isValidateCampaignData = false;
    }
    let listSubCampaign = [...campaignData.campaign.subCampaigns];
    var listIndexError = [...listSubCampaignIndexError];

    listSubCampaign.map((c:any, index: number) => {
      let currentSubCampaignIndex = index;

      if(!c.name) {
        isValidateSubCampaignData = false;
        listIndexError.push(index)
        setSubCampaignNameHelperText('Dữ liệu không hợp lệ');
        setSubCampaignNameError(true);
      } else {
        isValidateSubCampaignData = true;
        setSubCampaignNameError(false);
        setSubCampaignNameHelperText('');
      }

      if(c.ads.length === 0) {
        isValidateSubCampaignData = false;
        listIndexError.push(currentSubCampaignIndex)
      } else {
        c.ads.map((a:any, index: number) => {
          if(!a.name || a.quantity === 0) {
            isValidateSubCampaignData = false;
            listIndexError.push(currentSubCampaignIndex)
          } else {
            isValidateSubCampaignData = true;
          }
        })
      }
    })
    setListSubCampaignIndexError(listIndexError.filter((x, i, a) => a.indexOf(x) == i));
    
    if(!isValidateCampaignData || !isValidateSubCampaignData) {
      return alert('Vui lòng điền đúng và đầy đủ thông tin')
    }
  };
  
  const handleAddSubCampaign = () => {
    setSubCampaignIndexActive(subCampaignIndexActive + 1);
    setCampaignData({
      campaign: {
        information: {
          ...campaignData.campaign.information
        },
        subCampaigns: [
          ...campaignData.campaign.subCampaigns,
          {
            name: `Chiến dịch con ${campaignData.campaign.subCampaigns.length + 1}`,
            status: true,
            ads: [
              {
                name: 'Quảng cáo 1',
                quantity: 0
              }
            ]
          }
        ]
      }
    })
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = campaignData?.campaign?.subCampaigns[subCampaignIndexActive]?.ads.map((n, index) => index);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const handleSelectSubCampaign = (event: React.MouseEvent<unknown>, index: number) => {
    setSubCampaignIndexActive(index);
  }

  const handleChangeSubCampaignStatus = () => {
    let newCampaignData = {...campaignData};
    newCampaignData.campaign.subCampaigns[subCampaignIndexActive].status = !campaignData.campaign.subCampaigns[subCampaignIndexActive].status;
    setCampaignData(newCampaignData);
  }

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const handleAddAds = () => {
    let newCampaignData = {...campaignData};
    newCampaignData.campaign.subCampaigns[subCampaignIndexActive].ads = [
      ...campaignData.campaign.subCampaigns[subCampaignIndexActive].ads,
      {
        name: `Quảng cáo ${campaignData.campaign.subCampaigns[subCampaignIndexActive].ads.length + 1}`,
        quantity: 0
      }
    ]
    setCampaignData(newCampaignData);
  }

  const handleAdsNameChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let newCampaignData = {...campaignData};
    newCampaignData.campaign.subCampaigns[subCampaignIndexActive].ads[index].name = (event.target as HTMLInputElement).value;
    setCampaignData(newCampaignData);

    let totalEmptyAds = campaignData?.campaign?.subCampaigns[subCampaignIndexActive]?.ads?.filter(a => !a.name)
    if (isSubmitted) {
      if(totalEmptyAds.length == 0) {
        let newList = [...listSubCampaignIndexError].filter(i => i != subCampaignIndexActive);
        setListSubCampaignIndexError(newList);
        
        
      } else {
        let listIndex = [...listSubCampaignIndexError, subCampaignIndexActive];
        setListSubCampaignIndexError(listIndex);
      }
    }
  }

  const handleAdsQuantityChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let newCampaignData = {...campaignData};
    newCampaignData.campaign.subCampaigns[subCampaignIndexActive].ads[index].quantity = Number((event.target as HTMLInputElement).value);
    setCampaignData(newCampaignData);

    let totalEmptyAds = campaignData?.campaign?.subCampaigns[subCampaignIndexActive]?.ads?.filter(a => a.quantity == 0)
    if (isSubmitted) {
      if(totalEmptyAds.length == 0) {
        let newList = [...listSubCampaignIndexError].filter(i => i != subCampaignIndexActive);
        setListSubCampaignIndexError(newList);
        
        
      } else {
        let listIndex = [...listSubCampaignIndexError, subCampaignIndexActive];
        setListSubCampaignIndexError(listIndex);
      }
    }
  }

  const handleRemoveAds = (event: React.MouseEvent<unknown>, index: number) => {
    let newCampaignData = {...campaignData};
    newCampaignData.campaign.subCampaigns[subCampaignIndexActive].ads.splice(index, 1);
    setCampaignData(newCampaignData);
  }

  const handleRemoveMultiAds = (listIndex: any) => {
    let newCampaignData = {...campaignData};
    newCampaignData.campaign.subCampaigns[subCampaignIndexActive].ads = newCampaignData.campaign.subCampaigns[subCampaignIndexActive].ads.filter((a: any, index: number) => !listIndex.includes(index));
    setCampaignData(newCampaignData);
  }

  return (
    <div className="demo-wrapper">
      <div className="container demo-container">
        <form onSubmit={handleSubmit} noValidate>
          <Grid container style={{ paddingTop: '20px' }}>
            <Grid item xs={12} style={{ borderBottom: '1px solid gray' }}>
              <Box style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px' }}>
                <Button type="submit" variant="contained">Submit</Button>
              </Box>
            </Grid>
          </Grid>
          <Grid container style={{ padding: '24px', display: 'block' }}>
            <Paper elevation={1} >
              <Box>
                <Box>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="THÔNG TIN" />
                    <Tab label="CHIẾN DỊCH CON" />
                  </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <TextField
                      required
                      error={campaignNameError}
                      id="outlined-required"
                      label="Tên chiến dịch"
                      variant="standard"
                      fullWidth
                      value={campaignName}
                      onChange={handleCampaignNameChange}
                      helperText={campaignNameHelperText}
                    />
                  <TextField
                    id="standard-basic"
                    label="Mô tả"
                    variant="standard"
                    fullWidth
                  />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <Grid container>
                    <Grid item xs={12} style={{ overflow: 'auto', paddingBottom: '2px'}}>
                      <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                      >
                        <Grid item xs={1}>
                          <IconButton color="secondary" aria-label="add new sub campaign" style={{ backgroundColor: '#ededed'}} onClick={() => handleAddSubCampaign()} >
                            <AddIcon />
                          </IconButton>
                        </Grid>
                          {
                            campaignData?.campaign?.subCampaigns.map((subCampaign, index) => (
                              <div onClick={(e) => handleSelectSubCampaign(e, index)}>
                                <Grid item xs="auto">
                                <Paper  elevation={1} style={{ width: '210px', height: '120px', marginLeft: '16px', cursor: 'pointer', border: index === subCampaignIndexActive ? '2px solid #2196f3' : '2px solid #fafafa' }} >
                                  <CardContent>
                                    <Typography variant="h6" gutterBottom style={{ whiteSpace: 'normal', wordBreak: 'break-all'}}>
                                      <span style={{ color: listSubCampaignIndexError.includes(index) ? 'red' : '#000000de' }}>{`${subCampaign.name}`}</span> 
                                      <CheckCircleIcon style={{ fontSize: '14px', color: subCampaign.status ? '#008000' : '#8d8d8d', paddingLeft: '8px'}} />
                                    </Typography>
                                    {/* Can use lodash to show with function _.sumBy(objects, 'value'); */}
                                    <Tooltip 
                                      title="Số lượng" 
                                      placement="left" 
                                      arrow 
                                      slotProps={{
                                        popper: {
                                          modifiers: [
                                            {
                                              name: 'offset',
                                              options: {
                                                offset: [0, 10],
                                              },
                                            },
                                          ],
                                        },
                                      }}>
                                      <Typography variant="h5" gutterBottom>{subCampaign?.ads?.reduce((a, b) => a + b.quantity, 0)}</Typography>
                                    </Tooltip>
                                  </CardContent>
                                </Paper>
                              </Grid>
                              </div>
                              
                            ))
                          }
                      </Grid>
                      
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: '16px'}}>
                      <Grid container spacing={2}>
                        <Grid item xs={8}>
                          <TextField
                            required
                            error={subCampaignNameError}
                            id="outlined-required"
                            label="Tên chiến dịch con"
                            variant="standard"
                            fullWidth
                            value={campaignData?.campaign?.subCampaigns[subCampaignIndexActive]?.name}
                            onChange={handleSubCampaignNameChange}
                            helperText={subCampaignNameHelperText}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <FormControlLabel
                            label="Đang hoạt động"
                            control={
                              <Checkbox 
                                checked={campaignData?.campaign?.subCampaigns[subCampaignIndexActive]?.status} 
                                onChange={handleChangeSubCampaignStatus}
                                inputProps={{ 'aria-label': 'controlled' }}
                              />
                            }
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Typography variant="h6" gutterBottom style={{padding: '16px', textAlign: 'left', marginTop: '16px'}}>DANH SÁCH QUẢNG CÁO</Typography>
                        <TableContainer>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <EnhancedTableHead
                              numSelected={selected.length}
                              onSelectAllClick={handleSelectAllClick}
                              onCreateNewAds={handleAddAds}
                              onRemoveMultiAds={() => handleRemoveMultiAds(selected)}
                              rowCount={campaignData?.campaign?.subCampaigns[subCampaignIndexActive]?.ads.length}
                            />
                            <TableBody>
                            {campaignData?.campaign?.subCampaigns[subCampaignIndexActive]?.ads.map((ad, index) => {
                              const isItemSelected = isSelected(index);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={index}
                                  selected={isItemSelected}
                                  sx={{ cursor: 'pointer' }}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      color="primary"
                                      checked={isItemSelected}
                                      inputProps={{
                                        'aria-labelledby': labelId,
                                      }}
                                      onClick={(event) => handleClick(event, index)}
                                    />
                                  </TableCell>
                                  <TableCell >
                                    <TextField
                                        required
                                        error={isSubmitted && !ad.name ? true : false}
                                        id="outlined-required"
                                        variant="standard"
                                        fullWidth
                                        value={ad.name}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAdsNameChange(e, index)}
                                      />
                                  </TableCell>
                                  <TableCell>
                                    <TextField
                                        required
                                        error={isSubmitted && ad.quantity == 0 ? true : false}
                                        id="outlined-required"
                                        variant="standard"
                                        fullWidth
                                        value={ad.quantity}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAdsQuantityChange(e, index)}
                                        inputProps={{ type: 'number'}}
                                      />
                                  </TableCell>
                                  <TableCell style={{ textAlign: 'right'}}>
                                    <IconButton aria-label="delete" onClick={(e) => handleRemoveAds(e, index)}>
                                      <DeleteIcon />
                                    </IconButton>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                    </Grid>
                  </Grid>
                </CustomTabPanel>
              </Box>
            </Paper>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default DemoPageWrapper;
