import { API_LIST_ALL_PRODUCTS, API_LIST_ALL_VENDORS, API_LIST_VENDORS_AND_PRODUCTS } from "./routes"

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

export const handleDetailVendors = async (id) => {
    try {
        const response = await fetch(`https://c7d3-140-213-140-89.ngrok-free.app/api/v1/vendors/details?vendors_id=${id}`).then(async res => await res.json())
        
        if (response.status === false) {
            return { status: false, message: 'Terjadi Kesalahan' }
        } else {
            return {
                status: true,
                // data 
            }
        }
    } catch (error) {
        console.error(error);
    }
}