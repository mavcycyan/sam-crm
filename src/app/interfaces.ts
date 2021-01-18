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
