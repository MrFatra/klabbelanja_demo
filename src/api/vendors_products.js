import { API_GET_BANNERS, API_LIST_ALL_PRODUCTS, API_LIST_ALL_VENDORS, API_LIST_VENDORS_AND_PRODUCTS } from "./routes"

export const handleListVendorsAndProducts = async () => {
    try {
        const response = await fetch(API_LIST_VENDORS_AND_PRODUCTS).then(async result => await result.json())

        if (response.status === false) {
            return { status: false, message: 'Terjadi Kesalahan' }
        } else {
            return {
                status: true,
                vendors: response.data.vendors,
                products: response.data.products
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export const handleListAllProducts = async () => {

    try {
        const response = await fetch(API_LIST_ALL_PRODUCTS).then(async result => await result.json())

        if (response.status === false) {
            return { status: false, message: 'Terjadi Kesalahan' }
        } else {
            return {
                status: true,
                electronics: response.data.electronic,
                physiques: response.data.physique,
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export const handleListAllVendors = async () => {

    try {
        const response = await fetch(API_LIST_ALL_VENDORS).then(async result => await result.json())

        if (response.status === false) {
            return { status: false, message: 'Terjadi Kesalahan' }
        } else {
            return {
                status: true,
                vendors: response.data,
            }
        }
    } catch (err) {
        console.log(err);
    }
}

export const handleDetailVendor = async (id) => {
    try {
        const response = await fetch(`https://0cbd-158-140-182-89.ngrok-free.app/api/v1/vendors/details?vendors_id=${id}`).then(async res => await res.json())

        if (response.status === false) {
            return { status: false, message: 'Terjadi Kesalahan' }
        } else {
            return {
                status: true,
                name: response.data.name,
                address: response.data.vendorsDetails.address,
                notes: response.data.vendorsDetails.notes,
                logo: response.data.vendorsPictures.path,
                photo: response.data.vendorsPictures.path_detail,
                electronics: response.data.products.electronic,
                physiques: response.data.products.physique
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export const handleDetailProduct = async (id, vendorId) => {
    try {
        const response = await fetch(`https://0cbd-158-140-182-89.ngrok-free.app/api/v1/products/details?vendors_id=${vendorId}&products_id=${id}`).then(async res => await res.json())

        if (response.status === false) {
            return { status: false, message: 'Terjadi Kesalahan' }
        } else {
            return {
                status: true,
                vendorName: response.data.name,
                productName: response.data.productsDetails.name,
                productPictures: response.data.productsDetails.productsPictures.path,
                vendorLogo: response.data.vendorsPictures.path,
                type: response.data.productsDetails.type == 1 ? 'Fisik' : 'Digital',
                desc: response.data.productsDetails.productsDetails.descriptions,
                price: response.data.productsDetails.productsPrice.price - response.data.productsDetails.productsPrice.discount_amount,
            }
        }
    } catch (error) {
        console.error(error);
    }
}

export const getBanners = async () => {
    try {
        const response = await fetch(API_GET_BANNERS).then(async res => await res.json())

        if (response.status == false) {
            return { status: false, message: 'Terjadi Kesalahan' }
        } else {
            return {
                status: true,
                banners: response.data
            }
        }
    } catch (error) {

    }
}