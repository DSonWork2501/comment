import { CmsButton, CmsCardedPage, CmsFormikTextField, CmsIconButton, CmsLabel, CmsTableBasic } from "@widgets/components";
import { initColumn } from "@widgets/functions";
import withReducer from "app/store/withReducer";
import React, { useEffect } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { keyStore } from "../../common";
import reducer from "../../store";
import { getList as getProduct, initSearchState, setSearch, setStateRedux } from "../../store/productSlice";
import History from "@history";
import { useLocation, useParams } from "react-router";
import { useFormik } from "formik";
import { Button, Icon } from "@material-ui/core";
import { Link } from 'react-router-dom';

const columns = [
    new initColumn({ field: "sku", label: "SKU", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "catename", label: "Danh Mục", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "name", label: "Tên S/P", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "shortname", label: "Tên Ngắn", alignHeader: "left", alignValue: "left", sortable: false }),
    new initColumn({ field: "image", label: "Hình Ảnh", alignHeader: "center", alignValue: "center", sortable: false }),
    new initColumn({ field: "price", label: "Giá", alignHeader: "center", alignValue: "center", sortable: false }),
]

const Filter = ({ onSearch, search }) => {

    const formik = useFormik({
        initialValues: search,
        onSubmit: handleSubmit
    })

    function handleSubmit(value) {
        let values = { ...value };
        onSearch(values);
    }

    return <form onSubmit={formik.handleSubmit} className="flex items-center justify-items-start w-1/4 space-x-8 px-8" >
        <CmsFormikTextField
            label={`Tên sản phẩm`}
            name="search"
            className="my-8"
            size="small"
            clearBlur
            formik={formik} />
        <Button
            style={{
                background: '#FF6231',
                color: 'white',
                height: 36,
                position: 'relative',
                top: -1,
                paddingTop: 8
            }}
            size='small'
            variant="contained"
            type='submit'
        >
            <Icon>
                search
            </Icon>
        </Button>
        <Button
            style={{
                color: 'black',
                height: 36,
                position: 'relative',
                top: -1,
                paddingTop: 8
            }}
            size='small'
            variant="contained"
            type='submit'
            onClick={() => formik.handleReset()}
        >
            <Icon>
                refresh
            </Icon>
        </Button>
    </form>
}

function ProductList() {
    const dispatch = useDispatch()
    const search = useSelector(store => store[keyStore].product.search)
    const loading = useSelector(store => store[keyStore].product.loading)
    const entities = useSelector(store => store[keyStore].product.entities)
    const location = useLocation(), params = useParams(), id = params.id;

    const JsonParseString = (str) => {
        try {
            return JSON.parse(str)
        } catch (error) {
            return null
        }
    }

    useEffect(() => {
        return () => {
            dispatch(setStateRedux({
                search: initSearchState,
                entities: null
            }));
        }
    }, [dispatch])

    useEffect(() => {
        if (id)
            dispatch(getProduct({ ...search, cate: id }))
    }, [dispatch, search, id])

    const data = useMemo(() => entities?.data?.map(item => ({
        id: item.id,
        name: item.name,
        catename: JsonParseString(item.catename) ? JsonParseString(item.catename).join(', ') : <div></div>,
        shortname: item.shortname,
        image: (<img style={{ height: 100, margin: '0 auto' }} src={`${item.image ? `${process.env.REACT_APP_BASE_URL}api/product/img/${item?.image}` : 'assets/images/etc/no-image-icon.png'}`} alt={item?.img} />),
        sku: item.sku,
        price: item.price,
        action: (
            <div className="flex flex-row">
                <CmsIconButton
                    tooltip={<CmsLabel content={"Cập nhật"} className="text-10" />}
                    icon="edit"
                    className="bg-green-500 hover:bg-green-700 hover:shadow-2 text-white"
                    onClick={() => History.push(`/product/${item.sku}`)}
                />
            </div>
        ) || []
    })), [entities])

    return (
        <CmsCardedPage
            title={'Danh sách sản phẩm'}
            subTitle={'Quản lý thông tin sản phẩm'}
            icon="whatshot"
            rightHeaderButton={
                <div className="flex items-center space-x-4">
                    <CmsButton
                        label={"Trở về"}
                        variant="text"
                        color="default"
                        component={Link}
                        to={location?.state?.prevPath
                            ? location?.state?.prevPath
                            : '/product-category'}
                        className="mx-2 flex-none"
                        startIcon="arrow_back" />
                </div>
            }
            content={
                <CmsTableBasic
                    className="w-full h-full"
                    isServerSide={true}
                    data={data}
                    search={search}
                    columns={columns}
                    loading={loading}
                    setSearch={(value) => dispatch(setSearch({ ...search, ...value }))}
                    pagination={entities?.pagination}
                />
            }
            toolbar={
                <>
                    <div className='flex justify-between w-full items-center'>
                        <Filter
                            onSearch={(value) => dispatch(setSearch({ ...search, ...value }))}
                            search={search}
                        />
                    </div>
                </>
            }
        />
    )
}

export default withReducer(keyStore, reducer)(ProductList);