import { API_LIST_ALL_VENDORS, API_LIST_VENDORS } from "./routes"

export const handleListVendors = async () => {


    try {
        const response = await fetch(API_LIST_VENDORS).then(async result => await result.json())

        if (response.status === false) {
            return { status: false, message: 'Terjadi Kesalahan' }
        } else {
            return {
                status: true,
                data: response.data.vendors,
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
            return { status: true, data: response.data } // array
        }
    } catch (err) {
        console.log(err);
    }
}