import React,{ useState, useEffect } from 'react';
import {
  CmsCardedPage,
  CmsLabel,
  CmsButton,
  CmsCollapse,
  CmsIconButton,
  CmsTableBasic,
  CmsViewOptions,
  CmsUploadFile,
  CmsAlert, CmsButtonProgress
} from '@widgets/components';
import withReducer from 'app/store/withReducer';
import reducer from "../../store";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ValidateValue, GetExcelDataFromFile } from '@widgets/functions';
import { initHeaderModel, initExcelModel, initImportModel } from './dataExcel';
import FileProperties from '@widgets/metadatas/FileProperties';
import { alertInformation } from '@widgets/functions/AlertInformation';
import connect from '@connect';
import { showMessage } from 'app/store/fuse/messageSlice';
import { Icon } from '@material-ui/core';
import { keyStore } from '../../common';
import { useParams } from 'react-router';

function ImportExcel(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [validatedData, setValidatedData] = useState([]);
  const [dataDisplay, setDataDisplay] = useState([]);
  const [validatedDataArray, setValidatedDataArray] = useState([]);
  const [showAllColumns, setShowAllColumns] = useState(false);
  const [columns, setColumns] = useState(initHeaderModel);
  const responseExcel = useSelector(store => store[keyStore].responseExcel);
  const [cError, setCError] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams(), id = params.id;

  /**
   * @description index thao tác của người dùng
   */
  const listStep = {
    start: 'start',
    importExcel: 'importExcel',
    saveData: 'saveData'
  }

  const SuKien = {
    importExcel: 4
  }

  /**
   * @description flag thao tác người dùng
   */
  const [operatedStep, setOperatedStep] = useState(listStep.start)

  useEffect(() => {
    if (operatedStep === listStep.saveData) {
      let dataErrorResult = []

      let arr = validatedDataArray.map((item, index) => {

        let fields = columns.map(col => col.field)
        let defineKeyValue = {}

        let value = {}
        columns.forEach(col => { defineKeyValue = { ...defineKeyValue, [col.field]: col.label } })
        fields.forEach(strKey => {
          value = {
            ...value,
            [strKey]: (<div className="flex items-center justify-center">
              <CmsLabel content={(item[strKey] && item[strKey].value) || ""} />
            </div>)
          }
        })
        let itemError = dataErrorResult.find(errorItem => errorItem.title === item['title'].value)
        value.error = itemError ? (
          <CmsLabel className="text-red-600 inline-block" content={(itemError.message && itemError.message) || ""} />
        ) : <CmsIconButton icon="check_outline" className="inline-block" />

        return value
      })

      setDataDisplay(arr)
      setOperatedStep(listStep.start)
    }
  }, [operatedStep, listStep.saveData, listStep.start, columns, validatedDataArray, dispatch])

  useEffect(() => {
    if (responseExcel) {
      if (responseExcel.result) {
        setDataDisplay([])
        setOpen(true)
        setOperatedStep(listStep.start)
      }
    }
  }, [dispatch, responseExcel, listStep.start])

  /**
   * @description View Option/Tùy chọn hiển thị cột table
   */
  const genViewOptions = () => (
    <CmsViewOptions
      keyStorage={'importExcel'}
      columns={columns}
      setColumns={setColumns}
      showCheckAll={true}
      isCheckAll={showAllColumns}
      handleCheckAll={value => setShowAllColumns(value)}
    />
  )

  /**
   * @description partial nút lưu, nút hướng dẫn
   */
  const selectedAction = (
    <div className="flex items-center">
      <CmsIconButton color="secondary" tooltip="Hướng dẫn" icon="help_outline" size="small" />
      <CmsUploadFile fileProperties={FileProperties['excel']} className="flex flex-col" size="small" setValue={value => HandleUploadFileExcel(value)} />
    </div>
  )

  /**
   * 
   * @description sự kiên upload file excel
   * @param() data array
   */
  const HandleUploadFileExcel = async (file) => {
    // check validate total row
    let value = await GetExcelDataFromFile(file, null, null)
    if (!value[0]) {
      CmsAlert.fire('', "Dữ liệu trong file không tồn tại !", 'error')
      return false
    }
    if (value[0].length !== SuKien.importExcel) {
      CmsAlert.fire('', `Vui lòng nhập file Content Kế Hoạch (Số lượng cột yêu cầu: ${SuKien.importExcel}) !`, 'error')
      return false
    }

    setValidatedDataArray(ValidateValue(value.map(item => (initExcelModel(item)))).filter(item => Object.values(item).filter(i => i.error).length === 0))
    setValidatedData(ValidateValue(value.map(item => (initExcelModel(item)))))
    let checkError = 0;
    setDataDisplay(ValidateValue(value.map(item => (initExcelModel(item))))
      .map(item => {
        let fields = columns.map(col => col.field)
        let defineKeyValue = {}
        let error = []
        let value = {}
        columns.forEach(col => { defineKeyValue = { ...defineKeyValue, [col.field]: col.label } })
        fields.forEach(strKey => {
          item[strKey] && item[strKey].error && item[strKey].error !== "" &&
            error.push(`- ${defineKeyValue[strKey]}: ${item[strKey].error}`)
          value = {
            ...value,
            [strKey]: (<div className="flex items-center justify-center">
              {(item[strKey] && item[strKey].error && item[strKey].error !== "") && <CmsIconButton tooltip={item[strKey].error} className="text-red-600 inline-block" icon="error_outline" />}
              <CmsLabel content={(item[strKey] && item[strKey].value) || ""} />
            </div>)
          }
        })
        if (error.length !== 0)
          checkError = 1;
        value.error = error.length !== 0 ? (
          <CmsIconButton tooltip={<div>{(error != null && (error.map((item, index) => { return <CmsLabel key={index} content={item} /> })))}</div>} className="text-red-600 inline-block" icon="report_problem" />
        ) : <Icon color='primary'>check</Icon>
        return value
      }))
    setCError(checkError === 1);
    setOpen(false);
    setOperatedStep(listStep.importExcel);
  }

  const HandleRefresh = () => {
    setDataDisplay([])
    setOpen(true)
    setOperatedStep(listStep.start)
  }

  const saveData = async (data) => {
    try {
      setLoading(true);
      await connect.live.partner.member.invite(data);
      dispatch(showMessage({ variant: "success", message: "Thành công import excel" }));
      setOpen(true);
    } catch (error) {
      dispatch(showMessage({ variant: "error", message: error.message }));
    } finally {
      setLoading(false);
    }
  }

  /**
   * @description event Savedata to database
   */
  const HandleSaveData = () => {
    let successArray = validatedData.filter(item => Object.values(item).filter(i => i.error).length === 0)
    let fields = columns.filter(i => i.hideOption === false).map(col => col.field)
    successArray = successArray.map(item => {
      let obj = {}
      let arr = fields.map(i => ({ [i]: item[i].value }))
      arr.forEach(i => { obj = Object.assign(obj, i) })
      return obj
    })
    let model = successArray.map(item => (
      initImportModel({
        name: item['name'],
        phone: item['phone'],
        email: item['email'],
      })
    ));

    alertInformation({
      text: "Xác nhận import excel",
      data: { value: model, partnerid: id },
      confirm: saveData
    })
  }

  if (operatedStep === listStep.importExcel && dataDisplay && dataDisplay.length === 0) {
    setOperatedStep(listStep.start)
    setOpen(true)
    CmsAlert.fire('', 'Nhập dữ liệu thất bại, Vui lòng thao tác lại!', 'error')
  }

  return (
    <CmsCardedPage
      title={"Import thành viên"}
      icon="whatshot"
      rightBottomHeader={selectedAction}
      content={
        <div className="w-full h-full">
          <CmsCollapse open={open}>
            <div className="flex flex-col p-16 justify-between items-center">
              <div className="border-1 rounded-4 p-16">
                <div className="flex items-center">
                  <CmsLabel content="(*) Download file mẫu:" />
                  <CmsButton size="small" label="Tại Đây" className="ml-8 hover:underline" startIcon="download" variant="text" color="primary" onClick={() => { window.open('assets/upload/TemplateImportPartner.xlsx', '_blank') }} />
                </div>
                <CmsLabel content="- Hệ thống chỉ hỗ trợ file excel *.xls, *.xlsx" />
                <CmsLabel content="- Các trường kiểu ngày, vui lòng định dạng: năm-tháng-ngày giờ:phút (yyyy-MM-dd HH:MM)" />
                <CmsLabel content="- Với các trường có sẵn, vui lòng chọn option đã có" />
                <CmsLabel content="- File Excel chỉ chứa duy nhất 1 Sheets (Đặt tên không dấu, không ký tự đặc biệt, không khoảng cách)" />
                <CmsLabel content="- Không tùy ý thay đổi thứ tự các trường, tham khảo file mẫu ở trên" />
                <div className="flex items-center">
                  <CmsLabel content="- Chú Thích Icon:" />
                  <CmsButton size="small" label="C/Trình OK" className="ml-8" startIcon="check_outline" variant="text" color="primary" />
                  <CmsButton size="small" label="C/Trình Lỗi (Rê chuột vào icon để xem thông tin lỗi)" className="ml-8 text-red-600" startIcon="report_problem" variant="text" />
                </div>
                <div className="flex flex-col justify-between items-center">
                  <CmsUploadFile fileProperties={FileProperties['excel']} id="uploadfile" setValue={value => HandleUploadFileExcel(value)} />
                </div>
              </div>
            </div>
          </CmsCollapse>
          {dataDisplay && dataDisplay.length !== 0 && (
            <CmsTableBasic
              className="w-full h-full"
              data={dataDisplay}
              columns={columns}
              viewOptions={genViewOptions()}
               />
          )}
        </div>
      }
      toolbar={
        <div className="w-full flex items-center justify-between px-12">
          <div className="flex-none items-center justify-items-start">
          </div>
          {operatedStep === listStep.importExcel && validatedDataArray.length !== 0 && !cError && (<div className="flex items-center justify-items-end space-x-4">
            <CmsButtonProgress loading={loading} color='secondary' label='Lưu' startIcon="vertical_align_bottom" onClick={() => HandleSaveData()} />
            <CmsButton color="default" label="Làm lại" startIcon="arrow_back" onClick={() => HandleRefresh()} />
          </div>)}
        </div>
      }
      rightHeaderButton={
        <CmsButton label={'Trở về'}
          variant="text"
          color="default"
          component={Link}
          to={`/partner/${id}`}
          className="mx-2"
          startIcon="arrow_back" />
      }
    />
  );
}

export default withReducer(keyStore, reducer)(ImportExcel);