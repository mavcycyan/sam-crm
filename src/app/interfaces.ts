export interface OrdersData {
    _id?: string;
    date?: string;
    items: object;
    status: string;
    client_name: string;
    client_phone: string;
}

export interface OrderSingleData {
    _id: string;
    date: string;
    items: object;
    processed_by: string;
    status: string;
    client_name: string;
    client_city: string;
    client_phone: string;
    client_paytype: string;
    client_delivery: string;
    client_comment: string;
}

export interface StockList {
    _id?: string;
    sys_name: string;
    name: string;
    price: string;
    stock_count: string;
    sku: string;
}

export interface UserData {
    _id?: string;
    login: string;
    password: string;
    email?: string;
    name?: string;
    message?: string;
}
